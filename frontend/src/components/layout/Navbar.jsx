import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Badge, Book, File, NotebookPen, Menu, X, Search, School } from 'lucide-react';
import { LEVELS, CATEGORIES } from '@/lib/constants';
import { useGetTopicsQuery } from '@/services/topicsApi';
import RoomsMenu from './RoomsMenu';
import AvatarMenu from './AvatarMenu';
import BrandMark from '@/components/BrandMark';

// Açılır menüdeki seviye rozetlerinin rengi (ana sayfa kartlarıyla aynı kategori renkleri).
const CATEGORY_COLORS = {
  grammar: '#1a8ec1',
  vocabulary: '#ff6699',
  reading: '#ed1c24',
  writing: '#a84d98',
};

// Her kategorinin kendi hazır Lucide ikonu var; içine seviye kodu yazılır.
// Grammar: dalgalı rozet, Vocabulary: kitap, Reading: sayfa, Writing: kalemli defter.
const CATEGORY_LEVEL_ICONS = {
  grammar: Badge,
  vocabulary: Book,
  reading: File,
  writing: NotebookPen,
};

// Kalemli defterde kalem sağ üstte; kod defterin alttaki boş kısmına kaydırılır.
const CODE_OFFSET = {
  writing: 'translate-x-[1px] translate-y-[7px]',
};

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

function CategoryMenu({ label, slug }) {
  const color = CATEGORY_COLORS[slug] ?? '#50af31';
  return (
    <div className="relative group">
      <button
        type="button"
        className="text-sm font-medium text-gray-300 hover:text-white transition-colors py-2"
      >
        {label}
      </button>

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
              {name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
  const showDropdown = searchOpen && debouncedSearch.length >= 2;

  const handleSelectResult = (topicId) => {
    setSearch('');
    setDebouncedSearch('');
    setSearchOpen(false);
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
      <div className="w-full px-4 sm:px-6 h-16 flex md:grid md:grid-cols-3 items-center justify-between gap-4 md:gap-6">
        <Link to="/" className="flex items-center gap-2 justify-self-start min-w-0">
          <BrandMark size={30} />
          <span className="text-lg font-bold text-white truncate">
            learnenglish
          </span>
        </Link>

        <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-8 justify-self-center">
          {CATEGORIES.map((category) => (
            <CategoryMenu key={category.slug} label={category.label} slug={category.slug} />
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-5 justify-self-end">
          <RoomsMenu />

          {/* Kapalıyken sadece büyüteç ikonu görünür; tıklanınca kutu sağdan sola yumuşakça genişler. */}
          <div className="relative hidden sm:flex items-center">
            <Search
              size={18}
              strokeWidth={2}
              className={`absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
                searchOpen ? 'text-gray-400' : 'text-gray-300'
              }`}
              aria-hidden="true"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => !search && setSearchOpen(false)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setSearch('');
                  setSearchOpen(false);
                  e.currentTarget.blur();
                }
                handleSearchKeyDown(e);
              }}
              aria-label="Search lessons"
              placeholder="Search lessons"
              className={`rounded-md border pl-9 pr-3 py-1.5 text-sm text-white transition-all duration-300 ease-out focus:outline-none ${
                searchOpen
                  ? 'w-64 bg-gray-800 border-gray-600 placeholder-gray-400'
                  : 'w-9 bg-transparent border-transparent placeholder-transparent cursor-pointer hover:bg-gray-800'
              }`}
            />

            {showDropdown && (
              <div
                onMouseDown={(e) => e.preventDefault()}
                className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl border border-emerald-100 shadow-lg py-2 z-50"
              >
                {searching && <p className="px-4 py-2.5 text-sm text-gray-400">Searching...</p>}

                {!searching && searchResults.length === 0 && (
                  <p className="px-4 py-2.5 text-sm text-gray-400">No lessons found for "{debouncedSearch}".</p>
                )}

                {!searching &&
                  searchResults.map((topic) => {
                    const categoryInfo = CATEGORIES.find((c) => c.slug === topic.category);
                    return (
                      <button
                        key={topic._id}
                        type="button"
                        onClick={() => handleSelectResult(topic._id)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-emerald-50 transition-colors"
                      >
                        <span className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-base shrink-0">
                          {categoryInfo?.icon}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-gray-800 truncate">{topic.title}</span>
                          <span className="block text-xs text-gray-400">
                            {topic.level} · {categoryInfo?.label ?? topic.category}
                          </span>
                        </span>
                      </button>
                    );
                  })}
              </div>
            )}
          </div>

          <AvatarMenu />

          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
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
                placeholder="Search lessons..."
                className="w-full rounded-md border border-gray-200 bg-gray-50 pl-9 pr-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-gray-400"
              />
              {debouncedSearch.length >= 2 && (
                <div className="mt-2 rounded-xl border border-emerald-100 bg-white py-1">
                  {searching && <p className="px-4 py-2.5 text-sm text-gray-400">Searching...</p>}
                  {!searching && searchResults.length === 0 && (
                    <p className="px-4 py-2.5 text-sm text-gray-400">
                      No lessons found for "{debouncedSearch}".
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
                            <span className="block text-sm font-medium text-gray-800 truncate">{topic.title}</span>
                            <span className="block text-xs text-gray-400">
                              {topic.level} · {categoryInfo?.label ?? topic.category}
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
                  <span className="truncate">{category.label}</span>
                </Link>
              ))}
            </nav>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Levels</p>
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

            <Link
              to="/classrooms"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 rounded-lg border border-emerald-200 px-4 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
              <School size={16} strokeWidth={1.75} aria-hidden="true" /> School Mode
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
