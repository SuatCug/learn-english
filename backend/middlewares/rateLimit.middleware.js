const { rateLimit } = require('express-rate-limit');
const ApiError = require('../utils/apiError');

// İstek sınırları (rate limiting): kaba kuvvetle şifre denemeyi ve mail gönderen uçların kötüye
// kullanılmasını (Brevo kotası, spam şikâyeti) engeller. Hesap bazlı korumalar (kod deneme sayısı,
// 60 sn tekrar gönderme beklemesi) auth.controller.js'te ayrıca var; bunlar IP bazlı ek katman.
//
// Sınıf senaryosu: bir okulda tüm öğrenciler aynı IP'den gelebilir. Bu yüzden login sınırı IP + e-posta
// çiftine göre konur ve sadece başarısız denemeler sayılır; IP genelindeki sınırlar da cömert tutulur.
//
// Not: Canlıda backend bir proxy arkasındaysa (Render, Railway, Fly.io...) gerçek IP'yi okumak için
// index.js'teki 'trust proxy' ayarı gerekir; yoksa herkes aynı IP'den geliyor görünür.

const MINUTE = 60 * 1000;

const emailOf = (req) => String(req.body?.email ?? '').trim().toLowerCase();

const limiter = ({ windowMs, limit, message, key, skipSuccessfulRequests = false }) =>
  rateLimit({
    windowMs,
    limit,
    skipSuccessfulRequests,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    ...(key && { keyGenerator: key }),
    // Hata, uygulamanın normal hata formatında ({ success: false, message }) döner.
    handler: (req, res, next) => next(new ApiError(429, message)),
  });

const tooMany = (minutes) => `Çok fazla deneme yaptın. Lütfen ${minutes} dakika sonra tekrar dene.`;

// Login: aynı hesap için aynı IP'den 15 dakikada 10 hatalı deneme; IP genelinde 50 hatalı deneme.
const loginPerAccount = limiter({
  windowMs: 15 * MINUTE,
  limit: 10,
  skipSuccessfulRequests: true,
  key: (req) => `${req.ip}|${emailOf(req)}`,
  message: tooMany(15),
});
const loginPerIp = limiter({ windowMs: 15 * MINUTE, limit: 50, skipSuccessfulRequests: true, message: tooMany(15) });

// Kayıt: her kayıt doğrulama maili gönderir. Aynı IP'den saatte 30 kayıt (bir sınıfın topluca kaydı sığar).
const register = limiter({ windowMs: 60 * MINUTE, limit: 30, message: tooMany(60) });

// Mail gönderen diğer uçlar (doğrulama mailini tekrar gönder, şifremi unuttum):
// aynı adres için saatte 5, aynı IP'den saatte 30.
const mailPerAccount = limiter({
  windowMs: 60 * MINUTE,
  limit: 5,
  key: (req) => `${req.ip}|${emailOf(req)}`,
  message: tooMany(60),
});
const mailPerIp = limiter({ windowMs: 60 * MINUTE, limit: 30, message: tooMany(60) });

// Kod/link doğrulama ve şifre sıfırlama: 15 dakikada 30 istek (hesap başına deneme sınırı ayrıca var).
const codeCheck = limiter({ windowMs: 15 * MINUTE, limit: 30, message: tooMany(15) });

// Google ile giriş: 15 dakikada 30 istek.
const google = limiter({ windowMs: 15 * MINUTE, limit: 30, message: tooMany(15) });

// AI ses üretimi (Talking, Piper TTS — sunucu CPU'su kullanır): kullanıcı başına 10 dakikada 100 istek.
const tts = limiter({
  windowMs: 10 * MINUTE,
  limit: 100,
  key: (req) => `user:${req.user?.id ?? req.ip}`,
  message: 'Çok fazla ses isteği gönderildi. Birkaç dakika sonra tekrar dene.',
});

module.exports = {
  login: [loginPerIp, loginPerAccount],
  register,
  mail: [mailPerIp, mailPerAccount],
  codeCheck,
  google,
  tts,
};
