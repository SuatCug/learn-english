const router = require('express').Router();
const authenticate = require('../middlewares/auth.middleware');
const aiChatController = require('../controllers/aiChat.controller');
const limit = require('../middlewares/rateLimit.middleware');

// Mesaj gönderme REST ile değil socket ile yapılır (ai:message) — cevap canlı aksın diye.
router.use(authenticate);

router.post('/tts', limit.tts, aiChatController.tts);
router.get('/topics/:level', aiChatController.listTopics);
router.get('/conversations', aiChatController.list);
router.post('/conversations', aiChatController.create);
router.get('/conversations/:id', aiChatController.getOne);
router.post('/conversations/:id/finish', aiChatController.finish);
router.delete('/conversations/:id', aiChatController.remove);

module.exports = router;
