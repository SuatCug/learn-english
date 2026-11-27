require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { Server } = require('socket.io');

const connectDB = require('./config/db');
const routes = require('./routes');
const { notFound, errorHandler } = require('./middlewares/error.middleware');
const { languageMiddleware } = require('./i18n');
const registerGameSockets = require('./sockets');
const { startStreakReminders } = require('./utils/streakReminder');
const ttsService = require('./services/tts.service');
const { ensureGameBadges } = require('./utils/gameBadges');

const app = express();

// Proxy arkasında (Render, Railway, Fly.io...) istemcinin gerçek IP'si X-Forwarded-For başlığındadır;
// istek sınırları (rateLimit.middleware.js) IP'ye göre çalıştığı için bunun okunması gerekir.
// Varsayılan: production'da 1 proxy katmanına güven, yerelde güvenme. Farklıysa TRUST_PROXY ile değiştir
// (ör. TRUST_PROXY=2 veya TRUST_PROXY=false).
const trustProxy = process.env.TRUST_PROXY ?? (process.env.NODE_ENV === 'production' ? '1' : 'false');
app.set('trust proxy', /^\d+$/.test(trustProxy) ? Number(trustProxy) : trustProxy === 'true');

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL?.split(',') || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// İstek dili (Accept-Language): cevaplardaki mesajlar tr/en döner (i18n/).
app.use(languageMiddleware);
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.json({ success: true, message: 'English Learning App API çalışıyor.' });
});

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.CLIENT_URL?.split(',') || '*' } });
registerGameSockets(io);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 API http://localhost:${PORT} üzerinde çalışıyor.`);
  });
  // Talking sesi: Piper modellerini önceden yükle ki ilk sesli cevap gecikmesin.
  ttsService.warmUp();
  // Seri hatırlatma mailleri (saat başı kontrol; STREAK_REMINDERS=off ile kapatılır).
  startStreakReminders();
  // Oyun Merkezi rozetleri seed çalıştırılmamış veritabanında da olsun.
  ensureGameBadges().catch((err) => console.error('Oyun rozetleri eklenemedi:', err.message));
});
