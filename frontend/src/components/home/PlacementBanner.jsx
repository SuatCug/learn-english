import { Link } from 'react-router-dom';
import { Check, ArrowRight, Clock, ListChecks, Target } from 'lucide-react';
import { LEVELS } from '@/lib/constants';

const BAR_HEIGHTS = [56, 76, 96, 116, 136, 156, 176];
const BAR_COLORS = [
  'bg-emerald-200',
  'bg-emerald-300',
  'bg-emerald-400',
  'bg-emerald-500',
  'bg-emerald-500',
  'bg-emerald-600',
  'bg-emerald-700',
];

export default function PlacementBanner() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
      <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4 max-w-md">
          <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">Not sure about your level?</h3>
          <p className="text-gray-600">
            Take a short placement test and we'll automatically determine the level (A1–C2) that's right for you.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
            <span className="inline-flex items-center gap-1.5 bg-white border border-emerald-100 rounded-full px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <Check size={14} strokeWidth={2.5} />
              Instant result
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-emerald-100 rounded-full px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <Clock size={14} strokeWidth={2.5} />
              80 min
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-emerald-100 rounded-full px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <ListChecks size={14} strokeWidth={2.5} />
              55 questions
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-emerald-100 rounded-full px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <Target size={14} strokeWidth={2.5} />
              A1–C2
            </span>
          </div>

          <Link
            to="/placement-test"
            className="mt-1 inline-flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 transition-colors"
          >
            Take a Level Test
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>

        <div className="w-full lg:w-auto max-w-full overflow-x-auto">
          <div className="flex items-end justify-center gap-1.5 sm:gap-3 h-48 sm:h-52 mx-auto w-max">
            {LEVELS.map((level, i) => (
              <div key={level.code} className="flex flex-col items-center gap-2">
                <div
                  className={`w-7 sm:w-11 rounded-t-lg ${BAR_COLORS[i]}`}
                  style={{ height: BAR_HEIGHTS[i] }}
                />
                <span className="text-[11px] sm:text-xs font-bold text-emerald-800">{level.code}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
