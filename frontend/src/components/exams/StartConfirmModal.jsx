import { useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';

// "Emin misin?" penceresi (seviye sınavları ve Level Test): ekranın ortasında, arka plan karartılır.
// Esc, dışarıya tıklama veya "Not yet" vazgeçer; açıkken arkadaki sayfa kaydırılmaz.
export default function StartConfirmModal({ questionCount, durationMinutes, testName, onConfirm, onCancel }) {
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
        className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-6 sm:p-8 text-center"
      >
        <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center">
          <Clock size={28} className="text-emerald-600" aria-hidden="true" />
        </div>
        <h2 id="start-confirm-title" className="text-xl font-bold text-gray-900">
          Are you ready to start?
        </h2>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          The {testName} has {questionCount} questions. Once you start, the {durationMinutes}-minute timer begins and
          can't be paused.
        </p>
        <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:flex-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold h-11 text-sm transition-colors"
          >
            Not yet
          </button>
          <button
            ref={startRef}
            type="button"
            onClick={onConfirm}
            className="w-full sm:flex-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-11 text-sm transition-colors"
          >
            Yes, start
          </button>
        </div>
      </div>
    </div>
  );
}
