const { body } = require('express-validator');
const { newPasswordRule } = require('./password.rule');
const { LEVEL_ORDER } = require('../utils/levelProgress.util');

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

// Mevcut şifre, şifresi olan hesaplar için controller'da zorunlu tutulur (Google ile açılmış hesapların şifresi yoktur).
const changePasswordRules = [
  body('currentPassword').optional().isString(),
  newPasswordRule('newPassword'),
];

const deleteAccountRules = [body('password').optional().isString()];

const setLevelRules = [
  body('level').isIn(LEVEL_ORDER).withMessage(`Seviye şunlardan biri olmalıdır: ${LEVEL_ORDER.join(', ')}.`),
];

module.exports = { progressRules, updateProfileRules, changePasswordRules, deleteAccountRules, setLevelRules };
