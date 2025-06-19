
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Star, 
  Menu,
  X
} from 'lucide-react';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemeToggle } from '@/components/ThemeToggle';
import UserMenu from '@/components/UserMenu';
import { useI18n } from '@/hooks/useI18n';

interface HeaderProps {
  onSelectTool?: (toolId: string) => void;
  showFilters?: boolean;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (value: string) => void;
  categories?: string[];
  filteredToolsCount?: number;
  popularToolsCount?: number;
}

const Header: React.FC<HeaderProps> = ({
  onSelectTool,
  showFilters = false,
  searchTerm = '',
  onSearchChange,
  selectedCategory = 'all',
  onCategoryChange,
  categories = [],
  filteredToolsCount = 0,
  popularToolsCount = 0
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useI18n();

  return (
    <header className="border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        {/* Main Header Row */}
        <div className="flex items-center justify-between mb-4">
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
          </div>
          
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>

        {/* Search and Filter Section */}
        {showFilters && (
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input 
                  type="text" 
                  placeholder={t('home.search_placeholder')} 
                  value={searchTerm} 
                  onChange={e => onSearchChange && onSearchChange(e.target.value)} 
                  className="pl-12 py-3 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl" 
                />
              </div>
              
              <div className="flex items-center gap-3">
                <Filter className="h-5 w-5 text-gray-400" />
                <select 
                  value={selectedCategory} 
                  onChange={e => onCategoryChange && onCategoryChange(e.target.value)} 
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-800"
                >
                  <option value="all">{t('home.all_categories')}</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span>{filteredToolsCount} {t('home.tools_found')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{popularToolsCount} {t('home.popular_tools')}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
