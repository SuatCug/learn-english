const { body, query } = require('express-validator');
const { GAME_TYPES, GAME_SECTIONS } = require('../models/gameResult.model');

// Bir oyunda en fazla 20 soru / 20 eşleşme var; sınır biraz geniş tutulur.
const MAX_UNITS = 40;

const saveResultRules = [
  body('clientId').isString().trim().isLength({ min: 6, max: 64 }).withMessage('clientId zorunludur.'),
  body('type').isIn(GAME_TYPES).withMessage('Geçersiz oyun türü.'),
  body('section').isIn(GAME_SECTIONS).withMessage('Geçersiz bölüm.'),
  body('level').isIn(['A1', 'A2', 'B1', 'B2']).withMessage('Geçersiz seviye.'),
  body('timed').optional().isBoolean().toBoolean(),
  body('total').isInt({ min: 1, max: MAX_UNITS }).toInt().withMessage('total 1-40 arasında olmalıdır.'),
  body('correct').isInt({ min: 0, max: MAX_UNITS }).toInt().withMessage('correct geçersiz.'),
  body('score').isInt({ min: 0 }).toInt().withMessage('score geçersiz.'),
  body('durationMs').optional().isInt({ min: 0, max: 24 * 60 * 60 * 1000 }).toInt(),
  body('playedAt').optional().isISO8601().withMessage('playedAt tarih olmalıdır.'),
];

const leaderboardRules = [query('period').optional().isIn(['week', 'all']).withMessage('period week veya all olmalıdır.')];

module.exports = { saveResultRules, leaderboardRules };
