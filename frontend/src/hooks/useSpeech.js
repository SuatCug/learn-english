import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

// Tarayıcının yerleşik ses tanıma (konuşma → yazı) ve ses sentezi (yazı → konuşma) özellikleri.
// Ses tanıma Chrome ve Edge'de çalışır; Firefox desteklemez.
const Recognition = typeof window !== 'undefined' ? window.SpeechRecognition || window.webkitSpeechRecognition : null;
const synthSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

// Düşük seviyelerde AI daha yavaş konuşur.
const RATE_BY_LEVEL = { A1: 0.8, A2: 0.88, B1: 0.95, B2: 1 };

function pickEnglishVoice() {
  const voices = window.speechSynthesis.getVoices().filter((v) => v.lang?.toLowerCase().startsWith('en'));
  return (
    voices.find((v) => v.lang === 'en-US' && /natural|online/i.test(v.name)) ||
    voices.find((v) => v.lang === 'en-US' && /google/i.test(v.name)) ||
    voices.find((v) => v.lang === 'en-US') ||
    voices[0] ||
    null
  );
}

// Kullanıcı konuşurken anlık metni (interim) gösterir; konuşma bitince onFinal(text) çağrılır.
export function useSpeechRecognition({ onFinal }) {
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState('');
  const [error, setError] = useState('');
  const recognitionRef = useRef(null);
  const onFinalRef = useRef(onFinal);

  useEffect(() => {
    onFinalRef.current = onFinal;
  });

  const start = useCallback(() => {
    if (!Recognition || recognitionRef.current) return;
    setError('');
    setInterim('');

    const recognition = new Recognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = false;
    let finalText = '';

    recognition.onresult = (event) => {
      let interimText = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) finalText += result[0].transcript;
        else interimText += result[0].transcript;
      }
      setInterim(`${finalText} ${interimText}`.trim());
    };
    recognition.onerror = (event) => {
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setError('Mikrofon izni verilmedi. Adres çubuğundaki kilit simgesinden mikrofona izin ver.');
      } else if (event.error === 'no-speech') {
        setError('Ses algılanamadı. Mikrofona tıklayıp tekrar konuş.');
      } else if (event.error === 'audio-capture') {
        setError('Mikrofon bulunamadı. Bağlı olduğundan emin ol.');
      } else if (event.error !== 'aborted') {
        setError('Ses tanıma hatası oluştu, tekrar dene.');
      }
    };
    recognition.onend = () => {
      recognitionRef.current = null;
      setListening(false);
      setInterim('');
      const text = finalText.trim();
      if (text) onFinalRef.current?.(text);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }, []);

  // Dinlemeyi bitirir; o ana kadar söylenenler gönderilir.
  const stop = useCallback(() => recognitionRef.current?.stop(), []);

  // Sayfadan çıkınca dinlemeyi hiçbir şey göndermeden iptal et.
  useEffect(
    () => () => {
      const recognition = recognitionRef.current;
      if (recognition) {
        recognition.onend = null;
        recognition.abort();
      }
    },
    []
  );

  return { supported: Boolean(Recognition), listening, interim, error, start, stop };
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// AI'nın sesi: sunucudaki Piper "Cori" sesi (POST /api/ai/tts). Sunucu ses üretemezse
// (Piper kurulu değil, ağ hatası) tarayıcının kendi İngilizce sesine düşer.
export function useSpeechSynthesis(level) {
  const token = useSelector((state) => state.auth.token);
  const [speaking, setSpeaking] = useState(false);
  const audioRef = useRef(null);
  const abortRef = useRef(null);
  const requestIdRef = useRef(0);
  const piperUnavailableRef = useRef(false); // 503 gelirse bu sayfada bir daha denenmez

  const stopAudio = useCallback(() => {
    requestIdRef.current += 1;
    abortRef.current?.abort();
    abortRef.current = null;
    const audio = audioRef.current;
    if (audio) {
      audio.onended = null;
      audio.onerror = null;
      audio.pause();
      URL.revokeObjectURL(audio.src);
      audioRef.current = null;
    }
  }, []);

  const speakWithBrowser = useCallback(
    (text) => {
      if (!synthSupported) {
        setSpeaking(false);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const voice = pickEnglishVoice();
      if (voice) utterance.voice = voice;
      utterance.lang = voice?.lang || 'en-US';
      utterance.rate = RATE_BY_LEVEL[level] ?? 0.95;
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    },
    [level]
  );

  const speak = useCallback(
    async (text) => {
      if (!text) return;
      stopAudio();
      if (synthSupported) window.speechSynthesis.cancel();
      if (piperUnavailableRef.current) {
        speakWithBrowser(text);
        return;
      }

      const requestId = requestIdRef.current;
      const controller = new AbortController();
      abortRef.current = controller;
      setSpeaking(true); // ses hazırlanırken de "AI is speaking" görünsün

      try {
        const res = await fetch(`${API_URL}/ai/tts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
          body: JSON.stringify({ text, level }),
          signal: controller.signal,
        });
        if (res.status === 503) piperUnavailableRef.current = true;
        if (!res.ok) throw new Error(`TTS ${res.status}`);
        const blob = await res.blob();
        if (requestId !== requestIdRef.current) return; // bu arada durduruldu ya da yeni cevap geldi

        const audio = new Audio(URL.createObjectURL(blob));
        audioRef.current = audio;
        audio.onended = () => {
          URL.revokeObjectURL(audio.src);
          if (audioRef.current === audio) audioRef.current = null;
          setSpeaking(false);
        };
        audio.onerror = audio.onended;
        await audio.play();
      } catch (err) {
        if (err.name === 'AbortError' || requestId !== requestIdRef.current) return;
        speakWithBrowser(text);
      }
    },
    [level, token, stopAudio, speakWithBrowser]
  );

  const stopSpeaking = useCallback(() => {
    stopAudio();
    if (synthSupported) window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [stopAudio]);

  // Sayfadan çıkınca sesi durdur.
  useEffect(() => stopAudio, [stopAudio]);

  // Bazı tarayıcılar ses listesini geç yükler; olayı dinlemek yüklemeyi tetikler.
  useEffect(() => {
    if (!synthSupported) return undefined;
    const load = () => window.speechSynthesis.getVoices();
    load();
    window.speechSynthesis.addEventListener('voiceschanged', load);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', load);
      window.speechSynthesis.cancel();
    };
  }, []);

  return { supported: true, speaking, speak, stopSpeaking };
}

export const speechRecognitionSupported = Boolean(Recognition);
