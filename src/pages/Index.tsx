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
  Wifi,
  WifiOff
} from 'lucide-react';
import HomePage from '@/components/HomePage';
import ProfileSelector from '@/components/ProfileSelector';
import DiagnosticWizard from '@/components/DiagnosticWizard';
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
import { useUserProfile } from '@/hooks/useUserProfile';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import Footer from '@/components/Footer';

type View = 
  | 'home'
  | 'profile'
  | 'diagnostic'
  | 'modules'
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
  const { currentProfile, hasProfile, diagnostic, saveProfile, saveDiagnostic } = useUserProfile();
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

  const handleProfileComplete = (profile: any) => {
    saveProfile(profile);
    setCurrentView('diagnostic');
  };

  const handleDiagnosticComplete = (diagnostic: any) => {
    saveDiagnostic(diagnostic);
    setCurrentView('modules');
  };

  const renderHeader = () => (
    <header className="border-b bg-white dark:bg-gray-900 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => setCurrentView(hasProfile ? 'modules' : 'home')}
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              🇫🇷 IntégrationFrance.org
            </button>
            {/* Badge profil affiché SEULEMENT si infos existantes */}
            {hasProfile && (currentProfile?.name || currentProfile?.status) && (
              <Badge variant="outline" className="hidden sm:flex">
                {currentProfile?.name
                  ? `${currentProfile.name}${currentProfile.status ? ` (${t(`profile.${currentProfile.status}`)})` : ''}`
                  : currentProfile?.status
                  ? t(`profile.${currentProfile.status}`)
                  : ''}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-4 w-full justify-end sm:w-auto">
            {isOnline ? (
                <Wifi className="h-5 w-5 text-green-500" />
              ) : (
                <WifiOff className="h-5 w-5 text-red-500" />
            )}
            <LanguageSelector />
            <ThemeToggle />
            {hasProfile && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentView('profile')}
              >
                {t('nav.profile')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        if (!hasProfile) {
          return (
            <HomePage onStartJourney={() => setCurrentView('profile')} />
          );
        } else {
          return renderModulesView();
        }
      
      case 'profile':
        return (
          <ProfileSelector 
            onProfileSelect={handleProfileComplete}
            onBack={() => setCurrentView('home')}
          />
        );
      
      case 'diagnostic':
        return (
          <DiagnosticWizard 
            userProfile={currentProfile}
            onDiagnosticComplete={handleDiagnosticComplete}
            onBack={() => setCurrentView('profile')}
          />
        );
      
      case 'admin':
        return (
          <AdminModule 
            userProfile={currentProfile}
            diagnostic={diagnostic}
            onBack={() => setCurrentView('modules')}
          />
        );
      
      case 'logement':
        return (
          <LogementModule 
            userProfile={currentProfile}
            diagnostic={diagnostic}
            onBack={() => setCurrentView('modules')}
          />
        );
      
      case 'emploi':
        return (
          <EmploiModule 
            userProfile={currentProfile}
            diagnostic={diagnostic}
            onBack={() => setCurrentView('modules')}
          />
        );
      
      case 'sante':
        return (
          <SanteModule 
            userProfile={currentProfile}
            diagnostic={diagnostic}
            onBack={() => setCurrentView('modules')}
          />
        );
      
      case 'education':
        return (
          <EducationModule 
            userProfile={currentProfile}
            diagnostic={diagnostic}
            onBack={() => setCurrentView('modules')}
          />
        );
      
      case 'culture':
        return (
          <CultureModule 
            userProfile={currentProfile}
            diagnostic={diagnostic}
            onBack={() => setCurrentView('modules')}
          />
        );
      
      case 'transversal':
        return (
          <TransversalModule 
            userProfile={currentProfile}
            diagnostic={diagnostic}
            onBack={() => setCurrentView('modules')}
          />
        );
      
      case 'modules':
      default:
        return renderModulesView();
    }
  };

  const renderModulesView = () => (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Bonjour {currentProfile?.name} ! 👋
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Sélectionnez un module pour accéder aux outils adaptés à vos besoins
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {modules.map((module) => {
          const IconComponent = module.icon;
          return (
            <Card 
              key={module.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => module.component && setCurrentView(module.id as View)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${module.color} text-white`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <Badge variant="secondary">{module.tools} outils</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {module.description}
                </CardDescription>
                {module.component ? (
                  <Button className="w-full mt-4">
                    Accéder aux outils
                  </Button>
                ) : (
                  <Badge variant="outline" className="mt-4">
                    Bientôt disponible
                  </Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {(currentView !== 'home' || hasProfile) && renderHeader()}
      <main className="flex-1">
        {renderContent()}
      </main>
      {/* Notifications/Feedback Sonner */}
      <div id="notifications" className="fixed top-4 right-4 z-50" />
      <Footer />
    </div>
  );
};

export default Index;
