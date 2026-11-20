import i18n from '@/i18n';

// Yeni şifre kuralı — backend/validations/password.rule.js ile aynı: en az 8 karakter, en fazla 72 bayt
// (bcrypt sınırı; Türkçe karakterler 2 bayt tutar). Giriş ekranında uygulanmaz, sadece yeni şifre belirlerken.
export const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_BYTES = 72;

// Hata mesajı (seçili arayüz dilinde) döner; şifre uygunsa null.
export function validateNewPassword(password) {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return i18n.t('Password must be at least {{min}} characters.', { min: PASSWORD_MIN_LENGTH });
  }
  if (new TextEncoder().encode(password).length > PASSWORD_MAX_BYTES) {
    return i18n.t('Password is too long. Please choose a shorter one.');
  }
  return null;
}
