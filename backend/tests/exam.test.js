// Seviye sınavı puanlama (controllers/exam.controller.js#scoreExam) — gerçek sınav verisiyle.
const test = require('node:test');
const assert = require('node:assert/strict');
const { scoreExam, EXAMS } = require('../controllers/exam.controller');

const allQuestions = (exam) => exam.sections.flatMap((s) => s.groups.flatMap((g) => g.questions));
const answerFirst = (exam, count, wrong = false) =>
  Object.fromEntries(allQuestions(exam).slice(0, count).map((q) => [q.id, wrong ? `${q.correctAnswer}-x` : q.correctAnswer]));

for (const [level, exam] of Object.entries(EXAMS)) {
  test(`${level}: tüm cevaplar doğruysa %100 ve geçer`, () => {
    const total = allQuestions(exam).length;
    const r = scoreExam(exam, answerFirst(exam, total));
    assert.equal(r.score, total);
    assert.equal(r.maxScore, total);
    assert.equal(r.percent, 100);
    assert.equal(r.passed, true);
    for (const stats of Object.values(r.statsBySection)) assert.equal(stats.correct, stats.total);
  });

  test(`${level}: boş cevaplar 0 puan, geçemez`, () => {
    const r = scoreExam(exam, {});
    assert.equal(r.score, 0);
    assert.equal(r.passed, false);
    assert.ok(Object.values(r.results).every((x) => x.correct === false && x.userAnswer === null));
  });
}

test('geçme sınırı: tam passPercent geçer, bir soru eksiği geçmez', () => {
  const exam = EXAMS.A1;
  const total = allQuestions(exam).length;
  // percent = round(score / total * 100) >= passPercent olan en küçük puan
  let needed = 0;
  while (Math.round((needed / total) * 100) < exam.passPercent) needed += 1;

  assert.equal(scoreExam(exam, answerFirst(exam, needed)).passed, true);
  assert.equal(scoreExam(exam, answerFirst(exam, needed - 1)).passed, false);
});

test('büyük/küçük harf ve fazla boşluk önemsiz; yanlış cevap sayılmaz', () => {
  const exam = EXAMS.A1;
  const [q1, q2] = allQuestions(exam);
  const r = scoreExam(exam, { [q1.id]: `  ${String(q1.correctAnswer).toUpperCase()}  `, [q2.id]: 'kesinlikle yanlış' });
  assert.equal(r.results[q1.id].correct, true);
  assert.equal(r.results[q2.id].correct, false);
  assert.equal(r.score, 1);
});

test('bölüm istatistikleri toplamı genel puanla aynı', () => {
  const exam = EXAMS.B1;
  const r = scoreExam(exam, answerFirst(exam, 23));
  const sum = Object.values(r.statsBySection).reduce((n, s) => n + s.correct, 0);
  const totals = Object.values(r.statsBySection).reduce((n, s) => n + s.total, 0);
  assert.equal(sum, r.score);
  assert.equal(totals, r.maxScore);
});
