const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const { Conversation, User } = require('../models');
const { countTodayMessages, DAILY_LIMIT } = require('../services/ai.service');
const { publicTopics, findTopic } = require('../data/aiTopics');
const ttsService = require('../services/tts.service');

const LEVELS = ['A1', 'A2', 'B1', 'B2'];
// 'writing' (yazı düzeltme) kaldırıldı; eski writing sohbetleri veritabanında kalır ve açılabilir.
const MODES = ['talk', 'chat'];
const DEFAULT_TITLES = { talk: 'Speaking practice', chat: 'New chat', writing: 'Writing check' };

// POST /api/ai/tts — Talking'de AI cevabını Cori sesiyle WAV olarak döndürür.
// Piper bu sunucuda kurulu değilse 503 döner; frontend o durumda tarayıcının kendi sesine düşer.
const tts = asyncHandler(async (req, res) => {
  const text = typeof req.body.text === 'string' ? req.body.text : '';
  const level = LEVELS.includes(req.body.level) ? req.body.level : 'B1';
  if (!text.trim()) throw new ApiError(400, 'Metin boş olamaz.');
  if (!ttsService.isAvailable()) throw new ApiError(503, 'Ses servisi bu sunucuda kurulu değil.');

  const wav = await ttsService.synthesize(text, level);
  res.set({ 'Content-Type': 'audio/wav', 'Content-Length': wav.length, 'Cache-Control': 'private, max-age=3600' });
  res.send(wav);
});

// GET /api/ai/topics/:level — o seviyenin konu kartları (senaryo metinleri gönderilmez).
const listTopics = asyncHandler(async (req, res) => {
  const { level } = req.params;
  if (!LEVELS.includes(level)) throw new ApiError(404, 'Seviye bulunamadı.');
  res.json({ success: true, data: { level, topics: publicTopics(level) } });
});

// GET /api/ai/conversations — kullanıcının sohbet listesi (mesajlar olmadan) + günlük kullanım.
const list = asyncHandler(async (req, res) => {
  const [conversations, usedToday] = await Promise.all([
    Conversation.find({ userId: req.user.id })
      .select('mode level title topic updatedAt createdAt')
      .sort({ updatedAt: -1 })
      .limit(100),
    countTodayMessages(req.user.id),
  ]);
  res.json({ success: true, data: { conversations, usage: { usedToday, dailyLimit: DAILY_LIMIT } } });
});

// POST /api/ai/conversations — yeni sohbet. Seviye verilmezse kullanıcının kendi seviyesi kullanılır.
// topic verilirse sohbet o konunun başlığıyla açılır ve AI'nın ilk mesajı (opener) hazır eklenir.
const create = asyncHandler(async (req, res) => {
  const mode = MODES.includes(req.body.mode) ? req.body.mode : 'chat';
  let level = LEVELS.includes(req.body.level) ? req.body.level : null;
  if (!level) {
    const user = await User.findById(req.user.id).select('level');
    level = user?.level || 'A2';
  }

  let topic = null;
  if (req.body.topic) {
    topic = findTopic(level, req.body.topic);
    if (!topic) throw new ApiError(400, 'Bu seviyede böyle bir konu yok.');
  }

  const conversation = await Conversation.create({
    userId: req.user.id,
    mode,
    level,
    topic: topic?.slug ?? null,
    title: topic ? topic.title : DEFAULT_TITLES[mode],
    messages: topic?.opener ? [{ role: 'assistant', content: topic.opener }] : [],
  });
  // Talking: karşı tarafın ilk cümlesinin sesini şimdiden hazırla; tarayıcı birazdan istediğinde hazır olsun.
  if (mode === 'talk' && topic?.opener && ttsService.isAvailable()) {
    ttsService.synthesize(topic.opener, level).catch(() => {});
  }

  res.status(201).json({ success: true, data: { conversation } });
});

// GET /api/ai/conversations/:id — tek sohbet, mesajlarıyla.
const getOne = asyncHandler(async (req, res) => {
  const conversation = await Conversation.findOne({ _id: req.params.id, userId: req.user.id }).catch(() => null);
  if (!conversation) throw new ApiError(404, 'Sohbet bulunamadı.');
  res.json({ success: true, data: { conversation } });
});

// DELETE /api/ai/conversations/:id
const remove = asyncHandler(async (req, res) => {
  const result = await Conversation.deleteOne({ _id: req.params.id, userId: req.user.id }).catch(() => null);
  if (!result?.deletedCount) throw new ApiError(404, 'Sohbet bulunamadı.');
  res.json({ success: true, message: 'Sohbet silindi.' });
});

module.exports = { tts, listTopics, list, create, getOne, remove };
