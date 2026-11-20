import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Clock, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useGetPlacementTestQuery, useSubmitPlacementTestMutation } from '@/services/placementApi';
import { setCredentials } from '@/app/authSlice';
import { LEVELS } from '@/lib/constants';
import StartConfirmModal from '@/components/exams/StartConfirmModal';
import NewBadges from '@/components/NewBadges';
import ListeningPlayer from '@/components/lesson/ListeningPlayer';
import { cloudinaryAudioUrl } from '@/lib/cloudinary';
import { EXAM_PLAYER_THEME } from '@/lib/exams';
import { useTranslation } from 'react-i18next';
import usePageTitle from '@/hooks/usePageTitle';
import { tk } from '@/i18n';

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
const TEST_DURATION_SECONDS = 90 * 60;

function formatTime(totalSeconds) {
  const clamped = Math.max(0, totalSeconds);
  const m = Math.floor(clamped / 60);
  const s = clamped % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function TestTimer({ secondsLeft }) {
  const isUrgent = secondsLeft <= 5 * 60;
  return (
    <div
      className={`fixed top-20 right-4 sm:right-6 z-30 inline-flex items-center gap-2 rounded-full border px-4 py-2 shadow-sm font-semibold text-sm transition-colors ${
        isUrgent ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-white border-gray-200 text-gray-700'
      }`}
    >
      <Clock size={16} strokeWidth={2.5} />
      {formatTime(secondsLeft)}
    </div>
  );
}

const SECTION_INFO = {
  listening: {
    label: tk('Listening'),
    part: 1,
    instructions: tk(
      'Listen to each recording and choose the best option for each question. You can play each recording as many times as you need.'
    ),
  },
  reading: {
    label: tk('Reading'),
    part: 2,
    instructions: tk('Read each text carefully, then choose the best option for each question.'),
  },
  grammar: {
    label: tk('Grammar'),
    part: 3,
    instructions: tk('Choose the best option (a, b, c, or d) to complete each paragraph.'),
  },
  vocabulary: {
    label: tk('Vocabulary'),
    part: 4,
    instructions: tk('Choose the best option (a, b, c, or d) to complete each sentence.'),
  },
  writing: {
    label: tk('Writing'),
    part: 5,
    instructions: tk('Complete each short passage with the words from the word box.'),
  },
};

const SECTION_ORDER = ['listening', 'reading', 'grammar', 'vocabulary', 'writing'];

function parsePassageWithBank(passage) {
  const [bankLine, ...rest] = (passage || '').split('\n---\n');
  const body = rest.join('\n---\n');
  const wordBank = bankLine
    ? bankLine
        .split('|')
        .map((w) => w.trim())
        .filter(Boolean)
    : [];
  return { wordBank, body };
}

// question.order sırasına göre zaten sıralı gelen listeyi, ardışık aynı-key değerlerine göre gruplar.
function groupInOrder(list, key) {
  const groups = [];
  const indexByKey = new Map();
  list.forEach((item) => {
    const k = item[key];
    if (!indexByKey.has(k)) {
      indexByKey.set(k, groups.length);
      groups.push({ key: k, items: [] });
    }
    groups[indexByKey.get(k)].items.push(item);
  });
  return groups;
}

function MCQuestionItem({ question, number, value, onChange, disabled }) {
  return (
    <div className="mb-5">
      <div className="flex items-start gap-3 mb-2.5">
        <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
          {number}
        </span>
        <p className="text-sm text-gray-800 leading-relaxed break-words min-w-0">{question.title}</p>
      </div>
      <div className="ml-9 space-y-2">
        {question.options.map((option, i) => {
          const isSelected = value === option;
          const stateClass = isSelected
            ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold'
            : 'border-gray-200 text-gray-800 hover:border-emerald-300';
          return (
            <button
              key={option}
              type="button"
              disabled={disabled}
              onClick={() => onChange(option)}
              className={`w-full flex items-center gap-3 rounded-lg border px-3 py-2.5 sm:px-4 text-left text-sm transition-colors disabled:cursor-default ${stateClass}`}
            >
              <span className="font-semibold text-gray-400 w-4 shrink-0">{OPTION_LETTERS[i]}</span>
              <span className="min-w-0 break-words">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function GrammarClozeGroup({ passage, questions, answers, onChange, disabled, startNumber }) {
  const segments = passage.split('___');

  return (
    <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4 sm:p-5 mb-8 text-sm text-gray-800 leading-loose whitespace-pre-line break-words">
      {segments.map((segment, i) => {
        const question = questions[i];
        return (
          <span key={i}>
            {segment}
            {question && (
              <span className="inline-flex items-center align-middle mx-1 max-w-full">
                <span className="inline-flex items-center justify-center w-5 h-5 shrink-0 rounded-full bg-emerald-600 text-white text-[10px] font-bold mr-1">
                  {startNumber + i}
                </span>
                <select
                  value={answers[question.id] ?? ''}
                  onChange={(e) => onChange(question.id, e.target.value)}
                  disabled={disabled}
                  className="inline-block min-w-[6rem] max-w-full rounded border border-gray-300 bg-white px-2 py-1 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
                >
                  <option value="" disabled hidden></option>
                  {question.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

function WritingClozeGroup({ passage, questions, answers, onChange, disabled, startNumber }) {
  const { t } = useTranslation();
  const { wordBank, body } = parsePassageWithBank(passage);
  const segments = body.split('___');

  return (
    <div className="mb-8">
      {wordBank.length > 0 && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 mb-3 text-sm text-gray-700">
          <span className="font-semibold text-gray-500 mr-2">{t('Word box:')}</span>
          {wordBank.join('  –  ')}
        </div>
      )}
      <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4 sm:p-5 text-sm text-gray-800 leading-loose whitespace-pre-line break-words">
        {segments.map((segment, i) => {
          const question = questions[i];
          return (
            <span key={i}>
              {segment}
              {question && (
                <span className="inline-flex items-center align-middle mx-1 max-w-full">
                  <span className="inline-flex items-center justify-center w-5 h-5 shrink-0 rounded-full bg-emerald-600 text-white text-[10px] font-bold mr-1">
                    {startNumber + i}
                  </span>
                  <input
                    type="text"
                    value={answers[question.id] ?? ''}
                    onChange={(e) => onChange(question.id, e.target.value)}
                    disabled={disabled}
                    className="inline-block w-24 sm:w-28 max-w-full rounded border border-gray-300 bg-white px-2 py-1 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
                  />
                </span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}

// Level Test bölümleri (giriş ekranındaki tablo); soru sayıları backend'deki seviye testiyle aynı.
const PLACEMENT_PARTS = [
  {
    key: 'listening',
    label: tk('Listening'),
    skill: tk('Understanding main points and details in spoken English'),
    format: tk('2 recordings, multiple choice'),
    questions: 10,
  },
  {
    key: 'reading',
    label: tk('Reading'),
    skill: tk('Understanding main ideas and specific information in written texts'),
    format: tk('3 texts, multiple choice'),
    questions: 20,
  },
  {
    key: 'grammar',
    label: tk('Grammar'),
    skill: tk('Accurate use of grammatical structures in context'),
    format: tk('Gap-fill paragraphs (A–D)'),
    questions: 15,
  },
  {
    key: 'vocabulary',
    label: tk('Vocabulary'),
    skill: tk('Range and precision of lexical knowledge'),
    format: tk('Multiple choice (A–D)'),
    questions: 10,
  },
  {
    key: 'writing',
    label: tk('Writing'),
    skill: tk('Completing coherent texts with appropriate words'),
    format: tk('2 texts with a word box'),
    questions: 10,
  },
];

// Puan → seviye eşleşmesi (backend: controllers/placementTest.controller.js, LEVEL_BANDS) ve CEFR tanımları.
const PLACEMENT_BANDS = [
  { level: 'A1', range: '0–8', descriptor: tk('Can understand and use familiar everyday expressions and very basic phrases.') },
  { level: 'A2', range: '9–21', descriptor: tk('Can communicate in simple, routine tasks on familiar topics.') },
  { level: 'B1', range: '22–33', descriptor: tk('Can deal with most situations and describe experiences, events and plans.') },
  { level: 'B2', range: '34–65', descriptor: tk('Can understand complex texts and interact with a degree of fluency.') },
];
const PLACEMENT_TOTAL = PLACEMENT_PARTS.reduce((n, p) => n + p.questions, 0);
const PLACEMENT_MINUTES = TEST_DURATION_SECONDS / 60;

// Giriş sayfası: sitenin diğer sayfalarındaki gibi yeşil şerit; altında akademik bir test tanıtımı
// (amaç, yapı, puanlama, CEFR seviyeleri) ve sağda özet + "Start test". Başlatmadan önce onay penceresi çıkar.
function IntroScreen({ onStart, isLoading, user }) {
  const { t } = useTranslation();
  const alreadyCompleted = Boolean(user?.placementTestCompleted);
  const [confirming, setConfirming] = useState(false);
  const closeConfirm = useCallback(() => setConfirming(false), []);

  return (
    <>
      <div className="bg-emerald-600">
        <h1 className="max-w-6xl mx-auto px-6 py-3 text-center text-white font-bold tracking-wide uppercase text-sm sm:text-base">
          {t('Level Test')}
        </h1>
      </div>

      <div className="max-w-6xl mx-auto w-full flex-1 px-4 sm:px-6 py-8 sm:py-10 pb-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
          {/* Sol: test tanıtımı */}
          <article className="min-w-0 text-[15px] leading-relaxed text-gray-700">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">{t('English Placement Test')}</h2>
            <p className="mt-1 text-sm text-gray-500">{t('Based on the Common European Framework of Reference (CEFR), A1–B2')}</p>

            <p className="mt-5">
              {t(
                'This test is designed to measure your current level of English across five areas of language knowledge. The questions in each part are arranged in order of increasing difficulty, so that the test can identify the point at which your performance becomes less consistent. Your total score is then matched to one of four CEFR levels, and lessons are recommended at that level.'
              )}
            </p>

            <h3 className="mt-8 mb-3 text-lg font-bold text-gray-900">{t('Test structure')}</h3>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                    <th className="px-4 py-2.5 font-semibold">{t('Part')}</th>
                    <th className="px-4 py-2.5 font-semibold">{t('What is assessed')}</th>
                    <th className="hidden md:table-cell px-4 py-2.5 font-semibold">{t('Format')}</th>
                    <th className="px-4 py-2.5 text-right font-semibold">{t('Items')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {PLACEMENT_PARTS.map((part, i) => (
                    <tr key={part.key} className="align-top">
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                        {i + 1}. {t(part.label)}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {t(part.skill)}
                        <span className="block md:hidden text-xs text-gray-400">{t(part.format)}</span>
                      </td>
                      <td className="hidden md:table-cell px-4 py-3 text-gray-600">{t(part.format)}</td>
                      <td className="px-4 py-3 text-right tabular-nums text-gray-900">{part.questions}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-gray-200 font-semibold text-gray-900">
                    <td className="px-4 py-2.5" colSpan={2}>
                      {t('Total')}
                    </td>
                    <td className="hidden md:table-cell" />
                    <td className="px-4 py-2.5 text-right tabular-nums">{PLACEMENT_TOTAL}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <h3 className="mt-8 mb-3 text-lg font-bold text-gray-900">{t('How your level is determined')}</h3>
            <p>
              {t(
                'Each correct answer is worth one point, and there is no penalty for incorrect answers. Your total score out of {{total}} is placed in one of the bands below. The result is shown as soon as you submit the test and becomes your level on the site.',
                { total: PLACEMENT_TOTAL }
              )}
            </p>
            <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                    <th className="px-4 py-2.5 font-semibold">{t('Level')}</th>
                    <th className="px-4 py-2.5 font-semibold whitespace-nowrap">{t('Score')}</th>
                    <th className="px-4 py-2.5 font-semibold">{t('CEFR description')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {PLACEMENT_BANDS.map((band) => (
                    <tr key={band.level} className="align-top">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="font-bold text-emerald-700">{band.level}</span>{' '}
                        <span className="text-gray-500">{t(LEVELS.find((l) => l.code === band.level)?.name ?? '')}</span>
                      </td>
                      <td className="px-4 py-3 tabular-nums text-gray-900 whitespace-nowrap">{band.range}</td>
                      <td className="px-4 py-3 text-gray-600">{t(band.descriptor)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          {/* Sağ: özet ve başlat (geniş ekranda sabit kalır) */}
          <aside className="lg:sticky lg:top-24 self-start">
            <div className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
              <dl className="grid grid-cols-3 gap-3 border-b border-gray-100 pb-5 text-center">
                <div>
                  <dt className="text-xs text-gray-500">{t('Time')}</dt>
                  <dd className="mt-0.5 text-xl font-bold text-gray-900 tabular-nums">{PLACEMENT_MINUTES}</dd>
                  <dd className="text-xs text-gray-500">{t('minutes')}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500">{t('Items')}</dt>
                  <dd className="mt-0.5 text-xl font-bold text-gray-900 tabular-nums">{PLACEMENT_TOTAL}</dd>
                  <dd className="text-xs text-gray-500">{t('questions')}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500">{t('Levels')}</dt>
                  <dd className="mt-0.5 text-xl font-bold text-gray-900">A1–B2</dd>
                  <dd className="text-xs text-gray-500">CEFR</dd>
                </div>
              </dl>

              <h3 className="mt-5 text-sm font-bold text-gray-900">{t('Before you begin')}</h3>
              <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm text-gray-600 marker:text-gray-400">
                <li>{t('Make sure you can work without interruption for {{minutes}} minutes.', { minutes: PLACEMENT_MINUTES })}</li>
                <li>{t('Use headphones for the Listening part.')}</li>
                <li>{t('Do not use dictionaries, translators or other help; the result should reflect your own level.')}</li>
                <li>{t('Answer every question, even when you are unsure.')}</li>
                <li>{t('Answers cannot be changed once the test is submitted.')}</li>
              </ul>

              {alreadyCompleted && (
                <p className="mt-5 rounded-lg bg-amber-50 px-3.5 py-2.5 text-sm text-amber-800">
                  {user?.level
                    ? t('You have already taken this test (current level: {{level}}). A new attempt will replace your level.', {
                        level: user.level,
                      })
                    : t('You have already taken this test. A new attempt will replace your level.')}
                </p>
              )}

              <button
                type="button"
                onClick={() => setConfirming(true)}
                disabled={isLoading}
                className="mt-5 w-full rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 disabled:opacity-60"
              >
                {isLoading ? t('Loading...') : alreadyCompleted ? t('Retake the test') : t('Start the test')}
              </button>
            </div>
          </aside>
        </div>
      </div>

      {confirming && (
        <StartConfirmModal
          testName={t('level test')}
          questionCount={PLACEMENT_TOTAL}
          durationMinutes={PLACEMENT_MINUTES}
          onConfirm={onStart}
          onCancel={closeConfirm}
        />
      )}
    </>
  );
}

// Sonuç ekranı: giriş sayfasıyla aynı düzen (yeşil şerit, solda ayrıntılar, sağda özet ve sonraki adımlar).
function ResultScreen({ result }) {
  const { t } = useTranslation();
  const { level, score, maxScore, statsBySection } = result;
  const levelInfo = LEVELS.find((l) => l.code === level);
  const band = PLACEMENT_BANDS.find((b) => b.level === level);

  return (
    <>
      <div className="bg-emerald-600">
        <h1 className="max-w-6xl mx-auto px-6 py-3 text-center text-white font-bold tracking-wide uppercase text-sm sm:text-base">
          {t('Level Test')}
        </h1>
      </div>

      <div className="max-w-6xl mx-auto w-full flex-1 px-4 sm:px-6 py-8 sm:py-10 pb-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
          {/* Sol: seviye, CEFR tanımı, bölüm sonuçları, puan aralıkları */}
          <article className="min-w-0 text-[15px] leading-relaxed text-gray-700">
            <p className="text-sm text-gray-500">{t('Your level')}</p>
            <h2 className="mt-1 flex flex-wrap items-baseline gap-x-3">
              <span className="text-5xl font-extrabold tracking-tight text-emerald-700">{level}</span>
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                {levelInfo ? t(levelInfo.name) : ''}
              </span>
            </h2>
            {band && <p className="mt-3">{t(band.descriptor)}</p>}

            <h3 className="mt-8 mb-3 text-lg font-bold text-gray-900">{t('Results by part')}</h3>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                    <th className="px-4 py-2.5 font-semibold">{t('Part')}</th>
                    <th className="px-4 py-2.5 font-semibold w-1/2">{t('Correct answers')}</th>
                    <th className="px-4 py-2.5 text-right font-semibold">{t('Score')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {SECTION_ORDER.map((section, i) => {
                    const stats = statsBySection[section] ?? { correct: 0, total: 0 };
                    const pct = stats.total ? Math.round((stats.correct / stats.total) * 100) : 0;
                    return (
                      <tr key={section}>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                          {i + 1}. {t(SECTION_INFO[section].label)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                            <div className="h-full rounded-full bg-emerald-500" style={{ width: `${pct}%` }} />
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-gray-900 whitespace-nowrap">
                          {stats.correct} / {stats.total}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t border-gray-200 font-semibold text-gray-900">
                    <td className="px-4 py-2.5" colSpan={2}>
                      {t('Total')}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums">
                      {score} / {maxScore}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <h3 className="mt-8 mb-3 text-lg font-bold text-gray-900">{t('How your level is determined')}</h3>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                    <th className="px-4 py-2.5 font-semibold">{t('Level')}</th>
                    <th className="px-4 py-2.5 font-semibold whitespace-nowrap">{t('Score')}</th>
                    <th className="px-4 py-2.5 font-semibold">{t('CEFR description')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {PLACEMENT_BANDS.map((b) => {
                    const mine = b.level === level;
                    return (
                      <tr key={b.level} className={`align-top ${mine ? 'bg-emerald-50' : ''}`}>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="font-bold text-emerald-700">{b.level}</span>{' '}
                          {mine && (
                            <span className="ml-1 rounded-full bg-emerald-600 px-2 py-0.5 text-[11px] font-semibold text-white">
                              {t('You')}
                            </span>
                          )}
                        </td>
                        <td className={`px-4 py-3 tabular-nums whitespace-nowrap ${mine ? 'font-semibold text-gray-900' : 'text-gray-900'}`}>
                          {b.range}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{t(b.descriptor)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </article>

          {/* Sağ: özet ve sonraki adımlar (geniş ekranda sabit kalır) */}
          <aside className="lg:sticky lg:top-24 self-start space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
              <dl className="grid grid-cols-2 gap-3 border-b border-gray-100 pb-5 text-center">
                <div>
                  <dt className="text-xs text-gray-500">{t('Level')}</dt>
                  <dd className="mt-0.5 text-xl font-bold text-emerald-700">{level}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500">{t('Score')}</dt>
                  <dd className="mt-0.5 text-xl font-bold text-gray-900 tabular-nums">
                    {score} / {maxScore}
                  </dd>
                </div>
              </dl>

              <p className="mt-5 text-sm text-gray-600">
                {t('This is now your level on the site. Lessons and topics of the day are recommended at this level.')}
              </p>

              <div className="mt-5 flex flex-col gap-3">
                <Link
                  to={`/topics/grammar/${level}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
                >
                  {t('Start learning at my level')} <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link
                  to={`/exams/${level}`}
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                >
                  {t('Take the {{level}} exam', { level })}
                </Link>
              </div>
            </div>

            <NewBadges badges={result.newlyAwardedBadges} />
          </aside>
        </div>
      </div>
    </>
  );
}

export default function PlacementTestPage() {
  const { t } = useTranslation();
  usePageTitle(t('Level Test'));
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const [stage, setStage] = useState('intro');
  const [partIndex, setPartIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(TEST_DURATION_SECONDS);

  const { data, isLoading, isFetching } = useGetPlacementTestQuery(undefined, { skip: stage === 'intro' });
  const [submitPlacementTest, { isLoading: submitting }] = useSubmitPlacementTestMutation();

  const questions = data?.data?.questions ?? [];

  const bySection = useMemo(() => {
    const map = {};
    SECTION_ORDER.forEach((section) => {
      map[section] = questions.filter((q) => q.section === section).sort((a, b) => a.order - b.order);
    });
    return map;
  }, [questions]);

  const isSectionAnswered = (sectionQuestions) =>
    sectionQuestions.length > 0 && sectionQuestions.every((q) => answers[q.id] !== undefined && answers[q.id] !== '');

  const currentSection = SECTION_ORDER[partIndex];
  const currentQuestions = bySection[currentSection] ?? [];
  const isLastPart = partIndex === SECTION_ORDER.length - 1;
  const currentPartAnswered = isSectionAnswered(currentQuestions);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNextPart = () => {
    setPartIndex((i) => i + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    const payload = questions.map((q) => ({ questionId: q.id, answer: answers[q.id] }));
    const res = await submitPlacementTest(payload).unwrap();
    setResult(res.data);
    if (token) {
      dispatch(setCredentials({ user: res.data.user, token }));
    }
    setStage('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartTest = () => {
    setSecondsLeft(TEST_DURATION_SECONDS);
    setStage('test');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Test aşamasında saniye başına geri sayar; süre biterse test otomatik olarak gönderilir.
  useEffect(() => {
    if (stage !== 'test') return undefined;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          handleSubmit();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [stage]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {stage === 'intro' && <IntroScreen onStart={handleStartTest} isLoading={isFetching} user={user} />}

      {stage === 'test' && <TestTimer secondsLeft={secondsLeft} />}

      {stage === 'test' && (
        <div className="max-w-3xl mx-auto px-6 py-10 flex-1 w-full">
          {isLoading && <p className="text-gray-400 text-sm py-10 text-center">{t('Loading test...')}</p>}

          {!isLoading && currentQuestions.length > 0 && (
            <>
              <div className="flex items-center gap-2 mb-8">
                {SECTION_ORDER.map((section, i) => (
                  <div
                    key={section}
                    className={`flex-1 h-1.5 rounded-full ${i <= partIndex ? 'bg-emerald-600' : 'bg-gray-200'}`}
                  />
                ))}
              </div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
                {t('Part {{n}} of {{total}}', { n: partIndex + 1, total: SECTION_ORDER.length })}
              </p>

              {(() => {
                const info = SECTION_INFO[currentSection];
                const groups = groupInOrder(currentQuestions, 'exerciseGroup');
                let counter = 0;

                return (
                  <div className="mb-10">
                    <div className="bg-emerald-600 rounded-lg px-5 py-3 mb-2">
                      <p className="text-white font-bold uppercase tracking-wide text-sm">
                        {t('Part {{n}}', { n: info.part })} — {t(info.label)} (
                        {t('{{count}} questions', { count: currentQuestions.length })})
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">{t(info.instructions)}</p>

                    {groups.map((group, groupIndex) => {
                      const groupPassage = group.items.find((q) => q.passage)?.passage ?? null;
                      const groupStartNumber = counter + 1;
                      counter += group.items.length;

                      if (currentSection === 'grammar') {
                        return (
                          <div key={group.key}>
                            {groupPassage && (
                              <GrammarClozeGroup
                                passage={groupPassage}
                                questions={group.items}
                                answers={answers}
                                onChange={handleAnswerChange}
                                disabled={false}
                                startNumber={groupStartNumber}
                              />
                            )}
                          </div>
                        );
                      }

                      if (currentSection === 'writing') {
                        return (
                          <div key={group.key}>
                            {groupPassage && (
                              <WritingClozeGroup
                                passage={groupPassage}
                                questions={group.items}
                                answers={answers}
                                onChange={handleAnswerChange}
                                disabled={false}
                                startNumber={groupStartNumber}
                              />
                            )}
                          </div>
                        );
                      }

                      // Listening: her grup bir kayıt (audio); oynatıcı ve altında soruları. Metin (transkript) gösterilmez.
                      const groupAudio = group.items.find((q) => q.audio)?.audio ?? null;

                      return (
                        <div key={group.key} className="mb-8">
                          {currentSection === 'listening' && (
                            <>
                              <h3 className="font-semibold text-gray-900 mb-3">
                                {t('Recording {{n}}', { n: groupIndex + 1 })}
                              </h3>
                              <ListeningPlayer src={cloudinaryAudioUrl(groupAudio)} theme={EXAM_PLAYER_THEME} />
                            </>
                          )}
                          {groupPassage && (
                            <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4 sm:p-5 mb-5 text-sm text-gray-700 leading-relaxed whitespace-pre-line break-words">
                              {groupPassage}
                            </div>
                          )}
                          {group.items.map((question, i) => (
                            <MCQuestionItem
                              key={question.id}
                              question={question}
                              number={groupStartNumber + i}
                              value={answers[question.id]}
                              onChange={(value) => handleAnswerChange(question.id, value)}
                              disabled={false}
                            />
                          ))}
                        </div>
                      );
                    })}
                  </div>
                );
              })()}

              <div className="text-center mt-4 mb-16">
                <p className="text-sm text-gray-400 mb-3">
                  {t('{{done}} / {{total}} answered in this part', {
                    done: currentQuestions.filter((q) => answers[q.id] !== undefined && answers[q.id] !== '').length,
                    total: currentQuestions.length,
                  })}
                </p>
                {!isLastPart ? (
                  <button
                    type="button"
                    onClick={handleNextPart}
                    disabled={!currentPartAnswered}
                    className="rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-10 py-3 transition-colors"
                  >
                    {t('Next part')} →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!currentPartAnswered || submitting}
                    className="rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-10 py-3 transition-colors"
                  >
                    {submitting ? t('Scoring...') : t('Submit test')}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {stage === 'result' && result && <ResultScreen result={result} />}

      <Footer />
    </div>
  );
}
