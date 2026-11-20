import { io } from 'socket.io-client';
import { currentLanguage } from '@/i18n';

const SOCKET_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '');

let socket = null;

// lang: socket üzerinden gelen hata mesajları (AI sohbeti, canlı oyun) bu dilde döner.
export function getSocket(token) {
  if (!socket) {
    socket = io(SOCKET_URL, { autoConnect: false, auth: { token, lang: currentLanguage() } });
  } else {
    socket.auth.token = token;
    socket.auth.lang = currentLanguage();
  }
  return socket;
}

export function disconnectSocket() {
  socket?.disconnect();
}
