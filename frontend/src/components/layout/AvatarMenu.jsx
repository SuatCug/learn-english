import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Languages, ChevronDown, Check } from 'lucide-react';
import { logout } from '@/app/authSlice';
import { LANGUAGES, changeLanguage } from '@/i18n';
import FlagIcon from './FlagIcon';

export default function AvatarMenu() {
  const { t, i18n } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const currentLang = LANGUAGES.find((l) => l.code === i18n.language);

  const initial = user?.name?.trim()?.charAt(0)?.toUpperCase() || '?';

  const handleLogout = () => {
    setMenuOpen(false);
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setMenuOpen((o) => !o)}
        className="flex items-center gap-1 rounded-full hover:bg-gray-800 transition-colors p-1"
      >
        <span className="w-8 h-8 rounded-full bg-emerald-500 text-white text-sm font-semibold flex items-center justify-center">
          {initial}
        </span>
        <span className={`text-gray-400 text-xs transition-transform ${menuOpen ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {menuOpen && (
        <>
          <div className="fixed inset-0 z-[55]" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-[56] w-60 rounded-xl border border-gray-100 bg-white shadow-lg py-2">
            <div className="px-4 py-2">
              <p className="text-sm font-semibold text-gray-800 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>

            <div className="my-1 border-t border-gray-100" />

            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {t('My profile')}
            </Link>

            {user?.isPremium && (
              <Link
                to="/school"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {t('My classes')}
              </Link>
            )}

            {/* Dil seçimi: tıklayınca seçenekler açılır (navbar'da yer kaplamasın diye burada). */}
            <button
              type="button"
              onClick={() => setLangOpen((o) => !o)}
              aria-expanded={langOpen}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Languages size={16} className="text-gray-400" aria-hidden="true" />
              <span className="flex-1 text-left">{t('Language')}</span>
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
                <FlagIcon code={currentLang?.code} />
                {currentLang?.name}
              </span>
              <ChevronDown
                size={14}
                className={`text-gray-400 transition-transform ${langOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>
            {langOpen && (
              <div className="pb-1">
                {LANGUAGES.map((lang) => {
                  const active = i18n.language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        changeLanguage(lang.code);
                        setLangOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 pl-10 pr-4 py-1.5 text-sm transition-colors hover:bg-gray-50 ${
                        active ? 'font-semibold text-emerald-700' : 'text-gray-600'
                      }`}
                    >
                      <FlagIcon code={lang.code} />
                      <span className="flex-1 text-left">{lang.name}</span>
                      {active && <Check size={15} aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="my-1 border-t border-gray-100" />

            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm font-medium text-rose-500 hover:bg-rose-50 transition-colors"
            >
              {t('Log out')}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
