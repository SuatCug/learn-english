import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGoogleLoginMutation } from '@/services/authApi';
import { setCredentials } from '@/app/authSlice';
import { getErrorMessage } from '@/lib/getErrorMessage';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const SCRIPT_SRC = 'https://accounts.google.com/gsi/client';

// Google Identity Services script'ini sayfaya bir kez ekler; tekrar çağrılınca aynı Promise döner.
let scriptPromise;
function loadGoogleScript() {
  if (window.google?.accounts?.oauth2) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = () => {
        scriptPromise = undefined;
        reject(new Error('Google script yüklenemedi'));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

// Google'ın resmi çok renkli "G" logosu (marka yönergelerine uygun, değiştirilmeden).
function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

// "Google ile devam et": diğer form butonlarıyla aynı formatta kendi butonumuz.
// Tıklanınca Google'ın hesap seçme popup'ı açılır; Google bir access token verir, backend
// (POST /auth/google) bu token'ın bizim uygulamamıza ait olduğunu doğrulayıp oturum token'ımızı döner.
// VITE_GOOGLE_CLIENT_ID tanımlı değilse buton hiç gösterilmez.
export default function GoogleSignInButton({ label = 'Google ile devam et' }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [googleLogin, { isLoading }] = useGoogleLoginMutation();
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const tokenClientRef = useRef(null);

  // Callback Google tarafından tutulduğu için en güncel fonksiyona ref üzerinden ulaşılır.
  const handleTokenRef = useRef(null);
  useEffect(() => {
    handleTokenRef.current = async (response) => {
      if (response.error || !response.access_token) {
        // Kullanıcı popup'ı kapattıysa hata göstermeye gerek yok.
        if (response.error && response.error !== 'popup_closed') {
          setError('Google ile giriş yapılamadı. Lütfen tekrar dene.');
        }
        return;
      }
      setError('');
      try {
        const data = await googleLogin({ accessToken: response.access_token }).unwrap();
        dispatch(setCredentials(data.data));
        navigate('/', { replace: true });
      } catch (err) {
        setError(getErrorMessage(err));
      }
    };
  });

  useEffect(() => {
    if (!CLIENT_ID) return undefined;
    let cancelled = false;

    loadGoogleScript()
      .then(() => {
        if (cancelled) return;
        tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: 'openid email profile',
          callback: (response) => handleTokenRef.current(response),
          error_callback: (err) => handleTokenRef.current({ error: err?.type || 'unknown' }),
        });
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) setError('Google ile giriş şu anda kullanılamıyor.');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!CLIENT_ID) {
    if (import.meta.env.DEV) console.warn('VITE_GOOGLE_CLIENT_ID tanımlı değil; Google ile giriş butonu gizlendi.');
    return null;
  }

  return (
    <div>
      <div className="flex items-center gap-3 my-4 sm:my-5">
        <span className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-400 uppercase tracking-wide">veya</span>
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      <button
        type="button"
        onClick={() => {
          setError('');
          tokenClientRef.current?.requestAccessToken({ prompt: 'select_account' });
        }}
        disabled={!ready || isLoading}
        className="w-full flex items-center justify-center gap-2.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed text-gray-800 font-semibold h-10 text-[15px] transition-colors"
      >
        <GoogleLogo />
        {isLoading ? 'Giriş yapılıyor...' : label}
      </button>

      {error && (
        <p className="mt-3 text-sm text-rose-500 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">{error}</p>
      )}
    </div>
  );
}
