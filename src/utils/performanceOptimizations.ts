/**
 * Optimisations de performance pour l'application
 */

// Debounce function pour optimiser les recherches
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function pour optimiser les événements de scroll
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Lazy loading d'images
export const lazyLoadImage = (img: HTMLImageElement): void => {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = entry.target as HTMLImageElement;
        image.src = image.dataset.src || '';
        image.classList.remove('lazy');
        observer.unobserve(image);
      }
    });
  });
  imageObserver.observe(img);
};

// Préchargement des composants critiques
export const preloadComponent = (componentImport: () => Promise<any>): (() => void) => {
  const timeout = setTimeout(() => {
    componentImport();
  }, 100);
  
  // Annuler le préchargement si l'utilisateur quitte rapidement
  return () => clearTimeout(timeout);
};

// Optimisation des re-renders avec memoization
export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map();
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
};

// Nettoyage automatique des event listeners
export const createCleanupManager = () => {
  const cleanupFunctions: (() => void)[] = [];
  
  return {
    add: (cleanup: () => void) => {
      cleanupFunctions.push(cleanup);
    },
    cleanup: () => {
      cleanupFunctions.forEach(fn => fn());
      cleanupFunctions.length = 0;
    }
  };
};

// Optimisation du localStorage
export const optimizedStorage = {
  get: (key: string) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Stockage local plein, nettoyage en cours...');
      // Nettoyer les anciennes données
      const keys = Object.keys(localStorage);
      keys.forEach(k => {
        if (k.startsWith('temp_')) {
          localStorage.removeItem(k);
        }
      });
    }
  }
};