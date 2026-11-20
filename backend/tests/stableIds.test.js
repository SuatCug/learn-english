// Seed'in konu/soru _id'lerini koruması (utils/stableIds.js). Bu bozulursa her seed kullanıcı
// ilerlemesini koparır.
const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { snapshotIds, withStableTopicIds, withStableQuestionIds } = require('../utils/stableIds');

const id = () => new mongoose.Types.ObjectId();

// snapshotIds'in beklediği find().lean() / find().sort().lean() zincirini taklit eder.
const fakeModels = (topics, questions) => ({
  Topic: { find: () => ({ lean: async () => topics }) },
  Question: { find: () => ({ sort: () => ({ lean: async () => questions }) }) },
});

test('aynı konular aynı _id ile yeniden yazılır; yeni konu yeni _id alır', async () => {
  const toBe = { _id: id(), category: 'grammar', level: 'A1', title: 'To be' };
  const plurals = { _id: id(), category: 'grammar', level: 'A1', title: 'Plurals' };
  const snapshot = await snapshotIds(fakeModels([toBe, plurals], []));

  const result = withStableTopicIds(
    [
      { category: 'grammar', level: 'A1', title: 'Plurals', description: 'güncellendi' },
      { category: 'grammar', level: 'A1', title: 'To be' },
      { category: 'grammar', level: 'A1', title: 'Yeni konu' },
      { category: 'grammar', level: 'A2', title: 'To be' }, // farklı seviye = farklı konu
    ],
    snapshot
  );
  assert.equal(String(result[0]._id), String(plurals._id));
  assert.equal(result[0].description, 'güncellendi', 'içerik güncellenir');
  assert.equal(String(result[1]._id), String(toBe._id));
  assert.equal(result[2]._id, undefined);
  assert.equal(result[3]._id, undefined);
});

test('aynı anahtar iki kez geçerse aynı _id iki kayda verilmez', async () => {
  const t = { _id: id(), category: 'reading', level: 'B1', title: 'Dup' };
  const snapshot = await snapshotIds(fakeModels([t], []));
  const result = withStableTopicIds(
    [
      { category: 'reading', level: 'B1', title: 'Dup' },
      { category: 'reading', level: 'B1', title: 'Dup' },
    ],
    snapshot
  );
  assert.equal(String(result[0]._id), String(t._id));
  assert.equal(result[1]._id, undefined);
});

test('sorular: aynı metin aynı konuda tekrar ederse sırayla eşlenir', async () => {
  const topicId = id();
  const base = { topicId, isPlacementQuestion: false, section: null, exerciseGroup: 1, type: 'multiple-choice' };
  const q1 = { ...base, _id: id(), title: 'Choose the correct word.' };
  const q2 = { ...base, _id: id(), title: 'Choose the correct word.' };
  const q3 = { ...base, _id: id(), title: 'Other', exerciseGroup: 2 };
  const snapshot = await snapshotIds(fakeModels([], [q1, q2, q3]));

  const strip = ({ _id, ...rest }) => rest;
  const result = withStableQuestionIds([strip(q1), strip(q2), strip(q3), { ...strip(q3), title: 'Yeni soru' }], snapshot);
  assert.deepEqual(result.slice(0, 3).map((q) => String(q._id)), [q1, q2, q3].map((q) => String(q._id)));
  assert.equal(result[3]._id, undefined);
});
