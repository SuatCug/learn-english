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

module.exports = { registerRules, loginRules };
