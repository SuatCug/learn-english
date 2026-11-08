const { body, param } = require('express-validator');

const levelParamRule = param('level')
  .customSanitizer((value) => String(value).toUpperCase())
  .isIn(['A1', 'A2', 'B1', 'B2'])
  .withMessage('Geçersiz seviye.');

const getExamRules = [levelParamRule];

const submitExamRules = [
  levelParamRule,
  body('answers')
    .custom((value) => value !== null && typeof value === 'object' && !Array.isArray(value))
    .withMessage('answers bir nesne olmalıdır ({ soruId: cevap }).'),
];

module.exports = { getExamRules, submitExamRules };
