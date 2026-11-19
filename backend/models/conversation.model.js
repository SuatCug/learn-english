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
  },
  { timestamps: true }
);

module.exports = mongoose.model('Conversation', conversationSchema);
