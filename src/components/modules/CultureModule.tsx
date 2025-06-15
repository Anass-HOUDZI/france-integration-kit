
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Globe, BookOpen, Heart, Award } from "lucide-react";
import CultureQuizTool from "@/components/tools/CultureQuizTool";
import FrenchLearningAssistantTool from "@/components/tools/FrenchLearningAssistantTool";
import TraditionsGuideTool from "@/components/tools/TraditionsGuideTool";
import NaturalizationTestSimulatorTool from "@/components/tools/NaturalizationTestSimulatorTool";
import ExpressionsTranslatorTool from "@/components/tools/ExpressionsTranslatorTool";

interface CultureModuleProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}

const tools = [
  {
    id: "culture_quiz",
    title: "Quiz Culture Française",
    description: "Testez vos connaissances civiques",
    icon: Globe,
    component: CultureQuizTool,
  },
  {
    id: "french_assistant",
    title: "Assistant Apprentissage Français",
    description: "Exercices et progression par niveau",
    icon: BookOpen,
    component: FrenchLearningAssistantTool,
  },
  {
    id: "traditions_guide",
    title: "Guide Fêtes et Traditions",
    description: "Découvrez le calendrier culturel",
    icon: Heart,
    component: TraditionsGuideTool,
  },
  {
    id: "naturalization_test",
    title: "Simulateur Test Naturalisation",
    description: "Préparez l’entretien citoyen",
    icon: Award,
    component: NaturalizationTestSimulatorTool,
  },
  {
    id: "expressions_translator",
    title: "Traducteur Expressions Françaises",
    description: "Comprenez les idiomes français",
    icon: Globe,
    component: ExpressionsTranslatorTool,
  }
];

const CultureModule: React.FC<CultureModuleProps> = ({ userProfile, diagnostic, onBack }) => {
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
              Intégration Culturelle
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Découvrir la culture française (5 outils)
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
                    <div className="p-2 rounded-lg bg-indigo-500 text-white">
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

export default CultureModule;
