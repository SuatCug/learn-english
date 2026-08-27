const { User } = require('../models');
const { evaluateBadges } = require('./badgeEngine');
const { maybeLevelUp } = require('./levelProgress.util');

// Hem normal ders tamamlamada (user.controller.js#addProgress) hem de canlı oyun bitişinde
// (sockets/index.js) kullanılan ortak "ilerleme ekle + kaydet + rozet değerlendir" adımı.
const appendProgressEntry = async (userId, entryFields) => {
  const user = await User.findById(userId);
  if (!user) return null;

  user.progress.push({
    topicId: null,
    topicTitle: null,
    score: 0,
    exerciseGroup: 1,
    answers: [],
    assignmentId: null,
    source: 'lesson',
    category: null,
    completedAt: new Date(),
    ...entryFields,
  });
  await user.save();

  const newlyAwardedBadges = await evaluateBadges(user);
  const leveledUpTo = await maybeLevelUp(user);

  return { user, newlyAwardedBadges, leveledUpTo };
};

module.exports = { appendProgressEntry };
