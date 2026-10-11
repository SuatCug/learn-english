import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthBrand from '@/components/auth/AuthBrand';
import { useVerifyEmailMutation } from '@/services/authApi';
import { setCredentials } from '@/app/authSlice';
import { getErrorMessage } from '@/lib/getErrorMessage';

// Maildeki doğrulama linkinin açıldığı sayfa: token'ı backend'e gönderir, başarılıysa oturum açar.
export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [verifyEmail] = useVerifyEmailMutation();

  const [status, setStatus] = useState(token ? 'loading' : 'error');
  const [error, setError] = useState(token ? '' : 'Doğrulama linki geçersiz.');
  // Token tek kullanımlık; StrictMode'daki çift effect çalışmasında ikinci istek hata vermesin diye.
  const requested = useRef(false);

  useEffect(() => {
    if (!token || requested.current) return;
    requested.current = true;

    verifyEmail(token)
      .unwrap()
      .then((data) => {
        dispatch(setCredentials(data.data));
        setStatus('success');
        setTimeout(() => navigate('/', { replace: true }), 1500);
      })
      .catch((err) => {
        setError(getErrorMessage(err));
        setStatus('error');
      });
  }, [token, verifyEmail, dispatch, navigate]);

  return (
    <AuthLayout>
      <AuthBrand />

      {status === 'loading' && (
        <p className="text-center text-gray-600 mt-6">E-posta adresin doğrulanıyor...</p>
      )}

      {status === 'success' && (
        <>
          <h1 className="text-3xl font-bold text-gray-900 text-center">E-posta doğrulandı 🎉</h1>
          <p className="text-sm text-gray-500 mt-2 text-center">Ana sayfaya yönlendiriliyorsun...</p>
        </>
      )}

      {status === 'error' && (
        <>
          <h1 className="text-3xl font-bold text-gray-900 text-center">Doğrulama başarısız</h1>
          <p className="text-sm text-rose-500 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2 mt-6">
            {error}
          </p>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Hesabını zaten doğruladıysan giriş yapabilirsin. Linkin süresi dolduysa giriş ekranından yeni bir
            doğrulama e-postası isteyebilirsin.
          </p>
          <Link
            to="/login"
            className="block w-full text-center rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 text-[15px] mt-6 transition-colors"
          >
            Giriş Yap
          </Link>
        </>
      )}
    </AuthLayout>
  );
}
