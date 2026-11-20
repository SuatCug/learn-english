const asyncHandler = require('../utils/asyncHandler');
const { Question, User } = require('../models');
const { sanitizeQuestion } = require('../utils/sanitizeQuestion');
const { isAnswerCorrect } = require('../utils/checkAnswer');
const { evaluateBadges } = require('../utils/badgeEngine');

const SECTIONS = ['listening', 'reading', 'grammar', 'vocabulary', 'writing'];

// Toplam 65 puan (Listening 10 + Reading 20 + Grammar 15 + Vocabulary 10 + Writing 10) üzerinden CEFR seviyesine
// bantlama. Aralıklar, Listening eklenmeden önceki 55 puanlık bantların (7 / 18 / 28) 65'e oranlanmış halidir.
// Frontend'deki tablo (PlacementTestPage PLACEMENT_BANDS) bununla aynı olmalı — tests/placement.test.js kontrol eder.
const LEVEL_BANDS = [
  { max: 8, level: 'A1' },
  { max: 21, level: 'A2' },
  { max: 33, level: 'B1' },
  { max: Infinity, level: 'B2' },
];

const levelForScore = (score) => LEVEL_BANDS.find((band) => score <= band.max).level;

const getPlacementTest = asyncHandler(async (req, res) => {
  const questions = await Question.find({ isPlacementQuestion: true }).sort({ order: 1 });

  res.json({ success: true, data: { questions: questions.map((q) => sanitizeQuestion(q)) } });
});

const submit = asyncHandler(async (req, res) => {
  const { answers } = req.body;

  const questionIds = answers.map((a) => a.questionId);
  const questions = await Question.find({ _id: { $in: questionIds }, isPlacementQuestion: true });
  const questionMap = new Map(questions.map((q) => [q._id.toString(), q]));

  const statsBySection = SECTIONS.reduce((acc, section) => ({ ...acc, [section]: { correct: 0, total: 0 } }), {});

  answers.forEach(({ questionId, answer }) => {
    const question = questionMap.get(questionId);
    if (!question) return;
    statsBySection[question.section].total += 1;
    if (isAnswerCorrect(question, answer)) {
      statsBySection[question.section].correct += 1;
    }
  });

  const totalCorrect = SECTIONS.reduce((sum, section) => sum + statsBySection[section].correct, 0);
  const recommendedLevel = levelForScore(totalCorrect);
  const maxScore = await Question.countDocuments({ isPlacementQuestion: true });

  const user = await User.findById(req.user.id);
  user.level = recommendedLevel;
  user.placementTestCompleted = true;
  await user.save();
  const newlyAwardedBadges = await evaluateBadges(user);

  res.json({
    success: true,
    message: 'Seviye belirleme testi tamamlandı.',
    data: {
      level: recommendedLevel,
      score: totalCorrect,
      maxScore,
      statsBySection,
      newlyAwardedBadges,
      user: user.toSafeJSON(),
    },
  });
});

module.exports = { getPlacementTest, submit, levelForScore, LEVEL_BANDS };
