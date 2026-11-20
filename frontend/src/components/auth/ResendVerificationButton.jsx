import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useResendVerificationMutation } from '@/services/authApi';
import { getErrorMessage } from '@/lib/getErrorMessage';

// Doğrulama mailinin tekrar gönderilmesini sağlar (Register sonrası ve doğrulanmamış Login'de kullanılır).
export default function ResendVerificationButton({ email }) {
  const { t } = useTranslation();
  const [resend, { isLoading }] = useResendVerificationMutation();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleClick = async () => {
    setMessage('');
    setError('');
    try {
      const data = await resend(email).unwrap();
      setMessage(data.message);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <div className="text-center">
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        className="text-sm text-gray-900 hover:underline font-semibold disabled:opacity-60"
      >
        {isLoading ? t('Sending...') : t('Resend verification email')}
      </button>
      {message && <p className="text-xs text-gray-500 mt-2">{message}</p>}
      {error && <p className="text-xs text-rose-500 mt-2">{error}</p>}
    </div>
  );
}
