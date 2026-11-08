import { useState } from 'react';
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

export default function LoginPage() {
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
      navigate('/');
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

      <h1 className="text-3xl font-bold text-gray-900 text-center">Giriş Yap</h1>
      <p className="text-sm text-gray-500 mt-2 text-center">E-posta ve şifrenizi giriniz.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
            E-posta
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@eposta.com"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900"
          />
        </div>

        <PasswordField
          id="password"
          label="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Şifreniz"
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
            Beni hatırla
          </label>
          <Link
            to="/forgot-password"
            state={{ email }}
            className="text-emerald-600 hover:text-emerald-700 hover:underline font-medium"
          >
            Şifremi unuttum?
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
            Doğrulama kodunu gir
          </button>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold h-10 text-[15px] transition-colors"
        >
          {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
        </button>
      </form>

      <GoogleSignInButton />

      <p className="text-center text-sm text-gray-500 mt-6">
        Hesabın yok mu?{' '}
        <Link to="/register" className="text-emerald-600 hover:text-emerald-700 hover:underline font-semibold">
          Kayıt Ol
        </Link>
      </p>
    </AuthLayout>
  );
}
