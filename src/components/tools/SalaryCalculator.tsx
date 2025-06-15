import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calculator, Euro, PieChart, Info, TrendingUp } from 'lucide-react';

interface SalaryCalculatorProps {
  userProfile: any;
  diagnostic: any;
}

const SalaryCalculator: React.FC<SalaryCalculatorProps> = ({ userProfile, diagnostic }) => {
  const [salaryData, setSalaryData] = useState({
    grossSalary: '',
    contractType: '',
    region: '',
    dependents: '0',
    transportCosts: ''
  });
  
  const [calculation, setCalculation] = useState<any>(null);

  const contractTypes = [
    { value: 'cdi', label: 'CDI (Contrat à Durée Indéterminée)' },
    { value: 'cdd', label: 'CDD (Contrat à Durée Déterminée)' },
    { value: 'stage', label: 'Stage' },
    { value: 'interim', label: 'Intérim' },
    { value: 'freelance', label: 'Freelance/Indépendant' }
  ];

  const regions = [
    { value: 'ile_de_france', label: 'Île-de-France', taxRate: 0.23 },
    { value: 'provence', label: 'Provence-Alpes-Côte d\'Azur', taxRate: 0.22 },
    { value: 'rhone_alpes', label: 'Auvergne-Rhône-Alpes', taxRate: 0.22 },
    { value: 'other', label: 'Autre région', taxRate: 0.22 }
  ];

  const calculateNetSalary = () => {
    if (!salaryData.grossSalary || !salaryData.contractType) return;

    const grossMonthly = parseFloat(salaryData.grossSalary);
    const grossAnnual = grossMonthly * 12;
    
    // Cotisations sociales (approximatives)
    const socialContributions = {
      healthInsurance: grossMonthly * 0.0075, // Sécurité sociale
      retirement: grossMonthly * 0.1025, // Retraite
      unemployment: grossMonthly * 0.024, // Chômage
      other: grossMonthly * 0.015 // Autres cotisations
    };

    const totalSocialContributions = Object.values(socialContributions).reduce((sum, contrib) => sum + contrib, 0);
    
    // Calcul du net imposable
    const netImposable = grossMonthly - totalSocialContributions;
    
    // CSG/CRDS
    const csgCrds = netImposable * 0.097;
    
    // Salaire net avant impôts
    const netBeforeTax = netImposable - csgCrds;
    
    // Impôt sur le revenu (approximatif)
    const selectedRegion = regions.find(r => r.value === salaryData.region);
    const taxRate = selectedRegion?.taxRate || 0.22;
    const monthlyTax = (grossAnnual > 27000) ? (grossAnnual - 27000) * taxRate / 12 : 0;
    
    // Salaire net final
    const netSalary = netBeforeTax - monthlyTax;
    
    // Transport remboursé (50% par l'employeur)
    const transportCosts = parseFloat(salaryData.transportCosts) || 0;
    const transportReimbursement = transportCosts * 0.5;

    const result = {
      gross: {
        monthly: grossMonthly,
        annual: grossAnnual
      },
      socialContributions,
      totalSocialContributions,
      csgCrds,
      tax: monthlyTax,
      net: {
        monthly: Math.round(netSalary),
        annual: Math.round(netSalary * 12),
        withTransport: Math.round(netSalary + transportReimbursement)
      },
      transportReimbursement,
      takeHomeRate: Math.round((netSalary / grossMonthly) * 100),
      breakdown: {
        socialContributionsRate: Math.round((totalSocialContributions / grossMonthly) * 100),
        csgCrdsRate: Math.round((csgCrds / grossMonthly) * 100),
        taxRate: Math.round((monthlyTax / grossMonthly) * 100)
      }
    };

    setCalculation(result);
  };

  const getSalaryRange = (netSalary: number) => {
    if (netSalary < 1500) return { level: 'entry', label: 'Salaire d\'entrée', color: 'bg-orange-100 text-orange-800' };
    if (netSalary < 2500) return { level: 'junior', label: 'Salaire junior', color: 'bg-blue-100 text-blue-800' };
    if (netSalary < 4000) return { level: 'confirmed', label: 'Salaire confirmé', color: 'bg-green-100 text-green-800' };
    if (netSalary < 6000) return { level: 'senior', label: 'Salaire senior', color: 'bg-purple-100 text-purple-800' };
    return { level: 'expert', label: 'Salaire expert', color: 'bg-indigo-100 text-indigo-800' };
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Calculateur Salaire Net
          </CardTitle>
          <CardDescription>
            Calculez votre salaire net en France avec toutes les charges et cotisations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="grossSalary">Salaire brut mensuel (€)</Label>
              <Input
                id="grossSalary"
                type="number"
                placeholder="3000"
                value={salaryData.grossSalary}
                onChange={(e) => setSalaryData(prev => ({ ...prev, grossSalary: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contractType">Type de contrat</Label>
              <Select 
                value={salaryData.contractType} 
                onValueChange={(value) => setSalaryData(prev => ({ ...prev, contractType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le type de contrat" />
                </SelectTrigger>
                <SelectContent>
                  {contractTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Région</Label>
              <Select 
                value={salaryData.region} 
                onValueChange={(value) => setSalaryData(prev => ({ ...prev, region: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre région" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transportCosts">Frais transport mensuel (€)</Label>
              <Input
                id="transportCosts"
                type="number"
                placeholder="75"
                value={salaryData.transportCosts}
                onChange={(e) => setSalaryData(prev => ({ ...prev, transportCosts: e.target.value }))}
              />
              <p className="text-xs text-gray-600">50% remboursés par l'employeur</p>
            </div>
          </div>

          <Button 
            onClick={calculateNetSalary}
            disabled={!salaryData.grossSalary || !salaryData.contractType}
            className="bg-green-600 hover:bg-green-700"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculer le salaire net
          </Button>
        </CardContent>
      </Card>

      {calculation && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Euro className="h-5 w-5" />
                Résultat du calcul
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {calculation.gross.monthly.toLocaleString()}€
                  </div>
                  <p className="text-sm text-blue-800">Salaire brut mensuel</p>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {calculation.net.monthly.toLocaleString()}€
                  </div>
                  <p className="text-sm text-green-800">Salaire net mensuel</p>
                  <Badge className={getSalaryRange(calculation.net.monthly).color}>
                    {getSalaryRange(calculation.net.monthly).label}
                  </Badge>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {calculation.net.annual.toLocaleString()}€
                  </div>
                  <p className="text-sm text-purple-800">Salaire net annuel</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Taux de prélèvement total</span>
                  <span className="text-lg font-bold text-red-600">
                    {100 - calculation.takeHomeRate}%
                  </span>
                </div>
                <Progress value={calculation.takeHomeRate} className="h-3" />
                <p className="text-sm text-gray-600 text-center">
                  Vous conservez {calculation.takeHomeRate}% de votre salaire brut
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Détail des prélèvements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Cotisations sociales</span>
                  <div className="text-right">
                    <span className="font-medium">{Math.round(calculation.totalSocialContributions)}€</span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({calculation.breakdown.socialContributionsRate}%)
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">CSG/CRDS</span>
                  <div className="text-right">
                    <span className="font-medium">{Math.round(calculation.csgCrds)}€</span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({calculation.breakdown.csgCrdsRate}%)
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Impôt sur le revenu</span>
                  <div className="text-right">
                    <span className="font-medium">{Math.round(calculation.tax)}€</span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({calculation.breakdown.taxRate}%)
                    </span>
                  </div>
                </div>

                {calculation.transportReimbursement > 0 && (
                  <div className="flex justify-between items-center py-2 border-b bg-green-50 px-2 rounded">
                    <span className="text-green-700">Remboursement transport</span>
                    <div className="text-right">
                      <span className="font-medium text-green-700">
                        +{Math.round(calculation.transportReimbursement)}€
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Salaire net à percevoir</span>
                  <span className="text-green-600">
                    {(calculation.transportReimbursement > 0 ? calculation.net.withTransport : calculation.net.monthly).toLocaleString()}€
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Info className="h-5 w-5" />
                Informations importantes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-blue-800">
              <ul className="space-y-2 text-sm">
                <li>• Ce calcul est approximatif et peut varier selon votre situation</li>
                <li>• L'impôt sur le revenu dépend de votre situation familiale</li>
                <li>• Certains avantages (tickets restaurant, mutuelle) ne sont pas inclus</li>
                <li>• Les cotisations peuvent varier selon votre convention collective</li>
                <li>• Consultez un expert-comptable pour un calcul précis</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SalaryCalculator;
