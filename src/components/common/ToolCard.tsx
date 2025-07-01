
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

interface ToolCardProps {
  tool: Tool;
  onSelect: (toolId: string) => void;
  compact?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onSelect, compact = false }) => {
  const { t } = useI18n();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-purple-200 dark:hover:border-purple-700 ${compact ? 'h-auto' : 'h-full'}`}>
      <CardHeader className={compact ? 'pb-2' : 'pb-4'}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              {tool.icon}
            </div>
            {tool.popular && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
                <Star className="h-3 w-3 mr-1" />
                {t('common.popular')}
              </Badge>
            )}
          </div>
          <Badge className={getDifficultyColor(tool.difficulty)}>
            {t(`common.${tool.difficulty}`)}
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
          onClick={() => onSelect(tool.id)}
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
