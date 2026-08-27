import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { LEVELS, CATEGORIES } from '@/lib/constants';
import { useGetTopicsQuery } from '@/services/topicsApi';
import RoomsMenu from './RoomsMenu';
import AvatarMenu from './AvatarMenu';

function CategoryMenu({ label, slug, icon }) {
  return (
    <div className="relative group">
      <button
        type="button"
        className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors py-2"
      >
        {label}
      </button>

      <div className="absolute top-full left-0 pt-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-150">
        <div className="min-w-[260px] bg-white rounded-xl border border-emerald-100 shadow-lg py-2">
          {LEVELS.map(({ code, name }) => (
            <Link
              key={code}
              to={`/topics/${slug}/${code}`}
              className="flex items-center gap-3 px-4 py-2.5 whitespace-nowrap hover:bg-emerald-50 transition-colors"
            >
              <span className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-base shrink-0">
                {icon}
              </span>
              <span className="flex items-baseline gap-1.5">
                <span className="text-sm font-semibold text-gray-800">{code}</span>
                <span className="text-sm text-gray-500">{name}</span>
              </span>
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
    <header className="sticky top-0 z-50 bg-white border-b border-emerald-100">
      <div className="w-full px-4 sm:px-6 h-16 flex md:grid md:grid-cols-3 items-center justify-between gap-4 md:gap-6">
        <Link to="/" className="flex items-center gap-2 justify-self-start min-w-0">
          <span className="text-2xl shrink-0">🍃</span>
          <span className="text-lg font-bold text-gray-900 truncate">
            learn<span className="text-emerald-600">english</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-8 justify-self-center">
          {CATEGORIES.map((category) => (
            <CategoryMenu key={category.slug} label={category.label} slug={category.slug} icon={category.icon} />
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-5 justify-self-end">
          <RoomsMenu />

          <div className="relative hidden sm:block">
            <span className="absolute inset-y-0 left-0 w-8 flex items-center justify-center text-gray-400 text-sm pointer-events-none">
              🔍
            </span>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => !search && setSearchOpen(false)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search..."
              className={`rounded-full border border-gray-200 bg-transparent pl-8 pr-3 py-1.5 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                searchOpen ? 'w-64' : 'w-8 cursor-pointer placeholder-transparent'
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
            className="md:hidden -mr-1 p-2 text-gray-700 hover:text-emerald-600 transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-emerald-100 bg-white shadow-sm">
          <div className="max-h-[calc(100vh-4rem)] overflow-y-auto px-4 py-4 space-y-5">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 w-9 flex items-center justify-center text-gray-400 text-sm pointer-events-none">
                🔍
              </span>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search lessons..."
                className="w-full rounded-full border border-gray-200 bg-transparent pl-9 pr-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
              <span aria-hidden="true">🏫</span> School Mode
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
