// Otomatik seviye atlama (utils/levelProgress.util.js#maybeLevelUp) — Topic sorguları sahte.
const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { Topic } = require('../models');
const { maybeLevelUp, LEVEL_UP_TOPICS_REQUIRED } = require('../utils/levelProgress.util');

const makeUser = (level, topicCount) => {
  const user = {
    level,
    progress: Array.from({ length: topicCount }, () => ({ topicId: new mongoose.Types.ObjectId() })),
    saved: false,
  };
  user.save = async () => { user.saved = true; };
  return user;
};

// countDocuments iki şekilde çağrılır: { _id: {$in}, level } → kullanıcının o seviyede bitirdiği konu;
// { level } → o seviyedeki toplam konu.
const mockCounts = (t, { completedAtLevel, totalAtLevel }) =>
  t.mock.method(Topic, 'countDocuments', async (query) => (query._id ? completedAtLevel : totalAtLevel));

test('yeterli konu bitince bir sonraki seviyeye geçer', async (t) => {
  mockCounts(t, { completedAtLevel: LEVEL_UP_TOPICS_REQUIRED, totalAtLevel: 120 });
  const user = makeUser('A1', LEVEL_UP_TOPICS_REQUIRED);
  assert.equal(await maybeLevelUp(user), 'A2');
  assert.equal(user.level, 'A2');
  assert.equal(user.saved, true);
});

test('eksik konu varken seviye değişmez', async (t) => {
  mockCounts(t, { completedAtLevel: LEVEL_UP_TOPICS_REQUIRED - 1, totalAtLevel: 120 });
  const user = makeUser('A1', LEVEL_UP_TOPICS_REQUIRED - 1);
  assert.equal(await maybeLevelUp(user), null);
  assert.equal(user.level, 'A1');
  assert.equal(user.saved, false);
});

test('seviyede hedeften az konu varsa hedef o sayıya iner', async (t) => {
  mockCounts(t, { completedAtLevel: 40, totalAtLevel: 40 });
  assert.equal(await maybeLevelUp(makeUser('B1', 40)), 'B2');
});

test('B2 en üst seviye; seviyesi olmayan kullanıcı atlamaz', async (t) => {
  mockCounts(t, { completedAtLevel: 999, totalAtLevel: 1 });
  assert.equal(await maybeLevelUp(makeUser('B2', 100)), null);
  assert.equal(await maybeLevelUp(makeUser(null, 100)), null);
});
