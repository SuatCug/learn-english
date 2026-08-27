const { Badge, Topic } = require('../models');

const dayKey = (date) => new Date(date).toISOString().slice(0, 10);

// En uzun ardışık gün serisini hesaplar (streak rozetleri için).
const longestStreak = (days) => {
  const sorted = [...days].sort();
  let longest = sorted.length ? 1 : 0;
  let current = 1;
  for (let i = 1; i < sorted.length; i += 1) {
    const diffDays = (new Date(sorted[i]) - new Date(sorted[i - 1])) / 86400000;
    current = diffDays === 1 ? current + 1 : 1;
    longest = Math.max(longest, current);
  }
  return longest;
};

// Bugünden (veya henüz bugün çalışılmadıysa dünden) geriye doğru kaç gün kesintisiz
// aktivite olduğunu hesaplar — profil sayfasındaki "güncel seri" göstergesi için.
const currentStreak = (days) => {
  const daySet = new Set(days);
  const cursor = new Date();
  cursor.setUTCHours(0, 0, 0, 0);

  if (!daySet.has(dayKey(cursor))) {
    cursor.setUTCDate(cursor.getUTCDate() - 1);
    if (!daySet.has(dayKey(cursor))) return 0;
  }

  let streak = 0;
  while (daySet.has(dayKey(cursor))) {
    streak += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return streak;
};

const criteriaCheckers = {
  topics_completed: (user) => {
    // Canlı oyun (Live Game) kayıtlarının topicId'si yoktur — gerçek bir konu tamamlanmış sayılmaz.
    const distinctTopics = new Set(user.progress.filter((p) => p.topicId).map((p) => p.topicId.toString()));
    return (badge) => distinctTopics.size >= badge.criteriaValue;
  },
  perfect_score: (user) => {
    const perfectCount = user.progress.filter((p) => p.score === 100).length;
    return (badge) => perfectCount >= badge.criteriaValue;
  },
  streak: (user) => {
    const days = new Set(user.progress.map((p) => dayKey(p.completedAt)));
    const streak = longestStreak(days);
    return (badge) => streak >= badge.criteriaValue;
  },
};

// Kullanıcının ilerlemesine göre henüz kazanılmamış rozetleri kontrol edip kazandırır.
const evaluateBadges = async (user) => {
  const candidateBadges = await Badge.find({ _id: { $nin: user.badges } });
  if (!candidateBadges.length) return [];

  const completedTopicIds = new Set(user.progress.filter((p) => p.topicId).map((p) => p.topicId.toString()));
  let levelCompleted = false;
  if (user.level) {
    const levelTopicIds = await Topic.find({ level: user.level }).distinct('_id');
    levelCompleted = levelTopicIds.length > 0 && levelTopicIds.every((id) => completedTopicIds.has(id.toString()));
  }

  const simpleCheckers = {
    topics_completed: criteriaCheckers.topics_completed(user),
    perfect_score: criteriaCheckers.perfect_score(user),
    streak: criteriaCheckers.streak(user),
    level_completed: (badge) => levelCompleted && badge.criteriaValue <= 1,
  };

  const newlyAwarded = candidateBadges.filter((badge) => simpleCheckers[badge.criteriaType]?.(badge));

  if (newlyAwarded.length) {
    user.badges.push(...newlyAwarded.map((b) => b._id));
    await user.save();
  }

  return newlyAwarded;
};

module.exports = { evaluateBadges, dayKey, currentStreak };
