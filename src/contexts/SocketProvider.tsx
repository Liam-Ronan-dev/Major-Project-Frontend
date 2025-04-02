import { createContext, useEffect, useState } from 'react';
import socket from '@/lib/socket';
import { useAuth } from '@/hooks/useAuth';

export const SocketContext = createContext(undefined);

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [notifications, setNotifications] = useState([]); // Optional state
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    if (!user) return;

    socket.connect();
    console.log('[socket.io] Attempting to connect');

    const handleConnect = () => {
      console.log('[socket.io] Connected to server');
      socket.emit('register', user._id);
      console.log(`[socket.io] Registering user: ${user._id}`);
      setIsConnected(true);
    };

    const handleNewPrescription = (data) => {
      console.log('[socket.io] New prescription assigned:', data);
      setNotifications((prev) => [...prev, { type: 'new', ...data }]);
      setUnreadCount((prev) => prev + 1);
    };

    const handlePrescriptionUpdated = (data) => {
      console.log('[socket.io] Prescription updated by pharmacist:', data);
      setNotifications((prev) => [...prev, { type: 'updated', ...data }]);
      setUnreadCount((prev) => prev + 1);
    };

    socket.on('connect', handleConnect);

    if (user.role === 'pharmacist') {
      socket.on('new-prescription', handleNewPrescription);
    }

    if (user.role === 'doctor') {
      socket.on('prescription-updated', handlePrescriptionUpdated);
    }

    return () => {
      socket.off('connect', handleConnect);
      socket.off('new-prescription', handleNewPrescription);
      socket.off('prescription-updated', handlePrescriptionUpdated);
      socket.disconnect();
      setIsConnected(false);
    };
  }, [user]);

  const markAllAsRead = () => setUnreadCount(0);

  return (
    <SocketContext.Provider
      value={{ socket, isConnected, notifications, unreadCount, markAllAsRead }}
    >
      {children}
    </SocketContext.Provider>
  );
};
