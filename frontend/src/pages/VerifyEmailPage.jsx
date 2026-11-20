import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import usePageTitle from '@/hooks/usePageTitle';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthBrand from '@/components/auth/AuthBrand';
import { useVerifyEmailMutation } from '@/services/authApi';
import { setCredentials } from '@/app/authSlice';
import { getErrorMessage } from '@/lib/getErrorMessage';
import { takeReturnTo } from '@/lib/returnTo';

// Maildeki doğrulama linkinin açıldığı sayfa: token'ı backend'e gönderir, başarılıysa oturum açar.
export default function VerifyEmailPage() {
  const { t } = useTranslation();
  usePageTitle(t('Verify your email'));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [verifyEmail] = useVerifyEmailMutation();

  const [status, setStatus] = useState(token ? 'loading' : 'error');
  const [error, setError] = useState(token ? '' : t('The verification link is invalid.'));
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
        setTimeout(() => navigate(takeReturnTo(), { replace: true }), 1500);
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
        <p className="text-center text-gray-600 mt-6">{t('Verifying your email address...')}</p>
      )}

      {status === 'success' && (
        <>
          <h1 className="text-3xl font-bold text-gray-900 text-center">{t('Email verified')} 🎉</h1>
          <p className="text-sm text-gray-500 mt-2 text-center">{t('Redirecting you to the home page...')}</p>
        </>
      )}

      {status === 'error' && (
        <>
          <h1 className="text-3xl font-bold text-gray-900 text-center">{t('Verification failed')}</h1>
          <p className="text-sm text-rose-500 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2 mt-6">
            {error}
          </p>
          <p className="text-sm text-gray-500 mt-4 text-center">
            {t(
              'If you have already verified your account, you can log in. If the link has expired, you can request a new verification email from the login screen.'
            )}
          </p>
          <Link
            to="/login"
            className="block w-full text-center rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 text-[15px] mt-6 transition-colors"
          >
            {t('Log in')}
          </Link>
        </>
      )}
    </AuthLayout>
  );
}
