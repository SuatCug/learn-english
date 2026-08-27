const router = require('express').Router();
const questionController = require('../controllers/question.controller');
const authenticate = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');
const validate = require('../middlewares/validate.middleware');
const { createQuestionRules } = require('../validations/question.validation');

router.post('/', authenticate, authorize('admin'), createQuestionRules, validate, questionController.create);
router.put('/:id', authenticate, authorize('admin'), questionController.update);
router.delete('/:id', authenticate, authorize('admin'), questionController.remove);

module.exports = router;
