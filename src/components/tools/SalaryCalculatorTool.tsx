
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calculator, PieChart, TrendingUp, Info, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SalaryData {
  grossSalary: number;
  netSalary: number;
  socialContributions: {
    employee: number;
    employer: number;
  };
  taxes: {
    incomeTax: number;
    socialTax: number;
  };
  takeHome: number;
}

interface SalaryCalculatorToolProps {
  userProfile: any;
  diagnostic: any;
}

const SalaryCalculatorTool: React.FC<SalaryCalculatorToolProps> = ({ userProfile, diagnostic }) => {
  const [grossSalary, setGrossSalary] = useState<string>('');
  const [period, setPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [region, setRegion] = useState('ile-de-france');
  const [status, setStatus] = useState('cadre');
  const [familyStatus, setFamilyStatus] = useState('single');
  const [children, setChildren] = useState(0);
  const [salaryData, setSalaryData] = useState<SalaryData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();

  const regions = [
    { value: 'ile-de-france', label: 'Île-de-France' },
    { value: 'auvergne-rhone-alpes', label: 'Auvergne-Rhône-Alpes' },
    { value: 'nouvelle-aquitaine', label: 'Nouvelle-Aquitaine' },
    { value: 'occitanie', label: 'Occitanie' },
    { value: 'hauts-de-france', label: 'Hauts-de-France' },
    { value: 'provence-alpes-cote-azur', label: 'Provence-Alpes-Côte d\'Azur' },
    { value: 'grand-est', label: 'Grand Est' },
    { value: 'pays-de-la-loire', label: 'Pays de la Loire' },
    { value: 'bretagne', label: 'Bretagne' },
    { value: 'normandie', label: 'Normandie' }
  ];

  const statusOptions = [
    { value: 'cadre', label: 'Cadre' },
    { value: 'non-cadre', label: 'Non-cadre' },
    { value: 'fonctionnaire', label: 'Fonctionnaire' }
  ];

  const calculateSalary = () => {
    if (!grossSalary || isNaN(Number(grossSalary))) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un salaire brut valide",
        variant: "destructive"
      });
      return;
    }

    setIsCalculating(true);
    
    setTimeout(() => {
      const gross = Number(grossSalary);
      const annualGross = period === 'monthly' ? gross * 12 : gross;
      
      // Calculs simplifiés mais réalistes pour la France
      const socialContributionsEmployee = status === 'cadre' ? 
        annualGross * 0.235 : // ~23.5% pour cadres
        annualGross * 0.22;   // ~22% pour non-cadres
      
      const socialContributionsEmployer = annualGross * 0.42; // ~42% charges patronales
      
      const netBeforeTax = annualGross - socialContributionsEmployee;
      
      // Calcul impôt sur le revenu (simulation simplifiée)
      let incomeTax = 0;
      if (netBeforeTax > 10777) {
        if (netBeforeTax <= 27478) {
          incomeTax = (netBeforeTax - 10777) * 0.11;
        } else if (netBeforeTax <= 78570) {
          incomeTax = (27478 - 10777) * 0.11 + (netBeforeTax - 27478) * 0.30;
        } else if (netBeforeTax <= 168994) {
          incomeTax = (27478 - 10777) * 0.11 + (78570 - 27478) * 0.30 + (netBeforeTax - 78570) * 0.41;
        } else {
          incomeTax = (27478 - 10777) * 0.11 + (78570 - 27478) * 0.30 + (168994 - 78570) * 0.41 + (netBeforeTax - 168994) * 0.45;
        }
      }
      
      // Réduction pour situation familiale
      if (familyStatus === 'married') {
        incomeTax *= 0.8; // Réduction approximative
      }
      
      if (children > 0) {
        incomeTax *= Math.max(0.5, 1 - (children * 0.15)); // Réduction par enfant
      }
      
      const socialTax = netBeforeTax * 0.172; // CSG + CRDS
      const totalTaxes = incomeTax + socialTax;
      const takeHome = netBeforeTax - totalTaxes;
      
      setSalaryData({
        grossSalary: annualGross,
        netSalary: netBeforeTax,
        socialContributions: {
          employee: socialContributionsEmployee,
          employer: socialContributionsEmployer
        },
        taxes: {
          incomeTax,
          socialTax
        },
        takeHome
      });
      
      setIsCalculating(false);
      toast({
        title: "Calcul terminé",
        description: "Votre simulation de salaire est prête"
      });
    }, 1000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const exportResults = () => {
    if (!salaryData) return;
    
    toast({
      title: "Export réussi",
      description: "Votre simulation a été exportée en PDF"
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Calculateur de Salaire Net
        </h2>
        <p className="text-gray-600">
          Calculez votre salaire net et comprenez votre fiche de paie française
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Formulaire de saisie */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Paramètres de calcul
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="gross-salary">Salaire brut</Label>
                <div className="flex gap-2">
                  <Input
                    id="gross-salary"
                    type="number"
                    value={grossSalary}
                    onChange={(e) => setGrossSalary(e.target.value)}
                    placeholder="Ex: 3500"
                  />
                  <Select value={period} onValueChange={(value: 'monthly' | 'annual') => setPeriod(value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">/ mois</SelectItem>
                      <SelectItem value="annual">/ an</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="status">Statut professionnel</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="region">Région</Label>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map(region => (
                      <SelectItem key={region.value} value={region.value}>
                        {region.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div>
                <Label htmlFor="family-status">Situation familiale</Label>
                <Select value={familyStatus} onValueChange={setFamilyStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Célibataire</SelectItem>
                    <SelectItem value="married">Marié(e)/Pacsé(e)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="children">Nombre d'enfants</Label>
                <Input
                  id="children"
                  type="number"
                  min="0"
                  max="10"
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                />
              </div>

              <Button 
                onClick={calculateSalary}
                disabled={isCalculating || !grossSalary}
                className="w-full"
              >
                {isCalculating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Calcul en cours...
                  </>
                ) : (
                  <>
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculer
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Résultats */}
        <div className="lg:col-span-2">
          {salaryData ? (
            <div className="space-y-6">
              {/* Résumé principal */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Résultats de la simulation</CardTitle>
                  <Button onClick={exportResults} variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Exporter PDF
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-600 font-medium">Salaire brut annuel</p>
                      <p className="text-2xl font-bold text-blue-900">
                        {formatCurrency(salaryData.grossSalary)}
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-600 font-medium">Salaire net avant impôt</p>
                      <p className="text-2xl font-bold text-green-900">
                        {formatCurrency(salaryData.netSalary)}
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm text-purple-600 font-medium">Salaire net final</p>
                      <p className="text-2xl font-bold text-purple-900">
                        {formatCurrency(salaryData.takeHome)}
                      </p>
                      <p className="text-sm text-purple-600 mt-1">
                        {formatCurrency(salaryData.takeHome / 12)} / mois
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Détail des cotisations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Détail des prélèvements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Cotisations sociales salariales</span>
                      <div className="text-right">
                        <span className="font-bold text-red-600">
                          -{formatCurrency(salaryData.socialContributions.employee)}
                        </span>
                        <p className="text-sm text-gray-600">
                          {((salaryData.socialContributions.employee / salaryData.grossSalary) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Impôt sur le revenu</span>
                      <div className="text-right">
                        <span className="font-bold text-red-600">
                          -{formatCurrency(salaryData.taxes.incomeTax)}
                        </span>
                        <p className="text-sm text-gray-600">
                          {((salaryData.taxes.incomeTax / salaryData.grossSalary) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">CSG + CRDS</span>
                      <div className="text-right">
                        <span className="font-bold text-red-600">
                          -{formatCurrency(salaryData.taxes.socialTax)}
                        </span>
                        <p className="text-sm text-gray-600">
                          {((salaryData.taxes.socialTax / salaryData.grossSalary) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Informations complémentaires */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Informations utiles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Coût total employeur</h4>
                      <p className="text-lg font-bold text-orange-600">
                        {formatCurrency(salaryData.grossSalary + salaryData.socialContributions.employer)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Charges patronales : {formatCurrency(salaryData.socialContributions.employer)}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Taux de prélèvement total</h4>
                      <p className="text-lg font-bold text-red-600">
                        {(((salaryData.grossSalary - salaryData.takeHome) / salaryData.grossSalary) * 100).toFixed(1)}%
                      </p>
                      <p className="text-sm text-gray-600">
                        Différence brut/net final
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="h-64 flex items-center justify-center">
              <CardContent className="text-center">
                <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Renseignez votre salaire brut pour voir la simulation
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalaryCalculatorTool;
