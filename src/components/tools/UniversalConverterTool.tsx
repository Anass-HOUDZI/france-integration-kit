
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calculator } from "lucide-react";

interface UniversalConverterToolProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}
const UniversalConverterTool: React.FC<UniversalConverterToolProps> = ({ onBack }) => (
  <div className="max-w-2xl mx-auto p-6 space-y-6">
    <Button variant="outline" onClick={onBack}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      Retour
    </Button>
    <h1 className="text-2xl font-bold flex items-center gap-2 mt-6">
      <Calculator className="h-7 w-7 text-gray-800" />
      Convertisseur Universel
    </h1>
    <p className="text-gray-600">
      🚧 Fonctionnalité à venir : convertisseur de monnaies, unités et autres formats utiles.
    </p>
  </div>
);
export default UniversalConverterTool;
