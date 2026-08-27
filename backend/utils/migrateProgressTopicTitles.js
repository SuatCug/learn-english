// topicTitle artık progress kayıtları için required bir alan; bu script mevcut kayıtları
// (bu alan eklenmeden önce oluşturulmuş) geriye dönük doldurur. Aksi halde bu eski kayıtları
// taşıyan bir user dokümanı bir sonraki save() çağrısında (şifre değişikliği, yeni progress,
// rozet kazanma vb.) doğrulama hatasıyla başarısız olur.
//
// Doğrudan targeted $set update'leri kullanır (user.save() yerine) — canlı sunucu aynı anda
// bir kullanıcı dokümanını güncellerse optimistic concurrency (VersionError) hatası almamak için.
// Çalıştırmak için: node utils/migrateProgressTopicTitles.js
require('dotenv').config();
const connectDB = require('../config/db');
const { User, Topic } = require('../models');

const migrate = async () => {
  await connectDB();

  const topics = await Topic.find().select('title');
  const titleById = new Map(topics.map((t) => [t._id.toString(), t.title]));

  const users = await User.find({ 'progress.topicTitle': { $exists: false } }).select('progress');

  const bulkOps = [];
  users.forEach((user) => {
    user.progress.forEach((entry, index) => {
      if (entry.topicTitle) return;
      const topicTitle = titleById.get(entry.topicId?.toString()) || 'Deleted topic';
      bulkOps.push({
        updateOne: {
          filter: { _id: user._id },
          update: { $set: { [`progress.${index}.topicTitle`]: topicTitle } },
        },
      });
    });
  });

  if (bulkOps.length) await User.bulkWrite(bulkOps);

  console.log(`✅ ${users.length} kullanıcıda ${bulkOps.length} progress kaydına topicTitle eklendi.`);
  process.exit(0);
};

migrate().catch((error) => {
  console.error('❌ Migration başarısız oldu:', error);
  process.exit(1);
});
