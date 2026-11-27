// Oyun Merkezi (controllers/game.controller.js): haftanın başı ve sıralamada gösterilen ad.
const test = require('node:test');
const assert = require('node:assert/strict');
const { weekStart, displayName } = require('../controllers/game.controller');

test('weekStart: Türkiye saatiyle Pazartesi 00:00', () => {
  // 27 Kasım 2026 Cuma 15:00 TR → 23 Kasım Pazartesi 00:00 TR = 22 Kasım 21:00 UTC
  assert.equal(weekStart(new Date('2026-11-27T12:00:00Z')).toISOString(), '2026-11-22T21:00:00.000Z');
  // Pazartesi 01:00 TR (Pazar 22:00 UTC) yeni haftadır
  assert.equal(weekStart(new Date('2026-11-29T22:00:00Z')).toISOString(), '2026-11-29T21:00:00.000Z');
  // Pazar 23:30 TR hâlâ önceki hafta
  assert.equal(weekStart(new Date('2026-11-29T20:30:00Z')).toISOString(), '2026-11-22T21:00:00.000Z');
});

test('displayName: ad + soyadın baş harfi', () => {
  assert.equal(displayName('Ayşe Yılmaz'), 'Ayşe Y.');
  assert.equal(displayName('Mehmet Ali Kaya'), 'Mehmet K.');
  assert.equal(displayName('Zeynep'), 'Zeynep');
  assert.equal(displayName('  '), 'Oyuncu');
});

// --- saveResult: veritabanı sahte ---
const mongoose = require('mongoose');
const { GameResult, User, Badge } = require('../models');
const { saveResult } = require('../controllers/game.controller');

const call = (handler, body, userId) =>
  new Promise((resolve) => {
    const res = {
      statusCode: 200,
      status(code) { this.statusCode = code; return this; },
      json(payload) { resolve({ status: this.statusCode, payload }); },
    };
    handler({ body, user: { id: userId } }, res, (err) => resolve({ status: err.statusCode ?? 500, error: err }));
  });

const base = { clientId: 'abc-123456', type: 'quiz', section: 'grammar', level: 'A1', timed: true, total: 10, correct: 8, score: 1000 };

test('saveResult: geçerli sonuç kaydedilir, rozetler kontrol edilir', async (t) => {
  const userId = new mongoose.Types.ObjectId().toString();
  t.mock.method(GameResult, 'findOne', async () => null);
  const created = t.mock.method(GameResult, 'create', async (doc) => ({ _id: 'r1', ...doc }));
  t.mock.method(User, 'findById', async () => ({ _id: userId, badges: [], save: async () => {} }));
  const badgeFind = t.mock.method(Badge, 'find', () => ({ sort: async () => [] }));
  const out = await call(saveResult, base, userId);
  assert.equal(out.status, 201);
  assert.equal(created.mock.callCount(), 1);
  assert.equal(out.payload.data.result.score, 1000);
  assert.equal(badgeFind.mock.callCount(), 1, 'rozetler kontrol edildi');
});

test('saveResult: aynı clientId ikinci kez kaydedilmez', async (t) => {
  t.mock.method(GameResult, 'findOne', async () => ({ _id: 'r1', ...base, playedAt: new Date() }));
  const created = t.mock.method(GameResult, 'create', async () => { throw new Error('olmamalı'); });
  const out = await call(saveResult, base, new mongoose.Types.ObjectId().toString());
  assert.equal(out.status, 200);
  assert.equal(created.mock.callCount(), 0);
  assert.deepEqual(out.payload.data.newBadges, []);
});

test('saveResult: imkânsız puan ve doğru sayısı reddedilir', async () => {
  // 8 doğru, süreli: en fazla 8 × 150 = 1200
  assert.equal((await call(saveResult, { ...base, score: 1201 }, 'u')).status, 400);
  // süresiz: en fazla 8 × 100 = 800
  assert.equal((await call(saveResult, { ...base, timed: false, score: 801 }, 'u')).status, 400);
  assert.equal((await call(saveResult, { ...base, correct: 11 }, 'u')).status, 400);
});
