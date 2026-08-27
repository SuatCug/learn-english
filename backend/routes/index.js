const router = require('express').Router();

router.use('/auth', require('./auth.routes'));
router.use('/topics', require('./topic.routes'));
router.use('/questions', require('./question.routes'));
router.use('/users', require('./user.routes'));
router.use('/placement-test', require('./placementTest.routes'));
router.use('/badges', require('./badge.routes'));
router.use('/classrooms', require('./classroom.routes'));

module.exports = router;
