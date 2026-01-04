import { useEffect, useRef, useCallback } from 'react';
import { initializeSocket, disconnectSocket } from '../utils/socket';

export const useSocket = (user, onNewBooking) => {
  const socketRef = useRef(null);

  // Initialize socket connection when user logs in
  useEffect(() => {
    if (user?.role === 'agency') {
      const socket = initializeSocket(user);
      socketRef.current = socket;

      // Set up event listeners
      if (socket) {
        socket.on('newBooking', onNewBooking);
      }

      // Clean up on unmount
      return () => {
        if (socket) {
          socket.off('newBooking', onNewBooking);
          
          // Only disconnect if no other components are using the socket
          // This prevents disconnecting when the component unmounts but the user is still logged in
          if (socket.connected) {
            const timeoutId = setTimeout(() => {
              if (socket && socket.connected) {
                disconnectSocket();
              }
            }, 5000); // Small delay to allow for route transitions
            
            return () => clearTimeout(timeoutId);
          }
        }
      };
    }
  }, [user, onNewBooking]);

  // Function to manually emit events
  const emit = useCallback((event, data) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, data);
      return true;
    }
    return false;
  }, []);

  return { socket: socketRef.current, emit };
};
