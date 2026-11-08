const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const validate = require('../middlewares/validate.middleware');
const {
  registerRules,
  loginRules,
  verifyEmailRules,
  resendVerificationRules,
  googleLoginRules,
  forgotPasswordRules,
  verifyResetCodeRules,
  resetPasswordRules,
} = require('../validations/auth.validation');

router.post('/register', registerRules, validate, authController.register);
router.post('/login', loginRules, validate, authController.login);
router.post('/verify-email', verifyEmailRules, validate, authController.verifyEmail);
router.post('/resend-verification', resendVerificationRules, validate, authController.resendVerification);
router.post('/google', googleLoginRules, validate, authController.googleLogin);
router.post('/forgot-password', forgotPasswordRules, validate, authController.forgotPassword);
router.post('/verify-reset-code', verifyResetCodeRules, validate, authController.verifyResetCode);
router.post('/reset-password', resetPasswordRules, validate, authController.resetPassword);

module.exports = router;
