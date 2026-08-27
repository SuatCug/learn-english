import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TriangleAlert, Clock } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useGetPlacementTestQuery, useSubmitPlacementTestMutation } from '@/services/placementApi';
import { setCredentials } from '@/app/authSlice';
import { LEVELS } from '@/lib/constants';

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
                  className="inline-block max-w-full rounded border border-gray-300 bg-white px-2 py-1 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
                >
                  <option value="">...</option>
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

function IntroScreen({ onStart, isLoading, user }) {
  const alreadyCompleted = Boolean(user?.placementTestCompleted);
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="rounded-2xl border border-emerald-100 bg-white shadow-sm p-8 sm:p-10">
        <p className="text-xs font-semibold tracking-widest text-emerald-600 uppercase mb-2">
          General English Placement Test
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Find out your English level</h1>
        <p className="text-sm text-gray-600 leading-relaxed mb-6">
          This placement test is designed in line with the CEFR (Common European Framework of Reference for
          Languages) — the same international standard used to describe the A1–C2 levels throughout this site. It
          combines a Reading, a Grammar, a Vocabulary, and a Writing section, moving from easier to more difficult
          questions within each part, and your result is used to recommend the right lessons for you.
        </p>

        {alreadyCompleted && (
          <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 mb-6">
            <TriangleAlert size={18} className="mt-0.5 shrink-0 text-amber-600" />
            <p className="text-sm text-amber-800 leading-relaxed">
              You've already taken this test{user?.level ? ` — your current level is ${user.level}` : ''}. You can
              take it again, but your level will be updated based on the new result.
            </p>
          </div>
        )}

        <div className="rounded-xl border border-gray-100 overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                <th className="text-left px-4 py-2.5 font-semibold">Section</th>
                <th className="text-right px-4 py-2.5 font-semibold">Questions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-4 py-2.5 text-gray-700">Reading</td>
                <td className="px-4 py-2.5 text-right text-gray-700">20</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-700">Grammar</td>
                <td className="px-4 py-2.5 text-right text-gray-700">15</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-700">Vocabulary</td>
                <td className="px-4 py-2.5 text-right text-gray-700">10</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-700">Writing</td>
                <td className="px-4 py-2.5 text-right text-gray-700">10</td>
              </tr>
              <tr className="bg-emerald-50/60 font-semibold text-emerald-800">
                <td className="px-4 py-2.5">Total</td>
                <td className="px-4 py-2.5 text-right">55</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-sm text-gray-600 mb-8">
          <p className="font-semibold text-gray-800 mb-2">Before you start:</p>
          <ul className="space-y-1.5 list-disc list-inside">
            <li>You have 80 minutes to complete the test — a timer will be shown once you start.</li>
            <li>
              Choose the best option, or type the missing word, for each question — there is only one correct
              answer.
            </li>
            <li>Answer every question, even if you're not sure — there is no penalty for guessing.</li>
            <li>Once you submit the test, you won't be able to change your answers.</li>
          </ul>
        </div>

        {!confirming ? (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            disabled={isLoading}
            className="w-full sm:w-auto rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold px-8 py-3 transition-colors"
          >
            {isLoading ? 'Loading test...' : alreadyCompleted ? 'OK, retake the test' : 'OK, start the test'}
          </button>
        ) : (
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 sm:p-5">
            <p className="text-sm font-semibold text-gray-900">
              Are you sure you're ready? Once you start, the 80-minute timer begins and you won't be able to pause.
            </p>
            <div className="flex items-center gap-3 mt-3">
              <button
                type="button"
                onClick={onStart}
                disabled={isLoading}
                className="rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold px-6 py-2.5 text-sm transition-colors"
              >
                {isLoading ? 'Loading test...' : 'Yes, start the test'}
              </button>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="rounded-lg border border-rose-300 text-rose-600 hover:bg-rose-50 font-semibold px-6 py-2.5 text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ResultScreen({ result }) {
  const { level, score, maxScore, statsBySection } = result;
  const levelInfo = LEVELS.find((l) => l.code === level);

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="rounded-2xl border border-emerald-100 bg-white shadow-sm p-8 sm:p-10 text-center">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Your result</p>
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-50 border-4 border-emerald-100 mb-4">
          <span className="text-3xl font-extrabold text-emerald-700">{level}</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          You are at {levelInfo ? `${levelInfo.code} — ${levelInfo.name}` : level} level
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Overall score: {score} / {maxScore}
        </p>

        <div className="rounded-xl border border-gray-100 overflow-hidden mb-8 text-left">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                <th className="text-left px-4 py-2.5 font-semibold">Section</th>
                <th className="text-right px-4 py-2.5 font-semibold">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {SECTION_ORDER.map((section) => (
                <tr key={section}>
                  <td className="px-4 py-2.5 text-gray-700">{SECTION_INFO[section].label}</td>
                  <td className="px-4 py-2.5 text-right text-gray-700">
                    {statsBySection[section]?.correct ?? 0} / {statsBySection[section]?.total ?? 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to={`/topics/grammar/${level}`}
            className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 transition-colors"
          >
            Start learning at my level
          </Link>
          <Link
            to="/"
            className="rounded-lg border border-gray-300 text-gray-700 font-semibold px-6 py-3 hover:bg-gray-50 transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
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
