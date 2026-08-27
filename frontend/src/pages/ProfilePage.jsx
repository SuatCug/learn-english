import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useGetMeQuery } from '@/services/usersApi';
import { CATEGORIES, LEVELS } from '@/lib/constants';

function scoreColor(score) {
  if (score >= 80) return 'text-emerald-600';
  if (score >= 50) return 'text-amber-600';
  return 'text-rose-500';
}

function barColor(score) {
  if (score >= 80) return 'bg-emerald-500';
  if (score >= 50) return 'bg-amber-500';
  return 'bg-rose-400';
}

function ringColor(score) {
  if (score >= 80) return 'stroke-emerald-500';
  if (score >= 50) return 'stroke-amber-500';
  return 'stroke-rose-400';
}

function formatDate(value) {
  return new Date(value).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Yerel (tarayıcı saat dilimine göre) gün anahtarı — formatDate'in gösterdiği tarihle
// (ve kullanıcının "bugün/dün" algısıyla) tutarlı olsun diye UTC değil, yerel gün kullanılır.
// (Not: backend'deki streak rozeti hesaplaması hâlâ UTC gün kullanıyor, o yüzden bu ısı
// haritasıyla "Streak" sayısı gece yarısına yakın saatlerde birebir örtüşmeyebilir.)
function dayKey(value) {
  const d = new Date(value);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function CircularProgress({ percent, size = 84, strokeWidth = 8, colorClass }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, percent));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} className="stroke-gray-100" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className={`${colorClass} transition-all duration-500`}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-gray-900">
        {percent}%
      </span>
    </div>
  );
}

function LevelProgressBar({ level, levelProgress }) {
  if (!level) {
    return (
      <p className="text-sm text-gray-500 mt-3">
        You haven't taken the placement test yet.{' '}
        <Link to="/placement-test" className="text-emerald-600 font-medium hover:text-emerald-700">
          Take it now
        </Link>
      </p>
    );
  }

  const levelIndex = LEVELS.findIndex((l) => l.code === level);
  const nextLevel = LEVELS[levelIndex + 1];

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
        <span>Level: {level}</span>
        <span>
          {nextLevel
            ? `${levelProgress?.completed ?? 0}/${levelProgress?.total ?? 0} topics until ${nextLevel.code}`
            : 'Highest level reached'}
        </span>
      </div>
      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full bg-emerald-500 rounded-full transition-all duration-300"
          style={{ width: `${levelProgress?.percent ?? 0}%` }}
        />
      </div>
    </div>
  );
}

// Backend'deki streak rozeti UTC gün kullanıyor; burada aynı algoritma yerel güne (dayKey)
// göre tekrar hesaplanır — böylece "Streak" sayısı da Activity ısı haritasıyla ve kullanıcının
// gerçek "bugün/dün" algısıyla tutarlı olur (gece yarısına yakın saatlerde bile).
function currentStreak(progress) {
  const days = new Set(progress.map((p) => dayKey(p.completedAt)));
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  if (!days.has(dayKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!days.has(dayKey(cursor))) return 0;
  }

  let streak = 0;
  while (days.has(dayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function StreakCard({ streak }) {
  return (
    <section className="rounded-xl border border-gray-100 p-4">
      <h2 className="text-sm font-bold text-gray-900">Streak</h2>
      {streak ? (
        <p className="text-2xl font-bold text-amber-600 mt-2">
          🔥 {streak} <span className="text-sm font-medium text-gray-500">day{streak > 1 ? 's' : ''} in a row</span>
        </p>
      ) : (
        <p className="text-xs text-gray-400 mt-2">Complete a topic today to start a streak.</p>
      )}
    </section>
  );
}

// Son ~10 hafta için GitHub tarzı mini aktivite takvimi — her gün kaç konu tamamlandığına göre renklenir.
function ActivityHeatmap({ progress }) {
  const WEEKS = 10;
  const DAYS = WEEKS * 7;

  const countsByDay = new Map();
  progress.forEach((entry) => {
    const key = dayKey(entry.completedAt);
    countsByDay.set(key, (countsByDay.get(key) ?? 0) + 1);
  });

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  // Şerit, bugünü İÇEREN haftanın Cumartesi'sinde bitecek şekilde hizalanır (bu haftanın henüz
  // gelmemiş günleri "isFuture" ile boş gösterilir) — böylece bugün/dün her zaman şeridin
  // içinde kalır, sadece geçmiş tamamlanan Pazar'da değil.
  const rangeEnd = new Date(now);
  rangeEnd.setDate(rangeEnd.getDate() + (6 - rangeEnd.getDay()));
  const rangeStart = new Date(rangeEnd);
  rangeStart.setDate(rangeStart.getDate() - (DAYS - 1));

  const cells = [];
  for (let i = 0; i < DAYS; i += 1) {
    const date = new Date(rangeStart);
    date.setDate(date.getDate() + i);
    const key = dayKey(date);
    const count = countsByDay.get(key) ?? 0;
    cells.push({ key, count, isFuture: date > now });
  }

  const cellClass = (cell) => {
    if (cell.isFuture) return 'bg-transparent';
    if (cell.count === 0) return 'bg-gray-100';
    if (cell.count === 1) return 'bg-emerald-300';
    return 'bg-emerald-600';
  };

  const columns = [];
  for (let w = 0; w < WEEKS; w += 1) {
    columns.push(cells.slice(w * 7, w * 7 + 7));
  }

  return (
    <section className="rounded-xl border border-gray-100 p-4">
      <h2 className="text-sm font-bold text-gray-900 text-center lg:text-left">Activity</h2>
      <div className="mt-3 flex gap-1 overflow-x-auto justify-center lg:justify-start">
        {columns.map((week, i) => (
          <div key={i} className="flex flex-col gap-1">
            {week.map((cell) => (
              <div key={cell.key} title={`${cell.key}: ${cell.count} completed`} className={`w-3 h-3 rounded-sm ${cellClass(cell)}`} />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 mt-3 text-[10px] text-gray-400 justify-center lg:justify-start">
        <span>Less</span>
        <span className="w-3 h-3 rounded-sm bg-gray-100" />
        <span className="w-3 h-3 rounded-sm bg-emerald-300" />
        <span className="w-3 h-3 rounded-sm bg-emerald-600" />
        <span>More</span>
      </div>
    </section>
  );
}

function CategoryBreakdown({ progress }) {
  const stats = CATEGORIES.map((category) => {
    const entries = progress.filter((entry) => (entry.topicId?.category ?? entry.category) === category.slug);
    const average = entries.length
      ? Math.round(entries.reduce((sum, entry) => sum + entry.score, 0) / entries.length)
      : null;
    return { ...category, average, count: entries.length };
  });

  const hasAnyData = stats.some((s) => s.count > 0);
  if (!hasAnyData) return null;

  return (
    <section>
      <h2 className="text-lg font-bold text-gray-900">Strengths by Category</h2>
      <div className="mt-4 space-y-3">
        {stats.map((stat) => (
          <div key={stat.slug} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-sm text-gray-600 flex items-center gap-1.5">
              <span>{stat.icon}</span> {stat.label}
            </span>
            <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
              {stat.average !== null && (
                <div className={`h-full rounded-full ${barColor(stat.average)}`} style={{ width: `${stat.average}%` }} />
              )}
            </div>
            <span className="w-24 shrink-0 text-right text-sm font-semibold text-gray-700">
              {stat.average !== null ? `${stat.average}%` : <span className="font-normal text-gray-400">Not started yet</span>}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function WeakTopics({ progress }) {
  const latestByTopic = new Map();
  progress.forEach((entry) => {
    const key = entry.topicId?._id ?? entry.topicTitle;
    const existing = latestByTopic.get(key);
    if (!existing || new Date(entry.completedAt) > new Date(existing.completedAt)) {
      latestByTopic.set(key, entry);
    }
  });

  const weakest = [...latestByTopic.values()]
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  if (weakest.length === 0) return null;

  return (
    <section className="rounded-xl border border-gray-100 p-4">
      <h2 className="text-sm font-bold text-gray-900">Topics to Review</h2>
      <div className="mt-3 space-y-2.5">
        {weakest.map((entry) => {
          const title = entry.topicTitle || entry.topicId?.title || 'Deleted topic';
          const content = (
            <>
              <p className="text-sm font-medium text-gray-800 truncate">{title}</p>
              <p className={`text-xs font-bold mt-0.5 ${scoreColor(entry.score)}`}>{entry.score}%</p>
            </>
          );
          return entry.topicId ? (
            <Link
              key={entry.topicId._id}
              to={`/lesson/${entry.topicId._id}`}
              className="block rounded-lg border border-gray-100 px-3 py-2 hover:shadow-sm hover:border-emerald-200 transition-all"
            >
              {content}
            </Link>
          ) : (
            <div key={title} className="rounded-lg border border-gray-100 px-3 py-2 opacity-60">
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function BadgesShowcase({ badges }) {
  return (
    <section className="rounded-xl border border-gray-100 p-4">
      <h2 className="text-sm font-bold text-gray-900">Badges</h2>
      {badges.length === 0 ? (
        <p className="text-xs text-gray-400 mt-2">No badges earned yet — complete topics to start earning some.</p>
      ) : (
        <div className="mt-3 flex flex-wrap gap-2">
          {badges.map((badge) => (
            <div
              key={badge._id}
              className="flex items-center gap-1.5 bg-white border border-emerald-100 rounded-full pl-1.5 pr-3 py-1.5 shadow-sm"
              title={badge.description}
            >
              <span className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center text-sm">
                {badge.icon}
              </span>
              <span className="text-xs font-medium text-gray-700">{badge.title}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function QuickLinks({ isPremium, hasLevel }) {
  return (
    <section className="rounded-xl border border-gray-100 p-4">
      <h2 className="text-sm font-bold text-gray-900">Quick Links</h2>
      <div className="mt-3 space-y-2 text-sm">
        <Link to="/profile/edit" className="block text-gray-600 hover:text-emerald-600 transition-colors">
          Edit Profile →
        </Link>
        {isPremium && (
          <Link to="/classrooms" className="block text-gray-600 hover:text-emerald-600 transition-colors">
            Manage My Classes →
          </Link>
        )}
        {!hasLevel && (
          <Link to="/placement-test" className="block text-gray-600 hover:text-emerald-600 transition-colors">
            Take the Placement Test →
          </Link>
        )}
      </div>
    </section>
  );
}

export default function ProfilePage() {
  const { data, isLoading, isError } = useGetMeQuery();
  const user = data?.data?.user;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <p className="max-w-6xl mx-auto px-6 py-20 text-gray-400 text-sm">Loading profile...</p>
        <Footer />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <p className="max-w-6xl mx-auto px-6 py-20 text-rose-500 text-sm">Couldn't load your profile. Please try again.</p>
        <Footer />
      </div>
    );
  }

  const { levelProgress } = data.data;
  const streak = currentStreak(user.progress);
  const initial = user.name?.trim()?.charAt(0)?.toUpperCase() || '?';
  const topicsCompleted = user.progress.length;
  // Toplam puan: sınıf sayfasındaki puan hesabıyla (classroom.controller.js) aynı mantık —
  // her tamamlanan egzersizin skoru toplanır, kullanıcı ne kadar egzersiz yaparsa o kadar artar.
  const totalPoints = user.progress.reduce((sum, entry) => sum + entry.score, 0);
  const averageScore = topicsCompleted
    ? Math.round(user.progress.reduce((sum, entry) => sum + entry.score, 0) / topicsCompleted)
    : null;
  const recentActivity = [...user.progress]
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pb-20 pt-10 flex-1 w-full">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-4 sm:gap-5 min-w-0">
            <span className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-full bg-emerald-500 text-white text-2xl sm:text-3xl font-semibold flex items-center justify-center">
              {initial}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">{user.name}</h1>
                {user.isPremium && (
                  <span className="rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide">
                    Premium
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-sm mt-0.5 truncate">{user.email}</p>
            </div>
          </div>

          <Link
            to="/profile/edit"
            className="shrink-0 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium px-3 sm:px-4 py-2 hover:bg-gray-50 transition-colors"
          >
            Edit Profile
          </Link>
        </div>

        <div className="mt-6 max-w-sm">
          <LevelProgressBar level={user.level} levelProgress={levelProgress} />
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-10 min-w-0">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-xl border border-gray-100 p-4 text-center">
                <p className="text-2xl font-bold text-indigo-600">{totalPoints}</p>
                <p className="text-xs text-gray-500 mt-1">Points</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">{topicsCompleted}</p>
                <p className="text-xs text-gray-500 mt-1">Topics Completed</p>
                <p className="text-[10px] text-gray-400">(all-time)</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 flex flex-col items-center text-center">
                {averageScore !== null ? (
                  <CircularProgress percent={averageScore} colorClass={ringColor(averageScore)} />
                ) : (
                  <p className="text-2xl font-bold text-gray-900 py-6">—</p>
                )}
                <p className="text-xs text-gray-500 mt-1">Average Score</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">{user.badges.length}</p>
                <p className="text-xs text-gray-500 mt-1">Badges Earned</p>
              </div>
            </div>

            <CategoryBreakdown progress={user.progress} />

            <section>
              <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
              {recentActivity.length === 0 ? (
                <p className="text-sm text-gray-400 mt-3">You haven't completed any topics yet.</p>
              ) : (
                <div className="mt-4 divide-y divide-gray-100 rounded-xl border border-gray-100">
                  {recentActivity.map((entry) => {
                    const topic = entry.topicId;
                    const title = entry.topicTitle || topic?.title || 'Removed lesson';
                    const categoryInfo = CATEGORIES.find((c) => c.slug === topic?.category);
                    const rowContent = (
                      <>
                        <span className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-sm shrink-0">
                          {categoryInfo?.icon ?? '📄'}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-800 truncate">{title}</p>
                          <p className="text-xs text-gray-400">{formatDate(entry.completedAt)}</p>
                        </div>
                        <span className={`text-sm font-bold shrink-0 ${scoreColor(entry.score)}`}>{entry.score}%</span>
                      </>
                    );
                    const rowKey = `${topic?._id ?? title}-${entry.completedAt}`;
                    return topic?._id ? (
                      <Link
                        key={rowKey}
                        to={`/lesson/${topic._id}`}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        {rowContent}
                      </Link>
                    ) : (
                      <div key={rowKey} className="flex items-center gap-3 px-4 py-3">
                        {rowContent}
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24">
            <StreakCard streak={streak} />
            <ActivityHeatmap progress={user.progress} />
            <WeakTopics progress={user.progress} />
            <BadgesShowcase badges={user.badges} />
            <QuickLinks isPremium={user.isPremium} hasLevel={Boolean(user.level)} />
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
