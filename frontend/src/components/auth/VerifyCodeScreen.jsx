import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthBrand from '@/components/auth/AuthBrand';
import ResendVerificationButton from '@/components/auth/ResendVerificationButton';
import { useVerifyEmailCodeMutation } from '@/services/authApi';
import { setCredentials } from '@/app/authSlice';
import { getErrorMessage } from '@/lib/getErrorMessage';

const LENGTH = 6;

// Kayıt sonrası (ve doğrulanmamış hesapla girişte) gösterilen ekran: mailde gelen 6 haneli kod girilir.
// Kod doğruysa backend oturum token'ı döner; kullanıcı direkt giriş yapmış olarak ana sayfaya gider.
export default function VerifyCodeScreen({ email, onBack }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [verifyCode, { isLoading }] = useVerifyEmailCodeMutation();

  const [digits, setDigits] = useState(Array(LENGTH).fill(''));
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
      setDigits(Array(LENGTH).fill(''));
      inputs.current[0]?.focus();
    }
  };

  // Yazılan/yapıştırılan rakamları index'ten itibaren kutulara dağıtır; 6 hane dolunca otomatik gönderir.
  const fill = (index, text) => {
    const chars = text.replace(/\D/g, '').slice(0, LENGTH - index).split('');
    const next = [...digits];
    if (chars.length === 0) {
      // Mobil klavyede silme bazen keydown yerine boş onChange olarak gelir.
      next[index] = '';
      setDigits(next);
      return;
    }
    chars.forEach((c, i) => {
      next[index + i] = c;
    });
    setDigits(next);
    const focusAt = Math.min(index + chars.length, LENGTH - 1);
    inputs.current[focusAt]?.focus();
    if (next.every((d) => d !== '') && !isLoading) submit(next.join(''));
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const next = [...digits];
      if (next[index]) {
        next[index] = '';
      } else if (index > 0) {
        next[index - 1] = '';
        inputs.current[index - 1]?.focus();
      }
      setDigits(next);
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = digits.join('');
    if (code.length !== LENGTH) {
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
        <div className="flex justify-center gap-2 sm:gap-3">
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              autoComplete={i === 0 ? 'one-time-code' : 'off'}
              autoFocus={i === 0}
              maxLength={LENGTH}
              value={digit}
              aria-label={`Kodun ${i + 1}. hanesi`}
              onChange={(e) => {
                // Dolu kutuya yazılınca eski rakamı at, sadece yeni yazılanı al.
                const value = e.target.value;
                fill(i, digit && value.length === 2 && value.startsWith(digit) ? value.slice(1) : value);
              }}
              onPaste={(e) => {
                e.preventDefault();
                fill(i, e.clipboardData.getData('text'));
              }}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onFocus={(e) => e.target.select()}
              className="w-11 h-13 sm:w-12 sm:h-14 rounded-lg border border-gray-300 text-center text-2xl font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900"
            />
          ))}
        </div>

        {error && (
          <p className="mt-4 text-sm text-rose-500 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 text-[15px] transition-colors"
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
