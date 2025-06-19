
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { RefreshCw } from 'lucide-react';

interface MobileListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  onRefresh?: () => Promise<void>;
  onLoadMore?: () => Promise<void>;
  hasMore?: boolean;
  loading?: boolean;
  refreshing?: boolean;
  className?: string;
  pullToRefreshThreshold?: number;
}

export function MobileList<T>({
  items,
  renderItem,
  onRefresh,
  onLoadMore,
  hasMore = false,
  loading = false,
  refreshing = false,
  className,
  pullToRefreshThreshold = 80
}: MobileListProps<T>) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number>(0);
  const currentY = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (listRef.current?.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
      setIsPulling(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isPulling && onRefresh) {
      currentY.current = e.touches[0].clientY;
      const distance = Math.max(0, currentY.current - startY.current);
      setPullDistance(Math.min(distance, pullToRefreshThreshold * 1.5));
    }
  };

  const handleTouchEnd = async () => {
    if (isPulling && pullDistance >= pullToRefreshThreshold && onRefresh) {
      await onRefresh();
    }
    setIsPulling(false);
    setPullDistance(0);
  };

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!hasMore || loading || !onLoadMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    const sentinel = document.getElementById('mobile-list-sentinel');
    if (sentinel) observer.observe(sentinel);

    return () => observer.disconnect();
  }, [hasMore, loading, onLoadMore]);

  return (
    <div
      ref={listRef}
      className={cn(
        "mobile-list overflow-auto h-full",
        "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent",
        "-webkit-overflow-scrolling: touch", // iOS momentum scrolling
        className
      )}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: `translateY(${pullDistance}px)`,
        transition: isPulling ? 'none' : 'transform 0.3s ease-out',
      }}
    >
      {/* Pull to refresh indicator */}
      {onRefresh && (
        <div
          className={cn(
            "flex items-center justify-center py-4 transition-opacity duration-300",
            pullDistance > 0 ? "opacity-100" : "opacity-0"
          )}
          style={{ transform: `translateY(-${pullToRefreshThreshold}px)` }}
        >
          <RefreshCw
            className={cn(
              "h-6 w-6 text-blue-500 transition-transform duration-300",
              pullDistance >= pullToRefreshThreshold && "rotate-180",
              refreshing && "animate-spin"
            )}
          />
          <span className="ml-2 text-sm text-gray-600">
            {pullDistance >= pullToRefreshThreshold ? 'Relâchez pour actualiser' : 'Tirez pour actualiser'}
          </span>
        </div>
      )}

      {/* Items */}
      <div className="space-y-3 p-4">
        {items.map((item, index) => (
          <div key={index} className="mobile-list-item">
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {/* Loading more indicator */}
      {hasMore && (
        <div id="mobile-list-sentinel" className="flex justify-center py-4">
          {loading && (
            <div className="flex items-center gap-2 text-gray-500">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span className="text-sm">Chargement...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
