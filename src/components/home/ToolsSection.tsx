
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

interface Tool {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ComponentType<any>;
  gradient: string;
  difficulty: string;
  accessibility: string;
}

interface ToolsSectionProps {
  tools: Tool[];
  onSelectTool: (toolId: string) => void;
}

const ToolsSection: React.FC<ToolsSectionProps> = ({ tools, onSelectTool }) => {
  const { t } = useI18n();
  const categories = [...new Set(tools.map(tool => tool.category))];

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
    if (difficulty === t('common.easy')) {
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    } else if (difficulty === t('common.medium')) {
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    } else if (difficulty === t('common.advanced')) {
      return 'bg-red-100 text-red-800 hover:bg-red-200';
    }
    return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  };

  return (
    <div id="tools-section" className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 rounded-full px-6 py-3 mb-6">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-medium">Nos Catégories</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Découvrez nos outils
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Chaque catégorie regroupe des outils spécialisés pour répondre à vos besoins spécifiques
          </p>
        </div>

        <div className="space-y-20 lg:space-y-24">
          {categories.map(category => {
            const categoryTools = tools.filter(tool => tool.category === category);
            if (categoryTools.length === 0) return null;

            return (
              <div key={category} className="animate-fade-in">
                <div className="flex items-center justify-between mb-12 lg:mb-16">
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-4">
                    <div className="w-3 h-16 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full"></div>
                    {category}
                  </h3>
                  <Badge variant="secondary" className="text-lg lg:text-xl px-6 py-3 bg-purple-100 text-purple-800">
                    {categoryTools.length} {t('home.tools_count')}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                  {categoryTools.map(tool => {
                    const IconComponent = tool.icon;
                    return (
                      <Card key={tool.id} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:scale-105 bg-white/90 backdrop-blur-sm hover:bg-white">
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between mb-4">
                            <div className={`p-4 rounded-2xl bg-gradient-to-br ${tool.gradient} text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                              <IconComponent className="h-8 w-8" />
                            </div>
                          </div>
                          <CardTitle className="text-xl leading-tight group-hover:text-purple-600 transition-colors">
                            {tool.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-4">
                          <CardDescription className="text-gray-600 text-base leading-relaxed">
                            {tool.description}
                          </CardDescription>
                          
                          <div className="flex flex-wrap gap-2">
                            <Badge className={getDifficultyColor(tool.difficulty)}>
                              {tool.difficulty}
                            </Badge>
                            {getAccessibilityBadge(tool.accessibility)}
                          </div>
                          
                          <Button 
                            onClick={() => onSelectTool(tool.id)} 
                            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl group-hover:scale-105"
                          >
                            {t('common.use_tool')}
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ToolsSection;
