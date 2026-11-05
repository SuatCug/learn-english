import { Link } from 'react-router-dom';
import { BookOpen, MessageSquareText, Newspaper, PenLine, BarChart3, Users } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { LEVELS } from '@/lib/constants';
// Fotoğraf: Unsplash (photo-1513258496099-48168024aec0), Unsplash lisansı ile ücretsiz kullanım.
// Kişi orijinalde solda; yazı sola geldiği için görsel yatayda aynalanıyor (-scale-x-100).
import heroImage from '@/assets/home-hero.webp';
// Kart fotoğrafları da Unsplash'tan (900x500 kırpılmış webp).
import grammarImage from '@/assets/home-grammar.webp'; // photo-1501504905252-473c47e087f8
import vocabularyImage from '@/assets/home-vocabulary.webp'; // photo-1503676260728-1c00da094a0b
import readingImage from '@/assets/home-reading.webp'; // photo-1497633762265-9d179a990aa6
import writingImage from '@/assets/home-writing.webp'; // photo-1455390582262-044cdead277a
import levelTestImage from '@/assets/home-level-test.webp'; // photo-1606326608606-aa0b62935f2b
import classroomsImage from '@/assets/home-classrooms.webp'; // photo-1571260899304-425eee4c7efc

const BRAND = '#50af31';

// Her kart: üstte görsel + sağ üstte renkli etiket + sol altta ikon; altında renkli başlık,
// seviye linkleri içeren açıklama ve gri çerçeveli buton.
const CARDS = [
  {
    key: 'grammar',
    tag: 'Grammar Points',
    title: 'Grammar Lessons',
    color: '#1a8ec1',
    image: grammarImage,
    Icon: BookOpen,
    intro: 'Study the grammar lessons that are typically included in each level:',
    outro: 'There are exercises and an explanation in each lesson, and feedback for every single question!',
    levelBase: '/topics/grammar',
    to: '/topics/grammar',
    cta: 'Go to the lessons',
  },
  {
    key: 'vocabulary',
    tag: 'Vocabulary',
    title: 'Vocabulary Lessons',
    color: '#ff6699',
    image: vocabularyImage,
    Icon: MessageSquareText,
    intro: 'Boost your vocabulary with exercises tailored for each level:',
    outro: 'Every lesson features word lists, definitions and exercises to enhance your learning.',
    levelBase: '/topics/vocabulary',
    to: '/topics/vocabulary',
    cta: 'Go to the lessons',
  },
  {
    key: 'reading',
    tag: 'Reading Tests',
    title: 'Reading Tests',
    color: '#ed1c24',
    image: readingImage,
    Icon: Newspaper,
    intro: 'Need to improve your reading skills? Work on our reading tests. There are reading tests for',
    outro: 'You will find different types of texts and different types of questions in each test.',
    levelBase: '/topics/reading',
    to: '/topics/reading',
    cta: 'Go to the tests',
  },
  {
    key: 'writing',
    tag: 'Writing Exercises',
    title: 'Writing Lessons',
    color: '#a84d98',
    image: writingImage,
    Icon: PenLine,
    intro: 'Improve your writing with the exercises suggested in each lesson. Different types of texts for each level:',
    outro: 'Get instant, detailed feedback on what you write.',
    levelBase: '/topics/writing',
    to: '/topics/writing',
    cta: 'Go to the lessons',
  },
  {
    key: 'level-test',
    tag: 'Level Test',
    title: 'Level Test',
    color: BRAND,
    image: levelTestImage,
    Icon: BarChart3,
    text: "If you are not sure about your level, don't worry, you can take this online test. There are 55 questions and you will find out your level from A1 to C2 when you finish the test.",
    to: '/placement-test',
    cta: 'Take a level test',
  },
  {
    key: 'classrooms',
    tag: 'School Mode',
    title: 'Classrooms & Live Quiz',
    color: '#5f6f79',
    image: classroomsImage,
    Icon: Users,
    text: 'Join your teacher’s classroom, complete assignments and compete with your classmates in live quizzes.',
    to: '/classrooms',
    cta: 'Go to classrooms',
  },
];

function LevelLinks({ base }) {
  return LEVELS.map((level, i) => (
    <span key={level.code}>
      <Link to={`${base}/${level.code}`} className="text-[#50af31] hover:underline">
        {level.code}
      </Link>
      {i < LEVELS.length - 1 ? ', ' : '. '}
    </span>
  ));
}

function CategoryCard({ card }) {
  const { Icon } = card;
  return (
    <div className="px-4 py-2.5 sm:p-4">
      <div className="group h-full bg-white border border-[#f0f0f0] rounded-sm flex flex-col shadow-[0_1px_2px_rgba(60,64,67,0.3),0_2px_6px_2px_rgba(60,64,67,0.15)] transition-shadow duration-500 ease-in-out hover:shadow-[0_8px_17px_rgba(0,0,0,0.2),0_6px_20px_rgba(0,0,0,0.19)]">
        <div className="relative h-48 sm:h-60 overflow-hidden rounded-t-[15px]">
          <img src={card.image} alt="" loading="lazy" className="w-full h-full object-cover" />
          <span
            className="absolute top-3 right-0 text-white font-bold text-base sm:text-lg px-3 sm:px-4 py-1"
            style={{ backgroundColor: card.color }}
          >
            {card.tag}
          </span>
          <span
            className="absolute bottom-2 left-2 w-9 h-9 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: card.color }}
          >
            <Icon size={18} strokeWidth={2} />
          </span>
        </div>

        <div className="p-4 flex flex-col items-start flex-1">
          <h4 className="text-xl sm:text-2xl font-semibold leading-none" style={{ color: card.color }}>
            {card.title}
          </h4>
          <p className="mt-3 text-[15px] font-light text-gray-600 leading-snug flex-1">
            {card.text ?? (
              <>
                {card.intro} <LevelLinks base={card.levelBase} />
                {card.outro}
              </>
            )}
          </p>
          <Link
            to={card.to}
            style={{ '--card-color': card.color }}
            className="mt-4 inline-block border-2 border-[#9d9d9d] text-[#9d9d9d] rounded-lg px-3 py-2 text-[17px] group-hover:border-[var(--card-color)] group-hover:text-[var(--card-color)] hover:bg-[var(--card-color)] hover:!text-white transition-colors"
          >
            {card.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col">
      <Navbar />

      {/* Fotoğraflı giriş.
          Mobil/tablet: fotoğraf alanı kaplar (dikey ekranda boyu tam sığar, yanlardan kırpılır).
          Masaüstü: fotoğraf kendi oranıyla (3:2) sağa yaslanır, hiç kırpılmaz; sol kenarı koyu zemine
          gradient ile erir ve yazı o koyu alanda durur. */}
      <header className="relative isolate h-[62vh] sm:h-[85vh] min-h-[400px] flex items-end sm:items-center overflow-hidden bg-[#15181c]">
        <div className="absolute inset-y-0 right-0 -z-10 w-full lg:w-auto lg:aspect-[3/2]">
          <img
            src={heroImage}
            alt=""
            className="w-full h-full object-cover object-[35%_center] -scale-x-100 brightness-[0.5] lg:brightness-[0.8]"
          />
          <div className="hidden lg:block absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-[#15181c] to-transparent" />
          {/* Mobilde yazı altta durur; okunsun diye alttan koyu geçiş. */}
          <div className="sm:hidden absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#15181c] via-[#15181c]/70 to-transparent" />
        </div>
        <div className="w-full max-w-[600px] px-4 pb-8 sm:px-12 sm:pb-0">
          <h1 className="text-white font-bold text-[32px] sm:text-[44px] leading-none tracking-wide">
            learn english
            <strong className="block mt-2 text-[0.8em] font-bold" style={{ color: BRAND }}>
              Take your learning with you!
            </strong>
          </h1>
          <p className="mt-3 sm:mt-4 text-white/90 text-[15px] sm:text-lg font-light leading-snug">
            Grammar lessons with exercises and clear explanations, vocabulary sets, reading tests, writing lessons
            with feedback, instant marking, a placement test, live classroom quizzes and much more!
          </p>
        </div>
      </header>

      <main className="flex-1">
        <h2 className="text-center text-2xl sm:text-4xl font-black leading-tight px-4 pt-8 sm:pt-12 pb-2 sm:pb-4 text-gray-800 text-balance">
          What would you like to{' '}
          <span className="text-[1.4em]" style={{ color: BRAND }}>
            learn
          </span>{' '}
          today?
        </h2>

        <section className="max-w-[1400px] mx-auto px-0 sm:px-4 pb-10 sm:pb-16 grid sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card) => (
            <CategoryCard key={card.key} card={card} />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
