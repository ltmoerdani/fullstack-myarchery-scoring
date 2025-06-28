import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff } from 'lucide-react';

interface RealtimeStatusProps {
  isConnected: boolean;
}

export function RealtimeStatus({ isConnected }: Readonly<RealtimeStatusProps>) {
  return (
    <Badge className={`flex items-center space-x-2 ${isConnected ? 'bg-primary text-primary-foreground' : 'bg-destructive text-destructive-foreground'}`}>
      {isConnected ? (
        <>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <Wifi className="w-4 h-4" />
          <span>Connected</span>
        </>
      ) : (
        <>
          <div className="w-2 h-2 bg-red-400 rounded-full" />
          <WifiOff className="w-4 h-4" />
          <span>Disconnected</span>
        </>
      )}
    </Badge>
  );
}