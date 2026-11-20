// Tüm route, socket ve servis modülleri hatasız yükleniyor mu? (Sözdizimi hatası veya bozuk import'u yakalar;
// diğer testler bazı dosyaları hiç yüklemediği için bu hatalar aksi halde sunucu açılana kadar fark edilmez.)
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const DIRS = ['routes', 'controllers', 'middlewares', 'services', 'sockets', 'models', 'validations', 'i18n', 'data'];

for (const dir of DIRS) {
  for (const file of fs.readdirSync(path.join(ROOT, dir)).filter((f) => f.endsWith('.js'))) {
    test(`${dir}/${file} yüklenir`, () => {
      assert.doesNotThrow(() => require(path.join(ROOT, dir, file)));
    });
  }
}
