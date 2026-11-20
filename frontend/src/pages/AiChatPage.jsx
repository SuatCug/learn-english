import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  MessageCircle,
  NotebookPen,
  Send,
  Sparkles,
  Loader2,
  Mic,
  Square,
  Volume2,
  Keyboard,
  Lightbulb,
  Flag,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { getSocket, disconnectSocket } from '@/lib/socket';
import { LEVELS } from '@/lib/constants';
import {
  AI_SECTIONS,
  sectionOfMode,
  conversationPath,
  splitTip,
  takeSpeakableSentences,
  aiTopicImage,
  levelPath,
} from '@/lib/aiSections';
import AiIllustration from '@/components/ai/AiIllustration';
import AiChatResult from '@/components/ai/AiChatResult';
import { getErrorMessage } from '@/lib/getErrorMessage';
import { useSpeechRecognition, useSpeechSynthesis } from '@/hooks/useSpeech';
import { useTranslation } from 'react-i18next';
import { localized } from '@/lib/localize';
import usePageTitle from '@/hooks/usePageTitle';
import { tk } from '@/i18n';
import {
  aiChatApi,
  useGetConversationsQuery,
  useGetConversationQuery,
  useGetTopicsQuery,
  useFinishConversationMutation,
  useCreateConversationMutation,
} from '@/services/aiChatApi';

// Sohbet açılınca karşı tarafın ilk mesajından önce "yazıyor…" animasyonunun süresi.
const OPENER_TYPING_MS = 1200;

const MODE_INFO = {
  talk: {
    label: tk('Speaking'),
    title: tk('Talking practice'),
    description: tk('Tap the microphone and speak in English. Your partner listens, answers out loud and helps with your mistakes.'),
    icon: Mic,
    placeholder: tk('Type in English instead...'),
  },
  chat: {
    label: tk('Chat'),
    title: tk('Chatting practice'),
    description: tk('Practise English by chatting. Your partner answers at your level and gently fixes your mistakes.'),
    icon: MessageCircle,
    placeholder: tk('Write a message in English...'),
  },
  writing: {
    label: tk('Writing'),
    title: tk('Check my writing'),
    description: tk('Paste a sentence, paragraph or essay. Get a corrected version, explanations and a score.'),
    icon: NotebookPen,
    placeholder: tk('Paste or write your English text here... (Ctrl + Enter to send)'),
  },
};

// Kart resimlerinin zemini düz renk: sol üst köşeye yakın bir pikselin rengini okur (sol panel bu renge boyanır).
function sampleBackground(img) {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    const x = Math.round(img.naturalWidth * 0.01);
    const y = Math.round(img.naturalHeight * 0.02);
    ctx.drawImage(img, x, y, 1, 1, 0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return `rgb(${r}, ${g}, ${b})`;
  } catch {
    return null;
  }
}

// Bir satırdaki **kalın** ve *italik* parçaları biçimlendirir.
function renderInline(line) {
  return line.split(/(\*\*[^*]+\*\*|\*[^*\s][^*]*\*)/g).map((part, j) => {
    if (part.length > 4 && part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={j} className="font-semibold">
          {renderInline(part.slice(2, -2))}
        </strong>
      );
    }
    if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) {
      return <em key={j}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

// AI cevabındaki basit Markdown'ı (kalın, italik, satır sonları, girintiler) gösterir.
function FormattedText({ text }) {
  return text.split('\n').map((line, i) => {
    const indented = /^\s{2,}\S/.test(line);
    return (
      <p key={i} className={!line.trim() ? 'h-2' : indented ? 'pl-5 text-gray-600' : ''}>
        {renderInline(line.trim())}
      </p>
    );
  });
}

function TypingDots() {
  const { t } = useTranslation();
  return (
    <span className="flex gap-1 py-1.5" aria-label={t('Typing')}>
      {[0, 150, 300].map((delay) => (
        <span key={delay} className="h-2 w-2 animate-bounce rounded-full bg-gray-300" style={{ animationDelay: `${delay}ms` }} />
      ))}
    </span>
  );
}

function MessageBubble({ role, content, typing, talkMode, onSpeak }) {
  const { t } = useTranslation();
  if (role === 'user') {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[85%] sm:max-w-[75%] rounded-2xl rounded-br-md px-4 py-2.5 text-[15px] leading-relaxed text-white whitespace-pre-wrap break-words"
          style={{ backgroundColor: 'var(--section-color)' }}
        >
          {content}
        </div>
      </div>
    );
  }

  const { spoken, tip } = talkMode ? splitTip(content) : { spoken: content, tip: '' };

  return (
    <div className="flex items-start gap-2.5">
      <span
        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100"
        style={{ color: 'var(--section-color)' }}
      >
        <Sparkles size={16} aria-hidden="true" />
      </span>
      <div className="max-w-[85%] sm:max-w-[75%] space-y-2">
        <div className="rounded-2xl rounded-tl-md border border-gray-100 bg-white px-4 py-2.5 text-[15px] leading-relaxed text-gray-800 shadow-sm break-words">
          {spoken ? <FormattedText text={spoken} /> : typing && <TypingDots />}
          {talkMode && spoken && !typing && (
            <button
              type="button"
              onClick={() => onSpeak?.(spoken)}
              className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-gray-700"
            >
              <Volume2 size={14} aria-hidden="true" /> {t('Listen again')}
            </button>
          )}
        </div>
        {tip && (
          <div className="flex gap-2 rounded-xl bg-amber-50 px-3.5 py-2.5 text-sm leading-relaxed text-amber-900">
            <Lightbulb size={16} className="mt-0.5 shrink-0 text-amber-500" aria-hidden="true" />
            <div>
              <FormattedText text={tip} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Talk modunda alttaki büyük mikrofon alanı.
function MicPanel({ status, interim, onMicClick, onStopSpeaking, disabled }) {
  const { t } = useTranslation();
  const labels = {
    idle: t('Tap to speak'),
    listening: t('Listening... tap when you finish'),
    thinking: t('Thinking...'),
    speaking: t('Speaking... tap to stop'),
  };

  const handleClick = () => {
    if (status === 'speaking') onStopSpeaking();
    else if (status === 'idle' || status === 'listening') onMicClick();
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {status === 'listening' && (
        <p className="min-h-[1.5rem] max-w-xl text-center text-[15px] text-gray-700">
          {interim || <span className="text-gray-400">{t('Say something in English...')}</span>}
        </p>
      )}
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled || status === 'thinking'}
        aria-label={labels[status]}
        className={`relative flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg transition-transform active:scale-95 disabled:opacity-60 ${
          status === 'listening' ? 'bg-red-500' : ''
        }`}
        style={status === 'listening' ? undefined : { backgroundColor: 'var(--section-color)' }}
      >
        {status === 'listening' && <span className="absolute inset-0 animate-ping rounded-full bg-red-400 opacity-40" />}
        {status === 'thinking' && <Loader2 size={26} className="animate-spin" aria-hidden="true" />}
        {status === 'listening' && <Square size={22} fill="currentColor" className="relative" aria-hidden="true" />}
        {status === 'speaking' && <Volume2 size={26} className="animate-pulse" aria-hidden="true" />}
        {status === 'idle' && <Mic size={28} aria-hidden="true" />}
      </button>
      <p className="text-xs font-medium text-gray-500">{labels[status]}</p>
    </div>
  );
}

export default function AiChatPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userLevel = useSelector((state) => state.auth.user?.level) || 'A2';

  const section = location.pathname.startsWith(AI_SECTIONS.talk.path) ? 'talk' : 'chat';
  const sectionInfo = AI_SECTIONS[section];

  // Sadece günlük mesaj sayacı için (sohbet listesi navbar'daki kart sayfasında).
  const { data: listData } = useGetConversationsQuery();
  const usage = listData?.data?.usage;

  const { data: convoData, isFetching: loadingConvo, isError: convoError } = useGetConversationQuery(id, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });
  const conversation = convoData?.data?.conversation?._id === id ? convoData.data.conversation : null;
  const rules = convoData?.data?.rules;

  const [messages, setMessages] = useState([]);
  const [streaming, setStreaming] = useState(null); // null = cevap beklenmiyor, string = gelen cevap
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [typeInstead, setTypeInstead] = useState(false);
  // Konulu sohbetin bitişi ve sonuç ekranı.
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState(null);
  const [evaluatingId, setEvaluatingId] = useState(null); // değerlendirmesi beklenen sohbetin id'si
  const [newBadges, setNewBadges] = useState([]); // bu sohbetin bitişiyle kazanılan rozetler
  const [evalError, setEvalError] = useState('');
  const [restarting, setRestarting] = useState(false);
  const [finishConversation] = useFinishConversationMutation();
  const [createConversation] = useCreateConversationMutation();

  const activeIdRef = useRef(id);
  const lastSentRef = useRef('');
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const onReplyDoneRef = useRef(null);

  const mode = conversation?.mode ?? (section === 'talk' ? 'talk' : 'chat');
  const info = MODE_INFO[mode];
  const talkMode = mode === 'talk';
  const level = conversation?.level ?? userLevel;
  const levelName = LEVELS.find((l) => l.code === level)?.name ?? '';
  // Konulu sohbette sol panelde o konunun kart resmi ve açıklaması gösterilir.
  const topicImage = conversation?.topic ? aiTopicImage(level, conversation.topic) : null;
  const { data: topicsData } = useGetTopicsQuery(level, { skip: !conversation?.topic });
  const topicInfo = topicsData?.data?.topics?.find((t) => t.slug === conversation?.topic);
  // Konulu sohbetin adı konu kartından (seçili dilde); serbest/eski sohbetlerde kayıtlı başlık.
  const conversationTitle = topicInfo ? localized(topicInfo) : conversation?.title;
  usePageTitle(conversationTitle ?? t(sectionInfo.label));
  // Sohbet sadece karşı tarafın ilk mesajından ibaretse (öğrenci henüz yazmadıysa) önce "yazıyor…" gösterilir.
  const conversationId = conversation?._id ?? null;
  const onlyOpener = Boolean(conversation) && messages.length === 1 && messages[0].role === 'assistant';
  const openerText = onlyOpener ? messages[0].content : '';
  const [openerShownFor, setOpenerShownFor] = useState(null);
  const openerPending = onlyOpener && openerShownFor !== conversationId;
  const openerVisible = onlyOpener && !openerPending;
  // Hazır cevaplar sadece ilk mesaj göründükten sonra (öğrenci henüz yazmamışken) gösterilir.
  const awaitingFirstReply = openerVisible && streaming === null;
  const suggestions = awaitingFirstReply && !(usage && usage.usedToday >= usage.dailyLimit) ? (topicInfo?.suggestions ?? []) : [];
  // Sol panelin rengi: resmin zemin rengi (resim yüklenince okunur); konu değişince sıfırlanır.
  const [panelColor, setPanelColor] = useState(null);
  const [panelImageSrc, setPanelImageSrc] = useState(topicImage);
  if (topicImage !== panelImageSrc) {
    setPanelImageSrc(topicImage);
    setPanelColor(null);
  }

  const { speaking, speak, stopSpeaking, startStream, pushSentence, endStream } = useSpeechSynthesis(level);
  // Talking'de akışlı okuma: AI cevabı gelirken tamamlanan cümleler hemen seslendirilir.
  const streamTextRef = useRef('');
  const spokenIndexRef = useRef(0);
  const speechStreamActiveRef = useRef(false);
  const onReplyDeltaRef = useRef(null);
  const onReplyErrorRef = useRef(null);
  const recognition = useSpeechRecognition({ onFinal: (text) => send(text) });
  const showTextInput = !talkMode || typeInstead || !recognition.supported;

  // Sohbet değişince (veya sunucudan yeniden yüklenince) ekrandaki mesajları ve durumu güncelle.
  // Başlangıç değeri null: sohbet önbellekte hazırsa (konu kartından gelindiğinde) ilk render'da da mesajlar yüklensin.
  const [syncedConversation, setSyncedConversation] = useState(null);
  if (conversation !== syncedConversation) {
    setSyncedConversation(conversation);
    setMessages(conversation?.messages ?? []);
    setFinished(Boolean(conversation?.finished));
    setResult(conversation?.result ?? null);
  }
  const [prevId, setPrevId] = useState(id);
  if (id !== prevId) {
    setPrevId(id);
    setStreaming(null);
    setError('');
    setInput('');
    setTypeInstead(false);
    setEvalError('');
    setRestarting(false);
    setNewBadges([]);
  }

  // Mesaj sınırı (sadece konulu sohbetlerde): öğrenci turnLimit mesaj yazınca sohbet biter.
  const isTopic = Boolean(conversation?.topic);
  const turnLimit = isTopic ? rules?.turnLimit : null;
  const userTurns = messages.filter((m) => m.role === 'user').length;
  const turnsLeft = turnLimit ? Math.max(0, turnLimit - userTurns) : null;
  const canFinishEarly =
    isTopic && !finished && rules && userTurns >= rules.minTurnsToFinish && streaming === null;

  // Sohbeti bitirir / sonucu ister (otomatik bitişte, "Bitir" butonunda ve "Tekrar dene"de).
  function requestResult(cid = conversationId, { keepSpeaking = false } = {}) {
    if (!cid) return;
    if (!keepSpeaking) stopSpeaking();
    if (recognition.listening) recognition.stop();
    setFinished(true);
    setEvalError('');
    setEvaluatingId(cid);
    finishConversation(cid)
      .unwrap()
      .then((res) => {
        if (cid !== activeIdRef.current) return;
        setResult(res.data.conversation.result);
        setNewBadges(res.data.newlyAwardedBadges ?? []);
        dispatch(aiChatApi.util.upsertQueryData('getConversation', cid, { ...res, data: { ...res.data, rules } }));
      })
      .catch((err) => {
        if (cid === activeIdRef.current) setEvalError(getErrorMessage(err));
      })
      .finally(() => setEvaluatingId((prev) => (prev === cid ? null : prev)));
  }

  // Sonuç ekranından aynı konuyu baştan başlatır.
  async function restartTopic() {
    if (!conversation) return;
    setRestarting(true);
    try {
      const res = await createConversation({ mode: conversation.mode, level, topic: conversation.topic }).unwrap();
      await dispatch(aiChatApi.util.upsertQueryData('getConversation', res.data.conversation._id, res));
      navigate(conversationPath(res.data.conversation));
    } catch (err) {
      setEvalError(getErrorMessage(err));
      setRestarting(false);
    }
  }

  // Socket olayları hangi sohbete ait, render dışında güncel tutulur.
  useEffect(() => {
    activeIdRef.current = id;
    speechStreamActiveRef.current = false;
    stopSpeaking();
  }, [id, stopSpeaking]);

  // Sohbeti karşı taraf başlatır: önce kısa bir "yazıyor…" animasyonu, sonra ilk mesaj görünür.
  useEffect(() => {
    if (!openerPending) return undefined;
    const timer = setTimeout(() => setOpenerShownFor(conversationId), OPENER_TYPING_MS);
    return () => clearTimeout(timer);
  }, [openerPending, conversationId]);

  // Talking'de ilk mesaj görününce sesli okunur; öğrenci cevap verince (ya da sayfadan çıkınca) susar.
  useEffect(() => {
    if (!talkMode || !openerVisible) return undefined;
    speak(splitTip(openerText).spoken);
    return () => stopSpeaking();
  }, [talkMode, openerVisible, openerText, speak, stopSpeaking]);

  // Sesli modda AI cevabı cümle cümle okunur ("Tip" satırı hariç): cevap gelirken tamamlanan cümleler
  // sıraya eklenir, cevap bitince kalan kısım eklenip sıra kapatılır.
  useEffect(() => {
    onReplyDeltaRef.current = (chunk) => {
      if (!talkMode) return;
      if (!speechStreamActiveRef.current) {
        speechStreamActiveRef.current = true;
        streamTextRef.current = '';
        spokenIndexRef.current = 0;
        startStream();
      }
      streamTextRef.current += chunk;
      const { chunk: sentences, next } = takeSpeakableSentences(streamTextRef.current, spokenIndexRef.current, false);
      spokenIndexRef.current = next;
      if (sentences) pushSentence(sentences);
    };
    onReplyErrorRef.current = () => {
      if (!speechStreamActiveRef.current) return;
      speechStreamActiveRef.current = false;
      stopSpeaking();
    };
    onReplyDoneRef.current = (message, isFinished) => {
      if (talkMode) {
        if (speechStreamActiveRef.current) {
          speechStreamActiveRef.current = false;
          const { chunk: rest } = takeSpeakableSentences(message.content, spokenIndexRef.current, true);
          if (rest) pushSentence(rest);
          endStream();
        } else {
          speak(splitTip(message.content).spoken);
        }
      }
      // Son mesaj da cevaplandı: sohbet bitti, sonuç hazırlanır (veda cümlesi okunmaya devam eder).
      if (isFinished) requestResult(activeIdRef.current, { keepSpeaking: true });
    };
  });

  // Sohbet başka bölüme aitse (örn. talk sohbeti /ai-chat altında açıldıysa) doğru adrese yönlendir.
  useEffect(() => {
    if (conversation && sectionOfMode(conversation.mode) !== section) {
      navigate(conversationPath(conversation), { replace: true });
    }
  }, [conversation, section, navigate]);

  // Yeni mesaj/parça geldikçe en alta kaydır.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, streaming, recognition.interim]);

  // Socket: AI cevabı parça parça (ai:delta) gelir, bitince ai:done.
  useEffect(() => {
    const socket = getSocket(token);

    const onDelta = ({ conversationId, chunk }) => {
      if (conversationId !== activeIdRef.current) return;
      setStreaming((prev) => (prev ?? '') + chunk);
      onReplyDeltaRef.current?.(chunk);
    };
    const onDone = ({ conversationId, message, finished: isFinished }) => {
      dispatch(aiChatApi.util.invalidateTags(['AiConversations']));
      if (conversationId !== activeIdRef.current) return;
      setStreaming(null);
      setMessages((prev) => [...prev, message]);
      onReplyDoneRef.current?.(message, isFinished);
      inputRef.current?.focus();
    };
    const onError = ({ conversationId, message }) => {
      dispatch(aiChatApi.util.invalidateTags(['AiConversations']));
      if (conversationId !== activeIdRef.current) return;
      setStreaming(null);
      onReplyErrorRef.current?.();
      setMessages((prev) => prev.slice(0, -1)); // cevapsız kalan mesajı geri al
      setInput(lastSentRef.current);
      setError(message);
    };

    socket.on('ai:delta', onDelta);
    socket.on('ai:done', onDone);
    socket.on('ai:error', onError);
    socket.connect();

    return () => {
      socket.off('ai:delta', onDelta);
      socket.off('ai:done', onDone);
      socket.off('ai:error', onError);
      disconnectSocket();
    };
  }, [token, dispatch]);

  function send(text = input) {
    const content = text.trim();
    if (!content || streaming !== null || openerPending || !id || finished) return;

    setError('');
    setInput('');
    lastSentRef.current = content;
    setMessages((prev) => [...prev, { role: 'user', content }]);
    setStreaming('');

    getSocket(token)
      .timeout(15000)
      .emit('ai:message', { conversationId: id, text: content }, (err, ack) => {
        if (err || !ack?.ok) {
          setStreaming(null);
          setMessages((prev) => prev.slice(0, -1));
          if (!talkMode || typeInstead) setInput(content);
          setError(err ? t("Couldn't reach the server. Check your connection.") : ack.message);
          return;
        }
        dispatch(aiChatApi.util.invalidateTags(['AiConversations']));
      });
  }

  const handleMicClick = () => {
    if (recognition.listening) {
      recognition.stop();
      return;
    }
    stopSpeaking();
    setError('');
    recognition.start();
  };

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter' || e.nativeEvent.isComposing) return;
    // Sohbette Enter gönderir (Shift+Enter alt satır); yazı modunda Ctrl/Cmd+Enter gönderir.
    const shouldSend = mode === 'writing' ? e.ctrlKey || e.metaKey : !e.shiftKey;
    if (shouldSend) {
      e.preventDefault();
      send();
    }
  };

  const limitReached = usage && usage.usedToday >= usage.dailyLimit;
  const micStatus = recognition.listening
    ? 'listening'
    : streaming !== null || openerPending
      ? 'thinking'
      : speaking
        ? 'speaking'
        : 'idle';
  const shownError = error || (talkMode ? recognition.error : '');

  return (
    <div className="flex h-dvh flex-col bg-gray-50" style={{ '--section-color': sectionInfo.color }}>
      <Navbar />

      <div className="flex min-h-0 flex-1">
        {/* Sol panel (sadece tablet/masaüstü): konulu sohbette o konunun kart resmi + başlık/açıklama;
            konusuz (eski) sohbetlerde öğrenci ve AI robotu çizimi. */}
        {conversation && (
          <aside
            className="relative hidden w-[42%] max-w-xl shrink-0 overflow-hidden transition-colors duration-300 md:flex md:flex-col"
            style={{ backgroundColor: (topicImage && panelColor) || sectionInfo.lightColor }}
          >
            <div className="relative z-10 px-6 pt-6">
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-bold shadow"
                style={{ color: 'var(--section-color)' }}
              >
                {level}
              </span>
              <p className="mt-3 text-2xl font-bold leading-tight text-gray-900">{levelName}</p>
              <p className="mt-1 text-sm text-gray-600">
                {talkMode ? t('Speaking Practice') : t('Chat Practice')}
              </p>
            </div>
            {topicImage ? (
              <div className="flex min-h-0 flex-1 flex-col justify-center pb-8">
                {/* Kart resmi kesilmeden ve çerçevesiz; panel resmin zemin rengini aldığı için tek parça görünür. */}
                <img
                  src={topicImage}
                  alt=""
                  onLoad={(e) => setPanelColor(sampleBackground(e.currentTarget))}
                  className="block aspect-[1200/630] w-full object-cover"
                />
                <div className="px-6 pt-2">
                  <p className="text-lg font-bold text-gray-900">{conversationTitle}</p>
                  {topicInfo?.description && <p className="mt-1 text-sm text-gray-700">{localized(topicInfo, 'description')}</p>}
                </div>
              </div>
            ) : (
              <div className="relative min-h-0 flex-1">
                <AiIllustration section={section} level={level} className="absolute inset-0 h-full w-full" />
              </div>
            )}
          </aside>
        )}

        <main className="flex min-w-0 flex-1 flex-col">
          {/* Üst bilgi şeridi */}
          <div className={`flex items-center gap-3 px-4 py-3 text-white ${sectionInfo.bannerClass}`}>
            <info.icon size={18} className="shrink-0" aria-hidden="true" />
            <h1 className="min-w-0 truncate font-semibold">{conversation ? conversationTitle : t(sectionInfo.label)}</h1>
            {turnLimit && (
              <span
                className="ml-auto shrink-0 rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold tabular-nums"
                title={t('Your messages in this conversation')}
              >
                {t('{{done}} / {{total}} messages', { done: Math.min(userTurns, turnLimit), total: turnLimit })}
              </span>
            )}
            {usage && (
              <span
                className={`${turnLimit ? 'hidden sm:inline' : 'ml-auto'} shrink-0 text-xs text-white/80 tabular-nums`}
                title={t('Messages today')}
              >
                {t('{{used}} / {{limit}} today', { used: usage.usedToday, limit: usage.dailyLimit })}
              </span>
            )}
            {conversation && (
              <span className={`shrink-0 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-gray-700 ${usage ? '' : 'ml-auto'}`}>
                {conversation.level} · {t(info.label)}
              </span>
            )}
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
            <div className="mx-auto max-w-3xl space-y-4">
              {loadingConvo && !conversation && (
                <div className="flex justify-center py-10 text-gray-400">
                  <Loader2 className="animate-spin" aria-label={t('Loading...')} />
                </div>
              )}
              {convoError && <p className="text-center text-sm text-red-600">{t('Conversation not found.')}</p>}

              {conversation && messages.length === 0 && streaming === null && (
                <div className="py-8 text-center">
                  <info.icon size={30} className="mx-auto" style={{ color: 'var(--section-color)' }} aria-hidden="true" />
                  <p className="mt-3 font-semibold text-gray-900">{t(info.title)}</p>
                  <p className="mx-auto mt-1 max-w-md text-sm text-gray-500">{t(info.description)}</p>
                  {talkMode && !recognition.supported && (
                    <p className="mx-auto mt-3 max-w-md rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
                      {t(
                        "Your browser doesn't support voice conversation. Use Chrome or Edge to talk with your microphone; in this browser you can continue by typing."
                      )}
                    </p>
                  )}
                </div>
              )}

              {/* İlk mesaj gelene kadar karşı taraf "yazıyor…" görünür. */}
              {openerPending ? (
                <MessageBubble role="assistant" content="" typing talkMode={talkMode} />
              ) : (
                messages.map((m, i) => (
                  <MessageBubble key={i} role={m.role} content={m.content} talkMode={talkMode} onSpeak={speak} />
                ))
              )}

              {/* Hazır cevaplar: konunun ilk sorusuna uygun 3 cevap; öğrenci ilk mesajını gönderince kaybolur. */}
              {suggestions.length > 0 && (
                <div className="flex flex-col items-end gap-2 pt-1">
                  <p className="text-xs text-gray-400">{t('Not sure what to say? Try one of these:')}</p>
                  <div className="flex flex-wrap justify-end gap-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => send(s)}
                        className="rounded-full border bg-white px-4 py-2 text-sm transition-colors hover:bg-gray-50"
                        style={{ borderColor: 'var(--section-color)', color: 'var(--section-color)' }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {streaming !== null && <MessageBubble role="assistant" content={streaming} typing talkMode={talkMode} />}

              {/* Sohbet bitti: sonuç ekranı (puan, hatalar, faydalı ifadeler). */}
              {finished && streaming === null && conversation && (
                <div className="pt-4">
                  <AiChatResult
                    result={result}
                    newBadges={newBadges}
                    userTurns={userTurns}
                    loading={evaluatingId === conversationId}
                    error={evalError || t('Your results are not ready yet.')}
                    onRetry={() => requestResult()}
                    onRestart={restartTopic}
                    restarting={restarting}
                    topicsPath={levelPath(section, level)}
                    onTopics={() => navigate(levelPath(section, level))}
                  />
                </div>
              )}
            </div>
          </div>

          {conversation && !finished && (
            <div className="border-t border-gray-100 bg-white px-4 py-3">
              <div className="mx-auto max-w-3xl">
                {shownError && <p className="mb-2 text-center text-sm text-red-600">{shownError}</p>}
                {/* Konulu sohbette kalan mesaj bilgisi ve erken bitirme. */}
                {turnLimit && (turnsLeft <= 2 || canFinishEarly) && (
                  <div className="mb-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm">
                    {turnsLeft <= 2 && turnsLeft > 0 && (
                      <span className="text-gray-500">
                        {turnsLeft === 1
                          ? t('Last message! Then you will see your results.')
                          : t('{{count}} messages left.', { count: turnsLeft })}
                      </span>
                    )}
                    {canFinishEarly && (
                      <button
                        type="button"
                        onClick={() => requestResult()}
                        className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1 font-medium text-gray-600 hover:bg-gray-50"
                      >
                        <Flag size={14} aria-hidden="true" /> {t('Finish and see results')}
                      </button>
                    )}
                  </div>
                )}
                {limitReached && !shownError && (
                  <p className="mb-2 text-center text-sm text-amber-700">{t("You've reached today's message limit. Come back tomorrow!")} 🙂</p>
                )}

                {talkMode && !showTextInput && (
                  <div className="relative py-1">
                    <MicPanel
                      status={micStatus}
                      interim={recognition.interim}
                      onMicClick={handleMicClick}
                      onStopSpeaking={stopSpeaking}
                      disabled={limitReached}
                    />
                    <button
                      type="button"
                      onClick={() => setTypeInstead(true)}
                      title={t('Type instead')}
                      aria-label={t('Type instead')}
                      className="absolute bottom-1 right-0 rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                    >
                      <Keyboard size={20} />
                    </button>
                  </div>
                )}

                {showTextInput && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      send();
                    }}
                    className="flex items-end gap-2"
                  >
                    {talkMode && recognition.supported && (
                      <button
                        type="button"
                        onClick={() => setTypeInstead(false)}
                        title={t('Speak instead')}
                        aria-label={t('Speak instead')}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100"
                      >
                        <Mic size={20} />
                      </button>
                    )}
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={t(info.placeholder)}
                      rows={mode === 'writing' ? 5 : 1}
                      maxLength={4000}
                      disabled={limitReached}
                      className={`flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-[15px] text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:bg-white focus:outline-none disabled:opacity-60 ${
                        mode === 'writing' ? 'max-h-72' : 'field-sizing-content max-h-40'
                      }`}
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || streaming !== null || openerPending || limitReached}
                      aria-label={t('Send')}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition-colors hover:brightness-95 disabled:!bg-gray-200 disabled:text-gray-400"
                      style={{ backgroundColor: 'var(--section-color)' }}
                    >
                      {streaming !== null ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
