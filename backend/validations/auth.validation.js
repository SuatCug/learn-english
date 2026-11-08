const { body } = require('express-validator');

const registerRules = [
  body('name').trim().notEmpty().withMessage('İsim zorunludur.'),
  body('email').trim().isEmail().withMessage('Geçerli bir e-posta adresi giriniz.').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Şifre en az 6 karakter olmalıdır.'),
];

const loginRules = [
  body('email').trim().isEmail().withMessage('Geçerli bir e-posta adresi giriniz.').normalizeEmail(),
  body('password').notEmpty().withMessage('Şifre zorunludur.'),
];

// Web: { token } (linkteki 64 haneli hex). Mobil: { email, code } (6 haneli kod).
const verifyEmailRules = [
  body('token')
    .optional()
    .isString()
    .isHexadecimal()
    .isLength({ min: 64, max: 64 })
    .withMessage('Doğrulama linki geçersiz.'),
  body('email')
    .if(body('token').not().exists())
    .trim()
    .isEmail()
    .withMessage('Geçerli bir e-posta adresi giriniz.')
    .normalizeEmail(),
  body('code')
    .if(body('token').not().exists())
    .trim()
    .matches(/^\d{6}$/)
    .withMessage('Kod 6 haneli olmalıdır.'),
];

const resendVerificationRules = [
  body('email').trim().isEmail().withMessage('Geçerli bir e-posta adresi giriniz.').normalizeEmail(),
];

// Google Identity Services'ten gelen ID token (JWT).
const googleLoginRules = [body('credential').isString().notEmpty().withMessage('Google kimlik bilgisi eksik.')];

const emailRule = () => body('email').trim().isEmail().withMessage('Geçerli bir e-posta adresi giriniz.').normalizeEmail();

const forgotPasswordRules = [emailRule()];

const verifyResetCodeRules = [
  emailRule(),
  body('code').trim().matches(/^\d{6}$/).withMessage('Kod 6 haneli olmalıdır.'),
];

const resetPasswordRules = [
  emailRule(),
  body('resetToken')
    .isString()
    .isHexadecimal()
    .isLength({ min: 64, max: 64 })
    .withMessage('Şifre sıfırlama isteği geçersiz.'),
  body('password').isLength({ min: 6 }).withMessage('Şifre en az 6 karakter olmalıdır.'),
];

module.exports = {
  registerRules,
  loginRules,
  verifyEmailRules,
  resendVerificationRules,
  googleLoginRules,
  forgotPasswordRules,
  verifyResetCodeRules,
  resetPasswordRules,
};
