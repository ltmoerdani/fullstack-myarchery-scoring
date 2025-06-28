import { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

const PUSHER_KEY = import.meta.env.VITE_PUSHER_KEY;
const PUSHER_CLUSTER = import.meta.env.VITE_PUSHER_CLUSTER;

export function useRealtime() {
  const [isConnected, setIsConnected] = useState(false);
  const [pusher, setPusher] = useState<Pusher | null>(null);

  useEffect(() => {
    if (!PUSHER_KEY || !PUSHER_CLUSTER) {
      console.warn('Pusher credentials not configured');
      return;
    }

    const pusherInstance = new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
      encrypted: true,
    });

    pusherInstance.connection.bind('connected', () => {
      setIsConnected(true);
      console.log('Connected to Pusher');
    });

    pusherInstance.connection.bind('disconnected', () => {
      setIsConnected(false);
      console.log('Disconnected from Pusher');
    });

    pusherInstance.connection.bind('error', (error: any) => {
      console.error('Pusher connection error:', error);
    });

    setPusher(pusherInstance);

    return () => {
      if (pusherInstance) {
        pusherInstance.disconnect();
      }
    };
  }, []);

  return {
    isConnected,
    pusher,
  };
}