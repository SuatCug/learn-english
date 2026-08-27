import { useParams, Navigate, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { INFO_CONTENT } from '@/lib/infoContent';

function SectionList({ list }) {
  if (list.type === 'ordered') {
    return (
      <ol className="space-y-4 mt-4">
        {list.items.map((item, i) => (
          <li key={i} className="flex items-start gap-4">
            <span className="mt-0.5 shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white text-base font-bold flex items-center justify-center">
              {i + 1}
            </span>
            <p className="text-lg text-gray-700 leading-relaxed pt-0.5">{item}</p>
          </li>
        ))}
      </ol>
    );
  }

  if (list.type === 'checklist') {
    return (
      <ul className="space-y-3.5 mt-4">
        {list.items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-1 shrink-0 text-emerald-600 text-lg leading-none">✓</span>
            <p className="text-lg text-gray-700 leading-relaxed">{item}</p>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-3 mt-4">
      {list.items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-2.5 shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <p className="text-lg text-gray-700 leading-relaxed">{item}</p>
        </li>
      ))}
    </ul>
  );
}

function InfoSection({ section }) {
  return (
    <section>
      {section.heading && <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.heading}</h2>}
      {section.paragraphs && (
        <div className="space-y-5 text-lg text-gray-600 leading-relaxed">
          {section.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}
      {section.list && <SectionList list={section.list} />}
    </section>
  );
}

export default function InfoPage() {
  const { slug } = useParams();
  const content = INFO_CONTENT[slug];

  if (!content) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="bg-emerald-600">
        <h1 className="max-w-6xl mx-auto px-6 py-5 text-center text-white font-bold tracking-wide uppercase text-lg sm:text-xl">
          {content.title}
        </h1>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-14 flex-1 w-full space-y-12">
        {content.sections.map((section, i) => (
          <InfoSection key={i} section={section} />
        ))}

        <Link to="/" className="inline-block text-base font-semibold text-emerald-600 hover:text-emerald-700">
          ← Back to home
        </Link>
      </div>

      <Footer />
    </div>
  );
}
