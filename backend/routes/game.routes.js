const router = require('express').Router();
const gameController = require('../controllers/game.controller');
const authenticate = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { saveResultRules, leaderboardRules } = require('../validations/game.validation');

// Oyun Merkezi (tek kişilik oyunlar, mobil).
router.post('/results', authenticate, saveResultRules, validate, gameController.saveResult);
router.get('/results/me', authenticate, gameController.myResults);
router.get('/leaderboard', authenticate, leaderboardRules, validate, gameController.leaderboard);

module.exports = router;
