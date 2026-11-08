import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TriangleAlert, Clock, ClipboardCheck, Timer, ListChecks, Gauge, Info, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useGetPlacementTestQuery, useSubmitPlacementTestMutation } from '@/services/placementApi';
import { setCredentials } from '@/app/authSlice';
import { LEVELS } from '@/lib/constants';
import { EXAM_SECTION_ICONS } from '@/lib/exams';
import ExamIllustration from '@/components/exams/ExamIllustration';
import StartConfirmModal from '@/components/exams/StartConfirmModal';

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
const TEST_DURATION_SECONDS = 80 * 60;

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
  reading: {
    label: 'Reading',
    part: 'Part 1',
    instructions: 'Read each text carefully, then choose the best option for each question.',
  },
  grammar: {
    label: 'Grammar',
    part: 'Part 2',
    instructions: 'Choose the best option (a, b, c, or d) to complete each paragraph.',
  },
  vocabulary: {
    label: 'Vocabulary',
    part: 'Part 3',
    instructions: 'Choose the best option (a, b, c, or d) to complete each sentence.',
  },
  writing: {
    label: 'Writing',
    part: 'Part 4',
    instructions: 'Complete each short passage with the words from the word box.',
  },
};

const SECTION_ORDER = ['reading', 'grammar', 'vocabulary', 'writing'];

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
  const { wordBank, body } = parsePassageWithBank(passage);
  const segments = body.split('___');

  return (
    <div className="mb-8">
      {wordBank.length > 0 && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 mb-3 text-sm text-gray-700">
          <span className="font-semibold text-gray-500 mr-2">Word box:</span>
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
  { key: 'reading', label: 'Reading', format: '3 texts', questions: 20 },
  { key: 'grammar', label: 'Grammar', format: 'Gap-fill paragraphs (A–D)', questions: 15 },
  { key: 'vocabulary', label: 'Vocabulary', format: 'Multiple choice (A–D)', questions: 10 },
  { key: 'writing', label: 'Writing', format: '2 texts, word box', questions: 10 },
];
const PLACEMENT_TOTAL = PLACEMENT_PARTS.reduce((n, p) => n + p.questions, 0);
const PLACEMENT_MINUTES = TEST_DURATION_SECONDS / 60;

function StatItem({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-4">
      <Icon size={30} strokeWidth={2} className="shrink-0 text-emerald-600" aria-hidden="true" />
      <div>
        <p className="font-bold text-gray-900 leading-tight">{title}</p>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}

// Seviye sınavlarıyla aynı görsel dil: açık yeşil zemin, alt dalga, tek renk.
function GreenBackdrop({ children }) {
  return (
    <section className="relative isolate overflow-hidden flex-1 bg-gradient-to-b from-emerald-50/80 via-white to-emerald-50/50">
      <svg
        className="absolute inset-x-0 bottom-0 -z-10 w-full h-24 sm:h-32 text-emerald-100/70"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path fill="currentColor" d="M0 70c180-40 360-40 540-10s360 50 540 20 270-50 360-40v80H0Z" />
      </svg>
      {children}
    </section>
  );
}

function IntroScreen({ onStart, isLoading, user }) {
  const alreadyCompleted = Boolean(user?.placementTestCompleted);
  const [confirming, setConfirming] = useState(false);
  const closeConfirm = useCallback(() => setConfirming(false), []);

  return (
    <GreenBackdrop>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-16 sm:pb-24">
        <div className="grid gap-6 lg:gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0">
            <h1 className="mt-2 text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900">
              Level <span className="text-emerald-600">Test</span>
            </h1>
            <p className="mt-3 text-base sm:text-lg text-gray-600">
              Find out your English level. This CEFR-based test moves from easier to harder questions in each part, and
              your result sets the A1–B2 level we recommend lessons for.
            </p>

            {alreadyCompleted && (
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <TriangleAlert size={18} className="mt-0.5 shrink-0 text-amber-600" aria-hidden="true" />
                <p className="text-sm text-amber-800 leading-relaxed">
                  You've already taken this test{user?.level ? ` — your current level is ${user.level}` : ''}. You can
                  take it again, but your level will be updated based on the new result.
                </p>
              </div>
            )}

            <div className="mt-6 rounded-2xl border border-gray-100 bg-white shadow-sm p-4 sm:p-6">
              <h2 className="flex items-center gap-3 text-lg sm:text-xl font-bold text-gray-900 mb-4">
                <span className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                  <ClipboardCheck size={20} aria-hidden="true" />
                </span>
                Test Overview
              </h2>

              <div className="overflow-hidden rounded-xl border border-gray-100">
                <table className="w-full text-sm sm:text-[15px]">
                  <thead>
                    <tr className="bg-emerald-50 text-gray-600 text-xs uppercase tracking-wide">
                      <th className="text-left px-3 sm:px-5 py-3 font-semibold">Part</th>
                      <th className="hidden sm:table-cell text-left px-5 py-3 font-semibold">Format</th>
                      <th className="text-right px-3 sm:px-5 py-3 font-semibold">Questions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {PLACEMENT_PARTS.map((part, i) => {
                      const Icon = EXAM_SECTION_ICONS[part.key] ?? ClipboardCheck;
                      return (
                        <tr key={part.key}>
                          <td className="px-3 sm:px-5 py-3 text-gray-800">
                            <span className="flex items-center gap-3">
                              <Icon size={20} className="shrink-0 text-emerald-600" aria-hidden="true" />
                              <span>
                                {i + 1}. {part.label}
                                <span className="block sm:hidden text-xs text-gray-500">{part.format}</span>
                              </span>
                            </span>
                          </td>
                          <td className="hidden sm:table-cell px-5 py-3 text-gray-600">{part.format}</td>
                          <td className="px-3 sm:px-5 py-3 text-right text-gray-800 tabular-nums">{part.questions}</td>
                        </tr>
                      );
                    })}
                    <tr className="bg-emerald-50 font-bold text-emerald-800">
                      <td className="px-3 sm:px-5 py-3.5 sm:hidden">
                        <span className="flex items-center gap-3">
                          <Clock size={20} className="shrink-0 text-emerald-600" aria-hidden="true" />
                          Total · {PLACEMENT_MINUTES} min
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-5 py-3.5" colSpan={2}>
                        <span className="flex items-center gap-3">
                          <Clock size={20} className="shrink-0 text-emerald-600" aria-hidden="true" />
                          Total · {PLACEMENT_MINUTES} minutes
                        </span>
                      </td>
                      <td className="px-3 sm:px-5 py-3.5 text-right text-lg tabular-nums">{PLACEMENT_TOTAL}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:pt-2">
            <ExamIllustration className="hidden sm:block w-full max-w-[340px] mx-auto" />
            <div className="rounded-2xl bg-emerald-50/80 border border-emerald-100 p-5 sm:p-6 space-y-5">
              <StatItem icon={Timer} title={`${PLACEMENT_MINUTES} minutes`} subtitle="Time for the test" />
              <StatItem icon={ListChecks} title={`${PLACEMENT_TOTAL} questions`} subtitle="Easier to harder in each part" />
              <StatItem icon={Gauge} title="Your level: A1–B2" subtitle="Set automatically when you finish" />
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-gray-100 bg-white shadow-sm p-5 sm:p-7 flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1 min-w-0">
            <h2 className="flex items-center gap-3 text-lg font-bold text-gray-900 mb-3">
              <Info size={24} className="shrink-0 fill-emerald-600 text-white" aria-hidden="true" />
              Before you start:
            </h2>
            <ul className="space-y-2 text-sm sm:text-[15px] text-gray-700">
              {[
                `You have ${PLACEMENT_MINUTES} minutes — a timer will be shown once you start.`,
                'Choose the best option, or type the missing word — there is only one correct answer.',
                "Answer every question, even if you're not sure — there is no penalty for guessing.",
                "Once you submit the test, you won't be able to change your answers.",
              ].map((text) => (
                <li key={text} className="flex gap-3">
                  <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-emerald-600" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => setConfirming(true)}
            disabled={isLoading}
            className="shrink-0 w-full md:w-auto inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-b from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 disabled:opacity-60 text-white text-lg font-bold px-10 py-4 shadow-lg shadow-emerald-600/25 transition-colors"
          >
            {isLoading ? 'Loading...' : alreadyCompleted ? 'Retake Test' : 'Start Test'}
            <ArrowRight size={22} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>
      </div>

      {confirming && (
        <StartConfirmModal
          testName="level test"
          questionCount={PLACEMENT_TOTAL}
          durationMinutes={PLACEMENT_MINUTES}
          onConfirm={onStart}
          onCancel={closeConfirm}
        />
      )}
    </GreenBackdrop>
  );
}

function ResultScreen({ result }) {
  const { level, score, maxScore, statsBySection } = result;
  const levelInfo = LEVELS.find((l) => l.code === level);

  return (
    <GreenBackdrop>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-16 sm:pb-24">
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 sm:p-10 text-center">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Your level</p>
          <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-emerald-50 ring-8 ring-emerald-50/60 border-4 border-emerald-500 mb-5">
            <span className="text-4xl font-extrabold text-emerald-700">{level}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            You are at <span className="text-emerald-600">{levelInfo?.name ?? level}</span> level
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Overall score: {score} / {maxScore}
          </p>

          <div className="mt-8 text-left space-y-4">
            {SECTION_ORDER.map((section) => {
              const stats = statsBySection[section] ?? { correct: 0, total: 0 };
              const pct = stats.total ? Math.round((stats.correct / stats.total) * 100) : 0;
              const Icon = EXAM_SECTION_ICONS[section] ?? ClipboardCheck;
              return (
                <div key={section}>
                  <div className="flex items-center gap-3 text-sm">
                    <Icon size={18} className="shrink-0 text-emerald-600" aria-hidden="true" />
                    <span className="flex-1 font-medium text-gray-800">{SECTION_INFO[section].label}</span>
                    <span className="tabular-nums text-gray-500">
                      {stats.correct} / {stats.total}
                    </span>
                  </div>
                  <div className="mt-1.5 ml-[30px] h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to={`/topics/grammar/${level}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 transition-colors"
            >
              Start learning at my level <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link
              to={`/exams/${level}`}
              className="inline-flex items-center justify-center rounded-xl border border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-semibold px-6 py-3 transition-colors"
            >
              Take the {level} exam
            </Link>
          </div>
        </div>
      </div>
    </GreenBackdrop>
  );
}

export default function PlacementTestPage() {
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
          {isLoading && <p className="text-gray-400 text-sm py-10 text-center">Loading test...</p>}

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
                Part {partIndex + 1} of {SECTION_ORDER.length}
              </p>

              {(() => {
                const info = SECTION_INFO[currentSection];
                const groups = groupInOrder(currentQuestions, 'exerciseGroup');
                let counter = 0;

                return (
                  <div className="mb-10">
                    <div className="bg-emerald-600 rounded-lg px-5 py-3 mb-2">
                      <p className="text-white font-bold uppercase tracking-wide text-sm">
                        {info.part} — {info.label} ({currentQuestions.length} questions)
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">{info.instructions}</p>

                    {groups.map((group) => {
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

                      return (
                        <div key={group.key} className="mb-8">
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
                  {currentQuestions.filter((q) => answers[q.id] !== undefined && answers[q.id] !== '').length} /{' '}
                  {currentQuestions.length} answered in this part
                </p>
                {!isLastPart ? (
                  <button
                    type="button"
                    onClick={handleNextPart}
                    disabled={!currentPartAnswered}
                    className="rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-10 py-3 transition-colors"
                  >
                    Next part →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!currentPartAnswered || submitting}
                    className="rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-10 py-3 transition-colors"
                  >
                    {submitting ? 'Scoring...' : 'Submit test'}
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
