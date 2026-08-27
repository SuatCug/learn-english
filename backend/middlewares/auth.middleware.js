const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');
const { verifyToken } = require('../utils/jwt.util');
const { User } = require('../models');

// İstek başlığındaki JWT'yi doğrular ve req.user'ı doldurur.
const authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError(401, 'Yetkilendirme başlığı eksik. Lütfen giriş yapın.');
  }

  const token = authHeader.split(' ')[1];

  let decoded;
  try {
    decoded = verifyToken(token);
  } catch (error) {
    throw new ApiError(401, 'Geçersiz veya süresi dolmuş oturum. Lütfen tekrar giriş yapın.');
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new ApiError(401, 'Kullanıcı bulunamadı.');
  }

  req.user = { id: user._id.toString(), role: user.role };
  next();
});

module.exports = authenticate;
