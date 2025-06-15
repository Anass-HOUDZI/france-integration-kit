import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileText, Calculator, Calendar, Mail, Download, Copy, Clock, AlertCircle } from 'lucide-react';
import LetterGenerator from '@/components/tools/LetterGenerator';
import FeeCalculator from '@/components/tools/FeeCalculator';
import AppointmentPlanner from '@/components/tools/AppointmentPlanner';

interface AdminModuleProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}

const AdminModule: React.FC<AdminModuleProps> = ({ userProfile, diagnostic, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tools = [
    {
      id: 'letter_generator',
      title: 'Générateur de Lettres Officielles',
      description: 'Créez des lettres administratives conformes aux standards français',
      icon: FileText,
      color: 'bg-blue-500',
      category: 'Correspondance',
      status: 'active',
      component: LetterGenerator
    },
    {
      id: 'fee_calculator',
      title: 'Calculateur de Frais Administratifs',
      description: 'Calculez les coûts de vos démarches administratives',
      icon: Calculator,
      color: 'bg-green-500',
      category: 'Finances',
      status: 'active',
      component: FeeCalculator
    },
    {
      id: 'appointment_planner',
      title: 'Planificateur de Rendez-vous',
      description: 'Organisez vos rendez-vous administratifs',
      icon: Calendar,
      color: 'bg-purple-500',
      category: 'Organisation',
      status: 'active',
      component: AppointmentPlanner
    },
    {
      id: 'form_assistant',
      title: 'Assistant Formulaires',
      description: 'Aide pour remplir les formulaires administratifs français',
      icon: FileText,
      color: 'bg-orange-500',
      category: 'Formulaires',
      status: 'coming_soon'
    },
    {
      id: 'document_checker',
      title: 'Vérificateur de Documents',
      description: 'Vérifiez si vos documents sont complets',
      icon: AlertCircle,
      color: 'bg-red-500',
      category: 'Vérification',
      status: 'coming_soon'
    },
    {
      id: 'procedure_guide',
      title: 'Guide des Procédures',
      description: 'Guide étape par étape pour vos démarches',
      icon: FileText,
      color: 'bg-indigo-500',
      category: 'Information',
      status: 'coming_soon'
    }
  ];

  const categories = [
    { id: 'all', label: 'Tous les outils', count: tools.length },
    { id: 'Correspondance', label: 'Correspondance', count: tools.filter(t => t.category === 'Correspondance').length },
    { id: 'Finances', label: 'Finances', count: tools.filter(t => t.category === 'Finances').length },
    { id: 'Organisation', label: 'Organisation', count: tools.filter(t => t.category === 'Organisation').length }
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
            className="text-blue-600 hover:bg-blue-50"
          >
            ← Retour aux outils
          </Button>
          <div className="flex items-center gap-2">
            <activeTool.icon className="h-6 w-6 text-blue-600" />
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
            className="text-blue-600 hover:bg-blue-50"
          >
            ← Retour
          </Button>
          <FileText className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Démarches Administratives</h1>
            <p className="text-gray-600">12 outils pour naviguer dans l'administration française</p>
          </div>
        </div>

        {diagnostic && (
          <Card className="bg-blue-50 border-blue-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-900">Recommandations personnalisées</span>
              </div>
              <p className="text-blue-800 text-sm">
                Basé sur votre profil <strong>{userProfile?.title}</strong>, nous recommandons de commencer par les outils de correspondance et calcul des frais.
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
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
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

export default AdminModule;
