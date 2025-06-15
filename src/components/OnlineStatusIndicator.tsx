
import React from 'react';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { Wifi, WifiOff } from 'lucide-react';

const OnlineStatusIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  return (
    <div className="text-center text-xs text-gray-500 dark:text-gray-400 pt-4 pb-2">
      {isOnline ? (
        <div className="flex items-center justify-center gap-2">
          <Wifi className="h-4 w-4 text-green-500" />
          <span>En ligne : toutes les fonctionnalités sont disponibles.</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <WifiOff className="h-4 w-4 text-red-500" />
          <span>Hors ligne : certaines fonctionnalités peuvent être limitées.</span>
        </div>
      )}
    </div>
  );
};

export default OnlineStatusIndicator;
