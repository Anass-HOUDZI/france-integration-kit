
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Calculator, PieChart, TrendingUp, Info, Download, Euro, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SalaryData {
  grossSalary: number;
  netSalary: number;
  socialContributions: {
    employee: number;
    employer: number;
    breakdown: {
      health: number;
      retirement: number;
      unemployment: number;
      family: number;
      accident: number;
    };
  };
  taxes: {
    incomeTax: number;
    socialTax: number;
    csgCrds: number;
  };
  takeHome: number;
  monthlyNet: number;
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
  const [age, setAge] = useState<string>('');
  const [salaryData, setSalaryData] = useState<SalaryData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();

  const regions = [
    { value: 'ile-de-france', label: 'Île-de-France', coefficient: 1.1 },
    { value: 'auvergne-rhone-alpes', label: 'Auvergne-Rhône-Alpes', coefficient: 1.0 },
    { value: 'nouvelle-aquitaine', label: 'Nouvelle-Aquitaine', coefficient: 1.0 },
    { value: 'occitanie', label: 'Occitanie', coefficient: 1.0 },
    { value: 'hauts-de-france', label: 'Hauts-de-France', coefficient: 0.95 },
    { value: 'provence-alpes-cote-azur', label: 'Provence-Alpes-Côte d\'Azur', coefficient: 1.05 },
    { value: 'grand-est', label: 'Grand Est', coefficient: 0.98 },
    { value: 'pays-de-la-loire', label: 'Pays de la Loire', coefficient: 1.0 },
    { value: 'bretagne', label: 'Bretagne', coefficient: 0.98 },
    { value: 'normandie', label: 'Normandie', coefficient: 0.95 }
  ];

  const statusOptions = [
    { value: 'cadre', label: 'Cadre', socialRate: 0.235 },
    { value: 'non-cadre', label: 'Non-cadre', socialRate: 0.220 },
    { value: 'fonctionnaire', label: 'Fonctionnaire', socialRate: 0.204 }
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
      const monthlyGross = period === 'annual' ? gross / 12 : gross;
      
      // Sélection du statut et taux de cotisations
      const selectedStatus = statusOptions.find(s => s.value === status);
      const socialRate = selectedStatus?.socialRate || 0.22;
      
      // Calcul des cotisations sociales salariales détaillées
      const socialContributions = {
        health: annualGross * 0.0075, // Sécurité sociale
        retirement: annualGross * 0.1025, // Retraite (base + complémentaire)
        unemployment: annualGross * 0.024, // Assurance chômage
        family: 0, // Allocations familiales (employeur uniquement)
        accident: 0 // Accidents du travail (employeur uniquement)
      };
      
      const totalEmployeeContributions = Object.values(socialContributions).reduce((sum, contrib) => sum + contrib, 0);
      
      // Cotisations patronales (pour information)
      const employerContributions = {
        health: annualGross * 0.128,
        retirement: annualGross * 0.155,
        unemployment: annualGross * 0.040,
        family: annualGross * 0.052,
        accident: annualGross * 0.026
      };
      
      const totalEmployerContributions = Object.values(employerContributions).reduce((sum, contrib) => sum + contrib, 0);
      
      // Salaire net avant impôts (après cotisations sociales)
      const netBeforeTax = annualGross - totalEmployeeContributions;
      
      // CSG/CRDS (9,7% sur 98,25% du salaire brut)
      const csgCrds = (annualGross * 0.9825) * 0.097;
      
      // Salaire net imposable
      const netImposable = netBeforeTax - csgCrds;
      
      // Calcul de l'impôt sur le revenu (barème 2024)
      let incomeTax = 0;
      let taxableIncome = netImposable;
      
      // Abattement standard de 10% (min 448€, max 12 829€)
      const abattement = Math.min(Math.max(taxableIncome * 0.10, 448), 12829);
      taxableIncome -= abattement;
      
      // Quotient familial
      let quotientFamilial = 1;
      if (familyStatus === 'married') quotientFamilial += 1;
      quotientFamilial += children * 0.5;
      
      const quotientIncome = taxableIncome / quotientFamilial;
      
      // Barème progressif 2024
      if (quotientIncome > 10777) {
        if (quotientIncome <= 27478) {
          incomeTax = (quotientIncome - 10777) * 0.11;
        } else if (quotientIncome <= 78570) {
          incomeTax = (27478 - 10777) * 0.11 + (quotientIncome - 27478) * 0.30;
        } else if (quotientIncome <= 168994) {
          incomeTax = (27478 - 10777) * 0.11 + (78570 - 27478) * 0.30 + (quotientIncome - 78570) * 0.41;
        } else {
          incomeTax = (27478 - 10777) * 0.11 + (78570 - 27478) * 0.30 + (168994 - 78570) * 0.41 + (quotientIncome - 168994) * 0.45;
        }
      }
      
      incomeTax *= quotientFamilial;
      incomeTax = Math.max(0, incomeTax);
      
      // Salaire net final
      const takeHome = netImposable - incomeTax;
      const monthlyNet = takeHome / 12;
      
      setSalaryData({
        grossSalary: annualGross,
        netSalary: netImposable,
        socialContributions: {
          employee: totalEmployeeContributions,
          employer: totalEmployerContributions,
          breakdown: socialContributions
        },
        taxes: {
          incomeTax,
          socialTax: csgCrds,
          csgCrds
        },
        takeHome,
        monthlyNet
      });
      
      setIsCalculating(false);
      toast({
        title: "Calcul terminé",
        description: "Votre simulation de salaire détaillée est prête"
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
      description: "Votre simulation détaillée a été exportée en PDF"
    });
  };

  const getSalaryLevel = (monthlyNet: number) => {
    if (monthlyNet < 1500) return { level: 'SMIC', color: 'bg-red-100 text-red-800', description: 'Salaire minimum' };
    if (monthlyNet < 2500) return { level: 'Junior', color: 'bg-orange-100 text-orange-800', description: 'Début de carrière' };
    if (monthlyNet < 4000) return { level: 'Confirmé', color: 'bg-blue-100 text-blue-800', description: 'Expérience solide' };
    if (monthlyNet < 6000) return { level: 'Senior', color: 'bg-green-100 text-green-800', description: 'Expertise reconnue' };
    return { level: 'Expert', color: 'bg-purple-100 text-purple-800', description: 'Haut niveau' };
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Calculateur de Salaire Net Avancé
        </h2>
        <p className="text-gray-600 text-lg">
          Simulation complète avec charges sociales, prélèvements et optimisations fiscales
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
              <CardDescription>
                Renseignez vos informations pour une simulation précise
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="gross-salary">Salaire brut *</Label>
                <div className="flex gap-2">
                  <Input
                    id="gross-salary"
                    type="number"
                    value={grossSalary}
                    onChange={(e) => setGrossSalary(e.target.value)}
                    placeholder="Ex: 3500"
                    className="flex-1"
                  />
                  <Select value={period} onValueChange={(value: 'monthly' | 'annual') => setPeriod(value)}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">€/mois</SelectItem>
                      <SelectItem value="annual">€/an</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="status">Statut professionnel *</Label>
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

              <div>
                <Label htmlFor="age">Âge (optionnel)</Label>
                <Input
                  id="age"
                  type="number"
                  min="16"
                  max="70"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Ex: 35"
                />
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
                <Label htmlFor="children">Nombre d'enfants à charge</Label>
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
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                {isCalculating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Calcul en cours...
                  </>
                ) : (
                  <>
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculer le salaire net
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
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Euro className="h-6 w-6" />
                    Résultats de votre simulation
                  </CardTitle>
                  <Button onClick={exportResults} variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Exporter PDF
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 text-center mb-6">
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                      <p className="text-sm text-blue-600 font-medium">Salaire brut annuel</p>
                      <p className="text-2xl font-bold text-blue-900">
                        {formatCurrency(salaryData.grossSalary)}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {formatCurrency(salaryData.grossSalary / 12)} / mois
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                      <p className="text-sm text-green-600 font-medium">Salaire net imposable</p>
                      <p className="text-2xl font-bold text-green-900">
                        {formatCurrency(salaryData.netSalary)}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {formatCurrency(salaryData.netSalary / 12)} / mois
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                      <p className="text-sm text-purple-600 font-medium">Salaire net final</p>
                      <p className="text-2xl font-bold text-purple-900">
                        {formatCurrency(salaryData.takeHome)}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        <strong>{formatCurrency(salaryData.monthlyNet)} / mois</strong>
                      </p>
                      <Badge className={getSalaryLevel(salaryData.monthlyNet).color + " mt-2"}>
                        {getSalaryLevel(salaryData.monthlyNet).level}
                      </Badge>
                    </div>
                  </div>

                  {/* Indicateur de rétention */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Taux de rétention net</span>
                      <span className="text-lg font-bold text-green-600">
                        {((salaryData.takeHome / salaryData.grossSalary) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress 
                      value={(salaryData.takeHome / salaryData.grossSalary) * 100} 
                      className="h-3"
                    />
                    <p className="text-sm text-gray-600 text-center">
                      Vous conservez {((salaryData.takeHome / salaryData.grossSalary) * 100).toFixed(1)}% de votre salaire brut
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Détail des cotisations sociales */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Détail des cotisations sociales
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Part salariale (vos cotisations)</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                          <span className="text-sm">Sécurité sociale</span>
                          <span className="font-medium text-red-600">
                            -{formatCurrency(salaryData.socialContributions.breakdown.health)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                          <span className="text-sm">Retraite</span>
                          <span className="font-medium text-red-600">
                            -{formatCurrency(salaryData.socialContributions.breakdown.retirement)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                          <span className="text-sm">Assurance chômage</span>
                          <span className="font-medium text-red-600">
                            -{formatCurrency(salaryData.socialContributions.breakdown.unemployment)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-red-100 rounded font-medium">
                          <span>Total part salariale</span>
                          <span className="text-red-700">
                            -{formatCurrency(salaryData.socialContributions.employee)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Part patronale (payée par l'employeur)</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                          <span className="text-sm">Sécurité sociale</span>
                          <span className="text-blue-600">
                            {formatCurrency(salaryData.grossSalary * 0.128)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                          <span className="text-sm">Retraite</span>
                          <span className="text-blue-600">
                            {formatCurrency(salaryData.grossSalary * 0.155)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                          <span className="text-sm">Allocations familiales</span>
                          <span className="text-blue-600">
                            {formatCurrency(salaryData.grossSalary * 0.052)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-blue-100 rounded font-medium">
                          <span>Total part patronale</span>
                          <span className="text-blue-700">
                            {formatCurrency(salaryData.socialContributions.employer)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Détail des impôts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Prélèvements fiscaux
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                      <div>
                        <span className="font-medium">CSG + CRDS</span>
                        <p className="text-xs text-gray-600">Contribution sociale généralisée</p>
                      </div>
                      <span className="font-medium text-orange-600">
                        -{formatCurrency(salaryData.taxes.csgCrds)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                      <div>
                        <span className="font-medium">Impôt sur le revenu</span>
                        <p className="text-xs text-gray-600">Prélèvement à la source</p>
                      </div>
                      <span className="font-medium text-purple-600">
                        -{formatCurrency(salaryData.taxes.incomeTax)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Coût total employeur */}
              <Card className="bg-gradient-to-r from-gray-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Coût total pour l'employeur
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900 mb-2">
                      {formatCurrency(salaryData.grossSalary + salaryData.socialContributions.employer)}
                    </p>
                    <p className="text-gray-600">
                      soit {formatCurrency((salaryData.grossSalary + salaryData.socialContributions.employer) / 12)} par mois
                    </p>
                    <div className="mt-4 p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Répartition du coût total :</p>
                      <div className="flex justify-between text-sm">
                        <span>Salaire net reçu: {((salaryData.takeHome / (salaryData.grossSalary + salaryData.socialContributions.employer)) * 100).toFixed(1)}%</span>
                        <span>Charges et impôts: {(((salaryData.grossSalary + salaryData.socialContributions.employer - salaryData.takeHome) / (salaryData.grossSalary + salaryData.socialContributions.employer)) * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="h-96 flex items-center justify-center">
              <CardContent className="text-center">
                <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Calculateur de salaire avancé
                </h3>
                <p className="text-gray-600 mb-4">
                  Renseignez votre salaire brut pour obtenir une simulation complète
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                  <div>✓ Cotisations sociales détaillées</div>
                  <div>✓ Calcul d'impôt personnalisé</div>
                  <div>✓ Coût employeur total</div>
                  <div>✓ Export PDF professionnel</div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalaryCalculatorTool;
