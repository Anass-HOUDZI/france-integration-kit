
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calculator, Home, AlertCircle, TrendingUp } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

interface BudgetCalculatorProps {
  userProfile: any;
  diagnostic: any;
}

const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({ userProfile, diagnostic }) => {
  const { t } = useI18n();
  const [income, setIncome] = useState('');
  const [region, setRegion] = useState('');
  const [housingType, setHousingType] = useState('');
  const [roomCount, setRoomCount] = useState('');
  const [calculation, setCalculation] = useState<any>(null);

  const regions = [
    { value: 'paris', label: 'Paris', avgRent: 30 },
    { value: 'idf', label: 'Île-de-France (hors Paris)', avgRent: 20 },
    { value: 'lyon', label: 'Lyon', avgRent: 15 },
    { value: 'marseille', label: 'Marseille', avgRent: 12 },
    { value: 'autres_grandes', label: 'Autres grandes villes', avgRent: 11 },
    { value: 'villes_moyennes', label: 'Villes moyennes', avgRent: 9 },
    { value: 'rural', label: 'Zone rurale', avgRent: 7 }
  ];

  const housingTypes = [
    { value: 'studio', label: 'Studio', multiplier: 1 },
    { value: 'T1', label: 'T1', multiplier: 1.2 },
    { value: 'T2', label: 'T2', multiplier: 1.5 },
    { value: 'T3', label: 'T3', multiplier: 2 },
    { value: 'T4', label: 'T4+', multiplier: 2.5 }
  ];

  const calculateBudget = () => {
    const monthlyIncome = parseFloat(income);
    if (!monthlyIncome || !region || !housingType) return;

    const selectedRegion = regions.find(r => r.value === region);
    const selectedHousing = housingTypes.find(h => h.value === housingType);
    
    if (!selectedRegion || !selectedHousing) return;

    // Calcul du budget logement (33% max recommandé)
    const maxHousingBudget = monthlyIncome * 0.33;
    
    // Estimation du loyer selon la région et type
    const estimatedRent = selectedRegion.avgRent * selectedHousing.multiplier;
    
    // Charges moyennes
    const charges = estimatedRent * 0.15; // 15% du loyer en charges
    const insurance = 20; // Assurance habitation moyenne
    const agencyFees = estimatedRent; // Frais d'agence (1 mois de loyer)
    const securityDeposit = estimatedRent; // Dépôt de garantie
    
    const totalMonthly = estimatedRent + charges + insurance;
    const initialCosts = agencyFees + securityDeposit + estimatedRent; // Premier mois

    // Vérification de faisabilité
    const isAffordable = totalMonthly <= maxHousingBudget;
    const incomeRatio = (totalMonthly / monthlyIncome) * 100;

    setCalculation({
      maxHousingBudget: Math.round(maxHousingBudget),
      estimatedRent: Math.round(estimatedRent),
      charges: Math.round(charges),
      insurance,
      totalMonthly: Math.round(totalMonthly),
      initialCosts: Math.round(initialCosts),
      isAffordable,
      incomeRatio: Math.round(incomeRatio),
      remainingBudget: Math.round(monthlyIncome - totalMonthly),
      region: selectedRegion.label,
      housingType: selectedHousing.label
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Formulaire */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              {t('budget.title')}
            </CardTitle>
            <CardDescription>
              {t('budget.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="income">{t('budget.monthly_income')}</Label>
              <Input
                id="income"
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="3000"
              />
              <p className="text-xs text-gray-600 mt-1">
                {t('budget.income_note')}
              </p>
            </div>

            <div>
              <Label htmlFor="region">{t('budget.region')}</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger>
                  <SelectValue placeholder={t('budget.select_region')} />
                </SelectTrigger>
                <SelectContent>
                  {regions.map(r => (
                    <SelectItem key={r.value} value={r.value}>
                      <div>
                        <div>{r.label}</div>
                        <div className="text-xs text-gray-600">~{r.avgRent}€/m²</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="housingType">{t('budget.housing_type')}</Label>
              <Select value={housingType} onValueChange={setHousingType}>
                <SelectTrigger>
                  <SelectValue placeholder={t('budget.select_type')} />
                </SelectTrigger>
                <SelectContent>
                  {housingTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={calculateBudget} className="w-full" disabled={!income || !region || !housingType}>
              {t('budget.calculate_budget')}
            </Button>
          </CardContent>
        </Card>

        {/* Résultats */}
        <Card>
          <CardHeader>
            <CardTitle>{t('budget.estimation')}</CardTitle>
          </CardHeader>
          <CardContent>
            {calculation ? (
              <div className="space-y-4">
                {/* Budget mensuel */}
                <div className={`p-4 rounded-lg ${calculation.isAffordable ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{t('budget.monthly_total')}</span>
                    <span className="text-xl font-bold">
                      {calculation.totalMonthly} €
                    </span>
                  </div>
                  <div className={`text-sm ${calculation.isAffordable ? 'text-green-700' : 'text-red-700'}`}>
                    {calculation.incomeRatio}% {t('budget.of_income')}
                    {!calculation.isAffordable && ` (⚠️ ${t('budget.too_high')})`}
                  </div>
                </div>

                {/* Détail des coûts */}
                <div>
                  <h4 className="font-medium mb-3">{t('budget.monthly_detail')}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{t('budget.estimated_rent')}</span>
                      <span>{calculation.estimatedRent} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('budget.charges')}</span>
                      <span>{calculation.charges} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('budget.insurance')}</span>
                      <span>{calculation.insurance} €</span>
                    </div>
                  </div>
                </div>

                {/* Coûts initiaux */}
                <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-blue-900">{t('budget.initial_costs')}</span>
                    <span className="font-bold text-blue-900">{calculation.initialCosts} €</span>
                  </div>
                  <p className="text-xs text-blue-700 mt-1">
                    {t('budget.initial_costs_note')}
                  </p>
                </div>

                {/* Budget restant */}
                <div className="pt-3 border-t">
                  <div className="flex justify-between items-center">
                    <span>{t('budget.remaining_budget')}</span>
                    <span className={`font-medium ${calculation.remainingBudget > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {calculation.remainingBudget} €
                    </span>
                  </div>
                </div>

                {/* Conseils */}
                <div className="text-xs text-gray-600 space-y-1">
                  <p>💡 {t('budget.advice')}</p>
                  <p>📍 {t('budget.region')} : {calculation.region}</p>
                  <p>🏠 {t('budget.housing_type')} : {calculation.housingType}</p>
                </div>

                {!calculation.isAffordable && (
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                    <div className="flex items-center gap-2 text-orange-800">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">{t('budget.recommendations')}</span>
                    </div>
                    <ul className="text-sm text-orange-700 mt-1 list-disc list-inside">
                      <li>{t('budget.smaller_housing')}</li>
                      <li>{t('budget.other_regions')}</li>
                      <li>{t('budget.shared_housing')}</li>
                      <li>{t('budget.housing_aid')}</li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <Home className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Remplissez le formulaire pour calculer votre budget</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetCalculator;
