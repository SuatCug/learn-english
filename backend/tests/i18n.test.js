// Kullanıcıya dönen mesajların İngilizce çevirisi (i18n/). Backend kodundaki tüm mesajlar taranır:
// yeni bir Türkçe mesaj eklenip i18n/en.js'e eklenmezse bu test kırılır.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { translate, translateBody, pickLang, languageMiddleware, localizeSocket } = require('../i18n');

const ROOT = path.join(__dirname, '..');
const DIRS = ['controllers', 'middlewares', 'validations', 'sockets', 'services', 'routes', 'utils'];
const SKIP = new Set(['seed.js', 'stableIds.js']);

// ApiError(400, '...'), withMessage('...'), message: '...', setError('...') — tek/çift tırnak ve şablon metinler.
const MESSAGE_RE = /(?:ApiError\(\d+,\s*|withMessage\(|message:\s*(?:[^'"`\n]*\?\s*)?|:\s*)(['"`])((?:\\.|(?!\1)[^\\\n])*)\1/g;
const TURKISH = /[çğıöşüÇĞİÖŞÜ]/;

function collectMessages() {
  const found = new Map();
  for (const dir of DIRS) {
    const walk = (d) => {
      for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
        const full = path.join(d, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (entry.name.endsWith('.js') && !SKIP.has(entry.name)) {
          let text = fs.readFileSync(full, 'utf8');
          // Mail şablonları (MAIL_TEXTS) kendi en/tr karşılıklarını içerir; aşağıdaki ayrı testte kontrol edilir.
          // Satır numaraları bozulmasın diye blok boş satırlarla değiştirilir.
          const mailStart = text.indexOf('const MAIL_TEXTS');
          if (mailStart >= 0) {
            const mailEnd = text.indexOf('const textsFor', mailStart);
            text = text.slice(0, mailStart) + text.slice(mailStart, mailEnd).replace(/[^\n]/g, '') + text.slice(mailEnd);
          }
          for (const m of text.matchAll(MESSAGE_RE)) {
            let msg = m[2].replace(/\\(.)/g, '$1');
            if (!TURKISH.test(msg)) continue;
            // Şablondaki ${...} değerleri örnek değerle doldurulur (kalıp eşleşmesi için).
            msg = msg.replace(/\$\{[^}]+\}/g, '5');
            const line = text.slice(0, m.index).split('\n').length;
            if (!found.has(msg)) found.set(msg, `${path.relative(ROOT, full)}:${line}`);
          }
        }
      }
    };
    walk(path.join(ROOT, dir));
  }
  return found;
}

// Kullanıcıya gösterilmeyen Türkçe metinler (log, AI istemi, kod içi açıklama gibi).
const NOT_USER_FACING = [
  /^MongoDB/,
  /hatası:$/,
  /^Değerlendirme reddedildi\.$/,
  /^Kullanım:/,
];

test('e-posta şablonları: İngilizce ve Türkçe aynı alanlara sahip, varsayılan İngilizce', () => {
  const { MAIL_TEXTS, textsFor } = require('../utils/mail.util');
  assert.deepEqual(Object.keys(MAIL_TEXTS.en).sort(), Object.keys(MAIL_TEXTS.tr).sort());
  assert.equal(textsFor('tr').verifySubject('123456'), 'Doğrulama kodun: 123456');
  assert.equal(textsFor('en').resetSubject('123456'), 'Your password reset code: 123456');
  assert.equal(textsFor(undefined), MAIL_TEXTS.en, 'dil belirtilmezse İngilizce');
  for (const value of Object.values(MAIL_TEXTS.en)) {
    const text = typeof value === 'function' ? value('x') : value;
    assert.ok(!TURKISH.test(text), `İngilizce şablonda Türkçe karakter: ${text}`);
  }
});

test('backend kodundaki her kullanıcı mesajının İngilizcesi var', () => {
  const messages = collectMessages();
  assert.ok(messages.size > 50, `beklenenden az mesaj bulundu (${messages.size}); tarama bozulmuş olabilir`);
  const missing = [...messages]
    .filter(([msg]) => !NOT_USER_FACING.some((re) => re.test(msg)))
    .filter(([msg]) => translate(msg, 'en') === msg);
  assert.deepEqual(
    missing.map(([msg, where]) => `${where}  ${msg}`),
    [],
    'i18n/en.js içinde karşılığı olmayan mesajlar'
  );
});

test('kalıplı mesajlar değeri koruyarak çevrilir', () => {
  assert.equal(translate('Çok fazla deneme yaptın. Lütfen 15 dakika sonra tekrar dene.', 'en'), 'Too many attempts. Please try again in 15 minutes.');
  assert.equal(translate('Mesaj en fazla 4000 karakter olabilir.', 'en'), 'A message can be at most 4000 characters.');
  assert.equal(translate('Endpoint bulunamadı: /api/x', 'en'), 'Endpoint not found: /api/x');
});

test('Türkçe istenirse ve bilinmeyen mesajda metin değişmez', () => {
  assert.equal(translate('Sınıf bulunamadı.', 'tr'), 'Sınıf bulunamadı.');
  assert.equal(translate('Bilinmeyen mesaj', 'en'), 'Bilinmeyen mesaj');
});

test('dil seçimi: sadece "tr" Türkçe, geri kalan her şey (varsayılan) İngilizce', () => {
  assert.equal(pickLang('en'), 'en');
  assert.equal(pickLang('en-US,en;q=0.9'), 'en');
  assert.equal(pickLang('tr'), 'tr');
  assert.equal(pickLang('tr-TR,tr;q=0.9,en;q=0.8'), 'tr');
  assert.equal(pickLang(undefined), 'en');
  assert.equal(pickLang('de-DE'), 'en');
});

test('cevap gövdesi: message ve errors[].message çevrilir, diğer alanlar korunur', () => {
  const body = {
    success: false,
    message: 'Girdi doğrulama hatası.',
    errors: [{ field: 'email', message: 'Geçerli bir e-posta adresi giriniz.' }],
    data: { message: 'Sınıf bulunamadı.' },
  };
  const out = translateBody(body, 'en');
  assert.equal(out.message, 'Validation error.');
  assert.equal(out.errors[0].message, 'Please enter a valid email address.');
  assert.equal(out.errors[0].field, 'email');
  assert.equal(out.data.message, 'Sınıf bulunamadı.', 'iç içe veri (ör. AI mesajı) değiştirilmez');
  assert.equal(translateBody(body, 'tr'), body);
});

test('Express ara katmanı: Accept-Language: en ile res.json mesajı İngilizce döner', () => {
  const sent = [];
  const res = { json: (b) => sent.push(b) };
  const req = { get: (h) => (h === 'accept-language' ? 'en' : undefined) };
  languageMiddleware(req, res, () => {});
  res.json({ success: true, message: 'Profil güncellendi.' });
  assert.equal(req.lang, 'en');
  assert.equal(sent[0].message, 'Profile updated.');
});

test('socket: İngilizce istemcide callback ve emit mesajları çevrilir', () => {
  const handlers = {};
  const emitted = [];
  const socket = {
    handshake: { auth: { lang: 'en' } },
    data: {},
    on: (event, handler) => {
      handlers[event] = handler;
    },
    emit: (event, payload) => emitted.push([event, payload]),
  };
  localizeSocket(socket);

  let reply;
  socket.on('ai:message', (payload, cb) => cb({ ok: false, message: 'Mesaj boş olamaz.' }));
  handlers['ai:message']({}, (r) => {
    reply = r;
  });
  assert.equal(reply.message, 'Message cannot be empty.');

  socket.emit('ai:error', { conversationId: 'x', message: 'AI şu an çok yoğun, birazdan tekrar dene.' });
  assert.equal(emitted[0][1].message, 'The AI is very busy right now. Please try again shortly.');
});
