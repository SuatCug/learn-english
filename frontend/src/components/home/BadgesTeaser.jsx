const SAMPLE_BADGES = [
  { icon: '🎉', title: 'First Step' },
  { icon: '📚', title: 'Dedicated Learner' },
  { icon: '🏆', title: 'Level Master' },
  { icon: '💯', title: 'Flawless' },
  { icon: '🔥', title: 'Streak Breaker' },
];

export default function BadgesTeaser() {
  return (
    <section className="bg-emerald-50/40 border-y border-emerald-100 mb-10 sm:mb-14">
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Earn badges as you progress</h2>
        <p className="text-gray-500 mt-2 max-w-lg mx-auto">
          Earn badges as you complete tests, level up, and get perfect scores.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {SAMPLE_BADGES.map((badge) => (
            <div
              key={badge.title}
              className="flex items-center gap-2 bg-white border border-emerald-100 rounded-full pl-2 pr-4 py-2 shadow-sm"
            >
              <span className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center text-lg">
                {badge.icon}
              </span>
              <span className="text-sm font-medium text-gray-700">{badge.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
