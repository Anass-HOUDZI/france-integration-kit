import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Shield, Calculator, TrendingUp, AlertCircle, CheckSquare } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';

interface MutualOffer {
  id: string;
  name: string;
  price: number;
  coverage: {
    optique: string;
    dentaire: string;
    hospitalisation: string;
    medecines_douces: string;
    maternite: string;
    psychologie: string;
  };
  target: string;
  score?: number;
}

interface RecommendationAnalysis {
  recommendedOffer: MutualOffer;
  allOffers: MutualOffer[];
  monthlyBudget: number;
  yearlyBudget: number;
  priorityNeeds: string[];
  tips: string[];
}

interface MutualAssistantProps {
  userProfile: any;
  diagnostic: any;
}

const MutualAssistantTool: React.FC<MutualAssistantProps> = ({ userProfile }) => {
  const { saveToolData } = useUserProfile();
  const [age, setAge] = useState('');
  const [budget, setBudget] = useState('');
  const [situation, setSituation] = useState('');
  const [priorityNeeds, setPriorityNeeds] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendationAnalysis | null>(null);

  const situations = [
    { id: 'celibataire', name: 'Célibataire' },
    { id: 'couple', name: 'En couple' },
    { id: 'famille', name: 'Famille avec enfants' },
    { id: 'senior', name: 'Senior (60+)' }
  ];

  const needs = [
    { id: 'optique', name: 'Optique', priority: 'high' },
    { id: 'dentaire', name: 'Dentaire', priority: 'high' },
    { id: 'hospitalisation', name: 'Hospitalisation', priority: 'medium' },
    { id: 'medecines_douces', name: 'Médecines douces', priority: 'low' },
    { id: 'maternite', name: 'Maternité', priority: 'high' },
    { id: 'psychologie', name: 'Psychologie', priority: 'medium' }
  ];

  const mutuelleOffers: MutualOffer[] = [
    {
      id: 'eco',
      name: 'Formule Éco',
      price: 25,
      coverage: {
        optique: '100€/an',
        dentaire: '100%',
        hospitalisation: '100%',
        medecines_douces: '0€',
        maternite: '100%',
        psychologie: '0€'
      },
      target: 'Budget serré, besoins de base'
    },
    {
      id: 'confort',
      name: 'Formule Confort',
      price: 45,
      coverage: {
        optique: '300€/an',
        dentaire: '200%',
        hospitalisation: '150%',
        medecines_douces: '150€/an',
        maternite: '150%',
        psychologie: '100€/an'
      },
      target: 'Bon rapport qualité/prix'
    },
    {
      id: 'premium',
      name: 'Formule Premium',
      price: 75,
      coverage: {
        optique: '500€/an',
        dentaire: '300%',
        hospitalisation: '200%',
        medecines_douces: '300€/an',
        maternite: '200%',
        psychologie: '200€/an'
      },
      target: 'Couverture maximale'
    }
  ];

  const toggleNeed = (needId: string) => {
    setPriorityNeeds(prev =>
      prev.includes(needId)
        ? prev.filter(id => id !== needId)
        : [...prev, needId]
    );
  };

  const calculateRecommendations = () => {
    const userAge = parseInt(age);
    const userBudget = parseInt(budget);
    
    // Score des formules selon profil
    const scores = mutuelleOffers.map(offer => {
      let score = 0;
      
      // Score budget
      if (offer.price <= userBudget) score += 30;
      else if (offer.price <= userBudget * 1.2) score += 15;
      
      // Score besoins prioritaires
      priorityNeeds.forEach(need => {
        const coverage = offer.coverage[need as keyof typeof offer.coverage];
        if (coverage && coverage !== '0€') {
          score += 20;
        }
      });
      
      // Score âge
      if (userAge >= 60 && offer.id === 'premium') score += 15;
      if (userAge <= 35 && offer.id === 'eco') score += 10;
      
      // Score situation
      if (situation === 'famille' && offer.id !== 'eco') score += 10;
      if (situation === 'celibataire' && offer.id === 'eco') score += 10;
      
      return { ...offer, score };
    });
    
    // Tri par score décroissant
    const sortedOffers = scores.sort((a, b) => b.score - a.score);
    
    const analysis: RecommendationAnalysis = {
      recommendedOffer: sortedOffers[0],
      allOffers: sortedOffers,
      monthlyBudget: userBudget,
      yearlyBudget: userBudget * 12,
      priorityNeeds,
      tips: generateTips(userAge, situation, priorityNeeds)
    };
    
    setRecommendations(analysis);
    
    saveToolData('mutual_assistant', {
      age: userAge,
      budget: userBudget,
      situation,
      priorityNeeds,
      analysis,
      createdAt: new Date().toISOString()
    });
  };

  const generateTips = (userAge: number, situation: string, needs: string[]): string[] => {
    const tips: string[] = [];
    
    if (userAge <= 30) {
      tips.push('Les jeunes ont souvent des tarifs préférentiels');
    }
    
    if (needs.includes('optique')) {
      tips.push('Comparez les plafonds optique, ils varient beaucoup');
    }
    
    if (needs.includes('dentaire')) {
      tips.push('Vérifiez les délais de carence pour les soins dentaires');
    }
    
    if (situation === 'famille') {
      tips.push('Certaines mutuelles offrent la gratuité pour les enfants');
    }
    
    tips.push('Négociez avec votre employeur une mutuelle d\'entreprise');
    tips.push('Vérifiez votre éligibilité à la CSS (ex-CMU-C)');
    
    return tips;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Assistant Mutuelle
        </h1>
        <p className="text-lg text-gray-600">
          Trouvez la complémentaire santé adaptée à vos besoins
        </p>
      </div>

      {/* Questionnaire */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Vos critères
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="age">Votre âge</Label>
              <Input
                id="age"
                type="number"
                placeholder="35"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="budget">Budget mensuel (€)</Label>
              <Input
                id="budget"
                type="number"
                placeholder="50"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
            
            <div>
              <Label>Situation familiale</Label>
              <Select value={situation} onValueChange={setSituation}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez" />
                </SelectTrigger>
                <SelectContent>
                  {situations.map(sit => (
                    <SelectItem key={sit.id} value={sit.id}>
                      {sit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-base font-medium mb-3 block">
              Vos besoins prioritaires en santé
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {needs.map(need => (
                <div key={need.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={need.id}
                    checked={priorityNeeds.includes(need.id)}
                    onCheckedChange={() => toggleNeed(need.id)}
                  />
                  <Label htmlFor={need.id} className="text-sm">
                    {need.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button 
            onClick={calculateRecommendations}
            disabled={!age || !budget || !situation}
            className="w-full"
          >
            <Shield className="mr-2 h-4 w-4" />
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
              <CardTitle className="flex items-center gap-2 text-green-800">
                <TrendingUp className="h-5 w-5" />
                Notre recommandation pour vous
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{recommendations.recommendedOffer.name}</h3>
                  <p className="text-gray-600">{recommendations.recommendedOffer.target}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {recommendations.recommendedOffer.price}€/mois
                  </div>
                  <div className="text-sm text-gray-500">
                    {recommendations.recommendedOffer.price * 12}€/an
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(recommendations.recommendedOffer.coverage).map(([key, value]) => (
                  <div key={key} className="text-center p-2 bg-white rounded">
                    <div className="text-sm font-medium capitalize">
                      {key.replace('_', ' ')}
                    </div>
                    <div className="text-green-600 font-bold">{value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Comparaison toutes formules */}
          <Card>
            <CardHeader>
              <CardTitle>Comparaison des formules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Formule</th>
                      <th className="text-left p-3">Prix</th>
                      <th className="text-left p-3">Optique</th>
                      <th className="text-left p-3">Dentaire</th>
                      <th className="text-left p-3">Hospitalisation</th>
                      <th className="text-left p-3">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recommendations.allOffers.map((offer, index) => (
                      <tr key={offer.id} className={`border-b ${index === 0 ? 'bg-green-50' : 'hover:bg-gray-50'}`}>
                        <td className="p-3">
                          <div className="font-medium">{offer.name}</div>
                          {index === 0 && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              Recommandé
                            </Badge>
                          )}
                        </td>
                        <td className="p-3 font-bold">{offer.price}€</td>
                        <td className="p-3">{offer.coverage.optique}</td>
                        <td className="p-3">{offer.coverage.dentaire}</td>
                        <td className="p-3">{offer.coverage.hospitalisation}</td>
                        <td className="p-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(offer.score || 0 / 100) * 100}%` }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Conseils */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Conseils personnalisés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recommendations.tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckSquare className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
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

export default MutualAssistantTool;
