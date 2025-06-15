
import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

function PwaUpdater() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('Service Worker registered:', r);
    },
    onRegisterError(error) {
      console.error('Service Worker registration error:', error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  React.useEffect(() => {
    if (offlineReady) {
      toast.success('Prêt à fonctionner hors ligne.', {
        duration: 4000,
        onDismiss: close,
        onAutoClose: close,
      });
    }
  }, [offlineReady]);

  React.useEffect(() => {
    if (needRefresh) {
      toast.info('Une nouvelle version est disponible.', {
        position: 'top-center',
        duration: Infinity,
        closeButton: true,
        action: (
          <Button onClick={() => updateServiceWorker(true)}>
            Mettre à jour
          </Button>
        ),
      });
    }
  }, [needRefresh]);

  return null;
}

export default PwaUpdater;
