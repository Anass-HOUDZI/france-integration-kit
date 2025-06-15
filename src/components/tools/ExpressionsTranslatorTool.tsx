
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Globe } from "lucide-react";

interface ExpressionsTranslatorToolProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}

const ExpressionsTranslatorTool: React.FC<ExpressionsTranslatorToolProps> = ({ onBack }) => (
  <div className="max-w-2xl mx-auto p-6 space-y-6">
    <Button variant="outline" onClick={onBack}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      Retour
    </Button>
    <h1 className="text-2xl font-bold flex items-center gap-2 mt-6">
      <Globe className="h-7 w-7 text-indigo-600" />
      Traducteur Expressions Françaises
    </h1>
    <p className="text-gray-600">
      🏗️ Fonctionnalité à venir : bientôt, cherchez la signification et la traduction des expressions idiomatiques françaises et leur contexte d’utilisation.
    </p>
  </div>
);

export default ExpressionsTranslatorTool;
