import { useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// "Emin misin?" penceresi (seviye sınavları ve Level Test): ekranın ortasında, arka plan karartılır.
// Esc, dışarıya tıklama veya "Not yet" vazgeçer; açıkken arkadaki sayfa kaydırılmaz.
export default function StartConfirmModal({ questionCount, durationMinutes, testName, onConfirm, onCancel }) {
  const { t } = useTranslation();
  const startRef = useRef(null);

  useEffect(() => {
    startRef.current?.focus();
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onCancel();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm px-4"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="start-confirm-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl"
      >
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 id="start-confirm-title" className="text-lg font-bold text-gray-900">
            {t('Are you ready to start?')}
          </h2>
          <p className="text-sm text-gray-500 first-letter:uppercase">{testName}</p>
        </div>

        {/* Başlamadan bilinmesi gerekenler, düzenli satırlar halinde. */}
        <dl className="divide-y divide-gray-100 px-6 text-sm">
          <div className="flex justify-between gap-4 py-2.5">
            <dt className="text-gray-500">{t('Questions')}</dt>
            <dd className="font-semibold text-gray-900 tabular-nums">{questionCount}</dd>
          </div>
          <div className="flex justify-between gap-4 py-2.5">
            <dt className="text-gray-500">{t('Time limit')}</dt>
            <dd className="font-semibold text-gray-900">{t('{{minutes}} minutes', { minutes: durationMinutes })}</dd>
          </div>
          <div className="flex justify-between gap-4 py-2.5">
            <dt className="text-gray-500">{t('Timer')}</dt>
            <dd className="text-right font-semibold text-gray-900">{t("Starts now, can't be paused")}</dd>
          </div>
          <div className="flex justify-between gap-4 py-2.5">
            <dt className="text-gray-500">{t('When time is up')}</dt>
            <dd className="text-right font-semibold text-gray-900">{t('Answers are submitted')}</dd>
          </div>
        </dl>

        <p className="mx-6 mt-2 flex items-start gap-2 rounded-lg bg-amber-50 px-3.5 py-2.5 text-sm text-amber-800">
          <Clock size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
          {t('Leaving or refreshing the page during the test will lose your answers.')}
        </p>

        <div className="mt-5 flex flex-col-reverse gap-3 border-t border-gray-100 px-6 py-4 sm:flex-row">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:flex-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold h-11 text-sm transition-colors"
          >
            {t('Not yet')}
          </button>
          <button
            ref={startRef}
            type="button"
            onClick={onConfirm}
            className="w-full sm:flex-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-11 text-sm transition-colors"
          >
            {t('Yes, start')}
          </button>
        </div>
      </div>
    </div>
  );
}

