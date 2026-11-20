// Ders ve Level Test cevap kontrolü (utils/checkAnswer.js).
const test = require('node:test');
const assert = require('node:assert/strict');
const { isAnswerCorrect } = require('../utils/checkAnswer');

test('çoktan seçmeli: büyük/küçük harf ve boşluk önemsiz', () => {
  const q = { type: 'multiple-choice', correctAnswer: 'Her brother' };
  assert.equal(isAnswerCorrect(q, 'Her brother'), true);
  assert.equal(isAnswerCorrect(q, '  her BROTHER '), true);
  assert.equal(isAnswerCorrect(q, 'Her father'), false);
  assert.equal(isAnswerCorrect(q, undefined), false);
});

test('boşluk doldurma: birden fazla kabul edilen cevap', () => {
  const q = { type: 'fill-in-blanks', correctAnswer: ["don't", 'do not'] };
  assert.equal(isAnswerCorrect(q, 'do not'), true);
  assert.equal(isAnswerCorrect(q, "Don't"), true);
  assert.equal(isAnswerCorrect(q, 'does not'), false);
});

test('boşluk doldurma: tek cevap', () => {
  assert.equal(isAnswerCorrect({ type: 'fill-in-blanks', correctAnswer: 'name' }, 'Name'), true);
});

test('eşleştirme: tüm çiftler doğru olmalı, sıra önemsiz', () => {
  const q = {
    type: 'matching',
    matchingPairs: [
      { left: 'cat', right: 'kedi' },
      { left: 'dog', right: 'köpek' },
    ],
  };
  const right = [
    { left: 'dog', right: 'köpek' },
    { left: 'cat', right: 'kedi' },
  ];
  assert.equal(isAnswerCorrect(q, right), true);
  assert.equal(isAnswerCorrect(q, [{ left: 'cat', right: 'köpek' }, { left: 'dog', right: 'kedi' }]), false);
  assert.equal(isAnswerCorrect(q, [{ left: 'cat', right: 'kedi' }]), false, 'eksik çift');
  assert.equal(isAnswerCorrect(q, 'cat=kedi'), false, 'dizi olmayan cevap');
});

test('bilinmeyen soru tipi yanlış sayılır', () => {
  assert.equal(isAnswerCorrect({ type: 'essay', correctAnswer: 'x' }, 'x'), false);
});
