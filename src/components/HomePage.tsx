
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Calculator, 
  Calendar, 
  Home, 
  Briefcase, 
  Heart,
  GraduationCap,
  Globe,
  Settings,
  ArrowRight,
  Star
} from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

interface HomePageProps {
  onSelectTool: (toolId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSelectTool }) => {
  const { t } = useI18n();

  const modules = [
    {
      id: 'admin',
      title: t('modules.admin.title'),
      description: t('modules.admin.description'),
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      tools: t('modules.admin.tools_count'),
      featured: ['letter-generator', 'fee-calculator']
    },
    {
      id: 'logement',
      title: t('modules.logement.title'),  
      description: t('modules.logement.description'),
      icon: Home,
      color: 'from-green-500 to-green-600', 
      tools: t('modules.logement.tools_count'),
      featured: ['budget-calculator']
    },
    {
      id: 'emploi',
      title: t('modules.emploi.title'),
      description: t('modules.emploi.description'),
      icon: Briefcase,
      color: 'from-purple-500 to-purple-600',
      tools: t('modules.emploi.tools_count'),
      featured: ['cv-translator']
    },
    {
      id: 'sante',
      title: t('modules.sante.title'),
      description: t('modules.sante.description'),
      icon: Heart,
      color: 'from-red-500 to-red-600',
      tools: t('modules.sante.tools_count'),
      featured: ['social-security-guide']
    },
    {
      id: 'education', 
      title: t('modules.education.title'),
      description: t('modules.education.description'),
      icon: GraduationCap,
      color: 'from-yellow-500 to-yellow-600',
      tools: t('modules.education.tools_count'),
      featured: ['education-costs-calculator']
    },
    {
      id: 'culture',
      title: t('modules.culture.title'),
      description: t('modules.culture.description'),
      icon: Globe,
      color: 'from-indigo-500 to-indigo-600',
      tools: t('modules.culture.tools_count'),
      featured: ['culture-quiz', 'french-learning-assistant']
    },
    {
      id: 'transversal',
      title: t('modules.transversal.title'),
      description: t('modules.transversal.description'),
      icon: Settings,
      color: 'from-gray-500 to-gray-600',
      tools: t('modules.transversal.tools_count'),
      featured: ['emergency-assistant']
    }
  ];

  const featuredTools = [
    {
      id: 'letter-generator',
      title: t('tools.letter_generator.title'),
      description: t('tools.letter_generator.description'),
      icon: FileText,
      color: 'bg-blue-500',
      category: t('modules.admin.title')
    },
    {
      id: 'budget-calculator',
      title: t('tools.budget_calculator.title'),
      description: t('tools.budget_calculator.description'),
      icon: Calculator,
      color: 'bg-green-500',
      category: t('modules.logement.title')
    },
    {
      id: 'emergency-assistant',
      title: t('tools.emergency_assistant.title'),
      description: t('tools.emergency_assistant.description'),
      icon: Heart,
      color: 'bg-red-500',
      category: t('modules.transversal.title')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 backdrop-blur-3xl"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-2xl">
                🇫🇷
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {t('home.title')}
              </h1>
            </div>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {t('home.subtitle')}
            </p>
            
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              {t('home.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                <ArrowRight className="mr-2 h-5 w-5" />
                {t('home.get_started')}
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200">
                {t('home.explore_tools')}
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>50 {t('home.total_tools')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-blue-500" />
                <span>7 {t('home.categories')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500" />
                <span>100% {t('common.free')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Tools */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('home.explore_tools')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('home.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {featuredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card 
                key={tool.id} 
                className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:scale-105"
                onClick={() => onSelectTool(tool.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${tool.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors duration-200">
                    {tool.title}
                  </CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto">
                    {tool.category}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {tool.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Modules Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('home.categories')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Card 
                key={module.id} 
                className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:scale-105"
                onClick={() => onSelectTool(module.id)}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors duration-200">
                        {module.title}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs mt-1">
                        {module.tools}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {module.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
