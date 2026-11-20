// Seviye Testi Listening verisi (data/placementListening.js): soru yapısı ve seed kayıtları.
const test = require('node:test');
const assert = require('node:assert/strict');
const { PLACEMENT_LISTENING, placementListeningQuestions, placementListeningItems } = require('../data/placementListening');

test('2 kayıt, her birinde 5 soru, her soruda 3 farklı şık', () => {
  assert.equal(PLACEMENT_LISTENING.length, 2);
  for (const recording of PLACEMENT_LISTENING) {
    assert.equal(recording.questions.length, 5, recording.slug);
    for (const [title, options] of recording.questions) {
      assert.equal(options.length, 3, title);
      assert.equal(new Set(options).size, 3, `tekrarlı şık: ${title}`);
    }
    // Senaryodaki her konuşmacının bir sesi olmalı.
    for (const [code] of recording.script) assert.ok(recording.speakers[code]?.voice, `${recording.slug}: ${code}`);
  }
});

test('seed soruları: doğru cevap şıklarda var, ses kaydı bağlı, sıra okuma bölümünden önce', () => {
  const questions = placementListeningQuestions();
  assert.equal(questions.length, 10);
  for (const q of questions) {
    assert.ok(q.options.includes(q.correctAnswer), q.title);
    assert.equal(q.section, 'listening');
    assert.match(q.audio, /^placement\/listening\//);
    assert.ok(q.order < 1, 'okuma soruları order 1\'den başlar');
  }
  // Doğru cevap her soruda ilk şıkta durmamalı.
  assert.ok(questions.some((q) => q.options[0] !== q.correctAnswer));
  // Sıra numaraları tekil.
  assert.equal(new Set(questions.map((q) => q.order)).size, questions.length);
});

test('ses üretme listesi seed sorularıyla aynı kayıtları içerir', () => {
  const ids = new Set(placementListeningItems().map((i) => i.publicId));
  for (const q of placementListeningQuestions()) assert.ok(ids.has(q.audio), q.audio);
});
