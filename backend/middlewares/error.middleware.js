const ApiError = require('../utils/apiError');

const notFound = (req, res, next) => {
  next(new ApiError(404, `Endpoint bulunamadı: ${req.originalUrl}`));
};

// Merkezi hata yönetimi middleware'i.
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  if (!statusCode) statusCode = 500;
  if (!message) message = 'Sunucu hatası oluştu.';

  // Mongoose özel hataları
  if (err.name === 'ValidationError') {
    statusCode = 422;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(' ');
  }
  if (err.code === 11000) {
    statusCode = 409;
    message = 'Bu kayıt zaten mevcut (benzersizlik ihlali).';
  }
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Geçersiz kayıt kimliği (id).';
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(err instanceof ApiError && err.code ? { code: err.code } : {}),
    errors: err instanceof ApiError ? err.errors : [],
  });
};

module.exports = { notFound, errorHandler };
