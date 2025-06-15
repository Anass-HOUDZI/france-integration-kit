
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Users, Calculator, Clock, MapPin, Euro, Star } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';

interface ChildcareAssistantProps {
  userProfile: any;
  diagnostic: any;
}

const ChildcareAssistantTool: React.FC<ChildcareAssistantProps> = ({ userProfile }) => {
  const { saveToolData } = useUserProfile();
  const [childAge, setChildAge] = useState('');
  const [workingHours, setWorkingHours] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [location, setLocation] = useState('');
  const [recommendations, setRecommendations] = useState<any>(null);

  const locations = [
    { id: 'paris', name: 'Paris', factor: 1.3 },
    { id: 'ile_de_france', name: 'Île-de-France (hors Paris)', factor: 1.2 },
    { id: 'grande_ville', name: 'Grande ville (>100k hab)', factor: 1.1 },
    { id: 'ville_moyenne', name: 'Ville moyenne', factor: 1.0 },
    { id: 'petite_ville', name: 'Petite ville/Rural', factor: 0.9 }
  ];

  const childcareModes = [
    {
      id: 'creche_collective',
      name: 'Crèche collective',
      description: 'Structure municipale ou associative',
      ageMin: 0,
      ageMax: 3,
      costBase: 180,
      pros: ['Socialisation', 'Personnel qualifié', 'Coût modéré'],
      cons: ['Listes d\'attente', 'Horaires fixes', 'Fermetures']
    },
    {
      id: 'creche_familiale',
      name: 'Crèche familiale',
      description: 'Assistante maternelle employée par la ville',
      ageMin: 0,
      ageMax: 4,
      costBase: 200,
      pros: ['Cadre familial', 'Souplesse', 'Suivi personnalisé'],
      cons: ['Places limitées', 'Dépendance d\'une personne']
    },
    {
      id: 'assistante_maternelle',
      name: 'Assistant(e) maternel(le)',
      description: 'Professionnel agréé à domicile',
      ageMin: 0,
      ageMax: 6,
      costBase: 350,
      pros: ['Flexibilité', 'Attention individuelle', 'Proximité'],
      cons: ['Coût plus élevé', 'Congés à gérer', 'Recherche difficile']
    },
    {
      id: 'micro_creche',
      name: 'Micro-crèche',
      description: 'Petite structure (max 10 enfants)',
      ageMin: 0,
      ageMax: 3,
      costBase: 320,
      pros: ['Petits groupes', 'Flexibilité', 'Qualité d\'accueil'],
      cons: ['Coût élevé', 'Peu de places', 'Disponibilité limitée']
    },
    {
      id: 'garde_domicile',
      name: 'Garde à domicile',
      description: 'Professionnel chez vous',
      ageMin: 0,
      ageMax: 12,
      costBase: 600,
      pros: ['Confort enfant', 'Horaires libres', 'Garde maladie'],
      cons: ['Coût très élevé', 'Gestion employeur', 'Remplacements']
    },
    {
      id: 'garde_partagee',
      name: 'Garde partagée',
      description: 'Garde à domicile mutualisée',
      ageMin: 0,
      ageMax: 6,
      costBase: 400,
      pros: ['Coût partagé', 'Socialisation', 'Flexibilité'],
      cons: ['Organisation complexe', 'Entente entre familles']
    }
  ];

  const generateRecommendations = () => {
    const age = parseInt(childAge);
    const income = parseInt(monthlyIncome);
    const hours = parseInt(workingHours);
    const locationData = locations.find(l => l.id === location);

    if (!age || !income || !hours || !locationData) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    // Filtrer les modes de garde selon l'âge
    const suitableModes = childcareModes.filter(mode => 
      age >= mode.ageMin && age <= mode.ageMax
    );

    // Calculer les coûts et aides pour chaque mode
    const recommendations = suitableModes.map(mode => {
      const baseCost = mode.costBase * locationData.factor;
      const aide = calculateAide(baseCost, income, mode.id);
      const finalCost = Math.max(0, baseCost - aide);
      
      return {
        ...mode,
        baseCost: Math.round(baseCost),
        aide: Math.round(aide),
        finalCost: Math.round(finalCost),
        score: calculateScore(mode, finalCost, income, hours, age)
      };
    }).sort((a, b) => b.score - a.score);

    const analysis = {
      recommendations,
      totalBudget: income,
      location: locationData.name,
      tips: getChildcareTips(age, income, hours),
      aides: getAvailableAides()
    };

    setRecommendations(analysis);
    
    saveToolData('childcare_assistant', {
      childAge: age,
      workingHours: hours,
      monthlyIncome: income,
      location,
      analysis,
      createdAt: new Date().toISOString()
    });
  };

  const calculateAide = (cost: number, income: number, modeId: string) => {
    let aide = 0;
    
    // CMG (Complément libre choix du Mode de Garde)
    if (modeId === 'assistante_maternelle' || modeId === 'garde_domicile' || modeId === 'garde_partagee') {
      if (income <= 2500) aide += Math.min(cost * 0.85, 600);
      else if (income <= 4000) aide += Math.min(cost * 0.50, 400);
      else aide += Math.min(cost * 0.15, 200);
    }
    
    // PSU (Prestation de Service Unique) pour crèches
    if (modeId.includes('creche')) {
      const taux = Math.max(0.05, Math.min(0.5, income / 10000));
      aide += cost * (1 - taux);
    }
    
    // Crédit d'impôt
    if (modeId === 'garde_domicile' || modeId === 'garde_partagee') {
      aide += Math.min(cost * 12 * 0.5, 12000) / 12; // 50% crédit d'impôt plafonné
    }
    
    return aide;
  };

  const calculateScore = (mode: any, cost: number, income: number, hours: number, age: number) => {
    let score = 50;
    
    // Score budget (important)
    const budgetRatio = cost / income;
    if (budgetRatio < 0.15) score += 30;
    else if (budgetRatio < 0.25) score += 20;
    else if (budgetRatio < 0.35) score += 10;
    else score -= 20;
    
    // Score flexibilité horaire
    if (hours > 45) {
      if (mode.id === 'garde_domicile' || mode.id === 'assistante_maternelle') score += 15;
      else score -= 10;
    }
    
    // Score âge approprié
    if (age < 1 && mode.id === 'assistante_maternelle') score += 10;
    if (age > 2 && mode.id.includes('creche')) score += 5;
    
    return Math.max(0, Math.min(100, score));
  };

  const getChildcareTips = (age: number, income: number, hours: number) => {
    const tips = [
      'Inscrivez-vous le plus tôt possible, dès la grossesse pour les crèches',
      'Vérifiez les aides de votre employeur (CESU, places réservées)',
      'Explorez les solutions de garde d\'urgence'
    ];
    
    if (age < 1) {
      tips.push('Pour les bébés, privilégiez un cadre rassurant et stable');
    }
    
    if (income < 3000) {
      tips.push('Explorez les crèches municipales et associatives pour réduire les coûts');
    }
    
    if (hours > 50) {
      tips.push('Pour des horaires atypiques, considérez une garde à domicile partagée');
    }
    
    return tips;
  };

  const getAvailableAides = () => [
    {
      name: 'CMG',
      description: 'Complément libre choix du Mode de Garde',
      condition: 'Assistant maternel ou garde à domicile'
    },
    {
      name: 'PSU',
      description: 'Prestation de Service Unique',
      condition: 'Crèches publiques et privées'
    },
    {
      name: 'Crédit d\'impôt',
      description: '50% des frais de garde à domicile',
      condition: 'Plafond 12 000€/an'
    },
    {
      name: 'Aides employeur',
      description: 'CESU, places en crèche d\'entreprise',
      condition: 'Selon politique d\'entreprise'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Assistant Garde d'Enfants
        </h1>
        <p className="text-lg text-gray-600">
          Trouvez le mode de garde adapté à vos besoins et budget
        </p>
      </div>

      {/* Formulaire */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Vos besoins de garde
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="childAge">Âge de l'enfant (années)</Label>
              <Input
                id="childAge"
                type="number"
                min="0"
                max="12"
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="hours">Heures de garde/semaine</Label>
              <Input
                id="hours"
                type="number"
                placeholder="40"
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="income">Revenus mensuels nets (€)</Label>
              <Input
                id="income"
                type="number"
                placeholder="3000"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
              />
            </div>
            
            <div>
              <Label>Zone géographique</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre zone" />
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

          <Button 
            onClick={generateRecommendations}
            disabled={!childAge || !workingHours || !monthlyIncome || !location}
            className="w-full"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Obtenir mes recommandations
          </Button>
        </CardContent>
      </Card>

      {/* Recommandations */}
      {recommendations && (
        <div className="space-y-6">
          {/* Recommandation principale */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800">
                Notre recommandation : {recommendations.recommendations[0].name}
              </CardTitle>
              <CardDescription className="text-green-700">
                {recommendations.recommendations[0].description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl font-bold text-green-600">
                  {recommendations.recommendations[0].finalCost}€/mois
                </div>
                <Badge className="bg-green-200 text-green-800">
                  Score : {recommendations.recommendations[0].score}/100
                </Badge>
              </div>
              
              {recommendations.recommendations[0].aide > 0 && (
                <div className="text-sm text-green-700">
                  Coût initial : {recommendations.recommendations[0].baseCost}€ 
                  - Aides : {recommendations.recommendations[0].aide}€
                </div>
              )}
            </CardContent>
          </Card>

          {/* Comparaison complète */}
          <Card>
            <CardHeader>
              <CardTitle>Comparaison des modes de garde</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.recommendations.map((mode: any, index: number) => (
                  <div key={mode.id} className={`p-4 rounded-lg border ${index === 0 ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{mode.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{mode.finalCost}€/mois</Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm">{mode.score}/100</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{mode.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-green-600 mb-1">Avantages</h4>
                        <ul className="text-xs space-y-1">
                          {mode.pros.map((pro: string, i: number) => (
                            <li key={i} className="flex items-center gap-1">
                              <span className="text-green-500">✓</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-red-600 mb-1">Inconvénients</h4>
                        <ul className="text-xs space-y-1">
                          {mode.cons.map((con: string, i: number) => (
                            <li key={i} className="flex items-center gap-1">
                              <span className="text-red-500">✗</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Aides disponibles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Euro className="h-5 w-5" />
                Aides financières disponibles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.aides.map((aide: any, index: number) => (
                  <div key={index} className="p-3 bg-blue-50 rounded">
                    <h4 className="font-medium text-blue-800">{aide.name}</h4>
                    <p className="text-sm text-blue-700 mb-1">{aide.description}</p>
                    <p className="text-xs text-blue-600">{aide.condition}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Conseils */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Conseils personnalisés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recommendations.tips.map((tip: string, index: number) => (
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

export default ChildcareAssistantTool;
