const router = require('express').Router();
const topicController = require('../controllers/topic.controller');
const authenticate = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');
const validate = require('../middlewares/validate.middleware');
const { createTopicRules, updateTopicRules, checkAnswersRules } = require('../validations/topic.validation');

router.get('/', topicController.list);
router.get('/:id', topicController.getById);
router.get('/:id/questions', topicController.getQuestions);
router.post('/:id/check', authenticate, checkAnswersRules, validate, topicController.checkAnswers);
router.post('/', authenticate, authorize('admin'), createTopicRules, validate, topicController.create);
router.put('/:id', authenticate, authorize('admin'), updateTopicRules, validate, topicController.update);
router.delete('/:id', authenticate, authorize('admin'), topicController.remove);

module.exports = router;
