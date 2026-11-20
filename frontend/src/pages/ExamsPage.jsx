import { useCallback, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ClipboardCheck, CheckCircle2, RotateCcw } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ExamOverviewModal from '@/components/exams/ExamOverviewModal';
import StartConfirmModal from '@/components/exams/StartConfirmModal';
import { useGetExamsQuery } from '@/services/examsApi';
import { LEVELS } from '@/lib/constants';
import { levelIllustration } from '@/lib/categoryIllustrations';
import { useTranslation } from 'react-i18next';
import usePageTitle from '@/hooks/usePageTitle';

// Grammar vb. seviye sayfalarıyla (CategoryLevelsPage) aynı tasarım: her seviye için bir kart.
// Karta basınca sınav özeti penceresi açılır; "Start exam" ile sınav (/exams/A1) doğrudan başlar.
// /exams/A1'e doğrudan gelinirse (navbar, sayfa yenileme) ExamPage buraya { open: 'A1' } ile yönlendirir.
// Kapak fotoğrafları: assets/levels/exams-<seviye>.webp (yoksa yeşil gradyan + ikon).
const PALETTES = [
  'from-emerald-500 to-emerald-700',
  'from-emerald-600 to-teal-700',
  'from-green-600 to-emerald-800',
  'from-teal-600 to-emerald-800',
];

// Sınava girildiyse kartın altında küçük sonuç satırı.
function ResultLine({ result }) {
  const { t } = useTranslation();
  return result.passed ? (
    <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
      <CheckCircle2 size={14} aria-hidden="true" /> {t('Passed · {{percent}}%', { percent: result.percent })}
    </span>
  ) : (
    <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-gray-500">
      <RotateCcw size={13} aria-hidden="true" /> {t('Last try · {{percent}}%', { percent: result.percent })}
    </span>
  );
}

export default function ExamsPage() {
  const { t } = useTranslation();
  usePageTitle(t('Level Exams'));
  const user = useSelector((state) => state.auth.user);
  const { data, isError } = useGetExamsQuery();
  const exams = data?.data?.exams ?? [];
  const results = user?.examResults ?? [];

  const location = useLocation();
  const navigate = useNavigate();
  const [openLevel, setOpenLevel] = useState(location.state?.open ?? null);
  const openExam = exams.find((e) => e.level === openLevel);
  const closeOverview = useCallback(() => setOpenLevel(null), []);
  // "Start exam"dan sonra "Are you ready?" uyarısı; "Not yet" özete geri döner.
  const [confirming, setConfirming] = useState(false);
  const cancelConfirm = useCallback(() => setConfirming(false), []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="bg-emerald-600">
        <h1 className="max-w-6xl mx-auto px-6 py-3 text-center text-white font-bold tracking-wide uppercase text-sm sm:text-base">
          {t('Level Exams')}
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20 pt-6 flex-1 w-full">
        {isError && (
          <p className="mb-6 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {t("The exam details couldn't be loaded. Please try again later.")}
          </p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEVELS.map((level, index) => {
            const exam = exams.find((e) => e.level === level.code);
            const result = results.find((r) => r.level === level.code);
            const image = levelIllustration('exams', level.code);
            return (
              <Link
                key={level.code}
                to={`/exams/${level.code}`}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenLevel(level.code);
                }}
                className="rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div
                  className={`relative h-48 flex items-center justify-center overflow-hidden ${
                    image ? '' : `bg-gradient-to-br ${PALETTES[index % PALETTES.length]}`
                  }`}
                >
                  {image ? (
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <ClipboardCheck size={56} strokeWidth={1.25} className="text-white/90" aria-hidden="true" />
                  )}
                  <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-xs font-bold text-gray-700 shadow">
                    {level.code}
                  </span>
                  <span className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm px-4 py-2.5">
                    <span className="block text-white font-bold text-sm leading-tight">{t(level.name)}</span>
                    <span className="block text-white/80 text-xs">{t('Level Exam')}</span>
                  </span>
                </div>
                <div className="p-4 bg-white">
                  <p className="text-sm font-medium text-gray-800 leading-snug">
                    {t('{{level}} level exam', { level: level.code })}
                    {exam && ` · ${t('{{minutes}} min, {{count}} questions', { minutes: exam.durationMinutes, count: exam.maxScore })}`}
                  </p>
                  {result && <ResultLine result={result} />}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {openExam && !confirming && (
        <ExamOverviewModal
          exam={openExam}
          levelName={t(LEVELS.find((l) => l.code === openExam.level)?.name ?? '')}
          previousResult={results.find((r) => r.level === openExam.level)}
          onStart={() => setConfirming(true)}
          onClose={closeOverview}
        />
      )}
      {openExam && confirming && (
        <StartConfirmModal
          testName={t('{{level}} exam', { level: openExam.level })}
          questionCount={openExam.maxScore}
          durationMinutes={openExam.durationMinutes}
          onConfirm={() => navigate(`/exams/${openExam.level}`, { state: { start: true } })}
          onCancel={cancelConfirm}
        />
      )}

      <Footer />
    </div>
  );
}
