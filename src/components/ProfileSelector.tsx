
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Briefcase, Users, Heart, Globe, ChevronRight, ArrowLeft } from 'lucide-react';

interface ProfileSelectorProps {
  onProfileSelect: (profile: any) => void;
  onBack: () => void;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({ onProfileSelect, onBack }) => {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const profiles = [
    {
      id: 'etudiant',
      title: 'Étudiant International',
      description: 'Vous venez étudier en France',
      icon: GraduationCap,
      color: 'bg-blue-500',
      priorities: ['admin', 'logement', 'education', 'culture'],
      tools: ['Inscription université', 'Demande de logement étudiant', 'Ouverture compte bancaire']
    },
    {
      id: 'travailleur',
      title: 'Travailleur Qualifié',
      description: 'Vous avez un emploi ou cherchez du travail',
      icon: Briefcase,
      color: 'bg-green-500',
      priorities: ['emploi', 'admin', 'logement', 'sante'],
      tools: ['Recherche d\'emploi', 'Équivalence diplômes', 'Sécurité sociale']
    },
    {
      id: 'famille',
      title: 'Famille avec Enfants',
      description: 'Vous vous installez en famille',
      icon: Users,
      color: 'bg-purple-500',
      priorities: ['education', 'sante', 'logement', 'admin'],
      tools: ['Inscription scolaire', 'Allocations familiales', 'Pédiatre']
    },
    {
      id: 'refugie',
      title: 'Demandeur d\'Asile',
      description: 'Vous demandez une protection en France',
      icon: Heart,
      color: 'bg-red-500',
      priorities: ['admin', 'sante', 'logement', 'culture'],
      tools: ['OFPRA', 'Aide sociale', 'Hébergement d\'urgence']
    },
    {
      id: 'retraite',
      title: 'Retraité Européen',
      description: 'Vous prenez votre retraite en France',
      icon: Globe,
      color: 'bg-orange-500',
      priorities: ['sante', 'admin', 'logement', 'culture'],
      tools: ['Assurance maladie', 'Fiscalité', 'Services seniors']
    },
    {
      id: 'autre',
      title: 'Autre Situation',
      description: 'Votre profil ne correspond à aucune catégorie',
      icon: Globe,
      color: 'bg-gray-500',
      priorities: ['admin', 'logement', 'emploi', 'sante'],
      tools: ['Diagnostic personnalisé']
    }
  ];

  const handleContinue = () => {
    if (selectedProfile) {
      const profile = profiles.find(p => p.id === selectedProfile);
      onProfileSelect(profile);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4 text-blue-600 hover:bg-blue-50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Quel est votre profil ?
        </h2>
        <p className="text-gray-600 mb-8">
          Sélectionnez votre situation pour recevoir des recommandations personnalisées
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {profiles.map((profile) => (
          <Card 
            key={profile.id}
            className={`cursor-pointer transition-all duration-300 ${
              selectedProfile === profile.id 
                ? 'ring-2 ring-blue-500 shadow-lg scale-105' 
                : 'hover:shadow-md hover:scale-102'
            }`}
            onClick={() => setSelectedProfile(profile.id)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 ${profile.color} rounded-xl flex items-center justify-center`}>
                  <profile.icon className="h-6 w-6 text-white" />
                </div>
                {selectedProfile === profile.id && (
                  <Badge className="bg-blue-100 text-blue-800">
                    ✓ Sélectionné
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg">{profile.title}</CardTitle>
              <CardDescription>{profile.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Outils prioritaires :</p>
                <div className="flex flex-wrap gap-1">
                  {profile.tools.slice(0, 2).map((tool, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                  {profile.tools.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{profile.tools.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedProfile && (
        <div className="text-center">
          <Button 
            size="lg"
            onClick={handleContinue}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3"
          >
            Continuer avec ce profil
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileSelector;
