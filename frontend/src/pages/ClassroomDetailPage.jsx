import { useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  BookOpen,
  ListChecks,
  PenLine,
  GraduationCap,
  ChevronRight,
  CalendarDays,
  Sparkles,
  Plus,
  X,
  Gamepad2,
  ClipboardList,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useGetClassroomQuery, useCreateAssignmentMutation, useDeleteAssignmentMutation } from '@/services/classroomApi';
import { useGetTopicsQuery } from '@/services/topicsApi';
import { useGetMeQuery } from '@/services/usersApi';
import { CATEGORIES, LEVELS } from '@/lib/constants';

const CATEGORY_ICONS = {
  grammar: BookOpen,
  vocabulary: ListChecks,
  reading: GraduationCap,
  writing: PenLine,
};

function formatDate(value) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function AssignmentsSection({ classroomId, assignments }) {
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [category, setCategory] = useState('grammar');
  const [level, setLevel] = useState('A1');
  const [topicId, setTopicId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const { data: topicsData, isFetching: topicsLoading } = useGetTopicsQuery({ category, level }, { skip: !isFormOpen });
  const topics = topicsData?.data?.topics ?? [];

  const [createAssignment, { isLoading: submitting }] = useCreateAssignmentMutation();
  const [deleteAssignment, { isLoading: deleting }] = useDeleteAssignmentMutation();

  const stepsComplete = [category, level, topicId, dueDate].filter(Boolean).length;

  const resetForm = () => {
    setCategory('grammar');
    setLevel('A1');
    setTopicId('');
    setDueDate('');
    setError('');
  };

  const handleToggleForm = () => {
    setIsFormOpen((open) => {
      if (open) resetForm();
      return !open;
    });
  };

  const handleAssign = async () => {
    if (stepsComplete < 4) return;
    setError('');
    try {
      await createAssignment({ id: classroomId, topicId, dueDate }).unwrap();
      setIsFormOpen(false);
      resetForm();
    } catch (err) {
      setError(err?.data?.message || 'Could not assign this topic.');
    }
  };

  const handleDeleteClick = (e, assignmentId) => {
    e.preventDefault();
    e.stopPropagation();
    setPendingDeleteId(assignmentId);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteAssignment({ id: classroomId, assignmentId: pendingDeleteId }).unwrap();
    } catch {
      // best-effort — RTK Query error is enough context via the network tab for now
    }
    setPendingDeleteId(null);
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Section header — always visible, this is the "closed" state */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">Assignments ({assignments.length})</h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(`/classroom/${classroomId}/game/new`)}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors px-4 py-2 text-sm font-semibold"
          >
            <Gamepad2 className="h-4 w-4" />
            Start Game
          </button>
          <button
            type="button"
            onClick={handleToggleForm}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              isFormOpen ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            {isFormOpen ? (
              <>
                <X className="h-4 w-4" />
                Cancel
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Add Assignment
              </>
            )}
          </button>
        </div>
      </div>

      {/* Collapsible form — only rendered/visible when opened */}
      <div
        className={`grid transition-all duration-300 ease-out ${
          isFormOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="rounded-2xl border border-emerald-100 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-emerald-50 bg-gradient-to-r from-emerald-50/60 to-white">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Assign a lesson</h4>
                  <p className="text-xs text-gray-500">Pick a topic and set a due date</p>
                </div>
              </div>
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1">
                {stepsComplete}/4 selected
              </span>
            </div>

            <div className="p-6 space-y-6">
              {/* Step 1: Category */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">1. Category</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {CATEGORIES.map(({ slug, label }) => {
                    const Icon = CATEGORY_ICONS[slug];
                    const active = category === slug;
                    return (
                      <button
                        key={slug}
                        type="button"
                        onClick={() => {
                          setCategory(slug);
                          setTopicId('');
                        }}
                        className={`flex flex-col items-center gap-2 rounded-xl border px-3 py-4 transition-all ${
                          active
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm'
                            : 'border-gray-200 text-gray-500 hover:border-emerald-200 hover:bg-emerald-50/40'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-sm font-medium">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Level */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">2. Level</p>
                <div className="flex flex-wrap gap-2">
                  {LEVELS.map(({ code }) => {
                    const active = level === code;
                    return (
                      <button
                        key={code}
                        type="button"
                        onClick={() => {
                          setLevel(code);
                          setTopicId('');
                        }}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                          active
                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                            : 'border-gray-200 text-gray-500 hover:border-emerald-300 hover:text-emerald-700'
                        }`}
                      >
                        {code}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3 & 4: Topic + Due date + Submit */}
              <div className="grid sm:grid-cols-[1fr_auto_auto] gap-3 items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">3. Topic</p>
                  <select
                    value={topicId}
                    onChange={(e) => setTopicId(e.target.value)}
                    disabled={topicsLoading}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 disabled:bg-gray-50"
                  >
                    <option value="">{topicsLoading ? 'Loading topics…' : 'Choose a topic…'}</option>
                    {topics.map((t) => (
                      <option key={t._id} value={t._id}>
                        {t.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">4. Due date</p>
                  <div className="relative">
                    <CalendarDays className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="rounded-lg border border-gray-200 pl-9 pr-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  disabled={stepsComplete < 4 || submitting}
                  onClick={handleAssign}
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-emerald-600"
                >
                  {submitting ? 'Assigning...' : 'Assign'}
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {error && <p className="text-sm text-rose-600">{error}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Empty / list state — always visible below */}
      {assignments.length === 0 ? (
        <p className="text-sm text-gray-400">No assignments yet.</p>
      ) : (
        <div className="space-y-2">
          {assignments.map((a) => (
            <div
              key={a._id}
              className="flex items-center gap-2 rounded-lg border border-gray-100 px-4 py-3 hover:border-emerald-200 hover:shadow-sm transition-all"
            >
              <Link
                to={`/lesson/${a.topicId?._id}?classroomId=${classroomId}`}
                className="flex-1 flex items-center justify-between gap-3 min-w-0"
              >
                <span className="text-sm text-gray-800 truncate">{a.topicId?.title}</span>
                <span className="text-xs text-gray-500 shrink-0">Due {formatDate(a.dueDate)}</span>
              </Link>
              <button
                type="button"
                onClick={(e) => handleDeleteClick(e, a._id)}
                aria-label="Delete assignment"
                title="Delete assignment"
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-600 hover:text-white transition-colors text-sm font-semibold"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <DeleteAssignmentConfirm
        open={Boolean(pendingDeleteId)}
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={handleConfirmDelete}
        deleting={deleting}
      />
    </div>
  );
}

function StudentsCard({ classroomId, count }) {
  return (
    <Link
      to={`/classroom/${classroomId}/students`}
      className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 px-5 py-4 mb-8 hover:shadow-md hover:border-emerald-200 transition-all"
    >
      <span className="flex items-center gap-3">
        <span className="w-9 h-9 rounded-full bg-sky-50 flex items-center justify-center text-base">👥</span>
        <span className="text-sm font-semibold text-gray-900">
          {count} student{count === 1 ? '' : 's'}
        </span>
      </span>
      <span className="text-emerald-600 text-sm font-medium">View all →</span>
    </Link>
  );
}

function DeleteAssignmentConfirm({ open, onCancel, onConfirm, deleting }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Emin misiniz?</h3>
        <p className="text-sm text-gray-500 mb-6">
          This assignment will be deleted. Students' scores for it will no longer be tracked.
        </p>
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

function TeacherView({ classroom, assignments, classroomId }) {
  return (
    <>
      <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-5 mb-8">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Join code</p>
        <p className="text-2xl font-extrabold tracking-[0.3em] text-emerald-700">{classroom.joinCode}</p>
      </div>

      <StudentsCard classroomId={classroomId} count={classroom.students.length} />

      <AssignmentsSection classroomId={classroomId} assignments={assignments} />
    </>
  );
}

function JoinLiveGameCard({ classroomId }) {
  const navigate = useNavigate();
  const [code, setCode] = useState('');

  const handleJoin = () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;
    navigate(`/classroom/${classroomId}/game/${trimmed}`);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-indigo-100 bg-indigo-50/40 px-5 py-4 mb-8">
      <span className="flex items-center gap-2 text-sm font-semibold text-indigo-700 shrink-0">
        <Gamepad2 className="h-4 w-4" />
        Enter room code
      </span>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
        placeholder="Enter room code"
        maxLength={6}
        className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm uppercase tracking-widest text-gray-900 placeholder-gray-400 placeholder:tracking-normal placeholder:normal-case focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
      />
      <button
        type="button"
        onClick={handleJoin}
        disabled={!code.trim()}
        className="rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2 transition-colors shrink-0"
      >
        Join
      </button>
    </div>
  );
}

function StudentView({ classroom, assignments, classroomId }) {
  const { data: meData } = useGetMeQuery();
  const progress = meData?.data?.user?.progress ?? [];
  const [activePanel, setActivePanel] = useState(null); // null | 'game' | 'assignments'

  const progressByAssignment = useMemo(() => {
    const map = new Map();
    progress.forEach((p) => {
      if (p.assignmentId) map.set(p.assignmentId, p);
    });
    return map;
  }, [progress]);

  const togglePanel = (panel) => setActivePanel((prev) => (prev === panel ? null : panel));

  return (
    <>
      <p className="text-sm text-gray-500 mb-4">Teacher: {classroom.teacherId?.name}</p>

      <StudentsCard classroomId={classroomId} count={classroom.students.length} />

      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={() => togglePanel('game')}
          className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
            activePanel === 'game'
              ? 'bg-indigo-600 text-white'
              : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
          }`}
        >
          <Gamepad2 className="h-4 w-4" />
          Join a Live Game
        </button>
        <button
          type="button"
          onClick={() => togglePanel('assignments')}
          className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
            activePanel === 'assignments'
              ? 'bg-emerald-600 text-white'
              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
          }`}
        >
          <ClipboardList className="h-4 w-4" />
          See Assignments ({assignments.length})
        </button>
      </div>

      {activePanel === 'game' && <JoinLiveGameCard classroomId={classroomId} />}

      {activePanel === 'assignments' && (
        <div className="space-y-3 mb-8">
          {assignments.length === 0 && <p className="text-sm text-gray-400">No assignments yet — check back later.</p>}

          {assignments.map((a) => {
            const entry = progressByAssignment.get(a._id);
            return (
              <div
                key={a._id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-100 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">{a.topicId?.title}</p>
                  <p className="text-xs text-gray-500">Due {formatDate(a.dueDate)}</p>
                </div>
                {entry ? (
                  <span className="text-sm font-semibold text-emerald-700">✓ Completed — {entry.score}</span>
                ) : (
                  <Link
                    to={`/lesson/${a.topicId?._id}?assignmentId=${a._id}&classroomId=${classroomId}`}
                    className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 transition-colors"
                  >
                    Start
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default function ClassroomDetailPage() {
  const { id } = useParams();
  const currentUserId = useSelector((state) => state.auth.user?.id);
  const { data, isLoading, isError } = useGetClassroomQuery(id);

  const classroom = data?.data?.classroom;
  const assignments = data?.data?.assignments ?? [];
  const isTeacher = classroom && classroom.teacherId?._id === currentUserId;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {!isLoading && classroom && (
        <div className="bg-emerald-600">
          <h1 className="max-w-6xl mx-auto px-6 py-4 text-center text-white font-bold tracking-wide uppercase text-sm sm:text-base">
            {classroom.name}
          </h1>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 pb-20 pt-4 flex-1 w-full">
        <Link to="/classrooms" className="inline-block text-sm text-gray-500 hover:text-emerald-600 mb-6">
          ← Back to My Class
        </Link>

        {isLoading && <p className="text-gray-400 text-sm py-10">Loading room...</p>}
        {isError && <p className="text-rose-500 text-sm py-10">Couldn't load this room.</p>}

        {!isLoading && classroom && (
          <>
            {isTeacher ? (
              <TeacherView classroom={classroom} assignments={assignments} classroomId={id} />
            ) : (
              <StudentView classroom={classroom} assignments={assignments} classroomId={id} />
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
