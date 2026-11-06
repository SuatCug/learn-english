import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetTopicsQuery } from '@/services/topicsApi';
import { useGetMeQuery } from '@/services/usersApi';
import { cloudinaryUrl } from '@/lib/cloudinary';
import FadeImage from '@/components/FadeImage';
import { CATEGORY_ILLUSTRATIONS, CARD_IMAGE_BOX } from '@/lib/categoryIllustrations';

const CATEGORIES = [
  { slug: 'grammar', label: 'Grammar', color: '#1a8ec1' },
  { slug: 'vocabulary', label: 'Vocabulary', color: '#ff6699' },
  { slug: 'reading', label: 'Reading', color: '#ed1c24' },
  { slug: 'writing', label: 'Writing', color: '#a84d98' },
  { slug: 'listening', label: 'Listening', color: '#f7741d' },
];

const DEFAULT_LEVEL = 'A1';

// Yerel takvime göre gün sayacı: gece yarısı değişir, gün içinde sabit kalır.
const localDayNumber = () => {
  const now = new Date();
  return Math.floor((now.getTime() - now.getTimezoneOffset() * 60000) / 86400000);
};

// Günün konusu: konular müfredat sırasıyla her gün bir ilerler (hepsi bitmeden tekrar etmez).
// Kullanıcının tamamladığı konular atlanır; hepsi tamamlandıysa yine tüm listeden seçilir.
// Kategorilere farklı başlangıç kaydırması verilir ki aynı gün hepsi listenin aynı yerinden gelmesin.
const pickTopicOfTheDay = (topics, completedIds, salt) => {
  if (!topics.length) return null;
  const remaining = topics.filter((t) => !completedIds.has(t._id));
  const pool = remaining.length ? remaining : topics;
  return pool[(localDayNumber() + salt * 7) % pool.length];
};

function TopicCard({ category, topic, isLoading }) {
  if (isLoading || !topic) {
    return (
      <div className="rounded-xl border border-[#f0f0f0] bg-white overflow-hidden">
        <div className={`${CARD_IMAGE_BOX} bg-gray-100`} />
        <div className="p-4 min-h-[5.5rem]">
          {!isLoading && <p className="text-sm text-gray-400">No topics yet for this level.</p>}
        </div>
      </div>
    );
  }

  const image = cloudinaryUrl(topic.image, 640) ?? CATEGORY_ILLUSTRATIONS[category.slug];

  return (
    <Link
      to={`/lesson/${topic._id}`}
      className="group block rounded-xl border border-[#f0f0f0] bg-white overflow-hidden shadow-[0_1px_2px_rgba(60,64,67,0.3),0_2px_6px_2px_rgba(60,64,67,0.15)] hover:shadow-[0_8px_17px_rgba(0,0,0,0.2),0_6px_20px_rgba(0,0,0,0.19)] transition-shadow duration-500 ease-in-out"
    >
      <div className={`relative ${CARD_IMAGE_BOX} overflow-hidden bg-gray-100`}>
        <FadeImage src={image} width={1200} height={630} className="w-full h-full object-cover" />
        <span
          className="absolute top-3 right-0 text-white font-bold text-sm px-3 py-1"
          style={{ backgroundColor: category.color }}
        >
          {category.label}
        </span>
      </div>
      <div className="p-4 min-h-[5.5rem] flex flex-col justify-center">
        <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: category.color }}>
          {topic.level} · {category.label}
        </p>
        <p className="mt-1 text-[15px] font-medium text-gray-800 leading-snug line-clamp-2">{topic.title}</p>
      </div>
    </Link>
  );
}

function CategoryTopic({ category, level, completedIds, salt }) {
  const { data, isLoading } = useGetTopicsQuery({ category: category.slug, level });
  const topic = pickTopicOfTheDay(data?.data?.topics ?? [], completedIds, salt);
  return <TopicCard category={category} topic={topic} isLoading={isLoading} />;
}

export default function TopicsOfTheDay() {
  const token = useSelector((state) => state.auth.token);
  const storedUser = useSelector((state) => state.auth.user);
  const { data: meData } = useGetMeQuery(undefined, { skip: !token });
  const user = meData?.data?.user ?? storedUser;

  const level = user?.level || DEFAULT_LEVEL;
  const hasLevel = Boolean(user?.level);
  const completedIds = new Set((user?.progress ?? []).map((p) => p.topicId?.toString()).filter(Boolean));

  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-8 pb-12 sm:pb-16">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-black text-gray-800">
          Topics of the day <span className="text-[#50af31]">· {level}</span>
        </h2>
        <p className="mt-2 text-[15px] text-gray-500">
          {hasLevel ? (
            <>One lesson from each skill, picked for your level. New picks every day!</>
          ) : (
            <>
              Showing {DEFAULT_LEVEL} lessons.{' '}
              <Link to="/placement-test" className="text-[#50af31] font-medium hover:underline">
                Take the placement test
              </Link>{' '}
              to get lessons for your level.
            </>
          )}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {CATEGORIES.map((category, i) => (
          <CategoryTopic key={category.slug} category={category} level={level} completedIds={completedIds} salt={i} />
        ))}
      </div>
    </section>
  );
}
