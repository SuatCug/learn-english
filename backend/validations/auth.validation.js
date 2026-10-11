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

const verifyEmailRules = [
  body('token').isString().isHexadecimal().isLength({ min: 64, max: 64 }).withMessage('Doğrulama linki geçersiz.'),
];

const resendVerificationRules = [
  body('email').trim().isEmail().withMessage('Geçerli bir e-posta adresi giriniz.').normalizeEmail(),
];

module.exports = { registerRules, loginRules, verifyEmailRules, resendVerificationRules };
