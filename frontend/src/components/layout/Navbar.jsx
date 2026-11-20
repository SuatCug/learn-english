import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { localized } from '@/lib/localize';
import { Badge, Book, File, NotebookPen, Headphones, Menu, X, Search, School, Clipboard, Gauge, Mic, MessageCircle } from 'lucide-react';
import { LEVELS, CATEGORIES } from '@/lib/constants';
import { AI_SECTIONS, levelPath } from '@/lib/aiSections';
import { useGetTopicsQuery } from '@/services/topicsApi';
import AvatarMenu from './AvatarMenu';
import LanguageSwitcher from './LanguageSwitcher';
import { useSelector } from 'react-redux';
import { rememberReturnTo } from '@/lib/returnTo';
import BrandMark from '@/components/BrandMark';

// Açılır menüdeki seviye rozetlerinin rengi (ana sayfa kartlarıyla aynı kategori renkleri).
const CATEGORY_COLORS = {
  grammar: '#1a8ec1',
  vocabulary: '#ff6699',
  reading: '#ed1c24',
  writing: '#a84d98',
  listening: '#f7741d',
};

// Her kategorinin kendi hazır Lucide ikonu var; içine seviye kodu yazılır.
// Grammar: dalgalı rozet, Vocabulary: kitap, Reading: sayfa, Writing: kalemli defter, Listening: kulaklık.
const CATEGORY_LEVEL_ICONS = {
  grammar: Badge,
  vocabulary: Book,
  reading: File,
  writing: NotebookPen,
  listening: Headphones,
};

// Kalemli defterde kalem sağ üstte; kod defterin alttaki boş kısmına kaydırılır.
const CODE_OFFSET = {
  writing: 'translate-x-[1px] translate-y-[7px]',
  // Kulaklıkta boşluk, bandın altında iki kulaklık arasında.
  listening: 'translate-y-[4px]',
};

// Orta menü yazıları: normalde beyaza yakın, üzerine gelince ve açık sayfada tam beyaz.
const navItemClass = (active) =>
  `text-sm font-medium transition-colors py-2 ${active ? 'text-white' : 'text-gray-200 hover:text-white'}`;

function LevelBadge({ code, color, slug }) {
  const Icon = CATEGORY_LEVEL_ICONS[slug] ?? Badge;
  return (
    <span className="relative w-9 h-9 shrink-0 flex items-center justify-center" style={{ color }}>
      <Icon size={36} strokeWidth={1.1} className="absolute inset-0" aria-hidden="true" />
      <span className={`relative font-medium leading-none ${CODE_OFFSET[slug] ?? ''} ${code.length > 2 ? 'text-[8.5px]' : 'text-[10px]'}`}>
        {code}
      </span>
    </span>
  );
}

function CategoryMenu({ label, slug, active }) {
  const { t } = useTranslation();
  const color = CATEGORY_COLORS[slug] ?? '#50af31';
  return (
    <div className="relative group">
      {/* Tıklayınca kategorinin seviye sayfasına gider; üzerine gelince seviye menüsü açılır. */}
      <Link to={`/topics/${slug}`} className={navItemClass(active)}>
        {t(label)}
      </Link>

      <div className="absolute top-full left-0 pt-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-150">
        <div
          className="min-w-[230px] bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.18)] overflow-hidden"
          style={{ '--menu-color': color }}
        >
          {LEVELS.map(({ code, name }) => (
            <Link
              key={code}
              to={`/topics/${slug}/${code}`}
              className="flex items-center gap-2.5 px-4 py-2 whitespace-nowrap text-[15px] font-light text-gray-500 hover:bg-gray-100 hover:text-[var(--menu-color)] transition-colors"
            >
              <LevelBadge code={code} color={color} slug={slug} />
              {t(name)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// "Exams" açılır menüsü: seviye sınavlarına (A1–B2) bağlantılar.
function ExamsMenu({ active }) {
  const { t } = useTranslation();
  return (
    <div className="relative group">
      <Link
        to="/exams"
        className={`inline-flex items-center gap-1.5 ${navItemClass(active)}`}
      >
        {t('Exams')}
      </Link>

      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible transition-all duration-150">
        <div className="min-w-[240px] bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.18)] overflow-hidden">
          {LEVELS.map(({ code, name }) => (
            <Link
              key={code}
              to={`/exams/${code}`}
              className="flex items-center gap-2.5 px-4 py-2 whitespace-nowrap text-[15px] font-light text-gray-500 hover:bg-gray-100 hover:text-[#50af31] transition-colors"
            >
              {/* Diğer menülerle aynı tarz: sınav altlığı (clipboard) ikonu içinde seviye kodu, marka yeşili. */}
              <span className="relative w-9 h-9 shrink-0 flex items-center justify-center text-[#50af31]">
                <Clipboard size={36} strokeWidth={1.1} className="absolute inset-0" aria-hidden="true" />
                <span className="relative font-medium leading-none text-[10px] translate-y-[2px]">{code}</span>
              </span>
              {t('{{code}} Exam · {{name}}', { code, name: t(name) })}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// Lucide çizgi stilinde mikrofon; gövdesi seviye kodu (A1…) sığsın diye Lucide'ninkinden geniş.
function MicOutline({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="36"
      height="36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="6.5" y="1.5" width="11" height="14" rx="5.5" />
      <path d="M19.5 10.5v1a7.5 7.5 0 0 1-15 0v-1" />
      <line x1="12" y1="19" x2="12" y2="22.5" />
    </svg>
  );
}

// "AI Talk" (sesli) ve "AI Chat" (yazılı): tıklayınca A1–B2 kart sayfası açılır;
// üzerine gelince seviyeler listelenir, seviye seçilince o seviyenin konu kartları açılır.
function AiMenu({ section, active }) {
  const { t } = useTranslation();
  const isTalk = section.key === 'talk';
  return (
    <div className="relative group">
      <Link to={section.path} className={`whitespace-nowrap ${navItemClass(active)}`}>
        {t(section.label)}
      </Link>

      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible transition-all duration-150">
        <div
          className="min-w-[250px] bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.18)] overflow-hidden"
          style={{ '--menu-color': section.color }}
        >
          {LEVELS.map(({ code, name }) => (
            <Link
              key={code}
              to={levelPath(section.key, code)}
              className="flex items-center gap-2.5 px-4 py-2 whitespace-nowrap text-[15px] font-light text-gray-500 hover:bg-gray-100 hover:text-[var(--menu-color)] transition-colors"
            >
              {/* Diğer menülerle aynı tarz: ikonun içinde seviye kodu. Talking: mikrofon, Chatting: konuşma balonu. */}
              <span className="relative w-9 h-9 shrink-0 flex items-center justify-center" style={{ color: section.color }}>
                {isTalk ? (
                  <>
                    <MicOutline className="absolute inset-0" />
                    <span className="relative -translate-y-[5px] font-medium leading-none text-[8.5px]">{code}</span>
                  </>
                ) : (
                  <>
                    <MessageCircle size={36} strokeWidth={1.1} className="absolute inset-0" aria-hidden="true" />
                    <span className="relative font-medium leading-none text-[10px]">{code}</span>
                  </>
                )}
              </span>
              {isTalk
                ? t('{{code}} Speaking · {{name}}', { code, name: t(name) })
                : t('{{code}} Chat · {{name}}', { code, name: t(name) })}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const { t } = useTranslation();
  // Giriş yapmamış ziyaretçi: profil menüsü yerine dil seçici ve Giriş yap / Kayıt ol.
  const isGuest = !useSelector((state) => state.auth.token);
  const rememberHere = () => rememberReturnTo(location.pathname + location.search);
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Ders araması sadece mobil menüde (masaüstünde navbar'a sığmadığı için kaldırıldı).
  // Kullanıcı yazarken her tuşta istek atmamak için arama metnini kısa bir gecikmeyle uygular.
  useEffect(() => {
    const handle = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(handle);
  }, [search]);

  // Rota değişince mobil menüyü kapat.
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Mobil menü açıkken arkadaki sayfanın kaymasını engelle.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  const { data: searchData, isFetching: searching } = useGetTopicsQuery(
    { search: debouncedSearch },
    { skip: debouncedSearch.length < 2 }
  );
  const searchResults = (searchData?.data?.topics ?? []).slice(0, 8);

  const handleSelectResult = (topicId) => {
    setSearch('');
    setDebouncedSearch('');
    setMobileOpen(false);
    navigate(`/lesson/${topicId}`);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && searchResults.length > 0) {
      handleSelectResult(searchResults[0]._id);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800">
      <div className="w-full px-4 sm:px-6 h-16 flex items-center justify-between gap-4 lg:gap-6">
        <Link to="/" className="flex items-center gap-2 min-w-0 shrink-0">
          <BrandMark size={30} />
          <span className="text-lg font-bold text-white truncate md:hidden lg:inline">
            learnenglish
          </span>
        </Link>

        <nav className="hidden md:flex flex-1 min-w-0 items-center justify-center gap-2.5 lg:gap-5 xl:gap-8">
          {CATEGORIES.map((category) => (
            <CategoryMenu
              key={category.slug}
              label={category.label}
              slug={category.slug}
              active={location.pathname.startsWith(`/topics/${category.slug}`)}
            />
          ))}
          <AiMenu section={AI_SECTIONS.chat} active={location.pathname.startsWith(AI_SECTIONS.chat.path)} />
          <AiMenu section={AI_SECTIONS.talk} active={location.pathname.startsWith(AI_SECTIONS.talk.path)} />
          <ExamsMenu active={location.pathname.startsWith('/exams')} />
          <Link
            to="/placement-test"
            className={`inline-flex items-center gap-1.5 whitespace-nowrap ${navItemClass(location.pathname === '/placement-test')}`}
          >
            {t('Level Test')}
          </Link>
        </nav>

        <div className="flex items-center gap-3 sm:gap-4 xl:gap-5 shrink-0">
          <Link
            to="/school"
            title={t('School Mode')}
            className={`hidden sm:inline-flex items-center gap-2 rounded-md text-sm font-medium px-3 py-1.5 transition-colors ${
              location.pathname === '/school' ? 'bg-gray-800 text-white' : 'text-gray-200 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <School size={17} strokeWidth={1.75} aria-hidden="true" />
            <span className="md:hidden xl:inline">{t('School Mode')}</span>
          </Link>

          {isGuest ? (
            <div className="flex items-center gap-2">
              <LanguageSwitcher className="hidden md:block" />
              <Link
                to="/login"
                onClick={rememberHere}
                className="hidden sm:inline-flex rounded-md px-3 py-1.5 text-sm font-medium text-gray-200 hover:bg-gray-800 hover:text-white transition-colors"
              >
                {t('Log in')}
              </Link>
              <Link
                to="/register"
                onClick={rememberHere}
                className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
              >
                {t('Sign up')}
              </Link>
            </div>
          ) : (
            <AvatarMenu />
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? t('Close menu') : t('Open menu')}
            aria-expanded={mobileOpen}
            className="md:hidden -mr-1 p-2 text-gray-300 hover:text-white transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-800 bg-white shadow-sm">
          <div className="max-h-[calc(100vh-4rem)] overflow-y-auto px-4 py-4 space-y-5">
            <div className="relative">
              <Search
                size={16}
                strokeWidth={2}
                className="absolute left-3 top-[1.15rem] -translate-y-1/2 text-gray-400 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder={t('Search lessons...')}
                className="w-full rounded-md border border-gray-200 bg-gray-50 pl-9 pr-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-gray-400"
              />
              {debouncedSearch.length >= 2 && (
                <div className="mt-2 rounded-xl border border-emerald-100 bg-white py-1">
                  {searching && <p className="px-4 py-2.5 text-sm text-gray-400">{t('Searching...')}</p>}
                  {!searching && searchResults.length === 0 && (
                    <p className="px-4 py-2.5 text-sm text-gray-400">
                      {t('No lessons found for "{{query}}".', { query: debouncedSearch })}
                    </p>
                  )}
                  {!searching &&
                    searchResults.map((topic) => {
                      const categoryInfo = CATEGORIES.find((c) => c.slug === topic.category);
                      return (
                        <button
                          key={topic._id}
                          type="button"
                          onClick={() => handleSelectResult(topic._id)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-emerald-50 transition-colors"
                        >
                          <span className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-base shrink-0">
                            {categoryInfo?.icon}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-medium text-gray-800 truncate">{localized(topic)}</span>
                            <span className="block text-xs text-gray-400">
                              {topic.level} · {t(categoryInfo?.label ?? topic.category)}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                </div>
              )}
            </div>

            <nav className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  to={`/topics/${category.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-lg border border-emerald-100 px-3 py-2.5 text-sm font-semibold text-gray-800 hover:bg-emerald-50 transition-colors"
                >
                  <span className="text-base">{category.icon}</span>
                  <span className="truncate">{t(category.label)}</span>
                </Link>
              ))}
            </nav>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">{t('Levels')}</p>
              <div className="flex flex-wrap gap-2">
                {LEVELS.map((level) => (
                  <Link
                    key={level.code}
                    to={`/levels/${level.code}`}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-full border border-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-50 transition-colors"
                  >
                    {level.code}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">{t('Exams')}</p>
              <div className="flex flex-wrap gap-2">
                {LEVELS.map((level) => (
                  <Link
                    key={level.code}
                    to={`/exams/${level.code}`}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-full border border-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-50 transition-colors"
                  >
                    {t('{{code}} Exam', { code: level.code })}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/placement-test"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 rounded-lg border border-emerald-200 px-4 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
              <Gauge size={16} strokeWidth={1.75} aria-hidden="true" /> {t('Level Test')}
            </Link>

            <div className="grid grid-cols-2 gap-2">
              <Link
                to={AI_SECTIONS.chat.path}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-lg border border-indigo-200 px-4 py-2.5 text-sm font-medium text-indigo-700 hover:bg-indigo-50 transition-colors"
              >
                <MessageCircle size={16} strokeWidth={1.75} aria-hidden="true" /> {t(AI_SECTIONS.chat.label)}
              </Link>
              <Link
                to={AI_SECTIONS.talk.path}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-lg border border-teal-200 px-4 py-2.5 text-sm font-medium text-teal-700 hover:bg-teal-50 transition-colors"
              >
                <Mic size={16} strokeWidth={1.75} aria-hidden="true" /> {t(AI_SECTIONS.talk.label)}
              </Link>
            </div>

            <Link
              to="/school"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 rounded-lg border border-emerald-200 px-4 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
              <School size={16} strokeWidth={1.75} aria-hidden="true" /> {t('School Mode')}
            </Link>

            {isGuest && (
              <div className="space-y-3 border-t border-gray-100 pt-4">
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={rememberHere}
                    className="rounded-lg border border-gray-300 px-4 py-2.5 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    {t('Log in')}
                  </Link>
                  <Link
                    to="/register"
                    onClick={rememberHere}
                    className="rounded-lg bg-emerald-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-emerald-700"
                  >
                    {t('Sign up')}
                  </Link>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">{t('Language')}</span>
                  <LanguageSwitcher dark={false} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
