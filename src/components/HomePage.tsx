
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, Home, Briefcase, Heart, GraduationCap, FileText, Globe, Calculator, ChevronDown } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header onSelectTool={onSelectTool} />
      
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="min-h-screen flex items-center justify-center relative">
          <div className="text-center max-w-5xl mx-auto px-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 rounded-3xl -z-10"></div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {t('home.title')}
              </span>
              <br />
              <span className="text-gray-800 dark:text-gray-200 text-4xl md:text-5xl lg:text-6xl">
                {t('home.subtitle')}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
              {t('home.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button 
                onClick={scrollToTools}
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 rounded-2xl"
              >
                Découvrir les outils
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-6 border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 rounded-2xl transition-all duration-300"
              >
                En savoir plus
              </Button>
            </div>

            <div className="animate-bounce">
              <Button 
                variant="ghost" 
                onClick={scrollToTools}
                className="p-4 rounded-full hover:bg-blue-100 transition-all duration-300"
              >
                <ChevronDown className="h-8 w-8 text-blue-600" />
              </Button>
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <div id="tools-section" className="py-20">
          <div className="space-y-16">
            {categories.map(category => {
              const categoryTools = tools.filter(tool => tool.category === category);
              if (categoryTools.length === 0) return null;

              return (
                <div key={category} className="animate-fade-in">
                  <div className="flex items-center justify-between mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-4">
                      <div className="w-3 h-16 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                      {category}
                    </h2>
                    <Badge variant="secondary" className="text-xl px-6 py-3 bg-blue-100 text-blue-800">
                      {categoryTools.length} {t('home.tools_count')}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                            <CardTitle className="text-xl leading-tight group-hover:text-blue-600 transition-colors">
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
                              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl group-hover:scale-105"
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
