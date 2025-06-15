
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Award } from "lucide-react";

interface NaturalizationTestSimulatorToolProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}

const NaturalizationTestSimulatorTool: React.FC<NaturalizationTestSimulatorToolProps> = ({ onBack }) => (
  <div className="max-w-2xl mx-auto p-6 space-y-6">
    <Button variant="outline" onClick={onBack}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      Retour
    </Button>
    <h1 className="text-2xl font-bold flex items-center gap-2 mt-6">
      <Award className="h-7 w-7 text-indigo-600" />
      Simulateur Test Naturalisation
    </h1>
    <p className="text-gray-600">
      🏗️ Fonctionnalité à venir : préparez-vous à l’entretien de naturalisation grâce à des simulations de questions officielles.
    </p>
  </div>
);

export default NaturalizationTestSimulatorTool;
