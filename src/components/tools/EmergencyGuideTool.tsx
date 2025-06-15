
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, Heart, AlertTriangle, Shield, Clock, MapPin, Users, FileText } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';

interface EmergencyGuideProps {
  userProfile: any;
  diagnostic: any;
}

const EmergencyGuideTool: React.FC<EmergencyGuideProps> = ({ userProfile }) => {
  const { saveToolData } = useUserProfile();
  const [activeEmergency, setActiveEmergency] = useState<string | null>(null);

  const emergencyNumbers = [
    {
      number: '15',
      service: 'SAMU',
      description: 'Urgences médicales',
      when: 'Malaise, accident grave, douleur intense',
      color: 'bg-red-500',
      icon: Heart,
      priority: 'vital'
    },
    {
      number: '18',
      service: 'Pompiers',
      description: 'Secours d\'urgence',
      when: 'Incendie, accident, personne en danger',
      color: 'bg-orange-500',
      icon: Shield,
      priority: 'urgent'
    },
    {
      number: '17',
      service: 'Police/Gendarmerie',
      description: 'Urgences sécuritaires',
      when: 'Agression, vol, violence, trouble à l\'ordre public',
      color: 'bg-blue-500',
      icon: Shield,
      priority: 'urgent'
    },
    {
      number: '112',
      service: 'Numéro européen',
      description: 'Toutes urgences',
      when: 'Si vous ne savez pas qui appeler',
      color: 'bg-purple-500',
      icon: Phone,
      priority: 'general'
    },
    {
      number: '115',
      service: 'SAMU Social',
      description: 'Urgence sociale',
      when: 'Personne en détresse, sans abri',
      color: 'bg-green-500',
      icon: Users,
      priority: 'social'
    },
    {
      number: '196',
      service: 'Urgence maritime',
      description: 'Secours en mer',
      when: 'Accident en mer, naufrage',
      color: 'bg-cyan-500',
      icon: Shield,
      priority: 'specific'
    }
  ];

  const healthEmergencies = [
    {
      situation: 'Arrêt cardiaque',
      symptoms: ['Perte de conscience', 'Absence de respiration', 'Absence de pouls'],
      actions: [
        'Appelez immédiatement le 15',
        'Commencez la réanimation cardio-pulmonaire',
        'Utilisez un défibrillateur si disponible',
        'Continuez jusqu\'à l\'arrivée des secours'
      ],
      donts: ['Ne pas déplacer la personne', 'Ne pas donner à boire']
    },
    {
      situation: 'AVC (Accident Vasculaire Cérébral)',
      symptoms: ['Paralysie du visage', 'Faiblesse d\'un membre', 'Troubles de la parole'],
      actions: [
        'Appelez le 15 immédiatement',
        'Notez l\'heure des premiers symptômes',
        'Installez la personne en position demi-assise',
        'Ne donnez rien à boire ni à manger'
      ],
      donts: ['Ne pas donner de médicaments', 'Ne pas laisser seule la personne']
    },
    {
      situation: 'Crise d\'asthme sévère',
      symptoms: ['Difficulté respiratoire majeure', 'Impossibilité de parler', 'Cyanose'],
      actions: [
        'Appelez le 15',
        'Aidez à utiliser l\'inhalateur',
        'Installez en position assise',
        'Rassurez et calmez'
      ],
      donts: ['Ne pas allonger', 'Ne pas laisser seul']
    },
    {
      situation: 'Hémorragie importante',
      symptoms: ['Saignement abondant', 'Pâleur', 'Faiblesse'],
      actions: [
        'Appelez le 15',
        'Comprimez la plaie avec un linge propre',
        'Surélevez le membre si possible',
        'Surveillez les signes vitaux'
      ],
      donts: ['Ne pas retirer l\'objet enfoncé', 'Ne pas utiliser de garrot sauf formation']
    }
  ];

  const preparednessChecklist = [
    {
      category: 'Informations personnelles',
      items: [
        'Carte d\'identité ou passeport',
        'Carte Vitale et mutuelle',
        'Ordonnances en cours',
        'Contacts d\'urgence dans votre téléphone',
        'Groupe sanguin et allergies connues'
      ]
    },
    {
      category: 'Trousse de premiers secours',
      items: [
        'Pansements et bandages',
        'Désinfectant',
        'Paracétamol/Ibuprofène',
        'Thermomètre',
        'Ciseaux et épingles de sûreté'
      ]
    },
    {
      category: 'Pharmacie personnelle',
      items: [
        'Médicaments habituels (15 jours minimum)',
        'Médicaments d\'urgence (inhalateur, insuline...)',
        'Copies des ordonnances',
        'Carnet de santé ou dossier médical',
        'Lunettes de secours'
      ]
    },
    {
      category: 'Kit d\'urgence',
      items: [
        'Lampe de poche et piles',
        'Radio portable',
        'Eau (1 litre/personne/jour pour 3 jours)',
        'Nourriture non périssable (3 jours)',
        'Couvertures de survie'
      ]
    }
  ];

  const callEmergency = (number: string) => {
    if (typeof window !== 'undefined' && 'navigator' in window) {
      window.open(`tel:${number}`, '_self');
    }
    
    saveToolData('emergency_guide', {
      emergencyCall: number,
      timestamp: new Date().toISOString(),
      userProfile: userProfile?.title
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Guide des Urgences Médicales
        </h1>
        <p className="text-lg text-gray-600">
          Savoir réagir en cas d'urgence peut sauver des vies
        </p>
      </div>

      <Tabs defaultValue="numbers" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="numbers">Numéros d'urgence</TabsTrigger>
          <TabsTrigger value="health">Urgences santé</TabsTrigger>
          <TabsTrigger value="rights">Vos droits</TabsTrigger>
          <TabsTrigger value="preparation">Préparation</TabsTrigger>
        </TabsList>

        <TabsContent value="numbers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyNumbers.map((emergency) => (
              <Card 
                key={emergency.number}
                className={`hover:shadow-lg transition-all cursor-pointer ${
                  emergency.priority === 'vital' ? 'border-red-300 bg-red-50' : ''
                }`}
                onClick={() => setActiveEmergency(emergency.number)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 ${emergency.color} rounded-xl flex items-center justify-center`}>
                      <emergency.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{emergency.number}</div>
                      <Badge 
                        variant={emergency.priority === 'vital' ? 'destructive' : 'outline'}
                        className="text-xs"
                      >
                        {emergency.priority === 'vital' ? 'VITAL' : emergency.priority.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{emergency.service}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">{emergency.description}</p>
                  <div className="text-xs text-gray-500 mb-4">
                    <strong>Quand appeler :</strong> {emergency.when}
                  </div>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      callEmergency(emergency.number);
                    }}
                    className={`w-full ${emergency.color} hover:opacity-90`}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Appeler {emergency.number}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800">
                <AlertTriangle className="h-5 w-5" />
                Important : Informations à donner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Lors de l'appel, précisez :</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Votre nom et numéro de téléphone</li>
                    <li>• L'adresse exacte de l'urgence</li>
                    <li>• Le nombre de personnes concernées</li>
                    <li>• La nature de l'urgence</li>
                    <li>• L'état des victimes</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Ne raccrochez pas :</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Attendez les instructions</li>
                    <li>• Répondez aux questions</li>
                    <li>• Suivez les conseils donnés</li>
                    <li>• Laissez le centre d'appel raccrocher</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {healthEmergencies.map((emergency, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <Heart className="h-5 w-5" />
                    {emergency.situation}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 text-orange-600">Symptômes :</h4>
                    <ul className="text-sm space-y-1">
                      {emergency.symptoms.map((symptom, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full" />
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 text-green-600">Actions à faire :</h4>
                    <ul className="text-sm space-y-1">
                      {emergency.actions.map((action, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                            {idx + 1}
                          </div>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 text-red-600">À éviter :</h4>
                    <ul className="text-sm space-y-1">
                      {emergency.donts.map((dont, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full" />
                          {dont}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Vos droits aux urgences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-medium">Soins gratuits d'urgence</h4>
                    <p className="text-sm text-gray-600">Même sans couverture sociale</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-medium">Droit à l'interprète</h4>
                    <p className="text-sm text-gray-600">Si vous ne parlez pas français</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-medium">Accompagnement</h4>
                    <p className="text-sm text-gray-600">Droit à un proche présent</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-medium">Information médicale</h4>
                    <p className="text-sm text-gray-600">Explications sur votre état</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Procédure aux urgences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-medium">Accueil et triage</h4>
                    <p className="text-sm text-gray-600">Évaluation de l'urgence par l'infirmière</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-medium">Attente selon priorité</h4>
                    <p className="text-sm text-gray-600">Les cas les plus graves passent en premier</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-medium">Consultation médicale</h4>
                    <p className="text-sm text-gray-600">Examen par le médecin urgentiste</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 className="font-medium">Traitement et sortie</h4>
                    <p className="text-sm text-gray-600">Soins et conseils pour la suite</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">Coûts des urgences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded">
                  <div className="text-2xl font-bold text-blue-600">Gratuit</div>
                  <div className="text-sm">Urgences vitales</div>
                </div>
                <div className="text-center p-4 bg-white rounded">
                  <div className="text-2xl font-bold text-blue-600">~25€</div>
                  <div className="text-sm">Passage aux urgences</div>
                </div>
                <div className="text-center p-4 bg-white rounded">
                  <div className="text-2xl font-bold text-blue-600">Variable</div>
                  <div className="text-sm">Selon actes réalisés</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preparation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Kit d'urgence personnel</CardTitle>
              <CardDescription>
                Préparez-vous aux situations d'urgence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {preparednessChecklist.map((category, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      {category.category}
                    </h3>
                    <div className="space-y-2">
                      {category.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                          <div className="w-4 h-4 border-2 border-gray-300 rounded" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Conseil : Formation aux gestes qui sauvent</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-800 mb-4">
                Suivez une formation PSC1 (Prévention et Secours Civiques niveau 1) pour apprendre 
                les gestes de premiers secours. Cette formation de 7h peut sauver des vies.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-white rounded">
                  <div className="font-bold text-green-600">7h</div>
                  <div className="text-sm">de formation</div>
                </div>
                <div className="text-center p-3 bg-white rounded">
                  <div className="font-bold text-green-600">~60€</div>
                  <div className="text-sm">coût moyen</div>
                </div>
                <div className="text-center p-3 bg-white rounded">
                  <div className="font-bold text-green-600">Valable</div>
                  <div className="text-sm">à vie</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmergencyGuideTool;
