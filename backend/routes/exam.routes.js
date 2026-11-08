const router = require('express').Router();
const examController = require('../controllers/exam.controller');
const authenticate = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { getExamRules, submitExamRules } = require('../validations/exam.validation');

router.get('/', examController.listExams);
router.get('/:level', getExamRules, validate, examController.getExam);
router.post('/:level/submit', authenticate, submitExamRules, validate, examController.submitExam);

module.exports = router;
