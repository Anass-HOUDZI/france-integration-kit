
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";

interface FrenchLearningAssistantToolProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}
const FrenchLearningAssistantTool: React.FC<FrenchLearningAssistantToolProps> = ({ onBack }) => (
  <div className="max-w-2xl mx-auto p-6 space-y-6">
    <Button variant="outline" onClick={onBack}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      Retour
    </Button>
    <h1 className="text-2xl font-bold flex items-center gap-2 mt-6">
      <BookOpen className="h-7 w-7 text-indigo-600" />
      Assistant Apprentissage Français
    </h1>
    <p className="text-gray-600">🚧 Fonctionnalité à venir : assistant pour progresser en français (exercices, vocabulaire, conseils).</p>
  </div>
);
export default FrenchLearningAssistantTool;
