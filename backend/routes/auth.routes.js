const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const validate = require('../middlewares/validate.middleware');
const limit = require('../middlewares/rateLimit.middleware');
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

// İstek sınırları (middlewares/rateLimit.middleware.js) doğrulamadan önce çalışır.
router.post('/register', limit.register, registerRules, validate, authController.register);
router.post('/login', limit.login, loginRules, validate, authController.login);
router.post('/verify-email', limit.codeCheck, verifyEmailRules, validate, authController.verifyEmail);
router.post('/resend-verification', limit.mail, resendVerificationRules, validate, authController.resendVerification);
router.post('/google', limit.google, googleLoginRules, validate, authController.googleLogin);
router.post('/forgot-password', limit.mail, forgotPasswordRules, validate, authController.forgotPassword);
router.post('/verify-reset-code', limit.codeCheck, verifyResetCodeRules, validate, authController.verifyResetCode);
router.post('/reset-password', limit.codeCheck, resetPasswordRules, validate, authController.resetPassword);

module.exports = router;
