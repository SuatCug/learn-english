import { Link } from 'react-router-dom';
import { Mic, MessageCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { LEVELS } from '@/lib/constants';
import { levelIllustration } from '@/lib/categoryIllustrations';
import { AI_SECTIONS, conversationPath, levelPath } from '@/lib/aiSections';
import { speechRecognitionSupported } from '@/hooks/useSpeech';
import { useGetConversationsQuery } from '@/services/aiChatApi';

// /topics/:category (CategoryLevelsPage) sayfasıyla aynı tasarım; AI Talk ve AI Chat bu sayfayı kullanır.
// Kapak fotoğrafları: assets/levels/<talk|chat>-<seviye>.webp (yoksa gradyan).
const CONTENT = {
  talk: {
    title: 'Talking Practice',
    cardSubtitle: 'Speaking Practice',
    cardText: (code) => `${code} speaking practice`,
    recentTitle: 'Your recent speaking practice',
    icon: Mic,
    palettes: ['from-teal-500 to-teal-700', 'from-cyan-500 to-cyan-700', 'from-sky-500 to-sky-700', 'from-emerald-600 to-teal-700'],
    recentIconClass: 'bg-teal-50 text-teal-600',
  },
  chat: {
    title: 'Chatting Practice',
    cardSubtitle: 'Chat Practice',
    cardText: (code) => `${code} chat practice`,
    recentTitle: 'Your recent chats',
    icon: MessageCircle,
    palettes: ['from-indigo-500 to-indigo-700', 'from-violet-500 to-indigo-700', 'from-indigo-600 to-blue-700', 'from-blue-600 to-indigo-800'],
    recentIconClass: 'bg-indigo-50 text-indigo-600',
  },
};

export default function AiLevelsPage({ section: sectionKey }) {
  const section = AI_SECTIONS[sectionKey];
  const content = CONTENT[sectionKey];
  const Icon = content.icon;
  const illustrationFor = (levelCode) => levelIllustration(sectionKey, levelCode);

  const { data } = useGetConversationsQuery();
  const recent = (data?.data?.conversations ?? []).filter((c) => section.modes.includes(c.mode)).slice(0, 6);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className={section.bannerClass}>
        <h1 className="max-w-6xl mx-auto px-6 py-3 text-center text-white font-bold tracking-wide uppercase text-sm sm:text-base">
          {content.title}
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-4 text-sm text-gray-500 w-full">{section.label}</div>

      <div className="max-w-6xl mx-auto px-6 pb-20 pt-6 flex-1 w-full">
        {sectionKey === 'talk' && !speechRecognitionSupported && (
          <p className="mb-6 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Tarayıcın sesli konuşmayı desteklemiyor. Mikrofonla konuşmak için Chrome veya Edge kullan; bu tarayıcıda
            yazarak devam edebilirsin.
          </p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEVELS.map((level, index) => (
            <Link
              key={level.code}
              to={levelPath(sectionKey, level.code)}
              className="rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div
                className={`relative h-48 flex items-center justify-center overflow-hidden ${
                  illustrationFor(level.code) ? '' : `bg-gradient-to-br ${content.palettes[index % content.palettes.length]}`
                }`}
              >
                {illustrationFor(level.code) ? (
                  <img src={illustrationFor(level.code)} alt="" className="w-full h-full object-cover" />
                ) : (
                  <Icon size={56} strokeWidth={1.25} className="text-white/90" aria-hidden="true" />
                )}
                <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-xs font-bold text-gray-700 shadow">
                  {level.code}
                </span>
                <span className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm px-4 py-2.5">
                  <span className="block text-white font-bold text-sm leading-tight">{level.name}</span>
                  <span className="block text-white/80 text-xs">{content.cardSubtitle}</span>
                </span>
              </div>
              <div className="p-4 bg-white">
                <p className="text-sm font-medium text-gray-800 leading-snug">{content.cardText(level.code)}</p>
              </div>
            </Link>
          ))}
        </div>

        {recent.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-4 text-base font-bold text-gray-900">{content.recentTitle}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recent.map((c) => (
                <Link
                  key={c._id}
                  to={conversationPath(c)}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow"
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${content.recentIconClass}`}>
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-gray-800">{c.title}</span>
                    <span className="block text-xs text-gray-400">
                      {c.level} · {new Date(c.updatedAt).toLocaleDateString('tr-TR')}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
