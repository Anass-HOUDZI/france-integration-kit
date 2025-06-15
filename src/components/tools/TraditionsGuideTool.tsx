
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart } from "lucide-react";

interface TraditionsGuideToolProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}

const TraditionsGuideTool: React.FC<TraditionsGuideToolProps> = ({ onBack }) => (
  <div className="max-w-2xl mx-auto p-6 space-y-6">
    <Button variant="outline" onClick={onBack}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      Retour
    </Button>
    <h1 className="text-2xl font-bold flex items-center gap-2 mt-6">
      <Heart className="h-7 w-7 text-indigo-600" />
      Guide Fêtes et Traditions
    </h1>
    <p className="text-gray-600">
      🏗️ Fonctionnalité à venir : découvrez le calendrier des fêtes, coutumes, traditions et événements importants en France.
    </p>
  </div>
);

export default TraditionsGuideTool;
