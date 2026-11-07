// Konu kartı resimlerini Cloudinary'ye yükler. Public ID'ler data/*Curriculum.js'teki `image` alanıyla
// birebir aynıdır (topics/<kategori>/<seviye>/<dosya>), böylece seed'deki konular resimlerini doğrudan
// bulur. Aynı ID tekrar yüklenirse üzerine yazılır (resmi değiştirmek için dosyayı değiştirip scripti
// yeniden çalıştırman yeterli).
//
// Gerekenler (backend/.env): CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
// Çalıştırmak için: node utils/uploadTopicImages.js [grammar|vocabulary|reading|writing|listening|all]
//   (varsayılan: all)
// Resimler <proje kökü>/topic-images altında, zip'lerden çıktığı klasör yapısıyla durur (aşağıdaki SETS).
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { GRAMMAR_CURRICULUM, grammarImageId, grammarImageLevel } = require('../data/grammarCurriculum');
const { VOCABULARY_CURRICULUM, vocabularyImageId } = require('../data/vocabularyCurriculum');
const { READING_DATA } = require('../data/readingData');
const { WRITING_DATA } = require('../data/writingData');
const { LISTENING_DATA } = require('../data/listeningData');
const { topicImageFile } = require('../data/topicImages');
const { getConfig, uploadToCloudinary } = require('./cloudinary.util');

const IMAGES_ROOT = path.join(__dirname, '../../topic-images');
const LEVEL_DIRS = { A1: 'A1-Beginner', A2: 'A2-Elementary', B1: 'B1-Intermediate', B2: 'B2-Upper-Intermediate' };

// Reading/Writing/Listening: dosya adları sıra + başlıktan türetilir (data/topicImages.js).
const derivedSet = (category, data, folder) => ({
  curriculum: Object.fromEntries(
    Object.entries(data).map(([level, items]) => [level, items.map((item, i) => [topicImageFile(i, item.title)])])
  ),
  imageId: (level, file) => `topics/${category}/${level.toLowerCase()}/${file}`,
  dir: path.join(IMAGES_ROOT, 'rwl', folder),
});

const SETS = {
  grammar: {
    curriculum: GRAMMAR_CURRICULUM,
    imageId: grammarImageId,
    // Taşınan konuların resmi eski seviyenin klasöründe; { image: false } olanların resmi yok.
    imageLevel: grammarImageLevel,
    dir: path.join(IMAGES_ROOT, 'LearnEnglish-Kartlar'),
    extraDir: 'Ekstra',
  },
  vocabulary: {
    curriculum: VOCABULARY_CURRICULUM,
    imageId: vocabularyImageId,
    dir: path.join(IMAGES_ROOT, 'vocabulary', 'Vocabulary'),
  },
  reading: derivedSet('reading', READING_DATA, 'Reading'),
  writing: derivedSet('writing', WRITING_DATA, 'Writing'),
  listening: derivedSet('listening', LISTENING_DATA, 'Listening'),
};

const findFile = (set, level, file) =>
  [path.join(set.dir, LEVEL_DIRS[level], `${file}.png`), set.extraDir && path.join(set.dir, set.extraDir, `${file}.png`)]
    .filter(Boolean)
    .find((p) => fs.existsSync(p));

const run = async () => {
  getConfig();
  const which = process.argv[2] || 'all';
  const names = which === 'all' ? Object.keys(SETS) : [which];
  if (!names.every((n) => SETS[n])) throw new Error(`Geçersiz seçim: ${which} (${Object.keys(SETS).join(' | ')} | all)`);

  const jobs = names.flatMap((name) => {
    const set = SETS[name];
    if (!fs.existsSync(set.dir)) throw new Error(`Resim klasörü bulunamadı: ${set.dir}`);
    return Object.entries(set.curriculum).flatMap(([level, rows]) =>
      rows
        .map(([file, , , options]) => ({ file, imageLevel: set.imageLevel ? set.imageLevel(level, options) : level }))
        .filter(({ imageLevel }) => imageLevel)
        .map(({ file, imageLevel }) => ({
          level: imageLevel,
          file,
          publicId: set.imageId(imageLevel, file),
          filePath: findFile(set, imageLevel, file),
        }))
    );
  });

  const missing = jobs.filter((j) => !j.filePath);
  missing.forEach((j) => console.warn(`⚠️  Dosya yok, atlandı: ${j.publicId}`));

  let done = 0;
  const failed = [];
  for (const job of jobs.filter((j) => j.filePath)) {
    try {
      await uploadToCloudinary({ buffer: fs.readFileSync(job.filePath), fileName: job.filePath, publicId: job.publicId });
      done += 1;
      console.log(`✅ ${done}  ${job.publicId}`);
    } catch (error) {
      failed.push(job.publicId);
      console.error(`❌ ${job.publicId}: ${error.message}`);
    }
  }

  console.log(`\nBitti: ${done} yüklendi, ${failed.length} hata, ${missing.length} eksik dosya.`);
  process.exit(failed.length ? 1 : 0);
};

run().catch((error) => {
  console.error('❌ Yükleme başarısız oldu:', error.message);
  process.exit(1);
});
