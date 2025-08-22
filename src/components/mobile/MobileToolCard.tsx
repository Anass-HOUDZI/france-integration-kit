import React from 'react';
import { MobileCard } from './MobileCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { useResponsive } from '@/hooks/useResponsive';

interface MobileToolCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  difficulty?: string;
  accessibility?: string;
  gradient?: string;
  onSelect: (toolId: string) => void;
}

export function MobileToolCard({
  id,
  title,
  description,
  icon,
  difficulty,
  accessibility,
  gradient = 'from-purple-500 to-indigo-500',
  onSelect
}: MobileToolCardProps) {
  const { t, isRTL } = useI18n();
  const { isMobile } = useResponsive();

  const getDifficultyColor = (level?: string) => {
    switch (level?.toLowerCase()) {
      case 'facile':
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'moyen':
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'avancé':
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getAccessibilityBadge = (level?: string) => {
    switch (level?.toLowerCase()) {
      case 'excellent':
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            ★★★ {t('common.excellent')}
          </Badge>
        );
      case 'good':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            ★★☆ {t('common.good')}
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">
            ★☆☆ {t('common.basic')}
          </Badge>
        );
    }
  };

  return (
    <MobileCard
      title={title}
      description={description}
      icon={icon}
      gradient={gradient}
      onClick={() => onSelect(id)}
      className="h-full"
    >
      <div className={`space-y-${isMobile ? '3' : '4'}`}>
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {difficulty && (
            <Badge className={`${getDifficultyColor(difficulty)} ${isMobile ? 'text-xs px-2 py-1' : ''}`}>
              {t(`common.${difficulty.toLowerCase()}`)}
            </Badge>
          )}
          {accessibility && getAccessibilityBadge(accessibility)}
        </div>

        {/* Action Button */}
        <Button
          onClick={() => onSelect(id)}
          className={`w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 text-white font-medium rounded-xl shadow-lg hover:shadow-xl active:scale-95 ${
            isMobile ? 'py-3 text-sm min-h-[44px] touch-target' : 'py-3 text-base'
          }`}
        >
          {t('common.use_tool')}
          <ArrowRight className={`transition-transform group-hover:translate-x-1 ${
            isMobile ? 'h-4 w-4' : 'h-5 w-5'
          } ${isRTL() ? 'mr-2 rotate-180' : 'ml-2'}`} />
        </Button>
      </div>
    </MobileCard>
  );
}