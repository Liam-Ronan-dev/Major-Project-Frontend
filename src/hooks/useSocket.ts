// src/hooks/useSocket.ts
import { useContext } from 'react';
import { SocketContext } from '@/contexts/SocketProvider';

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context)
    throw new Error('useSocket must be used within a SocketProvider');
  return context;
};
