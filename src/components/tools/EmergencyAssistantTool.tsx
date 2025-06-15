
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PhoneCall } from "lucide-react";

interface EmergencyAssistantToolProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}
const EmergencyAssistantTool: React.FC<EmergencyAssistantToolProps> = ({ onBack }) => (
  <div className="max-w-2xl mx-auto p-6 space-y-6">
    <Button variant="outline" onClick={onBack}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      Retour
    </Button>
    <h1 className="text-2xl font-bold flex items-center gap-2 mt-6">
      <PhoneCall className="h-7 w-7 text-gray-800" />
      Assistant Urgences
    </h1>
    <p className="text-gray-600">
      🚧 Fonctionnalité à venir : numéros d’urgence et conseils en cas de situation critique.
    </p>
  </div>
);
export default EmergencyAssistantTool;
