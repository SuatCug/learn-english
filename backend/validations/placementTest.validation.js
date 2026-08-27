const { body } = require('express-validator');

const submitPlacementTestRules = [
  body('answers').isArray({ min: 1 }).withMessage('answers dizisi zorunludur.'),
  body('answers.*.questionId').isMongoId().withMessage('Her cevap için geçerli bir questionId zorunludur.'),
  body('answers.*.answer').exists().withMessage('Her cevap için answer alanı zorunludur.'),
];

module.exports = { submitPlacementTestRules };
