import { useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import usePageTitle from '@/hooks/usePageTitle';
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
import { takeReturnTo } from '@/lib/returnTo';

const PRIMARY_BUTTON =
  'w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold h-10 text-[15px] transition-colors';

function ErrorBox({ children }) {
  if (!children) return null;
  return <p className="text-sm text-rose-500 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">{children}</p>;
}

function BackToLogin() {
  const { t } = useTranslation();
  return (
    <p className="text-center text-sm text-gray-500 mt-6">
      <Link to="/login" className="text-emerald-600 hover:text-emerald-700 hover:underline font-semibold">
        {t('Back to login')}
      </Link>
    </p>
  );
}

// Şifremi unuttum: 1) e-posta → 2) mailde gelen 6 haneli kod → 3) yeni şifre.
// Kod doğrulanınca backend kısa ömürlü bir sıfırlama izni (resetToken) verir; yeni şifre onunla kaydedilir
// ve kullanıcı oturum açmış olarak ana sayfaya yönlendirilir.
export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  usePageTitle(t('Forgot your password?'));
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
      setError(t('Please enter the full 6-digit code.'));
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
      setError(t("Passwords don't match."));
      return;
    }
    try {
      const data = await resetPassword({ email, resetToken, password }).unwrap();
      dispatch(setCredentials(data.data));
      navigate(takeReturnTo(), { replace: true });
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
          <h1 className="text-3xl font-bold text-gray-900 text-center">{t('Forgot your password?')}</h1>
          <p className="text-sm text-gray-500 mt-2 text-center">
            {t("Enter your account's email address and we'll send you a 6-digit reset code.")}
          </p>

          <form onSubmit={handleEmailSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                {t('Email')}
              </label>
              <input
                id="email"
                type="email"
                required
                autoFocus
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('name@example.com')}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900"
              />
            </div>

            <ErrorBox>{error}</ErrorBox>

            <button type="submit" disabled={sending} className={PRIMARY_BUTTON}>
              {sending ? t('Sending...') : t('Send code')}
            </button>
          </form>

          <BackToLogin />
        </>
      )}

      {step === 'code' && (
        <>
          <h1 className="text-3xl font-bold text-gray-900 text-center">{t('Enter the code')}</h1>
          <p className="text-sm text-gray-500 mt-3 text-center">
            <Trans
              i18nKey="If <b>{{email}}</b> is registered, we sent a 6-digit reset code. If you can't find it in your inbox, check your spam folder."
              values={{ email }}
              components={{ b: <span className="font-semibold text-gray-700" /> }}
            />
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
              {verifying ? t('Checking...') : t('Continue')}
            </button>
          </form>

          <p className="text-xs text-gray-400 mt-3 text-center">{t('The code is valid for {{minutes}} minutes.', { minutes: 15 })}</p>

          <div className="mt-5 text-center space-y-2">
            <button
              type="button"
              onClick={sendCode}
              disabled={sending}
              className="text-sm text-gray-900 hover:underline font-semibold disabled:opacity-60"
            >
              {sending ? t('Sending...') : t('Resend code')}
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
                {t('Change email address')}
              </button>
            </div>
          </div>

          <BackToLogin />
        </>
      )}

      {step === 'password' && (
        <>
          <h1 className="text-3xl font-bold text-gray-900 text-center">{t('Set a new password')}</h1>
          <p className="text-sm text-gray-500 mt-2 text-center">
            <Trans
              i18nKey="Enter a new password for <b>{{email}}</b>."
              values={{ email }}
              components={{ b: <span className="font-semibold text-gray-700" /> }}
            />
          </p>

          <form onSubmit={handlePasswordSubmit} className="mt-6 space-y-4">
            <PasswordField
              id="new-password"
              label={t('New password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('At least {{min}} characters', { min: PASSWORD_MIN_LENGTH })}
              autoComplete="new-password"
            />
            <PasswordField
              id="new-password-confirm"
              label={t('Confirm new password')}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder={t('Enter your new password again')}
              autoComplete="new-password"
            />

            <ErrorBox>{error}</ErrorBox>

            <button type="submit" disabled={saving} className={PRIMARY_BUTTON}>
              {saving ? t('Saving...') : t('Change password')}
            </button>
          </form>

          <p className="text-xs text-gray-400 mt-3 text-center">
            {t("You'll be logged in automatically after changing your password.")}
          </p>
        </>
      )}
    </AuthLayout>
  );
}
