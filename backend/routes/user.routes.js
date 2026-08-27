const router = require('express').Router();
const userController = require('../controllers/user.controller');
const authenticate = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const {
  progressRules,
  updateProfileRules,
  changePasswordRules,
  deleteAccountRules,
} = require('../validations/user.validation');

router.get('/me', authenticate, userController.me);
router.patch('/me', authenticate, updateProfileRules, validate, userController.updateProfile);
router.patch('/me/password', authenticate, changePasswordRules, validate, userController.changePassword);
router.delete('/me', authenticate, deleteAccountRules, validate, userController.deleteAccount);
router.post('/progress', authenticate, progressRules, validate, userController.addProgress);

module.exports = router;
