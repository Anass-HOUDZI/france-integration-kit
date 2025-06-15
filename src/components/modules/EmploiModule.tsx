import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, FileText, Calculator, GraduationCap, Users, AlertCircle, Clock, Target } from 'lucide-react';
import CVTranslator from '@/components/tools/CVTranslator';
import SalaryCalculator from '@/components/tools/SalaryCalculator';

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
      title: 'Traducteur CV Français',
      description: 'Adaptez votre CV aux standards français',
      icon: FileText,
      color: 'bg-purple-500',
      category: 'Documents',
      status: 'active',
      component: CVTranslator
    },
    {
      id: 'salary_calculator',
      title: 'Calculateur Salaire Net',
      description: 'Calculez votre salaire net selon les charges françaises',
      icon: Calculator,
      color: 'bg-green-500',
      category: 'Finance',
      status: 'active',
      component: SalaryCalculator
    },
    {
      id: 'cover_letter',
      title: 'Générateur Lettres de Motivation',
      description: 'Créez des lettres de motivation personnalisées',
      icon: FileText,
      color: 'bg-blue-500',
      category: 'Documents',
      status: 'coming_soon'
    },
    {
      id: 'diploma_equivalence',
      title: 'Guide Équivalence Diplômes',
      description: 'Trouvez l\'équivalence de vos diplômes étrangers',
      icon: GraduationCap,
      color: 'bg-orange-500',
      category: 'Formation',
      status: 'coming_soon'
    },
    {
      id: 'job_search',
      title: 'Assistant Recherche d\'Emploi',
      description: 'Stratégies et conseils pour votre recherche',
      icon: Target,
      color: 'bg-indigo-500',
      category: 'Recherche',
      status: 'coming_soon'
    },
    {
      id: 'network_builder',
      title: 'Constructeur de Réseau',
      description: 'Développez votre réseau professionnel en France',
      icon: Users,
      color: 'bg-teal-500',
      category: 'Réseau',
      status: 'coming_soon'
    }
  ];

  const categories = [
    { id: 'all', label: 'Tous les outils', count: tools.length },
    { id: 'Documents', label: 'Documents', count: tools.filter(t => t.category === 'Documents').length },
    { id: 'Finance', label: 'Finance', count: tools.filter(t => t.category === 'Finance').length },
    { id: 'Formation', label: 'Formation', count: tools.filter(t => t.category === 'Formation').length }
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
            <p className="text-gray-600">8 outils pour votre carrière professionnelle en France</p>
          </div>
        </div>

        {diagnostic && (
          <Card className="bg-purple-50 border-purple-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-purple-900">Stratégie recommandée</span>
              </div>
              <p className="text-purple-800 text-sm">
                Pour maximiser vos chances sur le marché français, commencez par adapter votre CV 
                aux standards locaux puis estimez vos revenus potentiels.
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
