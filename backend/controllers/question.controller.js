const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const { Question } = require('../models');

const create = asyncHandler(async (req, res) => {
  const { topicId, type, title, options, correctAnswer, matchingPairs, explanation, level, isPlacementQuestion } =
    req.body;

  const question = await Question.create({
    topicId: topicId || null,
    type,
    title,
    options,
    correctAnswer,
    matchingPairs,
    explanation,
    level,
    isPlacementQuestion: Boolean(isPlacementQuestion),
  });

  res.status(201).json({ success: true, message: 'Soru oluşturuldu.', data: { question } });
});

const update = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (!question) throw new ApiError(404, 'Soru bulunamadı.');

  const fields = ['topicId', 'type', 'title', 'options', 'correctAnswer', 'matchingPairs', 'explanation', 'level', 'isPlacementQuestion'];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) question[field] = req.body[field];
  });
  await question.save();

  res.json({ success: true, message: 'Soru güncellendi.', data: { question } });
});

const remove = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (!question) throw new ApiError(404, 'Soru bulunamadı.');

  await question.deleteOne();
  res.json({ success: true, message: 'Soru silindi.' });
});

module.exports = { create, update, remove };
