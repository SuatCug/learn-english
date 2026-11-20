import { Badge, Book, File, NotebookPen, Headphones } from 'lucide-react';
import { CATEGORY_COLORS } from '@/lib/rooms';

export { CATEGORY_COLORS };

// Her kategorinin kendi hazır Lucide ikonu var.
// Grammar: dalgalı rozet, Vocabulary: kitap, Reading: sayfa, Writing: kalemli defter, Listening: kulaklık.
const CATEGORY_ICONS = {
  grammar: Badge,
  vocabulary: Book,
  reading: File,
  writing: NotebookPen,
  listening: Headphones,
};

// Kalemli defterde kalem sağ üstte; kod defterin alttaki boş kısmına kaydırılır.
const CODE_OFFSET = {
  writing: 'translate-x-[1px] translate-y-[7px]',
  // Kulaklıkta boşluk, bandın altında iki kulaklık arasında.
  listening: 'translate-y-[4px]',
};

export const categoryColor = (slug) => CATEGORY_COLORS[slug] ?? '#50af31';

// Kategorinin ikonu (emoji yerine). Renk verilmezse kategori rengi kullanılır.
export function CategoryIcon({ slug, size = 20, color, strokeWidth = 1.5, className = '' }) {
  const Icon = CATEGORY_ICONS[slug] ?? Badge;
  return (
    <Icon
      size={size}
      strokeWidth={strokeWidth}
      color={color ?? categoryColor(slug)}
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    />
  );
}

// Kategori ikonu, içinde seviye kodu (A1…) yazılı; navbar menüleri ve ders aramasında kullanılır.
export function LevelBadge({ code, slug, color = categoryColor(slug) }) {
  const Icon = CATEGORY_ICONS[slug] ?? Badge;
  return (
    <span className="relative w-9 h-9 shrink-0 flex items-center justify-center" style={{ color }}>
      <Icon size={36} strokeWidth={1.1} className="absolute inset-0" aria-hidden="true" />
      <span className={`relative font-medium leading-none ${CODE_OFFSET[slug] ?? ''} ${code.length > 2 ? 'text-[8.5px]' : 'text-[10px]'}`}>
        {code}
      </span>
    </span>
  );
}
