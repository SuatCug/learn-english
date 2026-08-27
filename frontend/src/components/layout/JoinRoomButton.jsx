import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJoinClassroomMutation } from '@/services/classroomApi';

export default function JoinRoomButton({ trigger, open: openProp, onOpenChange } = {}) {
  const navigate = useNavigate();
  const [internalOpen, setInternalOpen] = useState(false);
  const open = openProp !== undefined ? openProp : internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  const [joinCode, setJoinCode] = useState('');
  const [error, setError] = useState('');
  const [joinedClassroom, setJoinedClassroom] = useState(null);
  const [joinClassroom, { isLoading }] = useJoinClassroomMutation();

  const handleClose = () => {
    setOpen(false);
    setJoinCode('');
    setError('');
    setJoinedClassroom(null);
  };

  const handleGoToRoom = () => {
    navigate(`/classroom/${joinedClassroom._id}`);
    handleClose();
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await joinClassroom({ joinCode: joinCode.trim().toUpperCase() }).unwrap();
      setJoinedClassroom(res.data.classroom);
    } catch (err) {
      setError(err?.data?.message || 'Sınıfa katılamadın, kodu kontrol et.');
    }
  };

  return (
    <>
      {trigger ? (
        trigger(() => setOpen(true))
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-gray-200 text-gray-700 text-sm font-medium px-4 py-1.5 hover:bg-gray-50 transition-colors"
        >
          <span aria-hidden="true">🔑</span> Join Room
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center p-4" onClick={handleClose}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
            {!joinedClassroom ? (
              <form onSubmit={handleJoin}>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Join a classroom</h3>
                <p className="text-sm text-gray-500 mb-4">Enter the 6-character code your teacher gave you.</p>
                <input
                  type="text"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  placeholder="e.g. A7F2K9"
                  required
                  minLength={6}
                  maxLength={6}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 tracking-[0.3em] text-center font-semibold uppercase focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-3"
                />
                {error && <p className="text-sm text-rose-600 mb-3">{error}</p>}
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || joinCode.trim().length !== 6}
                    className="rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 transition-colors"
                  >
                    {isLoading ? 'Joining...' : 'Join'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">You've joined!</p>
                <h3 className="text-lg font-bold text-gray-900 mb-4">{joinedClassroom.name}</h3>
                <p className="text-sm text-gray-500 mb-6">
                  Your teacher will assign lessons here — check back once they've added an assignment.
                </p>
                <div className="flex gap-2 justify-center">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleGoToRoom}
                    className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-6 py-2 transition-colors"
                  >
                    Go to room →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
