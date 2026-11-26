const mongoose = require('mongoose');
const { Question } = require('../models');

// Bir konu ancak TÜM alıştırmaları (Question.exerciseGroup; çoğu konuda 3) bitince "tamamlandı" sayılır.
// İlerleme, rozetler, seviye atlama, ödevler ve "günün konuları" hep bu tanımı kullanır.

// Konu başına alıştırma sayısı. Sorular nadiren değiştiği için kısa süreli bellekte tutulur.
const CACHE_MS = 10 * 60 * 1000;
const cache = new Map(); // topicId -> { count, at }

const getExerciseCounts = async (topicIds) => {
  const ids = [...new Set(topicIds.map(String))];
  const now = Date.now();
  const missing = ids.filter((id) => {
    const hit = cache.get(id);
    return !hit || now - hit.at > CACHE_MS;
  });
  if (missing.length) {
    const rows = await Question.aggregate([
      { $match: { topicId: { $in: missing.map((id) => new mongoose.Types.ObjectId(id)) } } },
      { $group: { _id: { t: '$topicId', g: { $ifNull: ['$exerciseGroup', 1] } } } },
      { $group: { _id: '$_id.t', count: { $sum: 1 } } },
    ]);
    const found = new Map(rows.map((r) => [r._id.toString(), r.count]));
    missing.forEach((id) => cache.set(id, { count: found.get(id) || 1, at: now }));
  }
  return new Map(ids.map((id) => [id, cache.get(id).count]));
};

// progress kayıtlarını konuya göre gruplar: bitirilen alıştırma grupları, her grubun son puanı, son tarih.
const groupByTopic = (entries) => {
  const byTopic = new Map();
  entries
    .filter((p) => p.topicId)
    .forEach((p) => {
      const key = (p.topicId._id ?? p.topicId).toString();
      const entry = byTopic.get(key) ?? { groups: new Map(), lastAt: null };
      const group = p.exerciseGroup ?? 1;
      const at = new Date(p.completedAt);
      const prev = entry.groups.get(group);
      if (!prev || at >= prev.at) entry.groups.set(group, { score: p.score, at });
      if (!entry.lastAt || at > entry.lastAt) entry.lastAt = at;
      byTopic.set(key, entry);
    });
  return byTopic;
};

// Tüm alıştırmaları bitirilmiş konuların id'leri (string Set).
const fullyCompletedTopicIds = async (entries) => {
  const byTopic = groupByTopic(entries);
  if (!byTopic.size) return new Set();
  const counts = await getExerciseCounts([...byTopic.keys()]);
  return new Set([...byTopic.entries()].filter(([id, e]) => e.groups.size >= (counts.get(id) ?? 1)).map(([id]) => id));
};

module.exports = { getExerciseCounts, groupByTopic, fullyCompletedTopicIds };
