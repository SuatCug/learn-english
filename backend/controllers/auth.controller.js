const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const { normalizeEmail } = require('validator');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const { generateToken } = require('../utils/jwt.util');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../utils/mail.util');
const { User } = require('../models');

const VERIFICATION_TTL_MS = 24 * 60 * 60 * 1000;
const CODE_TTL_MS = 30 * 60 * 1000;
const MAX_CODE_ATTEMPTS = 5;
const RESEND_COOLDOWN_MS = 60 * 1000;
const RESET_CODE_TTL_MS = 15 * 60 * 1000;
const RESET_TOKEN_TTL_MS = 15 * 60 * 1000;

const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

// Kullanıcıya yeni bir doğrulama linki (web) ve 6 haneli kod (mobil) atar, ikisini aynı mailde gönderir.
// Ham değerler sadece mailde yer alır; veritabanında hash'leri tutulur.
const issueVerification = async (user) => {
  const token = crypto.randomBytes(32).toString('hex');
  const code = crypto.randomInt(0, 1_000_000).toString().padStart(6, '0');
  user.emailVerificationToken = hashToken(token);
  user.emailVerificationExpires = new Date(Date.now() + VERIFICATION_TTL_MS);
  user.emailVerificationCode = hashToken(`${user._id}:${code}`);
  user.emailVerificationCodeExpires = new Date(Date.now() + CODE_TTL_MS);
  user.emailVerificationAttempts = 0;
  user.verificationEmailSentAt = new Date();
  await user.save();
  await sendVerificationEmail(user, { token, code });
};

// Doğrulama tamamlanınca link/kod alanları temizlenir; kullanıcı tekrar şifre girmeden oturum açmış olur.
const completeVerification = async (user, res) => {
  user.emailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  user.emailVerificationCode = undefined;
  user.emailVerificationCodeExpires = undefined;
  user.emailVerificationAttempts = undefined;
  user.verificationEmailSentAt = undefined;
  await user.save();

  const token = generateToken({ id: user._id, role: user.role });

  res.json({
    success: true,
    message: 'E-posta adresin doğrulandı.',
    data: { user: user.toSafeJSON(), token },
  });
};

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(409, 'Bu e-posta adresi zaten kayıtlı.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword, emailVerified: false });

  try {
    await issueVerification(user);
  } catch (err) {
    // Mail gidemediyse kullanıcı doğrulama yapamaz; aynı e-postayla tekrar kayıt olabilmesi için silinir.
    await User.deleteOne({ _id: user._id });
    throw err;
  }

  res.status(201).json({
    success: true,
    message: 'Kayıt başarılı. Hesabını etkinleştirmek için e-postana gönderilen kodu gir.',
    data: { email: user.email },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new ApiError(401, 'E-posta veya şifre hatalı.');
  }

  // Sadece Google ile açılmış hesapların şifresi yoktur.
  if (!user.password) {
    throw new ApiError(401, 'Bu hesap Google ile oluşturulmuş. Lütfen "Google ile giriş yap" butonunu kullan.');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, 'E-posta veya şifre hatalı.');
  }

  if (user.emailVerified === false) {
    throw new ApiError(403, 'Giriş yapabilmek için önce e-posta adresini doğrulamalısın.', [], 'EMAIL_NOT_VERIFIED');
  }

  const token = generateToken({ id: user._id, role: user.role });

  res.json({
    success: true,
    message: 'Giriş başarılı.',
    data: { user: user.toSafeJSON(), token },
  });
});

// İki yol: web'deki link ({ token }) veya mobil uygulamada girilen kod ({ email, code }).
const verifyEmail = asyncHandler(async (req, res) => {
  const { token, email, code } = req.body;

  if (token) {
    const user = await User.findOne({
      emailVerificationToken: hashToken(token),
      emailVerificationExpires: { $gt: new Date() },
    });
    if (!user) {
      throw new ApiError(400, 'Doğrulama linki geçersiz veya süresi dolmuş.');
    }
    return completeVerification(user, res);
  }

  const invalid = 'Kod hatalı veya süresi dolmuş.';
  const user = await User.findOne({ email }).select(
    '+emailVerificationCode +emailVerificationCodeExpires +emailVerificationAttempts'
  );
  // Kayıtlı olmayan e-posta ile hatalı kod aynı yanıtı alır; hangi adreslerin kayıtlı olduğu sızmaz.
  if (!user || user.emailVerified !== false || !user.emailVerificationCode) {
    throw new ApiError(400, invalid);
  }
  if (user.emailVerificationCodeExpires <= new Date()) {
    throw new ApiError(400, 'Kodun süresi doldu. Yeni bir kod iste.', [], 'CODE_EXPIRED');
  }
  if ((user.emailVerificationAttempts ?? 0) >= MAX_CODE_ATTEMPTS) {
    throw new ApiError(429, 'Çok fazla hatalı deneme yaptın. Yeni bir kod iste.', [], 'CODE_EXPIRED');
  }

  const expected = Buffer.from(user.emailVerificationCode, 'hex');
  const actual = Buffer.from(hashToken(`${user._id}:${code}`), 'hex');
  if (!crypto.timingSafeEqual(expected, actual)) {
    user.emailVerificationAttempts = (user.emailVerificationAttempts ?? 0) + 1;
    await user.save();
    throw new ApiError(400, invalid);
  }

  return completeVerification(user, res);
});

const resendVerification = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select('+verificationEmailSentAt');

  // Hangi e-postaların kayıtlı olduğunu sızdırmamak için her durumda aynı yanıt döner.
  if (user && user.emailVerified === false) {
    const sentAt = user.verificationEmailSentAt?.getTime() ?? 0;
    if (Date.now() - sentAt < RESEND_COOLDOWN_MS) {
      throw new ApiError(429, 'Yeni bir e-posta istemeden önce biraz bekle.');
    }
    await issueVerification(user);
  }

  res.json({
    success: true,
    message: 'Hesabın doğrulanmamışsa e-postana yeni bir doğrulama kodu gönderildi.',
  });
});

// Audience kontrolü verifyIdToken çağrısında GOOGLE_CLIENT_ID ile yapılır.
const googleClient = new OAuth2Client();

// Google ile giriş/kayıt: frontend'deki Google butonundan gelen ID token (credential) doğrulanır.
// - Google hesabı daha önce bağlanmışsa (googleId) veya aynı e-postayla kayıt varsa o hesapla giriş yapılır.
// - Hiç kayıt yoksa yeni hesap açılır. Google e-postayı doğruladığı için ayrıca kod istenmez.
// Kendi tasarımımız olan "Google ile devam et" butonu Google'ın OAuth popup'ını kullanır ve ID token yerine
// access token verir. Token'ın bizim uygulamamız için verildiği (aud/azp = GOOGLE_CLIENT_ID) Google'ın
// tokeninfo uç noktasıyla doğrulanır; sonra kullanıcı bilgileri userinfo'dan alınır. Başka bir uygulamanın
// token'ı aud kontrolünde reddedilir.
const profileFromAccessToken = async (accessToken, clientId) => {
  const infoRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?access_token=${encodeURIComponent(accessToken)}`);
  const info = await infoRes.json();
  if (!infoRes.ok || (info.aud !== clientId && info.azp !== clientId) || Number(info.expires_in) <= 0) {
    throw new Error('invalid access token');
  }
  const userRes = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!userRes.ok) throw new Error('userinfo failed');
  const profile = await userRes.json();
  if (profile.sub !== info.sub) throw new Error('subject mismatch');
  return profile; // { sub, email, email_verified, name, ... } — ID token payload ile aynı alanlar
};

const googleLogin = asyncHandler(async (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new ApiError(503, 'Google ile giriş şu anda kullanılamıyor.');
  }

  let payload;
  try {
    payload = req.body.accessToken
      ? await profileFromAccessToken(req.body.accessToken, clientId)
      : (await googleClient.verifyIdToken({ idToken: req.body.credential, audience: clientId })).getPayload();
  } catch {
    throw new ApiError(401, 'Google ile giriş doğrulanamadı. Lütfen tekrar dene.');
  }

  if (!payload?.sub || !payload.email || !payload.email_verified) {
    throw new ApiError(401, 'Google hesabının e-posta adresi doğrulanmamış.');
  }

  // Normal kayıtta e-postalar express-validator'ın normalizeEmail'i ile kaydediliyor; aynı hesabı
  // bulabilmek için Google'dan gelen adres de aynı şekilde normalize edilir.
  const email = normalizeEmail(payload.email) || payload.email.toLowerCase();

  let user = await User.findOne({ googleId: payload.sub }).select('+googleId');
  if (!user) user = await User.findOne({ email }).select('+googleId');

  if (!user) {
    user = await User.create({
      name: payload.name || email.split('@')[0],
      email,
      googleId: payload.sub,
      hasPassword: false,
      emailVerified: true,
    });
  } else {
    if (!user.googleId) user.googleId = payload.sub;

    if (user.emailVerified === false) {
      // Doğrulanmamış bir hesap bu e-postayla başkası tarafından açılmış olabilir; Google e-postanın
      // gerçek sahibini kanıtladığı için o hesabın şifresi geçersiz kılınır (sahibi sonradan yeni şifre belirleyebilir).
      user.password = undefined;
      user.hasPassword = false;
      user.emailVerified = true;
      user.emailVerificationToken = undefined;
      user.emailVerificationExpires = undefined;
      user.emailVerificationCode = undefined;
      user.emailVerificationCodeExpires = undefined;
      user.emailVerificationAttempts = undefined;
      user.verificationEmailSentAt = undefined;
    }

    if (user.isModified()) await user.save();
  }

  const token = generateToken({ id: user._id, role: user.role });

  res.json({
    success: true,
    message: 'Giriş başarılı.',
    data: { user: user.toSafeJSON(), token },
  });
});

// ---- Şifremi unuttum ----
// 1) forgotPassword: e-postaya 6 haneli kod gönderilir.
// 2) verifyResetCode: kod doğruysa kısa ömürlü, tek kullanımlık bir sıfırlama izni (resetToken) döner.
// 3) resetPassword: bu izinle yeni şifre kaydedilir ve kullanıcı oturum açmış olur.
// Hangi e-postaların kayıtlı olduğunu sızdırmamak için 1. adım her durumda aynı yanıtı verir.

const RESET_SELECT =
  '+passwordResetCode +passwordResetCodeExpires +passwordResetAttempts +passwordResetSentAt +passwordResetToken +passwordResetTokenExpires';

const clearPasswordReset = (user) => {
  user.passwordResetCode = undefined;
  user.passwordResetCodeExpires = undefined;
  user.passwordResetAttempts = undefined;
  user.passwordResetSentAt = undefined;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
};

const forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select(RESET_SELECT);

  if (user) {
    const sentAt = user.passwordResetSentAt?.getTime() ?? 0;
    if (Date.now() - sentAt < RESEND_COOLDOWN_MS) {
      throw new ApiError(429, 'Yeni bir kod istemeden önce biraz bekle.');
    }
    const code = crypto.randomInt(0, 1_000_000).toString().padStart(6, '0');
    user.passwordResetCode = hashToken(`reset:${user._id}:${code}`);
    user.passwordResetCodeExpires = new Date(Date.now() + RESET_CODE_TTL_MS);
    user.passwordResetAttempts = 0;
    user.passwordResetSentAt = new Date();
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save();
    try {
      await sendPasswordResetEmail(user, { code });
    } catch (err) {
      // Mail gidemediyse kod geçersiz sayılır ve bekleme süresi başlamaz; kullanıcı hemen tekrar deneyebilir.
      clearPasswordReset(user);
      await user.save();
      throw err;
    }
  }

  res.json({
    success: true,
    message: 'Bu e-posta adresiyle kayıtlı bir hesap varsa şifre sıfırlama kodu gönderildi.',
  });
});

const verifyResetCode = asyncHandler(async (req, res) => {
  const { email, code } = req.body;
  const invalid = 'Kod hatalı veya süresi dolmuş.';

  const user = await User.findOne({ email }).select(RESET_SELECT);
  if (!user || !user.passwordResetCode) throw new ApiError(400, invalid);
  if (user.passwordResetCodeExpires <= new Date()) {
    throw new ApiError(400, 'Kodun süresi doldu. Yeni bir kod iste.', [], 'CODE_EXPIRED');
  }
  if ((user.passwordResetAttempts ?? 0) >= MAX_CODE_ATTEMPTS) {
    throw new ApiError(429, 'Çok fazla hatalı deneme yaptın. Yeni bir kod iste.', [], 'CODE_EXPIRED');
  }

  const expected = Buffer.from(user.passwordResetCode, 'hex');
  const actual = Buffer.from(hashToken(`reset:${user._id}:${code}`), 'hex');
  if (!crypto.timingSafeEqual(expected, actual)) {
    user.passwordResetAttempts = (user.passwordResetAttempts ?? 0) + 1;
    await user.save();
    throw new ApiError(400, invalid);
  }

  // Kod bir kez kullanılır; yerine şifre değiştirme ekranında kullanılacak izin verilir.
  const resetToken = crypto.randomBytes(32).toString('hex');
  user.passwordResetCode = undefined;
  user.passwordResetCodeExpires = undefined;
  user.passwordResetAttempts = undefined;
  user.passwordResetToken = hashToken(resetToken);
  user.passwordResetTokenExpires = new Date(Date.now() + RESET_TOKEN_TTL_MS);
  await user.save();

  res.json({ success: true, message: 'Kod doğrulandı. Yeni şifreni belirleyebilirsin.', data: { resetToken } });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { email, resetToken, password } = req.body;

  const user = await User.findOne({ email }).select(RESET_SELECT);
  const valid =
    user?.passwordResetToken &&
    user.passwordResetTokenExpires > new Date() &&
    crypto.timingSafeEqual(Buffer.from(user.passwordResetToken, 'hex'), Buffer.from(hashToken(resetToken), 'hex'));
  if (!valid) {
    throw new ApiError(400, 'Şifre sıfırlama süren doldu. Lütfen baştan tekrar dene.', [], 'RESET_EXPIRED');
  }

  user.password = await bcrypt.hash(password, 10);
  user.hasPassword = true;
  // Kodu e-postasına alıp girebildiği için adresin sahibi olduğu kanıtlandı.
  if (user.emailVerified === false) user.emailVerified = true;
  clearPasswordReset(user);
  await user.save();

  const token = generateToken({ id: user._id, role: user.role });

  res.json({
    success: true,
    message: 'Şifren değiştirildi.',
    data: { user: user.toSafeJSON(), token },
  });
});

module.exports = {
  register,
  login,
  verifyEmail,
  resendVerification,
  googleLogin,
  forgotPassword,
  verifyResetCode,
  resetPassword,
};
