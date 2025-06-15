import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { BookOpen, GraduationCap, Calendar, Euro, MapPin, Award, ArrowLeft } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';

interface HigherEducationProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}

const HigherEducationTool: React.FC<HigherEducationProps> = ({ userProfile, onBack }) => {
  const { saveToolData } = useUserProfile();
  const [currentLevel, setCurrentLevel] = useState('');
  const [desiredField, setDesiredField] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [guidance, setGuidance] = useState<any>(null);

  const levels = [
    { id: 'bac', name: 'Baccalauréat en cours/obtenu' },
    { id: 'bac_plus_1', name: 'Bac+1 (L1 validée)' },
    { id: 'bac_plus_2', name: 'Bac+2 (BTS, DUT, L2)' },
    { id: 'bac_plus_3', name: 'Bac+3 (Licence, Bachelor)' },
    { id: 'bac_plus_5', name: 'Bac+5 (Master, Ingénieur)' },
    { id: 'etranger', name: 'Diplôme étranger' }
  ];

  const fields = [
    { id: 'sciences', name: 'Sciences et Technologies' },
    { id: 'economie', name: 'Économie et Gestion' },
    { id: 'droit', name: 'Droit et Sciences Politiques' },
    { id: 'lettres', name: 'Lettres et Langues' },
    { id: 'sante', name: 'Santé et Médecine' },
    { id: 'arts', name: 'Arts et Design' },
    { id: 'sport', name: 'Sport et STAPS' },
    { id: 'social', name: 'Sciences Humaines et Sociales' }
  ];

  const locations = [
    { id: 'paris', name: 'Paris', cost: 1200 },
    { id: 'lyon', name: 'Lyon', cost: 800 },
    { id: 'toulouse', name: 'Toulouse', cost: 700 },
    { id: 'bordeaux', name: 'Bordeaux', cost: 750 },
    { id: 'lille', name: 'Lille', cost: 650 },
    { id: 'marseille', name: 'Marseille', cost: 700 },
    { id: 'autre', name: 'Autre ville', cost: 600 }
  ];

  const interestOptions = [
    'Recherche et innovation',
    'International',
    'Entrepreneuriat',
    'Stage et alternance',
    'Vie associative',
    'Proximité famille',
    'Coût réduit',
    'Prestige établissement'
  ];

  const toggleInterest = (interest: string) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const generateGuidance = () => {
    const locationData = locations.find(l => l.id === location);
    const fieldData = fields.find(f => f.id === desiredField);
    const userBudget = parseInt(budget);

    if (!currentLevel || !desiredField || !budget || !location) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const guidance = {
      recommendations: getRecommendations(currentLevel, desiredField, interests),
      procedures: getProcedures(currentLevel),
      budget: calculateBudget(locationData?.cost || 600, userBudget),
      timeline: getTimeline(),
      scholarships: getScholarships(userBudget),
      tips: getTips(currentLevel, desiredField, interests)
    };

    setGuidance(guidance);
    
    saveToolData('higher_education', {
      currentLevel,
      desiredField: fieldData?.name,
      budget: userBudget,
      location: locationData?.name,
      interests,
      guidance,
      createdAt: new Date().toISOString()
    });
  };

  const getRecommendations = (level: string, field: string, interests: string[]) => {
    const recs = [];

    // Recommandations selon le niveau
    if (level === 'bac') {
      recs.push({
        type: 'Parcoursup',
        description: 'Inscription obligatoire pour l\'université et la plupart des formations',
        urgent: true
      });
    }

    // Recommandations selon le domaine
    if (field === 'sciences') {
      recs.push({
        type: 'Université',
        description: 'Cursus Licence-Master-Doctorat avec spécialisations progressives'
      });
      recs.push({
        type: 'École d\'ingénieur',
        description: 'Formation professionnalisante avec stages obligatoires'
      });
    }

    if (field === 'economie') {
      recs.push({
        type: 'École de commerce',
        description: 'Formation business avec forte dimension internationale'
      });
      recs.push({
        type: 'Université (AES, Éco-Gestion)',
        description: 'Formation théorique solide, coût réduit'
      });
    }

    // Recommandations selon les intérêts
    if (interests.includes('Alternance')) {
      recs.push({
        type: 'BTS/DUT en alternance',
        description: 'Formation rémunérée avec expérience professionnelle'
      });
    }

    if (interests.includes('International')) {
      recs.push({
        type: 'Programmes Erasmus',
        description: 'Semestres d\'échange européens'
      });
    }

    return recs;
  };

  const getProcedures = (level: string) => {
    const procedures = [];

    if (level === 'etranger') {
      procedures.push(
        'Faire reconnaître vos diplômes étrangers (ENIC-NARIC)',
        'Passer un test de français (DELF/DALF) si nécessaire',
        'Demander un visa étudiant si non-européen'
      );
    }

    procedures.push(
      'S\'inscrire sur Parcoursup (formations sélectives)',
      'Candidater directement (formations non Parcoursup)',
      'Constituer les dossiers de candidature',
      'Préparer les entretiens de motivation',
      'Finaliser l\'inscription administrative'
    );

    return procedures;
  };

  const calculateBudget = (locationCost: number, userBudget: number) => {
    const fees = {
      university: 170, // Frais de scolarité université
      engineering: 2500, // École d'ingénieur publique
      business: 8000, // École de commerce
      private: 6000 // École privée moyenne
    };

    const living = {
      housing: locationCost,
      food: 300,
      transport: 100,
      misc: 200
    };

    const total = living.housing + living.food + living.transport + living.misc;

    return {
      fees,
      living,
      totalMonthly: total,
      totalYearly: total * 10, // 10 mois d'études
      affordable: userBudget >= total,
      scholarshipNeeded: userBudget < total * 0.8
    };
  };

  const getTimeline = () => [
    { period: 'Octobre-Décembre', action: 'Exploration des formations et salons étudiants' },
    { period: 'Janvier-Mars', action: 'Candidatures Parcoursup et dossiers directs' },
    { period: 'Avril-Mai', action: 'Entretiens et épreuves de sélection' },
    { period: 'Juin-Juillet', action: 'Réponses et confirmations' },
    { period: 'Août-Septembre', action: 'Inscriptions administratives et rentrée' }
  ];

  const getScholarships = (budget: number) => {
    const scholarships = [
      {
        name: 'Bourse sur critères sociaux',
        amount: '0 à 5736€/an',
        condition: 'Selon revenus familiaux'
      },
      {
        name: 'Aide au mérite',
        amount: '900€/an',
        condition: 'Mention TB au bac + boursier'
      },
      {
        name: 'Aide à la mobilité',
        amount: '1000€',
        condition: 'Changement d\'académie'
      }
    ];

    if (budget < 1500) {
      scholarships.push({
        name: 'Aide d\'urgence ponctuelle',
        amount: '1500€ max',
        condition: 'Difficultés financières soudaines'
      });
    }

    return scholarships;
  };

  const getTips = (level: string, field: string, interests: string[]) => {
    const tips = [
      'Assistez aux journées portes ouvertes des établissements',
      'Consultez les taux d\'insertion professionnelle',
      'Échangez avec des étudiants et anciens diplômés'
    ];

    if (level === 'etranger') {
      tips.push('Contactez les services internationaux des universités');
    }

    if (interests.includes('Alternance')) {
      tips.push('Commencez tôt la recherche d\'entreprise pour l\'alternance');
    }

    if (field === 'sante') {
      tips.push('Préparez-vous aux numerus clausus et concours sélectifs');
    }

    return tips;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <div className="text-center flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Guide Études Supérieures
          </h1>
          <p className="text-lg text-gray-600">
            Orientation et procédures pour l'enseignement supérieur français
          </p>
        </div>
      </div>

      {/* Formulaire */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Votre profil étudiant
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Niveau actuel</Label>
              <Select value={currentLevel} onValueChange={setCurrentLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Votre niveau d'études" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map(level => (
                    <SelectItem key={level.id} value={level.id}>
                      {level.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Domaine visé</Label>
              <Select value={desiredField} onValueChange={setDesiredField}>
                <SelectTrigger>
                  <SelectValue placeholder="Domaine d'études" />
                </SelectTrigger>
                <SelectContent>
                  {fields.map(field => (
                    <SelectItem key={field.id} value={field.id}>
                      {field.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budget">Budget mensuel (€)</Label>
              <Input
                id="budget"
                type="number"
                placeholder="1000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
            
            <div>
              <Label>Ville souhaitée</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Ville d'études" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(loc => (
                    <SelectItem key={loc.id} value={loc.id}>
                      {loc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-base font-medium mb-3 block">
              Vos priorités (optionnel)
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {interestOptions.map(interest => (
                <div key={interest} className="flex items-center space-x-2">
                  <Checkbox
                    id={interest}
                    checked={interests.includes(interest)}
                    onCheckedChange={() => toggleInterest(interest)}
                  />
                  <Label htmlFor={interest} className="text-sm">
                    {interest}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button 
            onClick={generateGuidance}
            disabled={!currentLevel || !desiredField || !budget || !location}
            className="w-full"
          >
            <GraduationCap className="mr-2 h-4 w-4" />
            Obtenir mon guide personnalisé
          </Button>
        </CardContent>
      </Card>

      {/* Guidance */}
      {guidance && (
        <div className="space-y-6">
          {/* Recommandations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Formations recommandées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {guidance.recommendations.map((rec: any, index: number) => (
                  <div key={index} className={`p-4 rounded border ${rec.urgent ? 'border-orange-200 bg-orange-50' : 'border-gray-200'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">{rec.type}</h3>
                      {rec.urgent && <Badge className="bg-orange-200 text-orange-800">Urgent</Badge>}
                    </div>
                    <p className="text-sm text-gray-600">{rec.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Budget */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Euro className="h-5 w-5" />
                Estimation budget étudiant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Frais de scolarité annuels</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Université publique</span>
                      <Badge variant="outline">{guidance.budget.fees.university}€</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">École d'ingénieur publique</span>
                      <Badge variant="outline">{guidance.budget.fees.engineering}€</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">École de commerce</span>
                      <Badge variant="outline">{guidance.budget.fees.business}€</Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Coût de la vie mensuel</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Logement</span>
                      <Badge variant="outline">{guidance.budget.living.housing}€</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Alimentation</span>
                      <Badge variant="outline">{guidance.budget.living.food}€</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Transport</span>
                      <Badge variant="outline">{guidance.budget.living.transport}€</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Divers</span>
                      <Badge variant="outline">{guidance.budget.living.misc}€</Badge>
                    </div>
                    <hr />
                    <div className="flex justify-between font-medium">
                      <span>Total mensuel</span>
                      <Badge className={guidance.budget.affordable ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}>
                        {guidance.budget.totalMonthly}€
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              {guidance.budget.scholarshipNeeded && (
                <div className="mt-4 p-3 bg-blue-50 rounded">
                  <p className="text-sm text-blue-800">
                    💡 Votre budget nécessite des aides financières. Consultez les bourses disponibles ci-dessous.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bourses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Euro className="h-5 w-5" />
                Aides financières disponibles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guidance.scholarships.map((scholarship: any, index: number) => (
                  <div key={index} className="p-3 bg-green-50 rounded">
                    <h4 className="font-medium text-green-800">{scholarship.name}</h4>
                    <p className="text-sm text-green-700 mb-1">{scholarship.amount}</p>
                    <p className="text-xs text-green-600">{scholarship.condition}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Calendrier des candidatures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {guidance.timeline.map((step: any, index: number) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded">
                    <Badge variant="outline">{step.period}</Badge>
                    <span className="text-sm">{step.action}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Procédures */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Étapes à suivre
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {guidance.procedures.map((procedure: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-sm">{procedure}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Conseils */}
          <Card>
            <CardHeader>
              <CardTitle>Conseils personnalisés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {guidance.tips.map((tip: string, index: number) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-blue-600">💡</span>
                    <span className="text-sm">{tip}</span>
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

export default HigherEducationTool;
