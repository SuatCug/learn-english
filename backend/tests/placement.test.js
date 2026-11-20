// Level Test puan → seviye eşlemesi (controllers/placementTest.controller.js).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { levelForScore } = require('../controllers/placementTest.controller');

test('bant sınırları (65 soru: Listening 10 + Reading 20 + Grammar 15 + Vocabulary 10 + Writing 10)', () => {
  const cases = [
    [0, 'A1'], [8, 'A1'],
    [9, 'A2'], [21, 'A2'],
    [22, 'B1'], [33, 'B1'],
    [34, 'B2'], [65, 'B2'],
  ];
  for (const [score, level] of cases) assert.equal(levelForScore(score), level, `puan ${score}`);
});

// Level Test giriş sayfası puan aralıklarını tablo halinde gösterir (frontend'e elle yazılı).
// Backend'deki bantlar değişip sayfa güncellenmezse bu test kırılır.
test('Level Test sayfasındaki puan tablosu backend ile aynı', () => {
  const page = fs.readFileSync(path.join(__dirname, '../../frontend/src/pages/PlacementTestPage.jsx'), 'utf8');
  const rows = [...page.matchAll(/level: '(A1|A2|B1|B2)', range: '(\d+)–(\d+)'/g)];
  assert.equal(rows.length, 4, 'sayfada 4 seviye satırı bulunmalı');

  for (const [, level, low, high] of rows) {
    assert.equal(levelForScore(Number(low)), level, `${level} alt sınırı ${low}`);
    assert.equal(levelForScore(Number(high)), level, `${level} üst sınırı ${high}`);
    if (Number(low) > 0) assert.notEqual(levelForScore(Number(low) - 1), level, `${level} alt sınırından önce`);
  }
});
