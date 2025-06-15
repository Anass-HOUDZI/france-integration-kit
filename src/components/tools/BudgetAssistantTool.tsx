
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PiggyBank } from "lucide-react";

interface BudgetAssistantToolProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}
const BudgetAssistantTool: React.FC<BudgetAssistantToolProps> = ({ onBack }) => (
  <div className="max-w-2xl mx-auto p-6 space-y-6">
    <Button variant="outline" onClick={onBack}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      Retour
    </Button>
    <h1 className="text-2xl font-bold flex items-center gap-2 mt-6">
      <PiggyBank className="h-7 w-7 text-gray-800" />
      Assistant Budget Familial
    </h1>
    <p className="text-gray-600">
      🚧 Fonctionnalité à venir : outil de gestion des finances et simulation de budget familial.
    </p>
  </div>
);
export default BudgetAssistantTool;
