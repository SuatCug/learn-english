const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const { generateToken } = require('../utils/jwt.util');
const { sendVerificationEmail } = require('../utils/mail.util');
const { User } = require('../models');

const VERIFICATION_TTL_MS = 24 * 60 * 60 * 1000;
const RESEND_COOLDOWN_MS = 60 * 1000;

const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

// Kullanıcıya yeni bir doğrulama token'ı atar ve maili gönderir. Ham token sadece mailde yer alır;
// veritabanında hash'i tutulur.
const issueVerification = async (user) => {
  const token = crypto.randomBytes(32).toString('hex');
  user.emailVerificationToken = hashToken(token);
  user.emailVerificationExpires = new Date(Date.now() + VERIFICATION_TTL_MS);
  user.verificationEmailSentAt = new Date();
  await user.save();
  await sendVerificationEmail(user, token);
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
    message: 'Kayıt başarılı. Hesabını etkinleştirmek için e-postana gönderilen linke tıkla.',
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

const verifyEmail = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    emailVerificationToken: hashToken(req.body.token),
    emailVerificationExpires: { $gt: new Date() },
  });
  if (!user) {
    throw new ApiError(400, 'Doğrulama linki geçersiz veya süresi dolmuş.');
  }

  user.emailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  user.verificationEmailSentAt = undefined;
  await user.save();

  // Doğrulama sonrası kullanıcı tekrar şifre girmeden oturum açmış olur.
  const token = generateToken({ id: user._id, role: user.role });

  res.json({
    success: true,
    message: 'E-posta adresin doğrulandı.',
    data: { user: user.toSafeJSON(), token },
  });
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
    message: 'Hesabın doğrulanmamışsa e-postana yeni bir doğrulama linki gönderildi.',
  });
});

module.exports = { register, login, verifyEmail, resendVerification };
