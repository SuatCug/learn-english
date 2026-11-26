const { Badge, Topic, Conversation } = require('../models');
const { fullyCompletedTopicIds } = require('./topicCompletion.util');

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

// Rozet koşullarının hesaplanması için kullanıcının tüm etkinliklerinden tek seferde özet çıkarır:
// dersler (progress), sınavlar (examResults), Level Test, AI sohbetleri (Conversation) ve canlı oyunlar.
const buildStats = async (user) => {
  // Canlı oyun (Live Game) kayıtlarının topicId'si yoktur — gerçek bir konu tamamlanmış sayılmaz.
  const lessonEntries = user.progress.filter((p) => p.topicId);
  // Konu, TÜM alıştırmaları bitince tamamlanmış sayılır (utils/topicCompletion.util.js).
  const completedTopicIds = await fullyCompletedTopicIds(lessonEntries);

  const topicsByCategory = {};
  lessonEntries.forEach((p) => {
    const id = (p.topicId._id ?? p.topicId).toString();
    if (!p.category || !completedTopicIds.has(id)) return;
    (topicsByCategory[p.category] ??= new Set()).add(id);
  });

  let levelCompleted = false;
  if (user.level) {
    const levelTopicIds = await Topic.find({ level: user.level }).distinct('_id');
    levelCompleted = levelTopicIds.length > 0 && levelTopicIds.every((id) => completedTopicIds.has(id.toString()));
  }

  // Sonucu (değerlendirmesi) alınmış AI sohbetleri: moda göre sayı ve en yüksek puan.
  const aiRows = await Conversation.aggregate([
    { $match: { userId: user._id, finished: true, 'result.score': { $ne: null } } },
    { $group: { _id: '$mode', count: { $sum: 1 }, best: { $max: '$result.score' } } },
  ]);
  const aiCount = Object.fromEntries(aiRows.map((r) => [r._id, r.count]));
  const aiBest = aiRows.reduce((max, r) => Math.max(max, r.best ?? 0), 0);

  return {
    topicsCompleted: completedTopicIds.size,
    topicsByCategory,
    levelCompleted,
    perfectCount: lessonEntries.filter((p) => p.score === 100).length,
    longestStreak: longestStreak(new Set(user.progress.map((p) => dayKey(p.completedAt)))),
    placementCompleted: Boolean(user.placementTestCompleted),
    examsPassed: new Set((user.examResults ?? []).filter((r) => r.passed).map((r) => r.level)).size,
    aiCount,
    aiBest,
    gamesPlayed: user.progress.filter((p) => p.source === 'game').length,
  };
};

// Her koşul türü için: (özet, rozet) → kazanıldı mı.
const criteriaCheckers = {
  topics_completed: (s, b) => s.topicsCompleted >= b.criteriaValue,
  level_completed: (s) => s.levelCompleted,
  perfect_score: (s, b) => s.perfectCount >= b.criteriaValue,
  streak: (s, b) => s.longestStreak >= b.criteriaValue,
  category_topics: (s, b) => (s.topicsByCategory[b.criteriaCategory]?.size ?? 0) >= b.criteriaValue,
  placement_completed: (s) => s.placementCompleted,
  exams_passed: (s, b) => s.examsPassed >= b.criteriaValue,
  ai_conversations: (s, b) => (s.aiCount[b.criteriaCategory] ?? 0) >= b.criteriaValue,
  ai_high_score: (s, b) => s.aiBest >= b.criteriaValue,
  games_played: (s, b) => s.gamesPlayed >= b.criteriaValue,
};

// Kullanıcının henüz kazanmadığı rozetleri kontrol edip kazandırır; yeni kazanılanları döndürür.
// Ders/oyun bitişinde, sınav ve Level Test gönderiminde, AI sohbeti bitişinde ve profil açılışında çağrılır.
const evaluateBadges = async (user) => {
  const allBadges = await Badge.find().sort({ order: 1 });

  // Artık var olmayan rozetlere (eski seed'lerde silinip yeniden yaratılanlar) kalan bağlantıları temizle,
  // aynı rozetin tekrarını da at.
  const existingIds = new Set(allBadges.map((b) => b._id.toString()));
  const earnedIds = new Set(user.badges.map((id) => id.toString()).filter((id) => existingIds.has(id)));
  const cleaned = earnedIds.size !== user.badges.length;
  if (cleaned) user.badges = [...earnedIds];

  const candidateBadges = allBadges.filter((b) => !earnedIds.has(b._id.toString()));
  const stats = candidateBadges.length ? await buildStats(user) : null;
  const newlyAwarded = candidateBadges.filter((badge) => criteriaCheckers[badge.criteriaType]?.(stats, badge));

  if (newlyAwarded.length) user.badges.push(...newlyAwarded.map((b) => b._id));
  if (newlyAwarded.length || cleaned) await user.save();

  return newlyAwarded;
};

module.exports = { evaluateBadges, dayKey, currentStreak, longestStreak, criteriaCheckers };
