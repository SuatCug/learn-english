const bcrypt = require('bcryptjs');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const { generateToken } = require('../utils/jwt.util');
const { User } = require('../models');

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(409, 'Bu e-posta adresi zaten kayıtlı.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  const token = generateToken({ id: user._id, role: user.role });

  res.status(201).json({
    success: true,
    message: 'Kayıt başarılı.',
    data: { user: user.toSafeJSON(), token },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new ApiError(401, 'E-posta veya şifre hatalı.');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, 'E-posta veya şifre hatalı.');
  }

  const token = generateToken({ id: user._id, role: user.role });

  res.json({
    success: true,
    message: 'Giriş başarılı.',
    data: { user: user.toSafeJSON(), token },
  });
});

module.exports = { register, login };
