import { Wifi, WifiOff } from 'lucide-react';

interface RealtimeStatusProps {
  isConnected: boolean;
}

export function RealtimeStatus({ isConnected }: RealtimeStatusProps) {
  return (
    <div className="flex items-center space-x-2">
      {isConnected ? (
        <>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <Wifi className="w-5 h-5 text-green-600" />
          <span className="text-sm font-medium text-green-600">Connected</span>
        </>
      ) : (
        <>
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <WifiOff className="w-5 h-5 text-red-600" />
          <span className="text-sm font-medium text-red-600">Disconnected</span>
        </>
      )}
    </div>
  );
}