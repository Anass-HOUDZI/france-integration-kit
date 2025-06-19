
import { useRef, useEffect, useState } from 'react';

export interface GestureState {
  isActive: boolean;
  direction: 'left' | 'right' | 'up' | 'down' | null;
  distance: number;
  velocity: number;
}

export interface GestureHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPinch?: (scale: number) => void;
  threshold?: number;
}

export function useGestures(handlers: GestureHandlers) {
  const elementRef = useRef<HTMLElement>(null);
  const [gestureState, setGestureState] = useState<GestureState>({
    isActive: false,
    direction: null,
    distance: 0,
    velocity: 0
  });

  const touchStart = useRef<{ x: number; y: number; time: number } | null>(null);
  const touchCurrent = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const threshold = handlers.threshold || 50;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        touchStart.current = {
          x: touch.clientX,
          y: touch.clientY,
          time: Date.now()
        };
        touchCurrent.current = { x: touch.clientX, y: touch.clientY };
        
        setGestureState(prev => ({ ...prev, isActive: true }));
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && touchStart.current) {
        const touch = e.touches[0];
        touchCurrent.current = { x: touch.clientX, y: touch.clientY };
        
        const deltaX = touch.clientX - touchStart.current.x;
        const deltaY = touch.clientY - touchStart.current.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        setGestureState(prev => ({
          ...prev,
          distance,
          direction: Math.abs(deltaX) > Math.abs(deltaY) 
            ? (deltaX > 0 ? 'right' : 'left')
            : (deltaY > 0 ? 'down' : 'up')
        }));
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStart.current && touchCurrent.current) {
        const deltaX = touchCurrent.current.x - touchStart.current.x;
        const deltaY = touchCurrent.current.y - touchStart.current.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const time = Date.now() - touchStart.current.time;
        const velocity = distance / time;

        if (distance > threshold) {
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0 && handlers.onSwipeRight) handlers.onSwipeRight();
            if (deltaX < 0 && handlers.onSwipeLeft) handlers.onSwipeLeft();
          } else {
            if (deltaY > 0 && handlers.onSwipeDown) handlers.onSwipeDown();
            if (deltaY < 0 && handlers.onSwipeUp) handlers.onSwipeUp();
          }
        }

        setGestureState({
          isActive: false,
          direction: null,
          distance: 0,
          velocity
        });
      }

      touchStart.current = null;
      touchCurrent.current = null;
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handlers]);

  return { elementRef, gestureState };
}
