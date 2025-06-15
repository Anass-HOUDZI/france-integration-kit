
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Calculator, Home, Euro, PieChart, AlertTriangle, CheckCircle } from 'lucide-react';

interface BudgetCalculatorProps {
  userProfile: any;
  diagnostic: any;
}

const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({ userProfile, diagnostic }) => {
  const [income, setIncome] = useState('');
  const [incomeType, setIncomeType] = useState('net');
  const [city, setCity] = useState('');
  const [housingType, setHousingType] = useState('');
  const [budget, setBudget] = useState<any>(null);

  const cities = [
    { value: 'paris', label: 'Paris', multiplier: 1.5, avgRent: 1200 },
    { value: 'lyon', label: 'Lyon', multiplier: 1.2, avgRent: 800 },
    { value: 'marseille', label: 'Marseille', multiplier: 1.1, avgRent: 700 },
    { value: 'toulouse', label: 'Toulouse', multiplier: 1.1, avgRent: 650 },
    { value: 'nice', label: 'Nice', multiplier: 1.3, avgRent: 900 },
    { value: 'nantes', label: 'Nantes', multiplier: 1.0, avgRent: 600 },
    { value: 'strasbourg', label: 'Strasbourg', multiplier: 1.0, avgRent: 550 },
    { value: 'montpellier', label: 'Montpellier', multiplier: 1.0, avgRent: 600 },
    { value: 'bordeaux', label: 'Bordeaux', multiplier: 1.1, avgRent: 650 },
    { value: 'lille', label: 'Lille', multiplier: 0.9, avgRent: 500 },
    { value: 'autre', label: 'Autre ville', multiplier: 0.9, avgRent: 500 }
  ];

  const housingTypes = [
    { value: 'studio', label: 'Studio', factor: 0.8 },
    { value: 'f1', label: 'F1 (1 pièce)', factor: 0.9 },
    { value: 'f2', label: 'F2 (2 pièces)', factor: 1.0 },
    { value: 'f3', label: 'F3 (3 pièces)', factor: 1.3 },
    { value: 'f4', label: 'F4 (4 pièces)', factor: 1.6 },
    { value: 'colocation', label: 'Colocation', factor: 0.6 }
  ];

  const calculateBudget = () => {
    if (!income || !city || !housingType) return;

    const monthlyIncome = parseFloat(income);
    const cityData = cities.find(c => c.value === city);
    const housingData = housingTypes.find(h => h.value === housingType);
    
    if (!cityData || !housingData) return;

    // Calculate recommended housing budget (30-33% of income)
    const recommendedHousingBudget = Math.round(monthlyIncome * 0.33);
    
    // Calculate estimated rent based on city and housing type
    const estimatedRent = Math.round(cityData.avgRent * housingData.factor);
    
    // Calculate other expenses
    const expenses = {
      housing: recommendedHousingBudget,
      food: Math.round(monthlyIncome * 0.15),
      transport: Math.round(monthlyIncome * 0.10),
      health: Math.round(monthlyIncome * 0.08),
      utilities: Math.round(monthlyIncome * 0.07),
      other: Math.round(monthlyIncome * 0.15)
    };

    const totalExpenses = Object.values(expenses).reduce((sum, exp) => sum + exp, 0);
    const remainingBudget = monthlyIncome - totalExpenses;

    const affordability = estimatedRent <= recommendedHousingBudget ? 'good' : 
                         estimatedRent <= recommendedHousingBudget * 1.2 ? 'careful' : 'difficult';

    setBudget({
      monthlyIncome,
      expenses,
      totalExpenses,
      remainingBudget,
      recommendedHousingBudget,
      estimatedRent,
      affordability,
      cityData,
      housingData
    });
  };

  const getAffordabilityColor = (affordability: string) => {
    switch (affordability) {
      case 'good': return 'text-green-600';
      case 'careful': return 'text-orange-600';
      case 'difficult': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getAffordabilityIcon = (affordability: string) => {
    switch (affordability) {
      case 'good': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'careful': return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      case 'difficult': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Calculateur Budget Logement
          </CardTitle>
          <CardDescription>
            Calculez votre budget logement optimal selon vos revenus et la ville
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="income">Revenus mensuels</Label>
              <div className="flex gap-2">
                <Input
                  id="income"
                  type="number"
                  placeholder="3000"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                />
                <Select value={incomeType} onValueChange={setIncomeType}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="net">Net</SelectItem>
                    <SelectItem value="brut">Brut</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Ville</Label>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre ville" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((cityOption) => (
                    <SelectItem key={cityOption.value} value={cityOption.value}>
                      {cityOption.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="housingType">Type de logement recherché</Label>
              <Select value={housingType} onValueChange={setHousingType}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le type de logement" />
                </SelectTrigger>
                <SelectContent>
                  {housingTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={calculateBudget} 
            disabled={!income || !city || !housingType}
            className="bg-green-600 hover:bg-green-700"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculer mon budget
          </Button>
        </CardContent>
      </Card>

      {budget && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5 text-green-600" />
                Analyse de votre budget logement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {budget.recommendedHousingBudget}€
                  </div>
                  <p className="text-sm text-blue-800">Budget logement recommandé</p>
                  <p className="text-xs text-blue-600">(33% de vos revenus)</p>
                </div>

                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {budget.estimatedRent}€
                  </div>
                  <p className="text-sm text-orange-800">Loyer estimé</p>
                  <p className="text-xs text-orange-600">{budget.housingData.label} à {budget.cityData.label}</p>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {budget.remainingBudget}€
                  </div>
                  <p className="text-sm text-green-800">Budget restant</p>
                  <p className="text-xs text-green-600">Après toutes charges</p>
                </div>
              </div>

              <div className={`p-4 rounded-lg border ${
                budget.affordability === 'good' ? 'bg-green-50 border-green-200' :
                budget.affordability === 'careful' ? 'bg-orange-50 border-orange-200' :
                'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {getAffordabilityIcon(budget.affordability)}
                  <span className={`font-medium ${getAffordabilityColor(budget.affordability)}`}>
                    {budget.affordability === 'good' ? 'Budget confortable' :
                     budget.affordability === 'careful' ? 'Budget serré mais faisable' :
                     'Budget difficile'}
                  </span>
                </div>
                <p className={`text-sm ${getAffordabilityColor(budget.affordability)}`}>
                  {budget.affordability === 'good' ? 
                    'Vos revenus permettent confortablement ce type de logement dans cette ville.' :
                   budget.affordability === 'careful' ? 
                    'Ce logement représente un budget important. Vérifiez bien vos autres charges.' :
                    'Ce logement dépasse votre budget recommandé. Considérez d\'autres options.'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Répartition budgétaire recommandée
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(budget.expenses).map(([category, amount]) => {
                  const percentage = Math.round((amount / budget.monthlyIncome) * 100);
                  const categoryLabels: Record<string, string> = {
                    housing: 'Logement (loyer + charges)',
                    food: 'Alimentation',
                    transport: 'Transport',
                    health: 'Santé',
                    utilities: 'Services (téléphone, internet)',
                    other: 'Loisirs & divers'
                  };

                  return (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{categoryLabels[category]}</span>
                        <span className="text-sm text-gray-600">{amount}€ ({percentage}%)</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total dépenses</span>
                  <span>{budget.totalExpenses}€</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600 mt-1">
                  <span>Revenus</span>
                  <span>{budget.monthlyIncome}€</span>
                </div>
                <div className={`flex justify-between items-center font-medium mt-2 ${
                  budget.remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  <span>Reste disponible</span>
                  <span>{budget.remainingBudget}€</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BudgetCalculator;
