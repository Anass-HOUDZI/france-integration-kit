
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useHomePageData } from '@/hooks/useHomePageData';
import { useI18n } from '@/hooks/useI18n';
import Header from '@/components/Header';

interface CategoryPageProps {
  categoryId: string;
  onSelectTool: (toolId: string) => void;
  onBack: () => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ categoryId, onSelectTool, onBack }) => {
  const tools = useHomePageData();
  const { t, isRTL } = useI18n();
  
  const categoryTools = tools.filter(tool => {
    const toolCategory = tool.category.toLowerCase();
    const searchCategory = categoryId.toLowerCase();
    
    if (searchCategory === 'admin') return toolCategory.includes('administratives');
    if (searchCategory === 'logement') return toolCategory.includes('logement') || toolCategory.includes('quotidienne');
    if (searchCategory === 'emploi') return toolCategory.includes('emploi') || toolCategory.includes('formation');
    if (searchCategory === 'sante') return toolCategory.includes('santé') || toolCategory.includes('social');
    if (searchCategory === 'education') return toolCategory.includes('éducation') || toolCategory.includes('famille');
    if (searchCategory === 'culture') return toolCategory.includes('culturelle') || toolCategory.includes('intégration');
    if (searchCategory === 'transversal') return toolCategory.includes('transversaux');
    
    return false;
  });

  const getAccessibilityBadge = (level: string) => {
    switch (level) {
      case 'excellent':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">★★★ {t('common.excellent')}</Badge>;
      case 'good':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">★★☆ {t('common.good')}</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">★☆☆ {t('common.basic')}</Badge>;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === 'Facile' || difficulty === 'Easy') {
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    } else if (difficulty === 'Moyen' || difficulty === 'Medium') {
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    } else if (difficulty === 'Avancé' || difficulty === 'Advanced') {
      return 'bg-red-100 text-red-800 hover:bg-red-200';
    }
    return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 ${isRTL() ? 'rtl' : 'ltr'}`}>
      <Header onSelectTool={onSelectTool} showHomeButton={true} toolTitle={t(`category.${categoryId}`)} />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <Button 
            onClick={onBack}
            variant="ghost" 
            className="mb-6 text-purple-600 hover:bg-purple-50 flex items-center gap-2"
          >
            <ArrowLeft className={`h-4 w-4 ${isRTL() ? 'rotate-180' : ''}`} />
            {t('nav.back_home')}
          </Button>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t(`category.${categoryId}`)}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {categoryTools.length} {t('home.tools_count')}
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {categoryTools.map(tool => {
            const IconComponent = tool.icon;
            return (
              <Card key={tool.id} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:scale-105 bg-white/90 backdrop-blur-sm hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800">
                <CardHeader className="pb-4">
                  <div className={`flex items-start justify-between mb-4 ${isRTL() ? 'flex-row-reverse' : ''}`}>
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${tool.gradient} text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight group-hover:text-purple-600 transition-colors dark:text-gray-100">
                    {t(`tool.${tool.id}`)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  <CardDescription className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                    {t(`tool.${tool.id}_desc`)}
                  </CardDescription>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getDifficultyColor(tool.difficulty)}>
                      {t(`common.${tool.difficulty.toLowerCase()}`)}
                    </Badge>
                    {getAccessibilityBadge(tool.accessibility)}
                  </div>
                  
                  <Button 
                    onClick={() => onSelectTool(tool.id)} 
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl group-hover:scale-105"
                  >
                    {t('common.use_tool')}
                    <ArrowRight className={`h-5 w-5 group-hover:translate-x-1 transition-transform ${isRTL() ? 'mr-2 rotate-180' : 'ml-2'}`} />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {categoryTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500 dark:text-gray-400">{t('common.no_tools_available')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
