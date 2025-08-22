import React from 'react';
import { MobileCard } from './MobileCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { useResponsive } from '@/hooks/useResponsive';

interface MobileCategoryCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  toolCount: number;
  gradient?: string;
  onSelect: (categoryId: string) => void;
}

export function MobileCategoryCard({
  id,
  title,
  description,
  icon,
  toolCount,
  gradient = 'from-purple-500 to-indigo-500',
  onSelect
}: MobileCategoryCardProps) {
  const { t, isRTL } = useI18n();
  const { isMobile } = useResponsive();

  return (
    <MobileCard
      title={title}
      description={description}
      icon={icon}
      gradient={gradient}
      onClick={() => onSelect(id)}
      className="h-full group"
    >
      <div className={`space-y-${isMobile ? '3' : '4'}`}>
        {/* Tool Count Badge */}
        <div className="flex justify-end">
          <Badge className={`bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800 ${
            isMobile ? 'text-sm px-3 py-1' : 'text-base px-4 py-2'
          }`}>
            {toolCount} {t('home.tools_count')}
          </Badge>
        </div>

        {/* Action Button */}
        <Button
          onClick={() => onSelect(id)}
          className={`w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 text-white font-medium rounded-xl shadow-lg hover:shadow-xl group-hover:scale-105 active:scale-95 ${
            isMobile ? 'py-3 text-base min-h-[48px] touch-target' : 'py-4 text-lg'
          }`}
        >
          {t('common.explore')}
          <ArrowRight className={`group-hover:translate-x-1 transition-transform ${
            isMobile ? 'h-5 w-5' : 'h-6 w-6'
          } ${isRTL() ? 'mr-2 rotate-180' : 'ml-2'}`} />
        </Button>
      </div>
    </MobileCard>
  );
}