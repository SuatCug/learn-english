import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Search, Users, CheckCircle2, TrendingUp, ChevronRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useGetClassroomQuery, useGetClassroomResultsQuery } from '@/services/classroomApi';
import { LEVELS } from '@/lib/constants';

// Seviyeleri kaba üç kademeye ayırıp nokta rengini buna göre belirler; gerçek kod (A2, B1+ vb.) yine de gösterilir.
function levelDotColor(level) {
  if (!level) return 'bg-gray-300';
  if (level.startsWith('A')) return 'bg-emerald-500';
  if (level.startsWith('B')) return 'bg-amber-500';
  return 'bg-purple-500';
}

const AVATAR_PALETTE = ['bg-emerald-100 text-emerald-700', 'bg-sky-100 text-sky-700', 'bg-purple-100 text-purple-700', 'bg-amber-100 text-amber-700', 'bg-rose-100 text-rose-700'];

function avatarClass(seed) {
  const index = seed.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % AVATAR_PALETTE.length;
  return AVATAR_PALETTE[index];
}

function StatCard({ icon: Icon, value, label }) {
  return (
    <div className="rounded-xl border border-gray-100 px-5 py-4 flex items-center gap-3">
      <span className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <div>
        <p className="text-lg font-bold text-gray-900 leading-none">{value}</p>
        <p className="text-xs text-gray-500 mt-1">{label}</p>
      </div>
    </div>
  );
}

function StudentRow({ student, isTeacher, resultsRow, assignments, expanded, onToggle }) {
  const canExpand = isTeacher && assignments && assignments.length > 0;
  const completedCount = canExpand
    ? assignments.filter((a) => resultsRow?.scores?.[a.id]?.completed).length
    : 0;
  const progressPercent = canExpand ? Math.round((completedCount / assignments.length) * 100) : null;

  return (
    <div>
      <div className="flex items-center gap-4 px-5 py-4">
        <span className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${avatarClass(student.email || student.name)}`}>
          {student.name?.trim()?.charAt(0)?.toUpperCase() || '?'}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900 truncate">{student.name}</p>
          <p className="text-xs text-gray-400 truncate flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${levelDotColor(student.level)}`} />
            {student.level || 'No level'} · {student.email}
          </p>
        </div>

        {progressPercent !== null && (
          <div className="hidden sm:block w-32 shrink-0">
            <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1">
              <span>Progress</span>
              <span className="font-semibold text-gray-600">{progressPercent}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        )}

        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full px-2.5 py-1 shrink-0">
          {student.points ?? 0} pts
        </span>

        {canExpand && (
          <button
            type="button"
            onClick={onToggle}
            className="shrink-0 flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-emerald-600 transition-colors"
          >
            View
            <ChevronRight className={`h-3.5 w-3.5 transition-transform ${expanded ? 'rotate-90' : ''}`} />
          </button>
        )}
      </div>

      {expanded && canExpand && (
        <div className="bg-gray-50 border-t border-gray-100 px-5 py-3 space-y-1.5">
          {assignments.map((a) => {
            const cell = resultsRow?.scores?.[a.id];
            return (
              <div key={a.id} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{a.topicTitle}</span>
                {cell?.completed ? (
                  <span className="font-semibold text-emerald-700">{cell.score}</span>
                ) : (
                  <span className="text-gray-400">Not completed</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ClassroomStudentsPage() {
  const { id } = useParams();
  const currentUserId = useSelector((state) => state.auth.user?.id);
  const { data, isLoading, isError } = useGetClassroomQuery(id);
  const [expandedId, setExpandedId] = useState(null);
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [sortBy, setSortBy] = useState('points');

  const classroom = data?.data?.classroom;
  const isTeacher = classroom && classroom.teacherId?._id === currentUserId;

  const { data: resultsData } = useGetClassroomResultsQuery(id, { skip: !isTeacher });
  const results = resultsData?.data;
  const assignments = results?.assignments ?? [];
  const resultsByStudentId = new Map((results?.results ?? []).map((r) => [r.studentId, r]));

  const allStudents = classroom?.students ?? [];

  const filteredStudents = useMemo(() => {
    const term = search.trim().toLowerCase();
    return allStudents
      .filter((s) => (levelFilter === 'all' ? true : s.level === levelFilter))
      .filter((s) => (term ? s.name?.toLowerCase().includes(term) || s.email?.toLowerCase().includes(term) : true))
      .sort((a, b) => (sortBy === 'name' ? a.name.localeCompare(b.name) : (b.points ?? 0) - (a.points ?? 0)));
  }, [allStudents, search, levelFilter, sortBy]);

  // Bu üç istatistik öğrencinin TÜM egzersiz geçmişinden (backend'de hesaplanır) gelir —
  // sınıfta hiç ödev atanmamış olsa bile (serbest çalışma) anlamlı kalır.
  const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
  const activeThisWeekCount = allStudents.filter(
    (s) => s.lastActiveAt && Date.now() - new Date(s.lastActiveAt).getTime() <= ONE_WEEK_MS
  ).length;

  const completedTopicTodayCount = allStudents.filter((s) => s.completedTopicToday).length;

  const avgProgress = useMemo(() => {
    const withScores = allStudents.filter((s) => s.avgScore !== null && s.avgScore !== undefined);
    if (withScores.length === 0) return null;
    const total = withScores.reduce((sum, s) => sum + s.avgScore, 0);
    return Math.round(total / withScores.length);
  }, [allStudents]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {!isLoading && classroom && (
        <div className="bg-emerald-600">
          <h1 className="max-w-6xl mx-auto px-6 py-4 text-center text-white font-bold tracking-wide uppercase text-sm sm:text-base">
            {classroom.name} — Students
          </h1>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 pb-20 pt-4 flex-1 w-full">
        <Link to={`/classroom/${id}`} className="inline-block text-sm text-gray-500 hover:text-emerald-600 mb-6">
          ← Back to room
        </Link>

        {isLoading && <p className="text-gray-400 text-sm py-10">Loading students...</p>}
        {isError && <p className="text-rose-500 text-sm py-10">Couldn't load this room.</p>}

        {!isLoading && classroom && (
          <>
            <h2 className="text-2xl font-bold text-gray-900">Students</h2>
            <p className="text-sm text-gray-500 mt-1">
              {allStudents.length} student{allStudents.length === 1 ? '' : 's'} in this room
            </p>

            {isTeacher && allStudents.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                <StatCard icon={Users} value={activeThisWeekCount} label="Active This Week" />
                <StatCard icon={CheckCircle2} value={completedTopicTodayCount} label="Topics Completed Today" />
                <StatCard icon={TrendingUp} value={avgProgress !== null ? `${avgProgress}%` : '—'} label="Avg. Score" />
              </div>
            )}

            {allStudents.length === 0 ? (
              <div className="rounded-xl border border-gray-100 p-10 text-center text-gray-400 text-sm mt-6">
                No students have joined yet — share the join code to get started.
              </div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search students..."
                      className="w-full rounded-lg border border-gray-200 pl-9 pr-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400"
                    />
                  </div>
                  <select
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                    className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400"
                  >
                    <option value="all">All Levels</option>
                    {LEVELS.map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.code} — {l.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400"
                  >
                    <option value="points">Sort by: Points</option>
                    <option value="name">Sort by: Name</option>
                  </select>
                </div>

                <div className="rounded-xl border border-gray-100 divide-y divide-gray-100 mt-4">
                  {filteredStudents.length === 0 ? (
                    <p className="text-sm text-gray-400 px-5 py-6 text-center">No students match your search.</p>
                  ) : (
                    filteredStudents.map((s) => (
                      <StudentRow
                        key={s._id}
                        student={s}
                        isTeacher={isTeacher}
                        resultsRow={resultsByStudentId.get(s._id)}
                        assignments={assignments}
                        expanded={expandedId === s._id}
                        onToggle={() => setExpandedId((prev) => (prev === s._id ? null : s._id))}
                      />
                    ))
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
