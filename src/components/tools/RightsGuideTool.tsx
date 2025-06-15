
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";

interface RightsGuideToolProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}
const RightsGuideTool: React.FC<RightsGuideToolProps> = ({ onBack }) => (
  <div className="max-w-2xl mx-auto p-6 space-y-6">
    <Button variant="outline" onClick={onBack}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      Retour
    </Button>
    <h1 className="text-2xl font-bold flex items-center gap-2 mt-6">
      <FileText className="h-7 w-7 text-gray-800" />
      Guide Droits & Recours
    </h1>
    <p className="text-gray-600">
      🚧 Fonctionnalité à venir : connaître vos droits et les démarches possibles en cas de souci.
    </p>
  </div>
);
export default RightsGuideTool;
