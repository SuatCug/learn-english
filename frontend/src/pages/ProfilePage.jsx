import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  BarChart3,
  Trophy,
  Pencil,
  CircleCheck,
  Star,
  Clock,
  Flame,
  ChevronLeft,
  ChevronRight,
  BookOpenText,
  BookMarked,
  BookOpen,
  PenLine,
  Headphones,
  Link2,
  UserRound,
  GraduationCap,
  ClipboardCheck,
  ArrowRight,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useGetMeQuery } from '@/services/usersApi';
import { CATEGORIES, LEVELS, CATEGORY_THEME, DEFAULT_THEME } from '@/lib/constants';

// Kategori ikonları (Strengths by Category, Recent Activity, Topics to Review).
const CATEGORY_ICONS = {
  grammar: BookOpenText,
  vocabulary: BookMarked,
  reading: BookOpen,
  writing: PenLine,
  listening: Headphones,
};

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function scoreColor(score) {
  if (score >= 80) return 'text-emerald-600';
  if (score >= 50) return 'text-amber-500';
  return 'text-rose-500';
}

function formatDate(value) {
  return new Date(value).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Yerel (tarayıcı saat dilimine göre) gün anahtarı — tarih gösterimiyle ve kullanıcının
// "bugün/dün" algısıyla tutarlı olsun diye UTC değil, yerel gün kullanılır.
function dayKey(value) {
  const d = new Date(value);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// Bugün (ya da bugün henüz çalışılmadıysa dün) biten, art arda çalışılan gün sayısı.
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

const entryCategory = (entry) => entry.topicId?.category ?? entry.category;

// Konunun kategorisine göre renklenen ikon yuvarlağı (grammar mavi, vocabulary pembe...).
function CategoryChip({ category, size = 9, fallback: Fallback = ClipboardCheck }) {
  const Icon = CATEGORY_ICONS[category] ?? Fallback;
  const theme = CATEGORY_THEME[category] ?? DEFAULT_THEME;
  return (
    <span className={`${size === 10 ? 'w-10 h-10' : 'w-9 h-9'} shrink-0 rounded-full ${theme.lightBg} flex items-center justify-center`}>
      <Icon size={17} className={theme.text} aria-hidden="true" />
    </span>
  );
}

function Card({ className = '', children }) {
  return <section className={`rounded-2xl border border-gray-100 bg-white shadow-sm ${className}`}>{children}</section>;
}

function CardTitle({ icon: Icon, iconClass = 'text-emerald-600', children, action }) {
  return (
    <div className="flex items-center justify-between gap-3 mb-5">
      <h2 className="flex items-center gap-2.5 text-lg font-bold text-gray-900">
        <Icon size={22} className={`shrink-0 ${iconClass}`} aria-hidden="true" />
        {children}
      </h2>
      {action}
    </div>
  );
}

// Profil kartının sağındaki çizim: kitap yığınının üstünde mezuniyet kepi.
function CapIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 220 150" className={className} aria-hidden="true">
      <ellipse cx="118" cy="138" rx="92" ry="9" fill="#d7eecd" />
      <rect x="40" y="104" width="150" height="26" rx="6" fill="#3f8f2b" />
      <rect x="48" y="110" width="134" height="8" rx="2" fill="#fff" opacity="0.9" />
      <rect x="52" y="80" width="136" height="26" rx="6" fill="#5cb247" />
      <rect x="60" y="86" width="120" height="8" rx="2" fill="#fff" opacity="0.9" />
      <path d="M78 66h84v18c0 8-19 13-42 13s-42-5-42-13V66Z" fill="#2f6b3d" />
      <path d="M120 22 196 50 120 78 44 50Z" fill="#3d8a4f" />
      <path d="M120 22 196 50 120 78Z" fill="#2f6b3d" />
      <path d="M120 50 176 62v30" stroke="#f2c94c" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="176" cy="96" r="5" fill="#f2c94c" />
      <path d="M24 40l4 8 8 4-8 4-4 8-4-8-8-4 8-4Z" fill="#9fd68c" />
    </svg>
  );
}

// Profilin altındaki çağrı kartının çizimi: hedef tahtası ve ok.
function TargetIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <circle cx="56" cy="64" r="46" fill="#fff" />
      <circle cx="56" cy="64" r="46" fill="none" stroke="#3f8f2b" strokeWidth="9" />
      <circle cx="56" cy="64" r="28" fill="none" stroke="#5cb247" strokeWidth="9" />
      <circle cx="56" cy="64" r="11" fill="#3f8f2b" />
      <path d="M58 62 104 16" stroke="#2f6b3d" strokeWidth="5" strokeLinecap="round" />
      <path d="M96 12l12-4-4 12-6 2-4-4Z" fill="#2f6b3d" />
    </svg>
  );
}

function ScoreRing({ percent, size = 78, stroke = 7 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.max(0, Math.min(100, percent)) / 100) * circumference;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={stroke} className="stroke-gray-100" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          className="stroke-emerald-500 transition-all duration-500"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xl font-extrabold text-gray-900">
        {percent}%
      </span>
    </div>
  );
}

function StatCard({ icon: Icon, iconClass, value, label, hint }) {
  return (
    <Card className="p-5 flex flex-col items-center justify-center text-center">
      <Icon size={30} className={iconClass} aria-hidden="true" />
      <p className="mt-2 text-3xl font-extrabold text-gray-900 tabular-nums">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </Card>
  );
}

function StrengthsCard({ progress }) {
  const stats = CATEGORIES.map((category) => {
    const entries = progress.filter((e) => entryCategory(e) === category.slug);
    const average = entries.length ? Math.round(entries.reduce((s, e) => s + e.score, 0) / entries.length) : null;
    return { ...category, average };
  });

  return (
    <Card className="p-5 sm:p-6">
      <CardTitle icon={BarChart3}>Strengths by Category</CardTitle>
      <div className="space-y-4">
        {stats.map((stat) => {
          const Icon = CATEGORY_ICONS[stat.slug] ?? BookOpen;
          // Sitedeki kategori renkleri (ders sayfaları ve navbar ile aynı): grammar mavi, vocabulary pembe...
          const theme = CATEGORY_THEME[stat.slug] ?? DEFAULT_THEME;
          return (
            <div key={stat.slug} className="flex items-center gap-3">
              <Icon size={20} className={`shrink-0 ${theme.text}`} aria-hidden="true" />
              <span className="w-24 shrink-0 text-sm text-gray-700">{stat.label}</span>
              <div className="flex-1 h-2.5 rounded-full bg-gray-100 overflow-hidden">
                {stat.average !== null && (
                  <div className={`h-full rounded-full ${theme.solid}`} style={{ width: `${stat.average}%` }} />
                )}
              </div>
              <span className="w-28 shrink-0 text-right text-sm">
                {stat.average !== null ? (
                  <span className="font-bold text-gray-900">{stat.average}%</span>
                ) : (
                  <span className="text-gray-400">Not started yet</span>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function ActivityRow({ entry }) {
  const topic = entry.topicId;
  const title = entry.topicTitle || topic?.title || 'Removed lesson';
  const content = (
    <>
      <CategoryChip category={entryCategory(entry)} />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-gray-800 truncate">{title}</span>
        <span className="block text-xs text-gray-400">{formatDate(entry.completedAt)}</span>
      </span>
      <span className={`text-sm font-bold shrink-0 ${scoreColor(entry.score)}`}>{entry.score}%</span>
    </>
  );
  return topic?._id ? (
    <Link to={`/lesson/${topic._id}`} className="flex items-center gap-3 py-2.5 hover:bg-gray-50 -mx-2 px-2 rounded-lg">
      {content}
    </Link>
  ) : (
    <div className="flex items-center gap-3 py-2.5">{content}</div>
  );
}

function RecentActivityCard({ progress }) {
  const [showAll, setShowAll] = useState(false);
  const sorted = [...progress].sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
  const visible = sorted.slice(0, showAll ? 20 : 5);

  return (
    <Card className="p-5 sm:p-6">
      <CardTitle icon={Clock}>Recent Activity</CardTitle>
      {sorted.length === 0 ? (
        <p className="text-sm text-gray-400">You haven't completed any topics yet.</p>
      ) : (
        <>
          <div className="divide-y divide-gray-100">
            {visible.map((entry) => (
              <ActivityRow key={`${entry.topicId?._id ?? entry.topicTitle}-${entry.completedAt}`} entry={entry} />
            ))}
          </div>
          {sorted.length > 5 && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="mt-3 mx-auto flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              {showAll ? 'Show less' : 'View all activity'}
              <ArrowRight size={16} className={showAll ? '-rotate-90' : ''} aria-hidden="true" />
            </button>
          )}
        </>
      )}
    </Card>
  );
}

// Seri kartı: solda seri sayısı, sağda çalışılan günleri işaretleyen aylık takvim.
function StreakCard({ progress }) {
  const streak = currentStreak(progress);
  const activeDays = useMemo(() => new Set(progress.map((p) => dayKey(p.completedAt))), [progress]);
  const [month, setMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const todayKey = dayKey(new Date());
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const leadingBlanks = (month.getDay() + 6) % 7; // Pazartesi ile başlayan hafta
  const cells = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1)),
  ];
  const changeMonth = (delta) => setMonth((m) => new Date(m.getFullYear(), m.getMonth() + delta, 1));

  return (
    <Card className="p-5 sm:p-6">
      <div className="grid gap-6 sm:grid-cols-[150px_minmax(0,1fr)]">
        <div>
          <CardTitle icon={Flame} iconClass="text-orange-500">
            Your Streak
          </CardTitle>
          <div className="rounded-xl bg-emerald-50/70 px-4 py-6 text-center">
            <p className="text-5xl font-extrabold text-gray-900 tabular-nums">{streak}</p>
            <p className="text-sm font-medium text-gray-600">Day{streak === 1 ? '' : 's'}</p>
            <p className="mt-4 text-sm font-semibold text-gray-800">{streak ? 'Keep going! 🔥' : 'Start today!'}</p>
            <p className="text-xs text-gray-500">
              {streak ? 'Reach a higher streak.' : 'Complete a topic to begin.'}
            </p>
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              aria-label="Previous month"
              className="p-1 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            >
              <ChevronLeft size={18} />
            </button>
            <p className="font-bold text-gray-900">
              {month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
            <button
              type="button"
              onClick={() => changeMonth(1)}
              aria-label="Next month"
              className="p-1 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-y-1 text-center text-xs">
            {WEEKDAYS.map((d) => (
              <span key={d} className="pb-1 font-medium text-gray-400">
                {d}
              </span>
            ))}
            {cells.map((date, i) => {
              if (!date) return <span key={`blank-${i}`} />;
              const key = dayKey(date);
              const isToday = key === todayKey;
              const active = activeDays.has(key);
              return (
                <span key={key} className="flex flex-col items-center py-0.5">
                  <span
                    className={`w-7 h-7 flex items-center justify-center rounded-full text-[13px] ${
                      isToday ? 'bg-emerald-600 text-white font-bold' : 'text-gray-700'
                    }`}
                  >
                    {date.getDate()}
                  </span>
                  <span className={`mt-0.5 w-1 h-1 rounded-full ${active ? 'bg-emerald-500' : 'bg-transparent'}`} />
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}

function TopicsToReviewCard({ progress }) {
  const latestByTopic = new Map();
  progress.forEach((entry) => {
    const key = entry.topicId?._id ?? entry.topicTitle;
    const existing = latestByTopic.get(key);
    if (!existing || new Date(entry.completedAt) > new Date(existing.completedAt)) latestByTopic.set(key, entry);
  });
  const weakest = [...latestByTopic.values()].sort((a, b) => a.score - b.score).slice(0, 3);

  return (
    <Card className="p-5 sm:p-6">
      <CardTitle icon={BookOpen}>Topics to Review</CardTitle>
      {weakest.length === 0 ? (
        <p className="text-sm text-gray-400">Complete some topics and we'll suggest what to review.</p>
      ) : (
        <div className="divide-y divide-gray-100">
          {weakest.map((entry) => {
            const title = entry.topicTitle || entry.topicId?.title || 'Deleted topic';
            const content = (
              <>
                <CategoryChip category={entryCategory(entry)} size={10} fallback={Pencil} />
                <span className="min-w-0 flex-1 text-sm font-medium text-gray-800">{title}</span>
                <span className={`text-sm font-bold ${scoreColor(entry.score)}`}>{entry.score}%</span>
                <ChevronRight size={16} className="shrink-0 text-gray-300" aria-hidden="true" />
              </>
            );
            return entry.topicId ? (
              <Link
                key={entry.topicId._id}
                to={`/lesson/${entry.topicId._id}`}
                className="flex items-center gap-3 py-3 hover:bg-gray-50 -mx-2 px-2 rounded-lg"
              >
                {content}
              </Link>
            ) : (
              <div key={title} className="flex items-center gap-3 py-3 opacity-60">
                {content}
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

function BadgesCard({ badges }) {
  return (
    <Card className="p-5 sm:p-6">
      <CardTitle icon={Star} iconClass="text-amber-400 fill-amber-400">
        Badges
      </CardTitle>
      {badges.length === 0 ? (
        <div className="text-center">
          <p className="text-sm text-gray-500">No badges earned yet — complete topics to start earning some.</p>
          <span className="mt-4 mx-auto w-14 h-14 rounded-full bg-gray-100 border-4 border-gray-200 flex items-center justify-center">
            <Star size={22} className="text-gray-400" aria-hidden="true" />
          </span>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => (
            <span
              key={badge._id}
              title={badge.description}
              className="flex items-center gap-1.5 rounded-full border border-emerald-100 bg-white pl-1.5 pr-3 py-1.5 shadow-sm"
            >
              <span className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center text-sm">
                {badge.icon}
              </span>
              <span className="text-xs font-medium text-gray-700">{badge.title}</span>
            </span>
          ))}
        </div>
      )}
    </Card>
  );
}

function QuickLinksCard({ isPremium, hasLevel }) {
  const links = [
    { to: '/profile/edit', label: 'Edit Profile', icon: UserRound },
    isPremium && { to: '/school', label: 'Manage My Classes', icon: GraduationCap },
    { to: '/exams', label: 'Level Exams', icon: ClipboardCheck },
    !hasLevel && { to: '/placement-test', label: 'Take the Level Test', icon: BarChart3 },
  ].filter(Boolean);

  return (
    <Card className="p-5 sm:p-6">
      <CardTitle icon={Link2}>Quick Links</CardTitle>
      <div className="divide-y divide-gray-100">
        {links.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="group flex items-center gap-3 py-3 text-sm font-medium text-gray-800 hover:text-emerald-700"
          >
            <Icon size={19} className="text-emerald-600" aria-hidden="true" />
            {label}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </Card>
  );
}

function StartCta() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-100 via-emerald-50 to-emerald-200 px-6 py-7 sm:px-10 flex flex-col md:flex-row md:items-center gap-6">
      <TargetIllustration className="hidden sm:block w-24 h-24 shrink-0" />
      <div className="flex-1">
        <p className="text-xl sm:text-2xl font-bold text-gray-900">Not sure where to start?</p>
        <p className="mt-1 text-sm sm:text-base text-gray-600">
          Take the free Level Test and we'll recommend the right lessons for you — or check a level with an exam.
        </p>
      </div>
      <div className="flex flex-col gap-3 shrink-0 md:w-56">
        <Link
          to="/placement-test"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-gray-900 font-semibold px-5 py-3 shadow-sm hover:bg-emerald-50 transition-colors"
        >
          Take the Level Test <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <Link
          to="/exams"
          className="inline-flex items-center justify-center rounded-xl bg-emerald-600 text-white font-semibold px-5 py-3 hover:bg-emerald-700 transition-colors"
        >
          Browse exams
        </Link>
      </div>
    </section>
  );
}

export default function ProfilePage() {
  const { data, isLoading, isError } = useGetMeQuery();
  const user = data?.data?.user;

  if (isLoading || isError || !user) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <p
          className={`max-w-6xl mx-auto px-6 py-20 text-sm flex-1 ${isLoading ? 'text-gray-400' : 'text-rose-500'}`}
        >
          {isLoading ? 'Loading profile...' : "Couldn't load your profile. Please try again."}
        </p>
        <Footer />
      </div>
    );
  }

  const { levelProgress } = data.data;
  const progress = user.progress;
  const initial = user.name?.trim()?.charAt(0)?.toUpperCase() || '?';
  const topicsCompleted = progress.length;
  // Toplam puan: sınıf sayfasındaki puan hesabıyla (classroom.controller.js) aynı — tamamlanan egzersizlerin skor toplamı.
  const totalPoints = progress.reduce((sum, entry) => sum + entry.score, 0);
  const averageScore = topicsCompleted ? Math.round(totalPoints / topicsCompleted) : null;
  const levelIndex = LEVELS.findIndex((l) => l.code === user.level);
  const nextLevel = levelIndex >= 0 ? LEVELS[levelIndex + 1] : null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50/60 via-white to-white">
      <Navbar />

      <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-6 sm:pt-8 pb-16 flex-1 space-y-5">
        {/* Profil kartı */}
        <section className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 via-emerald-50/60 to-emerald-100/70 p-5 sm:p-8">
          <CapIllustration className="hidden md:block absolute right-6 bottom-2 w-52" />
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-5 md:pr-56">
            <span className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-full bg-emerald-600 text-white text-3xl sm:text-4xl font-bold flex items-center justify-center ring-4 ring-white shadow-md">
              {initial}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 break-words">{user.name}</h1>
                {user.isPremium && (
                  <span className="rounded-full bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 uppercase tracking-wide">
                    Premium
                  </span>
                )}
              </div>
              <p className="mt-1 flex items-center gap-2 text-sm text-gray-600 min-w-0">
                <Mail size={16} className="shrink-0 text-emerald-600" aria-hidden="true" />
                <span className="truncate">{user.email}</span>
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-700">
                {user.level ? (
                  <>
                    <span className="inline-flex items-center gap-1.5">
                      <BarChart3 size={16} className="text-emerald-600" aria-hidden="true" />
                      Level: <strong className="font-semibold text-gray-900">{user.level}</strong>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Trophy size={16} className="text-amber-500" aria-hidden="true" />
                      {nextLevel
                        ? `${levelProgress?.completed ?? 0}/${levelProgress?.total ?? 0} topics until ${nextLevel.code}`
                        : 'Highest level reached'}
                    </span>
                  </>
                ) : (
                  <Link to="/placement-test" className="font-semibold text-emerald-700 hover:text-emerald-800">
                    Take the Level Test to find your level →
                  </Link>
                )}
              </div>
              {user.level && nextLevel && (
                <div className="mt-3 h-2 max-w-sm rounded-full bg-white/80 overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: `${levelProgress?.percent ?? 0}%` }} />
                </div>
              )}
            </div>
            <Link
              to="/profile/edit"
              className="sm:absolute sm:top-0 sm:right-0 md:right-56 self-start inline-flex items-center gap-2 rounded-xl bg-white text-gray-800 text-sm font-semibold px-4 py-2.5 shadow-sm hover:bg-gray-50 transition-colors"
            >
              <Pencil size={15} aria-hidden="true" /> Edit Profile
            </Link>
          </div>
        </section>

        {/* Özet kartları */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Trophy} iconClass="text-amber-500" value={totalPoints} label="Points" />
          <StatCard
            icon={CircleCheck}
            iconClass="text-white fill-emerald-500"
            value={topicsCompleted}
            label="Topics Completed"
          />
          <Card className="p-5 flex flex-col items-center justify-center text-center">
            {averageScore !== null ? (
              <ScoreRing percent={averageScore} />
            ) : (
              <p className="text-3xl font-extrabold text-gray-300 py-5">—</p>
            )}
            <p className="mt-1 text-sm text-gray-500">Average Score</p>
          </Card>
          <StatCard
            icon={Star}
            iconClass="text-emerald-500 fill-emerald-500"
            value={user.badges.length}
            label="Badges Earned"
          />
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <StrengthsCard progress={progress} />
          <RecentActivityCard progress={progress} />
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <StreakCard progress={progress} />
          <TopicsToReviewCard progress={progress} />
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <BadgesCard badges={user.badges} />
          <QuickLinksCard isPremium={user.isPremium} hasLevel={Boolean(user.level)} />
        </div>

        <StartCta />
      </main>

      <Footer />
    </div>
  );
}
