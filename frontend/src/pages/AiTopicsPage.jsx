import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BrandMark from '@/components/BrandMark';
import { LEVELS } from '@/lib/constants';
import { CARD_IMAGE_BOX } from '@/lib/categoryIllustrations';
import { AI_SECTIONS, conversationPath, aiTopicImage } from '@/lib/aiSections';
import { getErrorMessage } from '@/lib/getErrorMessage';
import { speechRecognitionSupported } from '@/hooks/useSpeech';
import { aiChatApi, useGetTopicsQuery, useCreateConversationMutation } from '@/services/aiChatApi';
import { useTranslation } from 'react-i18next';
import { localized } from '@/lib/localize';
import usePageTitle from '@/hooks/usePageTitle';
import { tk } from '@/i18n';

// /topics/:category/:level (TopicListPage) ile aynı kart tasarımı; kapakta görsel yerine gradyan + emoji.
// AI Talk ve AI Chat aynı konuları kullanır; renkler bölüme göre.
const SECTION_UI = {
  talk: {
    mode: 'talk',
    heading: tk('{{level}} Talking Topics'),
    crumb: tk('{{level}} speaking topics'),
    crumbHover: 'hover:text-teal-600',
    palettes: [
      'from-teal-500 to-teal-700',
      'from-cyan-500 to-teal-700',
      'from-emerald-500 to-teal-700',
      'from-teal-600 to-cyan-800',
      'from-sky-500 to-teal-600',
      'from-teal-500 to-emerald-800',
      'from-cyan-600 to-teal-800',
    ],
  },
  chat: {
    mode: 'chat',
    heading: tk('{{level}} Chatting Topics'),
    crumb: tk('{{level}} chat topics'),
    crumbHover: 'hover:text-indigo-600',
    palettes: [
      'from-indigo-500 to-indigo-700',
      'from-violet-500 to-indigo-700',
      'from-blue-500 to-indigo-700',
      'from-indigo-600 to-purple-700',
      'from-sky-500 to-indigo-600',
      'from-indigo-500 to-blue-800',
      'from-purple-500 to-indigo-700',
    ],
  },
};

function PlaceholderCard() {
  return (
    <div className="rounded-xl border border-[#f0f0f0] bg-white overflow-hidden">
      <div className={`${CARD_IMAGE_BOX} w-full bg-gray-100`} />
      <div className="h-7 w-full bg-gray-50" />
      <div className="p-4 min-h-[5.5rem]" />
    </div>
  );
}

function TopicCard({ topic, index, level, bannerClass, palettes, disabled, onStart }) {
  const image = aiTopicImage(level, topic.slug);
  return (
    <button
      type="button"
      onClick={() => !disabled && onStart()}
      aria-busy={disabled || undefined}
      className="relative block w-full cursor-pointer text-left rounded-xl border border-[#f0f0f0] bg-white overflow-hidden shadow-[0_1px_2px_rgba(60,64,67,0.3),0_2px_6px_2px_rgba(60,64,67,0.15)] hover:shadow-[0_8px_17px_rgba(0,0,0,0.2),0_6px_20px_rgba(0,0,0,0.19)] transition-shadow duration-500 ease-in-out"
    >
      <div
        className={`relative ${CARD_IMAGE_BOX} flex items-center justify-center overflow-hidden ${
          image ? 'bg-gray-100' : `bg-gradient-to-br ${palettes[index % palettes.length]}`
        }`}
      >
        {/* Kart resmi varsa o, yoksa gradyan + emoji. */}
        {image ? (
          <img src={image} alt="" className="w-full h-full object-cover" loading={index < 6 ? 'eager' : 'lazy'} />
        ) : (
          <span className="text-6xl drop-shadow-sm" aria-hidden="true">
            {topic.emoji}
          </span>
        )}
        <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-xs font-bold text-gray-700 shadow">
          {level}
        </span>
      </div>
      <div className={`${bannerClass} px-3 py-1.5 flex items-center justify-center gap-1.5`}>
        <BrandMark size={16} />
        <span className="text-white text-xs font-bold tracking-wide">learnenglish</span>
      </div>
      <div className="p-4 bg-white text-center min-h-[5.5rem] flex flex-col items-center justify-center gap-1">
        <p className="text-sm font-medium text-gray-800 leading-snug line-clamp-1">{localized(topic)}</p>
        <p className="text-xs text-gray-500 leading-snug line-clamp-2">{localized(topic, 'description')}</p>
      </div>
    </button>
  );
}

export default function AiTopicsPage({ section: sectionKey = 'chat' }) {
  const { t } = useTranslation();
  const { level } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const section = AI_SECTIONS[sectionKey];
  const ui = SECTION_UI[sectionKey];
  usePageTitle(t(ui.heading, { level }));
  const validLevel = LEVELS.some((l) => l.code === level);

  const { data, isLoading, isError } = useGetTopicsQuery(level, { skip: !validLevel });
  const topics = data?.data?.topics ?? [];

  const [createConversation] = useCreateConversationMutation();
  const [starting, setStarting] = useState(null); // tıklanan konunun slug'ı
  const [error, setError] = useState('');

  if (!validLevel) return <Navigate to={section.path} replace />;

  const start = async (topic) => {
    setError('');
    setStarting(topic.slug);
    try {
      const res = await createConversation({ mode: ui.mode, level, topic: topic.slug }).unwrap();
      const { conversation } = res.data;
      // Sohbet ekranı yükleniyor göstermeden, AI'nın ilk mesajıyla hemen açılsın.
      await dispatch(aiChatApi.util.upsertQueryData('getConversation', conversation._id, res));
      navigate(conversationPath(conversation));
    } catch (err) {
      setError(getErrorMessage(err));
      setStarting(null);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className={section.bannerClass}>
        <h1 className="max-w-6xl mx-auto px-6 py-3 text-center text-white font-bold tracking-wide uppercase text-sm sm:text-base">
          {t(ui.heading, { level })}
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-4 text-sm text-gray-500 w-full">
        <Link to={section.path} className={ui.crumbHover}>
          {t(section.label)}
        </Link>{' '}
        / {t(ui.crumb, { level })}
      </div>

      {sectionKey === 'talk' && !speechRecognitionSupported && (
        <div className="max-w-6xl mx-auto px-6 pt-4 w-full">
          <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {t(
              "Your browser doesn't support voice conversation. Use Chrome or Edge to talk with your microphone; in this browser you can continue by typing."
            )}
          </p>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 pb-20 pt-6 flex-1 w-full">
        {isError && <p className="text-rose-500 text-sm py-10">{t("Couldn't load topics. Please try again.")}</p>}
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        {!isError && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <PlaceholderCard key={i} />)
              : topics.map((topic, index) => (
                  <TopicCard
                    key={topic.slug}
                    topic={topic}
                    index={index}
                    level={level}
                    bannerClass={section.bannerClass}
                    palettes={ui.palettes}
                    disabled={starting !== null}
                    onStart={() => start(topic)}
                  />
                ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
