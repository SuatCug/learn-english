import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Timer, ListChecks, Trophy, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ExamIllustration from '@/components/exams/ExamIllustration';
import { useGetExamsQuery } from '@/services/examsApi';
import { LEVELS } from '@/lib/constants';
import { EXAM_SECTION_ICONS } from '@/lib/exams';

// Seviyeler renkle değil, zorluk çubuklarıyla ayrılır: A1 = 1 dolu, B2 = 4 dolu.
function DifficultyBars({ filled, total = 4 }) {
  return (
    <div className="flex items-end gap-1" aria-label={`Difficulty ${filled} of ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`w-1.5 rounded-full ${i < filled ? 'bg-emerald-600' : 'bg-gray-200'}`}
          style={{ height: `${8 + i * 5}px` }}
        />
      ))}
    </div>
  );
}

function ResultBadge({ result }) {
  if (!result) {
    return <span className="text-xs font-medium text-gray-400">Not taken yet</span>;
  }
  return result.passed ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
      <CheckCircle2 size={14} aria-hidden="true" /> Passed · {result.percent}%
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
      <RotateCcw size={13} aria-hidden="true" /> Last try · {result.percent}%
    </span>
  );
}

function ExamCard({ exam, index, result }) {
  const levelInfo = LEVELS.find((l) => l.code === exam.level);

  return (
    <div className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200">
      <div className="flex items-start justify-between">
        <span className="text-5xl font-extrabold tracking-tight text-emerald-600">{exam.level}</span>
        <DifficultyBars filled={index + 1} />
      </div>
      <p className="mt-2 font-semibold text-gray-900">{levelInfo?.name}</p>
      <p className="text-sm text-gray-500">Level exam</p>

      <ul className="mt-5 space-y-2.5 border-t border-gray-100 pt-5 text-sm">
        {exam.sections.map((section) => {
          const Icon = EXAM_SECTION_ICONS[section.key] ?? ListChecks;
          return (
            <li key={section.key} className="flex items-center gap-3 text-gray-700">
              <Icon size={17} className="shrink-0 text-emerald-600" aria-hidden="true" />
              <span className="flex-1">{section.label}</span>
              <span className="tabular-nums text-gray-400">{section.questions}</span>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-500">
        <span>
          {exam.durationMinutes} min · {exam.maxScore} questions
        </span>
        <ResultBadge result={result} />
      </div>

      <Link
        to={`/exams/${exam.level}`}
        className={`mt-5 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition-colors ${
          result
            ? 'border border-emerald-600 text-emerald-700 hover:bg-emerald-50'
            : 'bg-emerald-600 text-white hover:bg-emerald-700'
        }`}
      >
        {result ? 'Retake exam' : 'Start exam'}
        <ArrowRight size={18} aria-hidden="true" />
      </Link>
    </div>
  );
}

export default function ExamsPage() {
  const user = useSelector((state) => state.auth.user);
  const { data, isLoading, isError } = useGetExamsQuery();
  const exams = data?.data?.exams ?? [];
  const results = user?.examResults ?? [];
  const sample = exams[0];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <section className="relative isolate overflow-hidden flex-1 bg-gradient-to-b from-emerald-50/80 via-white to-emerald-50/50">
        <svg
          className="absolute inset-x-0 bottom-0 -z-10 w-full h-24 sm:h-32 text-emerald-100/70"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path fill="currentColor" d="M0 70c180-40 360-40 540-10s360 50 540 20 270-50 360-40v80H0Z" />
        </svg>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-16 sm:pb-24">
          <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900">
                Level <span className="text-emerald-600">Exams</span>
              </h1>
              <p className="mt-3 max-w-2xl text-base sm:text-lg text-gray-600">
                Check whether you've really mastered a level. Each exam covers Listening, Reading, Grammar, Vocabulary
                and Writing.
              </p>
              {sample && (
                <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray-700">
                  <span className="inline-flex items-center gap-2">
                    <Timer size={20} className="text-emerald-600" aria-hidden="true" />
                    <strong className="font-semibold text-gray-900">{sample.durationMinutes} minutes</strong>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <ListChecks size={20} className="text-emerald-600" aria-hidden="true" />
                    <strong className="font-semibold text-gray-900">{sample.maxScore} questions</strong>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Trophy size={20} className="text-emerald-600" aria-hidden="true" />
                    <strong className="font-semibold text-gray-900">{sample.passPercent}% to pass</strong>
                  </span>
                </div>
              )}
            </div>
            <ExamIllustration className="hidden lg:block w-full max-w-[320px] mx-auto" />
          </div>

          {isLoading && <p className="py-16 text-center text-sm text-gray-400">Loading exams...</p>}
          {isError && (
            <p className="py-16 text-center text-sm text-rose-600">
              The exams couldn't be loaded. Please try again later.
            </p>
          )}

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {exams.map((exam, index) => (
              <ExamCard
                key={exam.level}
                exam={exam}
                index={index}
                result={results.find((r) => r.level === exam.level)}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
