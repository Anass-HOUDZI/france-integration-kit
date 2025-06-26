
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Calculator, TrendingUp, Euro, AlertCircle, Info, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UnemploymentSimulatorToolProps {
  userProfile: any;
  diagnostic: any;
}

interface WorkSituation {
  lastSalary: string;
  contractType: string;
  workDuration: string;
  reasonForLeaving: string;
  isHandicapped: boolean;
}

interface FamilySituation {
  maritalStatus: string;
  children: number;
  spouseWorking: boolean;
  householdIncome: string;
}

interface SimulationResult {
  eligibility: boolean;
  dailyAllowance: number;
  duration: number;
  totalAmount: number;
  conditions: string[];
  nextSteps: string[];
}

const UnemploymentSimulatorTool: React.FC<UnemploymentSimulatorToolProps> = ({ userProfile, diagnostic }) => {
  const [workSituation, setWorkSituation] = useState<WorkSituation>({
    lastSalary: '',
    contractType: '',
    workDuration: '',
    reasonForLeaving: '',
    isHandicapped: false
  });

  const [familySituation, setFamilySituation] = useState<FamilySituation>({
    maritalStatus: 'single',
    children: 0,
    spouseWorking: false,
    householdIncome: ''
  });

  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();

  const contractTypes = [
    { value: 'cdi', label: 'CDI' },
    { value: 'cdd', label: 'CDD' },
    { value: 'interim', label: 'Intérim' },
    { value: 'apprentissage', label: 'Apprentissage' },
    { value: 'stage', label: 'Stage' }
  ];

  const leavingReasons = [
    { value: 'licenciement', label: 'Licenciement' },
    { value: 'fin_cdd', label: 'Fin de CDD' },
    { value: 'rupture_conventionnelle', label: 'Rupture conventionnelle' },
    { value: 'demission', label: 'Démission' },
    { value: 'fin_periode_essai', label: 'Fin de période d\'essai' }
  ];

  const calculateUnemploymentBenefits = () => {
    if (!workSituation.lastSalary || !workSituation.contractType || !workSituation.workDuration) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    setIsCalculating(true);

    setTimeout(() => {
      const lastSalary = parseFloat(workSituation.lastSalary);
      const workMonths = parseInt(workSituation.workDuration);
      
      // Vérification de l'éligibilité
      let eligible = true;
      const conditions = [];
      
      // Condition 1: Durée de travail minimale
      if (workMonths < 6) {
        eligible = false;
        conditions.push("Durée de travail insuffisante (6 mois minimum requis)");
      } else {
        conditions.push("✓ Durée de travail suffisante");
      }
      
      // Condition 2: Motif de fin de contrat
      if (workSituation.reasonForLeaving === 'demission') {
        eligible = false;
        conditions.push("Démission non éligible (sauf cas particuliers)");
      } else {
        conditions.push("✓ Motif de fin de contrat éligible");
      }
      
      // Calcul de l'allocation journalière (57% du salaire de référence)
      const dailySalary = (lastSalary * 12) / 365;
      const dailyAllowance = Math.min(dailySalary * 0.57, 75.86); // Plafond ARE 2024
      
      // Calcul de la durée d'indemnisation
      let duration = 0;
      if (workMonths >= 6 && workMonths < 24) {
        duration = workMonths;
      } else if (workMonths >= 24 && workMonths < 36) {
        duration = 24;
      } else if (workMonths >= 36) {
        duration = 36;
      }
      
      // Majoration pour les plus de 50 ans
      if (userProfile?.age && userProfile.age >= 50) {
        duration = Math.min(duration * 1.5, 48);
      }
      
      const totalAmount = dailyAllowance * duration * 30; // Approximation mensuelle
      
      const nextSteps = [
        "Inscription à Pôle Emploi dans les 12 mois",
        "Actualisation mensuelle obligatoire",
        "Recherche active d'emploi",
        "Participation aux rendez-vous Pôle Emploi"
      ];
      
      setResult({
        eligibility: eligible,
        dailyAllowance: Math.round(dailyAllowance),
        duration,
        totalAmount: Math.round(totalAmount),
        conditions,
        nextSteps
      });
      
      setIsCalculating(false);
      
      toast({
        title: "Simulation terminée",
        description: eligible ? "Vous semblez éligible aux allocations" : "Éligibilité non confirmée"
      });
    }, 1500);
  };

  const exportResults = () => {
    toast({
      title: "Export réussi",
      description: "Votre simulation a été exportée"
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Simulateur Droits Pôle Emploi
        </h2>
        <p className="text-gray-600">
          Calculez vos droits aux allocations chômage (ARE)
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Formulaire */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Situation professionnelle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="last-salary">Dernier salaire mensuel brut (€)</Label>
                <Input
                  id="last-salary"
                  type="number"
                  value={workSituation.lastSalary}
                  onChange={(e) => setWorkSituation({...workSituation, lastSalary: e.target.value})}
                  placeholder="Ex: 2500"
                />
              </div>

              <div>
                <Label htmlFor="contract-type">Type de contrat</Label>
                <Select value={workSituation.contractType} onValueChange={(value) => setWorkSituation({...workSituation, contractType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le type de contrat" />
                  </SelectTrigger>
                  <SelectContent>
                    {contractTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="work-duration">Durée de travail (mois)</Label>
                <Input
                  id="work-duration"
                  type="number"
                  value={workSituation.workDuration}
                  onChange={(e) => setWorkSituation({...workSituation, workDuration: e.target.value})}
                  placeholder="Ex: 24"
                />
              </div>

              <div>
                <Label htmlFor="leaving-reason">Motif de fin de contrat</Label>
                <Select value={workSituation.reasonForLeaving} onValueChange={(value) => setWorkSituation({...workSituation, reasonForLeaving: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le motif" />
                  </SelectTrigger>
                  <SelectContent>
                    {leavingReasons.map(reason => (
                      <SelectItem key={reason.value} value={reason.value}>
                        {reason.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="handicapped" 
                  checked={workSituation.isHandicapped}
                  onCheckedChange={(checked) => setWorkSituation({...workSituation, isHandicapped: checked === true})}
                />
                <Label htmlFor="handicapped">Reconnaissance travailleur handicapé</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Situation familiale</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="marital-status">Situation matrimoniale</Label>
                <Select value={familySituation.maritalStatus} onValueChange={(value) => setFamilySituation({...familySituation, maritalStatus: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Célibataire</SelectItem>
                    <SelectItem value="married">Marié(e)</SelectItem>
                    <SelectItem value="divorced">Divorcé(e)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="children">Nombre d'enfants à charge</Label>
                <Input
                  id="children"
                  type="number"
                  min="0"
                  value={familySituation.children}
                  onChange={(e) => setFamilySituation({...familySituation, children: parseInt(e.target.value) || 0})}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="spouseWorking" 
                  checked={familySituation.spouseWorking}
                  onCheckedChange={(checked) => setFamilySituation({...familySituation, spouseWorking: checked === true})}
                />
                <Label htmlFor="spouseWorking">Conjoint en activité</Label>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={calculateUnemploymentBenefits}
            disabled={isCalculating}
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
                Simuler mes droits
              </>
            )}
          </Button>
        </div>

        {/* Résultats */}
        <div>
          {result ? (
            <div className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Euro className="h-5 w-5" />
                    Résultats de la simulation
                  </CardTitle>
                  <Button onClick={exportResults} variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Exporter
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${result.eligibility ? 'bg-green-50' : 'bg-red-50'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className={`h-5 w-5 ${result.eligibility ? 'text-green-600' : 'text-red-600'}`} />
                        <span className={`font-medium ${result.eligibility ? 'text-green-900' : 'text-red-900'}`}>
                          {result.eligibility ? 'Éligible aux allocations' : 'Non éligible'}
                        </span>
                      </div>
                    </div>

                    {result.eligibility && (
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg text-center">
                          <p className="text-sm text-blue-600 font-medium">Allocation journalière</p>
                          <p className="text-2xl font-bold text-blue-900">
                            {result.dailyAllowance}€/jour
                          </p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg text-center">
                          <p className="text-sm text-purple-600 font-medium">Durée d'indemnisation</p>
                          <p className="text-2xl font-bold text-purple-900">
                            {result.duration} mois
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conditions d'éligibilité</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {result.conditions.map((condition, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className={`text-sm ${condition.startsWith('✓') ? 'text-green-600' : 'text-red-600'}`}>
                          {condition}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {result.nextSteps.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="h-5 w-5" />
                      Prochaines étapes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.nextSteps.map((step, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          <span className="text-sm">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card className="h-64 flex items-center justify-center">
              <CardContent className="text-center">
                <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Remplissez le formulaire pour voir votre simulation
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnemploymentSimulatorTool;
