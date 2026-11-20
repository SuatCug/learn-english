import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Exams sayfasında bir seviye kartına basınca açılan sınav özeti: bölümler, soru sayıları, süre, geçme notu,
// kurallar ve "Start exam". Başlatınca sınav doğrudan açılır (ayrıca bir giriş sayfası yok).
// Esc, dışarıya tıklama veya "Not now" kapatır; açıkken arkadaki sayfa kaydırılmaz.
export default function ExamOverviewModal({ exam, levelName, previousResult, onStart, onClose }) {
  const { t } = useTranslation();
  const startRef = useRef(null);

  useEffect(() => {
    startRef.current?.focus();
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-900/60 px-4 py-6" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="exam-overview-title"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-full w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-5 py-3 sm:px-6">
          <div>
            <h2 id="exam-overview-title" className="text-lg font-bold text-gray-900">
              {t('{{level}} Level Exam', { level: exam.level })}
            </h2>
            <p className="text-sm text-gray-500">{levelName}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('Close')}
            className="-mr-2 rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tek bakışta sığsın diye iki sütun: solda bölümler, sağda süre/geçme notu ve kısa kurallar.
            Çok küçük ekranlarda (yedek olarak) içerik kendi içinde kayar. */}
        <div className="grid gap-x-8 gap-y-4 overflow-y-auto px-5 py-4 sm:grid-cols-2 sm:px-6">
          <table className="w-full self-start text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-500">
                <th className="pb-1.5 font-semibold">{t('Part')}</th>
                <th className="pb-1.5 text-right font-semibold">{t('Questions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {exam.sections.map((section, i) => (
                <tr key={section.key}>
                  <td className="py-1.5 text-gray-800">
                    {i + 1}. {t(section.label)}
                  </td>
                  <td className="py-1.5 text-right tabular-nums text-gray-800">{section.questions}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-gray-200 font-semibold text-gray-900">
                <td className="pt-1.5">{t('Total')}</td>
                <td className="pt-1.5 text-right tabular-nums">{exam.maxScore}</td>
              </tr>
            </tfoot>
          </table>

          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-gray-50 px-3 py-2">
                <p className="text-xs text-gray-500">{t('Time')}</p>
                <p className="font-semibold text-gray-900">{t('{{minutes}} min', { minutes: exam.durationMinutes })}</p>
              </div>
              <div className="rounded-lg bg-gray-50 px-3 py-2">
                <p className="text-xs text-gray-500">{t('Pass mark')}</p>
                <p className="font-semibold text-gray-900">{exam.passPercent}%</p>
              </div>
            </div>

            <ul className="list-disc space-y-1 pl-4 text-gray-600 marker:text-gray-400">
              <li>{t("The timer can't be paused.")}</li>
              <li>{t('Use headphones for Listening.')}</li>
              <li>{t('You can go back to any part.')}</li>
              <li>{t('No penalty for guessing.')}</li>
            </ul>

            {previousResult && (
              <p className="rounded-lg bg-amber-50 px-3 py-2 text-amber-800">
                {t('Last score: {{percent}}% ({{score}}/{{max}})', {
                  percent: previousResult.percent,
                  score: previousResult.score,
                  max: previousResult.maxScore,
                })}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3 border-t border-gray-100 px-5 py-3 sm:justify-end sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 sm:flex-none"
          >
            {t('Not now')}
          </button>
          <button
            ref={startRef}
            type="button"
            onClick={onStart}
            className="flex-1 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 sm:flex-none"
          >
            {previousResult ? t('Retake exam') : t('Start exam')}
          </button>
        </div>
      </div>
    </div>
  );
}
