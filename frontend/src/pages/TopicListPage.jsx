import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useGetTopicsQuery } from '@/services/topicsApi';
import { CATEGORIES, CATEGORY_BANNER_CLASS, DEFAULT_BANNER_CLASS } from '@/lib/constants';
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
];

export default function TopicListPage() {
  const { category, level } = useParams();
  const categoryInfo = CATEGORIES.find((c) => c.slug === category);
  const categoryLabel = categoryInfo?.label ?? category;

  const { data, isLoading, isError } = useGetTopicsQuery({ category, level });
  const topics = data?.data?.topics ?? [];
  const illustration = CATEGORY_ILLUSTRATIONS[category];
  const bannerClass = CATEGORY_BANNER_CLASS[category] ?? DEFAULT_BANNER_CLASS;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className={bannerClass}>
        <h1 className="max-w-6xl mx-auto px-6 py-3 text-center text-white font-bold tracking-wide uppercase text-sm sm:text-base">
          {level} {categoryLabel} Lessons and Exercises
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-4 text-sm text-gray-500">
        <Link to="/" className="hover:text-emerald-600">
          {categoryLabel}
        </Link>{' '}
        / {level} {categoryLabel} lessons and exercises
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20 pt-6 flex-1 w-full">
        {isLoading && <p className="text-gray-400 text-sm py-10">Loading topics...</p>}
        {isError && <p className="text-rose-500 text-sm py-10">Couldn't load topics. Please try again.</p>}
        {!isLoading && !isError && topics.length === 0 && (
          <p className="text-gray-400 text-sm py-10">No topics yet for this level.</p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => (
            <Link
              key={topic._id}
              to={`/lesson/${topic._id}`}
              className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            >
              <div
                className={`relative h-44 flex items-center justify-center overflow-hidden ${
                  illustration ? '' : `bg-gradient-to-br ${PALETTES[index % PALETTES.length]}`
                }`}
              >
                {illustration ? (
                  <img src={illustration} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl">{categoryInfo?.icon}</span>
                )}
                <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-xs font-bold text-gray-700 shadow">
                  {level}
                </span>
              </div>
              <div className={`${bannerClass} px-3 py-1.5 flex items-center justify-center gap-1.5`}>
                <span className="text-sm">🍃</span>
                <span className="text-white text-xs font-bold tracking-wide">learnenglish</span>
              </div>
              <div className="p-4 bg-white text-center min-h-[4.5rem] flex items-center justify-center">
                <p className="text-sm font-medium text-gray-800 leading-snug line-clamp-2">{topic.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
