import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Clock, ListChecks, Headphones, BookOpen, SpellCheck, Languages, PenLine, CheckCircle2, RotateCcw } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useGetExamsQuery } from '@/services/examsApi';
import { LEVELS } from '@/lib/constants';
import { EXAM_LEVEL_STYLES, EXAM_SECTION_ICONS } from '@/lib/exams';

const SECTION_ICON_COMPONENTS = { Headphones, BookOpen, SpellCheck, Languages, PenLine };

function SectionChip({ section }) {
  const Icon = SECTION_ICON_COMPONENTS[EXAM_SECTION_ICONS[section.key]] ?? ListChecks;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-50 border border-gray-200 px-2.5 py-1 text-xs text-gray-600">
      <Icon size={13} strokeWidth={2} aria-hidden="true" />
      {section.label} · {section.questions}
    </span>
  );
}

function ExamCard({ exam, result }) {
  const levelInfo = LEVELS.find((l) => l.code === exam.level);
  const style = EXAM_LEVEL_STYLES[exam.level];

  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className={`${style.banner} px-6 py-5 flex items-center gap-4`}>
        <span className="w-14 h-14 shrink-0 rounded-xl bg-white/20 border border-white/40 flex items-center justify-center text-2xl font-extrabold text-white">
          {exam.level}
        </span>
        <div className="min-w-0">
          <p className="text-white/80 text-xs font-semibold uppercase tracking-wide">{levelInfo?.name}</p>
          <h2 className="text-white text-lg font-bold">{exam.title}</h2>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600 mb-4">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={16} aria-hidden="true" /> {exam.durationMinutes} minutes
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ListChecks size={16} aria-hidden="true" /> {exam.maxScore} questions
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {exam.sections.map((section) => (
            <SectionChip key={section.key} section={section} />
          ))}
        </div>

        {result ? (
          <div
            className={`flex items-start gap-3 rounded-xl border p-3 mb-5 text-sm ${
              result.passed ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-amber-200 bg-amber-50 text-amber-800'
            }`}
          >
            {result.passed ? (
              <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            ) : (
              <RotateCcw size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            )}
            <span>
              Last result: <strong>{result.score} / {result.maxScore}</strong> ({result.percent}%) —{' '}
              {result.passed ? 'Passed' : 'Not passed yet'}
              {result.attempts > 1 && (
                <span className="block text-xs opacity-80">
                  Best score: {result.bestScore} / {result.maxScore} · {result.attempts} attempts
                </span>
              )}
            </span>
          </div>
        ) : (
          <p className="text-sm text-gray-500 mb-5">
            You need {exam.passPercent}% or more to pass this exam.
          </p>
        )}

        <Link
          to={`/exams/${exam.level}`}
          className={`mt-auto inline-flex justify-center rounded-lg ${style.button} text-white font-semibold px-6 py-3 transition-colors`}
        >
          {result ? 'Retake the exam' : 'Start the exam'}
        </Link>
      </div>
    </div>
  );
}

export default function ExamsPage() {
  const user = useSelector((state) => state.auth.user);
  const { data, isLoading, isError } = useGetExamsQuery();
  const exams = data?.data?.exams ?? [];
  const results = user?.examResults ?? [];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="bg-emerald-600">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <p className="text-emerald-100 text-xs font-semibold uppercase tracking-widest mb-2">Exams</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Level exams: A1 – B2</h1>
          <p className="text-emerald-50 text-sm sm:text-base max-w-3xl leading-relaxed">
            Check whether you have really mastered a level. Each exam has five parts — Listening, Reading, Grammar,
            Vocabulary and Writing — and lasts {exams[0]?.durationMinutes ?? 85} minutes.
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-10">
        {isLoading && <p className="text-center text-sm text-gray-400 py-10">Loading exams...</p>}
        {isError && (
          <p className="text-center text-sm text-rose-600 py-10">The exams couldn't be loaded. Please try again later.</p>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {exams.map((exam) => (
            <ExamCard key={exam.level} exam={exam} result={results.find((r) => r.level === exam.level)} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
