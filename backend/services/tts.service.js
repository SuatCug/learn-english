// Talking (sesli konuşma) için AI cevabını Piper ile sese çevirir — ses: Cori (en_GB, kadın).
// Piper yerelde/sunucuda çalışan ücretsiz bir TTS'tir; kurulum utils/generateListeningAudio.js'teki gibi:
//   PIPER_DIR (varsayılan %LOCALAPPDATA%\piper-tts) içinde piper/piper(.exe) ve voices/en_GB-cori-medium.onnx(+.json).
//   Yol Türkçe karakter İÇERMEMELİ.
//
// Hız için Piper her istekte yeniden başlatılmaz: her seviye (konuşma hızı farklı) için bir Piper işlemi açık tutulur
// ve cümleler ona JSON satırı olarak gönderilir. Model bir kez yüklendiği için bir cümle ~0.5 sn'de hazırlanır
// (her seferinde yeniden başlatınca ~2.7 sn sürüyordu).
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');

const PIPER_DIR = process.env.PIPER_DIR || path.join(os.homedir(), 'AppData', 'Local', 'piper-tts');
const PIPER_EXE = path.join(PIPER_DIR, 'piper', process.platform === 'win32' ? 'piper.exe' : 'piper');
const VOICE = process.env.AI_TALK_VOICE || 'en_GB-cori-medium';
const MODEL = path.join(PIPER_DIR, 'voices', `${VOICE}.onnx`);
const OUT_DIR = path.join(os.tmpdir(), 'learn-english-tts'); // Piper'ın geçici WAV dosyaları
const MAX_CHARS = 1500;
const JOB_TIMEOUT_MS = 20000;

// Listening kayıtlarıyla aynı: A1–A2 daha yavaş ve net, B1–B2 doğal hızda (lengthScale > 1 yavaşlatır).
const STYLE = {
  A1: { lengthScale: 1.2, sentenceSilence: 0.4 },
  A2: { lengthScale: 1.1, sentenceSilence: 0.3 },
  B1: { lengthScale: 1.0, sentenceSilence: 0.25 },
  B2: { lengthScale: 0.97, sentenceSilence: 0.2 },
};

const isAvailable = () =>
  !/[^\x20-\x7e]/.test(PIPER_DIR) && !/[^\x20-\x7e]/.test(OUT_DIR) && fs.existsSync(PIPER_EXE) && fs.existsSync(MODEL);

// Sesli okunacak metni temizler: Markdown işaretleri, emojiler, parantez içi Türkçe ipuçları okunmasın.
const cleanText = (text) =>
  String(text)
    .replace(/\*\*?|__|`|#+\s/g, '')
    .replace(/\([^)]*[çğıöşüÇĞİÖŞÜ][^)]*\)/g, '')
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_CHARS);

// Bir seviye için açık tutulan Piper işlemi. Cümleleri sırayla işler; her cümle için Piper yazdığı
// WAV dosyasının yolunu stdout'a bir satır olarak basar.
class PiperWorker {
  constructor(level) {
    this.level = level;
    this.proc = null;
    this.queue = [];
    this.current = null;
    this.stdoutBuffer = '';
    this.seq = 0;
  }

  start() {
    fs.mkdirSync(OUT_DIR, { recursive: true });
    const { lengthScale, sentenceSilence } = STYLE[this.level];
    const proc = spawn(PIPER_EXE, [
      '--model',
      MODEL,
      '--json-input',
      '--length_scale',
      String(lengthScale),
      '--sentence_silence',
      String(sentenceSilence),
      '--output_dir',
      OUT_DIR,
    ]);
    proc.stdout.on('data', (d) => this.onStdout(d));
    proc.stderr.on('data', () => {});
    proc.stdin.on('error', () => {});
    proc.on('error', (err) => this.fail(proc, err));
    proc.on('close', (code) => this.fail(proc, new Error(`Piper kapandı (kod ${code})`)));
    this.proc = proc;
  }

  // İşlem kapanınca/hata verince bekleyen her şeyi reddeder; bir sonraki istekte yeniden açılır.
  fail(proc, err) {
    if (this.proc !== proc) return;
    this.proc = null;
    const jobs = [this.current, ...this.queue].filter(Boolean);
    this.current = null;
    this.queue = [];
    for (const job of jobs) {
      clearTimeout(job.timer);
      job.reject(err);
    }
  }

  onStdout(data) {
    this.stdoutBuffer += data.toString();
    let newline;
    while ((newline = this.stdoutBuffer.indexOf('\n')) !== -1) {
      const line = this.stdoutBuffer.slice(0, newline).trim();
      this.stdoutBuffer = this.stdoutBuffer.slice(newline + 1);
      if (line && this.current) this.finish(this.current);
    }
  }

  finish(job) {
    clearTimeout(job.timer);
    this.current = null;
    try {
      const wav = fs.readFileSync(job.file);
      fs.unlink(job.file, () => {});
      job.resolve(wav);
    } catch (err) {
      job.reject(err);
    }
    this.next();
  }

  run(text) {
    return new Promise((resolve, reject) => {
      this.queue.push({ text, resolve, reject });
      this.next();
    });
  }

  next() {
    if (this.current || this.queue.length === 0) return;
    if (!this.proc) this.start();
    const job = this.queue.shift();
    job.file = path.join(OUT_DIR, `${process.pid}-${this.level}-${++this.seq}.wav`);
    // Piper takılırsa işlemi kapat: bekleyenler hata alır, sonraki istek yeni işlemle başlar.
    job.timer = setTimeout(() => this.proc?.kill(), JOB_TIMEOUT_MS);
    this.current = job;
    this.proc.stdin.write(`${JSON.stringify({ text: job.text, output_file: job.file })}\n`);
  }
}

const workers = {};
const workerFor = (level) => (workers[level] ??= new PiperWorker(level));

// Aynı cümleler (konuların ilk mesajları, "Listen again") tekrar üretilmesin diye küçük bir bellek önbelleği;
// aynı anda gelen aynı istekler (ön hazırlık + tarayıcı isteği) tek bir işi paylaşır.
const cache = new Map();
const CACHE_LIMIT = 100;
const inFlight = new Map();

const synthesize = (text, level = 'B1') => {
  const clean = cleanText(text);
  if (!clean) return Promise.reject(new Error('Okunacak metin yok.'));
  const lv = STYLE[level] ? level : 'B1';
  const key = `${lv}|${clean}`;
  if (cache.has(key)) return Promise.resolve(cache.get(key));
  if (inFlight.has(key)) return inFlight.get(key);

  const job = workerFor(lv)
    .run(clean)
    .then((wav) => {
      cache.set(key, wav);
      if (cache.size > CACHE_LIMIT) cache.delete(cache.keys().next().value);
      return wav;
    })
    .finally(() => inFlight.delete(key));
  inFlight.set(key, job);
  return job;
};

module.exports = { synthesize, isAvailable, VOICE };
