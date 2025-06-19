
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Menu,
  X,
  Home
} from 'lucide-react';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemeToggle } from '@/components/ThemeToggle';
import UserMenu from '@/components/UserMenu';
import CategoriesDropdown from '@/components/CategoriesDropdown';
import { useI18n } from '@/hooks/useI18n';

interface HeaderProps {
  onSelectTool?: (toolId: string) => void;
  showHomeButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  onSelectTool,
  showHomeButton = false
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useI18n();

  const handleCategorySelect = (categoryId: string) => {
    if (onSelectTool) {
      onSelectTool(categoryId);
    }
  };

  return (
    <header className="border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        {/* Main Header Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            <button
              onClick={() => onSelectTool && onSelectTool('home')}
              className="flex items-center gap-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                🇫🇷
              </div>
              <span className="hidden sm:block">IntégrationFrance.org</span>
            </button>

            {showHomeButton && (
              <Button
                variant="outline"
                onClick={() => onSelectTool && onSelectTool('home')}
                className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Home className="h-4 w-4" />
                {t('nav.home')}
              </Button>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <CategoriesDropdown onSelectCategory={handleCategorySelect} />
            <LanguageSelector />
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
