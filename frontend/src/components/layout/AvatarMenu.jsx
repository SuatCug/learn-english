import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/app/authSlice';

export default function AvatarMenu() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

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
        className="flex items-center gap-1 rounded-full hover:bg-gray-50 transition-colors p-1"
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
              Profilim
            </Link>

            {user?.isPremium && (
              <Link
                to="/classrooms"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Sınıflarım
              </Link>
            )}

            <div className="my-1 border-t border-gray-100" />

            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm font-medium text-rose-500 hover:bg-rose-50 transition-colors"
            >
              Log Out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
