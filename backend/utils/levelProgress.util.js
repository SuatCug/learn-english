const { Topic } = require('../models');

const LEVEL_ORDER = ['A1', 'A2', 'B1', 'B1+', 'B2', 'C1', 'C2'];

// Bir sonraki seviyeye geçmek için tamamlanması istenen konu sayısı. Bir seviyede bundan
// daha az konu varsa (ör. C1/C2), hedef o seviyenin gerçek konu sayısına düşürülür —
// aksi halde imkansız bir hedef olurdu.
const LEVEL_UP_TOPICS_REQUIRED = 80;

const getRequiredTopicCount = async (level) => {
  const totalAtLevel = await Topic.countDocuments({ level });
  return Math.min(LEVEL_UP_TOPICS_REQUIRED, totalAtLevel);
};

// Kullanıcının mevcut seviyesinde yeterli sayıda (farklı) konu tamamlanmışsa bir sonraki
// CEFR seviyesine otomatik geçirir. user.progress zaten güncel/kaydedilmiş olmalı.
const maybeLevelUp = async (user) => {
  if (!user.level) return null;

  const levelIndex = LEVEL_ORDER.indexOf(user.level);
  const nextLevel = LEVEL_ORDER[levelIndex + 1];
  if (!nextLevel) return null;

  const distinctTopicIds = [...new Set(user.progress.filter((p) => p.topicId).map((p) => p.topicId.toString()))];
  if (!distinctTopicIds.length) return null;

  const completedAtLevel = await Topic.countDocuments({ _id: { $in: distinctTopicIds }, level: user.level });
  const requiredCount = await getRequiredTopicCount(user.level);

  if (requiredCount > 0 && completedAtLevel >= requiredCount) {
    user.level = nextLevel;
    await user.save();
    return nextLevel;
  }

  return null;
};

module.exports = { LEVEL_ORDER, LEVEL_UP_TOPICS_REQUIRED, getRequiredTopicCount, maybeLevelUp };
