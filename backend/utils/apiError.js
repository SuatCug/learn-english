class ApiError extends Error {
  constructor(statusCode, message, errors = [], code) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    // Frontend'in mesajı parse etmeden hata türünü ayırt edebilmesi için (örn. EMAIL_NOT_VERIFIED).
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
