import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calculator, Users, Euro, TrendingUp, AlertCircle, Gift, ArrowLeft } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';

interface FamilyAllowancesProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}

const FamilyAllowancesTool: React.FC<FamilyAllowancesProps> = ({ userProfile, onBack }) => {
  const { saveToolData } = useUserProfile();
  const [numberOfChildren, setNumberOfChildren] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [familySituation, setFamilySituation] = useState('');
  const [childrenAges, setChildrenAges] = useState<string[]>([]);
  const [simulation, setSimulation] = useState<any>(null);

  const situations = [
    { id: 'couple', name: 'En couple' },
    { id: 'single', name: 'Parent isolé' },
    { id: 'separated', name: 'Séparé(e)' }
  ];

  const updateChildrenAges = (index: number, age: string) => {
    const newAges = [...childrenAges];
    newAges[index] = age;
    setChildrenAges(newAges);
  };

  const calculateAllowances = () => {
    const income = parseInt(monthlyIncome);
    const childCount = parseInt(numberOfChildren);
    const ages = childrenAges.map(age => parseInt(age)).filter(age => !isNaN(age));

    if (!income || !childCount || ages.length !== childCount) {
      alert('Veuillez remplir tous les champs correctement');
      return;
    }

    const simulation = {
      allocations: calculateBaseAllowances(childCount, income),
      supplements: calculateSupplements(ages, familySituation, income),
      schoolAllowance: calculateSchoolAllowance(ages, income),
      housingAllowance: calculateHousingAllowance(income, childCount),
      total: 0,
      conditions: getConditions(),
      tips: getTips(familySituation, childCount)
    };

    simulation.total = simulation.allocations + simulation.supplements + 
                     simulation.schoolAllowance + simulation.housingAllowance;

    setSimulation(simulation);
    
    saveToolData('family_allowances', {
      numberOfChildren: childCount,
      monthlyIncome: income,
      familySituation,
      childrenAges: ages,
      simulation,
      createdAt: new Date().toISOString()
    });
  };

  const calculateBaseAllowances = (childCount: number, income: number) => {
    if (childCount < 2) return 0;
    
    // Plafonds 2024 (exemple)
    const plafond1Enfant = 58000;
    const plafond2Enfants = 66000;
    const plafond3Enfants = 74000;
    
    let plafond = plafond1Enfant;
    if (childCount === 2) plafond = plafond2Enfants;
    if (childCount >= 3) plafond = plafond3Enfants + (childCount - 3) * 8000;
    
    const yearlyIncome = income * 12;
    
    if (yearlyIncome <= plafond) {
      if (childCount === 2) return 141; // Montant 2024
      if (childCount === 3) return 322;
      if (childCount >= 4) return 322 + (childCount - 3) * 181;
    } else if (yearlyIncome <= plafond * 1.2) {
      // Taux réduit
      const baseAmount = childCount === 2 ? 70 : 161;
      return baseAmount;
    }
    
    return 0;
  };

  const calculateSupplements = (ages: number[], situation: string, income: number) => {
    let total = 0;
    
    // Complément familial (3 enfants ou plus)
    if (ages.length >= 3 && ages.every(age => age >= 3)) {
      if (income * 12 <= 58000) total += 175;
    }
    
    // Allocation de soutien familial (parent isolé)
    if (situation === 'single') {
      total += ages.length * 118;
    }
    
    // Allocation journalière de présence parentale
    ages.forEach(age => {
      if (age >= 11 && age <= 16) total += 39; // Forfait adolescent
    });
    
    return total;
  };

  const calculateSchoolAllowance = (ages: number[], income: number) => {
    const schoolAges = ages.filter(age => age >= 6 && age <= 18);
    if (schoolAges.length === 0) return 0;
    
    // Allocation de rentrée scolaire (ARS)
    if (income * 12 <= 25000) { // Plafond exemple
      let total = 0;
      schoolAges.forEach(age => {
        if (age >= 6 && age <= 10) total += 398;
        else if (age >= 11 && age <= 14) total += 420;
        else if (age >= 15 && age <= 18) total += 434;
      });
      return total / 12; // Réparti sur l'année
    }
    
    return 0;
  };

  const calculateHousingAllowance = (income: number, childCount: number) => {
    // Estimation APL (très simplifiée)
    if (income <= 2000) {
      return Math.max(0, 300 - (income * 0.1) + (childCount * 50));
    }
    return 0;
  };

  const getConditions = () => [
    'Résider en France de manière stable',
    'Avoir la charge effective de l\'enfant',
    'Respecter les plafonds de ressources',
    'Déclarer tout changement de situation'
  ];

  const getTips = (situation: string, childCount: number) => {
    const tips = [
      'Déclarez vos revenus annuellement à la CAF',
      'Signalez immédiatement tout changement (naissance, déménagement...)',
      'Vérifiez votre droit au complément familial si vous avez 3 enfants ou plus'
    ];
    
    if (situation === 'single') {
      tips.push('En tant que parent isolé, vous pouvez bénéficier d\'aides majorées');
    }
    
    if (childCount >= 3) {
      tips.push('Explorez les aides locales de votre commune ou département');
    }
    
    return tips;
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
              Calculateur Allocations Familiales
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Estimez vos droits aux prestations familiales
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
          {/* Formulaire */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Votre situation familiale
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="children">Nombre d'enfants</Label>
                  <Input
                    id="children"
                    type="number"
                    min="1"
                    max="10"
                    value={numberOfChildren}
                    onChange={(e) => {
                      setNumberOfChildren(e.target.value);
                      const count = parseInt(e.target.value) || 0;
                      setChildrenAges(new Array(count).fill(''));
                    }}
                  />
                </div>
                
                <div>
                  <Label htmlFor="income">Revenus mensuels nets (€)</Label>
                  <Input
                    id="income"
                    type="number"
                    placeholder="2500"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label>Situation familiale</Label>
                  <Select value={familySituation} onValueChange={setFamilySituation}>
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

              {numberOfChildren && parseInt(numberOfChildren) > 0 && (
                <div>
                  <Label className="text-base font-medium mb-3 block">
                    Âges des enfants
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Array.from({ length: parseInt(numberOfChildren) }, (_, index) => (
                      <div key={index}>
                        <Label htmlFor={`age-${index}`}>Enfant {index + 1}</Label>
                        <Input
                          id={`age-${index}`}
                          type="number"
                          min="0"
                          max="25"
                          placeholder="Âge"
                          value={childrenAges[index] || ''}
                          onChange={(e) => updateChildrenAges(index, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button 
                onClick={calculateAllowances}
                disabled={!numberOfChildren || !monthlyIncome || !familySituation}
                className="w-full"
              >
                <Euro className="mr-2 h-4 w-4" />
                Calculer mes allocations
              </Button>
            </CardContent>
          </Card>

          {/* Résultats */}
          {simulation && (
            <div className="space-y-6">
              {/* Total */}
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <TrendingUp className="h-5 w-5" />
                    Total estimé mensuel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    {simulation.total.toFixed(0)}€/mois
                  </div>
                  <p className="text-green-700 mt-2">
                    Soit {(simulation.total * 12).toFixed(0)}€ par an
                  </p>
                </CardContent>
              </Card>

              {/* Détail des allocations */}
              <Card>
                <CardHeader>
                  <CardTitle>Détail des prestations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span>Allocations familiales</span>
                      <Badge variant="outline">{simulation.allocations}€</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span>Compléments et suppléments</span>
                      <Badge variant="outline">{simulation.supplements}€</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span>Allocation rentrée scolaire (mensuelle)</span>
                      <Badge variant="outline">{simulation.schoolAllowance.toFixed(0)}€</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span>Aide au logement (estimation)</span>
                      <Badge variant="outline">{simulation.housingAllowance.toFixed(0)}€</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Conditions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Conditions d'attribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {simulation.conditions.map((condition: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        <span className="text-sm">{condition}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Conseils */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5" />
                    Conseils pour optimiser vos droits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {simulation.tips.map((tip: string, index: number) => (
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
      </div>
    </div>
  );
};

export default FamilyAllowancesTool;
