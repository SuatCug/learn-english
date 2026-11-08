// Listening kayıtlarını Piper (ücretsiz, yerel TTS) ile üretir ve Cloudinary'ye yükler
// (data/listeningData.js konuları + data/levelExams.js seviye sınavlarının listening bölümleri).
//
// - Her satır, konuşmacısının sesiyle ayrı üretilir; diyalog satırları arasına kısa bir sessizlik eklenip
//   hepsi tek bir WAV dosyasında birleştirilir. Cloudinary bu WAV'ı ".mp3" URL'siyle MP3 olarak sunar.
// - Üretilen dosyalar <proje kökü>/topic-audio/<seviye>/<slug>.wav altında saklanır (git'e girmez);
//   sınav kayıtları topic-audio/exams/<seviye>/<slug>.wav altında.
//   Yanındaki .json dosyası metnin özetini tutar: metin değişmediyse ses yeniden üretilmez, yükleme de
//   tekrarlanmaz. Yani script güvenle tekrar tekrar çalıştırılabilir; sadece eksik/değişenleri yapar.
//
// Piper kurulumu (bir kez): PIPER_DIR klasöründe piper/piper.exe ve voices/<ses>.onnx(+.json) olmalı.
//   Varsayılan PIPER_DIR: %LOCALAPPDATA%\piper-tts. Yol Türkçe karakter İÇERMEMELİ (Piper'ın espeak-ng
//   bileşeni "Masaüstü" gibi yolları okuyamıyor).
//   Piper: https://github.com/rhasspy/piper/releases  Sesler: https://huggingface.co/rhasspy/piper-voices
//
// Gerekenler (backend/.env): CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
//
// Kullanım:
//   node utils/generateListeningAudio.js              -> eksik/değişen tüm kayıtlar
//   node utils/generateListeningAudio.js --force slug  -> o kaydı metin aynı olsa da yeniden üret
//   node utils/generateListeningAudio.js --force all   -> hepsini yeniden üret
//   node utils/generateListeningAudio.js --no-upload   -> sadece yerelde üret (dinleyip kontrol etmek için)
require('dotenv').config();
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');
const { LISTENING_DATA, listeningAudioId } = require('../data/listeningData');
const { examListeningItems } = require('../data/levelExams');
const { getConfig, uploadToCloudinary } = require('./cloudinary.util');

const PIPER_DIR = process.env.PIPER_DIR || path.join(os.homedir(), 'AppData', 'Local', 'piper-tts');
const PIPER_EXE = path.join(PIPER_DIR, 'piper', process.platform === 'win32' ? 'piper.exe' : 'piper');
const AUDIO_ROOT = path.join(__dirname, '../../topic-audio');

// listeningData.js'teki ses adları -> Piper modeli (hepsi en_GB, 22050 Hz).
const VOICES = {
  cori: 'en_GB-cori-medium',
  jenny: 'en_GB-jenny_dioco-medium',
  alan: 'en_GB-alan-medium',
  northern: 'en_GB-northern_english_male-medium',
};

// lengthScale > 1 konuşmayı yavaşlatır. A1–A2 daha yavaş ve net, B1–B2 doğal hızda.
const STYLE = {
  A1: { lengthScale: 1.2, sentenceSilence: 0.45 },
  A2: { lengthScale: 1.1, sentenceSilence: 0.35 },
  B1: { lengthScale: 1.0, sentenceSilence: 0.3 },
  B2: { lengthScale: 0.97, sentenceSilence: 0.25 },
};
const TURN_SILENCE_SECONDS = 0.5; // diyalogda konuşmacı değişirken
const EDGE_SILENCE_SECONDS = 0.4; // kaydın başı ve sonu

const args = process.argv.slice(2);
const forceArg = (() => {
  const i = args.indexOf('--force');
  return i === -1 ? null : args[i + 1] || 'all';
})();
const noUpload = args.includes('--no-upload');

const readSampleRate = (voice) => {
  const config = JSON.parse(fs.readFileSync(path.join(PIPER_DIR, 'voices', `${VOICES[voice]}.onnx.json`), 'utf8'));
  return config.audio.sample_rate;
};

// Piper'a metni stdin'den verir, ham 16-bit mono PCM'i stdout'tan alır.
const synthesize = ({ text, voice, level }) =>
  new Promise((resolve, reject) => {
    const { lengthScale, sentenceSilence } = STYLE[level];
    const child = spawn(PIPER_EXE, [
      '--model',
      path.join(PIPER_DIR, 'voices', `${VOICES[voice]}.onnx`),
      '--output_raw',
      '--length_scale',
      String(lengthScale),
      '--sentence_silence',
      String(sentenceSilence),
    ]);
    const chunks = [];
    let stderr = '';
    child.stdout.on('data', (d) => chunks.push(d));
    child.stderr.on('data', (d) => (stderr += d));
    child.on('error', reject);
    child.on('close', (code) => {
      const pcm = Buffer.concat(chunks);
      if (code !== 0 || pcm.length === 0) reject(new Error(`Piper hata verdi (kod ${code}): ${stderr.slice(-300)}`));
      else resolve(pcm);
    });
    child.stdin.end(`${text}\n`, 'utf8');
  });

const silence = (seconds, sampleRate) => Buffer.alloc(Math.round(seconds * sampleRate) * 2);

const wavFile = (pcm, sampleRate) => {
  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16); // fmt chunk boyutu
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(1, 22); // mono
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * 2, 28); // byte rate
  header.writeUInt16LE(2, 32); // block align
  header.writeUInt16LE(16, 34); // bit derinliği
  header.write('data', 36);
  header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]);
};

const fingerprint = (level, item) =>
  crypto
    .createHash('sha1')
    .update(
      JSON.stringify({
        engine: 'piper',
        voices: VOICES,
        style: STYLE[level],
        turn: TURN_SILENCE_SECONDS,
        edge: EDGE_SILENCE_SECONDS,
        speakers: item.speakers,
        script: item.script,
      })
    )
    .digest('hex');

const readMeta = (metaPath) => {
  try {
    return JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  } catch {
    return {};
  }
};

const checkSetup = () => {
  if (/[^\x20-\x7e]/.test(PIPER_DIR)) {
    throw new Error(`PIPER_DIR Türkçe/ASCII dışı karakter içeriyor, Piper bu yolu okuyamaz: ${PIPER_DIR}`);
  }
  if (!fs.existsSync(PIPER_EXE)) throw new Error(`Piper bulunamadı: ${PIPER_EXE}`);
  const missing = Object.values(VOICES).filter((v) => !fs.existsSync(path.join(PIPER_DIR, 'voices', `${v}.onnx`)));
  if (missing.length) throw new Error(`Ses modeli eksik: ${missing.join(', ')} (${path.join(PIPER_DIR, 'voices')})`);
  const rates = new Set(Object.keys(VOICES).map(readSampleRate));
  if (rates.size !== 1) throw new Error('Seslerin örnekleme hızları farklı; aynı kayıtta birleştirilemezler.');
  if (!noUpload) getConfig();
  return [...rates][0];
};

const run = async () => {
  const sampleRate = checkSetup();
  const items = [
    ...Object.entries(LISTENING_DATA).flatMap(([level, list]) =>
      list.map((item) => ({
        level,
        item,
        publicId: listeningAudioId(level, item.slug),
        dir: path.join(AUDIO_ROOT, level.toLowerCase()),
      }))
    ),
    ...examListeningItems().map(({ level, item, publicId }) => ({
      level,
      item,
      publicId,
      dir: path.join(AUDIO_ROOT, 'exams', level.toLowerCase()),
    })),
  ];
  let generated = 0;
  let uploaded = 0;
  let upToDate = 0;
  const failed = [];

  for (const { level, item, publicId, dir } of items) {
    const wavPath = path.join(dir, `${item.slug}.wav`);
    const metaPath = path.join(dir, `${item.slug}.json`);
    const hash = fingerprint(level, item);
    const meta = readMeta(metaPath);
    const forced = forceArg === 'all' || forceArg === item.slug;

    try {
      fs.mkdirSync(dir, { recursive: true });

      if (forced || meta.hash !== hash || !fs.existsSync(wavPath)) {
        const parts = [silence(EDGE_SILENCE_SECONDS, sampleRate)];
        for (let i = 0; i < item.script.length; i += 1) {
          const [code, text] = item.script[i];
          if (i > 0) parts.push(silence(TURN_SILENCE_SECONDS, sampleRate));
          parts.push(await synthesize({ text, voice: item.speakers[code].voice, level }));
        }
        parts.push(silence(EDGE_SILENCE_SECONDS, sampleRate));
        const pcm = Buffer.concat(parts);
        fs.writeFileSync(wavPath, wavFile(pcm, sampleRate));
        meta.hash = hash;
        meta.seconds = Math.round(pcm.length / 2 / sampleRate);
        meta.uploadedHash = null;
        fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
        generated += 1;
        console.log(`🎙️  ${publicId} üretildi (${meta.seconds} sn, ${item.script.length} parça)`);
      }

      if (noUpload) continue;
      if (meta.uploadedHash !== hash) {
        await uploadToCloudinary({ buffer: fs.readFileSync(wavPath), fileName: wavPath, publicId, resourceType: 'video' });
        meta.uploadedHash = hash;
        fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
        uploaded += 1;
        console.log(`☁️  ${publicId} yüklendi`);
      } else {
        upToDate += 1;
      }
    } catch (error) {
      failed.push(publicId);
      console.error(`❌ ${publicId}: ${error.message}`);
    }
  }

  console.log(`\nBitti: ${generated} üretildi, ${uploaded} yüklendi, ${upToDate} zaten güncel, ${failed.length} hata.`);
  process.exit(failed.length ? 1 : 0);
};

run().catch((error) => {
  console.error('❌ İşlem başarısız oldu:', error.message);
  process.exit(1);
});
