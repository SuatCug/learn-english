import { useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthBrand from '@/components/auth/AuthBrand';
import CodeInput, { CODE_LENGTH, emptyCode } from '@/components/auth/CodeInput';
import ResendVerificationButton from '@/components/auth/ResendVerificationButton';
import { useVerifyEmailCodeMutation } from '@/services/authApi';
import { setCredentials } from '@/app/authSlice';
import { getErrorMessage } from '@/lib/getErrorMessage';
import { takeReturnTo } from '@/lib/returnTo';

// Kayıt sonrası (ve doğrulanmamış hesapla girişte) gösterilen ekran: mailde gelen 6 haneli kod girilir.
// Kod doğruysa backend oturum token'ı döner; kullanıcı direkt giriş yapmış olarak ana sayfaya gider.
export default function VerifyCodeScreen({ email, onBack }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [verifyCode, { isLoading }] = useVerifyEmailCodeMutation();

  const [digits, setDigits] = useState(emptyCode);
  const [error, setError] = useState('');
  const inputs = useRef([]);

  const submit = async (code) => {
    setError('');
    try {
      const data = await verifyCode({ email, code }).unwrap();
      dispatch(setCredentials(data.data));
      navigate(takeReturnTo(), { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
      setDigits(emptyCode());
      inputs.current[0]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = digits.join('');
    if (code.length !== CODE_LENGTH) {
      setError(t('Please enter the full 6-digit code.'));
      return;
    }
    submit(code);
  };

  return (
    <>
      <AuthBrand />

      <h1 className="text-3xl font-bold text-gray-900 text-center">{t('Verify your email')}</h1>
      <p className="text-sm text-gray-500 mt-3 text-center">
        <Trans
          i18nKey="We sent a 6-digit verification code to <b>{{email}}</b>. Enter it below. If you can't find it in your inbox, check your spam folder."
          values={{ email }}
          components={{ b: <span className="font-semibold text-gray-700" /> }}
        />
      </p>

      <form onSubmit={handleSubmit} className="mt-6">
        <CodeInput digits={digits} onChange={setDigits} onComplete={submit} disabled={isLoading} inputsRef={inputs} />

        {error && (
          <p className="mt-4 text-sm text-rose-500 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold h-10 text-[15px] transition-colors"
        >
          {isLoading ? t('Verifying...') : t('Verify')}
        </button>
      </form>

      <p className="text-xs text-gray-400 mt-3 text-center">{t('The code is valid for {{minutes}} minutes.', { minutes: 30 })}</p>

      <div className="mt-5">
        <ResendVerificationButton email={email} />
      </div>

      {onBack && (
        <p className="text-center text-sm text-gray-500 mt-6">
          <button
            type="button"
            onClick={onBack}
            className="text-emerald-600 hover:text-emerald-700 hover:underline font-semibold"
          >
            {t('Back to login')}
          </button>
        </p>
      )}
    </>
  );
}
