// Arayüz dili (Türkçe / İngilizce).
//
// Yaklaşım: koddaki İngilizce metnin kendisi anahtardır → t('Start exam'). Türkçe karşılıkları tr.js'te.
// İngilizce seçiliyken sözlük yok, metin olduğu gibi görünür. Değişken: t('{{n}} messages left.', { n }).
//
// Sadece arayüz/bilgilendirme metinleri çevrilir. Öğrenilen İngilizce içerik (dersler, sorular, metinler,
// AI ile konuşma) çevrilmez ve t() ile sarılmaz.
//
// Eksik çeviri kontrolü: npm run i18n:check (scripts/check-i18n.mjs).
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import tr from './tr';

export const LANGUAGES = [
  { code: 'tr', label: 'TR', name: 'Türkçe' },
  { code: 'en', label: 'EN', name: 'English' },
];
const STORAGE_KEY = 'lang';
const DEFAULT_LANGUAGE = 'en'; // Uygulama İngilizce açılır; Türkçe profil menüsünden (Dil) seçilir

function savedLanguage() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return LANGUAGES.some((l) => l.code === value) ? value : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

i18n.use(initReactI18next).init({
  resources: { tr: { translation: tr } },
  lng: savedLanguage(),
  fallbackLng: false,
  // Anahtarlar düz İngilizce cümleler; içlerindeki "." ve ":" ayırıcı sayılmasın.
  keySeparator: false,
  nsSeparator: false,
  returnEmptyString: false,
  interpolation: { escapeValue: false }, // React zaten kaçışlıyor
  showSupportNotice: false, // konsoldaki i18next tanıtım mesajını kapatır
});

function applyLanguage(lng) {
  document.documentElement.lang = lng;
}
applyLanguage(i18n.language);

export function changeLanguage(lng) {
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    // Tarayıcı depolaması kapalıysa seçim sadece bu oturumda geçerli olur.
  }
  applyLanguage(lng);
  return i18n.changeLanguage(lng);
}

// Çevrilecek metin işareti: render dışında tanımlanan veri dizilerindeki metinler için (kart başlıkları,
// kategori adları...). Metni değiştirmez; kullanıldığı yerde t(değişken) ile çevrilir. scripts/check-i18n.mjs
// bu işaretli metinlerin de sözlükte olduğunu kontrol eder.
export const tk = (text) => text;

// Backend'e gönderilen dil (Accept-Language): hata mesajları ve AI değerlendirmesi bu dilde döner.
export const currentLanguage = () => i18n.language || DEFAULT_LANGUAGE;

// Tarih/sayı biçimlendirme için yerel ayar (toLocaleDateString vb.).
export const dateLocale = () => (currentLanguage() === 'tr' ? 'tr-TR' : 'en-US');

export default i18n;
