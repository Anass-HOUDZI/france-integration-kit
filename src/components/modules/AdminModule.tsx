import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Calculator, Calendar, CheckSquare, Search, Clock, AlertCircle, ClipboardEdit } from 'lucide-react';
import LetterGenerator from '@/components/tools/LetterGenerator';
import FeeCalculator from '@/components/tools/FeeCalculator';
import AppointmentPlanner from '@/components/tools/AppointmentPlanner';
import DocumentCheckerTool from '@/components/tools/DocumentCheckerTool';
import FormAssistantTool from '@/components/tools/FormAssistantTool';
import DelaySimulatorTool from '@/components/tools/DelaySimulatorTool';

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
      title: 'Générateur de Lettres',
      description: 'Créez des lettres administratives conformes',
      icon: FileText,
      color: 'bg-blue-500',
      category: 'Documents',
      status: 'active',
      component: LetterGenerator
    },
    {
      id: 'document_checker',
      title: 'Vérificateur de Documents',
      description: 'Vérifiez la complétude de vos dossiers',
      icon: CheckSquare,
      color: 'bg-green-500',
      category: 'Vérification',
      status: 'active',
      component: DocumentCheckerTool
    },
    {
      id: 'fee_calculator',
      title: 'Calculateur de Frais',
      description: 'Estimez les coûts de vos démarches',
      icon: Calculator,
      color: 'bg-purple-500',
      category: 'Budget',
      status: 'active',
      component: FeeCalculator
    },
    {
      id: 'appointment_planner',
      title: 'Planificateur RDV',
      description: 'Organisez vos rendez-vous administratifs',
      icon: Calendar,
      color: 'bg-orange-500',
      category: 'Planning',
      status: 'active',
      component: AppointmentPlanner
    },
    {
      id: 'form_assistant',
      title: 'Assistant Formulaires CERFA',
      description: 'Aide au remplissage des formulaires officiels',
      icon: ClipboardEdit,
      color: 'bg-indigo-500',
      category: 'Formulaires',
      status: 'active',
      component: FormAssistantTool
    },
    {
      id: 'delay_simulator',
      title: 'Simulateur de Délais',
      description: 'Estimez les temps de traitement des démarches',
      icon: Clock,
      color: 'bg-teal-500',
      category: 'Information',
      status: 'active',
      component: DelaySimulatorTool
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
            <p className="text-gray-600">12 outils pour simplifier vos démarches</p>
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
                En tant que <strong>{userProfile?.title}</strong>, nous recommandons de commencer par 
                vérifier vos documents puis utiliser le générateur de lettres.
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
