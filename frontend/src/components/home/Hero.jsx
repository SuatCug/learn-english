import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-emerald-800 text-white">
      <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium mb-6">
          🍃 Free English Learning Platform
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight text-balance">
          Improve your English <span className="text-emerald-200">at your own pace</span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-emerald-50/90 max-w-2xl mx-auto">
          Practice Grammar, Vocabulary, Reading, and Writing from A1 to C2 with interactive tests and get instant
          feedback.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4">
          <Link
            to="/placement-test"
            className="rounded-lg bg-white text-emerald-700 font-semibold px-6 py-3 text-center hover:bg-emerald-50 transition-colors"
          >
            Take a Level Test
          </Link>
          <a
            href="#kategoriler"
            className="rounded-lg bg-white/10 border border-white/25 text-white font-semibold px-6 py-3 text-center hover:bg-white/20 transition-colors"
          >
            Browse Topics
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-emerald-100/80">
          <span>4 categories</span>
          <span className="w-1 h-1 rounded-full bg-emerald-100/50" />
          <span>7 levels (A1–C2)</span>
          <span className="w-1 h-1 rounded-full bg-emerald-100/50" />
          <span>Instant feedback</span>
          <span className="w-1 h-1 rounded-full bg-emerald-100/50" />
          <span>School Mode</span>
        </div>
      </div>
    </section>
  );
}
