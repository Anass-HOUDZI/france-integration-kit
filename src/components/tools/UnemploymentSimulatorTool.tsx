
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calculator, TrendingUp, FileText, AlertCircle, Clock, Users } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';

interface UnemploymentSimulatorProps {
  userProfile: any;
  diagnostic: any;
}

const UnemploymentSimulatorTool: React.FC<UnemploymentSimulatorProps> = ({ userProfile }) => {
  const { saveToolData } = useUserProfile();
  const [lastSalary, setLastSalary] = useState('');
  const [workMonths, setWorkMonths] = useState('');
  const [age, setAge] = useState('');
  const [hasChildren, setHasChildren] = useState(false);
  const [isHandicapped, setIsHandicapped] = useState(false);
  const [lastJobType, setLastJobType] = useState('');
  const [quitReason, setQuitReason] = useState('');
  const [results, setResults] = useState<any>(null);

  const calculateRights = () => {
    const salary = parseFloat(lastSalary);
    const months = parseInt(workMonths);
    const userAge = parseInt(age);

    // Calcul ARE
    const dailyReference = (salary * 12) / (365.25 * months) * months;
    const minimumAre = 31.36; // SMIC horaire * 7.5h * 75%
    const maximumAre = 261.54; // Plafond 2024
    
    let dailyAmount = Math.max(
      minimumAre,
      Math.min(maximumAre, dailyReference * 0.75)
    );

    // Durée d'indemnisation selon âge et cotisations
    let maxDuration;
    if (userAge < 53) {
      maxDuration = Math.min(months * 0.8, 24); // Max 24 mois
    } else if (userAge < 55) {
      maxDuration = Math.min(months * 0.8, 30); // Max 30 mois
    } else {
      maxDuration = Math.min(months * 0.8, 36); // Max 36 mois
    }

    // Conditions d'éligibilité
    const isEligible = months >= 6 && quitReason !== 'voluntary_quit';
    
    // Calcul délai de carence
    let waitingPeriod = 0;
    if (quitReason === 'dismissal_with_compensation') {
      waitingPeriod = 7; // 7 jours
    } else if (quitReason === 'end_of_contract') {
      waitingPeriod = 7;
    }

    // Calcul total
    const totalAmount = isEligible ? dailyAmount * maxDuration * 30 : 0;

    // Allocations complémentaires
    const rsa = hasChildren ? 635.7 + (211.9 * 2) : 635.7; // RSA 2024
    const allocationRentree = hasChildren ? 416.4 : 0; // Par enfant 6-18 ans

    const simulation = {
      isEligible,
      dailyAmount: Math.round(dailyAmount * 100) / 100,
      monthlyAmount: Math.round(dailyAmount * 30 * 100) / 100,
      duration: Math.round(maxDuration),
      totalAmount: Math.round(totalAmount),
      waitingPeriod,
      conditions: {
        workMonthsRequired: 6,
        workMonthsActual: months,
        ageCategory: userAge < 53 ? 'Moins de 53 ans' : userAge < 55 ? '53-54 ans' : '55 ans et plus',
        quitReasonValid: quitReason !== 'voluntary_quit'
      },
      complementaryAids: {
        rsa,
        allocationRentree,
        healthInsurance: true,
        transportAid: 75 // Aide transport pole emploi
      },
      nextSteps: generateNextSteps(isEligible, quitReason)
    };

    setResults(simulation);

    saveToolData('unemployment_simulator', {
      lastSalary: salary,
      workMonths: months,
      age: userAge,
      hasChildren,
      isHandicapped,
      lastJobType,
      quitReason,
      simulation,
      createdAt: new Date().toISOString()
    });
  };

  const generateNextSteps = (isEligible: boolean, reason: string) => {
    const steps = [
      'S\'inscrire à Pôle Emploi dans les 72h',
      'Préparer dossier d\'inscription complet',
      'Participer à l\'entretien d\'inscription',
      'Actualiser situation chaque mois'
    ];

    if (!isEligible) {
      steps.unshift('Vérifier conditions d\'éligibilité RSA');
      steps.push('Se rapprocher du service social local');
    }

    if (reason === 'voluntary_quit') {
      steps.push('Préparer justification de démission légitime');
      steps.push('Rassembler preuves (harcèlement, mutation...)');
    }

    return steps;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Simulateur Droits Pôle Emploi
        </h1>
        <p className="text-lg text-gray-600">
          Calculez vos droits aux allocations chômage (ARE)
        </p>
      </div>

      {/* Formulaire */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Vos informations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="lastSalary">Dernier salaire brut mensuel (€)</Label>
              <Input
                id="lastSalary"
                type="number"
                placeholder="2500"
                value={lastSalary}
                onChange={(e) => setLastSalary(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="workMonths">Mois travaillés (24 derniers mois)</Label>
              <Input
                id="workMonths"
                type="number"
                placeholder="18"
                value={workMonths}
                onChange={(e) => setWorkMonths(e.target.value)}
              />
            </div>
            
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
              <Label>Type du dernier emploi</Label>
              <Select value={lastJobType} onValueChange={setLastJobType}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cdi">CDI</SelectItem>
                  <SelectItem value="cdd">CDD</SelectItem>
                  <SelectItem value="interim">Intérim</SelectItem>
                  <SelectItem value="apprenticeship">Apprentissage</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:col-span-2">
              <Label>Motif de fin de contrat</Label>
              <Select value={quitReason} onValueChange={setQuitReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dismissal">Licenciement économique</SelectItem>
                  <SelectItem value="dismissal_with_compensation">Licenciement avec indemnités</SelectItem>
                  <SelectItem value="end_of_contract">Fin de CDD/mission</SelectItem>
                  <SelectItem value="voluntary_quit">Démission</SelectItem>
                  <SelectItem value="mutual_agreement">Rupture conventionnelle</SelectItem>
                  <SelectItem value="trial_period">Fin période d'essai</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">Situation personnelle</Label>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="children" 
                  checked={hasChildren}
                  onCheckedChange={(checked) => setHasChildren(checked === true)}
                />
                <Label htmlFor="children">Avec enfants à charge</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="handicapped" 
                  checked={isHandicapped}
                  onCheckedChange={(checked) => setIsHandicapped(checked === true)}
                />
                <Label htmlFor="handicapped">Reconnaissance handicap</Label>
              </div>
            </div>
          </div>

          <Button 
            onClick={calculateRights}
            disabled={!lastSalary || !workMonths || !age || !quitReason}
            className="w-full"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculer mes droits
          </Button>
        </CardContent>
      </Card>

      {/* Résultats */}
      {results && (
        <div className="space-y-6">
          {/* Éligibilité */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {results.isEligible ? (
                  <CheckSquare className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600" />
                )}
                Résultat de la simulation
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results.isEligible ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2">✅ Vous êtes éligible à l'ARE</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {results.monthlyAmount}€
                        </div>
                        <div className="text-sm text-gray-600">par mois</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {results.duration}
                        </div>
                        <div className="text-sm text-gray-600">mois max</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {results.totalAmount.toLocaleString()}€
                        </div>
                        <div className="text-sm text-gray-600">total max</div>
                      </div>
                    </div>
                  </div>

                  {results.waitingPeriod > 0 && (
                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <h4 className="font-medium text-orange-900">⏱️ Délai de carence</h4>
                      <p className="text-sm text-orange-800">
                        {results.waitingPeriod} jours avant le premier versement
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h3 className="font-semibold text-red-900 mb-2">❌ Vous n'êtes pas éligible à l'ARE</h3>
                  <p className="text-sm text-red-800">
                    Conditions non remplies. Vérifiez le RSA et les aides locales.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Aides complémentaires */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Aides complémentaires possibles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">RSA</h4>
                  <div className="text-xl font-bold text-blue-600">
                    {results.complementaryAids.rsa}€/mois
                  </div>
                  <p className="text-sm text-gray-600">Selon situation familiale</p>
                </div>
                
                {hasChildren && (
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Allocation rentrée</h4>
                    <div className="text-xl font-bold text-blue-600">
                      {results.complementaryAids.allocationRentree}€
                    </div>
                    <p className="text-sm text-gray-600">Par enfant scolarisé</p>
                  </div>
                )}
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Couverture santé</h4>
                  <div className="text-lg font-medium text-green-600">
                    Maintenue
                  </div>
                  <p className="text-sm text-gray-600">Pendant indemnisation</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Aide transport</h4>
                  <div className="text-xl font-bold text-blue-600">
                    {results.complementaryAids.transportAid}€
                  </div>
                  <p className="text-sm text-gray-600">Aide mobilité Pôle Emploi</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prochaines étapes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Prochaines étapes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.nextSteps.map((step: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-sm">{step}</span>
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

export default UnemploymentSimulatorTool;
