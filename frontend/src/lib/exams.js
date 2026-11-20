// Seviye sınavları (Exams) için ortak görünüm ayarları. Tüm sınav ekranları tek renk (sitenin yeşili) kullanır.
import { tk } from '@/i18n';

// Sınav bölüm yönergeleri backend'den İngilizce gelir (backend/data/levelExams.js SECTION_META) ve ekranda
// t(section.instructions) ile çevrilir. Bu liste sadece çeviri kontrolü içindir (npm run i18n:check);
// backend'de yönerge değişirse burası ve i18n/tr.js de güncellenmeli.
export const EXAM_SECTION_TEXTS = [
  tk('Listen to each recording and choose the best answer (A, B, C or D) for each question.'),
  tk('Read each text carefully and choose the best answer (A, B, C or D) for each question.'),
  tk('Choose the best option (A, B, C or D) to complete each sentence.'),
  tk('Complete each text by typing the correct word from the word box into each gap. Use each word once.'),
];

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
