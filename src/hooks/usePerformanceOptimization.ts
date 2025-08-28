import { useEffect, useCallback, useMemo } from 'react';
import { debounce, throttle, createCleanupManager } from '@/utils/performanceOptimizations';

/**
 * Hook pour optimiser les performances des composants
 */
export const usePerformanceOptimization = () => {
  const cleanupManager = useMemo(() => createCleanupManager(), []);

  // Cleanup automatique à la destruction du composant
  useEffect(() => {
    return () => {
      cleanupManager.cleanup();
    };
  }, [cleanupManager]);

  // Debounced search
  const createDebouncedSearch = useCallback((searchFn: (query: string) => void, delay = 300) => {
    const debouncedFn = debounce(searchFn, delay);
    cleanupManager.add(() => {
      // Pas de nettoyage spécifique nécessaire pour debounce
    });
    return debouncedFn;
  }, [cleanupManager]);

  // Throttled scroll
  const createThrottledScroll = useCallback((scrollFn: () => void, limit = 100) => {
    const throttledFn = throttle(scrollFn, limit);
    cleanupManager.add(() => {
      // Pas de nettoyage spécifique nécessaire pour throttle
    });
    return throttledFn;
  }, [cleanupManager]);

  // Intersection Observer pour lazy loading
  const createIntersectionObserver = useCallback((
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) => {
    const observer = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    cleanupManager.add(() => {
      observer.disconnect();
    });

    return observer;
  }, [cleanupManager]);

  // Optimisation des images
  const optimizeImage = useCallback((img: HTMLImageElement) => {
    const observer = createIntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target as HTMLImageElement;
          if (image.dataset.src) {
            image.src = image.dataset.src;
            image.classList.remove('blur-sm');
            image.classList.add('transition-all', 'duration-300');
            observer.unobserve(image);
          }
        }
      });
    });

    observer.observe(img);
    return () => observer.unobserve(img);
  }, [createIntersectionObserver]);

  return {
    createDebouncedSearch,
    createThrottledScroll,
    createIntersectionObserver,
    optimizeImage,
    cleanup: cleanupManager.cleanup
  };
};

/**
 * Hook pour précharger les composants
 */
export const useComponentPreloader = () => {
  const preloadComponent = useCallback((componentImport: () => Promise<any>) => {
    let timeoutId: NodeJS.Timeout;
    
    const preload = () => {
      timeoutId = setTimeout(() => {
        componentImport().catch(() => {
          // Silently handle preload errors
        });
      }, 100);
    };

    const cancel = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };

    return { preload, cancel };
  }, []);

  return { preloadComponent };
};

/**
 * Hook pour optimiser les re-renders
 */
export const useRenderOptimization = () => {
  const memoizedCallback = useCallback(<T extends (...args: any[]) => any>(
    callback: T,
    deps: React.DependencyList
  ) => {
    return useCallback(callback, deps);
  }, []);

  const memoizedValue = useCallback(<T>(
    value: T,
    deps: React.DependencyList
  ) => {
    return useMemo(() => value, deps);
  }, []);

  return {
    memoizedCallback,
    memoizedValue
  };
};