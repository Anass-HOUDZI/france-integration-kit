
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X, Home, ArrowLeft, Sparkles } from 'lucide-react';
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
  toolCategory?: string;
}

const Header: React.FC<HeaderProps> = ({
  onSelectTool,
  showHomeButton = false,
  currentTool,
  toolTitle,
  toolCategory
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
      <div className={`container mx-auto ${isMobile ? 'px-3 py-2' : 'px-3 sm:px-4 py-2 sm:py-3'}`}>
        {/* Main Header Row */}
        <div className="flex items-center justify-between gap-2">
          <div className={`flex items-center flex-1 min-w-0 ${isMobile ? 'gap-2' : 'gap-2 sm:gap-4'}`}>
            {/* Back to home button for tool pages */}
            {showHomeButton && (
              <Button 
                variant="ghost" 
                onClick={() => onSelectTool && onSelectTool('home')} 
                className={`flex items-center gap-2 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 flex-shrink-0 ${
                  isMobile ? 'px-2 min-h-[40px]' : 'px-2 sm:px-3'
                }`}
              >
                <Home className="h-4 w-4" />
                {!isMobile && <span className="text-sm font-medium">{t('nav.back_home')}</span>}
              </Button>
            )}
            
            {/* Logo - Touch Optimized */}
            <button 
              onClick={() => onSelectTool && onSelectTool('home')} 
              className={`flex items-center font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 flex-shrink-0 active:scale-95 ${
                isMobile ? 'gap-2 min-h-[40px]' : 'gap-2 sm:gap-3'
              }`}
            >
              <div className={`bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg ${
                isMobile ? 'w-6 h-6 text-xs' : 'w-6 h-6 sm:w-8 sm:h-8 text-xs sm:text-sm sm:rounded-xl'
              }`}>
                <Sparkles className={`${isMobile ? 'h-3 w-3' : 'h-3 w-3 sm:h-4 sm:w-4'}`} />
              </div>
              {!isMobile && (
                <span className="hidden sm:block text-lg sm:text-xl truncate">
                  IntégraTech Suite
                </span>
              )}
            </button>
          </div>
          
          <div className={`flex items-center flex-shrink-0 ${isMobile ? 'gap-1' : 'gap-1 sm:gap-3'}`}>
            {!showHomeButton && <CategoriesDropdown onSelectCategory={handleCategorySelect} />}
            
            <LanguageSelector />
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>

        {/* Breadcrumb for tool pages - Mobile Optimized */}
        {showHomeButton && toolTitle && toolCategory && (
          <div className={`border-t ${isMobile ? 'mt-2 pt-2' : 'mt-3 pt-3'}`}>
            <Breadcrumb>
              <BreadcrumbList className={`${isMobile ? 'text-sm' : ''}`}>
                <BreadcrumbItem>
                  <BreadcrumbLink 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectTool && onSelectTool('home');
                    }}
                    className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 cursor-pointer"
                  >
                    {t('nav.home')}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectTool && onSelectTool(toolCategory);
                    }}
                    className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 cursor-pointer"
                  >
                    {t(`category.${toolCategory}`)}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-700 dark:text-gray-300">{toolTitle}</BreadcrumbPage>
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
