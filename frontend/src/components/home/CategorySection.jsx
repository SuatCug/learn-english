import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/lib/constants';
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

const DESCRIPTIONS = {
  grammar: 'Learn grammar topics from A1 to C2 with clear examples and reinforce them with exercises.',
  vocabulary: 'Expand your everyday English with vocabulary sets tailored to your level.',
  reading: 'Practice with reading passages and comprehension questions at every level.',
  writing: 'Improve your writing skills with reading passages and prompts, and get instant, detailed feedback.',
};

export default function CategorySection() {
  return (
    <section id="kategoriler" className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-gray-900 text-center">
        What would you like to <span className="text-emerald-600">study</span> today?
      </h2>
      <p className="text-gray-500 text-center mt-3 max-w-xl mx-auto">
        Pick one of the categories, choose your level, and start learning right away.
      </p>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <h3 className="text-lg font-bold text-gray-900">{category.label}</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">{DESCRIPTIONS[category.slug]}</p>
              <Link
                to={`/topics/${category.slug}`}
                className="mt-4 inline-block text-sm font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Go to lessons →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
