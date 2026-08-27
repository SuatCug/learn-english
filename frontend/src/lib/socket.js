import { io } from 'socket.io-client';

const SOCKET_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '');

let socket = null;

export function getSocket(token) {
  if (!socket) {
    socket = io(SOCKET_URL, { autoConnect: false, auth: { token } });
  } else {
    socket.auth.token = token;
  }
  return socket;
}

export function disconnectSocket() {
  socket?.disconnect();
}
