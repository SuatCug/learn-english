// Rozet motoru (utils/badgeEngine.js): seri hesapları, koşullar ve evaluateBadges (veritabanı sahte).
const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { Badge, Topic, Conversation, GameResult } = require('../models');
const { evaluateBadges, longestStreak, currentStreak, dayKey } = require('../utils/badgeEngine');

// Konu tamamlama alıştırma sayısını Question koleksiyonundan okur (utils/topicCompletion.util.js);
// testte veritabanı yok: her konu tek alıştırmalı sayılır.
require('node:test').mock.method(require('../models').Question, 'aggregate', async () => []);

const id = () => new mongoose.Types.ObjectId();
const daysAgo = (n) => {
  const d = new Date();
  d.setUTCHours(12, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() - n);
  return d;
};

test('longestStreak: ardışık en uzun gün serisi', () => {
  assert.equal(longestStreak(new Set()), 0);
  assert.equal(longestStreak(new Set(['2026-01-01'])), 1);
  assert.equal(longestStreak(new Set(['2026-01-01', '2026-01-02', '2026-01-03', '2026-01-05'])), 3);
  assert.equal(longestStreak(new Set(['2026-01-31', '2026-02-01'])), 2, 'ay geçişi');
  assert.equal(longestStreak(new Set(['2026-01-03', '2026-01-01', '2026-01-02'])), 3, 'sırasız giriş');
});

test('currentStreak: bugün veya dün biten seri', () => {
  assert.equal(currentStreak([0, 1, 2].map((n) => dayKey(daysAgo(n)))), 3);
  assert.equal(currentStreak([1, 2].map((n) => dayKey(daysAgo(n)))), 2, 'bugün henüz çalışılmadı');
  assert.equal(currentStreak([2, 3].map((n) => dayKey(daysAgo(n)))), 0, 'dün de çalışılmadı → seri bitti');
});

// --- evaluateBadges: Badge/Topic/Conversation sorguları sahte ---

const badge = (title, criteriaType, criteriaValue, criteriaCategory = null) => ({
  _id: id(), title, criteriaType, criteriaValue, criteriaCategory,
});

const BADGES = [
  badge('First Step', 'topics_completed', 1),
  badge('Dedicated Learner', 'topics_completed', 10),
  badge('Grammar Guru', 'category_topics', 2, 'grammar'),
  badge('Perfect Score', 'perfect_score', 1),
  badge('Warming Up', 'streak', 3),
  badge('Level Master', 'level_completed', 1),
  badge('Know Your Level', 'placement_completed', 1),
  badge('Certified', 'exams_passed', 1),
  badge('Exam Champion', 'exams_passed', 4),
  badge('First Words', 'ai_conversations', 1, 'talk'),
  badge('Chat Starter', 'ai_conversations', 1, 'chat'),
  badge('Fluent Moment', 'ai_high_score', 9),
  badge('Game On', 'games_played', 1),
  badge('Player One', 'solo_games_played', 1),
  badge('Game Fan', 'solo_games_played', 10),
  badge('Flawless Run', 'solo_game_perfect', 10),
  badge('All-Rounder', 'solo_game_types', 4),
];

const makeUser = (overrides = {}) => {
  const user = {
    _id: id(),
    level: 'A1',
    badges: [],
    progress: [],
    examResults: [],
    placementTestCompleted: false,
    saveCount: 0,
    ...overrides,
  };
  user.save = async () => { user.saveCount += 1; };
  return user;
};

const lesson = (topicId, { score = 80, category = 'grammar', day = 0 } = {}) => ({
  topicId, score, category, source: 'lesson', completedAt: daysAgo(day),
});

const mockDb = (t, { levelTopicIds = [], aiRows = [], soloRows = [] } = {}) => {
  t.mock.method(Badge, 'find', () => ({ sort: async () => BADGES }));
  t.mock.method(Topic, 'find', () => ({ distinct: async () => levelTopicIds }));
  t.mock.method(Conversation, 'aggregate', async () => aiRows);
  t.mock.method(GameResult, 'aggregate', async () => soloRows);
};

const titles = (badges) => badges.map((b) => b.title).sort();

test('yeni kullanıcı hiçbir rozet kazanmaz ve kaydedilmez', async (t) => {
  mockDb(t);
  const user = makeUser();
  assert.deepEqual(await evaluateBadges(user), []);
  assert.equal(user.saveCount, 0);
});

test('ders, kategori, tam puan, seri ve seviye rozetleri', async (t) => {
  const [a, b] = [id(), id()];
  mockDb(t, { levelTopicIds: [a, b] });
  const user = makeUser({
    progress: [
      lesson(a, { score: 100, day: 2 }),
      lesson(b, { day: 1 }),
      lesson(b, { day: 0 }), // aynı konu tekrar: konu sayısını artırmaz
    ],
  });
  const awarded = await evaluateBadges(user);
  assert.deepEqual(titles(awarded), ['First Step', 'Grammar Guru', 'Level Master', 'Perfect Score', 'Warming Up']);
  assert.equal(user.badges.length, 5);
  assert.equal(user.saveCount, 1);
});

test('canlı oyun kaydı konu sayılmaz ama Game On verir', async (t) => {
  mockDb(t);
  const user = makeUser({
    progress: [{ topicId: null, score: 100, category: 'grammar', source: 'game', completedAt: daysAgo(0) }],
  });
  assert.deepEqual(titles(await evaluateBadges(user)), ['Game On']);
});

test('Level Test, sınav ve AI rozetleri', async (t) => {
  mockDb(t, { aiRows: [{ _id: 'talk', count: 2, best: 9 }] });
  const user = makeUser({
    placementTestCompleted: true,
    examResults: [
      { level: 'A1', passed: true },
      { level: 'A2', passed: false },
    ],
  });
  // Chat sohbeti yok → Chat Starter yok; 1 sınav geçildi → Exam Champion yok.
  assert.deepEqual(titles(await evaluateBadges(user)), ['Certified', 'First Words', 'Fluent Moment', 'Know Your Level']);
});

test('zaten kazanılan rozet tekrar verilmez', async (t) => {
  mockDb(t);
  const firstStep = BADGES.find((b) => b.title === 'First Step');
  const user = makeUser({ badges: [firstStep._id], progress: [lesson(id())] });
  assert.deepEqual(await evaluateBadges(user), []);
  assert.equal(user.badges.length, 1);
  assert.equal(user.saveCount, 0);
});

test('artık var olmayan rozet bağlantıları ve tekrarlar temizlenir', async (t) => {
  mockDb(t);
  const firstStep = BADGES.find((b) => b.title === 'First Step');
  const user = makeUser({ badges: [firstStep._id, firstStep._id, id()], progress: [lesson(id())] });
  assert.deepEqual(await evaluateBadges(user), []);
  assert.deepEqual(user.badges.map(String), [String(firstStep._id)]);
  assert.equal(user.saveCount, 1, 'temizlik kaydedilmeli');
});

test('Oyun Merkezi rozetleri: ilk oyun, hatasız 10 soruluk oyun, dört oyun türü', async (t) => {
  mockDb(t, {
    soloRows: [
      { _id: 'quiz', count: 3, longestPerfect: 10 },
      { _id: 'match', count: 1, longestPerfect: 0 },
      { _id: 'builder', count: 1, longestPerfect: 5 },
      { _id: 'truefalse', count: 1, longestPerfect: 0 },
    ],
  });
  // 6 oyun → Game Fan (10) yok.
  assert.deepEqual(titles(await evaluateBadges(makeUser())), ['All-Rounder', 'Flawless Run', 'Player One']);
});

test('Oyun Merkezi: 5 soruluk hatasız oyun Flawless Run vermez', async (t) => {
  mockDb(t, { soloRows: [{ _id: 'quiz', count: 10, longestPerfect: 5 }] });
  assert.deepEqual(titles(await evaluateBadges(makeUser())), ['Game Fan', 'Player One']);
});
