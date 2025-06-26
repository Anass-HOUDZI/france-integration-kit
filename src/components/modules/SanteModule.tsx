import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Calculator, Shield, Globe, MapPin, PhoneCall, AlertCircle, Clock } from 'lucide-react';
import SocialSecurityGuideTool from '@/components/tools/SocialSecurityGuideTool';
import HealthCalculatorTool from '@/components/tools/HealthCalculatorTool';
import MutualAssistantTool from '@/components/tools/MutualAssistantTool';
import MedicalTranslatorTool from '@/components/tools/MedicalTranslatorTool';
import SocialServicesLocatorTool from '@/components/tools/SocialServicesLocatorTool';
import EmergencyGuideTool from '@/components/tools/EmergencyGuideTool';

interface SanteModuleProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}

const SanteModule: React.FC<SanteModuleProps> = ({ userProfile, diagnostic, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tools = [
    {
      id: 'social_security_guide',
      title: 'Guide Sécurité Sociale',
      description: 'Comprendre le système de santé français',
      icon: Heart,
      color: 'bg-red-500',
      category: 'Sécurité Sociale',
      status: 'active',
      component: SocialSecurityGuideTool
    },
    {
      id: 'health_calculator',
      title: 'Calculateur Remboursements Santé',
      description: 'Estimez vos frais de santé restant à charge',
      icon: Calculator,
      color: 'bg-pink-500',
      category: 'Remboursements',
      status: 'active',
      component: HealthCalculatorTool
    },
    {
      id: 'mutual_assistant',
      title: 'Assistant Mutuelle',
      description: 'Choisissez une complémentaire santé adaptée',
      icon: Shield,
      color: 'bg-blue-500',
      category: 'Mutuelle',
      status: 'active',
      component: MutualAssistantTool
    },
    {
      id: 'medical_translator',
      title: 'Traducteur Médical',
      description: 'Facilitez la communication avec les soignants',
      icon: Globe,
      color: 'bg-green-500',
      category: 'Traduction',
      status: 'active',
      component: MedicalTranslatorTool
    },
    {
      id: 'social_services',
      title: 'Localisateur Services Sociaux',
      description: 'Trouvez l\'aide sociale près de chez vous',
      icon: MapPin,
      color: 'bg-purple-500',
      category: 'Services',
      status: 'active',
      component: SocialServicesLocatorTool
    },
    {
      id: 'emergency_guide',
      title: 'Guide Urgences Médicales',
      description: 'Savoir réagir en cas d\'urgence santé',
      icon: PhoneCall,
      color: 'bg-orange-500',
      category: 'Urgences',
      status: 'active',
      component: EmergencyGuideTool
    }
  ];

  const activeTool = tools.find(t => t.id === activeTab);

  if (activeTool && activeTool.component && activeTool.status === 'active') {
    const ToolComponent = activeTool.component;
    return (
      <div>
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab('overview')}
            className="text-red-600 hover:bg-red-50"
          >
            ← Retour aux outils
          </Button>
          <div className="flex items-center gap-2">
            <activeTool.icon className="h-6 w-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">{activeTool.title}</h2>
          </div>
        </div>
        <ToolComponent userProfile={userProfile} diagnostic={diagnostic} onBack={() => setActiveTab('overview')} />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-red-600 hover:bg-red-50"
          >
            ← Retour
          </Button>
          <Heart className="h-8 w-8 text-red-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Santé & Social</h1>
            <p className="text-gray-600">6 outils pour votre santé et vos droits sociaux</p>
          </div>
        </div>

        {diagnostic && (
          <Card className="bg-red-50 border-red-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span className="font-medium text-red-900">Conseil santé personnalisé</span>
              </div>
              <p className="text-red-800 text-sm">
                En tant que <strong>{userProfile?.title}</strong>, commencez par comprendre le système de Sécurité Sociale, 
                puis évaluez vos besoins en complémentaire santé.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Card 
            key={tool.id}
            className={`transition-all duration-300 ${
              tool.status === 'active' 
                ? 'hover:shadow-lg cursor-pointer' 
                : 'opacity-75'
            }`}
            onClick={() => tool.status === 'active' && setActiveTab(tool.id)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center`}>
                  <tool.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">
                    {tool.category}
                  </Badge>
                  {tool.status === 'coming_soon' && (
                    <Badge variant="secondary" className="text-xs">
                      Bientôt
                    </Badge>
                  )}
                </div>
              </div>
              <CardTitle className="text-lg">{tool.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                {tool.description}
              </CardDescription>
              
              {tool.status === 'active' ? (
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Utiliser cet outil
                </Button>
              ) : (
                <Button variant="outline" className="w-full" disabled>
                  <Clock className="mr-2 h-4 w-4" />
                  Bientôt disponible
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SanteModule;
