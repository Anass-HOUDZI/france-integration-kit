
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Phone, PhoneCall, Heart, Shield, Users, AlertTriangle } from "lucide-react";
import { useI18n } from '@/hooks/useI18n';

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

const EmergencyAssistantTool: React.FC<EmergencyAssistantToolProps> = ({ onBack }) => {
  const [infoOpen, setInfoOpen] = useState<string | null>(null);
  const { t } = useI18n();

  const EMERGENCY_SERVICES: Service[] = [
    {
      number: "15",
      name: t('emergency.samu'),
      description: t('emergency.samu_desc'),
      color: "bg-red-500",
      icon: Heart,
      profile: "Médical",
      when: t('emergency.samu_when'),
    },
    {
      number: "18",
      name: t('emergency.pompiers'),
      description: t('emergency.pompiers_desc'),
      color: "bg-orange-500",
      icon: Shield,
      profile: "Secours",
      when: t('emergency.pompiers_when'),
    },
    {
      number: "17",
      name: t('emergency.police'),
      description: t('emergency.police_desc'),
      color: "bg-blue-500",
      icon: Shield,
      profile: "Sécurité",
      when: t('emergency.police_when'),
    },
    {
      number: "112",
      name: t('emergency.european'),
      description: t('emergency.european_desc'),
      color: "bg-purple-600",
      icon: PhoneCall,
      profile: "Général",
      when: t('emergency.european_when'),
    },
    {
      number: "115",
      name: t('emergency.social'),
      description: t('emergency.social_desc'),
      color: "bg-green-600",
      icon: Users,
      profile: "Social",
      when: t('emergency.social_when'),
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Button variant="outline" onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t('common.back')}
      </Button>
      <h1 className="text-2xl font-bold flex items-center gap-2 mt-6">
        <PhoneCall className="h-7 w-7 text-gray-800" />
        {t('emergency.title')}
      </h1>
      <p className="text-gray-600">{t('emergency.description')}</p>

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
                  <b>{t('emergency.european_when')} :</b> {service.when}
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
                    {t('emergency.call')} {service.number}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setInfoOpen(infoOpen === service.number ? null : service.number)}
                  >
                    {infoOpen === service.number ? t('emergency.hide') : t('emergency.info')}
                  </Button>
                </div>
                {infoOpen === service.number && (
                  <div className="mt-3 p-3 bg-gray-50 border rounded text-gray-700 text-sm animate-fade-in">
                    <b>{t('emergency.advice_title')}</b>
                    <ul className="list-disc ml-5 mt-1">
                      <li>{t('emergency.advice_1')}</li>
                      <li>{t('emergency.advice_2')}</li>
                      <li>{t('emergency.advice_3')}</li>
                      <li>{t('emergency.advice_4')}</li>
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
              <h2 className="font-semibold">{t('emergency.vital_title')}</h2>
            </div>
          </CardHeader>
          <CardContent className="text-sm text-gray-700">
            {t('emergency.vital_desc')}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmergencyAssistantTool;
