import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Check } from 'lucide-react';
import { LANGUAGES, changeLanguage } from '@/i18n';
import FlagIcon from './FlagIcon';

// Açılır dil seçici: kapalıyken seçili dilin bayrağı ve kodu (EN ▾), tıklayınca bayraklı seçenekler.
// Seçim tarayıcıda saklanır (i18n/index.js; varsayılan İngilizce). Misafir navbar'ı, mobil menü ve giriş/kayıt
// sayfalarında kullanılır; girişli kullanıcılarda dil profil menüsündedir (AvatarMenu).
// dark: koyu navbar için; değilse açık zemin. align: menünün hangi kenara hizalanacağı.
export default function LanguageSwitcher({ dark = true, align = 'right', className = '' }) {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const current = LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];

  // Dışarı tıklayınca veya Esc ile kapanır.
  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${t('Language')}: ${current.name}`}
        className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-semibold transition-colors ${
          dark ? 'text-gray-200 hover:bg-gray-800 hover:text-white' : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <FlagIcon code={current.code} />
        {current.label}
        <ChevronDown size={13} className={`transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t('Language')}
          className={`absolute top-full mt-1.5 z-[60] w-40 rounded-lg border border-gray-100 bg-white py-1 shadow-lg ${
            align === 'left' ? 'left-0' : 'right-0'
          }`}
        >
          {LANGUAGES.map((lang) => {
            const active = lang.code === current.code;
            return (
              <li key={lang.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-gray-50 ${
                    active ? 'font-semibold text-emerald-700' : 'text-gray-700'
                  }`}
                >
                  <FlagIcon code={lang.code} />
                  <span className="flex-1 text-left">{lang.name}</span>
                  {active && <Check size={15} aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
