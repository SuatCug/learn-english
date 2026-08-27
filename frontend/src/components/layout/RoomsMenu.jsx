import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreateRoomButton from './CreateRoomButton';
import JoinRoomButton from './JoinRoomButton';
import PlanModal from './PlanModal';

function MenuCard({ icon, title, subtitle, onClick, iconBg, badge }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-gray-50 transition-colors"
    >
      <span className={`w-9 h-9 rounded-full flex items-center justify-center text-base shrink-0 ${iconBg}`}>
        {icon}
      </span>
      <span>
        <span className="flex items-center gap-1.5">
          <span className="block text-sm font-semibold text-gray-800">{title}</span>
          {badge && (
            <span className="rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 uppercase tracking-wide">
              {badge}
            </span>
          )}
        </span>
        <span className="block text-xs text-gray-500">{subtitle}</span>
      </span>
    </button>
  );
}

export default function RoomsMenu() {
  const isPremium = useSelector((state) => state.auth.user?.isPremium);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  // Create/Join modallarının open state'i burada tutulur (menuOpen'dan bağımsız),
  // çünkü menü kapanınca (menuOpen=false) dropdown içeriği DOM'dan kalkıyor —
  // modal state'i CreateRoomButton/JoinRoomButton'ın kendi içinde olsaydı o an kaybolurdu.
  const [createOpen, setCreateOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [planModalOpen, setPlanModalOpen] = useState(false);

  const handleCreateRoomClick = () => {
    setMenuOpen(false);
    // Premium olmayan kullanıcı için oda oluşturma formunu değil, Normal/Premium
    // mod karşılaştırma ekranını açıyoruz — kullanıcı isterse Normal modda devam edebilir.
    if (isPremium) {
      setCreateOpen(true);
    } else {
      setPlanModalOpen(true);
    }
  };

  return (
    <div className="relative hidden sm:block">
      <button
        type="button"
        onClick={() => setMenuOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 text-emerald-700 text-sm font-medium px-4 py-1.5 hover:bg-emerald-50 transition-colors"
      >
        <span aria-hidden="true">🏫</span> School Mode
      </button>

      {menuOpen && (
        <>
          <div className="fixed inset-0 z-[55]" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-[56] w-64 rounded-xl border border-gray-100 bg-white shadow-lg p-2 flex flex-col">
            <MenuCard
              icon="➕"
              iconBg="bg-emerald-50"
              title="Create Room"
              subtitle={isPremium ? 'Start a new classroom' : 'See Premium plans'}
              badge={!isPremium ? 'PRO' : null}
              onClick={handleCreateRoomClick}
            />
            <MenuCard
              icon="🔑"
              iconBg="bg-gray-100"
              title="Join Room"
              subtitle="Enter a class code"
              onClick={() => {
                setMenuOpen(false);
                setJoinOpen(true);
              }}
            />
            <MenuCard
              icon="🎓"
              iconBg="bg-sky-50"
              title="My Class"
              subtitle="Rooms you teach or joined"
              onClick={() => {
                setMenuOpen(false);
                navigate('/classrooms');
              }}
            />
          </div>
        </>
      )}

      {/* Her zaman monte edilir (menuOpen'a bağlı değil) ki modal state'i menü kapanınca kaybolmasın. */}
      <CreateRoomButton trigger={() => null} open={createOpen} onOpenChange={setCreateOpen} />
      <JoinRoomButton trigger={() => null} open={joinOpen} onOpenChange={setJoinOpen} />
      <PlanModal open={planModalOpen} onClose={() => setPlanModalOpen(false)} />
    </div>
  );
}
