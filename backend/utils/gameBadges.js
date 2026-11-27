const { Badge } = require('../models');

// Oyun Merkezi (tek kişilik oyunlar) rozetleri. Seed'deki rozet listesine de eklenir (utils/seed.js);
// seed çalıştırılmadan yayına alınan sunucuda da var olsunlar diye açılışta başlığa göre upsert edilir.
const GAME_BADGES = [
  { title: 'Player One', description: 'You finished your first game in the Game Center.', icon: '🎲', criteriaType: 'solo_games_played', criteriaValue: 1 },
  { title: 'Game Fan', description: 'You finished 10 games in the Game Center.', icon: '🎯', criteriaType: 'solo_games_played', criteriaValue: 10 },
  { title: 'Arcade Legend', description: 'You finished 50 games in the Game Center.', icon: '🏅', criteriaType: 'solo_games_played', criteriaValue: 50 },
  { title: 'Flawless Run', description: 'You answered every question right in a game of 10 or more.', icon: '⭐', criteriaType: 'solo_game_perfect', criteriaValue: 10 },
  { title: 'All-Rounder', description: 'You played all four game types.', icon: '🧩', criteriaType: 'solo_game_types', criteriaValue: 4 },
];

// Var olanların alanları güncellenir; yeni eklenenler profilde listenin sonuna (order) gelir.
const ensureGameBadges = async () => {
  const last = await Badge.findOne().sort({ order: -1 }).select('order');
  const base = (last?.order ?? 0) + 1;
  await Badge.bulkWrite(
    GAME_BADGES.map((badge, i) => ({
      updateOne: {
        filter: { title: badge.title },
        update: { $set: { criteriaCategory: null, ...badge }, $setOnInsert: { order: base + i } },
        upsert: true,
      },
    }))
  );
};

module.exports = { GAME_BADGES, ensureGameBadges };
