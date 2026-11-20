// Eksik çeviri kontrolü: src içindeki her t('...') / i18n.t('...') anahtarının src/i18n/tr.js'te
// Türkçe karşılığı var mı? Eksik varsa listeler ve hata koduyla çıkar. Kullanılmayan anahtarları uyarı olarak yazar.
// Çalıştırma: npm run i18n:check
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src');
const { default: tr } = await import(pathToFileURL(path.join(root, 'i18n/tr.js')).href);

const files = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(jsx?|mjs)$/.test(entry.name) && !full.includes(`${path.sep}i18n${path.sep}`)) files.push(full);
  }
};
walk(root);

// t('..') / tk('..') / t("..") / t(`..`) — tırnak içindeki kaçışlı karakterler dahil; `${` içeren şablonlar dinamik sayılır.
const CALL = /(?<![\w$.])(?:i18n\.)?tk?\(\s*(['"`])((?:\\.|(?!\1)[^\\])*)\1/g;
const unescape = (s) => s.replace(/\\(.)/g, '$1');

const used = new Map(); // anahtar -> ilk geçtiği yer
const dynamic = [];
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  // <Trans i18nKey="..."> (cümle içinde bağlantı/kalın yazı olan metinler)
  for (const m of text.matchAll(/i18nKey=(["'])((?:\\.|(?!\1)[^\\])*)\1/g)) {
    const key = unescape(m[2]);
    if (!used.has(key)) used.set(key, `${path.relative(root, file)}:${text.slice(0, m.index).split('\n').length}`);
  }
  for (const m of text.matchAll(CALL)) {
    const where = `${path.relative(root, file)}:${text.slice(0, m.index).split('\n').length}`;
    if (m[1] === '`' && m[2].includes('${')) {
      dynamic.push(where);
      continue;
    }
    const key = unescape(m[2]);
    if (!used.has(key)) used.set(key, where);
  }
}

const missing = [...used].filter(([key]) => !(key in tr));
const unused = Object.keys(tr).filter((key) => !used.has(key));

console.log(`${used.size} anahtar kullanılıyor, sözlükte ${Object.keys(tr).length} çeviri var.`);
if (dynamic.length) console.log(`Uyarı: değişkenli şablon anahtarı (kontrol edilemez): ${dynamic.join(', ')}`);
if (unused.length) console.log(`Uyarı: kullanılmayan ${unused.length} çeviri:\n  ${unused.join('\n  ')}`);
if (missing.length) {
  console.error(`\nEKSİK ${missing.length} çeviri:`);
  for (const [key, where] of missing) console.error(`  ${where}  ${JSON.stringify(key)}`);
  process.exit(1);
}
console.log('Tüm anahtarların Türkçe karşılığı var.');
