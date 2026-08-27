const { body } = require('express-validator');

const progressRules = [
  body('topicId').isMongoId().withMessage('Geçerli bir topicId zorunludur.'),
  body('score').isInt({ min: 0, max: 100 }).withMessage('score 0-100 arasında bir tam sayı olmalıdır.'),
  body('assignmentId').optional({ nullable: true }).isMongoId().withMessage('Geçerli bir assignmentId olmalıdır.'),
  body('exerciseGroup').optional().isInt({ min: 1 }).withMessage('exerciseGroup pozitif bir tam sayı olmalıdır.'),
  body('answers').optional().isArray().withMessage('answers bir dizi olmalıdır.'),
];

const updateProfileRules = [
  body('name').trim().notEmpty().withMessage('İsim zorunludur.'),
  body('email').trim().isEmail().withMessage('Geçerli bir e-posta adresi giriniz.').normalizeEmail(),
];

const changePasswordRules = [
  body('currentPassword').notEmpty().withMessage('Mevcut şifre zorunludur.'),
  body('newPassword').isLength({ min: 6 }).withMessage('Yeni şifre en az 6 karakter olmalıdır.'),
];

const deleteAccountRules = [body('password').notEmpty().withMessage('Şifre zorunludur.')];

module.exports = { progressRules, updateProfileRules, changePasswordRules, deleteAccountRules };
