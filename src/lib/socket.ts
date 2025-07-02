import { io } from 'socket.io-client';

const BASE_API_URL =
  import.meta.env.VITE_SOCKET_URL ||
  'https://major-project-backend-jl6x.onrender.com';

const socket = io(BASE_API_URL, {
  withCredentials: true,
  autoConnect: false,
  transports: ['websocket'],
});

export default socket;
