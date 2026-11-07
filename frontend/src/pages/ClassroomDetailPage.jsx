import { useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  BookOpen,
  ListChecks,
  PenLine,
  GraduationCap,
  Headphones,
  ChevronRight,
  CalendarDays,
  Plus,
  X,
  Gamepad2,
  ClipboardList,
  ArrowLeft,
  Users,
  Copy,
  Check,
  Trash2,
  CheckCircle2,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useGetClassroomQuery, useCreateAssignmentMutation, useDeleteAssignmentMutation } from '@/services/classroomApi';
import { useGetTopicsQuery } from '@/services/topicsApi';
import { useGetMeQuery } from '@/services/usersApi';
import { CATEGORIES, LEVELS } from '@/lib/constants';
import { roomColor, CATEGORY_COLORS } from '@/lib/rooms';

// Oda detay sayfası: odanın renginde başlık (öğretmene katılma kodu), solda ödevler, sağda canlı oyun ve sınıf kartları.

const CATEGORY_ICONS = {
  grammar: BookOpen,
  vocabulary: ListChecks,
  reading: GraduationCap,
  writing: PenLine,
  listening: Headphones,
};

const DAY = 24 * 60 * 60 * 1000;

function formatDate(value) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

// Teslim tarihine göre rozet: geçmiş → kırmızı, 2 gün içinde → turuncu, diğer → gri.
function dueStatus(value) {
  if (!value) return { label: 'No due date', className: 'bg-gray-100 text-gray-600' };
  const end = new Date(value);
  end.setHours(23, 59, 59, 999);
  const diff = end.getTime() - Date.now();
  if (diff < 0) return { label: `Overdue · ${formatDate(value)}`, className: 'bg-rose-50 text-rose-700' };
  if (diff < 2 * DAY) return { label: `Due soon · ${formatDate(value)}`, className: 'bg-amber-50 text-amber-700' };
  return { label: `Due ${formatDate(value)}`, className: 'bg-gray-100 text-gray-600' };
}

function CopyButton({ value, className = '' }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Pano erişimi yoksa sessizce geç.
    }
  };
  return (
    <button type="button" onClick={handleCopy} title="Copy" aria-label="Copy join code" className={className}>
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
}

function TopicIcon({ category }) {
  const Icon = CATEGORY_ICONS[category] ?? BookOpen;
  const color = CATEGORY_COLORS[category] ?? '#50af31';
  return (
    <span
      className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center"
      style={{ backgroundColor: `${color}1a`, color }}
    >
      <Icon size={18} strokeWidth={2} />
    </span>
  );
}

function topicMeta(topic) {
  const category = CATEGORIES.find((c) => c.slug === topic?.category)?.label;
  return [topic?.level, category].filter(Boolean).join(' · ');
}

function Card({ children, className = '' }) {
  return <div className={`rounded-2xl bg-white border border-gray-100 shadow-sm ${className}`}>{children}</div>;
}

function AssignForm({ classroomId, onDone }) {
  const [category, setCategory] = useState('grammar');
  const [level, setLevel] = useState('A1');
  const [topicId, setTopicId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const { data: topicsData, isFetching: topicsLoading } = useGetTopicsQuery({ category, level });
  const topics = topicsData?.data?.topics ?? [];
  const [createAssignment, { isLoading: submitting }] = useCreateAssignmentMutation();
  const ready = Boolean(topicId && dueDate);

  const handleAssign = async () => {
    if (!ready) return;
    setError('');
    try {
      await createAssignment({ id: classroomId, topicId, dueDate }).unwrap();
      onDone();
    } catch (err) {
      setError(err?.data?.message || 'Could not assign this topic.');
    }
  };

  return (
    <div className="border-t border-gray-100 bg-gray-50/60 px-5 sm:px-6 py-5 space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Category</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(({ slug, label }) => {
            const Icon = CATEGORY_ICONS[slug];
            const active = category === slug;
            const color = CATEGORY_COLORS[slug];
            return (
              <button
                key={slug}
                type="button"
                onClick={() => {
                  setCategory(slug);
                  setTopicId('');
                }}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  active ? 'text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
                style={active ? { backgroundColor: color, borderColor: color } : undefined}
              >
                <Icon size={15} />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Level</p>
        <div className="inline-flex rounded-full bg-white border border-gray-200 p-1">
          {LEVELS.map(({ code }) => (
            <button
              key={code}
              type="button"
              onClick={() => {
                setLevel(code);
                setTopicId('');
              }}
              className={`rounded-full px-4 py-1 text-sm font-semibold transition-colors ${
                level === code ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-[minmax(0,1fr)_auto] gap-4">
        <label className="block min-w-0">
          <span className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Lesson</span>
          <select
            value={topicId}
            onChange={(e) => setTopicId(e.target.value)}
            disabled={topicsLoading}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-300 disabled:bg-gray-50"
          >
            <option value="">{topicsLoading ? 'Loading lessons…' : 'Choose a lesson…'}</option>
            {topics.map((t) => (
              <option key={t._id} value={t._id}>
                {t.title}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Due date</span>
          <span className="relative block">
            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            />
          </span>
        </label>
      </div>

      {error && <p className="text-sm text-rose-600">{error}</p>}

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onDone}
          className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={!ready || submitting}
          onClick={handleAssign}
          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? 'Assigning...' : 'Assign lesson'}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function DeleteAssignmentConfirm({ open, onCancel, onConfirm, deleting }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Delete this assignment?</h3>
        <p className="text-sm text-gray-500 mb-6">Students' scores for it will no longer be tracked.</p>
        <div className="flex gap-2 justify-center">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="rounded-lg bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-semibold text-sm px-4 py-2 transition-colors"
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyAssignments({ text }) {
  return (
    <div className="px-6 py-12 text-center">
      <ClipboardList size={30} strokeWidth={1.5} className="mx-auto text-gray-300 mb-2" />
      <p className="text-sm text-gray-500">{text}</p>
    </div>
  );
}

function TeacherAssignments({ classroomId, assignments }) {
  const [formOpen, setFormOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [deleteAssignment, { isLoading: deleting }] = useDeleteAssignmentMutation();

  const handleConfirmDelete = async () => {
    try {
      await deleteAssignment({ id: classroomId, assignmentId: pendingDeleteId }).unwrap();
    } catch {
      // Silme başarısızsa liste olduğu gibi kalır.
    }
    setPendingDeleteId(null);
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-4">
        <h2 className="text-lg font-bold text-gray-900">
          Assignments <span className="text-gray-400 font-semibold">{assignments.length}</span>
        </h2>
        <button
          type="button"
          onClick={() => setFormOpen((o) => !o)}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
            formOpen ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-emerald-600 text-white hover:bg-emerald-700'
          }`}
        >
          {formOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {formOpen ? 'Close' : 'Assign a lesson'}
        </button>
      </div>

      {formOpen && <AssignForm classroomId={classroomId} onDone={() => setFormOpen(false)} />}

      {assignments.length === 0 ? (
        <div className="border-t border-gray-100">
          <EmptyAssignments text="No assignments yet. Assign a lesson to get your class started." />
        </div>
      ) : (
        <ul className="border-t border-gray-100 divide-y divide-gray-100">
          {assignments.map((a) => {
            const status = dueStatus(a.dueDate);
            return (
              <li key={a._id} className="group flex items-center gap-3 px-5 sm:px-6 py-3.5 hover:bg-gray-50/70 transition-colors">
                <TopicIcon category={a.topicId?.category} />
                <Link to={`/lesson/${a.topicId?._id}?classroomId=${classroomId}`} className="min-w-0 flex-1">
                  <span className="block font-semibold text-gray-900 truncate group-hover:text-emerald-700">
                    {a.topicId?.title ?? 'Deleted lesson'}
                  </span>
                  <span className="block text-xs text-gray-500">{topicMeta(a.topicId)}</span>
                </Link>
                <span className={`hidden sm:inline-flex shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${status.className}`}>
                  {status.label}
                </span>
                <button
                  type="button"
                  onClick={() => setPendingDeleteId(a._id)}
                  aria-label="Delete assignment"
                  title="Delete assignment"
                  className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-gray-300 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <DeleteAssignmentConfirm
        open={Boolean(pendingDeleteId)}
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={handleConfirmDelete}
        deleting={deleting}
      />
    </Card>
  );
}

function StudentAssignments({ classroomId, assignments }) {
  const { data: meData } = useGetMeQuery();
  const progress = meData?.data?.user?.progress;

  const progressByAssignment = useMemo(() => {
    const map = new Map();
    (progress ?? []).forEach((p) => {
      if (p.assignmentId) map.set(p.assignmentId, p);
    });
    return map;
  }, [progress]);

  const doneCount = assignments.filter((a) => progressByAssignment.has(a._id)).length;

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-4">
        <h2 className="text-lg font-bold text-gray-900">
          Assignments <span className="text-gray-400 font-semibold">{assignments.length}</span>
        </h2>
        {assignments.length > 0 && (
          <span className="text-sm text-gray-500">
            {doneCount}/{assignments.length} done
          </span>
        )}
      </div>

      {assignments.length === 0 ? (
        <div className="border-t border-gray-100">
          <EmptyAssignments text="No assignments yet — check back later." />
        </div>
      ) : (
        <ul className="border-t border-gray-100 divide-y divide-gray-100">
          {assignments.map((a) => {
            const entry = progressByAssignment.get(a._id);
            const status = dueStatus(a.dueDate);
            return (
              <li key={a._id} className="flex items-center gap-3 px-5 sm:px-6 py-3.5">
                <TopicIcon category={a.topicId?.category} />
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-gray-900 truncate">{a.topicId?.title ?? 'Deleted lesson'}</span>
                  <span className="block text-xs text-gray-500">
                    {topicMeta(a.topicId)}
                    {!entry && <span className="sm:hidden"> · {status.label}</span>}
                  </span>
                </span>
                {entry ? (
                  <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-sm font-semibold">
                    <CheckCircle2 size={15} /> {entry.score}
                  </span>
                ) : (
                  <>
                    <span className={`hidden sm:inline-flex shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${status.className}`}>
                      {status.label}
                    </span>
                    <Link
                      to={`/lesson/${a.topicId?._id}?assignmentId=${a._id}&classroomId=${classroomId}`}
                      className="shrink-0 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 transition-colors"
                    >
                      Start
                    </Link>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}

function LiveGameCard({ classroomId, isTeacher }) {
  const navigate = useNavigate();
  const [code, setCode] = useState('');

  const handleJoin = (e) => {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (trimmed) navigate(`/classroom/${classroomId}/game/${trimmed}`);
  };

  return (
    <Card className="p-5">
      <div className="flex items-center gap-3 mb-3">
        <span className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
          <Gamepad2 size={20} />
        </span>
        <div>
          <p className="font-bold text-gray-900">Live game</p>
          <p className="text-xs text-gray-500">{isTeacher ? 'Quiz your class in real time.' : 'Got a game code? Jump in.'}</p>
        </div>
      </div>
      {isTeacher ? (
        <button
          type="button"
          onClick={() => navigate(`/classroom/${classroomId}/game/new`)}
          className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 transition-colors"
        >
          Start a game
        </button>
      ) : (
        <form onSubmit={handleJoin} className="flex gap-2">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Game code"
            maxLength={6}
            aria-label="Game code"
            className="min-w-0 flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold uppercase tracking-widest text-center text-gray-900 placeholder:tracking-normal placeholder:font-normal placeholder:normal-case focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 transition-colors"
          >
            Join
          </button>
        </form>
      )}
    </Card>
  );
}

function ClassCard({ classroom, classroomId, isTeacher }) {
  const count = classroom.students.length;
  return (
    <Card className="p-5">
      <p className="font-bold text-gray-900 mb-3">Class</p>
      {!isTeacher && (
        <p className="flex items-center justify-between text-sm py-2 border-b border-gray-100">
          <span className="text-gray-500">Teacher</span>
          <span className="font-semibold text-gray-900 truncate ml-3">{classroom.teacherId?.name ?? '—'}</span>
        </p>
      )}
      <p className="flex items-center justify-between text-sm py-2">
        <span className="text-gray-500">Students</span>
        <span className="font-semibold text-gray-900">{count}</span>
      </p>
      <Link
        to={`/classroom/${classroomId}/students`}
        className="mt-2 w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold px-4 py-2 transition-colors"
      >
        <Users size={16} /> {isTeacher ? 'Students & results' : 'See classmates'}
      </Link>
    </Card>
  );
}

function RoomHeader({ classroom, isTeacher }) {
  const color = roomColor(classroom._id);
  const count = classroom.students.length;

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: color }}>
      <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/5 to-black/25" />
      <div className="absolute -right-16 -top-24 w-72 h-72 rounded-full bg-white/10" />
      <div className="absolute right-40 -bottom-28 w-56 h-56 rounded-full bg-white/10" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-5 pb-8 sm:pb-10">
        <Link to="/school" className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white mb-6">
          <ArrowLeft size={16} /> School Mode
        </Link>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex items-center gap-4 min-w-0">
            <span className="w-16 h-16 shrink-0 rounded-2xl bg-white shadow-lg flex items-center justify-center text-3xl font-extrabold" style={{ color }}>
              {classroom.name.trim().charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight break-words">{classroom.name}</h1>
              <p className="mt-1 text-sm text-white/85">
                {isTeacher ? 'You teach this class' : `Teacher: ${classroom.teacherId?.name ?? '—'}`} · {count} student
                {count === 1 ? '' : 's'}
              </p>
            </div>
          </div>

          {isTeacher && (
            <div className="shrink-0 rounded-2xl bg-white/15 border border-white/25 backdrop-blur-sm px-5 py-3 text-white">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/75 mb-1">Join code</p>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-extrabold tracking-[0.25em]">{classroom.joinCode}</span>
                <CopyButton
                  value={classroom.joinCode}
                  className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function ClassroomDetailPage() {
  const { id } = useParams();
  const currentUserId = useSelector((state) => state.auth.user?.id);
  const { data, isLoading, isError } = useGetClassroomQuery(id);

  const classroom = data?.data?.classroom;
  const assignments = data?.data?.assignments ?? [];
  const isTeacher = Boolean(classroom && classroom.teacherId?._id === currentUserId);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {classroom && <RoomHeader classroom={classroom} isTeacher={isTeacher} />}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        {isLoading && <p className="text-gray-400 text-sm py-10">Loading room...</p>}
        {isError && (
          <div className="py-10">
            <p className="text-rose-500 text-sm mb-3">Couldn't load this room.</p>
            <Link to="/school" className="text-sm font-semibold text-emerald-700 hover:underline">
              ← Back to School Mode
            </Link>
          </div>
        )}

        {classroom && (
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6 items-start">
            <div className="min-w-0">
              {isTeacher ? (
                <TeacherAssignments classroomId={id} assignments={assignments} />
              ) : (
                <StudentAssignments classroomId={id} assignments={assignments} />
              )}
            </div>
            <aside className="space-y-6">
              <LiveGameCard classroomId={id} isTeacher={isTeacher} />
              <ClassCard classroom={classroom} classroomId={id} isTeacher={isTeacher} />
            </aside>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
