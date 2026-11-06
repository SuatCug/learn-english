import grammarIllustration from '@/assets/home-grammar.webp';
import vocabularyIllustration from '@/assets/home-vocabulary.webp';
import writingIllustration from '@/assets/home-writing.webp';
import readingIllustration from '@/assets/home-reading.webp';
import listeningIllustration from '@/assets/home-listening.webp';

// Kendi kart resmi olmayan konular için kategori bazlı yedek görsel.
export const CATEGORY_ILLUSTRATIONS = {
  grammar: grammarIllustration,
  vocabulary: vocabularyIllustration,
  writing: writingIllustration,
  reading: readingIllustration,
  listening: listeningIllustration,
};

// Kart resimleri 1200×630; kutu biraz daha basık (1200×600), object-cover alttan/üstten ~%2,5 kırpar —
// resimlerdeki yazılar kenara yakın olmadığı için etkilenmez.
export const CARD_IMAGE_BOX = 'aspect-[1200/600]';
