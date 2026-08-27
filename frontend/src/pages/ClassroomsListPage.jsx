import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CreateRoomButton from '@/components/layout/CreateRoomButton';
import JoinRoomButton from '@/components/layout/JoinRoomButton';
import { useGetMyClassroomsQuery } from '@/services/classroomApi';

function ClassroomCard({ classroom }) {
  const isTeacher = classroom.role === 'teacher';

  return (
    <Link
      to={`/classroom/${classroom._id}`}
      className="block rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-emerald-200 transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-base font-bold text-gray-900 leading-snug">{classroom.name}</h3>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
            isTeacher ? 'bg-emerald-50 text-emerald-700' : 'bg-sky-50 text-sky-700'
          }`}
        >
          {isTeacher ? 'Teacher' : 'Student'}
        </span>
      </div>

      {isTeacher ? (
        <>
          <p className="text-sm text-gray-500 mb-1">
            {classroom.studentCount} student{classroom.studentCount === 1 ? '' : 's'}
          </p>
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            Join code: <span className="font-semibold text-gray-600 tracking-[0.2em]">{classroom.joinCode}</span>
          </p>
        </>
      ) : (
        <p className="text-sm text-gray-500">Teacher: {classroom.teacherId?.name}</p>
      )}
    </Link>
  );
}

export default function ClassroomsListPage() {
  const { data, isLoading, isError } = useGetMyClassroomsQuery();
  const classrooms = data?.data?.classrooms ?? [];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="bg-emerald-600">
        <h1 className="max-w-6xl mx-auto px-6 py-4 text-center text-white font-bold tracking-wide uppercase text-sm sm:text-base">
          My Class
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20 pt-8 flex-1 w-full">
        <div className="flex items-center justify-between gap-4 mb-8">
          <p className="text-sm text-gray-500">
            Classrooms you teach or have joined as a student appear here.
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <CreateRoomButton />
            <JoinRoomButton />
          </div>
        </div>

        {isLoading && <p className="text-gray-400 text-sm py-10">Loading rooms...</p>}
        {isError && <p className="text-rose-500 text-sm py-10">Couldn't load your rooms. Please try again.</p>}

        {!isLoading && !isError && classrooms.length === 0 && (
          <div className="rounded-xl border border-gray-100 p-10 text-center text-gray-400 text-sm">
            You don't have any rooms yet. Create one (if you're a premium/teacher account) or join one with a code.
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {classrooms.map((classroom) => (
            <ClassroomCard key={classroom._id} classroom={classroom} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
