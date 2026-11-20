// Erişim kuralları: dersler misafire açık, kayıt/AI/sınav/sınıf girişli. (Route tanımlarına bakılır, veritabanı yok.)
// Biri yanlışlıkla AI'yı veya ilerleme kaydını herkese açarsa bu test kırılır.
const test = require('node:test');
const assert = require('node:assert/strict');
const authenticate = require('../middlewares/auth.middleware');

// Router'daki (method, path) için middleware zincirinde authenticate var mı? router.use(authenticate) da sayılır.
function requiresAuth(router, method, path) {
  const routerLevel = router.stack.some((layer) => !layer.route && layer.handle === authenticate);
  const layer = router.stack.find((l) => l.route?.path === path && l.route.methods[method]);
  assert.ok(layer, `${method.toUpperCase()} ${path} bulunamadı`);
  return routerLevel || layer.route.stack.some((s) => s.handle === authenticate);
}

const topics = require('../routes/topic.routes');
const users = require('../routes/user.routes');
const ai = require('../routes/aiChat.routes');
const exams = require('../routes/exam.routes');
const placement = require('../routes/placementTest.routes');

test('misafire açık: konular, sorular, cevap kontrolü, sınav/test içeriğini görmek', () => {
  assert.equal(requiresAuth(topics, 'get', '/'), false);
  assert.equal(requiresAuth(topics, 'get', '/:id'), false);
  assert.equal(requiresAuth(topics, 'get', '/:id/questions'), false);
  assert.equal(requiresAuth(topics, 'post', '/:id/check'), false);
});

test('girişli: ilerleme kaydı, profil, AI, sınav ve Seviye Testi gönderimi', () => {
  assert.equal(requiresAuth(users, 'post', '/progress'), true);
  assert.equal(requiresAuth(users, 'get', '/me'), true);
  assert.equal(requiresAuth(ai, 'post', '/conversations'), true);
  assert.equal(requiresAuth(ai, 'post', '/tts'), true);
  assert.equal(requiresAuth(exams, 'post', '/:level/submit'), true);
  assert.equal(requiresAuth(placement, 'post', '/submit'), true);
});
