// Sohbet ekranının solundaki çizim: altta öğrenci, üstte AI robotu, aralarında seviyeye uygun konuşma balonları.
// Talk'ta öğrencinin yanında ses dalgaları, Chat'te elinde telefon var. Renkler bölüm rengini izler.

const PALETTES = {
  talk: { main: '#0d9488', dark: '#115e59', light: '#ccfbf1', mid: '#99f6e4', accent: '#5eead4' },
  chat: { main: '#4f46e5', dark: '#3730a3', light: '#e0e7ff', mid: '#c7d2fe', accent: '#a5b4fc' },
};

// Robotun sorusu ve öğrencinin cevabı — seviyeye göre zorlaşır.
const DIALOGUES = {
  A1: ['Hi! How are you?', "I'm fine, thank you!"],
  A2: ['What did you do last weekend?', 'I visited my family.'],
  B1: ["What's your favourite film?", 'I really enjoyed Inception!'],
  B2: ['Should cities ban cars?', 'It depends on public transport.'],
};

const SKIN = '#f4c7a1';
const HAIR = '#3f2a1d';
const INK = '#1f2937';


export default function AiIllustration({ section = 'chat', level = 'A1', className = '' }) {
  const c = PALETTES[section] ?? PALETTES.chat;
  const [aiLine, userLine] = DIALOGUES[level] ?? DIALOGUES.A1;
  const isTalk = section === 'talk';

  return (
    <svg
      viewBox="0 0 400 600"
      preserveAspectRatio="xMidYMax meet"
      className={className}
      style={{ overflow: 'visible' }}
      role="img"
      aria-label={isTalk ? 'A student talking with an AI robot' : 'A student chatting with an AI robot on the phone'}
    >
      {/* Arka plan lekeleri (viewBox dışına taşar, panel kenarlarını doldurur) */}
      <circle cx="340" cy="110" r="130" fill={c.mid} opacity="0.55" />
      <circle cx="40" cy="560" r="120" fill={c.mid} opacity="0.45" />
      <circle cx="70" cy="170" r="10" fill={c.accent} />
      <circle cx="355" cy="330" r="7" fill={c.accent} />
      <circle cx="30" cy="390" r="5" fill={c.main} opacity="0.5" />
      <path d="M 330 450 l 6 14 l 14 6 l -14 6 l -6 14 l -6 -14 l -14 -6 l 14 -6 z" fill={c.accent} />

      {/* AI robotu */}
      <g transform="translate(275 95)">
        <line x1="0" y1="-38" x2="0" y2="-18" stroke={c.dark} strokeWidth="4" strokeLinecap="round" />
        <circle cx="0" cy="-44" r="8" fill={c.main} />
        <rect x="-68" y="10" width="14" height="30" rx="7" fill={c.dark} />
        <rect x="54" y="10" width="14" height="30" rx="7" fill={c.dark} />
        <rect x="-56" y="-20" width="112" height="92" rx="30" fill="#fff" stroke={c.dark} strokeWidth="4" />
        <rect x="-40" y="-4" width="80" height="58" rx="18" fill={c.dark} />
        <circle cx="-15" cy="18" r="7" fill={c.accent} />
        <circle cx="15" cy="18" r="7" fill={c.accent} />
        <path d="M -13 34 Q 0 45 13 34" stroke={c.accent} strokeWidth="4" fill="none" strokeLinecap="round" />
        <rect x="-38" y="78" width="76" height="46" rx="18" fill={c.main} />
        <circle cx="0" cy="101" r="8" fill={c.accent} />
      </g>

      {/* Robotun balonu */}
      <g>
        <path d="M 262 236 L 276 216 L 282 240 Z" fill="#fff" />
        <rect x="30" y="234" width="290" height="60" rx="22" fill="#fff" />
        <text x="52" y="270" fontSize="16" fontWeight="600" fill={INK} fontFamily="inherit">
          {aiLine}
        </text>
      </g>

      {/* Öğrencinin balonu */}
      <g>
        <rect x="80" y="318" width="290" height="60" rx="22" fill={c.main} />
        <path d="M 112 376 L 102 402 L 138 376 Z" fill={c.main} />
        <text x="102" y="354" fontSize="16" fontWeight="600" fill="#fff" fontFamily="inherit">
          {userLine}
        </text>
      </g>

      {/* Öğrenci */}
      <g transform="translate(118 492)">
        <path d="M -82 112 Q -80 22 0 22 Q 80 22 82 112 Z" fill={c.dark} />
        <path d="M -18 22 L 0 46 L 18 22 Z" fill="#fff" opacity="0.9" />
        <rect x="-12" y="-6" width="24" height="30" rx="8" fill={SKIN} />
        <circle cx="0" cy="-42" r="42" fill={SKIN} />
        <path
          d="M -44 -44 Q -46 -98 4 -92 Q 50 -88 44 -40 Q 32 -66 2 -64 Q -26 -64 -44 -44 Z"
          fill={HAIR}
        />
        <circle cx="-15" cy="-40" r="4.5" fill={INK} />
        <circle cx="15" cy="-40" r="4.5" fill={INK} />
        <circle cx="-25" cy="-27" r="6" fill="#f59e9e" opacity="0.55" />
        <circle cx="25" cy="-27" r="6" fill="#f59e9e" opacity="0.55" />
        {isTalk ? (
          <>
            <ellipse cx="0" cy="-20" rx="9" ry="7" fill="#9f3a3a" />
            <path d="M 56 -52 Q 68 -36 56 -20" stroke={c.main} strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M 72 -64 Q 90 -36 72 -8" stroke={c.main} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.7" />
            <path d="M 88 -76 Q 112 -36 88 4" stroke={c.main} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.4" />
          </>
        ) : (
          <>
            <path d="M -12 -22 Q 0 -12 12 -22" stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <rect x="-26" y="40" width="52" height="76" rx="10" fill={INK} />
            <rect x="-20" y="48" width="40" height="58" rx="5" fill="#fff" />
            <rect x="-15" y="55" width="22" height="8" rx="4" fill={c.mid} />
            <rect x="-6" y="68" width="22" height="8" rx="4" fill={c.main} />
            <rect x="-15" y="81" width="16" height="8" rx="4" fill={c.mid} />
            <circle cx="-30" cy="96" r="12" fill={SKIN} />
            <circle cx="30" cy="96" r="12" fill={SKIN} />
          </>
        )}
      </g>
    </svg>
  );
}
