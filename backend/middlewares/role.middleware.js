const ApiError = require('../utils/apiError');

// RBAC: Sadece belirtilen rollere izin verir. Örn: authorize('admin')
const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return next(new ApiError(401, 'Kimlik doğrulama gerekli.'));
  }

  if (!allowedRoles.includes(req.user.role)) {
    return next(new ApiError(403, 'Bu işlem için yetkiniz bulunmuyor.'));
  }

  next();
};

module.exports = authorize;
