import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  // Kullanıcı yazarken her tuşta istek atmamak için arama metnini kısa bir gecikmeyle uygular.
  useEffect(() => {
    const handle = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(handle);
  }, [search]);

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
    navigate(`/lesson/${topicId}`);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && searchResults.length > 0) {
      handleSelectResult(searchResults[0]._id);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-emerald-100">
      <div className="w-full px-6 h-16 grid grid-cols-3 items-center gap-6">
        <Link to="/" className="flex items-center gap-2 justify-self-start">
          <span className="text-2xl">🍃</span>
          <span className="text-lg font-bold text-gray-900">
            learn<span className="text-emerald-600">english</span>
          </span>
        </Link>

        <nav className="flex items-center justify-center gap-8 justify-self-center">
          {CATEGORIES.map((category) => (
            <CategoryMenu key={category.slug} label={category.label} slug={category.slug} icon={category.icon} />
          ))}
        </nav>

        <div className="flex items-center gap-5 justify-self-end">
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
        </div>
      </div>
    </header>
  );
}
