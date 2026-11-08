// Seviye sınavları (Exams) için ortak görünüm ayarları.

// Her seviyenin kart başlığı / buton rengi.
export const EXAM_LEVEL_STYLES = {
  A1: { banner: 'bg-emerald-500', button: 'bg-emerald-600 hover:bg-emerald-700', dot: '#10b981' },
  A2: { banner: 'bg-sky-500', button: 'bg-sky-600 hover:bg-sky-700', dot: '#0ea5e9' },
  B1: { banner: 'bg-violet-500', button: 'bg-violet-600 hover:bg-violet-700', dot: '#8b5cf6' },
  B2: { banner: 'bg-rose-500', button: 'bg-rose-600 hover:bg-rose-700', dot: '#f43f5e' },
};

// Bölüm -> lucide ikon adı.
export const EXAM_SECTION_ICONS = {
  listening: 'Headphones',
  reading: 'BookOpen',
  grammar: 'SpellCheck',
  vocabulary: 'Languages',
  writing: 'PenLine',
};

// ListeningPlayer'ın beklediği tema (sınav ekranı yeşil temayı kullanır).
export const EXAM_PLAYER_THEME = {
  solid: 'bg-emerald-600',
  solidHover: 'hover:bg-emerald-700',
  borderLight: 'border-emerald-300',
  borderLighter: 'border-emerald-100',
  text: 'text-emerald-700',
  lightBgHover: 'hover:bg-emerald-100',
  subtleBg: 'bg-emerald-50/40',
  accent: 'accent-emerald-600',
};
