
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, FileText, Calculator, Users, GraduationCap, Clock, AlertCircle, TrendingUp, Mail, LayoutGrid } from 'lucide-react';
import CVTranslatorTool from '@/components/tools/CVTranslatorTool';
import SalaryCalculatorTool from '@/components/tools/SalaryCalculatorTool';
import MotivationLetterTool from '@/components/tools/MotivationLetterTool';
import InterviewAssistantTool from '@/components/tools/InterviewAssistantTool';
import DiplomaEquivalenceTool from '@/components/tools/DiplomaEquivalenceTool';
import UnemploymentSimulatorTool from '@/components/tools/UnemploymentSimulatorTool';

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
      description: 'Adaptez votre CV aux standards français avec IA',
      icon: FileText,
      color: 'bg-blue-500',
      category: 'CV',
      status: 'active',
      component: CVTranslatorTool
    },
    {
      id: 'salary_calculator',
      title: 'Calculateur Salaire Net',
      description: 'Convertissez brut en net, charges sociales et prélèvements détaillés',
      icon: Calculator,
      color: 'bg-teal-500',
      category: 'Salaire',
      status: 'active',
      component: SalaryCalculatorTool
    },
    {
      id: 'unemployment_simulator',
      title: 'Simulateur Droits Pôle Emploi',
      description: 'Calculez vos droits aux allocations chômage et conditions',
      icon: TrendingUp,
      color: 'bg-orange-500',
      category: 'Droits',
      status: 'active',
      component: UnemploymentSimulatorTool
    },
    {
      id: 'motivation_letter',
      title: 'Générateur Lettres de Motivation',
      description: 'Créez des lettres de motivation percutantes par secteur',
      icon: Mail,
      color: 'bg-green-500',
      category: 'Candidature',
      status: 'active',
      component: MotivationLetterTool
    },
    {
      id: 'diploma_equivalence',
      title: 'Équivalence Diplômes Étrangers',
      description: 'Trouvez les équivalences officielles de vos diplômes',
      icon: GraduationCap,
      color: 'bg-purple-500',
      category: 'Diplômes',
      status: 'active',
      component: DiplomaEquivalenceTool
    },
    {
      id: 'interview_assistant',
      title: 'Assistant Entretien d\'Embauche',
      description: 'Préparez vos entretiens avec simulation et conseils',
      icon: Users,
      color: 'bg-indigo-500',
      category: 'Entretien',
      status: 'active',
      component: InterviewAssistantTool
    },
    {
      id: 'training_guide',
      title: 'Guide Formation Professionnelle',
      description: 'CPF, formations éligibles et financement',
      icon: GraduationCap,
      color: 'bg-pink-500',
      category: 'Formation',
      status: 'coming_soon'
    },
    {
      id: 'portfolio_creator',
      title: 'Créateur Portfolio Professionnel',
      description: 'Mettez en valeur vos compétences et projets',
      icon: LayoutGrid,
      color: 'bg-cyan-500',
      category: 'Portfolio',
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
            <p className="text-gray-600">8 outils IA pour votre carrière en France</p>
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
                l'adaptation de votre CV puis la simulation de votre salaire net et vos droits Pôle Emploi.
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
                ? 'hover:shadow-lg cursor-pointer hover:scale-105' 
                : 'opacity-75'
            }`}
            onClick={() => tool.status === 'active' && setActiveTab(tool.id)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center shadow-lg`}>
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
              <CardTitle className="text-lg leading-tight">{tool.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4 leading-relaxed">
                {tool.description}
              </CardDescription>
              
              {tool.status === 'active' ? (
                <Button className="w-full bg-purple-600 hover:bg-purple-700 transition-all duration-200">
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

      <div className="mt-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Pourquoi ces outils ?</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <h4 className="font-medium mb-2">🎯 Recherche d'emploi optimisée</h4>
            <p>CV adapté aux standards français, lettres de motivation personnalisées et préparation d'entretiens.</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">💰 Transparence salariale</h4>
            <p>Comprenez votre fiche de paie, négociez en connaissance de cause et simulez vos droits.</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">🎓 Reconnaissance de compétences</h4>
            <p>Faites reconnaître vos diplômes étrangers et accédez aux formations professionnelles.</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">🤖 Intelligence artificielle</h4>
            <p>Tous nos outils utilisent l'IA pour des résultats personnalisés et actualisés.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmploiModule;
