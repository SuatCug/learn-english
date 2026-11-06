const asyncHandler = require('../utils/asyncHandler');
const { Question, User } = require('../models');
const { sanitizeQuestion } = require('../utils/sanitizeQuestion');
const { isAnswerCorrect } = require('../utils/checkAnswer');

const SECTIONS = ['reading', 'grammar', 'vocabulary', 'writing'];

// Toplam 55 puan (Reading 20 + Grammar 15 + Vocabulary 10 + Writing 10) üzerinden CEFR seviyesine bantlama.
// Seviye sistemi A1–B2 (4 kur); eski B1+ bandının alt yarısı B1'e, üst yarısı ve üstü B2'ye katıldı.
const LEVEL_BANDS = [
  { max: 7, level: 'A1' },
  { max: 18, level: 'A2' },
  { max: 28, level: 'B1' },
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

  const user = await User.findById(req.user.id);
  user.level = recommendedLevel;
  user.placementTestCompleted = true;
  await user.save();

  res.json({
    success: true,
    message: 'Seviye belirleme testi tamamlandı.',
    data: { level: recommendedLevel, score: totalCorrect, maxScore: 55, statsBySection, user: user.toSafeJSON() },
  });
});

module.exports = { getPlacementTest, submit };
