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

// Kategori sayfasındaki (/topics/:category) seviye kartlarının kapakları: her seviyeye ayrı gerçek fotoğraf,
// ana sayfadaki kategori kartlarından da farklı. Dosyalar assets/levels/<kategori>-<seviye>.webp
// (Unsplash, Unsplash lisansı, 900×500 webp). Kaynaklar (photo-…), A1 / A2 / B1 / B2 sırasıyla:
// grammar     1580582932707 / 1588072432836 / 1509062522246 / 1546410531
// vocabulary  1456513080510 / 1457369804613 / 1544716278 / 1589998059171
// reading     1532012197267 / 1491841550275 / 1507842217343 / 1524995997946
// writing     1434030216411 / 1517842645767 / 1456324504439 / 1488190211105
// listening   1524678606370 / 1505740420928 / 1546435770 / 1478737270239
const levelImages = import.meta.glob('@/assets/levels/*.webp', { eager: true, import: 'default' });
const levelImage = (category, level) =>
  Object.entries(levelImages).find(([path]) => path.endsWith(`/${category}-${level.toLowerCase()}.webp`))?.[1];

// Seviye fotoğrafı yoksa kategori görseline düşer.
export const levelIllustration = (category, level) => levelImage(category, level) ?? CATEGORY_ILLUSTRATIONS[category];

// Kart resimleri 1200×630; kutu biraz daha basık (1200×600), object-cover alttan/üstten ~%2,5 kırpar —
// resimlerdeki yazılar kenara yakın olmadığı için etkilenmez.
export const CARD_IMAGE_BOX = 'aspect-[1200/600]';
