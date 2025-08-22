
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Sparkles } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { useResponsive } from '@/hooks/useResponsive';

interface HeroSectionProps {
  onScrollToTools: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToTools }) => {
  const { t, isRTL } = useI18n();
  const { isMobile, isTablet } = useResponsive();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      
      {/* Animated Background Shapes - Responsive */}
      <div className={`absolute ${isMobile ? 'top-10 left-5 w-48 h-48' : 'top-20 left-10 w-72 h-72'} bg-white/10 rounded-full blur-3xl animate-pulse`}></div>
      <div className={`absolute ${isMobile ? 'bottom-10 right-5 w-64 h-64' : 'bottom-20 right-10 w-96 h-96'} bg-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000`}></div>
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isMobile ? 'w-40 h-40' : 'w-64 h-64'} bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-500`}></div>

      {/* Content */}
      <div className={`relative z-10 container mx-auto ${isMobile ? 'px-4 py-4' : 'px-4'} flex items-center justify-center min-h-screen`}>
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white rounded-full ${isMobile ? 'px-4 py-2 mb-4' : 'px-6 py-3 mb-8'} border border-white/30`}>
            <Sparkles className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
            <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>{t('home.hero_subtitle')}</span>
          </div>

          {/* Main Title - Mobile Optimized */}
          <h1 className={`font-bold text-white ${isMobile ? 'text-3xl mb-4 leading-tight' : isTablet ? 'text-5xl mb-5 leading-tight' : 'text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight'}`}>
            <span className="bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
              IntégraTech
            </span>
            <br />
            <span className="text-white">Suite</span>
          </h1>

          {/* Description - Mobile Optimized */}
          <p className={`text-white/90 max-w-4xl mx-auto leading-relaxed ${isMobile ? 'text-base mb-6' : isTablet ? 'text-lg mb-10' : 'text-xl md:text-2xl mb-12'}`}>
            {t('home.hero_description')}
          </p>

          {/* CTA Button - Touch Optimized */}
          <Button 
            onClick={onScrollToTools}
            size={isMobile ? "default" : "lg"}
            className={`bg-white text-purple-600 hover:bg-white/90 font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${isMobile ? 'px-6 py-4 text-base min-h-[48px]' : 'px-8 py-6 text-lg'}`}
          >
            {t('home.hero_cta')}
            <ArrowDown className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'} ${isRTL() ? 'mr-2' : 'ml-2'}`} />
          </Button>

          {/* Stats - Mobile Grid */}
          <div className={`grid ${isMobile ? 'grid-cols-2 gap-3 mt-8' : 'grid-cols-2 md:grid-cols-4 gap-8 mt-20'} max-w-4xl mx-auto`}>
            <div className="text-center">
              <div className={`font-bold text-yellow-300 mb-2 ${isMobile ? 'text-2xl' : 'text-4xl md:text-5xl'}`}>∞</div>
              <div className={`text-white/80 ${isMobile ? 'text-xs' : 'text-sm md:text-base'}`}>{t('home.stats_unlimited')}</div>
            </div>
            <div className="text-center">
              <div className={`font-bold text-green-300 mb-2 ${isMobile ? 'text-2xl' : 'text-4xl md:text-5xl'}`}>0€</div>
              <div className={`text-white/80 ${isMobile ? 'text-xs' : 'text-sm md:text-base'}`}>{t('home.stats_free')}</div>
            </div>
            <div className="text-center">
              <div className={`font-bold text-blue-300 mb-2 ${isMobile ? 'text-2xl' : 'text-4xl md:text-5xl'}`}>100%</div>
              <div className={`text-white/80 ${isMobile ? 'text-xs' : 'text-sm md:text-base'}`}>{t('home.stats_client')}</div>
            </div>
            <div className="text-center">
              <div className={`font-bold text-purple-300 mb-2 ${isMobile ? 'text-2xl' : 'text-4xl md:text-5xl'}`}>+50</div>
              <div className={`text-white/80 ${isMobile ? 'text-xs' : 'text-sm md:text-base'}`}>{t('home.stats_tools')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
