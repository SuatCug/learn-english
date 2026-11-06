// Reading / Writing / Listening kart resimlerinin adı, konunun seviyedeki sırasından ve başlığından
// türetilir: "Guess Who?" (A1'in 1. konusu) -> 01-guess-who. Cloudinary public ID'si:
// topics/<kategori>/<seviye>/<dosya>. (Grammar ve Vocabulary'de dosya adları müfredat dosyalarında yazılı.)
// docs/reading-writing-listening-konulari.md listesi ve kapak zip'i bu kurala göre hazırlandı.

const slugify = (title) =>
  title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const topicImageFile = (index, title) => `${String(index + 1).padStart(2, '0')}-${slugify(title)}`;

const topicImageId = (category, level, index, title) =>
  `topics/${category}/${level.toLowerCase()}/${topicImageFile(index, title)}`;

module.exports = { slugify, topicImageFile, topicImageId };
