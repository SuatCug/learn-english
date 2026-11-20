import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import usePageTitle from '@/hooks/usePageTitle';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthBrand from '@/components/auth/AuthBrand';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import PasswordField from '@/components/auth/PasswordField';
import VerifyCodeScreen from '@/components/auth/VerifyCodeScreen';
import { useRegisterMutation } from '@/services/authApi';
import { getErrorMessage } from '@/lib/getErrorMessage';
import { validateNewPassword, PASSWORD_MIN_LENGTH } from '@/lib/password';

export default function RegisterPage() {
  const { t } = useTranslation();
  usePageTitle(t('Sign up'));
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  // Kayıt başarılı olduğunda doğrulama kodu gönderilen adres; dolu ise form yerine kod giriş ekranı gösterilir.
  const [registeredEmail, setRegisteredEmail] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const passwordError = validateNewPassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    if (password !== confirmPassword) {
      setError(t("Passwords don't match."));
      return;
    }

    try {
      const data = await register({ name, email, password }).unwrap();
      setRegisteredEmail(data.data.email);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  if (registeredEmail) {
    return (
      <AuthLayout>
        <VerifyCodeScreen email={registeredEmail} onBack={() => navigate('/login')} />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthBrand />

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">{t('Sign up')}</h1>
      <p className="text-sm text-gray-500 mt-2 text-center">{t('Create a free account and start learning.')}</p>

      <form onSubmit={handleSubmit} className="mt-5 sm:mt-6 space-y-3 sm:space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
            {t('Full name')}
          </label>
          <input
            id="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('Your full name')}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 sm:py-2.5 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
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
            className="w-full rounded-lg border border-gray-300 px-4 py-2 sm:py-2.5 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900"
          />
        </div>

        <PasswordField
          id="password"
          label={t('Password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('At least {{min}} characters', { min: PASSWORD_MIN_LENGTH })}
          autoComplete="new-password"
        />

        <PasswordField
          id="confirmPassword"
          label={t('Confirm password')}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder={t('Enter your password again')}
          autoComplete="new-password"
        />

        {error && (
          <p className="text-sm text-rose-500 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold h-10 text-[15px] transition-colors"
        >
          {isLoading ? t('Signing up...') : t('Sign up')}
        </button>
      </form>

      <GoogleSignInButton label={t('Sign up with Google')} />

      <p className="text-center text-sm text-gray-500 mt-4 sm:mt-6">
        {t('Already have an account?')}{' '}
        <Link to="/login" className="text-emerald-600 hover:text-emerald-700 hover:underline font-semibold">
          {t('Log in')}
        </Link>
      </p>
    </AuthLayout>
  );
}
