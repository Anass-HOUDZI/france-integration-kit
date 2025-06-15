
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, Calculator, FileText, MapPin, Users, AlertCircle, Clock, CheckSquare, TrendingDown, Shield } from 'lucide-react';
import BudgetCalculator from '@/components/tools/BudgetCalculator';
import RentalDossier from '@/components/tools/RentalDossier';
import StateOfPlayTool from '@/components/tools/StateOfPlayTool';
import NeighborhoodComparator from '@/components/tools/NeighborhoodComparator';
import RentNegotiator from '@/components/tools/RentNegotiator';
import InsuranceAssistant from '@/components/tools/InsuranceAssistant';

interface LogementModuleProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}

const LogementModule: React.FC<LogementModuleProps> = ({ userProfile, diagnostic, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tools = [
    {
      id: 'budget_calculator',
      title: 'Calculateur Budget Logement',
      description: 'Calculez votre budget logement selon vos revenus',
      icon: Calculator,
      color: 'bg-green-500',
      category: 'Budget',
      status: 'active',
      component: BudgetCalculator
    },
    {
      id: 'rental_dossier',
      title: 'Générateur Dossier Locatif',
      description: 'Créez un dossier locatif complet et conforme',
      icon: FileText,
      color: 'bg-blue-500',
      category: 'Documents',
      status: 'active',
      component: RentalDossier
    },
    {
      id: 'state_of_play',
      title: 'Assistant État des Lieux',
      description: 'Réalisez un état des lieux précis avec photos',
      icon: CheckSquare,
      color: 'bg-purple-500',
      category: 'État des lieux',
      status: 'active',
      component: StateOfPlayTool
    },
    {
      id: 'neighborhood_comparator',
      title: 'Comparateur de Quartiers',
      description: 'Comparez les quartiers selon vos critères',
      icon: MapPin,
      color: 'bg-indigo-500',
      category: 'Recherche',
      status: 'active',
      component: NeighborhoodComparator
    },
    {
      id: 'rent_negotiator',
      title: 'Guide Négociation Loyer',
      description: 'Obtenez arguments et outils pour négocier',
      icon: TrendingDown,
      color: 'bg-orange-500',
      category: 'Négociation',
      status: 'active',
      component: RentNegotiator
    },
    {
      id: 'insurance_assistant',
      title: 'Assistant Assurance Habitation',
      description: 'Trouvez la meilleure assurance pour votre logement',
      icon: Shield,
      color: 'bg-teal-500',
      category: 'Assurance',
      status: 'active',
      component: InsuranceAssistant
    },
    {
      id: 'moving_calculator',
      title: 'Calculateur Frais Déménagement',
      description: 'Estimez le coût de votre déménagement',
      icon: Calculator,
      color: 'bg-red-500',
      category: 'Déménagement',
      status: 'coming_soon'
    },
    {
      id: 'moving_planner',
      title: 'Planificateur Emménagement',
      description: 'Organisez votre emménagement étape par étape',
      icon: Calendar,
      color: 'bg-yellow-500',
      category: 'Planning',
      status: 'coming_soon'
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
            className="text-green-600 hover:bg-green-50"
          >
            ← Retour aux outils
          </Button>
          <div className="flex items-center gap-2">
            <activeTool.icon className="h-6 w-6 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">{activeTool.title}</h2>
          </div>
        </div>
        <ToolComponent userProfile={userProfile} diagnostic={diagnostic} />
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
            className="text-green-600 hover:bg-green-50"
          >
            ← Retour
          </Button>
          <Home className="h-8 w-8 text-green-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Logement & Vie Quotidienne</h1>
            <p className="text-gray-600">8 outils pour trouver et gérer votre logement</p>
          </div>
        </div>

        {diagnostic && (
          <Card className="bg-green-50 border-green-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-900">Conseil personnalisé</span>
              </div>
              <p className="text-green-800 text-sm">
                En tant que <strong>{userProfile?.title}</strong>, nous recommandons de définir d'abord votre budget, 
                puis de préparer votre dossier locatif et de maîtriser l'état des lieux.
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
                <Button className="w-full bg-green-600 hover:bg-green-700">
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

export default LogementModule;
