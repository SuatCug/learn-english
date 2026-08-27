import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CATEGORIES, LEVELS, CATEGORY_BANNER_CLASS, DEFAULT_BANNER_CLASS } from '@/lib/constants';
import grammarIllustration from '@/assets/grammar-illustration.png';
import vocabularyIllustration from '@/assets/vocabulary-illustration.png';
import writingIllustration from '@/assets/writing-illustration.png';
import readingIllustration from '@/assets/reading-illustration.png';

const CATEGORY_ILLUSTRATIONS = {
  grammar: grammarIllustration,
  vocabulary: vocabularyIllustration,
  writing: writingIllustration,
  reading: readingIllustration,
};

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
  const { category } = useParams();
  const categoryInfo = CATEGORIES.find((c) => c.slug === category);
  const categoryLabel = categoryInfo?.label ?? category;
  const illustration = CATEGORY_ILLUSTRATIONS[category];
  const bannerClass = CATEGORY_BANNER_CLASS[category] ?? DEFAULT_BANNER_CLASS;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className={bannerClass}>
        <h1 className="max-w-6xl mx-auto px-6 py-3 text-center text-white font-bold tracking-wide uppercase text-sm sm:text-base">
          {categoryLabel} Lessons and Exercises
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-4 text-sm text-gray-500">{categoryLabel}</div>

      <div className="max-w-6xl mx-auto px-6 pb-20 pt-6 flex-1 w-full">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEVELS.map((level, index) => (
            <Link
              key={level.code}
              to={`/topics/${category}/${level.code}`}
              className="rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div
                className={`relative h-48 flex items-center justify-center overflow-hidden ${
                  illustration ? '' : `bg-gradient-to-br ${PALETTES[index % PALETTES.length]}`
                }`}
              >
                {illustration ? (
                  <img src={illustration} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl">{categoryInfo?.icon}</span>
                )}
                <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-xs font-bold text-gray-700 shadow">
                  {level.code}
                </span>
                <span className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm px-4 py-2.5">
                  <span className="block text-white font-bold text-sm leading-tight">{level.name}</span>
                  <span className="block text-white/80 text-xs">{categoryLabel} Exercises</span>
                </span>
              </div>
              <div className="p-4 bg-white">
                <p className="text-sm font-medium text-gray-800 leading-snug">
                  {level.code} {categoryLabel} lessons and exercises
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
