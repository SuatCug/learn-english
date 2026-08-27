import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Gamepad2, Users, Trophy, Copy, Check } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useGetClassroomQuery } from '@/services/classroomApi';
import { getSocket, disconnectSocket } from '@/lib/socket';
import { CATEGORIES, LEVELS } from '@/lib/constants';

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
const GAME_CATEGORIES = CATEGORIES.filter((c) => c.slug === 'grammar' || c.slug === 'vocabulary');

function RoomCodeBadge({ roomCode }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(roomCode);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          // clipboard not available — badge still shows the code visually
        }
      }}
      className="flex items-center gap-3 rounded-2xl border-2 border-dashed border-indigo-300 bg-indigo-50 px-8 py-4 hover:bg-indigo-100 transition-colors"
      title="Copy room code"
    >
      <span className="text-3xl font-extrabold tracking-[0.3em] text-indigo-700">{roomCode}</span>
      {copied ? <Check className="h-5 w-5 text-emerald-600" /> : <Copy className="h-5 w-5 text-indigo-400" />}
    </button>
  );
}

function PlayerList({ players }) {
  if (!players.length) {
    return <p className="text-sm text-gray-400 text-center py-6">Waiting for players to join…</p>;
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {players.map((p) => (
        <div
          key={p.id}
          className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium truncate ${
            p.online === false ? 'border-gray-100 bg-gray-50 text-gray-400' : 'border-indigo-100 bg-indigo-50 text-indigo-700'
          }`}
        >
          <span className="w-2 h-2 rounded-full shrink-0 bg-current opacity-60" />
          <span className="truncate">{p.name}</span>
        </div>
      ))}
    </div>
  );
}

function GameSetupPicker({ isHost, onCreate, creating, error }) {
  const [category, setCategory] = useState('grammar');
  const [level, setLevel] = useState('A1');

  if (!isHost) {
    return <p className="text-center text-gray-400 text-sm py-16">Only the teacher can start a new game.</p>;
  }

  return (
    <div className="max-w-lg mx-auto rounded-2xl border border-indigo-100 bg-white shadow-sm p-6 space-y-6">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white">
          <Gamepad2 className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-900">Set up your live game</h2>
          <p className="text-xs text-gray-500">Questions are pulled from existing topics</p>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Category</p>
        <div className="grid grid-cols-2 gap-3">
          {GAME_CATEGORIES.map(({ slug, label, icon }) => (
            <button
              key={slug}
              type="button"
              onClick={() => setCategory(slug)}
              className={`flex flex-col items-center gap-1 rounded-xl border px-3 py-4 transition-all ${
                category === slug
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm'
                  : 'border-gray-200 text-gray-500 hover:border-indigo-200 hover:bg-indigo-50/40'
              }`}
            >
              <span className="text-lg">{icon}</span>
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Level</p>
        <div className="flex flex-wrap gap-2">
          {LEVELS.map(({ code }) => (
            <button
              key={code}
              type="button"
              onClick={() => setLevel(code)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                level === code
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                  : 'border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-700'
              }`}
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-rose-600">{error}</p>}

      <button
        type="button"
        disabled={creating}
        onClick={() => onCreate({ category, level })}
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-sm px-5 py-3 transition-colors"
      >
        <Gamepad2 className="h-4 w-4" />
        {creating ? 'Creating room…' : 'Create Game'}
      </button>
    </div>
  );
}

function WaitingRoom({ isHost, roomCode, players, onStart, starting, joinError }) {
  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      <div>
        <p className="text-sm text-gray-500 mb-3">{isHost ? 'Share this code with your students' : 'Waiting room'}</p>
        <RoomCodeBadge roomCode={roomCode} />
      </div>

      {joinError && <p className="text-sm text-rose-600">{joinError}</p>}

      <div className="rounded-2xl border border-gray-100 p-6 text-left">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3 flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" />
          Players ({players.length})
        </p>
        <PlayerList players={players} />
      </div>

      {isHost ? (
        <button
          type="button"
          disabled={!players.length || starting}
          onClick={onStart}
          className="rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm px-8 py-3 transition-colors"
        >
          {starting ? 'Starting…' : 'Start Game'}
        </button>
      ) : (
        <p className="text-sm text-gray-400">Waiting for the host to start the game…</p>
      )}
    </div>
  );
}

function TimerBar({ timeLeftMs, durationMs }) {
  const percent = durationMs ? Math.max(0, Math.min(100, (timeLeftMs / durationMs) * 100)) : 0;
  return (
    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-200 ${percent < 25 ? 'bg-rose-500' : 'bg-indigo-500'}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

function QuestionView({ isHost, question, timeLeftMs, selectedOption, onAnswer, reveal }) {
  return (
    <div className="rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-3 text-xs text-gray-400 font-medium">
        <span>
          Question {question.index + 1} / {question.total}
        </span>
        <span>{Math.ceil(timeLeftMs / 1000)}s</span>
      </div>
      <TimerBar timeLeftMs={timeLeftMs} durationMs={question.durationMs} />

      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mt-6 mb-6">{question.title}</h2>

      <div className="grid sm:grid-cols-2 gap-3">
        {question.options.map((opt, i) => {
          const isCorrect = reveal && reveal.correctIndex === i;
          const isWrongPick = reveal && selectedOption === i && !isCorrect;
          const isPicked = selectedOption === i;
          return (
            <button
              key={i}
              type="button"
              disabled={isHost || selectedOption !== null || Boolean(reveal)}
              onClick={() => onAnswer(i)}
              className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left text-sm font-medium transition-all disabled:cursor-not-allowed ${
                isCorrect
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                  : isWrongPick
                  ? 'border-rose-400 bg-rose-50 text-rose-700'
                  : isPicked
                  ? 'border-indigo-400 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50/40'
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-white/70 border border-current flex items-center justify-center text-xs font-bold shrink-0">
                {OPTION_LETTERS[i]}
              </span>
              <span className="truncate">{opt}</span>
              {reveal && <span className="ml-auto text-xs text-gray-400">{reveal.tally?.[i] ?? 0}</span>}
            </button>
          );
        })}
      </div>

      {isHost && !reveal && <p className="text-xs text-gray-400 mt-4">Live — students are answering…</p>}
      {reveal && (
        <p className="text-sm text-gray-500 mt-4">
          {reveal.correctCount} player{reveal.correctCount === 1 ? '' : 's'} answered correctly. Next question coming up…
        </p>
      )}
    </div>
  );
}

function Leaderboard({ players }) {
  const top = players.slice(0, 8);
  const max = Math.max(1, ...top.map((p) => p.score));
  return (
    <div className="rounded-2xl border border-gray-100 p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3 flex items-center gap-1.5">
        <Trophy className="h-3.5 w-3.5" />
        Leaderboard
      </p>
      {!top.length && <p className="text-sm text-gray-400">No scores yet.</p>}
      <div className="space-y-2.5">
        {top.map((p) => (
          <div key={p.id}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-medium text-gray-700 truncate">
                #{p.rank} {p.name}
              </span>
              <span className="font-semibold text-indigo-700">{p.score}</span>
            </div>
            <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full rounded-full bg-indigo-500" style={{ width: `${(p.score / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const MEDALS = { 1: '🥇', 2: '🥈', 3: '🥉' };
const MEDAL_ROW_CLASS = {
  1: 'border-amber-200 bg-amber-50/60',
  2: 'border-gray-200 bg-gray-50',
  3: 'border-orange-200 bg-orange-50/60',
};

function GameOverScreen({ finalLeaderboard, classroomId, isHost }) {
  const navigate = useNavigate();
  return (
    <div className="max-w-xl mx-auto text-center space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Game Over!</h2>
      <div className="rounded-2xl border border-gray-100 p-5 text-left">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-4">Final Leaderboard</p>
        <div className="space-y-2">
          {finalLeaderboard.map((p) => (
            <div
              key={p.id}
              className={`flex items-center justify-between rounded-lg border px-4 py-2.5 ${
                MEDAL_ROW_CLASS[p.rank] ?? 'border-gray-100'
              }`}
            >
              <span className="text-sm font-medium text-gray-800 flex items-center gap-2.5">
                <span className="w-6 text-center text-base">{MEDALS[p.rank] ?? p.rank}</span>
                {p.name}
              </span>
              <span className="text-sm font-bold text-indigo-700">{p.score} pts</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-3">
        <Link
          to={`/classroom/${classroomId}`}
          className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 transition-colors"
        >
          Back to Classroom
        </Link>
        {isHost && (
          <button
            type="button"
            onClick={() => navigate(`/classroom/${classroomId}/game/new`, { replace: true })}
            className="rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 transition-colors"
          >
            Start Another Game
          </button>
        )}
      </div>
    </div>
  );
}

export default function LiveGamePage() {
  const { id: classroomId, roomCode } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const currentUserId = useSelector((state) => state.auth.user?.id);

  const { data } = useGetClassroomQuery(classroomId);
  const classroom = data?.data?.classroom;
  const isHost = Boolean(classroom && classroom.teacherId?._id === currentUserId);

  const [phase, setPhase] = useState(roomCode === 'new' ? 'setup' : 'connecting');
  const [creating, setCreating] = useState(false);
  const [setupError, setSetupError] = useState('');
  const [joinError, setJoinError] = useState('');
  const [starting, setStarting] = useState(false);

  const [players, setPlayers] = useState([]);
  const [question, setQuestion] = useState(null);
  const [reveal, setReveal] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [finalLeaderboard, setFinalLeaderboard] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeftMs, setTimeLeftMs] = useState(0);

  const justCreatedRef = useRef(false);

  useEffect(() => {
    if (!token) return undefined;
    const socket = getSocket(token);

    const onPlayersUpdate = (payload) => setPlayers(payload.players);
    const onQuestion = (payload) => {
      setQuestion(payload);
      setSelectedOption(null);
      setReveal(null);
      setPhase('active');
    };
    const onReveal = (payload) => {
      setReveal(payload);
      setPhase('reveal');
    };
    const onLeaderboard = (payload) => setLeaderboard(payload.players);
    const onOver = (payload) => {
      setFinalLeaderboard(payload.finalLeaderboard);
      setPhase('over');
    };

    socket.on('game:playersUpdate', onPlayersUpdate);
    socket.on('game:question', onQuestion);
    socket.on('game:reveal', onReveal);
    socket.on('game:leaderboard', onLeaderboard);
    socket.on('game:over', onOver);

    socket.connect();

    return () => {
      socket.off('game:playersUpdate', onPlayersUpdate);
      socket.off('game:question', onQuestion);
      socket.off('game:reveal', onReveal);
      socket.off('game:leaderboard', onLeaderboard);
      socket.off('game:over', onOver);
      disconnectSocket();
    };
  }, [token]);

  // Var olan bir oda koduna girildiğinde (öğrenci, veya oyunu az önce oluşturmamış herhangi biri)
  // otomatik katılım isteği gönderilir. Oyunu az önce oluşturan öğretmen zaten sunucu tarafında
  // odaya eklendiği için burada tekrar katılmaya çalışmaz.
  useEffect(() => {
    if (roomCode === 'new' || justCreatedRef.current) return;
    setJoinError('');
    const socket = getSocket(token);
    const attemptJoin = () => {
      socket.emit('game:join', { roomCode, classroomId }, (ack) => {
        if (ack?.ok) {
          setPhase((prev) => (prev === 'connecting' ? 'waiting' : prev));
        } else {
          setJoinError(ack?.message || 'Could not join this game.');
          setPhase('error');
        }
      });
    };
    if (socket.connected) attemptJoin();
    else socket.once('connect', attemptJoin);
    return () => socket.off('connect', attemptJoin);
  }, [roomCode, classroomId, token]);

  useEffect(() => {
    if (phase !== 'active' || !question) return undefined;
    const tick = () => {
      const remaining = question.startedAt + question.durationMs - Date.now();
      setTimeLeftMs(Math.max(0, remaining));
    };
    tick();
    const interval = setInterval(tick, 200);
    return () => clearInterval(interval);
  }, [phase, question]);

  const handleCreate = ({ category, level }) => {
    setCreating(true);
    setSetupError('');
    const socket = getSocket(token);
    const submit = () => {
      socket.emit('game:create', { classroomId, category, level }, (ack) => {
        setCreating(false);
        if (ack?.ok) {
          justCreatedRef.current = true;
          setPlayers([]);
          setPhase('waiting');
          navigate(`/classroom/${classroomId}/game/${ack.roomCode}`, { replace: true });
        } else {
          setSetupError(ack?.message || 'Could not create the game.');
        }
      });
    };
    if (socket.connected) submit();
    else socket.once('connect', submit);
  };

  const handleStart = () => {
    setStarting(true);
    getSocket(token).emit('game:start', { roomCode }, (ack) => {
      setStarting(false);
      if (!ack?.ok) setJoinError(ack?.message || 'Could not start the game.');
    });
  };

  const handleAnswer = (optionIndex) => {
    if (isHost || selectedOption !== null || !question) return;
    setSelectedOption(optionIndex);
    getSocket(token).emit('game:answer', { roomCode, questionId: question.questionId, optionIndex }, () => {});
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="bg-indigo-600">
        <h1 className="max-w-6xl mx-auto px-6 py-4 text-center text-white font-bold tracking-wide uppercase text-sm sm:text-base flex items-center justify-center gap-2">
          <Gamepad2 className="h-4 w-4" />
          {classroom?.name ? `${classroom.name} — Live Game` : 'Live Game'}
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20 pt-6 flex-1 w-full">
        <Link to={`/classroom/${classroomId}`} className="inline-block text-sm text-gray-500 hover:text-indigo-600 mb-6">
          ← Back to room
        </Link>

        {phase === 'setup' && (
          <GameSetupPicker isHost={isHost} onCreate={handleCreate} creating={creating} error={setupError} />
        )}

        {phase === 'error' && (
          <p className="text-center text-rose-500 text-sm py-16">{joinError || 'Something went wrong.'}</p>
        )}

        {phase === 'waiting' && (
          <WaitingRoom
            isHost={isHost}
            roomCode={roomCode}
            players={players}
            onStart={handleStart}
            starting={starting}
            joinError={joinError}
          />
        )}

        {(phase === 'active' || phase === 'reveal') && question && (
          <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
            <QuestionView
              isHost={isHost}
              question={question}
              timeLeftMs={timeLeftMs}
              selectedOption={selectedOption}
              onAnswer={handleAnswer}
              reveal={reveal}
            />
            <div className="space-y-6">
              <Leaderboard players={leaderboard} />
            </div>
          </div>
        )}

        {phase === 'over' && (
          <GameOverScreen finalLeaderboard={finalLeaderboard} classroomId={classroomId} isHost={isHost} />
        )}
      </div>

      <Footer />
    </div>
  );
}
