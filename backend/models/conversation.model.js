const mongoose = require('mongoose');

// AI sohbetindeki tek bir mesaj (kullanıcı veya AI).
const messageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
  },
  { _id: false, timestamps: { createdAt: true, updatedAt: false } }
);

// Kullanıcının AI ile yaptığı bir sohbet. mode: 'talk' = sesli konuşma, 'chat' = yazılı sohbet, 'writing' = yazı düzeltme.
const conversationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    mode: { type: String, enum: ['talk', 'chat', 'writing'], default: 'chat' },
    level: { type: String, enum: ['A1', 'A2', 'B1', 'B2'], default: 'A2' },
    title: { type: String, default: 'New chat' },
    // Konu kartından açıldıysa konunun slug'ı (data/aiTopics.js); serbest sohbette null.
    topic: { type: String, default: null },
    messages: [messageSchema],
    // Konulu sohbet bitti mi (mesaj sınırına ulaşıldı ya da öğrenci "Bitir"e bastı). Bitince yeni mesaj gönderilemez.
    finished: { type: Boolean, default: false },
    // Bitişte AI'nın değerlendirmesi (sonuç ekranı). Değerlendirme başarısız olursa null kalır, tekrar istenebilir.
    result: {
      type: new mongoose.Schema(
        {
          score: Number,
          summary: String,
          mistakes: [{ _id: false, wrong: String, correct: String, explanation: String }],
          strengths: [String],
          usefulPhrases: [{ _id: false, phrase: String, meaning: String }],
          nextStep: String,
        },
        { _id: false }
      ),
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Conversation', conversationSchema);
