const mongoose = require('mongoose');

// Rozet tanımları seed'den gelir (utils/seed.js); kazanma koşulları utils/badgeEngine.js'te kontrol edilir.
const badgeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    icon: { type: String, default: '🏅' },
    criteriaType: {
      type: String,
      enum: [
        'topics_completed', // farklı konu sayısı
        'level_completed', // kullanıcının seviyesindeki tüm konular
        'perfect_score', // %100 alınan ders sayısı
        'streak', // en uzun art arda gün serisi
        'category_topics', // bir kategoride (criteriaCategory) farklı konu sayısı
        'placement_completed', // Level Test çözüldü
        'exams_passed', // geçilen seviye sınavı sayısı
        'ai_conversations', // bitirilen AI sohbeti sayısı; criteriaCategory: 'talk' | 'chat'
        'ai_high_score', // bir AI sohbetinde en az criteriaValue/10 puan
        'games_played', // oynanan canlı oyun sayısı
        'solo_games_played', // Oyun Merkezi'nde bitirilen oyun sayısı
        'solo_game_perfect', // en az criteriaValue soruluk bir oyunu hatasız bitirme
        'solo_game_types', // oynanan farklı oyun türü sayısı
      ],
      required: true,
    },
    // category_topics için kategori (grammar, vocabulary...), ai_conversations için mod (talk, chat).
    criteriaCategory: { type: String, default: null },
    criteriaValue: { type: Number, required: true },
    // Profildeki rozet listesinin sırası.
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Badge', badgeSchema);
