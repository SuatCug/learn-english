// AI bölümleri: "AI Talk" (sesli konuşma) ve "AI Chat" (yazılı sohbet).
export const AI_SECTIONS = {
  talk: {
    key: 'talk',
    path: '/ai-talk',
    label: 'Talking',
    banner: 'Talking · Speaking Practice',
    bannerClass: 'bg-teal-600',
    color: '#0d9488',
    lightColor: '#ccfbf1', // sohbet ekranı sol panel (çizim) arka planı
    modes: ['talk'],
  },
  chat: {
    key: 'chat',
    path: '/ai-chat',
    label: 'Chatting',
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
