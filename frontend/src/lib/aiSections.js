import { tk } from '@/i18n';
// AI bölümleri: "AI Talk" (sesli konuşma) ve "AI Chat" (yazılı sohbet).
export const AI_SECTIONS = {
  talk: {
    key: 'talk',
    path: '/ai-talk',
    label: tk('Talking'),
    banner: 'Talking · Speaking Practice',
    bannerClass: 'bg-teal-600',
    color: '#0d9488',
    lightColor: '#ccfbf1', // sohbet ekranı sol panel (çizim) arka planı
    modes: ['talk'],
  },
  chat: {
    key: 'chat',
    path: '/ai-chat',
    label: tk('Chatting'),
    banner: 'Chatting · Chat Practice',
    bannerClass: 'bg-indigo-600',
    color: '#4f46e5',
    lightColor: '#e0e7ff',
    modes: ['chat'],
  },
};

export const sectionOfMode = (mode) => (mode === 'talk' ? 'talk' : 'chat');

// Konu kartı kapakları: assets/ai-topics/<SEVİYE>-<slug>.png (1200×630, Talking ve Chatting ortak).
const topicImages = import.meta.glob('@/assets/ai-topics/*.png', { eager: true, import: 'default' });
export const aiTopicImage = (level, slug) =>
  Object.entries(topicImages).find(([path]) => path.endsWith(`/${level}-${slug}.png`))?.[1];

// Seviye seçilince gidilecek sayfa: o seviyenin konu kartları (/ai-talk/level/A1, /ai-chat/level/A1).
export const levelPath = (sectionKey, level) => `${AI_SECTIONS[sectionKey].path}/level/${level}`;
export const conversationPath = (conversation) =>
  `${AI_SECTIONS[sectionOfMode(conversation.mode)].path}/${conversation._id}`;

const TIP_LINE = /^\s*(💡\s*)?tip:/i;
// Akış sırasında henüz tamamlanmamış son satır "Tip:" satırına dönüşebilir mi? (ör. "T", "Ti", "💡 Tip")
const MAYBE_TIP_START = /^\s*(💡\s*)?(t|ti|tip)?\s*$/i;

// Akışlı okuma için: gelen cevap metninden (text) `from` konumundan sonra tamamlanmış cümleleri döndürür.
// "Tip:" satırı ve sonrası okunmaz. final=true ise (cevap bitti) kalan her şey döner.
// Dönüş: { chunk: okunacak metin ('' olabilir), next: bir sonraki çağrıda kullanılacak konum }.
export function takeSpeakableSentences(text, from, final) {
  const lines = text.split('\n');
  const kept = [];
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const isOpenLine = !final && i === lines.length - 1;
    if (TIP_LINE.test(line)) break;
    if (isOpenLine && line.trim() && MAYBE_TIP_START.test(line)) break;
    kept.push(line);
  }
  const speakable = kept.join('\n');
  if (from >= speakable.length) return { chunk: '', next: from };
  const rest = speakable.slice(from);

  if (final) return { chunk: rest.trim(), next: speakable.length };

  // Sadece arkasından boşluk gelen cümle sonları kesin sayılır (yazılmakta olan "3.5" gibi durumlar beklenir).
  const ends = [...rest.matchAll(/[.!?]+["')\]]?(?=\s)/g)];
  if (!ends.length) return { chunk: '', next: from };
  const last = ends[ends.length - 1];
  const cut = last.index + last[0].length;
  return { chunk: rest.slice(0, cut).trim(), next: from + cut };
}

// Sesli moddaki AI cevabını ikiye ayırır: sesli okunacak kısım ve ekranda gösterilen "Tip:" düzeltmesi.
export function splitTip(content = '') {
  const lines = content.split('\n');
  const tipIndex = lines.findIndex((line) => /^\s*(💡\s*)?tip:/i.test(line));
  if (tipIndex === -1) return { spoken: content.trim(), tip: '' };
  return {
    spoken: lines.slice(0, tipIndex).join('\n').trim(),
    tip: lines
      .slice(tipIndex)
      .join('\n')
      .replace(/^\s*(💡\s*)?tip:\s*/i, '')
      .trim(),
  };
}
