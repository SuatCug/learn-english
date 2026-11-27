const mongoose = require('mongoose');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const { User, GameResult } = require('../models');
const { evaluateBadges } = require('../utils/badgeEngine');

// Oyun Merkezi (tek kişilik oyunlar) sonuçları, rozetleri ve haftalık sıralama.

// Puan kuralları mobildeki lib/games.js ile aynı: doğru cevap 100, süreliyse hız bonusu en fazla 50.
const POINTS_CORRECT = 100;
const POINTS_SPEED_MAX = 50;
const HISTORY_LIMIT = 30;
const LEADERBOARD_SIZE = 20;

// Haftanın başı (Pazartesi 00:00, Türkiye saati UTC+3).
const TR_OFFSET_MS = 3 * 60 * 60 * 1000;
const weekStart = (now = new Date()) => {
  const local = new Date(now.getTime() + TR_OFFSET_MS);
  const day = (local.getUTCDay() + 6) % 7; // Pazartesi = 0
  local.setUTCHours(0, 0, 0, 0);
  local.setUTCDate(local.getUTCDate() - day);
  return new Date(local.getTime() - TR_OFFSET_MS);
};

// Sıralamada tam ad yerine "Ad S." gösterilir.
const displayName = (name) => {
  const parts = String(name ?? '').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return 'Oyuncu';
  return parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1][0].toUpperCase()}.` : parts[0];
};

const toClient = (r) => ({
  id: r._id,
  clientId: r.clientId,
  type: r.type,
  section: r.section,
  level: r.level,
  timed: r.timed,
  total: r.total,
  correct: r.correct,
  score: r.score,
  durationMs: r.durationMs,
  playedAt: r.playedAt,
});

const saveResult = asyncHandler(async (req, res) => {
  const { clientId, type, section, level, timed = false, total, correct, score, durationMs = 0, playedAt } = req.body;
  if (correct > total) throw new ApiError(400, 'Doğru sayısı toplamdan büyük olamaz.');
  const maxScore = correct * (POINTS_CORRECT + (timed ? POINTS_SPEED_MAX : 0));
  if (score > maxScore) throw new ApiError(400, 'Puan geçersiz.');

  // Telefonda bekleyip sonradan gönderilen sonuç: gelecekteki ya da çok eski tarih kabul edilmez.
  const now = Date.now();
  let when = playedAt ? new Date(playedAt) : new Date(now);
  if (Number.isNaN(when.getTime()) || when.getTime() > now + 5 * 60 * 1000 || when.getTime() < now - 60 * 86400000) {
    when = new Date(now);
  }

  let created = false;
  let result = await GameResult.findOne({ userId: req.user.id, clientId });
  if (!result) {
    try {
      result = await GameResult.create({
        userId: req.user.id, clientId, type, section, level, timed, total, correct, score, durationMs, playedAt: when,
      });
      created = true;
    } catch (err) {
      // Aynı anda iki istek: ikincisi tekil indekse takılır, kayıtlı olan döndürülür.
      if (err?.code !== 11000) throw err;
      result = await GameResult.findOne({ userId: req.user.id, clientId });
    }
  }

  let newBadges = [];
  if (created) {
    const user = await User.findById(req.user.id);
    if (user) newBadges = await evaluateBadges(user);
  }

  res.status(created ? 201 : 200).json({
    success: true,
    data: {
      result: toClient(result),
      newBadges: newBadges.map((b) => ({ _id: b._id, title: b.title, description: b.description, icon: b.icon })),
    },
  });
});

// Kullanıcının son oyunları + oyun türüne göre en iyi puanlar + toplamlar.
const myResults = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const oid = new mongoose.Types.ObjectId(userId);
  const [recent, bestRows, totals] = await Promise.all([
    GameResult.find({ userId }).sort({ playedAt: -1 }).limit(HISTORY_LIMIT).lean(),
    GameResult.aggregate([
      { $match: { userId: oid } },
      { $group: { _id: '$type', best: { $max: '$score' }, count: { $sum: 1 } } },
    ]),
    GameResult.aggregate([
      { $match: { userId: oid } },
      { $group: { _id: null, games: { $sum: 1 }, score: { $sum: '$score' } } },
    ]),
  ]);
  res.json({
    success: true,
    data: {
      results: recent.map(toClient),
      bestByType: Object.fromEntries(bestRows.map((r) => [r._id, { best: r.best, count: r.count }])),
      totalGames: totals[0]?.games ?? 0,
      totalScore: totals[0]?.score ?? 0,
    },
  });
});

// Sıralama: bu hafta (varsayılan) ya da tüm zamanlar, toplam puana göre ilk 20 + kullanıcının kendi sırası.
const leaderboard = asyncHandler(async (req, res) => {
  const period = req.query.period === 'all' ? 'all' : 'week';
  const match = period === 'week' ? { playedAt: { $gte: weekStart() } } : {};
  const rows = await GameResult.aggregate([
    { $match: match },
    { $group: { _id: '$userId', score: { $sum: '$score' }, games: { $sum: 1 } } },
    { $sort: { score: -1, games: 1, _id: 1 } },
  ]);

  const top = rows.slice(0, LEADERBOARD_SIZE);
  const users = await User.find({ _id: { $in: top.map((r) => r._id) } }).select('name level').lean();
  const byId = new Map(users.map((u) => [u._id.toString(), u]));
  const meIndex = rows.findIndex((r) => r._id.toString() === req.user.id);

  res.json({
    success: true,
    data: {
      period,
      since: period === 'week' ? weekStart() : null,
      entries: top
        .filter((r) => byId.has(r._id.toString())) // silinmiş hesaplar atlanır
        .map((r, i) => {
          const u = byId.get(r._id.toString());
          return { rank: i + 1, name: displayName(u.name), level: u.level, score: r.score, games: r.games, isMe: r._id.toString() === req.user.id };
        }),
      me: meIndex >= 0 ? { rank: meIndex + 1, score: rows[meIndex].score, games: rows[meIndex].games } : null,
      players: rows.length,
    },
  });
});

module.exports = { saveResult, myResults, leaderboard, weekStart, displayName };
