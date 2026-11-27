const mongoose = require('mongoose');

// Oyun Merkezi (tek kişilik oyunlar, mobil) sonuçları. Canlı sınıf oyunları buraya değil, User.progress'e
// (source: 'game') yazılır. Puan istemcide hesaplanır; sunucu makul sınırları kontrol eder (game.controller.js).
const GAME_TYPES = ['quiz', 'match', 'builder', 'truefalse'];
const GAME_SECTIONS = ['grammar', 'vocabulary', 'mixed'];

const gameResultSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // İstemcinin ürettiği tekil kimlik: internet yokken telefonda bekleyen sonuç sonradan
    // gönderildiğinde (veya istek tekrarlandığında) aynı oyun iki kez kaydedilmez.
    clientId: { type: String, required: true, maxlength: 64 },
    type: { type: String, enum: GAME_TYPES, required: true },
    section: { type: String, enum: GAME_SECTIONS, required: true },
    level: { type: String, enum: ['A1', 'A2', 'B1', 'B2'], required: true },
    timed: { type: Boolean, default: false },
    total: { type: Number, required: true, min: 1 },
    correct: { type: Number, required: true, min: 0 },
    score: { type: Number, required: true, min: 0 },
    durationMs: { type: Number, default: 0, min: 0 },
    playedAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

gameResultSchema.index({ userId: 1, clientId: 1 }, { unique: true });
gameResultSchema.index({ userId: 1, playedAt: -1 });
// Haftalık sıralama: tarih aralığına göre tüm kullanıcılar.
gameResultSchema.index({ playedAt: -1 });

module.exports = mongoose.model('GameResult', gameResultSchema);
module.exports.GAME_TYPES = GAME_TYPES;
module.exports.GAME_SECTIONS = GAME_SECTIONS;
