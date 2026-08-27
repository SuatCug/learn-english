const router = require('express').Router();
const classroomController = require('../controllers/classroom.controller');
const authenticate = require('../middlewares/auth.middleware');
const requirePremium = require('../middlewares/requirePremium.middleware');
const requireClassroomTeacher = require('../middlewares/classroomTeacher.middleware');
const validate = require('../middlewares/validate.middleware');
const {
  createClassroomRules,
  joinClassroomRules,
  createAssignmentRules,
} = require('../validations/classroom.validation');

router.get('/', authenticate, classroomController.getMyClassrooms);
router.post('/', authenticate, requirePremium, createClassroomRules, validate, classroomController.createClassroom);
router.post('/join', authenticate, joinClassroomRules, validate, classroomController.joinClassroom);
router.get('/:id', authenticate, classroomController.getClassroom);
router.post(
  '/:id/assignments',
  authenticate,
  requireClassroomTeacher,
  createAssignmentRules,
  validate,
  classroomController.createAssignment
);
router.delete(
  '/:id/assignments/:assignmentId',
  authenticate,
  requireClassroomTeacher,
  classroomController.deleteAssignment
);
router.get('/:id/results', authenticate, requireClassroomTeacher, classroomController.getResults);

module.exports = router;
