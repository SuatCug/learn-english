// Kitapların önünde, işaretli maddeleri olan bir sınav altlığı (clipboard) çizimi.
// Sınavlar sayfasında ve sınav giriş ekranında kullanılır.
export default function ExamIllustration({ className = '' }) {
  const rows = [0, 1, 2, 3, 4];
  return (
    <svg viewBox="0 0 360 300" className={className} aria-hidden="true">
      <path
        fill="#e7f5e1"
        d="M58 160C38 82 132 22 214 36c92 16 140 92 116 170-22 74-150 92-218 58-38-19-46-62-54-104Z"
      />
      <g transform="rotate(-8 120 225)">
        <rect x="56" y="196" width="128" height="36" rx="6" fill="#3f8f2b" />
        <rect x="64" y="203" width="112" height="10" rx="2" fill="#fff" opacity="0.92" />
        <rect x="64" y="170" width="112" height="30" rx="6" fill="#5cb247" />
        <rect x="72" y="176" width="96" height="8" rx="2" fill="#fff" opacity="0.92" />
      </g>
      <g transform="rotate(9 285 228)">
        <rect x="228" y="206" width="112" height="32" rx="6" fill="#4ea33a" />
        <rect x="236" y="212" width="96" height="9" rx="2" fill="#fff" opacity="0.92" />
      </g>
      <g transform="rotate(7 205 150)">
        <rect x="128" y="44" width="154" height="206" rx="14" fill="#2f6b3d" />
        <rect x="140" y="62" width="130" height="176" rx="7" fill="#fff" />
        <rect x="174" y="30" width="62" height="26" rx="9" fill="#3d8a4f" />
        <circle cx="205" cy="38" r="5" fill="#fff" />
        {rows.map((i) => {
          const y = 92 + i * 30;
          const done = i < 3;
          return (
            <g key={i}>
              <circle cx="163" cy={y} r="10" fill={done ? '#43982a' : '#d1d5db'} />
              {done && (
                <path
                  d={`M158 ${y} l4 4 l7 -8`}
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
              <rect x="181" y={y - 7} width="72" height="5" rx="2.5" fill="#cfd4da" />
              <rect x="181" y={y + 2} width="50" height="5" rx="2.5" fill="#e5e7eb" />
            </g>
          );
        })}
      </g>
      <g stroke="#43982a" strokeWidth="6" strokeLinecap="round">
        <path d="M100 74 84 60" />
        <path d="M118 54l-2-22" />
        <path d="M88 96l-20-4" />
      </g>
    </svg>
  );
}
