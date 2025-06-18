
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
  Settings
} from 'lucide-react';
import HomePage from '@/components/HomePage';
import AdminModule from '@/components/modules/AdminModule';
import LogementModule from '@/components/modules/LogementModule';
import EmploiModule from '@/components/modules/EmploiModule';
import SanteModule from '@/components/modules/SanteModule';
import EducationModule from '@/components/modules/EducationModule';
import CultureModule from '@/components/modules/CultureModule';
import TransversalModule from '@/components/modules/TransversalModule';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemeToggle } from '@/components/ThemeToggle';
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
  | 'transversal';

const Index = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const { t } = useI18n();
  const isOnline = useOnlineStatus();

  const modules = [
    {
      id: 'admin',
      title: t('modules.admin.title'),
      description: t('modules.admin.description'),
      icon: FileText,
      color: 'bg-blue-500',
      tools: 12,
      component: AdminModule
    },
    {
      id: 'logement',
      title: t('modules.logement.title'),
      description: t('modules.logement.description'),
      icon: Home,
      color: 'bg-green-500',
      tools: 8,
      component: LogementModule
    },
    {
      id: 'emploi',
      title: t('modules.emploi.title'),
      description: t('modules.emploi.description'),
      icon: Briefcase,
      color: 'bg-purple-500',
      tools: 8,
      component: EmploiModule
    },
    {
      id: 'sante',
      title: 'Santé & Social',
      description: 'Comprendre le système de santé français',
      icon: Heart,
      color: 'bg-red-500',
      tools: 6,
      component: SanteModule
    },
    {
      id: 'education',
      title: 'Éducation & Famille',
      description: 'Scolarité et vie de famille en France',
      icon: GraduationCap,
      color: 'bg-yellow-500',
      tools: 6,
      component: EducationModule
    },
    {
      id: 'culture',
      title: 'Intégration Culturelle',
      description: 'Découvrir la culture française',
      icon: Globe,
      color: 'bg-indigo-500',
      tools: 5,
      component: CultureModule
    },
    {
      id: 'transversal',
      title: 'Outils Transversaux',
      description: "Outils d'aide générale",
      icon: Settings,
      color: 'bg-gray-500',
      tools: 5,
      component: TransversalModule
    }
  ];

  const renderHeader = () => (
    <header className="border-b bg-white dark:bg-gray-900 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => setCurrentView('home')}
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              🇫🇷 IntégrationFrance.org
            </button>
          </div>
          <div className="flex items-center gap-4 w-full justify-end sm:w-auto">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <HomePage onToolSelect={(moduleId) => setCurrentView(moduleId as View)} />;
      
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
      
      default:
        return <HomePage onToolSelect={(moduleId) => setCurrentView(moduleId as View)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {currentView !== 'home' && renderHeader()}
      <main className="flex-1">
        {renderContent()}
      </main>
      <div id="notifications" className="fixed top-4 right-4 z-50" />
      <OnlineStatusIndicator />
      <Footer />
    </div>
  );
};

export default Index;
