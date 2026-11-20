import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import usePageTitle from '@/hooks/usePageTitle';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthBrand from '@/components/auth/AuthBrand';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import PasswordField from '@/components/auth/PasswordField';
import VerifyCodeScreen from '@/components/auth/VerifyCodeScreen';
import { useLoginMutation } from '@/services/authApi';
import { setCredentials } from '@/app/authSlice';
import { getErrorMessage } from '@/lib/getErrorMessage';
import { takeReturnTo } from '@/lib/returnTo';

export default function LoginPage() {
  const { t } = useTranslation();
  usePageTitle(t('Log in'));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  // Doğrulanmamış hesapla giriş denendiğinde kod ekranına geçiş butonu gösterilir.
  const [unverifiedEmail, setUnverifiedEmail] = useState(null);
  const [showCodeScreen, setShowCodeScreen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setUnverifiedEmail(null);
    try {
      const data = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...data.data, remember }));
      navigate(takeReturnTo(), { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
      if (err?.data?.code === 'EMAIL_NOT_VERIFIED') setUnverifiedEmail(email);
    }
  };

  if (showCodeScreen && unverifiedEmail) {
    return (
      <AuthLayout>
        <VerifyCodeScreen email={unverifiedEmail} onBack={() => setShowCodeScreen(false)} />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthBrand />

      <h1 className="text-3xl font-bold text-gray-900 text-center">{t('Log in')}</h1>
      <p className="text-sm text-gray-500 mt-2 text-center">{t('Enter your email and password.')}</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
            {t('Email')}
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('name@example.com')}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900"
          />
        </div>

        <PasswordField
          id="password"
          label={t('Password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('Your password')}
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="rounded border-gray-300 accent-gray-900 focus:ring-gray-900"
            />
            {t('Remember me')}
          </label>
          <Link
            to="/forgot-password"
            state={{ email }}
            className="text-emerald-600 hover:text-emerald-700 hover:underline font-medium"
          >
            {t('Forgot your password?')}
          </Link>
        </div>

        {error && (
          <p className="text-sm text-rose-500 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">{error}</p>
        )}

        {unverifiedEmail && (
          <button
            type="button"
            onClick={() => setShowCodeScreen(true)}
            className="w-full rounded-lg border border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-semibold h-10 text-[15px] transition-colors"
          >
            {t('Enter verification code')}
          </button>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold h-10 text-[15px] transition-colors"
        >
          {isLoading ? t('Logging in...') : t('Log in')}
        </button>
      </form>

      <GoogleSignInButton />

      <p className="text-center text-sm text-gray-500 mt-6">
        {t("Don't have an account?")}{' '}
        <Link to="/register" className="text-emerald-600 hover:text-emerald-700 hover:underline font-semibold">
          {t('Sign up')}
        </Link>
      </p>
    </AuthLayout>
  );
}
