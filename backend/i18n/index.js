// Kullanıcıya dönen mesajların dili. Kaynak metinler Türkçedir; varsayılan dil İngilizcedir (uygulama İngilizce
// açılır). Sadece Türkçe istenirse (Accept-Language: tr, socket auth.lang: 'tr') Türkçe döner, aksi halde en.js
// sözlüğüyle çevrilir. Sözlükte olmayan mesaj olduğu gibi (Türkçe) döner — tests/i18n.test.js bunu engeller.
const { MESSAGES, PATTERNS } = require('./en');

const pickLang = (value) => (/^tr\b/i.test(String(value ?? '').trim()) ? 'tr' : 'en');

const translate = (message, lang) => {
  if (lang !== 'en' || typeof message !== 'string') return message;
  if (MESSAGES[message]) return MESSAGES[message];
  for (const [pattern, replacement] of PATTERNS) {
    if (pattern.test(message)) return message.replace(pattern, replacement);
  }
  return message;
};

// { message, errors: [{ message }] } biçimindeki cevap gövdesini çevirir (diğer alanlara dokunmaz).
const translateBody = (body, lang) => {
  if (lang !== 'en' || !body || typeof body !== 'object' || Array.isArray(body)) return body;
  let out = body;
  if (typeof body.message === 'string') out = { ...out, message: translate(body.message, lang) };
  if (Array.isArray(body.errors)) {
    out = {
      ...out,
      errors: body.errors.map((e) => (e && typeof e.message === 'string' ? { ...e, message: translate(e.message, lang) } : e)),
    };
  }
  return out;
};

// Express: req.lang'i belirler ve res.json'daki mesajları seçili dile çevirir.
const languageMiddleware = (req, res, next) => {
  req.lang = pickLang(req.get('accept-language'));
  const json = res.json.bind(res);
  res.json = (body) => json(translateBody(body, req.lang));
  next();
};

// Socket.IO: istemcinin dilini (auth.lang) okur; geri çağrı (callback) ve emit ile giden mesajları çevirir.
// Olay işleyicileri kaydedilmeden ÖNCE çağrılmalı.
const localizeSocket = (socket) => {
  const lang = pickLang(socket.handshake.auth?.lang);
  socket.data.lang = lang;
  if (lang !== 'en') return;

  const on = socket.on.bind(socket);
  socket.on = (event, handler) =>
    on(event, (...args) => {
      const last = args[args.length - 1];
      if (typeof last === 'function') args[args.length - 1] = (payload) => last(translateBody(payload, lang));
      return handler(...args);
    });

  const emit = socket.emit.bind(socket);
  socket.emit = (event, payload, ...rest) => emit(event, translateBody(payload, lang), ...rest);
};

module.exports = { pickLang, translate, translateBody, languageMiddleware, localizeSocket };
