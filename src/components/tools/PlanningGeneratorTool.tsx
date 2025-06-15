
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";

interface PlanningGeneratorToolProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}
const PlanningGeneratorTool: React.FC<PlanningGeneratorToolProps> = ({ onBack }) => (
  <div className="max-w-2xl mx-auto p-6 space-y-6">
    <Button variant="outline" onClick={onBack}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      Retour
    </Button>
    <h1 className="text-2xl font-bold flex items-center gap-2 mt-6">
      <Calendar className="h-7 w-7 text-gray-800" />
      Générateur Planning
    </h1>
    <p className="text-gray-600">
      🚧 Fonctionnalité à venir : planifier et organiser efficacement vos démarches en France.
    </p>
  </div>
);
export default PlanningGeneratorTool;
