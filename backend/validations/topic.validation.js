const { body } = require('express-validator');

const LEVELS = ['A1', 'A2', 'B1', 'B1+', 'B2', 'C1', 'C2'];
const CATEGORIES = ['grammar', 'vocabulary', 'writing', 'reading'];

const createTopicRules = [
  body('title').trim().notEmpty().withMessage('Konu başlığı zorunludur.'),
  body('category').isIn(CATEGORIES).withMessage(`category şunlardan biri olmalıdır: ${CATEGORIES.join(', ')}`),
  body('level').isIn(LEVELS).withMessage(`level şunlardan biri olmalıdır: ${LEVELS.join(', ')}`),
  body('description').optional().trim(),
  body('passage').optional({ nullable: true }).trim(),
];

const updateTopicRules = [
  body('title').optional().trim().notEmpty().withMessage('Konu başlığı boş olamaz.'),
  body('category').optional().isIn(CATEGORIES).withMessage(`category şunlardan biri olmalıdır: ${CATEGORIES.join(', ')}`),
  body('level').optional().isIn(LEVELS).withMessage(`level şunlardan biri olmalıdır: ${LEVELS.join(', ')}`),
  body('description').optional().trim(),
  body('passage').optional({ nullable: true }).trim(),
];

const checkAnswersRules = [
  body('answers').isArray({ min: 1 }).withMessage('answers dizisi zorunludur.'),
  body('answers.*.questionId').isMongoId().withMessage('Her cevap için geçerli bir questionId zorunludur.'),
  body('answers.*.answer').exists().withMessage('Her cevap için answer alanı zorunludur.'),
];

module.exports = { createTopicRules, updateTopicRules, checkAnswersRules };
