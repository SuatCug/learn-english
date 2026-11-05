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
  if (window.google?.accounts?.id) return Promise.resolve();
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

// Google'ın resmi "Google ile giriş yap" butonu.
// Kullanıcı Google hesabını seçince Google bir ID token (credential) verir; bu token backend'e
// (POST /auth/google) gönderilir, backend doğrulayıp kendi oturum token'ımızı döner.
// VITE_GOOGLE_CLIENT_ID tanımlı değilse buton hiç gösterilmez.
export default function GoogleSignInButton({ text = 'signin_with' }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [googleLogin, { isLoading }] = useGoogleLoginMutation();
  const containerRef = useRef(null);
  const [error, setError] = useState('');

  // Callback Google tarafından tutulduğu için en güncel fonksiyona ref üzerinden ulaşılır.
  const handleCredentialRef = useRef(null);
  useEffect(() => {
    handleCredentialRef.current = async ({ credential }) => {
      setError('');
      try {
        const data = await googleLogin({ credential }).unwrap();
        dispatch(setCredentials(data.data));
        navigate('/', { replace: true });
      } catch (err) {
        setError(getErrorMessage(err));
      }
    };
  });

  useEffect(() => {
    if (!CLIENT_ID) return;
    let cancelled = false;

    loadGoogleScript()
      .then(() => {
        if (cancelled || !containerRef.current) return;
        window.google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: (response) => handleCredentialRef.current(response),
          ux_mode: 'popup',
        });
        // Google butonu en fazla 400px genişliğinde olabilir; formun genişliğine uydurulur.
        const width = Math.min(400, containerRef.current.offsetWidth || 400);
        window.google.accounts.id.renderButton(containerRef.current, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          shape: 'rectangular',
          text,
          locale: 'tr',
          logo_alignment: 'center',
          width,
        });
      })
      .catch(() => {
        if (!cancelled) setError('Google ile giriş şu anda kullanılamıyor.');
      });

    return () => {
      cancelled = true;
    };
  }, [text]);

  if (!CLIENT_ID) {
    if (import.meta.env.DEV) console.warn('VITE_GOOGLE_CLIENT_ID tanımlı değil; Google ile giriş butonu gizlendi.');
    return null;
  }

  return (
    <div>
      <div className="flex items-center gap-3 my-5">
        <span className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-400 uppercase tracking-wide">veya</span>
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      <div className={`flex justify-center min-h-[44px] ${isLoading ? 'opacity-60 pointer-events-none' : ''}`}>
        <div ref={containerRef} className="w-full flex justify-center" />
      </div>

      {error && (
        <p className="mt-3 text-sm text-rose-500 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">{error}</p>
      )}
    </div>
  );
}
