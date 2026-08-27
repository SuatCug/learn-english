import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCreateClassroomMutation } from '@/services/classroomApi';

export default function CreateRoomButton({ trigger, open: openProp, onOpenChange } = {}) {
  const isPremium = useSelector((state) => state.auth.user?.isPremium);
  const navigate = useNavigate();
  const [internalOpen, setInternalOpen] = useState(false);
  // Kontrollü (RoomsMenu gibi bir üst bileşenin open state'ini yönettiği) veya
  // kontrolsüz (kendi başına <CreateRoomButton /> olarak kullanıldığında) çalışabilir.
  const open = openProp !== undefined ? openProp : internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [createdClassroom, setCreatedClassroom] = useState(null);
  const [createClassroom, { isLoading }] = useCreateClassroomMutation();

  if (!isPremium) return null;

  const handleClose = () => {
    setOpen(false);
    setName('');
    setError('');
    setCreatedClassroom(null);
  };

  const handleGoToRoom = () => {
    navigate(`/classroom/${createdClassroom._id}`);
    handleClose();
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await createClassroom({ name }).unwrap();
      setCreatedClassroom(res.data.classroom);
    } catch (err) {
      setError(err?.data?.message || 'Sınıf oluşturulamadı.');
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
          className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-200 text-emerald-700 text-sm font-medium px-4 py-1.5 hover:bg-emerald-50 transition-colors"
        >
          <span aria-hidden="true">➕</span> Create Room
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center p-4" onClick={handleClose}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
            {!createdClassroom ? (
              <form onSubmit={handleCreate}>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Create a classroom</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Students will join with a 6-character code once the room is created.
                </p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. 10-A English"
                  required
                  minLength={2}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-3"
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
                    disabled={isLoading}
                    className="rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 transition-colors"
                  >
                    {isLoading ? 'Creating...' : 'Create'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Room created!</p>
                <h3 className="text-lg font-bold text-gray-900 mb-4">{createdClassroom.name}</h3>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Join code</p>
                <p className="text-3xl font-extrabold tracking-[0.3em] text-emerald-700 mb-6">
                  {createdClassroom.joinCode}
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
