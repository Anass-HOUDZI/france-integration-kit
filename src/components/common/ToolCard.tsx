
/**
 * Composant de carte d'outil réutilisable
 */
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { Tool } from '@/types/tools';

// Interface pour les anciens outils (ToolData)
interface LegacyTool {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  category: string;
  status: 'active' | 'coming_soon';
  component?: React.ComponentType<any>;
}

interface ToolCardProps {
  tool: Tool | LegacyTool;
  onSelect?: (toolId: string) => void;
  onToolClick?: (toolId: string) => void;
  compact?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onSelect, onToolClick, compact = false }) => {
  const { t } = useI18n();

  const handleClick = () => {
    if (onSelect) onSelect(tool.id);
    if (onToolClick) onToolClick(tool.id);
  };

  // Fonction pour déterminer si c'est un ancien outil (ToolData)
  const isLegacyTool = (tool: Tool | LegacyTool): tool is LegacyTool => {
    return 'title' in tool && 'status' in tool;
  };

  const getDifficultyColor = (difficulty?: string) => {
    if (!difficulty) return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
    
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
    }
  };

  if (isLegacyTool(tool)) {
    // Rendu pour les anciens outils (ToolData)
    const IconComponent = tool.icon;
    
    return (
      <Card className={`group hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-purple-200 dark:hover:border-purple-700 ${compact ? 'h-auto' : 'h-full'}`}>
        <CardHeader className={compact ? 'pb-2' : 'pb-4'}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 ${tool.color} text-white rounded-lg`}>
                <IconComponent className="h-5 w-5" />
              </div>
              {tool.status === 'active' && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                  Actif
                </Badge>
              )}
            </div>
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
              {tool.category}
            </Badge>
          </div>
          
          <CardTitle className={`text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors ${compact ? 'text-base' : 'text-lg'}`}>
            {tool.title}
          </CardTitle>
          
          {!compact && (
            <CardDescription className="text-gray-600 dark:text-gray-300 line-clamp-2">
              {tool.description}
            </CardDescription>
          )}
        </CardHeader>
        
        <CardContent className={compact ? 'pt-0' : 'pt-2'}>
          <Button 
            onClick={handleClick}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
            size={compact ? "sm" : "default"}
            disabled={tool.status === 'coming_soon'}
          >
            {tool.status === 'coming_soon' ? 'Bientôt disponible' : 'Utiliser l\'outil'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Rendu pour les nouveaux outils (Tool)
  const isPopular = 'popular' in tool && tool.popular;
  const difficulty = 'difficulty' in tool ? tool.difficulty : undefined;

  return (
    <Card className={`group hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-purple-200 dark:hover:border-purple-700 ${compact ? 'h-auto' : 'h-full'}`}>
      <CardHeader className={compact ? 'pb-2' : 'pb-4'}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              {tool.icon}
            </div>
            {isPopular && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
                <Star className="h-3 w-3 mr-1" />
                {t('common.popular')}
              </Badge>
            )}
          </div>
          <Badge className={getDifficultyColor(difficulty)}>
            {difficulty ? t(`common.${difficulty}`) : 'Standard'}
          </Badge>
        </div>
        
        <CardTitle className={`text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors ${compact ? 'text-base' : 'text-lg'}`}>
          {t(tool.name)}
        </CardTitle>
        
        {!compact && (
          <CardDescription className="text-gray-600 dark:text-gray-300 line-clamp-2">
            {t(tool.description)}
          </CardDescription>
        )}
      </CardHeader>
      
      <CardContent className={compact ? 'pt-0' : 'pt-2'}>
        <Button 
          onClick={handleClick}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
          size={compact ? "sm" : "default"}
        >
          {t('common.use_tool')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ToolCard;
