// Dil seçicideki küçük bayraklar. Emoji bayraklar (🇹🇷 🇬🇧) Windows'ta harf olarak göründüğü için SVG kullanılır.
// code: 'tr' → Türkiye, 'en' → Birleşik Krallık.
export default function FlagIcon({ code, className = '' }) {
  const box = `inline-block h-3.5 w-5 shrink-0 overflow-hidden rounded-[2px] ring-1 ring-black/10 ${className}`;

  if (code === 'tr') {
    return (
      <svg viewBox="0 0 30 20" className={box} aria-hidden="true">
        <rect width="30" height="20" fill="#E30A17" />
        {/* Resmi oranlar (1200×800 standart çizimin 30×20'ye ölçeklenmiş hali). */}
        <circle cx="10.625" cy="10" r="5" fill="#fff" />
        <circle cx="11.875" cy="10" r="4" fill="#E30A17" />
        <polygon fill="#fff" points="14.583,10 19.106,11.469 16.311,7.622 16.311,12.378 19.106,8.531" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 60 30" className={box} aria-hidden="true">
      <clipPath id="flag-uk-clip">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#flag-uk-clip)" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}
