const { body } = require('express-validator');

const createClassroomRules = [
  body('name').isString().trim().isLength({ min: 2, max: 100 }).withMessage('Sınıf adı 2-100 karakter olmalıdır.'),
];

const joinClassroomRules = [
  body('joinCode')
    .isString()
    .trim()
    .isLength({ min: 6, max: 6 })
    .withMessage('Geçerli bir katılım kodu (6 karakter) zorunludur.'),
];

const createAssignmentRules = [
  body('topicId').isMongoId().withMessage('Geçerli bir topicId zorunludur.'),
  body('dueDate').isISO8601().withMessage('Geçerli bir dueDate (ISO8601 tarih) zorunludur.'),
];

module.exports = { createClassroomRules, joinClassroomRules, createAssignmentRules };
