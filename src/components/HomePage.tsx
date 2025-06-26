
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, Home, Briefcase, Heart, GraduationCap, FileText, Globe, Calculator, ChevronDown, Sparkles } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import Header from '@/components/Header';

interface HomePageProps {
  onSelectTool: (toolId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSelectTool }) => {
  const { t } = useI18n();

  const scrollToTools = () => {
    const toolsSection = document.getElementById('tools-section');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tools = [
    // DÉMARCHES ADMINISTRATIVES
    {
      id: 'letter-generator',
      title: t('tool.letter_generator'),
      description: t('tool.letter_generator_desc'),
      category: t('category.admin'),
      icon: FileText,
      gradient: 'from-blue-500 to-blue-600',
      difficulty: t('common.easy'),
      accessibility: 'excellent'
    },
    {
      id: 'fee-calculator',
      title: t('tool.fee_calculator'),
      description: t('tool.fee_calculator_desc'),
      category: t('category.admin'),
      icon: Calculator,
      gradient: 'from-green-500 to-green-600',
      difficulty: t('common.easy'),
      accessibility: 'good'
    },
    {
      id: 'receipt-generator',
      title: t('tool.receipt_generator'),
      description: t('tool.receipt_generator_desc'),
      category: t('category.admin'),
      icon: FileText,
      gradient: 'from-purple-500 to-purple-600',
      difficulty: t('common.easy'),
      accessibility: 'good'
    },
    {
      id: 'delay-simulator',
      title: t('tool.delay_simulator'),
      description: t('tool.delay_simulator_desc'),
      category: t('category.admin'),
      icon: Calculator,
      gradient: 'from-orange-500 to-orange-600',
      difficulty: t('common.easy'),
      accessibility: 'excellent'
    },
    // LOGEMENT & VIE QUOTIDIENNE
    {
      id: 'budget-calculator',
      title: t('tool.budget_calculator'),
      description: t('tool.budget_calculator_desc'),
      category: t('category.logement'),
      icon: Home,
      gradient: 'from-teal-500 to-teal-600',
      difficulty: t('common.easy'),
      accessibility: 'excellent'
    },
    // EMPLOI & FORMATION
    {
      id: 'cv-translator',
      title: t('tool.cv_translator'),
      description: t('tool.cv_translator_desc'),
      category: t('category.emploi'),
      icon: Briefcase,
      gradient: 'from-indigo-500 to-indigo-600',
      difficulty: t('common.medium'),
      accessibility: 'good'
    },
    // SANTÉ & SOCIAL
    {
      id: 'social-security-guide',
      title: t('tool.social_security_guide'),
      description: t('tool.social_security_guide_desc'),
      category: t('category.sante'),
      icon: Heart,
      gradient: 'from-red-500 to-red-600',
      difficulty: t('common.medium'),
      accessibility: 'excellent'
    },
    {
      id: 'social-services-locator',
      title: t('tool.social_services_locator'),
      description: t('tool.social_services_locator_desc'),
      category: t('category.sante'),
      icon: Users,
      gradient: 'from-pink-500 to-pink-600',
      difficulty: t('common.easy'),
      accessibility: 'good'
    },
    // ÉDUCATION & FAMILLE
    {
      id: 'family-allowances-calculator',
      title: t('tool.family_allowances_calculator'),
      description: t('tool.family_allowances_calculator_desc'),
      category: t('category.education'),
      icon: GraduationCap,
      gradient: 'from-yellow-500 to-yellow-600',
      difficulty: t('common.easy'),
      accessibility: 'excellent'
    },
    {
      id: 'education-costs-calculator',
      title: t('tool.education_costs_calculator'),
      description: t('tool.education_costs_calculator_desc'),
      category: t('category.education'),
      icon: Calculator,
      gradient: 'from-cyan-500 to-cyan-600',
      difficulty: t('common.easy'),
      accessibility: 'good'
    },
    // INTÉGRATION CULTURELLE
    {
      id: 'culture-quiz',
      title: t('tool.culture_quiz'),
      description: t('tool.culture_quiz_desc'),
      category: t('category.culture'),
      icon: Globe,
      gradient: 'from-violet-500 to-violet-600',
      difficulty: t('common.medium'),
      accessibility: 'excellent'
    },
    {
      id: 'traditions-guide',
      title: t('tool.traditions_guide'),
      description: t('tool.traditions_guide_desc'),
      category: t('category.culture'),
      icon: Heart,
      gradient: 'from-rose-500 to-rose-600',
      difficulty: t('common.easy'),
      accessibility: 'good'
    },
    {
      id: 'french-learning-assistant',
      title: t('tool.french_learning_assistant'),
      description: t('tool.french_learning_assistant_desc'),
      category: t('category.culture'),
      icon: GraduationCap,
      gradient: 'from-emerald-500 to-emerald-600',
      difficulty: t('common.medium'),
      accessibility: 'excellent'
    },
    {
      id: 'naturalization-simulator',
      title: t('tool.naturalization_simulator'),
      description: t('tool.naturalization_simulator_desc'),
      category: t('category.culture'),
      icon: FileText,
      gradient: 'from-amber-500 to-amber-600',
      difficulty: t('common.advanced'),
      accessibility: 'good'
    },
    {
      id: 'french-expressions-translator',
      title: t('tool.french_expressions_translator'),
      description: t('tool.french_expressions_translator_desc'),
      category: t('category.culture'),
      icon: Globe,
      gradient: 'from-lime-500 to-lime-600',
      difficulty: t('common.medium'),
      accessibility: 'excellent'
    },
    // OUTILS TRANSVERSAUX
    {
      id: 'emergency-assistant',
      title: t('tool.emergency_assistant'),
      description: t('tool.emergency_assistant_desc'),
      category: t('category.transversal'),
      icon: Heart,
      gradient: 'from-red-600 to-red-700',
      difficulty: t('common.easy'),
      accessibility: 'excellent'
    },
    {
      id: 'planning-generator',
      title: t('tool.planning_generator'),
      description: t('tool.planning_generator_desc'),
      category: t('category.transversal'),
      icon: Calculator,
      gradient: 'from-blue-600 to-blue-700',
      difficulty: t('common.easy'),
      accessibility: 'good'
    },
    {
      id: 'family-budget-assistant',
      title: t('tool.family_budget_assistant'),
      description: t('tool.family_budget_assistant_desc'),
      category: t('category.transversal'),
      icon: Calculator,
      gradient: 'from-green-600 to-green-700',
      difficulty: t('common.medium'),
      accessibility: 'excellent'
    },
    {
      id: 'rights-guide',
      title: t('tool.rights_guide'),
      description: t('tool.rights_guide_desc'),
      category: t('category.transversal'),
      icon: FileText,
      gradient: 'from-purple-600 to-purple-700',
      difficulty: t('common.advanced'),
      accessibility: 'good'
    }
  ];

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
    <div className="min-h-screen">
      {/* Header avec le nouveau logo */}
      <Header onSelectTool={onSelectTool} />
      
      {/* Hero Section - Style inspiré de l'image */}
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
              onClick={scrollToTools}
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
              onClick={scrollToTools}
              className="p-4 rounded-full hover:bg-white/20 transition-all duration-300 text-white"
            >
              <ChevronDown className="h-8 w-8" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tools Section */}
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
    </div>
  );
};

export default HomePage;
