import { useState } from 'react';
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
      setError('Şifreler birbiriyle uyuşmuyor.');
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

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">Kayıt Ol</h1>
      <p className="text-sm text-gray-500 mt-2 text-center">Ücretsiz hesap oluşturarak öğrenmeye başla.</p>

      <form onSubmit={handleSubmit} className="mt-5 sm:mt-6 space-y-3 sm:space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
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
            className="w-full rounded-lg border border-gray-300 px-4 py-2 sm:py-2.5 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
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
            className="w-full rounded-lg border border-gray-300 px-4 py-2 sm:py-2.5 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900"
          />
        </div>

        <PasswordField
          id="password"
          label="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={`En az ${PASSWORD_MIN_LENGTH} karakter`}
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
          className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold h-10 text-[15px] transition-colors"
        >
          {isLoading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
        </button>
      </form>

      <GoogleSignInButton label="Google ile kayıt ol" />

      <p className="text-center text-sm text-gray-500 mt-4 sm:mt-6">
        Zaten hesabın var mı?{' '}
        <Link to="/login" className="text-emerald-600 hover:text-emerald-700 hover:underline font-semibold">
          Giriş Yap
        </Link>
      </p>
    </AuthLayout>
  );
}
