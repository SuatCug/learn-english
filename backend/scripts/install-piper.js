// Render (Linux) derlemesinde Piper TTS'i ve Cori sesini kurar: Talking'de AI cevapları bu sesle okunur
// (services/tts.service.js). `npm install` sonrasında (postinstall) çalışır.
//   - Yalnızca Render'da (RENDER ortam değişkeni) ya da INSTALL_PIPER=1 verilince çalışır; yerelde Windows
//     kurulumu (%LOCALAPPDATA%\piper-tts) kullanılmaya devam eder.
//   - Zaten kuruluysa tekrar indirmez.
//   - Bir şey ters giderse derlemeyi DURDURMAZ: ses servisi kurulmamış sayılır, uygulamalar cihaz sesine düşer.
const fs = require('fs');
const path = require('path');
const https = require('https');
const { execFileSync } = require('child_process');

const DIR = path.join(__dirname, '..', '.piper-tts');
const PIPER_URL = 'https://github.com/rhasspy/piper/releases/download/2023.11.14-2/piper_linux_x86_64.tar.gz';
const VOICE = process.env.AI_TALK_VOICE || 'en_GB-cori-medium';
const VOICE_BASE = 'https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_GB/cori/medium';

const shouldRun = process.env.RENDER || process.env.INSTALL_PIPER === '1';

function download(url, dest, redirects = 5) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'learn-english-build' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirects > 0) {
          res.resume();
          resolve(download(new URL(res.headers.location, url).toString(), dest, redirects - 1));
          return;
        }
        if (res.statusCode !== 200) {
          res.resume();
          reject(new Error(`${url} → HTTP ${res.statusCode}`));
          return;
        }
        const tmp = `${dest}.part`;
        const file = fs.createWriteStream(tmp);
        res.pipe(file);
        file.on('finish', () => file.close(() => fs.rename(tmp, dest, (err) => (err ? reject(err) : resolve()))));
        file.on('error', reject);
      })
      .on('error', reject);
  });
}

async function main() {
  if (!shouldRun || process.platform !== 'linux') {
    console.log('[piper] Kurulum atlandı (yalnızca Render/Linux derlemesinde çalışır).');
    return;
  }
  const exe = path.join(DIR, 'piper', 'piper');
  const model = path.join(DIR, 'voices', `${VOICE}.onnx`);
  fs.mkdirSync(path.join(DIR, 'voices'), { recursive: true });

  if (!fs.existsSync(exe)) {
    console.log('[piper] Piper indiriliyor…');
    const tarball = path.join(DIR, 'piper.tar.gz');
    await download(PIPER_URL, tarball);
    execFileSync('tar', ['-xzf', tarball, '-C', DIR]);
    fs.unlinkSync(tarball);
    fs.chmodSync(exe, 0o755);
  }
  for (const ext of ['.onnx', '.onnx.json']) {
    const dest = path.join(DIR, 'voices', `${VOICE}${ext}`);
    if (!fs.existsSync(dest)) {
      console.log(`[piper] Ses indiriliyor: ${VOICE}${ext}`);
      await download(`${VOICE_BASE}/${VOICE}${ext}`, dest);
    }
  }
  console.log(`[piper] Hazır: ${exe} + ${model}`);
}

main().catch((err) => {
  console.warn(`[piper] Kurulamadı, AI sesi cihaz sesine düşecek: ${err.message}`);
});
