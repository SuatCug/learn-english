// Seviye sınavları (Exams) için ortak görünüm ayarları. Tüm sınav ekranları tek renk (sitenin yeşili) kullanır.
import { Headphones, BookOpen, MessageCircleMore, Bookmark, Pencil } from 'lucide-react';

// Bölüm -> ikon (sınavlar sayfası ve sınav giriş ekranı).
export const EXAM_SECTION_ICONS = {
  listening: Headphones,
  reading: BookOpen,
  grammar: MessageCircleMore,
  vocabulary: Bookmark,
  writing: Pencil,
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
