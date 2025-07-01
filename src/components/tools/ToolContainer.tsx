
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Home, Sparkles } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemeToggle } from '@/components/ThemeToggle';
import UserMenu from '@/components/UserMenu';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface ToolContainerProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  onBack?: () => void;
  children: React.ReactNode;
  className?: string;
  toolId?: string;
  categoryId?: string;
}

const ToolContainer: React.FC<ToolContainerProps> = ({
  title,
  description,
  icon,
  onBack,
  children,
  className = "",
  toolId,
  categoryId
}) => {
  const { t, isRTL } = useI18n();

  const handleHomeClick = () => {
    if (onBack) {
      onBack();
    }
  };

  const handleCategoryClick = () => {
    if (onBack && categoryId) {
      // Navigation vers la catégorie
      onBack();
    }
  };

  const getCategoryInfo = (catId: string) => {
    const categories = {
      'admin': { title: t('category.admin'), id: 'admin' },
      'logement': { title: t('category.logement'), id: 'logement' },
      'emploi': { title: t('category.emploi'), id: 'emploi' },
      'sante': { title: t('category.sante'), id: 'sante' },
      'education': { title: t('category.education'), id: 'education' },
      'culture': { title: t('category.culture'), id: 'culture' },
      'transversal': { title: t('category.transversal'), id: 'transversal' }
    };
    return categories[catId as keyof typeof categories] || { title: catId, id: catId };
  };

  return (
    <div className={`min-h-screen ${isRTL() ? 'rtl' : 'ltr'}`}>
      {/* Header intégré */}
      <header className="border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
              {/* Bouton retour */}
              <Button 
                variant="ghost" 
                onClick={handleHomeClick}
                className="flex items-center gap-2 text-purple-600 hover:bg-purple-50 flex-shrink-0 px-2 sm:px-3"
              >
                <Home className="h-4 w-4" />
                <span className="text-sm font-medium">{t('nav.back_home')}</span>
              </Button>
              
              {/* Logo */}
              <button 
                onClick={handleHomeClick}
                className="flex items-center gap-2 sm:gap-3 font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 flex-shrink-0"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                </div>
                <span className="hidden sm:block text-lg sm:text-xl truncate">
                  IntégraTech Suite
                </span>
              </button>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
              <LanguageSelector />
              <ThemeToggle />
              <UserMenu />
            </div>
          </div>

          {/* Breadcrumb */}
          {categoryId && (
            <div className="mt-3 border-t pt-3">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        handleHomeClick();
                      }}
                      className="text-purple-600 hover:text-purple-800 cursor-pointer"
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
                        handleCategoryClick();
                      }}
                      className="text-purple-600 hover:text-purple-800 cursor-pointer"
                    >
                      {getCategoryInfo(categoryId).title}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{title}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          )}
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-1">
        <div className={`max-w-4xl mx-auto p-6 space-y-6 ${className}`}>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center justify-center gap-3">
              {icon}
              {title}
            </h1>
            {description && (
              <p className="text-lg text-gray-600 dark:text-gray-300">{description}</p>
            )}
          </div>

          {children}
        </div>
      </main>
    </div>
  );
};

export default ToolContainer;
