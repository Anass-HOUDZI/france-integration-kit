
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Home, Sparkles } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import Header from '@/components/Header';
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
      {/* Header principal de l'app */}
      <Header 
        showHomeButton={true}
        onSelectTool={(toolId) => {
          if (toolId === 'home' && onBack) {
            onBack();
          }
        }}
        toolTitle={title}
        toolCategory={categoryId}
      />

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
