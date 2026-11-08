import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthBrand from '@/components/auth/AuthBrand';
import CodeInput, { CODE_LENGTH, emptyCode } from '@/components/auth/CodeInput';
import ResendVerificationButton from '@/components/auth/ResendVerificationButton';
import { useVerifyEmailCodeMutation } from '@/services/authApi';
import { setCredentials } from '@/app/authSlice';
import { getErrorMessage } from '@/lib/getErrorMessage';

// Kayıt sonrası (ve doğrulanmamış hesapla girişte) gösterilen ekran: mailde gelen 6 haneli kod girilir.
// Kod doğruysa backend oturum token'ı döner; kullanıcı direkt giriş yapmış olarak ana sayfaya gider.
export default function VerifyCodeScreen({ email, onBack }) {
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
      navigate('/', { replace: true });
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
      setError('Lütfen 6 haneli kodun tamamını gir.');
      return;
    }
    submit(code);
  };

  return (
    <>
      <AuthBrand />

      <h1 className="text-3xl font-bold text-gray-900 text-center">E-postanı doğrula</h1>
      <p className="text-sm text-gray-500 mt-3 text-center">
        <span className="font-semibold text-gray-700">{email}</span> adresine 6 haneli bir doğrulama kodu
        gönderdik. Kodu aşağıya gir. Gelen kutunda göremezsen spam klasörüne de bak.
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
          {isLoading ? 'Doğrulanıyor...' : 'Doğrula'}
        </button>
      </form>

      <p className="text-xs text-gray-400 mt-3 text-center">Kod 30 dakika geçerlidir.</p>

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
            Giriş ekranına dön
          </button>
        </p>
      )}
    </>
  );
}
