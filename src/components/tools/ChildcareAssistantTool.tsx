import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Calculator, Clock, MapPin, Euro, Star, ArrowLeft, Search, FileText, Settings, Download } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';

interface ChildcareAssistantProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}

const ChildcareAssistantTool: React.FC<ChildcareAssistantProps> = ({ userProfile, onBack }) => {
  const { saveToolData } = useUserProfile();
  const [childAge, setChildAge] = useState('');
  const [workingHours, setWorkingHours] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [location, setLocation] = useState('');
  const [recommendations, setRecommendations] = useState<any>(null);
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedContract, setSelectedContract] = useState('');

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

  const contractTemplates = [
    {
      id: 'assistant_maternel',
      name: 'Contrat Assistant Maternel',
      description: 'Contrat type pour assistant maternel agréé',
      clauses: [
        'Durée et période d\'essai',
        'Horaires et jours de garde',
        'Rémunération et indemnités',
        'Congés payés',
        'Conditions de rupture'
      ]
    },
    {
      id: 'garde_domicile',
      name: 'Contrat Garde à Domicile',
      description: 'Contrat pour garde d\'enfant à domicile',
      clauses: [
        'Description du poste',
        'Horaires de travail',
        'Salaire et avantages',
        'Responsabilités',
        'Clauses de confidentialité'
      ]
    },
    {
      id: 'garde_partagee',
      name: 'Convention Garde Partagée',
      description: 'Accord entre familles pour garde partagée',
      clauses: [
        'Répartition des coûts',
        'Organisation pratique',
        'Règles de fonctionnement',
        'Gestion des conflits',
        'Assurances'
      ]
    }
  ];

  const providers = [
    {
      id: 1,
      name: 'Crèche Les Petits Anges',
      type: 'creche_collective',
      address: '12 rue de la Paix, 75001 Paris',
      phone: '01 42 60 30 10',
      rating: 4.5,
      capacity: 60,
      waitingList: 'Ouverte',
      features: ['Jardin', 'Cuisine sur place', 'Activités d\'éveil']
    },
    {
      id: 2,
      name: 'Marie Dubois - Assistant Maternel',
      type: 'assistante_maternelle',
      address: '45 avenue Victor Hugo, 75016 Paris',
      phone: '06 12 34 56 78',
      rating: 4.8,
      capacity: 4,
      waitingList: 'Places disponibles',
      features: ['Agréée CAF', '15 ans d\'expérience', 'Jardin privé']
    },
    {
      id: 3,
      name: 'Micro-crèche Bout\'Chou',
      type: 'micro_creche',
      address: '8 rue des Lilas, 92100 Boulogne',
      phone: '01 46 05 12 34',
      rating: 4.3,
      capacity: 10,
      waitingList: 'Liste d\'attente courte',
      features: ['Pédagogie Montessori', 'Repas bio', 'Horaires étendus']
    }
  ];

  const administrativeTasks = [
    {
      category: 'Déclaration employeur',
      tasks: [
        'Inscription URSSAF',
        'Déclaration embauche DPAE',
        'Affiliation prévoyance',
        'Ouverture compte CESU'
      ]
    },
    {
      category: 'Suivi mensuel',
      tasks: [
        'Établissement bulletin de paie',
        'Déclaration URSSAF',
        'Suivi heures supplémentaires',
        'Gestion congés payés'
      ]
    },
    {
      category: 'Aides et subventions',
      tasks: [
        'Demande CMG CAF',
        'Crédit d\'impôt garde',
        'Aides employeur (CESU)',
        'Suivi remboursements'
      ]
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

    const suitableModes = childcareModes.filter(mode => 
      age >= mode.ageMin && age <= mode.ageMax
    );

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
    
    if (modeId === 'assistante_maternelle' || modeId === 'garde_domicile' || modeId === 'garde_partagee') {
      if (income <= 2500) aide += Math.min(cost * 0.85, 600);
      else if (income <= 4000) aide += Math.min(cost * 0.50, 400);
      else aide += Math.min(cost * 0.15, 200);
    }
    
    if (modeId.includes('creche')) {
      const taux = Math.max(0.05, Math.min(0.5, income / 10000));
      aide += cost * (1 - taux);
    }
    
    if (modeId === 'garde_domicile' || modeId === 'garde_partagee') {
      aide += Math.min(cost * 12 * 0.5, 12000) / 12;
    }
    
    return aide;
  };

  const calculateScore = (mode: any, cost: number, income: number, hours: number, age: number) => {
    let score = 50;
    
    const budgetRatio = cost / income;
    if (budgetRatio < 0.15) score += 30;
    else if (budgetRatio < 0.25) score += 20;
    else if (budgetRatio < 0.35) score += 10;
    else score -= 20;
    
    if (hours > 45) {
      if (mode.id === 'garde_domicile' || mode.id === 'assistante_maternelle') score += 15;
      else score -= 10;
    }
    
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

  const downloadContract = (contractId: string) => {
    const contract = contractTemplates.find(c => c.id === contractId);
    if (!contract) return;

    const content = `
CONTRAT ${contract.name.toUpperCase()}

${contract.description}

CLAUSES PRINCIPALES :
${contract.clauses.map(clause => `- ${clause}`).join('\n')}

Ce document est un modèle à adapter selon votre situation.
Consultez un professionnel du droit pour validation.
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${contract.name.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Assistant Garde d'Enfants
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Trouvez le mode de garde adapté à vos besoins et budget
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="simulation" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="simulation">Simulation</TabsTrigger>
              <TabsTrigger value="providers">Prestataires</TabsTrigger>
              <TabsTrigger value="contracts">Contrats</TabsTrigger>
              <TabsTrigger value="admin">Gestion Admin</TabsTrigger>
              <TabsTrigger value="comparison">Comparatif</TabsTrigger>
            </TabsList>

            {/* Onglet Simulation */}
            <TabsContent value="simulation" className="space-y-6">
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

              {/* Résultats de simulation */}
              {recommendations && (
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
              )}
            </TabsContent>

            {/* Onglet Recherche Prestataires */}
            <TabsContent value="providers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Recherche de prestataires
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-6">
                    <Input
                      placeholder="Ville, code postal..."
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="flex-1"
                    />
                    <Button>
                      <Search className="mr-2 h-4 w-4" />
                      Rechercher
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {providers.map(provider => (
                      <div key={provider.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{provider.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              {childcareModes.find(m => m.id === provider.type)?.name}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm">{provider.rating}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="flex items-center gap-2 mb-1">
                              <MapPin className="h-4 w-4" />
                              {provider.address}
                            </p>
                            <p>📞 {provider.phone}</p>
                          </div>
                          
                          <div>
                            <p>Capacité : {provider.capacity} enfants</p>
                            <p className={`font-medium ${
                              provider.waitingList === 'Places disponibles' ? 'text-green-600' : 'text-orange-600'
                            }`}>
                              {provider.waitingList}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <div className="flex flex-wrap gap-2">
                            {provider.features.map((feature, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-4 flex gap-2">
                          <Button size="sm" variant="outline">
                            Contacter
                          </Button>
                          <Button size="sm" variant="outline">
                            Visiter
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Onglet Contrats Types */}
            <TabsContent value="contracts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Contrats types
                  </CardTitle>
                  <CardDescription>
                    Modèles de contrats adaptés à chaque mode de garde
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contractTemplates.map(contract => (
                      <div key={contract.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-medium">{contract.name}</h3>
                            <p className="text-sm text-gray-600">{contract.description}</p>
                          </div>
                          <Button
                            onClick={() => downloadContract(contract.id)}
                            size="sm"
                            variant="outline"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Télécharger
                          </Button>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Clauses principales :</h4>
                          <ul className="text-sm space-y-1">
                            {contract.clauses.map((clause, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <span className="text-blue-600">•</span>
                                {clause}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Onglet Gestion Administrative */}
            <TabsContent value="admin" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Gestion administrative
                  </CardTitle>
                  <CardDescription>
                    Toutes les démarches administratives pour employer une garde d'enfant
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {administrativeTasks.map((category, index) => (
                      <div key={index}>
                        <h3 className="font-medium text-lg mb-3 text-blue-800">
                          {category.category}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {category.tasks.map((task, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-blue-50 rounded">
                              <input type="checkbox" className="rounded" />
                              <span className="text-sm">{task}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">
                      💡 Conseil
                    </h4>
                    <p className="text-sm text-yellow-700">
                      Utilisez les services CESU ou PAJEMPLOI pour simplifier vos démarches administratives.
                      Ces plateformes gèrent automatiquement les déclarations et calculs.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Onglet Comparatif détaillé */}
            <TabsContent value="comparison" className="space-y-6">
              {recommendations && (
                <Card>
                  <CardHeader>
                    <CardTitle>Comparaison détaillée des modes de garde</CardTitle>
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
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ChildcareAssistantTool;
