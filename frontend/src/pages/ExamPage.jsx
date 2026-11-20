import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Clock, CheckCircle2, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ListeningPlayer from '@/components/lesson/ListeningPlayer';
import { useGetExamQuery, useSubmitExamMutation } from '@/services/examsApi';
import { setCredentials } from '@/app/authSlice';
import { cloudinaryAudioUrl } from '@/lib/cloudinary';
import { EXAM_PLAYER_THEME } from '@/lib/exams';
import { getErrorMessage } from '@/lib/getErrorMessage';
import NewBadges from '@/components/NewBadges';
import { useTranslation } from 'react-i18next';
import usePageTitle from '@/hooks/usePageTitle';

const VALID_LEVELS = ['A1', 'A2', 'B1', 'B2'];
const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

const isAnswered = (value) => value !== undefined && value !== null && String(value).trim() !== '';

function formatTime(totalSeconds) {
  const clamped = Math.max(0, totalSeconds);
  const m = Math.floor(clamped / 60);
  const s = clamped % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function ExamTimer({ secondsLeft }) {
  const isUrgent = secondsLeft <= 5 * 60;
  return (
    <div
      className={`fixed top-20 right-4 sm:right-6 z-30 inline-flex items-center gap-2 rounded-full border px-4 py-2 shadow-sm font-semibold text-sm tabular-nums transition-colors ${
        isUrgent ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-white border-gray-200 text-gray-700'
      }`}
    >
      <Clock size={16} strokeWidth={2.5} aria-hidden="true" />
      {formatTime(secondsLeft)}
    </div>
  );
}

function NumberBadge({ number, small = false }) {
  return (
    <span
      className={`shrink-0 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center ${
        small ? 'w-5 h-5 text-[10px]' : 'mt-0.5 w-6 h-6 text-xs'
      }`}
    >
      {number}
    </span>
  );
}

function MCQuestion({ question, number, value, onChange, result }) {
  const { t } = useTranslation();
  const reviewing = Boolean(result);
  return (
    <div className="mb-6">
      <div className="flex items-start gap-3 mb-2.5">
        <NumberBadge number={number} />
        <p className="text-sm sm:text-base text-gray-800 leading-relaxed break-words min-w-0">{question.text}</p>
      </div>
      <div className="ml-9 space-y-2">
        {question.options.map((option, i) => {
          const isSelected = value === option;
          let stateClass = isSelected
            ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold'
            : 'border-gray-200 text-gray-800 hover:border-emerald-300';
          if (reviewing) {
            if (option === result.correctAnswer) stateClass = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold';
            else if (isSelected) stateClass = 'border-rose-400 bg-rose-50 text-rose-700 line-through';
            else stateClass = 'border-gray-200 text-gray-500';
          }
          return (
            <button
              key={option}
              type="button"
              disabled={reviewing}
              onClick={() => onChange(option)}
              className={`w-full flex items-center gap-3 rounded-lg border px-3 py-2.5 sm:px-4 text-left text-sm transition-colors disabled:cursor-default ${stateClass}`}
            >
              <span className="font-semibold text-gray-400 w-4 shrink-0">{OPTION_LETTERS[i]}</span>
              <span className="min-w-0 break-words">{option}</span>
            </button>
          );
        })}
        {reviewing && !isAnswered(value) && <p className="text-xs text-rose-600">{t('Not answered')}</p>}
      </div>
    </div>
  );
}

function WritingGroup({ group, numbers, answers, onChange, results }) {
  const { t } = useTranslation();
  const segments = group.passage.split('___');
  const reviewing = Boolean(results);

  return (
    <div className="mb-10">
      {group.title && <h3 className="font-semibold text-gray-900 mb-3">{group.title}</h3>}
      <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 mb-3 text-sm text-gray-700 flex flex-wrap gap-2 items-center">
        <span className="font-semibold text-gray-500 mr-1">{t('Word box:')}</span>
        {group.wordBank.map((word) => (
          <span key={word} className="rounded-md bg-white border border-gray-200 px-2 py-0.5">
            {word}
          </span>
        ))}
      </div>
      <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4 sm:p-5 text-sm sm:text-base text-gray-800 leading-loose whitespace-pre-line break-words">
        {segments.map((segment, i) => {
          const question = group.questions[i];
          const result = question && results?.[question.id];
          let stateClass = 'border-gray-300';
          if (result) stateClass = result.correct ? 'border-emerald-500 bg-emerald-50' : 'border-rose-400 bg-rose-50';
          return (
            <span key={i}>
              {segment}
              {question && (
                <span className="inline-flex items-center align-middle mx-1 max-w-full gap-1">
                  <NumberBadge number={numbers[question.id]} small />
                  <input
                    type="text"
                    value={answers[question.id] ?? ''}
                    onChange={(e) => onChange(question.id, e.target.value)}
                    disabled={reviewing}
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    aria-label={t('Gap {{n}}', { n: numbers[question.id] })}
                    className={`inline-block w-28 sm:w-32 max-w-full rounded border bg-white px-2 py-1 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:text-gray-700 ${stateClass}`}
                  />
                  {result && !result.correct && (
                    <span className="text-xs font-semibold text-emerald-700">{result.correctAnswer}</span>
                  )}
                </span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}

// Bir bölümün tüm gruplarını (kayıt/metin + sorular) çizer; review modunda sonuçlarla renklendirir.
function SectionBody({ section, numbers, answers, onChange, results, transcripts }) {
  const { t } = useTranslation();
  if (section.key === 'writing') {
    return section.groups.map((group, g) => (
      <WritingGroup key={g} group={group} numbers={numbers} answers={answers} onChange={onChange} results={results} />
    ));
  }

  return section.groups.map((group, g) => (
    <div key={g} className="mb-10">
      {group.title && (
        <h3 className="font-semibold text-gray-900 mb-3">
          {section.key === 'listening'
            ? `${t('Recording {{n}}', { n: g + 1 })}: `
            : section.key === 'reading'
              ? `${t('Text {{n}}', { n: g + 1 })}: `
              : ''}
          {group.title}
        </h3>
      )}

      {group.audio && <ListeningPlayer src={cloudinaryAudioUrl(group.audio)} theme={EXAM_PLAYER_THEME} />}

      {results && transcripts?.[g] && section.key === 'listening' && (
        <details className="mb-5 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
          <summary className="cursor-pointer font-semibold text-gray-800">{t('Show transcript')}</summary>
          <p className="mt-3 whitespace-pre-line leading-relaxed">{transcripts[g]}</p>
        </details>
      )}

      {group.passage && (
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4 sm:p-5 mb-5 text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line break-words">
          {group.passage}
        </div>
      )}

      {group.questions.map((question) => (
        <MCQuestion
          key={question.id}
          question={question}
          number={numbers[question.id]}
          value={answers[question.id]}
          onChange={(value) => onChange(question.id, value)}
          result={results?.[question.id]}
        />
      ))}
    </div>
  ));
}

function SectionHeader({ section, index, total }) {
  const { t } = useTranslation();
  const count = section.groups.reduce((n, g) => n + g.questions.length, 0);
  return (
    <>
      <div className="bg-emerald-600 rounded-lg px-5 py-3 mb-2">
        <p className="text-white font-bold uppercase tracking-wide text-sm">
          {total ? t('Part {{n}} of {{total}}', { n: index + 1, total }) : t('Part {{n}}', { n: index + 1 })} —{' '}
          {t(section.label)} ({t('{{count}} questions', { count })})
        </p>
      </div>
      <p className="text-sm text-gray-500 mb-6">{t(section.instructions)}</p>
    </>
  );
}

function ResultScreen({ exam, result, onReview }) {
  const { t } = useTranslation();
  return (
    <div className="max-w-2xl w-full mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="rounded-2xl border border-emerald-100 bg-white shadow-sm p-6 sm:p-10 text-center">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">{t('{{level}} Level Exam', { level: exam.level })} — {t('your result')}</p>
        <div
          className={`inline-flex flex-col items-center justify-center w-28 h-28 rounded-full border-4 mb-4 ${
            result.passed ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'
          }`}
        >
          <span className={`text-3xl font-extrabold ${result.passed ? 'text-emerald-700' : 'text-amber-700'}`}>
            {result.percent}%
          </span>
          <span className="text-xs text-gray-500">
            {result.score} / {result.maxScore}
          </span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
          {result.passed ? (
            <>
              <CheckCircle2 className="text-emerald-600" size={22} aria-hidden="true" /> {t('You passed the {{level}} exam!', { level: exam.level })}
            </>
          ) : (
            <>
              <XCircle className="text-amber-600" size={22} aria-hidden="true" /> {t('Not passed yet')}
            </>
          )}
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          {result.passed
            ? t('Great work — you have a solid command of this level.')
            : t('You need {{percent}}% to pass. Review your answers and practise the weaker parts.', {
                percent: result.passPercent,
              })}
        </p>

        <NewBadges badges={result.newlyAwardedBadges} className="mb-6" />

        <div className="rounded-xl border border-gray-100 overflow-hidden mb-8 text-left">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                <th className="text-left px-4 py-2.5 font-semibold">{t('Part')}</th>
                <th className="text-right px-4 py-2.5 font-semibold">{t('Score')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {exam.sections.map((section) => {
                const stats = result.statsBySection[section.key] ?? { correct: 0, total: 0 };
                const pct = stats.total ? Math.round((stats.correct / stats.total) * 100) : 0;
                return (
                  <tr key={section.key}>
                    <td className="px-4 py-2.5 text-gray-700">
                      {t(section.label)}
                      <div className="mt-1.5 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${pct >= result.passPercent ? 'bg-emerald-500' : 'bg-amber-400'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-right text-gray-700 align-top tabular-nums">
                      {stats.correct} / {stats.total}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={onReview}
            className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 transition-colors"
          >
            {t('Review my answers')}
          </button>
          <Link
            to="/exams"
            className="rounded-lg border border-gray-300 text-gray-700 font-semibold px-6 py-3 hover:bg-gray-50 transition-colors"
          >
            {t('Back to exams')}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ExamPage() {
  const { t } = useTranslation();
  const { level: rawLevel } = useParams();
  const level = String(rawLevel || '').toUpperCase();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();
  const navigate = useNavigate();

  // Sınav sadece Exams sayfasındaki özet penceresinden ("Start exam") başlatılır: { start: true } ile gelinir.
  // Doğrudan gelinirse (navbar linki, sayfa yenileme) Exams sayfasına dönülür ve o seviyenin özeti açılır.
  const [startRequested] = useState(Boolean(location.state?.start));
  const [stage, setStage] = useState('waiting'); // waiting (sınav yükleniyor) | test | result | review
  const [partIndex, setPartIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const answersRef = useRef(answers);
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  const isValidLevel = VALID_LEVELS.includes(level);
  const { data, isLoading, isError } = useGetExamQuery(level, { skip: !isValidLevel });
  const [submitExam, { isLoading: submitting }] = useSubmitExamMutation();

  const exam = data?.data?.exam;
  const sections = useMemo(() => exam?.sections ?? [], [exam]);
  usePageTitle(t('{{level}} Level Exam', { level }));

  // Sınav yüklenince doğrudan başlar (sayaç kurulur).
  if (exam && stage === 'waiting' && startRequested) {
    setSecondsLeft(exam.durationMinutes * 60);
    setStage('test');
  }

  // "start" bilgisini adres geçmişinden sil: sınav bittikten sonra sayfa yenilenirse yeniden başlamasın.
  useEffect(() => {
    if (location.state?.start) navigate(location.pathname, { replace: true, state: null });
  }, [location, navigate]);

  // Sınav boyunca kesintisiz soru numarası (1..55).
  const numbers = useMemo(() => {
    const map = {};
    let n = 0;
    sections.forEach((s) => s.groups.forEach((g) => g.questions.forEach((q) => (map[q.id] = ++n))));
    return map;
  }, [sections]);
  const allQuestionIds = Object.keys(numbers);
  const answeredCount = allQuestionIds.filter((id) => isAnswered(answers[id])).length;

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSubmit = useCallback(async () => {
    setSubmitError(null);
    try {
      const res = await submitExam({ level, answers: answersRef.current }).unwrap();
      setResult(res.data);
      if (token && res.data.user) dispatch(setCredentials({ user: res.data.user, token }));
      setStage('result');
      setConfirmSubmit(false);
      scrollTop();
    } catch (error) {
      setSubmitError(getErrorMessage(error));
    }
  }, [dispatch, level, submitExam, token]);

  const handleSubmitRef = useRef(handleSubmit);
  useEffect(() => {
    handleSubmitRef.current = handleSubmit;
  }, [handleSubmit]);

  // Geri sayım; süre bitince sınav (o ana kadarki cevaplarla) otomatik gönderilir.
  useEffect(() => {
    if (stage !== 'test') return undefined;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          handleSubmitRef.current();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [stage]);

  // Sınav sırasında sayfa kapatılır/yenilenirse uyar.
  useEffect(() => {
    if (stage !== 'test') return undefined;
    const onBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [stage]);

  if (!isValidLevel) return <Navigate to="/exams" replace />;
  if (!startRequested) return <Navigate to="/exams" replace state={{ open: level }} />;

  const currentSection = sections[partIndex];
  const isLastPart = partIndex === sections.length - 1;
  const unanswered = allQuestionIds.length - answeredCount;

  const goToPart = (index) => {
    setPartIndex(index);
    setConfirmSubmit(false);
    scrollTop();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {(isLoading || isError) && (
        <div className="flex-1 py-16 text-center text-sm">
          {isLoading && <p className="text-gray-400">{t('Loading exam...')}</p>}
          {isError && <p className="text-rose-600">{t("The exam couldn't be loaded. Please try again later.")}</p>}
        </div>
      )}

      {exam && stage === 'test' && currentSection && (
        <>
          <ExamTimer secondsLeft={secondsLeft} />
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 flex-1 w-full">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-3">
              {sections.map((section, i) => {
                const ids = section.groups.flatMap((g) => g.questions.map((q) => q.id));
                const done = ids.every((id) => isAnswered(answers[id]));
                return (
                  <button
                    key={section.key}
                    type="button"
                    onClick={() => goToPart(i)}
                    className={`flex-1 min-w-0 rounded-md px-1 py-1.5 text-[11px] sm:text-xs font-semibold truncate transition-colors ${
                      i === partIndex
                        ? 'bg-emerald-600 text-white'
                        : done
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {t(section.label)}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-gray-400 mb-8">
              {t('{{done}} / {{total}} questions answered', { done: answeredCount, total: allQuestionIds.length })}
            </p>

            <SectionHeader section={currentSection} index={partIndex} total={sections.length} />
            <SectionBody section={currentSection} numbers={numbers} answers={answers} onChange={handleAnswerChange} />

            <div className="flex flex-wrap items-center justify-between gap-3 mt-4 mb-6">
              <button
                type="button"
                onClick={() => goToPart(partIndex - 1)}
                disabled={partIndex === 0}
                className="inline-flex items-center gap-1 rounded-lg border border-gray-300 text-gray-700 font-semibold px-5 py-2.5 text-sm hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} aria-hidden="true" /> {t('Previous')}
              </button>
              {!isLastPart ? (
                <button
                  type="button"
                  onClick={() => goToPart(partIndex + 1)}
                  className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 text-sm transition-colors"
                >
                  {t('Next part')} <ChevronRight size={16} aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => (unanswered > 0 ? setConfirmSubmit(true) : handleSubmit())}
                  disabled={submitting}
                  className="rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold px-8 py-2.5 text-sm transition-colors"
                >
                  {submitting ? t('Scoring...') : t('Submit exam')}
                </button>
              )}
            </div>

            {confirmSubmit && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 sm:p-5 mb-6">
                <p className="text-sm font-semibold text-amber-900">
                  {unanswered === 1
                    ? t('You still have 1 unanswered question. Submit anyway?')
                    : t('You still have {{count}} unanswered questions. Submit anyway?', { count: unanswered })}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold px-6 py-2 text-sm transition-colors"
                  >
                    {submitting ? t('Scoring...') : t('Yes, submit')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmSubmit(false)}
                    className="rounded-lg border border-gray-300 text-gray-700 hover:bg-white font-semibold px-6 py-2 text-sm transition-colors"
                  >
                    {t('Keep working')}
                  </button>
                </div>
              </div>
            )}

            {submitError && <p className="text-sm text-rose-600 mb-10">{submitError}</p>}
          </div>
        </>
      )}

      {exam && stage === 'result' && result && (
        <ResultScreen
          exam={exam}
          result={result}
          onReview={() => {
            setStage('review');
            scrollTop();
          }}
        />
      )}

      {exam && stage === 'review' && result && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 flex-1 w-full">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{t('Answer review')}</p>
              <h1 className="text-xl font-bold text-gray-900">
                {t('{{level}} Level Exam', { level: exam.level })} — {result.score} / {result.maxScore} ({result.percent}%)
              </h1>
            </div>
            <button
              type="button"
              onClick={() => {
                setStage('result');
                scrollTop();
              }}
              className="rounded-lg border border-gray-300 text-gray-700 font-semibold px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
            >
              {t('Back to result')}
            </button>
          </div>

          {sections.map((section, i) => (
            <div key={section.key} className="mb-6">
              <SectionHeader section={section} index={i} />
              <SectionBody
                section={section}
                numbers={numbers}
                answers={answers}
                onChange={() => {}}
                results={result.results}
                transcripts={section.key === 'listening' ? result.transcripts : null}
              />
            </div>
          ))}

          <div className="text-center mb-16">
            <Link
              to="/exams"
              className="inline-flex rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 transition-colors"
            >
              {t('Back to exams')}
            </Link>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
