
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowLeft, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useResponsive } from '@/hooks/useResponsive';

interface MobileHeaderProps {
  title?: string;
  onBack?: () => void;
  onMenuToggle?: () => void;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function MobileHeader({
  title,
  onBack,
  onMenuToggle,
  showSearch = false,
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Rechercher...',
  actions,
  className
}: MobileHeaderProps) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { isMobile } = useResponsive();

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive);
    if (isSearchActive && onSearchChange) {
      onSearchChange('');
    }
  };

  return (
    <div
      className={cn(
        "mobile-header-container",
        "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm",
        "border-b shadow-sm",
        "sticky top-0 z-50",
        className
      )}
    >
      {/* Main header */}
      <div className="flex items-center justify-between px-4 h-14">
        {/* Left section */}
        <div className="flex items-center gap-2">
          {onBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          
          {onMenuToggle && !onBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuToggle}
              className="shrink-0"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}

          {/* Title - hidden when search is active on mobile */}
          {title && !(isMobile && isSearchActive) && (
            <h1 className="text-lg font-semibold truncate">
              {title}
            </h1>
          )}
        </div>

        {/* Center section - Search on mobile when active */}
        {isMobile && isSearchActive && showSearch && (
          <div className="flex-1 mx-4">
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-full"
              autoFocus
            />
          </div>
        )}

        {/* Right section */}
        <div className="flex items-center gap-2">
          {showSearch && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSearchToggle}
              className="shrink-0"
            >
              {isSearchActive ? (
                <X className="h-5 w-5" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </Button>
          )}
          
          {actions}
        </div>
      </div>

      {/* Search bar for desktop/tablet - always visible when enabled */}
      {!isMobile && showSearch && (
        <div className="px-4 pb-3">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      )}
    </div>
  );
}
