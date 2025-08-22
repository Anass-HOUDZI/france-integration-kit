import React from 'react';
import { useResponsive } from '@/hooks/useResponsive';

interface MobileGridProps {
  children: React.ReactNode;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function MobileGrid({
  children,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'md',
  className = ''
}: MobileGridProps) {
  const { isMobile, isTablet } = useResponsive();

  const getGridCols = () => {
    if (isMobile) return `grid-cols-${columns.mobile || 1}`;
    if (isTablet) return `grid-cols-${columns.tablet || 2}`;
    return `grid-cols-${columns.desktop || 3}`;
  };

  const getGap = () => {
    switch (gap) {
      case 'sm': return 'gap-3';
      case 'lg': return 'gap-8';
      default: return 'gap-6';
    }
  };

  return (
    <div className={`grid ${getGridCols()} ${getGap()} ${className}`}>
      {children}
    </div>
  );
}