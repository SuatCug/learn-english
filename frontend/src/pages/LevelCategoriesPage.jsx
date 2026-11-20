import { useParams, Link, Navigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CATEGORIES, LEVELS } from '@/lib/constants';
import { CATEGORY_ILLUSTRATIONS } from '@/lib/categoryIllustrations';
import { tk } from '@/i18n';
import { Trans, useTranslation } from 'react-i18next';
import usePageTitle from '@/hooks/usePageTitle';

const DESCRIPTIONS = {
  grammar: tk('Learn grammar topics with clear examples and reinforce them with exercises.'),
  vocabulary: tk('Expand your everyday English with vocabulary sets tailored to this level.'),
  reading: tk('Practice with reading passages and comprehension questions.'),
  writing: tk('Improve your writing skills with prompts and get instant, detailed feedback.'),
  listening: tk('Listen to dialogues, talks and reports, then answer comprehension questions.'),
};

// Footer'daki "Levels" listesinden bir seviyeye (ör. A1) tıklandığında, CategorySection'daki
// kart tasarımının aynısıyla bu sefer kategori seçtirir — seçilen kategori zaten bu seviyeye gider.
export default function LevelCategoriesPage() {
  const { t } = useTranslation();
  const { level } = useParams();
  const levelInfo = LEVELS.find((l) => l.code === level);
  usePageTitle(levelInfo ? `${levelInfo.code} ${t(levelInfo.name)}` : null);

  if (!levelInfo) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="bg-emerald-600">
        <h1 className="max-w-6xl mx-auto px-6 py-4 text-center text-white font-bold tracking-wide uppercase text-sm sm:text-base">
          {levelInfo.code} {t(levelInfo.name)}
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20 pt-10 flex-1 w-full">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center text-balance">
          <Trans
            i18nKey="What would you like to <hl>study</hl> at {{level}}?"
            values={{ level: levelInfo.code }}
            components={{ hl: <span className="text-emerald-600" /> }}
          />
        </h2>
        <p className="text-gray-500 text-center mt-3 max-w-xl mx-auto">
          {t('Pick one of the categories and start learning right away.')}
        </p>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <div
              key={category.slug}
              className="rounded-2xl border border-emerald-100 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={CATEGORY_ILLUSTRATIONS[category.slug]}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-lg font-bold text-gray-900">{t(category.label)}</h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{t(DESCRIPTIONS[category.slug])}</p>
                <Link
                  to={`/topics/${category.slug}/${levelInfo.code}`}
                  className="mt-4 inline-block text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  {t('Go to lessons →')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
