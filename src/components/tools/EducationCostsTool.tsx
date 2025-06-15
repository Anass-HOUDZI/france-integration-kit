
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { PiggyBank, Calculator, Euro, TrendingDown, Gift, AlertCircle } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';

interface EducationCostsProps {
  userProfile: any;
  diagnostic: any;
}

const EducationCostsTool: React.FC<EducationCostsProps> = ({ userProfile }) => {
  const { saveToolData } = useUserProfile();
  const [studyLevel, setStudyLevel] = useState('');
  const [institutionType, setInstitutionType] = useState('');
  const [location, setLocation] = useState('');
  const [familyIncome, setFamilyIncome] = useState('');
  const [expenses, setExpenses] = useState<string[]>([]);
  const [calculation, setCalculation] = useState<any>(null);

  const levels = [
    { id: 'lycee', name: 'Lycée' },
    { id: 'bts_dut', name: 'BTS/DUT' },
    { id: 'licence', name: 'Licence (Bac+3)' },
    { id: 'master', name: 'Master (Bac+5)' },
    { id: 'doctorat', name: 'Doctorat' },
    { id: 'grande_ecole', name: 'Grande École' }
  ];

  const institutions = [
    { id: 'public', name: 'Public', multiplier: 1 },
    { id: 'prive_sous_contrat', name: 'Privé sous contrat', multiplier: 1.5 },
    { id: 'prive_hors_contrat', name: 'Privé hors contrat', multiplier: 3 },
    { id: 'ecole_commerce', name: 'École de commerce', multiplier: 15 },
    { id: 'ecole_ingenieur', name: 'École d\'ingénieur privée', multiplier: 8 }
  ];

  const locations = [
    { id: 'paris', name: 'Paris', factor: 1.4 },
    { id: 'grande_ville', name: 'Grande ville', factor: 1.2 },
    { id: 'ville_moyenne', name: 'Ville moyenne', factor: 1.0 },
    { id: 'petite_ville', name: 'Petite ville', factor: 0.8 }
  ];

  const expenseTypes = [
    'Logement étudiant',
    'Alimentation',
    'Transport',
    'Fournitures scolaires',
    'Livres et matériel',
    'Activités et loisirs',
    'Assurance étudiant',
    'Santé et mutuelle'
  ];

  const toggleExpense = (expense: string) => {
    setExpenses(prev =>
      prev.includes(expense)
        ? prev.filter(e => e !== expense)
        : [...prev, expense]
    );
  };

  const calculateCosts = () => {
    const income = parseInt(familyIncome);
    const locationData = locations.find(l => l.id === location);
    const institutionData = institutions.find(i => i.id === institutionType);

    if (!studyLevel || !institutionType || !location || !familyIncome) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const calculation = {
      tuitionFees: calculateTuitionFees(studyLevel, institutionData),
      livingCosts: calculateLivingCosts(expenses, locationData),
      scholarships: calculateScholarships(income, studyLevel),
      aids: calculateAids(income, studyLevel, institutionType),
      totalAnnual: 0,
      totalMonthly: 0,
      netCost: 0,
      financingOptions: getFinancingOptions(income, studyLevel),
      tips: getTips(studyLevel, institutionType, income)
    };

    calculation.totalAnnual = calculation.tuitionFees + calculation.livingCosts.total;
    calculation.totalMonthly = calculation.totalAnnual / 12;
    calculation.netCost = calculation.totalAnnual - calculation.scholarships.total - calculation.aids.total;

    setCalculation(calculation);
    
    saveToolData('education_costs', {
      studyLevel,
      institutionType,
      location,
      familyIncome: income,
      expenses,
      calculation,
      createdAt: new Date().toISOString()
    });
  };

  const calculateTuitionFees = (level: string, institution: any) => {
    const baseFees = {
      lycee: 0,
      bts_dut: 170,
      licence: 170,
      master: 243,
      doctorat: 380,
      grande_ecole: 3000
    };

    const base = baseFees[level as keyof typeof baseFees] || 0;
    return Math.round(base * (institution?.multiplier || 1));
  };

  const calculateLivingCosts = (selectedExpenses: string[], locationData: any) => {
    const baseCosts = {
      'Logement étudiant': 500,
      'Alimentation': 300,
      'Transport': 80,
      'Fournitures scolaires': 30,
      'Livres et matériel': 100,
      'Activités et loisirs': 150,
      'Assurance étudiant': 25,
      'Santé et mutuelle': 50
    };

    let total = 0;
    const details: { [key: string]: number } = {};

    selectedExpenses.forEach(expense => {
      const cost = Math.round((baseCosts[expense as keyof typeof baseCosts] || 0) * (locationData?.factor || 1));
      details[expense] = cost;
      total += cost;
    });

    return {
      details,
      total: total * 10, // 10 mois d'études
      monthly: total
    };
  };

  const calculateScholarships = (income: number, level: string) => {
    const scholarships = [];
    let total = 0;

    // Bourse sur critères sociaux
    if (income <= 33100) {
      const amounts = [1032, 1562, 2239, 2757, 3138, 3918, 4505, 5736];
      const echelon = Math.min(Math.floor((33100 - income) / 4000), 7);
      const amount = amounts[echelon] || 0;
      scholarships.push({ name: 'Bourse sur critères sociaux', amount });
      total += amount;
    }

    // Aide au mérite
    if (level === 'licence' && income <= 33100) {
      scholarships.push({ name: 'Aide au mérite', amount: 900 });
      total += 900;
    }

    // Aide à la mobilité
    if (level !== 'lycee') {
      scholarships.push({ name: 'Aide à la mobilité', amount: 1000 });
      total += 1000;
    }

    return { scholarships, total };
  };

  const calculateAids = (income: number, level: string, institutionType: string) => {
    const aids = [];
    let total = 0;

    // APL logement
    if (income <= 2500) {
      const aplAmount = Math.max(0, 250 - (income * 0.05)) * 10;
      aids.push({ name: 'APL logement', amount: Math.round(aplAmount) });
      total += Math.round(aplAmount);
    }

    // Réduction transport
    if (level !== 'lycee') {
      aids.push({ name: 'Réduction transport étudiant', amount: 200 });
      total += 200;
    }

    // Aides municipales (estimation)
    aids.push({ name: 'Aides municipales (estimation)', amount: 300 });
    total += 300;

    return { aids, total };
  };

  const getFinancingOptions = (income: number, level: string) => {
    const options = [];

    if (income < 2000) {
      options.push('Job étudiant (10-15h/semaine max)');
      options.push('Prêt étudiant garanti par l\'État');
    }

    if (level === 'master' || level === 'grande_ecole') {
      options.push('Alternance (salaire + prise en charge frais)');
      options.push('Stage rémunéré obligatoire');
    }

    options.push('Aide familiale');
    options.push('Fondations et bourses privées');

    return options;
  };

  const getTips = (level: string, institutionType: string, income: number) => {
    const tips = [
      'Déposez votre dossier de bourse avant le 31 mai',
      'Vérifiez les aides spécifiques de votre région',
      'Explorez les résidences universitaires (plus économiques)'
    ];

    if (income < 3000) {
      tips.push('Demandez une exonération des frais d\'inscription si vous êtes boursier');
    }

    if (institutionType === 'prive_hors_contrat' || institutionType === 'ecole_commerce') {
      tips.push('Négociez un échéancier de paiement avec l\'établissement');
    }

    if (level === 'master' || level === 'grande_ecole') {
      tips.push('Privilégiez l\'alternance pour financer vos études');
    }

    return tips;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Calculateur Frais Scolarité
        </h1>
        <p className="text-lg text-gray-600">
          Estimez le coût de vos études et découvrez les aides disponibles
        </p>
      </div>

      {/* Formulaire */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Votre projet d'études
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Niveau d'études</Label>
              <Select value={studyLevel} onValueChange={setStudyLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le niveau" />
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
              <Label>Type d'établissement</Label>
              <Select value={institutionType} onValueChange={setInstitutionType}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le type" />
                </SelectTrigger>
                <SelectContent>
                  {institutions.map(inst => (
                    <SelectItem key={inst.id} value={inst.id}>
                      {inst.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Zone géographique</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez la zone" />
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
            
            <div>
              <Label htmlFor="income">Revenus familiaux annuels (€)</Label>
              <Input
                id="income"
                type="number"
                placeholder="30000"
                value={familyIncome}
                onChange={(e) => setFamilyIncome(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label className="text-base font-medium mb-3 block">
              Postes de dépenses à inclure
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {expenseTypes.map(expense => (
                <div key={expense} className="flex items-center space-x-2">
                  <Checkbox
                    id={expense}
                    checked={expenses.includes(expense)}
                    onCheckedChange={() => toggleExpense(expense)}
                  />
                  <Label htmlFor={expense} className="text-sm">
                    {expense}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button 
            onClick={calculateCosts}
            disabled={!studyLevel || !institutionType || !location || !familyIncome}
            className="w-full"
          >
            <PiggyBank className="mr-2 h-4 w-4" />
            Calculer le coût total
          </Button>
        </CardContent>
      </Card>

      {/* Résultats */}
      {calculation && (
        <div className="space-y-6">
          {/* Résumé coûts */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800">Estimation annuelle</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-sm text-gray-600">Coût brut</div>
                  <div className="text-2xl font-bold">{calculation.totalAnnual}€</div>
                  <div className="text-sm text-gray-500">{calculation.totalMonthly.toFixed(0)}€/mois</div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm text-gray-600">Aides possibles</div>
                  <div className="text-2xl font-bold text-green-600">
                    -{(calculation.scholarships.total + calculation.aids.total)}€
                  </div>
                  <div className="text-sm text-gray-500">Bourses et aides</div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm text-gray-600">Coût net estimé</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.max(0, calculation.netCost)}€
                  </div>
                  <div className="text-sm text-gray-500">
                    {Math.max(0, calculation.netCost / 12).toFixed(0)}€/mois
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Détail frais de scolarité */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Euro className="h-5 w-5" />
                Détail des coûts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>Frais de scolarité</span>
                  <Badge variant="outline">{calculation.tuitionFees}€</Badge>
                </div>
                
                {Object.entries(calculation.livingCosts.details).map(([expense, cost]) => (
                  <div key={expense} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>{expense}</span>
                    <Badge variant="outline">{cost}€</Badge>
                  </div>
                ))}
                
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded border-t-2 border-blue-200">
                  <span className="font-medium">Total annuel</span>
                  <Badge className="bg-blue-200 text-blue-800">{calculation.totalAnnual}€</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bourses et aides */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Bourses disponibles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {calculation.scholarships.scholarships.map((scholarship: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span className="text-sm">{scholarship.name}</span>
                      <Badge className="bg-green-200 text-green-800">{scholarship.amount}€</Badge>
                    </div>
                  ))}
                  {calculation.scholarships.scholarships.length === 0 && (
                    <p className="text-sm text-gray-500">Aucune bourse disponible selon vos critères</p>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5" />
                  Autres aides
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {calculation.aids.aids.map((aid: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                      <span className="text-sm">{aid.name}</span>
                      <Badge className="bg-yellow-200 text-yellow-800">{aid.amount}€</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Options de financement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PiggyBank className="h-5 w-5" />
                Options de financement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {calculation.financingOptions.map((option: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 p-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span className="text-sm">{option}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Conseils */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Conseils pour optimiser votre budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {calculation.tips.map((tip: string, index: number) => (
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

export default EducationCostsTool;
