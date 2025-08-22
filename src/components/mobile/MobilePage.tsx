import React from 'react';
import { MobileLayout } from './MobileLayout';
import { MobileHeader } from './MobileHeader';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useResponsive } from '@/hooks/useResponsive';
import { useI18n } from '@/hooks/useI18n';

interface MobilePageProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  onBack?: () => void;
  showHeader?: boolean;
  headerActions?: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
}

export function MobilePage({
  title,
  subtitle,
  children,
  onBack,
  showHeader = true,
  headerActions,
  className,
  fullHeight = false
}: MobilePageProps) {
  const { isMobile } = useResponsive();
  const { t, isRTL } = useI18n();

  const header = showHeader ? (
    <MobileHeader
      title={title}
      onBack={onBack}
      actions={headerActions}
      showSearch={false}
    />
  ) : undefined;

  return (
    <MobileLayout
      header={header}
      className={className}
    >
      <div className={`${fullHeight ? 'h-full' : ''} ${isMobile ? 'mobile-container mobile-spacing' : 'container mx-auto px-4 py-6'}`}>
        {/* Page Header (if not using MobileHeader) */}
        {!showHeader && (title || onBack) && (
          <div className={`${isMobile ? 'mb-4' : 'mb-6'}`}>
            {onBack && (
              <Button
                variant="ghost"
                onClick={onBack}
                className={`text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 flex items-center gap-2 ${
                  isMobile ? 'mb-3 min-h-[44px] touch-target' : 'mb-4'
                }`}
              >
                <ArrowLeft className={`h-4 w-4 ${isRTL() ? 'rotate-180' : ''}`} />
                {t('nav.back')}
              </Button>
            )}
            
            {title && (
              <div>
                <h1 className={`font-bold text-gray-900 dark:text-gray-100 ${
                  isMobile ? 'mobile-text-2xl mb-2' : 'text-3xl lg:text-4xl mb-3'
                }`}>
                  {title}
                </h1>
                {subtitle && (
                  <p className={`text-gray-600 dark:text-gray-300 ${
                    isMobile ? 'text-base' : 'text-lg'
                  }`}>
                    {subtitle}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Page Content */}
        <div className={`${fullHeight ? 'flex-1 flex flex-col' : ''}`}>
          {children}
        </div>
      </div>
    </MobileLayout>
  );
}