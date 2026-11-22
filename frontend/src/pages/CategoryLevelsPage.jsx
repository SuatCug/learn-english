import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CATEGORIES, LEVELS, CATEGORY_BANNER_CLASS, DEFAULT_BANNER_CLASS } from '@/lib/constants';
import { levelIllustration } from '@/lib/categoryIllustrations';
import { useTranslation } from 'react-i18next';
import usePageTitle from '@/hooks/usePageTitle';
import { CategoryIcon } from '@/components/CategoryIcon';

const PALETTES = [
  'from-emerald-500 to-emerald-700',
  'from-teal-500 to-teal-700',
  'from-cyan-500 to-cyan-700',
  'from-sky-500 to-sky-700',
  'from-lime-500 to-lime-700',
  'from-green-500 to-green-700',
  'from-emerald-600 to-teal-700',
];

export default function CategoryLevelsPage() {
  const { t } = useTranslation();
  const { category } = useParams();
  const categoryInfo = CATEGORIES.find((c) => c.slug === category);
  const categoryLabel = t(categoryInfo?.label ?? category);
  usePageTitle(t('{{category}} Lessons and Exercises', { category: categoryLabel }));
  // Her seviye kartının kendi kapak fotoğrafı var (lib/categoryIllustrations.js).
  const illustrationFor = (levelCode) => levelIllustration(category, levelCode);
  const bannerClass = CATEGORY_BANNER_CLASS[category] ?? DEFAULT_BANNER_CLASS;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className={bannerClass}>
        <h1 className="max-w-6xl mx-auto px-6 py-3 text-center text-white font-bold tracking-wide uppercase text-sm sm:text-base">
          {t('{{category}} Lessons and Exercises', { category: categoryLabel })}
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20 pt-6 flex-1 w-full">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {LEVELS.map((level, index) => (
            <Link
              key={level.code}
              to={`/topics/${category}/${level.code}`}
              className="rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div
                className={`relative h-32 sm:h-48 flex items-center justify-center overflow-hidden ${
                  illustrationFor(level.code) ? '' : `bg-gradient-to-br ${PALETTES[index % PALETTES.length]}`
                }`}
              >
                {illustrationFor(level.code) ? (
                  <img src={illustrationFor(level.code)} alt="" className="w-full h-full object-cover" />
                ) : (
                  <CategoryIcon slug={categoryInfo?.slug} size={56} color="white" strokeWidth={1.25} />
                )}
                <span className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/90 flex items-center justify-center text-xs font-bold text-gray-700 shadow">
                  {level.code}
                </span>
                <span className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm px-2.5 py-1.5 sm:px-4 sm:py-2.5">
                  <span className="block text-white font-bold text-sm leading-tight">{t(level.name)}</span>
                  <span className="block text-white/80 text-xs">{t('{{category}} Exercises', { category: categoryLabel })}</span>
                </span>
              </div>
              <div className="p-2.5 sm:p-4 bg-white">
                <p className="text-sm font-medium text-gray-800 leading-snug">
                  {t('{{level}} {{category}} lessons and exercises', { level: level.code, category: categoryLabel })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
