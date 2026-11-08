import { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthBrand from '@/components/auth/AuthBrand';
import CodeInput, { CODE_LENGTH, emptyCode } from '@/components/auth/CodeInput';
import PasswordField from '@/components/auth/PasswordField';
import { useForgotPasswordMutation, useVerifyResetCodeMutation, useResetPasswordMutation } from '@/services/authApi';
import { setCredentials } from '@/app/authSlice';
import { getErrorMessage } from '@/lib/getErrorMessage';
import { validateNewPassword, PASSWORD_MIN_LENGTH } from '@/lib/password';

const PRIMARY_BUTTON =
  'w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold h-10 text-[15px] transition-colors';

function ErrorBox({ children }) {
  if (!children) return null;
  return <p className="text-sm text-rose-500 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">{children}</p>;
}

function BackToLogin() {
  return (
    <p className="text-center text-sm text-gray-500 mt-6">
      <Link to="/login" className="text-emerald-600 hover:text-emerald-700 hover:underline font-semibold">
        Giriş ekranına dön
      </Link>
    </p>
  );
}

// Şifremi unuttum: 1) e-posta → 2) mailde gelen 6 haneli kod → 3) yeni şifre.
// Kod doğrulanınca backend kısa ömürlü bir sıfırlama izni (resetToken) verir; yeni şifre onunla kaydedilir
// ve kullanıcı oturum açmış olarak ana sayfaya yönlendirilir.
export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [step, setStep] = useState('email'); // email | code | password
  const [email, setEmail] = useState(location.state?.email ?? '');
  const [digits, setDigits] = useState(emptyCode);
  const [resetToken, setResetToken] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const codeInputs = useRef([]);

  const [forgotPassword, { isLoading: sending }] = useForgotPasswordMutation();
  const [verifyResetCode, { isLoading: verifying }] = useVerifyResetCodeMutation();
  const [resetPassword, { isLoading: saving }] = useResetPasswordMutation();

  const sendCode = async () => {
    setError('');
    setInfo('');
    try {
      const data = await forgotPassword(email).unwrap();
      setInfo(data.message);
      setDigits(emptyCode());
      setStep('code');
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    sendCode();
  };

  const submitCode = async (code) => {
    setError('');
    try {
      const data = await verifyResetCode({ email, code }).unwrap();
      setResetToken(data.data.resetToken);
      setInfo('');
      setStep('password');
    } catch (err) {
      setError(getErrorMessage(err));
      setDigits(emptyCode());
      codeInputs.current[0]?.focus();
    }
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    const code = digits.join('');
    if (code.length !== CODE_LENGTH) {
      setError('Lütfen 6 haneli kodun tamamını gir.');
      return;
    }
    submitCode(code);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const passwordError = validateNewPassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    if (password !== passwordConfirm) {
      setError('Şifreler eşleşmiyor.');
      return;
    }
    try {
      const data = await resetPassword({ email, resetToken, password }).unwrap();
      dispatch(setCredentials(data.data));
      navigate('/', { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
      // İzin süresi dolduysa baştan başlatılır.
      if (err?.data?.code === 'RESET_EXPIRED') {
        setResetToken('');
        setStep('email');
      }
    }
  };

  return (
    <AuthLayout>
      <AuthBrand />

      {step === 'email' && (
        <>
          <h1 className="text-3xl font-bold text-gray-900 text-center">Şifremi unuttum</h1>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Hesabının e-posta adresini gir, sana 6 haneli bir sıfırlama kodu gönderelim.
          </p>

          <form onSubmit={handleEmailSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                E-posta
              </label>
              <input
                id="email"
                type="email"
                required
                autoFocus
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@eposta.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900"
              />
            </div>

            <ErrorBox>{error}</ErrorBox>

            <button type="submit" disabled={sending} className={PRIMARY_BUTTON}>
              {sending ? 'Gönderiliyor...' : 'Kod gönder'}
            </button>
          </form>

          <BackToLogin />
        </>
      )}

      {step === 'code' && (
        <>
          <h1 className="text-3xl font-bold text-gray-900 text-center">Kodu gir</h1>
          <p className="text-sm text-gray-500 mt-3 text-center">
            <span className="font-semibold text-gray-700">{email}</span> adresi kayıtlıysa 6 haneli bir sıfırlama
            kodu gönderdik. Gelen kutunda göremezsen spam klasörüne de bak.
          </p>

          <form onSubmit={handleCodeSubmit} className="mt-6">
            <CodeInput
              digits={digits}
              onChange={setDigits}
              onComplete={submitCode}
              disabled={verifying}
              inputsRef={codeInputs}
            />

            <div className="mt-4">
              <ErrorBox>{error}</ErrorBox>
            </div>

            <button type="submit" disabled={verifying} className={`mt-6 ${PRIMARY_BUTTON}`}>
              {verifying ? 'Kontrol ediliyor...' : 'Devam et'}
            </button>
          </form>

          <p className="text-xs text-gray-400 mt-3 text-center">Kod 15 dakika geçerlidir.</p>

          <div className="mt-5 text-center space-y-2">
            <button
              type="button"
              onClick={sendCode}
              disabled={sending}
              className="text-sm text-gray-900 hover:underline font-semibold disabled:opacity-60"
            >
              {sending ? 'Gönderiliyor...' : 'Kodu tekrar gönder'}
            </button>
            {info && <p className="text-xs text-gray-500">{info}</p>}
            <div>
              <button
                type="button"
                onClick={() => {
                  setError('');
                  setInfo('');
                  setStep('email');
                }}
                className="text-sm text-gray-500 hover:text-gray-700 hover:underline"
              >
                E-posta adresini değiştir
              </button>
            </div>
          </div>

          <BackToLogin />
        </>
      )}

      {step === 'password' && (
        <>
          <h1 className="text-3xl font-bold text-gray-900 text-center">Yeni şifre belirle</h1>
          <p className="text-sm text-gray-500 mt-2 text-center">
            <span className="font-semibold text-gray-700">{email}</span> hesabı için yeni şifreni gir.
          </p>

          <form onSubmit={handlePasswordSubmit} className="mt-6 space-y-4">
            <PasswordField
              id="new-password"
              label="Yeni şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={`En az ${PASSWORD_MIN_LENGTH} karakter`}
              autoComplete="new-password"
            />
            <PasswordField
              id="new-password-confirm"
              label="Yeni şifre (tekrar)"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="Yeni şifreni tekrar gir"
              autoComplete="new-password"
            />

            <ErrorBox>{error}</ErrorBox>

            <button type="submit" disabled={saving} className={PRIMARY_BUTTON}>
              {saving ? 'Kaydediliyor...' : 'Şifreyi değiştir'}
            </button>
          </form>

          <p className="text-xs text-gray-400 mt-3 text-center">
            Şifreni değiştirdikten sonra otomatik olarak giriş yapılır.
          </p>
        </>
      )}
    </AuthLayout>
  );
}
