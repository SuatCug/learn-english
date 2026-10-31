const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const { generateToken } = require('../utils/jwt.util');
const { sendVerificationEmail } = require('../utils/mail.util');
const { User } = require('../models');

const VERIFICATION_TTL_MS = 24 * 60 * 60 * 1000;
const CODE_TTL_MS = 30 * 60 * 1000;
const MAX_CODE_ATTEMPTS = 5;
const RESEND_COOLDOWN_MS = 60 * 1000;

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

module.exports = { register, login, verifyEmail, resendVerification };
