
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Home, Calculator, FileText, MapPin, Users, AlertCircle, Clock } from 'lucide-react';
import BudgetCalculator from '@/components/tools/BudgetCalculator';
import RentalDossier from '@/components/tools/RentalDossier';

interface LogementModuleProps {
  userProfile: any;
  diagnostic: any;
}

const LogementModule: React.FC<LogementModuleProps> = ({ userProfile, diagnostic }) => {
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
      id: 'neighborhood_comparator',
      title: 'Comparateur de Quartiers',
      description: 'Comparez les quartiers selon vos critères',
      icon: MapPin,
      color: 'bg-purple-500',
      category: 'Recherche',
      status: 'coming_soon'
    },
    {
      id: 'housing_rights',
      title: 'Guide des Droits Locataires',
      description: 'Connaissez vos droits et devoirs de locataire',
      icon: FileText,
      color: 'bg-orange-500',
      category: 'Information',
      status: 'coming_soon'
    },
    {
      id: 'colocation_helper',
      title: 'Assistant Colocation',
      description: 'Organisez votre colocation efficacement',
      icon: Users,
      color: 'bg-teal-500',
      category: 'Colocation',
      status: 'coming_soon'
    }
  ];

  const categories = [
    { id: 'all', label: 'Tous les outils', count: tools.length },
    { id: 'Budget', label: 'Budget', count: tools.filter(t => t.category === 'Budget').length },
    { id: 'Documents', label: 'Documents', count: tools.filter(t => t.category === 'Documents').length },
    { id: 'Recherche', label: 'Recherche', count: tools.filter(t => t.category === 'Recherche').length }
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
                En tant que <strong>{userProfile?.title}</strong>, nous recommandons de définir d'abord votre budget 
                puis de préparer votre dossier locatif pour maximiser vos chances.
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
