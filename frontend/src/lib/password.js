// Yeni şifre kuralı — backend/validations/password.rule.js ile aynı: en az 8 karakter, en fazla 72 bayt
// (bcrypt sınırı; Türkçe karakterler 2 bayt tutar). Giriş ekranında uygulanmaz, sadece yeni şifre belirlerken.
export const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_BYTES = 72;

const MESSAGES = {
  tr: {
    tooShort: `Şifre en az ${PASSWORD_MIN_LENGTH} karakter olmalıdır.`,
    tooLong: 'Şifre çok uzun. Lütfen daha kısa bir şifre seç.',
  },
  en: {
    tooShort: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
    tooLong: 'Password is too long. Please choose a shorter one.',
  },
};

// Hata mesajı döner; şifre uygunsa null.
export function validateNewPassword(password, lang = 'tr') {
  const t = MESSAGES[lang] ?? MESSAGES.tr;
  if (password.length < PASSWORD_MIN_LENGTH) return t.tooShort;
  if (new TextEncoder().encode(password).length > PASSWORD_MAX_BYTES) return t.tooLong;
  return null;
}
