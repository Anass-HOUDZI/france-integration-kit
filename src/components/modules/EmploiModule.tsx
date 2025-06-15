import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, FileText, Calculator, Users, GraduationCap, Clock, AlertCircle } from 'lucide-react';
import CVTranslatorTool from '@/components/tools/CVTranslatorTool';
import SalaryCalculatorTool from '@/components/tools/SalaryCalculatorTool';
import MotivationLetterTool from '@/components/tools/MotivationLetterTool';
import InterviewAssistantTool from '@/components/tools/InterviewAssistantTool';
import DiplomaEquivalenceTool from '@/components/tools/DiplomaEquivalenceTool';

interface EmploiModuleProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}

const EmploiModule: React.FC<EmploiModuleProps> = ({ userProfile, diagnostic, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tools = [
    {
      id: 'cv_translator',
      title: 'Traducteur de CV Français',
      description: 'Adaptez votre CV aux standards français',
      icon: FileText,
      color: 'bg-blue-500',
      category: 'CV',
      status: 'active',
      component: CVTranslatorTool
    },
    {
      id: 'salary_calculator',
      title: 'Calculateur Salaire Net',
      description: 'Convertissez brut en net et comprenez votre fiche de paie',
      icon: Calculator,
      color: 'bg-teal-500',
      category: 'Salaire',
      status: 'active',
      component: SalaryCalculatorTool
    },
    {
      id: 'motivation_letter',
      title: 'Générateur Lettres de Motivation',
      description: 'Créez des lettres de motivation percutantes',
      icon: FileText,
      color: 'bg-green-500',
      category: 'Candidature',
      status: 'active',
      component: MotivationLetterTool
    },
    {
      id: 'diploma_equivalence',
      title: 'Équivalence Diplômes Étrangers',
      description: 'Trouvez les équivalences de vos diplômes',
      icon: GraduationCap,
      color: 'bg-purple-500',
      category: 'Diplômes',
      status: 'active',
      component: DiplomaEquivalenceTool
    },
    {
      id: 'interview_assistant',
      title: 'Assistant Entretien d\'Embauche',
      description: 'Préparez vos entretiens efficacement',
      icon: Users,
      color: 'bg-indigo-500',
      category: 'Entretien',
      status: 'active',
      component: InterviewAssistantTool
    },
    {
      id: 'unemployment_simulator',
      title: 'Simulateur Droits Pôle Emploi',
      description: 'Calculez vos droits aux allocations',
      icon: Calculator,
      color: 'bg-orange-500',
      category: 'Droits',
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
            className="text-purple-600 hover:bg-purple-50"
          >
            ← Retour aux outils
          </Button>
          <div className="flex items-center gap-2">
            <activeTool.icon className="h-6 w-6 text-purple-600" />
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
            className="text-purple-600 hover:bg-purple-50"
          >
            ← Retour
          </Button>
          <Briefcase className="h-8 w-8 text-purple-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Emploi & Formation</h1>
            <p className="text-gray-600">8 outils pour votre carrière en France</p>
          </div>
        </div>

        {diagnostic && (
          <Card className="bg-purple-50 border-purple-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-purple-900">Recommandations personnalisées</span>
              </div>
              <p className="text-purple-800 text-sm">
                En tant que <strong>{userProfile?.title}</strong>, nous recommandons de commencer par 
                l'adaptation de votre CV puis la simulation de votre salaire net.
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
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
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

export default EmploiModule;
