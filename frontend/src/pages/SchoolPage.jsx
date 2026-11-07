import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Plus,
  KeyRound,
  Users,
  ArrowRight,
  Copy,
  Check,
  School,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CreateRoomButton from '@/components/layout/CreateRoomButton';
import PlanModal from '@/components/layout/PlanModal';
// Fotoğraf: Unsplash (photo-1524178232363-1fb2b075b655), Unsplash lisansı ile ücretsiz kullanım (2000px webp).
import heroImage from '@/assets/school-hero.webp';
import { useGetMyClassroomsQuery, useJoinClassroomMutation } from '@/services/classroomApi';
import { roomColor } from '@/lib/rooms';

// School Mode giriş sayfası: sınıf fotoğrafı, "koda katıl" (premium için ayrıca "oda kur") kartları ve kullanıcının odaları.


function JoinCard() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [joinClassroom, { isLoading }] = useJoinClassroomMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (code.length !== 6) {
      setError('Enter the 6-character code.');
      return;
    }
    try {
      const res = await joinClassroom({ joinCode: code.trim().toUpperCase() }).unwrap();
      navigate(`/classroom/${res.data.classroom._id}`);
    } catch (err) {
      setError(err?.data?.message || 'Sınıfa katılamadın, kodu kontrol et.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 flex flex-col">
      <span className="w-10 h-10 rounded-full bg-sky-50 text-sky-700 flex items-center justify-center mb-3">
        <KeyRound size={18} strokeWidth={2} />
      </span>
      <p className="font-bold text-gray-900">Join a room</p>
      <p className="text-sm text-gray-500 mb-4">Enter the code your teacher gave you.</p>
      <div className="mt-auto flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
          placeholder="A7F2K9"
          maxLength={6}
          aria-label="Room code"
          className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold tracking-[0.25em] text-center uppercase text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="shrink-0 rounded-lg bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 transition-colors"
        >
          {isLoading ? '...' : 'Join'}
        </button>
      </div>
      {error && <p className="text-sm text-rose-600 mt-2">{error}</p>}
    </form>
  );
}

function CreateCard({ onCreate }) {
  return (
    <button
      type="button"
      onClick={onCreate}
      className="group rounded-2xl bg-white border border-gray-100 shadow-sm p-5 flex flex-col text-left hover:border-emerald-200 hover:shadow-md transition-all"
    >
      <span className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
        <Plus size={20} strokeWidth={2} />
      </span>
      <span className="font-bold text-gray-900">Create a room</span>
      <span className="text-sm text-gray-500 mb-4">Open a new classroom for your students.</span>
      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
        Start a new class
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </button>
  );
}

function CopyCode({ code }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Pano erişimi yoksa sessizce geç.
    }
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      title="Copy join code"
      className="inline-flex items-center gap-1.5 rounded-md bg-gray-50 px-2 py-1 text-xs font-bold tracking-[0.2em] text-gray-700 hover:bg-gray-100 transition-colors"
    >
      {code}
      {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} className="text-gray-400" />}
    </button>
  );
}


function RoomRow({ classroom }) {
  const isTeacher = classroom.role === 'teacher';
  const color = roomColor(classroom._id);

  return (
    <Link
      to={`/classroom/${classroom._id}`}
      className="group flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-gray-50 transition-colors"
    >
      <span
        className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center text-white text-lg font-extrabold"
        style={{ backgroundColor: color }}
      >
        {classroom.name.trim().charAt(0).toUpperCase()}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-gray-900 truncate" title={classroom.name}>
          {classroom.name}
        </span>
        <span className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-500 min-w-0">
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
              isTeacher ? 'bg-emerald-50 text-emerald-700' : 'bg-sky-50 text-sky-700'
            }`}
          >
            {isTeacher ? 'Teacher' : 'Student'}
          </span>
          <Users size={13} className="shrink-0" />
          <span className="truncate">
            {isTeacher
              ? `${classroom.studentCount} student${classroom.studentCount === 1 ? '' : 's'}`
              : classroom.teacherId?.name ?? '—'}
          </span>
        </span>
      </span>
      {isTeacher && (
        <span className="hidden min-[400px]:inline-flex">
          <CopyCode code={classroom.joinCode} />
        </span>
      )}
      <ArrowRight size={17} className="shrink-0 text-gray-300 transition-all group-hover:text-gray-600 group-hover:translate-x-0.5" />
    </Link>
  );
}

// Fotoğrafın üstünde duran "My rooms" paneli; oda çoksa kendi içinde kaydırılır.
function MyRoomsPanel({ classrooms, isLoading, isError }) {
  return (
    <div className="rounded-2xl bg-white/95 backdrop-blur border border-gray-100 lg:border-transparent shadow-sm lg:shadow-xl p-4 sm:p-5 w-full min-w-0">
      <div className="flex items-center justify-between gap-3 px-1 mb-2">
        <h2 className="text-lg font-bold text-gray-900">My rooms</h2>
        {classrooms.length > 0 && <span className="text-xs font-semibold text-gray-400">{classrooms.length} total</span>}
      </div>

      {isLoading && <p className="px-1 py-6 text-sm text-gray-400">Loading rooms...</p>}
      {isError && <p className="px-1 py-6 text-sm text-rose-500">Couldn't load your rooms. Please try again.</p>}

      {!isLoading && !isError && classrooms.length === 0 && (
        <div className="rounded-xl border-2 border-dashed border-gray-200 px-4 py-8 text-center">
          <School size={28} strokeWidth={1.5} className="mx-auto text-gray-300 mb-2" />
          <p className="font-semibold text-gray-700">No rooms yet</p>
          <p className="text-sm text-gray-500">Join with a code or create your own class.</p>
        </div>
      )}

      {classrooms.length > 0 && (
        <div className="max-h-[340px] overflow-y-auto -mx-1 divide-y divide-gray-100">
          {classrooms.map((classroom) => (
            <RoomRow key={classroom._id} classroom={classroom} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SchoolPage() {
  const isPremium = useSelector((state) => state.auth.user?.isPremium);
  const { data, isLoading, isError } = useGetMyClassroomsQuery();
  const classrooms = data?.data?.classrooms ?? [];
  const [createOpen, setCreateOpen] = useState(false);
  const [planOpen, setPlanOpen] = useState(false);

  const handleCreate = () => (isPremium ? setCreateOpen(true) : setPlanOpen(true));

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Masaüstü: tam genişlikte fotoğrafın üstünde solda başlık + kartlar, sağda "My rooms" paneli.
          Mobil: fotoğraf üstte ayrı bir şerit, içerik altında beyaz zeminde. */}
      <section className="relative isolate lg:overflow-hidden flex-1 flex flex-col">
        <div className="relative h-52 sm:h-72 lg:absolute lg:inset-0 lg:h-auto lg:-z-10">
          <img
            src={heroImage}
            alt="An instructor giving a lesson to adult students in a classroom"
            className="w-full h-full object-cover object-[45%_40%]"
          />
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-gray-950/85 via-gray-950/55 to-gray-950/35" />
        </div>
        <div className="max-w-6xl mx-auto w-full flex-1 px-4 sm:px-6 py-8 sm:py-12 lg:py-20 lg:min-h-[600px] grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-8 lg:gap-10 items-center">
          <div className="max-w-xl min-w-0">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 lg:text-white leading-tight mb-3">
              Your classroom
            </h1>
            <p className="text-gray-600 lg:text-white/85 text-base sm:text-lg leading-relaxed mb-7">
              Create a room for your class, or join one with the code your teacher gave you.
            </p>
            {isPremium ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CreateCard onCreate={handleCreate} />
                <JoinCard />
              </div>
            ) : (
              <div className="max-w-md">
                <JoinCard />
                <button
                  type="button"
                  onClick={handleCreate}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 lg:text-white/90 hover:underline"
                >
                  Are you a teacher? Create a room
                  <span className="rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 uppercase tracking-wide no-underline">
                    Pro
                  </span>
                  <ArrowRight size={15} />
                </button>
              </div>
            )}
          </div>

          <MyRoomsPanel classrooms={classrooms} isLoading={isLoading} isError={isError} />
        </div>
      </section>

      <Footer />

      <CreateRoomButton trigger={() => null} open={createOpen} onOpenChange={setCreateOpen} />
      <PlanModal open={planOpen} onClose={() => setPlanOpen(false)} />
    </div>
  );
}
