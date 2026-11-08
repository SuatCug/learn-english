const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const { User } = require('../models');
const { EXAM_LEVELS, buildExam, toPublicExam, countQuestions } = require('../data/levelExams');

// Sınavlar statik veriden (data/levelExams.js) kurulur; veritabanına seed edilmez.
// Her seviye için tek bir kez kurulup bellekte tutulur.
const EXAMS = Object.fromEntries(EXAM_LEVELS.map((level) => [level, buildExam(level)]));

const normalize = (value) => String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');

const getExamOrThrow = (level) => {
  const exam = EXAMS[String(level).toUpperCase()];
  if (!exam) throw new ApiError(404, 'Sınav bulunamadı.');
  return exam;
};

const listExams = asyncHandler(async (req, res) => {
  const exams = EXAM_LEVELS.map((level) => {
    const exam = EXAMS[level];
    return {
      level,
      title: exam.title,
      durationMinutes: exam.durationMinutes,
      passPercent: exam.passPercent,
      maxScore: countQuestions(exam),
      sections: exam.sections.map((s) => ({
        key: s.key,
        label: s.label,
        questions: s.groups.reduce((n, g) => n + g.questions.length, 0),
      })),
    };
  });
  res.json({ success: true, data: { exams } });
});

const getExam = asyncHandler(async (req, res) => {
  const exam = getExamOrThrow(req.params.level);
  res.json({ success: true, data: { exam: toPublicExam(exam) } });
});

const submitExam = asyncHandler(async (req, res) => {
  const exam = getExamOrThrow(req.params.level);
  const answers = req.body.answers || {};

  const statsBySection = {};
  const results = {};
  let score = 0;

  exam.sections.forEach((section) => {
    statsBySection[section.key] = { correct: 0, total: 0 };
    section.groups.forEach((group) => {
      group.questions.forEach((q) => {
        const userAnswer = answers[q.id] ?? null;
        const correct = userAnswer !== null && normalize(userAnswer) === normalize(q.correctAnswer);
        statsBySection[section.key].total += 1;
        if (correct) {
          statsBySection[section.key].correct += 1;
          score += 1;
        }
        results[q.id] = { correct, correctAnswer: q.correctAnswer, userAnswer };
      });
    });
  });

  const maxScore = countQuestions(exam);
  const percent = Math.round((score / maxScore) * 100);
  const passed = percent >= exam.passPercent;

  // Listening transkriptleri sınav bittikten sonra cevap incelemesinde gösterilir.
  const transcripts = exam.sections.find((s) => s.key === 'listening').groups.map((g) => g.transcript);

  // Kullanıcının her seviye için son ve en iyi sonucu saklanır.
  const user = await User.findById(req.user.id);
  if (!user) throw new ApiError(404, 'Kullanıcı bulunamadı.');
  const previous = (user.examResults || []).find((r) => r.level === exam.level);
  const entry = {
    level: exam.level,
    score,
    maxScore,
    percent,
    passed,
    bestScore: Math.max(score, previous?.bestScore ?? 0),
    attempts: (previous?.attempts ?? 0) + 1,
    takenAt: new Date(),
  };
  user.examResults = [...(user.examResults || []).filter((r) => r.level !== exam.level), entry];
  await user.save();

  res.json({
    success: true,
    message: 'Sınav tamamlandı.',
    data: {
      level: exam.level,
      score,
      maxScore,
      percent,
      passed,
      passPercent: exam.passPercent,
      statsBySection,
      results,
      transcripts,
      user: user.toSafeJSON(),
    },
  });
});

module.exports = { listExams, getExam, submitExam };
