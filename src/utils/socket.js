import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Create a singleton instance of the socket
let socket;

export const initializeSocket = (user) => {
  if (!socket && user?.role === 'agency') {
    socket = io(SOCKET_URL, {
      withCredentials: true,
      autoConnect: true,
    });

    // Join the agency's room when connected
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      socket.emit('joinAgencyRoom', user.id);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
