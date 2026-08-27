const router = require('express').Router();
const placementTestController = require('../controllers/placementTest.controller');
const authenticate = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { submitPlacementTestRules } = require('../validations/placementTest.validation');

router.get('/', placementTestController.getPlacementTest);
router.post('/submit', authenticate, submitPlacementTestRules, validate, placementTestController.submit);

module.exports = router;
