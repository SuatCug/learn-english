const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const { User } = require('../models');

// authenticate middleware'inin ARDINDAN kullanılır; req.user.id'nin isPremium olup olmadığını kontrol eder.
const requirePremium = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('isPremium');
  if (!user || !user.isPremium) {
    throw new ApiError(403, 'Bu özellik yalnızca premium/öğretmen hesapları için kullanılabilir.');
  }
  next();
});

module.exports = requirePremium;
