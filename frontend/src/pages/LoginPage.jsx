import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthBrand from '@/components/auth/AuthBrand';
import PasswordField from '@/components/auth/PasswordField';
import { useLoginMutation } from '@/services/authApi';
import { setCredentials } from '@/app/authSlice';
import { getErrorMessage } from '@/lib/getErrorMessage';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await login({ email, password }).unwrap();
      dispatch(setCredentials(data.data));
      navigate('/');
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

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
            className="w-full rounded-lg border border-emerald-100 px-4 py-2.5 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
            <input type="checkbox" className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
            Beni hatırla
          </label>
          <span className="text-emerald-600 hover:text-emerald-700 cursor-pointer font-medium">
            Şifremi unuttum?
          </span>
        </div>

        {error && (
          <p className="text-sm text-rose-500 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 text-[15px] transition-colors"
        >
          {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Hesabın yok mu?{' '}
        <Link to="/register" className="text-emerald-600 hover:text-emerald-700 font-semibold">
          Kayıt Ol
        </Link>
      </p>
    </AuthLayout>
  );
}
