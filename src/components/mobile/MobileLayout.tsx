
import React from 'react';
import { cn } from '@/lib/utils';
import { useResponsive } from '@/hooks/useResponsive';

interface MobileLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  bottomNav?: React.ReactNode;
  sidebar?: React.ReactNode;
  className?: string;
}

export function MobileLayout({
  children,
  header,
  bottomNav,
  sidebar,
  className
}: MobileLayoutProps) {
  const { isMobile, safeAreaInsets } = useResponsive();

  return (
    <div
      className={cn(
        "mobile-layout min-h-screen flex flex-col",
        "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50",
        "dark:from-gray-900 dark:via-gray-800 dark:to-gray-900",
        className
      )}
      style={{
        paddingTop: safeAreaInsets.top,
        paddingLeft: safeAreaInsets.left,
        paddingRight: safeAreaInsets.right,
        paddingBottom: safeAreaInsets.bottom,
      }}
    >
      {/* Header */}
      {header && (
        <header className="mobile-header shrink-0 z-50 sticky top-0">
          {header}
        </header>
      )}

      {/* Main content area */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar for desktop/tablet */}
        {sidebar && !isMobile && (
          <aside className="mobile-sidebar shrink-0 w-64 border-r bg-white/95 backdrop-blur-sm">
            {sidebar}
          </aside>
        )}

        {/* Main content */}
        <main className="mobile-main flex-1 min-w-0 overflow-hidden">
          {children}
        </main>
      </div>

      {/* Bottom navigation for mobile */}
      {bottomNav && isMobile && (
        <nav className="mobile-bottom-nav shrink-0 border-t bg-white/95 backdrop-blur-sm">
          {bottomNav}
        </nav>
      )}
    </div>
  );
}
