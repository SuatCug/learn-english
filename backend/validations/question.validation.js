const { body } = require('express-validator');

const LEVELS = ['A1', 'A2', 'B1', 'B1+', 'B2', 'C1', 'C2'];
const TYPES = ['multiple-choice', 'fill-in-blanks', 'matching'];

const baseQuestionRules = [
  body('type').isIn(TYPES).withMessage(`type şunlardan biri olmalıdır: ${TYPES.join(', ')}`),
  body('title').trim().notEmpty().withMessage('Soru yönergesi zorunludur.'),
  body('level').isIn(LEVELS).withMessage(`level şunlardan biri olmalıdır: ${LEVELS.join(', ')}`),
  body('topicId').optional({ nullable: true }).isMongoId().withMessage('Geçersiz topicId.'),
  body('isPlacementQuestion').optional().isBoolean(),
  body('explanation').optional().trim(),
  body('options')
    .if(body('type').equals('multiple-choice'))
    .isArray({ min: 2 })
    .withMessage('Çoktan seçmeli sorular en az 2 seçenek içermelidir.'),
  body('correctAnswer')
    .if((value, { req }) => ['multiple-choice', 'fill-in-blanks'].includes(req.body.type))
    .notEmpty()
    .withMessage('correctAnswer zorunludur.'),
  body('matchingPairs')
    .if(body('type').equals('matching'))
    .isArray({ min: 2 })
    .withMessage('Eşleştirme soruları en az 2 çift içermelidir.'),
];

const createQuestionRules = baseQuestionRules;

module.exports = { createQuestionRules };
