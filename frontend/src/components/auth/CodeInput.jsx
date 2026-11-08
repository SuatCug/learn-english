import { useRef } from 'react';

export const CODE_LENGTH = 6;
export const emptyCode = () => Array(CODE_LENGTH).fill('');

// Mailde gelen 6 haneli kod için kutucuklar (e-posta doğrulama ve şifre sıfırlama ekranlarında ortak).
// Yazılan/yapıştırılan rakamlar kutulara dağıtılır; 6 hane dolunca onComplete(kod) çağrılır.
// digits / onChange dışarıdan kontrol edilir; inputsRef verilirse ilk kutuya odaklanmak için kullanılabilir.
export default function CodeInput({ digits, onChange, onComplete, disabled = false, inputsRef }) {
  const localRef = useRef([]);
  const inputs = inputsRef ?? localRef;

  const fill = (index, text) => {
    const chars = text.replace(/\D/g, '').slice(0, CODE_LENGTH - index).split('');
    const next = [...digits];
    if (chars.length === 0) {
      // Mobil klavyede silme bazen keydown yerine boş onChange olarak gelir.
      next[index] = '';
      onChange(next);
      return;
    }
    chars.forEach((c, i) => {
      next[index + i] = c;
    });
    onChange(next);
    const focusAt = Math.min(index + chars.length, CODE_LENGTH - 1);
    inputs.current[focusAt]?.focus();
    if (next.every((d) => d !== '') && !disabled) onComplete?.(next.join(''));
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
      onChange(next);
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < CODE_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  return (
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
          maxLength={CODE_LENGTH}
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
  );
}
