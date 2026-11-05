import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BrandMark from '@/components/BrandMark';
import { useGetTopicsQuery, topicsApi } from '@/services/topicsApi';
import { CATEGORIES, CATEGORY_BANNER_CLASS, DEFAULT_BANNER_CLASS } from '@/lib/constants';
import grammarIllustration from '@/assets/home-grammar.webp';
import vocabularyIllustration from '@/assets/home-vocabulary.webp';
import writingIllustration from '@/assets/home-writing.webp';
import readingIllustration from '@/assets/home-reading.webp';

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

// Veri gelene kadar kartların yerini tutan sade, animasyonsuz kutu (sayfa zıplamasın diye aynı boyutta).
function PlaceholderCard() {
  return (
    <div className="rounded-sm border border-[#f0f0f0] bg-white overflow-hidden">
      <div className="h-44 w-full bg-gray-100" />
      <div className="h-7 w-full bg-gray-50" />
      <div className="p-4 min-h-[4.5rem]" />
    </div>
  );
}

function TopicCard({
  topic,
  index,
  level,
  categoryInfo,
  illustration,
  bannerClass,
  onPrefetch,
}) {
  return (
    <div>
      <Link
        to={`/lesson/${topic._id}`}
        onPointerEnter={() => onPrefetch(topic._id)}
        onPointerDown={() => onPrefetch(topic._id)}
        onFocus={() => onPrefetch(topic._id)}
        className="relative block rounded-sm border border-[#f0f0f0] bg-white overflow-hidden shadow-[0_1px_2px_rgba(60,64,67,0.3),0_2px_6px_2px_rgba(60,64,67,0.15)] hover:shadow-[0_8px_17px_rgba(0,0,0,0.2),0_6px_20px_rgba(0,0,0,0.19)] transition-shadow duration-500 ease-in-out"
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
          <BrandMark size={16} />
          <span className="text-white text-xs font-bold tracking-wide">learnenglish</span>
        </div>
        <div className="p-4 bg-white text-center min-h-[4.5rem] flex items-center justify-center">
          <p className="text-sm font-medium text-gray-800 leading-snug line-clamp-2">{topic.title}</p>
        </div>
      </Link>
    </div>
  );
}

export default function TopicListPage() {
  const { category, level } = useParams();
  const categoryInfo = CATEGORIES.find((c) => c.slug === category);
  const categoryLabel = categoryInfo?.label ?? category;

  const { data, isLoading, isError } = useGetTopicsQuery({ category, level });
  const topics = data?.data?.topics ?? [];
  const illustration = CATEGORY_ILLUSTRATIONS[category];
  const bannerClass = CATEGORY_BANNER_CLASS[category] ?? DEFAULT_BANNER_CLASS;

  // Kullanıcı karta dokunduğu/üstüne geldiği an dersin verisini (konu + sorular) önceden çeker;
  // böylece tıklayınca LessonPage cache'ten anında dolar, skeleton görünmeden ders ekranı açılır.
  const prefetchTopic = topicsApi.usePrefetch('getTopic');
  const prefetchQuestions = topicsApi.usePrefetch('getTopicQuestions');
  const warmLesson = (id) => {
    prefetchTopic(id);
    prefetchQuestions(id);
  };

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
        {isError && <p className="text-rose-500 text-sm py-10">Couldn't load topics. Please try again.</p>}
        {!isLoading && !isError && topics.length === 0 && (
          <p className="text-gray-400 text-sm py-10">No topics yet for this level.</p>
        )}

        {!isError && (isLoading || topics.length > 0) && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <PlaceholderCard key={i} />)
              : topics.map((topic, index) => (
                  <TopicCard
                    key={topic._id}
                    topic={topic}
                    index={index}
                    level={level}
                    categoryInfo={categoryInfo}
                    illustration={illustration}
                    bannerClass={bannerClass}
                    onPrefetch={warmLesson}
                  />
                ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
