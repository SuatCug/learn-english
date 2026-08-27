const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const { Topic, Question } = require('../models');
const { sanitizeQuestion } = require('../utils/sanitizeQuestion');
const { isAnswerCorrect } = require('../utils/checkAnswer');

// Basit regex kaçışı — kullanıcı arama metnindeki özel regex karakterlerinin sorgu olarak
// yorumlanmasını engeller (ör. "C++" gibi bir arama metninin hata fırlatmaması için).
const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const list = asyncHandler(async (req, res) => {
  const { category, level, search } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (level) filter.level = level;
  if (search) filter.title = { $regex: escapeRegex(search.trim()), $options: 'i' };

  const topics = await Topic.find(filter).sort({ createdAt: 1 });
  res.json({ success: true, data: { topics } });
});

const getById = asyncHandler(async (req, res) => {
  const topic = await Topic.findById(req.params.id);
  if (!topic) throw new ApiError(404, 'Konu bulunamadı.');
  res.json({ success: true, data: { topic } });
});

const getQuestions = asyncHandler(async (req, res) => {
  const topic = await Topic.findById(req.params.id);
  if (!topic) throw new ApiError(404, 'Konu bulunamadı.');

  const questions = await Question.find({ topicId: topic._id });
  res.json({
    success: true,
    data: {
      passage: topic.passage,
      questions: questions.map((q) => sanitizeQuestion(q)),
    },
  });
});

// Kullanıcının cevaplarını gerçek doğru cevaplarla sunucu tarafında karşılaştırır;
// doğru cevaplar sadece kontrol ettikten sonra, sonuç olarak döner (baştan sızdırılmaz).
const checkAnswers = asyncHandler(async (req, res) => {
  const topic = await Topic.findById(req.params.id);
  if (!topic) throw new ApiError(404, 'Konu bulunamadı.');

  const { answers } = req.body;
  const questions = await Question.find({ topicId: topic._id });
  const questionMap = new Map(questions.map((q) => [q._id.toString(), q]));

  let correctCount = 0;
  const results = answers.map(({ questionId, answer }) => {
    const question = questionMap.get(questionId);
    if (!question) return { questionId, correct: false };

    const correct = isAnswerCorrect(question, answer);
    if (correct) correctCount += 1;

    return {
      questionId,
      correct,
      correctAnswer: question.correctAnswer,
      matchingPairs: question.matchingPairs,
      explanation: question.explanation,
    };
  });

  // Puan, konudaki TÜM sorular üzerinden değil, bu istekte gönderilen (yani o anki
  // exercise'e ait) sorular üzerinden hesaplanır — bir konunun birden fazla exercise
  // grubu olabildiği için (bkz. Question.exerciseGroup).
  const score = answers.length > 0 ? Math.round((correctCount / answers.length) * 100) : 0;

  res.json({ success: true, data: { results, score, correctCount, total: answers.length } });
});

const create = asyncHandler(async (req, res) => {
  const { title, category, level, description, passage } = req.body;
  const topic = await Topic.create({ title, category, level, description, passage });
  res.status(201).json({ success: true, message: 'Konu oluşturuldu.', data: { topic } });
});

const update = asyncHandler(async (req, res) => {
  const topic = await Topic.findById(req.params.id);
  if (!topic) throw new ApiError(404, 'Konu bulunamadı.');

  const { title, category, level, description, passage } = req.body;
  if (title !== undefined) topic.title = title;
  if (category !== undefined) topic.category = category;
  if (level !== undefined) topic.level = level;
  if (description !== undefined) topic.description = description;
  if (passage !== undefined) topic.passage = passage;
  await topic.save();

  res.json({ success: true, message: 'Konu güncellendi.', data: { topic } });
});

const remove = asyncHandler(async (req, res) => {
  const topic = await Topic.findById(req.params.id);
  if (!topic) throw new ApiError(404, 'Konu bulunamadı.');

  await Question.deleteMany({ topicId: topic._id });
  await topic.deleteOne();

  res.json({ success: true, message: 'Konu ve bağlı sorular silindi.' });
});

module.exports = { list, getById, getQuestions, checkAnswers, create, update, remove };
