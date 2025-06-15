
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Globe } from "lucide-react";

interface CultureQuizToolProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}

const CultureQuizTool: React.FC<CultureQuizToolProps> = ({ onBack }) => (
  <div className="max-w-2xl mx-auto p-6 space-y-6">
    <Button variant="outline" onClick={onBack}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      Retour
    </Button>
    <h1 className="text-2xl font-bold flex items-center gap-2 mt-6">
      <Globe className="h-7 w-7 text-indigo-600" />
      Quiz Culture Française
    </h1>
    <p className="text-gray-600">
      🏗️ Fonctionnalité à venir : bientôt vous pourrez tester vos connaissances sur la culture, l’histoire et les valeurs françaises à travers des quiz interactifs.
    </p>
  </div>
);

export default CultureQuizTool;
