
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, CheckSquare, Clock, Users, FileText, AlertCircle } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';

interface MovingPlannerProps {
  userProfile: any;
  diagnostic: any;
}

const MovingPlannerTool: React.FC<MovingPlannerProps> = ({ userProfile }) => {
  const { saveToolData } = useUserProfile();
  const [movingDate, setMovingDate] = useState('');
  const [hasKids, setHasKids] = useState(false);
  const [hasPets, setHasPets] = useState(false);
  const [isLongDistance, setIsLongDistance] = useState(false);
  const [checklist, setChecklist] = useState<any>(null);

  const generateChecklist = () => {
    const baseTimeline = [
      {
        period: '8 semaines avant',
        color: 'bg-red-500',
        tasks: [
          'Rechercher et réserver déménageurs',
          'Demander devis assurance déménagement',
          'Prévoir congés pour le déménagement',
          'Commencer à trier les affaires'
        ]
      },
      {
        period: '6 semaines avant',
        color: 'bg-orange-500',
        tasks: [
          'Résilier contrats actuels (internet, électricité)',
          'Souscrire contrats nouveau logement',
          'Organiser changement d\'adresse',
          'Commander cartons et matériel'
        ]
      },
      {
        period: '4 semaines avant',
        color: 'bg-yellow-500',
        tasks: [
          'Prévenir employeur, banque, assurances',
          'Transférer dossiers médicaux',
          'Organiser garde d\'enfants jour J',
          'Commencer emballage non-essentiel'
        ]
      },
      {
        period: '2 semaines avant',
        color: 'bg-blue-500',
        tasks: [
          'Confirmer rendez-vous déménageurs',
          'Finaliser état des lieux sortant',
          'Préparer kit de survie premier jour',
          'Emballer affaires fragiles'
        ]
      },
      {
        period: 'Semaine du déménagement',
        color: 'bg-green-500',
        tasks: [
          'Emballer dernières affaires',
          'Nettoyer ancien logement',
          'Préparer trousse de première nécessité',
          'Vérifier accès nouveau logement'
        ]
      }
    ];

    // Adaptations selon profil
    let adaptedTimeline = [...baseTimeline];

    if (hasKids) {
      adaptedTimeline[2].tasks.push('Inscrire enfants nouvelle école');
      adaptedTimeline[2].tasks.push('Transférer dossiers scolaires');
      adaptedTimeline[1].tasks.push('Organiser activités enfants');
    }

    if (hasPets) {
      adaptedTimeline[3].tasks.push('Préparer transport animaux');
      adaptedTimeline[2].tasks.push('Transférer dossiers vétérinaires');
      adaptedTimeline[1].tasks.push('Rechercher vétérinaire destination');
    }

    if (isLongDistance) {
      adaptedTimeline[0].tasks.push('Réserver hébergement temporaire');
      adaptedTimeline[1].tasks.push('Organiser transport véhicule');
      adaptedTimeline[2].tasks.push('Planifier voyage avec étapes');
    }

    const administrativeTasks = [
      'CAF - Changement d\'adresse',
      'Pôle Emploi - Mise à jour situation',
      'CPAM - Transfert dossier médical',
      'Impôts - Changement domicile fiscal',
      'Préfecture - Mise à jour carte grise',
      'Banque - Changement d\'adresse',
      'Assurances - Transfert contrats',
      'Mutuelle - Mise à jour',
      'La Poste - Suivre courrier',
      'Fournisseurs énergie - Résiliation/souscription'
    ];

    const movingDayChecklist = [
      'Lever tôt et petit-déjeuner consistant',
      'Vérifier matériel déménageurs',
      'Faire tour propriétaire ancien logement',
      'Superviser chargement',
      'Nettoyer ancien logement',
      'Faire état des lieux sortant',
      'Remettre clés ancien propriétaire',
      'Accueillir déménageurs nouveau logement',
      'Vérifier déchargement',
      'Faire état des lieux entrant',
      'Installer première nécessité'
    ];

    setChecklist({
      timeline: adaptedTimeline,
      administrative: administrativeTasks,
      movingDay: movingDayChecklist,
      movingDate
    });

    saveToolData('moving_planner', {
      movingDate,
      hasKids,
      hasPets,
      isLongDistance,
      timeline: adaptedTimeline,
      createdAt: new Date().toISOString()
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Planificateur d'Emménagement
        </h1>
        <p className="text-lg text-gray-600">
          Organisez votre déménagement étape par étape sans rien oublier
        </p>
      </div>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Configuration de votre déménagement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="movingDate">Date prévue du déménagement</Label>
            <Input
              id="movingDate"
              type="date"
              value={movingDate}
              onChange={(e) => setMovingDate(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">Votre situation</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="kids" 
                  checked={hasKids}
                  onCheckedChange={(checked) => setHasKids(checked === true)}
                />
                <Label htmlFor="kids">Avec enfants</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="pets" 
                  checked={hasPets}
                  onCheckedChange={(checked) => setHasPets(checked === true)}
                />
                <Label htmlFor="pets">Avec animaux</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="longDistance" 
                  checked={isLongDistance}
                  onCheckedChange={(checked) => setIsLongDistance(checked === true)}
                />
                <Label htmlFor="longDistance">Longue distance</Label>
              </div>
            </div>
          </div>

          <Button 
            onClick={generateChecklist}
            disabled={!movingDate}
            className="w-full"
          >
            <CheckSquare className="mr-2 h-4 w-4" />
            Générer mon planning personnalisé
          </Button>
        </CardContent>
      </Card>

      {/* Timeline */}
      {checklist && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Timeline de préparation
              </CardTitle>
              <CardDescription>
                Planning personnalisé pour un déménagement le {new Date(movingDate).toLocaleDateString('fr-FR')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {checklist.timeline.map((period: any, index: number) => (
                  <div key={period.period} className="flex gap-4">
                    <div className={`w-4 h-4 ${period.color} rounded-full mt-1 flex-shrink-0`}></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{period.period}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {period.tasks.map((task: string, taskIndex: number) => (
                          <div key={taskIndex} className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                            <CheckSquare className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Démarches administratives */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Démarches administratives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {checklist.administrative.map((task: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                    <CheckSquare className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">{task}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Jour J */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Checklist jour J
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {checklist.movingDay.map((task: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="text-sm">{task}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MovingPlannerTool;
