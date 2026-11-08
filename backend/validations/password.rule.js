const { body } = require('express-validator');

// Yeni şifre kuralı (kayıt, şifre sıfırlama, şifre değiştirme): en az 8, en fazla 72 karakter.
// Üst sınır bcrypt'ten gelir: bcrypt yalnızca ilk 72 baytı kullanır, fazlası sessizce yok sayılırdı.
// Türkçe karakterler 2 bayt tuttuğu için kontrol bayt üzerinden yapılır.
// Mevcut şifrelerle girişte bu kural uygulanmaz; eski 6–7 karakterlik şifreler çalışmaya devam eder.
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_BYTES = 72;

const newPasswordRule = (field = 'password') =>
  body(field)
    .isString()
    .withMessage('Şifre zorunludur.')
    .bail()
    .isLength({ min: PASSWORD_MIN_LENGTH })
    .withMessage(`Şifre en az ${PASSWORD_MIN_LENGTH} karakter olmalıdır.`)
    .bail()
    .custom((value) => Buffer.byteLength(value, 'utf8') <= PASSWORD_MAX_BYTES)
    .withMessage('Şifre çok uzun. Lütfen daha kısa bir şifre seç.');

module.exports = { newPasswordRule, PASSWORD_MIN_LENGTH, PASSWORD_MAX_BYTES };
