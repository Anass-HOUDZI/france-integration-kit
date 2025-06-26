
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onScrollToTools: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToTools }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 via-blue-600/90 to-indigo-700/90"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6 py-16 lg:py-24">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-8 text-white">
          <Sparkles className="h-5 w-5" />
          <span className="text-sm font-medium">Suite d'outils IA révolutionnaire</span>
        </div>
        
        {/* Main Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight">
          <span className="text-white block mb-2">
            IntégraTech
          </span>
          <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            Suite
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-12 px-4">
          50 outils d'intelligence artificielle révolutionnaires, 100% gratuits et open source. Aucune authentification, aucune base de données, aucune limite.
        </p>

        {/* CTA Button */}
        <div className="mb-16">
          <Button 
            onClick={onScrollToTools}
            size="lg"
            className="text-lg px-12 py-6 bg-white text-purple-700 hover:bg-gray-100 hover:text-purple-800 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 rounded-2xl font-semibold"
          >
            Découvrir les outils
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto text-center">
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">50+</div>
            <div className="text-sm md:text-base text-white/80">Outils Disponibles</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">100%</div>
            <div className="text-sm md:text-base text-white/80">Côté Client</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">0€</div>
            <div className="text-sm md:text-base text-white/80">Coût Total</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">∞</div>
            <div className="text-sm md:text-base text-white/80">Utilisation Illimitée</div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Button 
            variant="ghost" 
            onClick={onScrollToTools}
            className="p-4 rounded-full hover:bg-white/20 transition-all duration-300 text-white"
          >
            <ChevronDown className="h-8 w-8" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
