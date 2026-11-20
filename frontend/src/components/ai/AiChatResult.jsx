import NewBadges from '@/components/NewBadges';
import { Loader2, Trophy, XCircle, CheckCircle2, Star, BookOpen, Rocket, RotateCcw, LayoutGrid } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { tk } from '@/i18n';

// Puana göre renk ve kısa yorum.
function scoreStyle(score) {
  if (score >= 8) return { color: '#16a34a', label: tk('Excellent!') };
  if (score >= 6) return { color: '#2563eb', label: tk('Good job!') };
  if (score >= 4) return { color: '#d97706', label: tk('Not bad!') };
  return { color: '#dc2626', label: tk('Keep practising!') };
}

function Section({ icon: Icon, title, children }) {
  return (
    <section className="space-y-2">
      <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-500">
        <Icon size={16} aria-hidden="true" /> {title}
      </h3>
      {children}
    </section>
  );
}

// Konulu sohbet bitince mesajların altında gösterilen sonuç kartı:
// puan, özet, hatalar (yanlış → doğru + açıklama), güçlü yanlar, faydalı ifadeler, sonraki adım.
export default function AiChatResult({ result, newBadges, userTurns, loading, error, onRetry, onRestart, restarting, topicsPath, onTopics }) {
  const { t } = useTranslation();
  if (loading || (!result && !error)) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
        <Loader2 size={28} className="mx-auto animate-spin" style={{ color: 'var(--section-color)' }} aria-hidden="true" />
        <p className="mt-3 font-semibold text-gray-900">{t('Conversation finished! Preparing your results...')}</p>
        <p className="mt-1 text-sm text-gray-500">{t('We are checking your messages. This may take a few seconds.')}</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="rounded-2xl border border-red-100 bg-white p-6 text-center shadow-sm">
        <p className="text-sm text-red-600">{error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white hover:brightness-95"
          style={{ backgroundColor: 'var(--section-color)' }}
        >
          <RotateCcw size={16} aria-hidden="true" /> {t('Try again')}
        </button>
      </div>
    );
  }

  const { color, label } = scoreStyle(result.score);
  const mistakes = result.mistakes ?? [];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* Puan */}
      <div className="flex items-center gap-5 border-b border-gray-100 px-6 py-5">
        <div
          className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-full border-4"
          style={{ borderColor: color, color }}
        >
          <span className="text-2xl font-extrabold leading-none tabular-nums">{result.score}</span>
          <span className="text-xs font-semibold">/ 10</span>
        </div>
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <Trophy size={20} style={{ color }} aria-hidden="true" /> {t(label)}
          </p>
          <p className="mt-1 text-sm text-gray-600">{result.summary}</p>
          <p className="mt-1 text-xs text-gray-400">
            {userTurns === 1 ? t('1 message') : t('{{count}} messages', { count: userTurns })} ·{' '}
            {mistakes.length === 1 ? t('1 mistake') : t('{{count}} mistakes', { count: mistakes.length })}
          </p>
        </div>
      </div>

      <div className="space-y-6 px-6 py-5">
        <NewBadges badges={newBadges} />

        <Section icon={XCircle} title={t('Your mistakes')}>
          {mistakes.length === 0 ? (
            <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800">{t("Great, you didn't make any mistakes!")} 🎉</p>
          ) : (
            <ol className="space-y-3">
              {mistakes.map((m, i) => (
                <li key={i} className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-[15px]">
                  <p className="flex gap-2 text-red-700">
                    <XCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                    <span className="line-through decoration-red-300">{m.wrong}</span>
                  </p>
                  <p className="mt-1 flex gap-2 font-medium text-green-700">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                    <span>{m.correct}</span>
                  </p>
                  {m.explanation && <p className="mt-1.5 pl-[26px] text-sm text-gray-600">{m.explanation}</p>}
                </li>
              ))}
            </ol>
          )}
        </Section>

        {result.strengths?.length > 0 && (
          <Section icon={Star} title={t('What you did well')}>
            <ul className="space-y-1 text-[15px] text-gray-700">
              {result.strengths.map((s, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-green-500">✓</span> {s}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {result.usefulPhrases?.length > 0 && (
          <Section icon={BookOpen} title={t('Useful phrases')}>
            <ul className="grid gap-2 sm:grid-cols-2">
              {result.usefulPhrases.map((p, i) => (
                <li key={i} className="rounded-xl bg-gray-50 px-3.5 py-2.5">
                  <p className="font-semibold text-gray-900">{p.phrase}</p>
                  <p className="text-sm text-gray-500">{p.meaning}</p>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {result.nextStep && (
          <Section icon={Rocket} title={t('Next step')}>
            <p className="rounded-xl bg-amber-50 px-4 py-3 text-[15px] text-amber-900">{result.nextStep}</p>
          </Section>
        )}
      </div>

      <div className="flex flex-col gap-2 border-t border-gray-100 px-6 py-4 sm:flex-row">
        <button
          type="button"
          onClick={onRestart}
          disabled={restarting}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white hover:brightness-95 disabled:opacity-60"
          style={{ backgroundColor: 'var(--section-color)' }}
        >
          {restarting ? <Loader2 size={16} className="animate-spin" /> : <RotateCcw size={16} aria-hidden="true" />}
          {t('Practise this topic again')}
        </button>
        <a
          href={topicsPath}
          onClick={(e) => {
            e.preventDefault();
            onTopics();
          }}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          <LayoutGrid size={16} aria-hidden="true" /> {t('Choose another topic')}
        </a>
      </div>
    </div>
  );
}
