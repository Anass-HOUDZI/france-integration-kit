import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, Calendar, PiggyBank, Calculator, Siren, Gavel } from "lucide-react";
import UniversalConverterTool from "@/components/tools/UniversalConverterTool";
import EmergencyAssistantTool from "@/components/tools/EmergencyAssistantTool";
import PlanningGeneratorTool from "@/components/tools/PlanningGeneratorTool";
import BudgetAssistantTool from "@/components/tools/BudgetAssistantTool";
import RightsGuideTool from "@/components/tools/RightsGuideTool";

interface TransversalModuleProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}

const tools = [
  {
    id: "universal_converter",
    title: "Convertisseur Universel",
    description: "Monnaies, unités et formats",
    icon: Calculator,
    component: UniversalConverterTool,
  },
  {
    id: "emergency_assistant",
    title: "Assistant Urgences",
    description: "Numéros utiles et procédures",
    icon: Siren,
    component: EmergencyAssistantTool,
  },
  {
    id: "planning_generator",
    title: "Générateur Planning",
    description: "Organisation de vos démarches",
    icon: Calendar,
    component: PlanningGeneratorTool,
  },
  {
    id: "budget_assistant",
    title: "Assistant Budget Familial",
    description: "Gestion des finances",
    icon: PiggyBank,
    component: BudgetAssistantTool,
  },
  {
    id: "rights_guide",
    title: "Guide Droits et Recours",
    description: "Informations juridiques",
    icon: Gavel,
    component: RightsGuideTool,
  }
];

const TransversalModule: React.FC<TransversalModuleProps> = ({ userProfile, diagnostic, onBack }) => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  if (selectedTool) {
    const tool = tools.find((t) => t.id === selectedTool);
    if (tool && tool.component) {
      const ToolComponent = tool.component;
      return (
        <ToolComponent userProfile={userProfile} diagnostic={diagnostic} onBack={() => setSelectedTool(null)} />
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
              Outils Transversaux
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Outils d'aide générale (5 outils)
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
                    <div className="p-2 rounded-lg bg-gray-500 text-white">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <Badge className="bg-green-100 text-green-800">Fonctionnel</Badge>
                  </div>
                  <CardTitle className="text-lg">{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={() => setSelectedTool(tool.id)}>
                    Accéder
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

export default TransversalModule;
