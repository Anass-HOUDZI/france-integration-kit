
/**
 * Composant de carte de catégorie réutilisable
 */
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { ToolCategory } from '@/types/tools';

interface CategoryCardProps {
  category: ToolCategory;
  onSelect: (categoryId: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onSelect }) => {
  const { t, isRTL } = useI18n();

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-purple-200 dark:hover:border-purple-700 h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${category.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-200`}>
            {category.icon}
          </div>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100">
            {category.tools.length} {t('home.tools_count')}
          </Badge>
        </div>
        
        <CardTitle className="text-xl text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {t(category.name)}
        </CardTitle>
        
        <CardDescription className="text-gray-600 dark:text-gray-300 line-clamp-2">
          {t(category.description)}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-2">
        <Button 
          onClick={() => onSelect(category.id)}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-200 group"
          size="lg"
        >
          <span>{t('nav.tools')}</span>
          <ArrowRight className={`h-5 w-5 ${isRTL() ? 'mr-2 group-hover:-translate-x-1' : 'ml-2 group-hover:translate-x-1'} transition-transform duration-200`} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
