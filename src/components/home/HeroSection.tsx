
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Sparkles } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

interface HeroSectionProps {
  onScrollToTools: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToTools }) => {
  const { t, isRTL } = useI18n();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      
      {/* Animated Background Shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white rounded-full px-6 py-3 mb-8 border border-white/30">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-medium">{t('home.hero_subtitle')}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
              IntégraTech
            </span>
            <br />
            <span className="text-white">Suite</span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
            {t('home.hero_description')}
          </p>

          {/* CTA Button */}
          <Button 
            onClick={onScrollToTools}
            size="lg"
            className="bg-white text-purple-600 hover:bg-white/90 font-semibold px-8 py-6 rounded-xl text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
          >
            {t('home.hero_cta')}
            <ArrowDown className={`h-6 w-6 ${isRTL() ? 'mr-3' : 'ml-3'}`} />
          </Button>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-300 mb-2">∞</div>
              <div className="text-white/80 text-sm md:text-base">{t('home.stats_unlimited')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-300 mb-2">0€</div>
              <div className="text-white/80 text-sm md:text-base">{t('home.stats_free')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-300 mb-2">100%</div>
              <div className="text-white/80 text-sm md:text-base">{t('home.stats_client')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-purple-300 mb-2">+50</div>
              <div className="text-white/80 text-sm md:text-base">{t('home.stats_tools')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
