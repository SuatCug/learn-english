import { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  useGetTopicQuery,
  useGetTopicQuestionsQuery,
  useCheckAnswersMutation,
  useGetTopicsQuery,
} from '@/services/topicsApi';
import { useAddProgressMutation, useGetMeQuery } from '@/services/usersApi';
import { CATEGORIES, CATEGORY_BANNER_CLASS, DEFAULT_BANNER_CLASS, CATEGORY_THEME, DEFAULT_THEME } from '@/lib/constants';
import { GRAMMAR_EXPLANATIONS } from '@/lib/grammarExplanations';
import GrammarExplanation from '@/components/lesson/GrammarExplanation';
import { WRITING_EXPLANATIONS } from '@/lib/writingExplanations';
import WritingExplanation from '@/components/lesson/WritingExplanation';
import { VOCABULARY_EXPLANATIONS } from '@/lib/vocabularyExplanations';
import VocabularyExplanation from '@/components/lesson/VocabularyExplanation';

const TABS = [
  { key: 'exercises', label: 'Exercises' },
  { key: 'explanation', label: 'Explanation' },
];

const EXERCISE_NUMBERS = [1, 2, 3];

// İlerleme kaydedilince yeni rozet kazanılmışsa veya seviye atlanmışsa, kullanıcıyı motive
// etmek için ekranın ortasında kutlama gösterilir (küçük satır içi rozet yerine).
function CelebrationModal({ celebration, onClose }) {
  if (!celebration) return null;
  const { badges, leveledUpTo } = celebration;

  return (
    <div className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-5xl mb-3">🎉</p>

        {leveledUpTo && (
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900">Level Up!</h3>
            <p className="text-sm text-gray-500 mt-1">
              You've reached level <span className="font-bold text-emerald-600">{leveledUpTo}</span>
            </p>
          </div>
        )}

        {badges?.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {leveledUpTo ? 'New badge too!' : badges.length > 1 ? 'New Badges Earned!' : 'New Badge Earned!'}
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {badges.map((badge) => (
                <span
                  key={badge._id}
                  className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1.5 text-sm font-medium text-gray-700"
                >
                  {badge.icon} {badge.title}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mt-6 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-6 py-2.5 transition-colors"
        >
          Awesome!
        </button>
      </div>
    </div>
  );
}

// Exercise 3: dönüştürme alıştırması — özne değiştirilerek fiil formu güncelleniyor
// (test-english.com'un "this, that, these, those" Exercise 3 tarzı: talimat + örnek satırı).
const EXERCISE_INSTRUCTIONS = {
  3: {
    text: 'Rewrite the sentences with the new subject, using the correct form of the verb.',
    example: { given: 'I like tea.', arrowSubject: 'She', blank: 'likes', rest: 'tea.' },
  },
};

function ExercisePager({ active, onChange, numbers, theme }) {
  if (numbers.length <= 1) return null;

  return (
    <div className="flex items-center gap-2.5 shrink-0">
      <span className="text-sm text-gray-400 uppercase tracking-wide">Exercises:</span>
      {numbers.map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`w-9 h-9 rounded text-base font-semibold border transition-colors ${
            active === n
              ? `${theme.solid} ${theme.border} text-white`
              : `bg-white border-gray-300 text-gray-600 ${theme.hoverBorder}`
          }`}
        >
          {n}
        </button>
      ))}
    </div>
  );
}

// Soru cümlesini "___" boşluğundan bölüp, cümlenin içine gömülü bir input/select
// olarak render eder (test-english.com'daki cloze tarzı format).
function InlineQuestionField({ question, value, onChange, disabled, theme }) {
  const parts = question.title.split('___');
  const hasBlank = parts.length > 1;

  const field =
    question.type === 'multiple-choice' ? (
      <select
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`mx-1.5 inline-block rounded border border-gray-300 bg-white px-2.5 py-1.5 text-base text-gray-900 focus:outline-none focus:ring-2 ${theme.ring} disabled:bg-gray-50`}
      >
        <option value="">...</option>
        {question.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    ) : (
      <input
        type="text"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`mx-1.5 inline-block w-32 rounded border border-gray-300 px-2.5 py-1.5 text-base text-gray-900 focus:outline-none focus:ring-2 ${theme.ring} disabled:bg-gray-50`}
      />
    );

  if (!hasBlank) {
    return (
      <span>
        {question.title}
        {field}
      </span>
    );
  }

  return (
    <span>
      {parts[0]}
      {field}
      {parts[1]}
    </span>
  );
}

// Writing egzersizleri: "kelime kutusu" + boşluklu tek bir metin (test-english.com formatı).
// Topic.passage şu şekilde saklanır: "kelime1 | kelime2 | ...\n---\nMetin ___ boşluklarla ___.".
function parseWritingPassage(passage) {
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

function InlineBlankInput({ value, onChange, disabled, result, index, theme }) {
  const stateClass = result
    ? result.correct
      ? 'border-emerald-400 bg-emerald-50'
      : 'border-rose-400 bg-rose-50'
    : 'border-gray-300';

  return (
    <span className="inline-flex items-center align-middle mx-1">
      <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${theme.solid} text-white text-xs font-bold mr-1`}>
        {index + 1}
      </span>
      <input
        type="text"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`inline-block w-28 rounded border px-2 py-1 text-base text-gray-900 focus:outline-none focus:ring-2 ${theme.ring} disabled:bg-gray-50 ${stateClass}`}
      />
    </span>
  );
}

function WritingBlanksExercise({ passage, questions, answers, onChange, resultsById, disabled, theme }) {
  const { wordBank, body } = parseWritingPassage(passage);
  const segments = body.split('___');
  const wrongResults = questions
    .map((q, index) => ({ q, index, result: resultsById?.[q.id] }))
    .filter(({ result }) => result && !result.correct);

  return (
    <div>
      {wordBank.length > 0 && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 mb-6 text-base text-gray-700">
          <span className="font-semibold text-gray-500 mr-2">Word box:</span>
          {wordBank.join('  –  ')}
        </div>
      )}

      <div className={`rounded-xl border ${theme.borderLighter} ${theme.subtleBg} p-6 text-base text-gray-800 leading-loose whitespace-pre-line`}>
        {segments.map((segment, i) => {
          const question = questions[i];
          return (
            <span key={i}>
              {segment}
              {question && (
                <InlineBlankInput
                  index={i}
                  value={answers[question.id]}
                  onChange={(value) => onChange(question.id, value)}
                  disabled={disabled}
                  result={resultsById?.[question.id]}
                  theme={theme}
                />
              )}
            </span>
          );
        })}
      </div>

      {wrongResults.length > 0 && (
        <div className="mt-4 space-y-1.5">
          {wrongResults.map(({ q, index, result }) => (
            <p key={q.id} className="text-sm text-rose-600">
              Blank {index + 1}: correct answer is{' '}
              <span className="font-semibold">{String(result.correctAnswer)}</span>
              {result.explanation && <span className="text-gray-500"> — {result.explanation}</span>}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

// Exercise 2 formatı: soru üstte düz metin, seçenekler altında A/B/C/D kutucukları
// (test-english.com'un "this, that, these, those" tarzı çoktan seçmeli düzeni).
function OptionsQuestionItem({ question, index, value, onChange, result, disabled, theme }) {
  return (
    <div>
      <div className="flex items-start gap-3 mb-3">
        <span className={`mt-0.5 shrink-0 w-7 h-7 rounded-full ${theme.solid} text-white text-sm font-bold flex items-center justify-center`}>
          {index + 1}
        </span>
        <p className="text-base text-gray-800 leading-relaxed">{question.title}</p>
      </div>

      <div className="ml-10 space-y-2.5">
        {question.options.map((option, i) => {
          const isSelected = value === option;
          const isCorrectOption = result && option === result.correctAnswer;
          const isWrongSelected = result && isSelected && !result.correct;

          const stateClass = result
            ? isCorrectOption
              ? 'border-emerald-400 bg-emerald-50 text-gray-800'
              : isWrongSelected
                ? 'border-rose-400 bg-rose-50 text-gray-800'
                : 'border-gray-200 text-gray-800'
            : isSelected
              ? `${theme.border} ${theme.lightBg} ${theme.text} font-semibold`
              : `border-gray-200 text-gray-800 ${theme.hoverBorder}`;

          return (
            <button
              key={option}
              type="button"
              disabled={disabled}
              onClick={() => onChange(option)}
              className={`w-full flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-base transition-colors disabled:cursor-default ${stateClass}`}
            >
              <span className="font-semibold text-gray-400 w-4">{OPTION_LETTERS[i]}</span>
              {option}
            </button>
          );
        })}
      </div>

      {result?.explanation && <p className="ml-10 mt-2.5 text-sm text-gray-500">{result.explanation}</p>}
    </div>
  );
}

function ExerciseItem({ question, index, value, onChange, result, disabled, theme }) {
  const status = result ? (result.correct ? 'correct' : 'incorrect') : null;

  const borderClass =
    status === 'correct' ? 'border-emerald-300' : status === 'incorrect' ? 'border-rose-300' : 'border-transparent';

  return (
    <div className={`border-l-4 ${borderClass} pl-4 py-2 transition-colors`}>
      <div className="flex items-start gap-3">
        <span className={`mt-0.5 shrink-0 w-7 h-7 rounded-full ${theme.solid} text-white text-sm font-bold flex items-center justify-center`}>
          {index + 1}
        </span>
        <p className="text-base text-gray-800 leading-relaxed">
          <InlineQuestionField question={question} value={value} onChange={onChange} disabled={disabled} theme={theme} />
        </p>
      </div>

      {result && (
        <div className="ml-10 mt-2 text-sm">
          {!result.correct && (
            <p className="text-rose-600 font-medium">Correct answer: {String(result.correctAnswer)}</p>
          )}
          {result.explanation && <p className="text-gray-500 mt-0.5">{result.explanation}</p>}
        </div>
      )}
    </div>
  );
}

// Ders içeriği ilk kez yüklenirken sayfayı boşaltmak yerine gerçek düzeni taklit eden bir
// iskelet gösterilir; veri gelince alıştırma satırları kademeli (staggered) fade-in ile belirir.
function LessonSkeleton() {
  return (
    <div className="card-enter">
      <div className="flex flex-wrap gap-2 mb-6">
        <div className="skeleton-box h-4 w-16 rounded" />
        <div className="skeleton-box h-4 w-44 rounded" />
        <div className="skeleton-box h-4 w-32 rounded" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <div className="flex gap-3 border-b border-gray-200">
            <div className="skeleton-box h-8 w-24 rounded-t" />
            <div className="skeleton-box h-8 w-28 rounded-t opacity-60" />
          </div>

          <div className="rounded-b-xl rounded-tr-xl border border-t-0 border-gray-100 p-8">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="skeleton-box h-7 w-1/2 rounded" />
              <div className="skeleton-box h-8 w-28 rounded" />
            </div>
            <div className="skeleton-box h-4 w-24 rounded mb-6" />

            <div className="space-y-4">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="card-enter rounded-xl border border-gray-100 p-4"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="skeleton-box h-4 w-3/4 rounded mb-3" />
                  <div className="flex flex-wrap gap-2">
                    <div className="skeleton-box h-9 w-24 rounded" />
                    <div className="skeleton-box h-9 w-24 rounded" />
                    <div className="skeleton-box h-9 w-24 rounded" />
                  </div>
                </div>
              ))}
            </div>

            <div className="skeleton-box h-10 w-40 rounded mx-auto mt-8" />
          </div>
        </div>

        <aside className="lg:w-64 shrink-0">
          <div className="skeleton-box h-4 w-32 rounded mb-4" />
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
                <div className="skeleton-box w-9 h-9 rounded-lg shrink-0" />
                <div className="skeleton-box h-4 flex-1 rounded" />
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

function LessonLoadError() {
  return (
    <div className="py-16 text-center">
      <p className="text-4xl mb-3">😕</p>
      <p className="text-gray-800 font-semibold">We couldn't load this lesson.</p>
      <p className="text-gray-500 text-sm mt-1">It may have been removed, or the connection dropped.</p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 text-sm transition-colors"
        >
          Try again
        </button>
        <Link
          to="/"
          className="rounded-lg border border-gray-300 bg-white text-gray-700 font-semibold px-5 py-2.5 text-sm hover:bg-gray-50 transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default function LessonPage() {
  const { topicId } = useParams();
  const [searchParams] = useSearchParams();
  const assignmentId = searchParams.get('assignmentId');
  const classroomId = searchParams.get('classroomId');

  const { data: topicData, isLoading: topicLoading, isError: topicError } = useGetTopicQuery(topicId);
  const {
    data: questionsData,
    isLoading: questionsLoading,
    isError: questionsError,
  } = useGetTopicQuestionsQuery(topicId);
  const { data: meData } = useGetMeQuery();
  const [checkAnswers, { isLoading: checking }] = useCheckAnswersMutation();
  const [addProgress, { isLoading: saving }] = useAddProgressMutation();

  const [activeTab, setActiveTab] = useState('exercises');
  const [activeExercise, setActiveExercise] = useState(1);
  // Her egzersiz (1, 2, 3) kendi cevap/sonuç/kaydedilme durumunu bağımsız tutar, böylece
  // egzersizler arasında geçiş yapmak diğerinin tamamlanmış durumunu silmiyor.
  const [answersByExercise, setAnswersByExercise] = useState({});
  const [resultsByExercise, setResultsByExercise] = useState({});
  const [scoreByExercise, setScoreByExercise] = useState({});
  const [awardedBadgesByExercise, setAwardedBadgesByExercise] = useState({});
  const [celebration, setCelebration] = useState(null);
  const [savedByExercise, setSavedByExercise] = useState({});
  // Kullanıcı, daha önce tamamladığı bir egzersiz için "Try Again"e bastığında bu session içinde tekrar açılır.
  const [practicingByExercise, setPracticingByExercise] = useState({});
  // "See Answers"e basıldığında, o egzersizin doğru cevapları (kullanıcı tekrar çözmeden) burada tutulur.
  const [answerKeyByExercise, setAnswerKeyByExercise] = useState({});
  const [viewingAnswersByExercise, setViewingAnswersByExercise] = useState({});
  const [loadingAnswerKey, setLoadingAnswerKey] = useState(false);
  const [saveErrorByExercise, setSaveErrorByExercise] = useState({});

  const answers = answersByExercise[activeExercise] ?? {};
  const resultsById = resultsByExercise[activeExercise] ?? null;
  const score = scoreByExercise[activeExercise] ?? null;
  const awardedBadges = awardedBadgesByExercise[activeExercise] ?? null;
  const saved = savedByExercise[activeExercise] ?? false;
  const saveError = saveErrorByExercise[activeExercise] ?? null;
  const viewingAnswers = viewingAnswersByExercise[activeExercise] ?? false;
  const answerKey = answerKeyByExercise[activeExercise] ?? null;
  // Bu konu için daha önce (geçmiş bir ziyarette de olsa) kaydedilmiş egzersizler, kullanıcının
  // gerçek ilerleme kaydından (backend) türetilir — böylece sayfa yeniden açıldığında da geçerlidir.
  const completedExerciseNumbers = new Set(
    (meData?.data?.user?.progress ?? [])
      .filter((p) => String(p.topicId?._id ?? p.topicId) === String(topicId))
      .map((p) => p.exerciseGroup ?? 1)
  );
  const previouslyCompleted = completedExerciseNumbers.has(activeExercise);
  const practicing = practicingByExercise[activeExercise] ?? false;
  const showCompletedBanner = previouslyCompleted && !practicing && !resultsById;
  const showExerciseContent = !previouslyCompleted || practicing || Boolean(resultsById) || viewingAnswers;
  // Gerçek bir "Check Answers" denemesi varsa onu, yoksa (sadece cevap anahtarına bakılıyorsa) anahtarı göster.
  const displayResultsById = resultsById ?? (viewingAnswers ? answerKey : null);
  const answersDisabled = Boolean(resultsById) || viewingAnswers;

  const setAnswers = (updater) =>
    setAnswersByExercise((prev) => ({
      ...prev,
      [activeExercise]: typeof updater === 'function' ? updater(prev[activeExercise] ?? {}) : updater,
    }));

  const topic = topicData?.data?.topic;
  const passage = questionsData?.data?.passage;
  const allQuestions = questionsData?.data?.questions ?? [];
  const availableExercises = [...new Set(allQuestions.map((q) => q.exerciseGroup ?? 1))].sort((a, b) => a - b);
  const exerciseNumbers = availableExercises.length > 0 ? availableExercises : EXERCISE_NUMBERS;
  const questions = allQuestions.filter((q) => (q.exerciseGroup ?? 1) === activeExercise);
  const isWritingBlanks = topic?.category === 'writing' && Boolean(passage);
  const categoryInfo = topic ? CATEGORIES.find((c) => c.slug === topic.category) : null;
  const categoryLabel = categoryInfo?.label ?? topic?.category;
  const bannerClass = (topic && CATEGORY_BANNER_CLASS[topic.category]) ?? DEFAULT_BANNER_CLASS;
  const theme = (topic && CATEGORY_THEME[topic.category]) ?? DEFAULT_THEME;
  const grammarExplanation = topic ? GRAMMAR_EXPLANATIONS[`${topic.level}::${topic.title}`] : null;
  const writingExplanation = topic ? WRITING_EXPLANATIONS[`${topic.level}::${topic.title}`] : null;
  const vocabularyExplanation = topic ? VOCABULARY_EXPLANATIONS[`${topic.level}::${topic.title}`] : null;
  // Reading konularının kendi metni zaten "Exercises" sekmesinde gösteriliyor — ayrı bir Explanation sekmesine gerek yok.
  const tabs = topic?.category === 'reading' ? TABS.filter((tab) => tab.key !== 'explanation') : TABS;

  useEffect(() => {
    setActiveTab('exercises');
    setActiveExercise(availableExercises[0] ?? 1);
    setAnswersByExercise({});
    setResultsByExercise({});
    setScoreByExercise({});
    setAwardedBadgesByExercise({});
    setSavedByExercise({});
    setPracticingByExercise({});
    setAnswerKeyByExercise({});
    setViewingAnswersByExercise({});
    setSaveErrorByExercise({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId]);

  const { data: siblingData } = useGetTopicsQuery(
    { category: topic?.category, level: topic?.level },
    { skip: !topic }
  );
  const relatedTopics = (siblingData?.data?.topics ?? []).filter((t) => t._id !== topicId).slice(0, 3);

  const allAnswered = questions.length > 0 && questions.every((q) => answers[q.id] !== undefined && answers[q.id] !== '');

  const handleCheck = async () => {
    const payload = questions.map((q) => ({ questionId: q.id, answer: answers[q.id] }));
    const res = await checkAnswers({ id: topicId, answers: payload }).unwrap();
    const map = {};
    res.data.results.forEach((r) => {
      map[r.questionId] = r;
    });
    setResultsByExercise((prev) => ({ ...prev, [activeExercise]: map }));
    setScoreByExercise((prev) => ({ ...prev, [activeExercise]: res.data.score }));
  };

  const handleExerciseChange = (n) => {
    setActiveExercise(n);
  };

  const handleReset = () => {
    setAnswersByExercise((prev) => ({ ...prev, [activeExercise]: {} }));
    setResultsByExercise((prev) => ({ ...prev, [activeExercise]: null }));
    setScoreByExercise((prev) => ({ ...prev, [activeExercise]: null }));
    setAwardedBadgesByExercise((prev) => ({ ...prev, [activeExercise]: null }));
    setSavedByExercise((prev) => ({ ...prev, [activeExercise]: false }));
    setViewingAnswersByExercise((prev) => ({ ...prev, [activeExercise]: false }));
    setSaveErrorByExercise((prev) => ({ ...prev, [activeExercise]: null }));
  };

  const handleSaveProgress = async () => {
    setSaveErrorByExercise((prev) => ({ ...prev, [activeExercise]: null }));
    try {
      const answersPayload = questions.map((q) => ({ questionId: q.id, answer: answers[q.id] }));
      const res = await addProgress({
        topicId,
        score,
        exerciseGroup: activeExercise,
        answers: answersPayload,
        assignmentId: assignmentId || undefined,
      }).unwrap();
      const newlyAwardedBadges = res.data.newlyAwardedBadges ?? [];
      const leveledUpTo = res.data.leveledUpTo ?? null;
      setAwardedBadgesByExercise((prev) => ({ ...prev, [activeExercise]: newlyAwardedBadges }));
      setSavedByExercise((prev) => ({ ...prev, [activeExercise]: true }));
      if (newlyAwardedBadges.length > 0 || leveledUpTo) {
        setCelebration({ badges: newlyAwardedBadges, leveledUpTo });
      }
    } catch (err) {
      const message =
        err?.data?.message ||
        err?.data?.errors?.[0]?.message ||
        err?.error ||
        'Kaydedilemedi. Lütfen tekrar deneyin.';
      setSaveErrorByExercise((prev) => ({ ...prev, [activeExercise]: message }));
    }
  };

  const currentExerciseIndex = exerciseNumbers.indexOf(activeExercise);
  const nextExerciseNumber =
    currentExerciseIndex >= 0 ? exerciseNumbers[currentExerciseIndex + 1] : undefined;

  const handleNextExercise = () => {
    if (nextExerciseNumber === undefined) return;
    setActiveExercise(nextExerciseNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePracticeAgain = () => {
    setPracticingByExercise((prev) => ({ ...prev, [activeExercise]: true }));
    setViewingAnswersByExercise((prev) => ({ ...prev, [activeExercise]: false }));
    setAnswersByExercise((prev) => ({ ...prev, [activeExercise]: {} }));
  };

  const handleSeeAnswers = async () => {
    setLoadingAnswerKey(true);
    try {
      // En son bu egzersiz için kaydedilmiş denemedeki gerçek cevaplarımızı bul (varsa).
      const lastEntry = (meData?.data?.user?.progress ?? [])
        .filter(
          (p) =>
            String(p.topicId?._id ?? p.topicId) === String(topicId) && (p.exerciseGroup ?? 1) === activeExercise
        )
        .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))[0];

      const storedAnswers = {};
      (lastEntry?.answers ?? []).forEach((a) => {
        storedAnswers[String(a.questionId)] = a.answer;
      });

      const payload = questions.map((q) => ({ questionId: q.id, answer: storedAnswers[q.id] ?? '' }));
      const res = await checkAnswers({ id: topicId, answers: payload }).unwrap();
      const map = {};
      res.data.results.forEach((r) => {
        map[r.questionId] = r;
      });
      setAnswerKeyByExercise((prev) => ({ ...prev, [activeExercise]: map }));
      setAnswersByExercise((prev) => ({ ...prev, [activeExercise]: storedAnswers }));
      setViewingAnswersByExercise((prev) => ({ ...prev, [activeExercise]: true }));
    } finally {
      setLoadingAnswerKey(false);
    }
  };

  const isLoading = topicLoading || questionsLoading;
  const loadFailed = !isLoading && (topicError || questionsError || !topic);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <CelebrationModal celebration={celebration} onClose={() => setCelebration(null)} />

      {!isLoading && topic && (
        <div className={bannerClass}>
          <h1 className="max-w-6xl mx-auto px-6 py-3 text-center text-white font-bold tracking-wide uppercase text-sm sm:text-base">
            {topic.title}
          </h1>
        </div>
      )}

      {!isLoading && topic && (
        <div className="max-w-6xl mx-auto px-6 pt-4 text-sm text-gray-500">
          <Link to="/" className={theme.hoverText}>
            {categoryLabel}
          </Link>{' '}
          /{' '}
          <Link to={`/topics/${topic.category}/${topic.level}`} className={theme.hoverText}>
            {topic.level} {categoryLabel} lessons and exercises
          </Link>{' '}
          / <span className="text-gray-700">{topic.title}</span>
        </div>
      )}

      {!isLoading && topic && assignmentId && classroomId && (
        <div className="max-w-6xl mx-auto px-6 pt-4 w-full">
          <div className="rounded-lg bg-sky-50 border border-sky-100 px-4 py-2.5 text-sm text-sky-800 flex items-center gap-2">
            <span aria-hidden="true">🎓</span>
            <span>
              This is a classroom assignment — your score will be saved to your{' '}
              <Link to={`/classroom/${classroomId}`} className="font-semibold underline hover:text-sky-900">
                classroom
              </Link>
              .
            </span>
          </div>
        </div>
      )}

      {isLoading && (
        <div className={`${DEFAULT_BANNER_CLASS} py-3`}>
          <div className="mx-auto h-5 w-64 max-w-[80%] rounded bg-white/25 animate-pulse" />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-6 flex-1 w-full">
        {isLoading && <LessonSkeleton />}

        {loadFailed && <LessonLoadError />}

        {!isLoading && topic && (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 min-w-0">
              <div className="flex border-b border-gray-200">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${
                      activeTab === tab.key
                        ? `${theme.border} ${theme.text}`
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="rounded-b-xl rounded-tr-xl border border-t-0 border-gray-100 p-8">
                {activeTab === 'exercises' && (
                  <>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <h2 className={`text-2xl font-bold ${theme.text}`}>{topic.title}</h2>
                      <ExercisePager
                        active={activeExercise}
                        onChange={handleExerciseChange}
                        numbers={exerciseNumbers}
                        theme={theme}
                      />
                    </div>
                    <p className="text-base font-semibold text-gray-700 mb-4">Exercise {activeExercise}</p>

                    {showCompletedBanner && (
                      <div className={`flex flex-wrap items-center justify-between gap-3 rounded-lg ${theme.lightBg} border ${theme.borderLighter} px-4 py-3 mb-6`}>
                        <span className={`text-sm ${theme.text} font-medium`}>
                          ✓ You've already completed this exercise.
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleSeeAnswers}
                            disabled={loadingAnswerKey}
                            className={`rounded-lg border ${theme.borderLight} ${theme.text} font-semibold px-5 py-2 text-sm ${theme.lightBgHover} disabled:opacity-50 transition-colors`}
                          >
                            {loadingAnswerKey ? 'Loading...' : 'See Answers'}
                          </button>
                          <button
                            type="button"
                            onClick={handlePracticeAgain}
                            className={`rounded-lg ${theme.solid} ${theme.solidHover} text-white font-semibold px-5 py-2 text-sm transition-colors`}
                          >
                            Try Again
                          </button>
                        </div>
                      </div>
                    )}

                    {viewingAnswers && !resultsById && (
                      <p className={`text-xs font-medium ${theme.text} mb-4`}>
                        Showing your submitted answers below — this isn't a new attempt.
                      </p>
                    )}

                    {showExerciseContent && (
                      <>
                        {passage && !isWritingBlanks && (
                          <div className={`rounded-xl border ${theme.borderLighter} ${theme.subtleBg} p-6 mb-6 text-base text-gray-700 leading-relaxed space-y-3`}>
                            {passage.split('\n\n').map((paragraph, i) => (
                              <p key={i}>{paragraph}</p>
                            ))}
                          </div>
                        )}

                        {EXERCISE_INSTRUCTIONS[activeExercise] ? (
                          <>
                            <div className="rounded-lg bg-gray-50 border border-gray-100 px-4 py-3 mb-4 text-base text-gray-600">
                              {EXERCISE_INSTRUCTIONS[activeExercise].text}
                            </div>
                            <p className="text-base italic text-gray-500 mb-6">
                              EXAMPLE: {EXERCISE_INSTRUCTIONS[activeExercise].example.given} ⇒{' '}
                              {EXERCISE_INSTRUCTIONS[activeExercise].example.arrowSubject}{' '}
                              <span className="not-italic font-medium bg-gray-100 border border-gray-200 rounded px-2 py-0.5">
                                {EXERCISE_INSTRUCTIONS[activeExercise].example.blank}
                              </span>{' '}
                              {EXERCISE_INSTRUCTIONS[activeExercise].example.rest}
                            </p>
                          </>
                        ) : (
                          topic.description && (
                            <div className="rounded-lg bg-gray-50 border border-gray-100 px-4 py-3 mb-6 text-base text-gray-600">
                              {topic.description}
                            </div>
                          )
                        )}

                        {questions.length === 0 && (
                          <div className="rounded-xl border border-gray-100 p-10 text-center text-gray-400 text-sm">
                            No exercises here yet — coming soon.
                          </div>
                        )}

                        {questions.length > 0 && isWritingBlanks && (
                          <div className="card-enter">
                            <WritingBlanksExercise
                              passage={passage}
                              questions={questions}
                              answers={answers}
                              onChange={(questionId, value) =>
                                setAnswers((prev) => ({ ...prev, [questionId]: value }))
                              }
                              resultsById={displayResultsById}
                              disabled={answersDisabled}
                              theme={theme}
                            />
                          </div>
                        )}

                        {questions.length > 0 && !isWritingBlanks && (
                          <div className="space-y-4">
                            {questions.map((question, index) => {
                              const ItemComponent = activeExercise === 2 ? OptionsQuestionItem : ExerciseItem;
                              return (
                                <div
                                  key={question.id}
                                  className="card-enter"
                                  style={{ animationDelay: `${index * 60}ms` }}
                                >
                                  <ItemComponent
                                    question={question}
                                    index={index}
                                    value={answers[question.id]}
                                    onChange={(value) =>
                                      setAnswers((prev) => ({ ...prev, [question.id]: value }))
                                    }
                                    result={displayResultsById?.[question.id]}
                                    disabled={answersDisabled}
                                    theme={theme}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {questions.length > 0 && !resultsById && !viewingAnswers && (
                          <div className="text-center mt-8">
                            <button
                              type="button"
                              onClick={handleCheck}
                              disabled={!allAnswered || checking}
                              className={`rounded-lg ${theme.solid} ${theme.solidHover} disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-8 py-2.5 transition-colors`}
                            >
                              {checking ? 'Checking...' : 'Check Answers'}
                            </button>
                          </div>
                        )}
                      </>
                    )}

                    {resultsById && (
                      <div className={`mt-6 rounded-xl border ${theme.borderLighter} ${theme.subtleBg} p-5`}>
                        <p className="text-lg font-bold text-gray-900">You scored {score}%</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {Object.values(resultsById).filter((r) => r.correct).length} / {questions.length} correct
                        </p>

                        {!saved ? (
                          <div className="mt-4">
                            <div className="flex flex-wrap gap-3">
                              <button
                                type="button"
                                onClick={handleSaveProgress}
                                disabled={saving}
                                className={`rounded-lg ${theme.solid} ${theme.solidHover} disabled:opacity-50 text-white font-semibold px-5 py-2.5 text-sm transition-colors`}
                              >
                                {saving ? 'Saving...' : 'Save Progress'}
                              </button>
                              <button
                                type="button"
                                onClick={handleReset}
                                className="rounded-lg border border-gray-300 bg-white text-gray-700 font-semibold px-5 py-2.5 text-sm hover:bg-gray-50 transition-colors"
                              >
                                Try Again
                              </button>
                            </div>
                            {saveError && (
                              <p className="text-sm text-rose-600 font-medium mt-2">⚠ {saveError}</p>
                            )}
                          </div>
                        ) : (
                          <div className="mt-4">
                            <p className={`text-sm ${theme.text} font-medium`}>✓ Progress saved!</p>
                            {awardedBadges && awardedBadges.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {awardedBadges.map((badge) => (
                                  <span
                                    key={badge._id}
                                    className={`inline-flex items-center gap-1.5 bg-white border ${theme.borderLight} rounded-full px-3 py-1.5 text-sm font-medium text-gray-700`}
                                  >
                                    {badge.icon} {badge.title}
                                  </span>
                                ))}
                              </div>
                            )}
                            <div className="flex flex-wrap items-center gap-3 mt-4">
                              <button
                                type="button"
                                onClick={handleReset}
                                className="rounded-lg border border-gray-300 bg-white text-gray-700 font-semibold px-5 py-2.5 text-sm hover:bg-gray-50 transition-colors"
                              >
                                Try Again
                              </button>
                              {nextExerciseNumber !== undefined && (
                                <button
                                  type="button"
                                  onClick={handleNextExercise}
                                  className={`rounded-lg ${theme.solid} ${theme.solidHover} text-white font-semibold px-5 py-2.5 text-sm transition-colors`}
                                >
                                  Next Exercise →
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}

                {activeTab === 'explanation' && (
                  <>
                    {grammarExplanation ? (
                      <GrammarExplanation
                        data={grammarExplanation}
                        theme={theme}
                        onNext={() => setActiveTab('exercises')}
                      />
                    ) : writingExplanation ? (
                      <WritingExplanation
                        data={writingExplanation}
                        theme={theme}
                        onNext={() => setActiveTab('exercises')}
                      />
                    ) : vocabularyExplanation ? (
                      <VocabularyExplanation
                        data={vocabularyExplanation}
                        theme={theme}
                        onNext={() => setActiveTab('exercises')}
                      />
                    ) : (
                      <div className="text-sm text-gray-700 leading-relaxed">
                        {topic.description || 'No explanation added yet — coming soon.'}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <aside className="lg:w-64 shrink-0">
              <p className="text-sm font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-3">
                Related lessons
              </p>
              <div className="space-y-3">
                {relatedTopics.map((related) => (
                  <Link
                    key={related._id}
                    to={`/lesson/${related._id}`}
                    className="flex items-center gap-3 rounded-lg border border-gray-100 p-3 hover:shadow-sm transition-shadow"
                  >
                    <span className={`w-9 h-9 rounded-lg ${theme.lightBg} flex items-center justify-center text-lg shrink-0`}>
                      {categoryInfo?.icon}
                    </span>
                    <span className="text-sm text-gray-700 leading-snug">{related.title}</span>
                  </Link>
                ))}
                {relatedTopics.length === 0 && <p className="text-sm text-gray-400">No other lessons yet.</p>}
              </div>
            </aside>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
