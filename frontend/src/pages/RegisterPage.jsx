import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthBrand from '@/components/auth/AuthBrand';
import PasswordField from '@/components/auth/PasswordField';
import { useRegisterMutation } from '@/services/authApi';
import { setCredentials } from '@/app/authSlice';
import { getErrorMessage } from '@/lib/getErrorMessage';

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Şifreler birbiriyle uyuşmuyor.');
      return;
    }

    try {
      const data = await register({ name, email, password }).unwrap();
      dispatch(setCredentials(data.data));
      navigate('/');
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <AuthLayout>
      <AuthBrand />

      <h1 className="text-3xl font-bold text-gray-900 text-center">Kayıt Ol</h1>
      <p className="text-sm text-gray-500 mt-2 text-center">Ücretsiz hesap oluşturarak öğrenmeye başla.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
            Ad Soyad
          </label>
          <input
            id="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Adın Soyadın"
            className="w-full rounded-lg border border-emerald-100 px-4 py-2.5 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

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
          placeholder="En az 6 karakter"
          autoComplete="new-password"
        />

        <PasswordField
          id="confirmPassword"
          label="Şifre (Tekrar)"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Şifreni tekrar gir"
          autoComplete="new-password"
        />

        {error && (
          <p className="text-sm text-rose-500 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 text-[15px] transition-colors"
        >
          {isLoading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Zaten hesabın var mı?{' '}
        <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-semibold">
          Giriş Yap
        </Link>
      </p>
    </AuthLayout>
  );
}
