
import React, { useState } from 'react';
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
  Menu,
  X
} from 'lucide-react';
import HomePage from '@/components/HomePage';
import AdminModule from '@/components/modules/AdminModule';
import LogementModule from '@/components/modules/LogementModule';
import EmploiModule from '@/components/modules/EmploiModule';
import SanteModule from '@/components/modules/SanteModule';
import EducationModule from '@/components/modules/EducationModule';
import CultureModule from '@/components/modules/CultureModule';
import TransversalModule from '@/components/modules/TransversalModule';
import LetterGenerator from '@/components/tools/LetterGenerator';
import FeeCalculator from '@/components/tools/FeeCalculator';
import BudgetCalculator from '@/components/tools/BudgetCalculator';
import CVTranslator from '@/components/tools/CVTranslator';
import SocialSecurityGuideTool from '@/components/tools/SocialSecurityGuideTool';
import SocialServicesLocatorTool from '@/components/tools/SocialServicesLocatorTool';
import FamilyAllowancesTool from '@/components/tools/FamilyAllowancesTool';
import EducationCostsTool from '@/components/tools/EducationCostsTool';
import CultureQuizTool from '@/components/tools/CultureQuizTool';
import TraditionsGuideTool from '@/components/tools/TraditionsGuideTool';
import FrenchLearningAssistantTool from '@/components/tools/FrenchLearningAssistantTool';
import NaturalizationTestSimulatorTool from '@/components/tools/NaturalizationTestSimulatorTool';
import ExpressionsTranslatorTool from '@/components/tools/ExpressionsTranslatorTool';
import EmergencyAssistantTool from '@/components/tools/EmergencyAssistantTool';
import PlanningGeneratorTool from '@/components/tools/PlanningGeneratorTool';
import BudgetAssistantTool from '@/components/tools/BudgetAssistantTool';
import RightsGuideTool from '@/components/tools/RightsGuideTool';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemeToggle } from '@/components/ThemeToggle';
import UserMenu from '@/components/UserMenu';
import { useI18n } from '@/hooks/useI18n';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import Footer from '@/components/Footer';
import OnlineStatusIndicator from '@/components/OnlineStatusIndicator';

type View = 
  | 'home'
  | 'admin'
  | 'logement'
  | 'emploi'
  | 'sante'
  | 'education'
  | 'culture'
  | 'transversal'
  | 'letter-generator'
  | 'fee-calculator'
  | 'receipt-generator'
  | 'delay-simulator'
  | 'budget-calculator'
  | 'cv-translator'
  | 'social-security-guide'
  | 'social-services-locator'
  | 'family-allowances-calculator'
  | 'education-costs-calculator'
  | 'culture-quiz'
  | 'traditions-guide'
  | 'french-learning-assistant'
  | 'naturalization-simulator'
  | 'french-expressions-translator'
  | 'emergency-assistant'
  | 'planning-generator'
  | 'family-budget-assistant'
  | 'rights-guide';

const Index = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useI18n();
  const isOnline = useOnlineStatus();

  const modules = [
    {
      id: 'admin',
      title: t('modules.admin.title'),
      description: t('modules.admin.description'),
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      tools: 12,
      component: AdminModule
    },
    {
      id: 'logement',
      title: t('modules.logement.title'),  
      description: t('modules.logement.description'),
      icon: Home,
      color: 'from-green-500 to-green-600', 
      tools: 8,
      component: LogementModule
    },
    {
      id: 'emploi',
      title: t('modules.emploi.title'),
      description: t('modules.emploi.description'),
      icon: Briefcase,
      color: 'from-purple-500 to-purple-600',
      tools: 8,
      component: EmploiModule
    },
    {
      id: 'sante',
      title: t('modules.sante.title'),
      description: t('modules.sante.description'),
      icon: Heart,
      color: 'from-red-500 to-red-600',
      tools: 6,
      component: SanteModule
    },
    {
      id: 'education', 
      title: t('modules.education.title'),
      description: t('modules.education.description'),
      icon: GraduationCap,
      color: 'from-yellow-500 to-yellow-600',
      tools: 6,
      component: EducationModule
    },
    {
      id: 'culture',
      title: t('modules.culture.title'),
      description: t('modules.culture.description'),
      icon: Globe,
      color: 'from-indigo-500 to-indigo-600',
      tools: 5,
      component: CultureModule
    },
    {
      id: 'transversal',
      title: t('modules.transversal.title'),
      description: t('modules.transversal.description'),
      icon: Settings,
      color: 'from-gray-500 to-gray-600',
      tools: 5,
      component: TransversalModule
    }
  ];

  const renderHeader = () => (
    <header className="border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            <button
              onClick={() => setCurrentView('home')}
              className="flex items-center gap-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                🇫🇷
              </div>
              <span className="hidden sm:block">IntégrationFrance.org</span>
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <HomePage onSelectTool={(toolId) => setCurrentView(toolId as View)} />;
      
      // Module views
      case 'admin':
        return (
          <AdminModule 
            userProfile={null}
            diagnostic={null}
            onBack={() => setCurrentView('home')}
          />
        );
      
      case 'logement':
        return (
          <LogementModule 
            userProfile={null}
            diagnostic={null}
            onBack={() => setCurrentView('home')}
          />
        );
      
      case 'emploi':
        return (
          <EmploiModule 
            userProfile={null}
            diagnostic={null}
            onBack={() => setCurrentView('home')}
          />
        );
      
      case 'sante':
        return (
          <SanteModule 
            userProfile={null}
            diagnostic={null}
            onBack={() => setCurrentView('home')}
          />
        );
      
      case 'education':
        return (
          <EducationModule 
            userProfile={null}
            diagnostic={null}
            onBack={() => setCurrentView('home')}
          />
        );
      
      case 'culture':
        return (
          <CultureModule 
            userProfile={null}
            diagnostic={null}
            onBack={() => setCurrentView('home')}
          />
        );
      
      case 'transversal':
        return (
          <TransversalModule 
            userProfile={null}
            diagnostic={null}
            onBack={() => setCurrentView('home')}
          />
        );

      // Individual tool views
      case 'letter-generator':
        return <LetterGenerator userProfile={null} diagnostic={null} />;
      
      case 'fee-calculator':
        return <FeeCalculator userProfile={null} diagnostic={null} />;
      
      case 'budget-calculator':
        return <BudgetCalculator userProfile={null} diagnostic={null} />;
      
      case 'cv-translator':
        return <CVTranslator userProfile={null} diagnostic={null} />;
      
      case 'social-security-guide':
        return <SocialSecurityGuideTool userProfile={null} diagnostic={null} onBack={() => setCurrentView('home')} />;
      
      case 'social-services-locator':
        return <SocialServicesLocatorTool userProfile={null} diagnostic={null} onBack={() => setCurrentView('home')} />;
      
      case 'family-allowances-calculator':
        return <FamilyAllowancesTool userProfile={null} diagnostic={null} onBack={() => setCurrentView('home')} />;
      
      case 'education-costs-calculator':
        return <EducationCostsTool userProfile={null} diagnostic={null} onBack={() => setCurrentView('home')} />;
      
      case 'culture-quiz':
        return <CultureQuizTool userProfile={null} diagnostic={null} onBack={() => setCurrentView('home')} />;
      
      case 'traditions-guide':
        return <TraditionsGuideTool userProfile={null} diagnostic={null} onBack={() => setCurrentView('home')} />;
      
      case 'french-learning-assistant':
        return <FrenchLearningAssistantTool userProfile={null} diagnostic={null} onBack={() => setCurrentView('home')} />;
      
      case 'naturalization-simulator':
        return <NaturalizationTestSimulatorTool userProfile={null} diagnostic={null} onBack={() => setCurrentView('home')} />;
      
      case 'french-expressions-translator':
        return <ExpressionsTranslatorTool userProfile={null} diagnostic={null} onBack={() => setCurrentView('home')} />;
      
      case 'emergency-assistant':
        return <EmergencyAssistantTool userProfile={null} diagnostic={null} onBack={() => setCurrentView('home')} />;
      
      case 'planning-generator':
        return <PlanningGeneratorTool userProfile={null} diagnostic={null} onBack={() => setCurrentView('home')} />;
      
      case 'family-budget-assistant':
        return <BudgetAssistantTool userProfile={null} diagnostic={null} onBack={() => setCurrentView('home')} />;
      
      case 'rights-guide':
        return <RightsGuideTool userProfile={null} diagnostic={null} onBack={() => setCurrentView('home')} />;
      
      default:
        return <HomePage onSelectTool={(toolId) => setCurrentView(toolId as View)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
      {currentView !== 'home' && renderHeader()}
      
      <main className="flex-1 relative">
        {renderContent()}
      </main>
      
      <div id="notifications" className="fixed top-4 right-4 z-50" />
      <OnlineStatusIndicator />
      <Footer />
    </div>
  );
};

export default Index;
