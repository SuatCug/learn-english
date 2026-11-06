import { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Headphones } from 'lucide-react';

const SPEEDS = [0.75, 1, 1.25];

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
};

// Listening konuları için ses oynatıcı: oynat/duraklat, ilerleme çubuğu, 5 sn geri sarma ve hız seçimi.
// Tarayıcının kendi <audio> öğesini kullanır; görünüm kategori temasından gelir.
export default function ListeningPlayer({ src, theme }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = speed;
  }, [speed]);

  if (!src || failed) {
    return (
      <div className={`rounded-xl border ${theme.borderLighter} ${theme.subtleBg} p-5 mb-6 flex items-center gap-3 text-sm text-gray-500`}>
        <Headphones className={`h-5 w-5 ${theme.text}`} />
        The recording for this lesson isn't available yet — please check back soon.
      </div>
    );
  }

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => setFailed(true));
    else audio.pause();
  };

  const seek = (value) => {
    if (audioRef.current) audioRef.current.currentTime = value;
  };

  return (
    <div className={`rounded-xl border ${theme.borderLighter} ${theme.subtleBg} p-4 sm:p-5 mb-6`}>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration);
          e.currentTarget.playbackRate = speed;
        }}
        onError={() => setFailed(true)}
      />

      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pause' : 'Play'}
          className={`w-12 h-12 shrink-0 rounded-full ${theme.solid} ${theme.solidHover} text-white flex items-center justify-center transition-colors`}
        >
          {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-[1px]" />}
        </button>

        <div className="flex-1 min-w-0">
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={Math.min(current, duration || 0)}
            onChange={(e) => seek(Number(e.target.value))}
            aria-label="Seek"
            className={`w-full cursor-pointer ${theme.accent ?? ''}`}
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500 tabular-nums">
            <span>{formatTime(current)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => seek(Math.max(0, current - 5))}
          className={`inline-flex items-center gap-1.5 rounded-lg border ${theme.borderLight} bg-white px-3 py-1.5 text-xs font-semibold ${theme.text} ${theme.lightBgHover} transition-colors`}
        >
          <RotateCcw className="h-3.5 w-3.5" /> 5s
        </button>
        <span className="ml-auto text-xs text-gray-500">Speed</span>
        {SPEEDS.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setSpeed(value)}
            aria-pressed={speed === value}
            className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
              speed === value ? `${theme.solid} text-white` : `bg-white border ${theme.borderLight} ${theme.text} ${theme.lightBgHover}`
            }`}
          >
            {value}x
          </button>
        ))}
      </div>
    </div>
  );
}
