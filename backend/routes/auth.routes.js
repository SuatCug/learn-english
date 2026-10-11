const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const validate = require('../middlewares/validate.middleware');
const {
  registerRules,
  loginRules,
  verifyEmailRules,
  resendVerificationRules,
} = require('../validations/auth.validation');

router.post('/register', registerRules, validate, authController.register);
router.post('/login', loginRules, validate, authController.login);
router.post('/verify-email', verifyEmailRules, validate, authController.verifyEmail);
router.post('/resend-verification', resendVerificationRules, validate, authController.resendVerification);

module.exports = router;
