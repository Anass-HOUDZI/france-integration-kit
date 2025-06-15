
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, GraduationCap, Calculator, Users, BookOpen, Globe, PiggyBank } from 'lucide-react';
import SchoolEnrollmentTool from '@/components/tools/SchoolEnrollmentTool';
import FamilyAllowancesTool from '@/components/tools/FamilyAllowancesTool';
import ChildcareAssistantTool from '@/components/tools/ChildcareAssistantTool';
import HigherEducationTool from '@/components/tools/HigherEducationTool';
import ReportTranslatorTool from '@/components/tools/ReportTranslatorTool';
import EducationCostsTool from '@/components/tools/EducationCostsTool';

interface EducationModuleProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}

const EducationModule: React.FC<EducationModuleProps> = ({ userProfile, diagnostic, onBack }) => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const tools = [
    {
      id: 'school_enrollment',
      title: 'Guide Inscription Scolaire',
      description: 'Procédures d\'inscription de l\'école primaire au lycée',
      icon: GraduationCap,
      component: SchoolEnrollmentTool,
      status: 'active'
    },
    {
      id: 'family_allowances',
      title: 'Calculateur Allocations Familiales',
      description: 'Simulation des allocations selon vos revenus',
      icon: Calculator,
      component: FamilyAllowancesTool,
      status: 'active'
    },
    {
      id: 'childcare_assistant',
      title: 'Assistant Garde d\'Enfants',
      description: 'Modes de garde et aides financières disponibles',
      icon: Users,
      component: ChildcareAssistantTool,
      status: 'active'
    },
    {
      id: 'higher_education',
      title: 'Guide Études Supérieures',
      description: 'Inscription université, BTS, écoles',
      icon: BookOpen,
      component: HigherEducationTool,
      status: 'active'
    },
    {
      id: 'report_translator',
      title: 'Traducteur Bulletins Scolaires',
      description: 'Conversion notes et appréciations',
      icon: Globe,
      component: ReportTranslatorTool,
      status: 'active'
    },
    {
      id: 'education_costs',
      title: 'Calculateur Frais Scolarité',
      description: 'Bourses et aides étudiantes disponibles',
      icon: PiggyBank,
      component: EducationCostsTool,
      status: 'active'
    }
  ];

  if (selectedTool) {
    const tool = tools.find(t => t.id === selectedTool);
    if (tool && tool.component) {
      const ToolComponent = tool.component;
      return (
        <ToolComponent 
          userProfile={userProfile}
          diagnostic={diagnostic}
          onBack={() => setSelectedTool(null)}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux modules
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Éducation & Famille
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Scolarité et vie de famille en France
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-yellow-500 text-white">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Disponible
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full"
                    onClick={() => setSelectedTool(tool.id)}
                  >
                    Utiliser l'outil
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EducationModule;
