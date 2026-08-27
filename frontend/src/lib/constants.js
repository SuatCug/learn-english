export const LEVELS = [
  { code: 'A1', name: 'Elementary' },
  { code: 'A2', name: 'Pre-intermediate' },
  { code: 'B1', name: 'Intermediate' },
  { code: 'B1+', name: 'Upper-intermediate' },
  { code: 'B2', name: 'Pre-advanced' },
  { code: 'C1', name: 'Advanced' },
  { code: 'C2', name: 'Proficiency' },
];

export const CATEGORIES = [
  { label: 'Grammar', slug: 'grammar', icon: '🔤' },
  { label: 'Vocabulary', slug: 'vocabulary', icon: '📖' },
  { label: 'Reading', slug: 'reading', icon: '📚' },
  { label: 'Writing', slug: 'writing', icon: '✏️' },
];

// Kategoriye özel tema: konu/ders sayfalarında Navbar'ın hemen altındaki başlık şeridinin rengi.
export const CATEGORY_BANNER_CLASS = {
  grammar: 'bg-blue-400',
  vocabulary: 'bg-pink-400',
  reading: 'bg-red-600',
  writing: 'bg-purple-600',
};
export const DEFAULT_BANNER_CLASS = 'bg-emerald-600';

// Kategoriye özel tema: exercise sayfasındaki butonlar, soru numaraları ve vurgu renkleri
// bu paletten gelir (grammar mavi, vocabulary pembe, reading kırmızı, writing mor).
export const CATEGORY_THEME = {
  grammar: {
    solid: 'bg-blue-500',
    solidHover: 'hover:bg-blue-600',
    border: 'border-blue-500',
    borderLight: 'border-blue-300',
    borderLighter: 'border-blue-100',
    hoverBorder: 'hover:border-blue-400',
    text: 'text-blue-700',
    hoverText: 'hover:text-blue-700',
    lightBg: 'bg-blue-50',
    lightBgHover: 'hover:bg-blue-100',
    subtleBg: 'bg-blue-50/40',
    ring: 'focus:ring-blue-500',
  },
  vocabulary: {
    solid: 'bg-pink-500',
    solidHover: 'hover:bg-pink-600',
    border: 'border-pink-500',
    borderLight: 'border-pink-300',
    borderLighter: 'border-pink-100',
    hoverBorder: 'hover:border-pink-400',
    text: 'text-pink-700',
    hoverText: 'hover:text-pink-700',
    lightBg: 'bg-pink-50',
    lightBgHover: 'hover:bg-pink-100',
    subtleBg: 'bg-pink-50/40',
    ring: 'focus:ring-pink-500',
  },
  reading: {
    solid: 'bg-red-600',
    solidHover: 'hover:bg-red-700',
    border: 'border-red-600',
    borderLight: 'border-red-300',
    borderLighter: 'border-red-100',
    hoverBorder: 'hover:border-red-400',
    text: 'text-red-700',
    hoverText: 'hover:text-red-700',
    lightBg: 'bg-red-50',
    lightBgHover: 'hover:bg-red-100',
    subtleBg: 'bg-red-50/40',
    ring: 'focus:ring-red-500',
  },
  writing: {
    solid: 'bg-purple-600',
    solidHover: 'hover:bg-purple-700',
    border: 'border-purple-600',
    borderLight: 'border-purple-300',
    borderLighter: 'border-purple-100',
    hoverBorder: 'hover:border-purple-400',
    text: 'text-purple-700',
    hoverText: 'hover:text-purple-700',
    lightBg: 'bg-purple-50',
    lightBgHover: 'hover:bg-purple-100',
    subtleBg: 'bg-purple-50/40',
    ring: 'focus:ring-purple-500',
  },
};
export const DEFAULT_THEME = {
  solid: 'bg-emerald-600',
  solidHover: 'hover:bg-emerald-700',
  border: 'border-emerald-600',
  borderLight: 'border-emerald-300',
  borderLighter: 'border-emerald-100',
  hoverBorder: 'hover:border-emerald-400',
  text: 'text-emerald-700',
  hoverText: 'hover:text-emerald-700',
  lightBg: 'bg-emerald-50',
  lightBgHover: 'hover:bg-emerald-100',
  subtleBg: 'bg-emerald-50/40',
  ring: 'focus:ring-emerald-500',
};
