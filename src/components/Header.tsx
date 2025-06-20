
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X, Home, ArrowLeft } from 'lucide-react';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemeToggle } from '@/components/ThemeToggle';
import UserMenu from '@/components/UserMenu';
import CategoriesDropdown from '@/components/CategoriesDropdown';
import { useI18n } from '@/hooks/useI18n';
import { useResponsive } from '@/hooks/useResponsive';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface HeaderProps {
  onSelectTool?: (toolId: string) => void;
  showHomeButton?: boolean;
  currentTool?: string;
  toolTitle?: string;
}

const Header: React.FC<HeaderProps> = ({
  onSelectTool,
  showHomeButton = false,
  currentTool,
  toolTitle
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useI18n();
  const { isMobile } = useResponsive();

  const handleCategorySelect = (categoryId: string) => {
    if (onSelectTool) {
      onSelectTool(categoryId);
    }
  };

  return (
    <header className="border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
        {/* Main Header Row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            {/* Back to home button for tool pages */}
            {showHomeButton && (
              <Button 
                variant="ghost" 
                onClick={() => onSelectTool && onSelectTool('home')} 
                className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 flex-shrink-0 px-2 sm:px-3"
              >
                <Home className="h-4 w-4" />
                {!isMobile && <span className="text-sm font-medium">{t('nav.back_home')}</span>}
              </Button>
            )}
            
            {/* Logo */}
            <button 
              onClick={() => onSelectTool && onSelectTool('home')} 
              className="flex items-center gap-2 sm:gap-3 font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex-shrink-0"
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg">
                🇫🇷
              </div>
              {!isMobile && (
                <span className="hidden sm:block text-lg sm:text-xl truncate">
                  IntégrationFrance.org
                </span>
              )}
            </button>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
            {!showHomeButton && <CategoriesDropdown onSelectCategory={handleCategorySelect} />}
            
            {!isMobile && (
              <>
                <LanguageSelector />
                <ThemeToggle />
              </>
            )}
            
            {isMobile && (
              <>
                <LanguageSelector />
                <ThemeToggle />
              </>
            )}
            
            <UserMenu />
          </div>
        </div>

        {/* Breadcrumb for tool pages */}
        {showHomeButton && toolTitle && (
          <div className="mt-3 border-t pt-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink 
                    href="#" 
                    onClick={() => onSelectTool && onSelectTool('home')}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {t('nav.home')}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{toolTitle}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
