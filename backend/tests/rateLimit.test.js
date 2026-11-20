// Giriş ve mail uçlarındaki istek sınırları (middlewares/rateLimit.middleware.js).
// Gerçek limitleyiciler sahte uçlara bağlanır; veritabanı kullanılmaz.
const test = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const { errorHandler } = require('../middlewares/error.middleware');

// Her test kendi sayaçlarıyla başlasın diye modül her seferinde yeniden yüklenir.
const freshLimits = () => {
  delete require.cache[require.resolve('../middlewares/rateLimit.middleware')];
  return require('../middlewares/rateLimit.middleware');
};

const startApp = async (t) => {
  // Hata yöneticisi geliştirme ortamında beklenen 429 hatalarını da konsola basar; testte susturulur.
  t.mock.method(console, 'error', () => {});
  const limit = freshLimits();
  const app = express();
  app.use(express.json());
  app.post('/login', limit.login, (req, res) =>
    req.body.password === 'ok' ? res.json({ ok: true }) : res.status(401).json({ ok: false })
  );
  app.post('/forgot', limit.mail, (req, res) => res.json({ ok: true }));
  app.use(errorHandler);
  const server = await new Promise((resolve) => {
    const s = app.listen(0, () => resolve(s));
  });
  const url = `http://127.0.0.1:${server.address().port}`;
  const post = async (path, body) =>
    (await fetch(url + path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }))
      .status;
  const times = async (n, path, body) => {
    const codes = [];
    for (let i = 0; i < n; i += 1) codes.push(await post(path, body));
    return codes;
  };
  return { server, post, times };
};

test('login: başarılı girişler sayılmaz; 10 hatalı denemeden sonra hesap kilitlenir', async (t) => {
  const { server, post, times } = await startApp(t);
  t.after(() => server.close());

  assert.deepEqual(await times(5, '/login', { email: 'a@x.com', password: 'ok' }), Array(5).fill(200));
  assert.deepEqual(await times(10, '/login', { email: 'a@x.com', password: 'bad' }), Array(10).fill(401));
  assert.equal(await post('/login', { email: 'a@x.com', password: 'bad' }), 429);
  assert.equal(await post('/login', { email: 'A@X.com', password: 'ok' }), 429, 'kilitliyken doğru şifre de, büyük harfle de engellenir');
  assert.equal(await post('/login', { email: 'b@x.com', password: 'bad' }), 401, 'başka hesap etkilenmez (sınıf senaryosu)');
});

test('şifremi unuttum: aynı adrese saatte 5 istek', async (t) => {
  const { server, post, times } = await startApp(t);
  t.after(() => server.close());

  assert.deepEqual(await times(5, '/forgot', { email: 'c@x.com' }), Array(5).fill(200));
  assert.equal(await post('/forgot', { email: 'c@x.com' }), 429);
  assert.equal(await post('/forgot', { email: 'd@x.com' }), 200);
});
