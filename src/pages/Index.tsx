
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Home, Briefcase, Heart, GraduationCap, Globe, Settings, Users, ChevronRight, MapPin, Calculator, BookOpen } from 'lucide-react';
import ProfileSelector from '@/components/ProfileSelector';
import DiagnosticWizard from '@/components/DiagnosticWizard';
import AdminModule from '@/components/modules/AdminModule';
import LogementModule from '@/components/modules/LogementModule';
import EmploiModule from '@/components/modules/EmploiModule';

const Index = () => {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [userProfile, setUserProfile] = useState(null);
  const [diagnostic, setDiagnostic] = useState(null);
  const [activeModule, setActiveModule] = useState(null);

  const modules = [
    {
      id: 'admin',
      title: 'Démarches Administratives',
      description: '12 outils pour naviguer dans l\'administration française',
      icon: FileText,
      color: 'bg-blue-500',
      tools: 12,
      component: AdminModule
    },
    {
      id: 'logement',
      title: 'Logement & Vie Quotidienne',
      description: '8 outils pour le logement et la vie quotidienne',
      icon: Home,
      color: 'bg-green-500',
      tools: 8,
      component: LogementModule
    },
    {
      id: 'emploi',
      title: 'Emploi & Formation',
      description: '8 outils pour l\'emploi et la formation professionnelle',
      icon: Briefcase,
      color: 'bg-purple-500',
      tools: 8,
      component: EmploiModule
    },
    {
      id: 'sante',
      title: 'Santé & Social',
      description: '6 outils pour la santé et les services sociaux',
      icon: Heart,
      color: 'bg-red-500',
      tools: 6,
      component: null
    },
    {
      id: 'education',
      title: 'Éducation & Famille',
      description: '6 outils pour l\'éducation et la famille',
      icon: GraduationCap,
      color: 'bg-orange-500',
      tools: 6,
      component: null
    },
    {
      id: 'culture',
      title: 'Intégration Culturelle',
      description: '5 outils pour l\'intégration culturelle',
      icon: Globe,
      color: 'bg-teal-500',
      tools: 5,
      component: null
    },
    {
      id: 'transversal',
      title: 'Outils Transversaux',
      description: '5 outils utiles au quotidien',
      icon: Settings,
      color: 'bg-gray-500',
      tools: 5,
      component: null
    }
  ];

  if (activeModule) {
    const module = modules.find(m => m.id === activeModule);
    const ModuleComponent = module?.component;
    
    if (ModuleComponent) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-4 mb-6">
              <Button 
                variant="ghost" 
                onClick={() => setActiveModule(null)}
                className="text-blue-600 hover:bg-blue-50"
              >
                ← Retour aux modules
              </Button>
              <div className="flex items-center gap-2">
                <module.icon className="h-6 w-6 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">{module.title}</h1>
              </div>
            </div>
            <ModuleComponent userProfile={userProfile} diagnostic={diagnostic} />
          </div>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-red-600 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Intégration France</h1>
                <p className="text-sm text-gray-600">50 outils gratuits</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                🇫🇷 Français
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                ✓ Gratuit
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {currentStep === 'welcome' && (
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Users className="h-4 w-4" />
                Plateforme officielle d'aide à l'intégration
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Bienvenue en <span className="text-blue-600">France</span> !
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Découvrez notre suite complète de <strong>50 outils gratuits</strong> pour faciliter 
                votre intégration en France. De l'administration au logement, en passant par l'emploi 
                et l'éducation, nous vous accompagnons dans toutes vos démarches.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  size="lg" 
                  onClick={() => setCurrentStep('profile')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                >
                  Commencer mon parcours
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => setCurrentStep('modules')}
                  className="border-blue-200 text-blue-700 hover:bg-blue-50 px-8 py-3"
                >
                  Explorer les outils
                  <BookOpen className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card className="text-center border-blue-100 bg-blue-50/50">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">50</div>
                  <p className="text-sm text-gray-600">Outils gratuits</p>
                </CardContent>
              </Card>
              <Card className="text-center border-red-100 bg-red-50/50">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-red-600 mb-2">7</div>
                  <p className="text-sm text-gray-600">Modules thématiques</p>
                </CardContent>
              </Card>
              <Card className="text-center border-green-100 bg-green-50/50">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">20+</div>
                  <p className="text-sm text-gray-600">Langues supportées</p>
                </CardContent>
              </Card>
              <Card className="text-center border-purple-100 bg-purple-50/50">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
                  <p className="text-sm text-gray-600">Gratuit & sans pub</p>
                </CardContent>
              </Card>
            </div>

            {/* Module Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.slice(0, 6).map((module) => (
                <Card key={module.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer border-gray-100">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${module.color} rounded-lg flex items-center justify-center`}>
                        <module.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base">{module.title}</CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          {module.tools} outils
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {module.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'profile' && (
          <ProfileSelector 
            onProfileSelect={(profile) => {
              setUserProfile(profile);
              setCurrentStep('diagnostic');
            }}
            onBack={() => setCurrentStep('welcome')}
          />
        )}

        {currentStep === 'diagnostic' && (
          <DiagnosticWizard 
            userProfile={userProfile}
            onDiagnosticComplete={(diag) => {
              setDiagnostic(diag);
              setCurrentStep('modules');
            }}
            onBack={() => setCurrentStep('profile')}
          />
        )}

        {currentStep === 'modules' && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Vos outils d'intégration
              </h2>
              <p className="text-gray-600">
                Choisissez un module pour accéder aux outils correspondants
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module) => (
                <Card 
                  key={module.id} 
                  className="hover:shadow-xl transition-all duration-300 cursor-pointer border-gray-100 group"
                  onClick={() => module.component && setActiveModule(module.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 ${module.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <module.icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {module.tools} outils
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {module.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {module.description}
                    </CardDescription>
                    {module.component ? (
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Accéder aux outils
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full" disabled>
                        Bientôt disponible
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentStep('welcome')}
                className="text-gray-600 hover:text-gray-800"
              >
                ← Retour à l'accueil
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">🇫🇷 Plateforme d'Intégration en France</p>
            <p className="text-sm">
              Conçue avec ❤️ pour faciliter votre intégration | 
              <span className="ml-2">Gratuit • Sans publicité • Respect de la vie privée</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
