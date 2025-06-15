
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Phone, PhoneCall, Heart, Shield, Users, AlertTriangle } from "lucide-react";

interface EmergencyAssistantToolProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}

type Service = {
  number: string;
  name: string;
  description: string;
  color: string;
  icon: React.ElementType;
  profile: string;
  when: string;
};

const EMERGENCY_SERVICES: Service[] = [
  {
    number: "15",
    name: "SAMU",
    description: "Urgences médicales graves (blessure, malaise, douleur violente...).",
    color: "bg-red-500",
    icon: Heart,
    profile: "Médical",
    when: "Malaise, blessure, fièvre élevée, coma...",
  },
  {
    number: "18",
    name: "Pompiers",
    description: "Secours, incendie, accidents de la route, noyade, fuite de gaz...",
    color: "bg-orange-500",
    icon: Shield,
    profile: "Secours",
    when: "Incendie, accident, personne bloquée, fuite de gaz...",
  },
  {
    number: "17",
    name: "Police / Gendarmerie",
    description: "Urgences sécurité : agression, vol, violence, danger.",
    color: "bg-blue-500",
    icon: Shield,
    profile: "Sécurité",
    when: "Agression, cambriolage, violences...",
  },
  {
    number: "112",
    name: "Numéro Européen",
    description: "Pour toutes urgences, partout en Europe.",
    color: "bg-purple-600",
    icon: PhoneCall,
    profile: "Général",
    when: "Si vous ne savez pas qui appeler",
  },
  {
    number: "115",
    name: "SAMU Social",
    description: "Aide et hébergement d'urgence, personnes sans abri.",
    color: "bg-green-600",
    icon: Users,
    profile: "Social",
    when: "Personne à la rue, détresse sociale...",
  },
];

const EmergencyAssistantTool: React.FC<EmergencyAssistantToolProps> = ({ onBack }) => {
  const [infoOpen, setInfoOpen] = useState<string | null>(null);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Button variant="outline" onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour
      </Button>
      <h1 className="text-2xl font-bold flex items-center gap-2 mt-6">
        <PhoneCall className="h-7 w-7 text-gray-800" />
        Assistant urgences : les numéros utiles
      </h1>
      <p className="text-gray-600">Cliquez sur un numéro d'urgence pour plus d'informations ou pour appeler directement.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {EMERGENCY_SERVICES.map(service => {
          const Icon = service.icon;
          return (
            <Card key={service.number} className="relative group">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className={`rounded-lg p-3 ${service.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <Badge className="ml-auto">{service.profile}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm text-gray-700">{service.description}</div>
                <div className="text-xs text-gray-500">
                  <b>Quand appeler ?</b> {service.when}
                </div>
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    className={`${service.color} text-white`}
                    onClick={() => {
                      if (typeof window !== "undefined") window.open(`tel:${service.number}`, "_self");
                    }}
                  >
                    <Phone className="mr-1 w-4 h-4" />
                    Appeler {service.number}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setInfoOpen(infoOpen === service.number ? null : service.number)}
                  >
                    {infoOpen === service.number ? "Masquer" : "Infos"}
                  </Button>
                </div>
                {infoOpen === service.number && (
                  <div className="mt-3 p-3 bg-gray-50 border rounded text-gray-700 text-sm animate-fade-in">
                    <b>Conseils lors de l'appel :</b>
                    <ul className="list-disc ml-5 mt-1">
                      <li>Indiquez votre nom et votre numéro de téléphone.</li>
                      <li>Donnez l'adresse exacte (+ étage, code, interphone...)</li>
                      <li>Expliquez brièvement le problème et l'état des personnes.</li>
                      <li>Ne raccrochez pas tant qu'on ne vous l'a pas dit.</li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="mt-8">
        <Card className="bg-yellow-50 border-yellow-300">
          <CardHeader>
            <div className="flex items-center gap-2 text-yellow-700">
              <AlertTriangle className="h-5 w-5" />
              <h2 className="font-semibold">Urgence vitale : restez calme, agissez vite !</h2>
            </div>
          </CardHeader>
          <CardContent className="text-sm text-gray-700">
            Ne paniquez pas, protégez la zone, alertez un service adapté et secourez si possible.<br />
            Vous avez droit à une assistance même sans papiers. Tous les appels sont gratuits, depuis mobiles et cabines.
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmergencyAssistantTool;
