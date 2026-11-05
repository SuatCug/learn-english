const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const validate = require('../middlewares/validate.middleware');
const {
  registerRules,
  loginRules,
  verifyEmailRules,
  resendVerificationRules,
  googleLoginRules,
} = require('../validations/auth.validation');

router.post('/register', registerRules, validate, authController.register);
router.post('/login', loginRules, validate, authController.login);
router.post('/verify-email', verifyEmailRules, validate, authController.verifyEmail);
router.post('/resend-verification', resendVerificationRules, validate, authController.resendVerification);
router.post('/google', googleLoginRules, validate, authController.googleLogin);

module.exports = router;
