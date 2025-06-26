import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calculator, TrendingUp, FileText, AlertCircle, Clock, Users, CheckSquare, Download, Calendar, Euro, Phone, MapPin, Info } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useToast } from '@/hooks/use-toast';

interface UnemploymentSimulatorProps {
  userProfile: any;
  diagnostic: any;
}

const UnemploymentSimulatorTool: React.FC<UnemploymentSimulatorProps> = ({ userProfile }) => {
  const { saveToolData } = useUserProfile();
  const { toast } = useToast();

  // Données personnelles
  const [personalInfo, setPersonalInfo] = useState({
    lastName: '',
    firstName: '',
    birthDate: '',
    nationality: 'french',
    address: '',
    phone: '',
    email: ''
  });

  // Situation professionnelle
  const [workSituation, setWorkSituation] = useState({
    lastSalary: '',
    workMonths: '',
    age: '',
    hasChildren: false,
    childrenCount: '0',
    isHandicapped: false,
    lastJobType: '',
    quitReason: '',
    dismissalDate: '',
    previousJobs: []
  });

  // Situation familiale et sociale
  const [familySituation, setFamilySituation] = useState({
    maritalStatus: 'single',
    spouseWorking: false,
    spouseIncome: '',
    dependentChildren: '0',
    housingType: 'rent',
    monthlyRent: '',
    region: ''
  });

  const [results, setResults] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [simulationHistory, setSimulationHistory] = useState<any[]>([]);

  const departments = [
    { code: '75', name: 'Paris' },
    { code: '69', name: 'Rhône' },
    { code: '13', name: 'Bouches-du-Rhône' },
    { code: '59', name: 'Nord' },
    { code: '31', name: 'Haute-Garonne' },
    { code: '44', name: 'Loire-Atlantique' },
    { code: '33', name: 'Gironde' },
    { code: '67', name: 'Bas-Rhin' },
    { code: '06', name: 'Alpes-Maritimes' },
    { code: '83', name: 'Var' }
  ];

  const calculateDetailedRights = () => {
    const salary = parseFloat(workSituation.lastSalary);
    const months = parseInt(workSituation.workMonths);
    const userAge = parseInt(workSituation.age);
    const childrenCount = parseInt(workSituation.childrenCount);

    if (!salary || !months || !userAge) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    // Calculs avancés ARE
    const dailyReference = (salary * 12) / 365.25;
    const minimumAre = 31.36; // 2024
    const maximumAre = 261.54; // 2024
    
    // Calcul du SJR (Salaire Journalier de Référence)
    const sjr = Math.min(dailyReference, maximumAre);
    
    // Calcul allocation journalière
    let dailyAmount;
    if (sjr <= 125.64) {
      dailyAmount = sjr * 0.75;
    } else {
      dailyAmount = (125.64 * 0.75) + ((sjr - 125.64) * 0.57);
    }
    
    dailyAmount = Math.max(dailyAmount, minimumAre);
    dailyAmount = Math.min(dailyAmount, maximumAre);

    // Durée d'indemnisation
    let maxDuration;
    if (userAge < 53) {
      if (months >= 6 && months < 24) maxDuration = Math.floor(months * 0.8);
      else if (months >= 24) maxDuration = 24;
    } else if (userAge < 55) {
      maxDuration = Math.min(30, Math.floor(months * 0.8));
    } else {
      maxDuration = Math.min(36, Math.floor(months * 0.8));
    }

    // Conditions d'éligibilité renforcées
    const isEligible = months >= 6 && 
                      workSituation.quitReason !== 'voluntary_quit' &&
                      workSituation.dismissalDate;
    
    // Délai de carence selon motif
    let waitingPeriod = 0;
    if (workSituation.quitReason === 'dismissal_with_compensation') {
      waitingPeriod = 7;
    } else if (workSituation.quitReason === 'mutual_agreement') {
      const severancePay = salary * 2; // Estimation
      if (severancePay > salary * 3) waitingPeriod = Math.ceil(severancePay / dailyAmount);
    }

    // Calcul des aides complémentaires
    const complementaryAids = calculateComplementaryAids(salary, childrenCount, familySituation);

    // Démarches et calendrier
    const procedures = generateProcedures(isEligible, workSituation.quitReason);
    const timeline = generateTimeline(isEligible, waitingPeriod, maxDuration);

    const simulation = {
      isEligible,
      personalInfo: personalInfo,
      workSituation: workSituation,
      familySituation: familySituation,
      calculations: {
        sjr: Math.round(sjr * 100) / 100,
        dailyAmount: Math.round(dailyAmount * 100) / 100,
        monthlyAmount: Math.round(dailyAmount * 30 * 100) / 100,
        duration: maxDuration,
        totalAmount: Math.round(dailyAmount * maxDuration * 30),
        waitingPeriod
      },
      conditions: {
        workMonthsRequired: 6,
        workMonthsActual: months,
        ageCategory: userAge < 53 ? 'Moins de 53 ans' : userAge < 55 ? '53-54 ans' : '55 ans et plus',
        quitReasonValid: workSituation.quitReason !== 'voluntary_quit',
        registrationDeadline: '72 heures après fin de contrat'
      },
      complementaryAids,
      procedures,
      timeline,
      createdAt: new Date().toISOString(),
      simulationId: Date.now().toString()
    };

    setResults(simulation);
    
    // Sauvegarder dans l'historique
    const newHistory = [...simulationHistory, simulation];
    setSimulationHistory(newHistory);

    saveToolData('unemployment_simulator', {
      simulation,
      history: newHistory,
      createdAt: new Date().toISOString()
    });

    toast({
      title: "Simulation terminée",
      description: "Vos droits ont été calculés avec succès"
    });
  };

  const calculateComplementaryAids = (salary: number, childrenCount: number, familySituation: any) => {
    const rsa = familySituation.maritalStatus === 'single' 
      ? 635.71 + (childrenCount * 211.9) 
      : 953.56 + (childrenCount * 211.9);

    return {
      rsa: {
        amount: rsa,
        description: 'RSA selon situation familiale',
        eligible: true
      },
      primeActivite: {
        amount: childrenCount > 0 ? 159.4 : 0,
        description: 'Prime d\'activité',
        eligible: childrenCount > 0
      },
      allocationRentree: {
        amount: childrenCount * 416.4,
        description: 'Allocation de rentrée scolaire (par enfant 6-18 ans)',
        eligible: childrenCount > 0
      },
      transportAid: {
        amount: 150,
        description: 'Aide à la mobilité Pôle Emploi',
        eligible: true
      },
      formationAid: {
        amount: 652.02,
        description: 'Rémunération de fin de formation (RFF)',
        eligible: true
      },
      healthInsurance: {
        maintained: true,
        description: 'Maintien des droits pendant indemnisation',
        duration: '24 mois maximum'
      }
    };
  };

  const generateProcedures = (isEligible: boolean, reason: string) => {
    const baseProcedures = [
      {
        step: 1,
        title: 'Inscription Pôle Emploi',
        description: 'S\'inscrire dans les 72h suivant la fin du contrat',
        deadline: '72 heures',
        required: true,
        documents: ['Attestation employeur', 'Pièce d\'identité', 'CV', 'RIB']
      },
      {
        step: 2,
        title: 'Entretien d\'inscription',
        description: 'Participer à l\'entretien avec votre conseiller',
        deadline: '15 jours',
        required: true,
        documents: ['Dossier complet', 'Projet professionnel']
      },
      {
        step: 3,
        title: 'Actualisation mensuelle',
        description: 'Actualiser votre situation chaque mois',
        deadline: 'Mensuel',
        required: true,
        documents: ['Déclaration d\'activité']
      }
    ];

    if (!isEligible) {
      baseProcedures.unshift({
        step: 0,
        title: 'Vérification éligibilité',
        description: 'Vérifier conditions pour RSA ou autres aides',
        deadline: 'Immédiat',
        required: true,
        documents: ['Justificatifs revenus', 'Situation familiale']
      });
    }

    if (reason === 'voluntary_quit') {
      baseProcedures.push({
        step: 4,
        title: 'Justification démission',
        description: 'Prouver le caractère légitime de la démission',
        deadline: '21 jours',
        required: true,
        documents: ['Preuves harcèlement', 'Certificat médical', 'Courriers employeur']
      });
    }

    return baseProcedures;
  };

  const generateTimeline = (isEligible: boolean, waitingPeriod: number, duration: number) => {
    const now = new Date();
    const timeline = [];

    timeline.push({
      date: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000), // +3 jours
      event: 'Inscription Pôle Emploi',
      status: 'pending',
      critical: true
    });

    if (isEligible) {
      timeline.push({
        date: new Date(now.getTime() + (7 + waitingPeriod) * 24 * 60 * 60 * 1000),
        event: 'Premier versement ARE',
        status: 'pending',
        critical: true
      });

      timeline.push({
        date: new Date(now.getTime() + duration * 30 * 24 * 60 * 60 * 1000),
        event: 'Fin des droits ARE',
        status: 'pending',
        critical: false
      });
    }

    timeline.push({
      date: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // +1 mois
      event: 'Première actualisation',
      status: 'pending',
      critical: true
    });

    return timeline;
  };

  const exportSimulation = () => {
    if (!results) return;

    const exportData = {
      ...results,
      exportDate: new Date().toISOString(),
      exportType: 'simulation_pole_emploi'
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `simulation_pole_emploi_${results.simulationId}.json`;
    link.click();
    
    URL.revokeObjectURL(url);

    toast({
      title: "Export réussi",
      description: "Votre simulation a été exportée"
    });
  };

  const getEligibilityProgress = () => {
    let progress = 0;
    if (workSituation.lastSalary) progress += 25;
    if (workSituation.workMonths) progress += 25;
    if (workSituation.age) progress += 25;
    if (workSituation.quitReason) progress += 25;
    return progress;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Simulateur Droits Pôle Emploi
        </h1>
        <p className="text-lg text-gray-600">
          Calculez précisément vos droits aux allocations chômage (ARE) et aides complémentaires
        </p>
        <div className="mt-4">
          <Progress value={getEligibilityProgress()} className="w-full max-w-md mx-auto" />
          <p className="text-sm text-gray-500 mt-2">Complétude du dossier: {getEligibilityProgress()}%</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Informations personnelles</TabsTrigger>
          <TabsTrigger value="work">Situation professionnelle</TabsTrigger>
          <TabsTrigger value="family">Situation familiale</TabsTrigger>
          <TabsTrigger value="results">Résultats</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Vos informations personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lastName">Nom *</Label>
                  <Input
                    id="lastName"
                    placeholder="Dupont"
                    value={personalInfo.lastName}
                    onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="firstName">Prénom *</Label>
                  <Input
                    id="firstName"
                    placeholder="Jean"
                    value={personalInfo.firstName}
                    onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="birthDate">Date de naissance *</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={personalInfo.birthDate}
                    onChange={(e) => setPersonalInfo({...personalInfo, birthDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Nationalité</Label>
                  <Select value={personalInfo.nationality} onValueChange={(value) => setPersonalInfo({...personalInfo, nationality: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="french">Française</SelectItem>
                      <SelectItem value="eu">Union Européenne</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Adresse complète</Label>
                  <Input
                    id="address"
                    placeholder="123 rue de la République, 75001 Paris"
                    value={personalInfo.address}
                    onChange={(e) => setPersonalInfo({...personalInfo, address: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    placeholder="06 12 34 56 78"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jean.dupont@email.com"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="work" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Votre situation professionnelle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lastSalary">Dernier salaire brut mensuel (€) *</Label>
                  <Input
                    id="lastSalary"
                    type="number"
                    placeholder="2500"
                    value={workSituation.lastSalary}
                    onChange={(e) => setWorkSituation({...workSituation, lastSalary: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="workMonths">Mois travaillés (24 derniers mois) *</Label>
                  <Input
                    id="workMonths"
                    type="number"
                    placeholder="18"
                    min="0"
                    max="24"
                    value={workSituation.workMonths}
                    onChange={(e) => setWorkSituation({...workSituation, workMonths: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="age">Votre âge *</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="35"
                    value={workSituation.age}
                    onChange={(e) => setWorkSituation({...workSituation, age: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label>Type du dernier emploi</Label>
                  <Select value={workSituation.lastJobType} onValueChange={(value) => setWorkSituation({...workSituation, lastJobType: value})}>
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
                  <Label>Motif de fin de contrat *</Label>
                  <Select value={workSituation.quitReason} onValueChange={(value) => setWorkSituation({...workSituation, quitReason: value})}>
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

                <div>
                  <Label htmlFor="dismissalDate">Date de fin de contrat *</Label>
                  <Input
                    id="dismissalDate"
                    type="date"
                    value={workSituation.dismissalDate}
                    onChange={(e) => setWorkSituation({...workSituation, dismissalDate: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="family" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Situation familiale et sociale
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Situation familiale</Label>
                  <Select value={familySituation.maritalStatus} onValueChange={(value) => setFamilySituation({...familySituation, maritalStatus: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Célibataire</SelectItem>
                      <SelectItem value="married">Marié(e)</SelectItem>
                      <SelectItem value="pacs">Pacsé(e)</SelectItem>
                      <SelectItem value="divorced">Divorcé(e)</SelectItem>
                      <SelectItem value="widowed">Veuf(ve)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="childrenCount">Nombre d'enfants à charge</Label>
                  <Input
                    id="childrenCount"
                    type="number"
                    min="0"
                    value={workSituation.childrenCount}
                    onChange={(e) => setWorkSituation({...workSituation, childrenCount: e.target.value, hasChildren: parseInt(e.target.value) > 0})}
                  />
                </div>

                <div>
                  <Label>Type de logement</Label>
                  <Select value={familySituation.housingType} onValueChange={(value) => setFamilySituation({...familySituation, housingType: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rent">Locataire</SelectItem>
                      <SelectItem value="owner">Propriétaire</SelectItem>
                      <SelectItem value="family">Hébergé famille</SelectItem>
                      <SelectItem value="social">Logement social</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="monthlyRent">Loyer/charges mensuelles (€)</Label>
                  <Input
                    id="monthlyRent"
                    type="number"
                    placeholder="800"
                    value={familySituation.monthlyRent}
                    onChange={(e) => setFamilySituation({...familySituation, monthlyRent: e.target.value})}
                  />
                </div>

                <div>
                  <Label>Département de résidence</Label>
                  <Select value={familySituation.region} onValueChange={(value) => setFamilySituation({...familySituation, region: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un département" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept.code} value={dept.code}>
                          {dept.code} - {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-medium">Situation particulière</Label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="handicapped" 
                      checked={workSituation.isHandicapped}
                      onCheckedChange={(checked) => setWorkSituation({...workSituation, isHandicapped: checked === true})}
                    />
                    <Label htmlFor="handicapped">Reconnaissance travailleur handicapé</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="spouseWorking" 
                      checked={familySituation.spouseWorking}
                      onCheckedChange={(checked) => setFamilySituation({...familySituation, spouseWorking: checked === true})}
                    />
                    <Label htmlFor="spouseWorking">Conjoint en activité</Label>
                  </div>
                </div>

                {familySituation.spouseWorking && (
                  <div>
                    <Label htmlFor="spouseIncome">Revenus du conjoint (€/mois)</Label>
                    <Input
                      id="spouseIncome"
                      type="number"
                      placeholder="1500"
                      value={familySituation.spouseIncome}
                      onChange={(e) => setFamilySituation({...familySituation, spouseIncome: e.target.value})}
                    />
                  </div>
                )}
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Ces informations permettent de calculer précisément vos droits aux aides complémentaires (RSA, prime d'activité, allocations familiales).
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button 
              onClick={calculateDetailedRights}
              disabled={!workSituation.lastSalary || !workSituation.workMonths || !workSituation.age || !workSituation.quitReason}
              className="px-8"
              size="lg"
            >
              <Calculator className="mr-2 h-5 w-5" />
              Calculer mes droits complets
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {!results ? (
            <Card>
              <CardContent className="text-center py-12">
                <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune simulation</h3>
                <p className="text-gray-600 mb-4">Complétez les informations dans les onglets précédents pour calculer vos droits.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Résultat principal */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {results.isEligible ? (
                        <CheckSquare className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      )}
                      Résultat de la simulation
                    </CardTitle>
                    <Button onClick={exportSimulation} variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Exporter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {results.isEligible ? (
                    <div className="space-y-6">
                      <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                        <h3 className="font-semibold text-green-900 mb-4 text-lg">✅ Vous êtes éligible à l'ARE</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-green-600">
                              {results.calculations.dailyAmount}€
                            </div>
                            <div className="text-sm text-gray-600">par jour</div>
                            <div className="text-xs text-gray-500 mt-1">SJR: {results.calculations.sjr}€</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-green-600">
                              {results.calculations.monthlyAmount}€
                            </div>
                            <div className="text-sm text-gray-600">par mois</div>
                            <div className="text-xs text-gray-500 mt-1">30 jours</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-green-600">
                              {results.calculations.duration}
                            </div>
                            <div className="text-sm text-gray-600">mois max</div>
                            <div className="text-xs text-gray-500 mt-1">{results.conditions.ageCategory}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-green-600">
                              {results.calculations.totalAmount.toLocaleString()}€
                            </div>
                            <div className="text-sm text-gray-600">total max</div>
                            <div className="text-xs text-gray-500 mt-1">sur toute la période</div>
                          </div>
                        </div>
                      </div>

                      {results.calculations.waitingPeriod > 0 && (
                        <Alert>
                          <Clock className="h-4 w-4" />
                          <AlertDescription>
                            <strong>Délai de carence :</strong> {results.calculations.waitingPeriod} jours avant le premier versement
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  ) : (
                    <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
                      <h3 className="font-semibold text-red-900 mb-2 text-lg">❌ Vous n'êtes pas éligible à l'ARE</h3>
                      <p className="text-red-800 mb-4">
                        Conditions non remplies. Vérifiez vos droits au RSA et aux aides locales.
                      </p>
                      <div className="text-sm text-red-700">
                        <p><strong>Conditions requises :</strong></p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Minimum 6 mois de travail sur les 24 derniers mois {results.conditions.workMonthsActual >= 6 ? '✅' : '❌'}</li>
                          <li>Fin de contrat involontaire {results.conditions.quitReasonValid ? '✅' : '❌'}</li>
                          <li>Inscription dans les 72h {workSituation.dismissalDate ? '⏳' : '❌'}</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Aides complémentaires */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Euro className="h-5 w-5" />
                    Aides complémentaires possibles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(results.complementaryAids).map(([key, aid]: [string, any]) => (
                      <div key={key} className={`p-4 border rounded-lg ${aid.eligible ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                        <h4 className="font-medium mb-2">{aid.description}</h4>
                        {aid.amount && (
                          <div className="text-xl font-bold text-blue-600 mb-1">
                            {typeof aid.amount === 'number' ? `${aid.amount}€` : aid.amount}
                          </div>
                        )}
                        {aid.maintained && (
                          <div className="text-green-600 font-medium">Maintenu</div>
                        )}
                        {aid.duration && (
                          <div className="text-xs text-gray-600">{aid.duration}</div>
                        )}
                        <Badge variant={aid.eligible ? "default" : "secondary"} className="mt-2">
                          {aid.eligible ? "Éligible" : "Non éligible"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Démarches à suivre */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Démarches à suivre
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.procedures.map((procedure: any, index: number) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {procedure.step + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{procedure.title}</h4>
                            <Badge variant={procedure.required ? "destructive" : "secondary"}>
                              {procedure.deadline}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{procedure.description}</p>
                          <div className="text-xs text-gray-500">
                            <strong>Documents :</strong> {procedure.documents.join(', ')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Calendrier prévisionnel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.timeline.map((event: any, index: number) => (
                      <div key={index} className="flex items-center gap-4 p-3 border-l-4 border-blue-200 bg-blue-50">
                        <div className="text-sm font-medium text-blue-900 w-24">
                          {event.date.toLocaleDateString('fr-FR')}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{event.event}</div>
                          {event.critical && (
                            <Badge variant="destructive" className="mt-1">Critique</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Contacts utiles */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Contacts utiles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Pôle Emploi</h4>
                      <p className="text-sm text-gray-600 mb-2">Service demandeur d'emploi</p>
                      <p className="font-mono text-blue-600">3949</p>
                      <p className="text-xs text-gray-500">Service gratuit + prix appel</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Pôle Emploi Services</h4>
                      <p className="text-sm text-gray-600 mb-2">Services employeurs</p>
                      <p className="font-mono text-blue-600">3995</p>
                      <p className="text-xs text-gray-500">Service gratuit + prix appel</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">CAF</h4>
                      <p className="text-sm text-gray-600 mb-2">Allocations familiales</p>
                      <p className="font-mono text-blue-600">3230</p>
                      <p className="text-xs text-gray-500">0,12€/min depuis fixe</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">CPAM</h4>
                      <p className="text-sm text-gray-600 mb-2">Sécurité sociale</p>
                      <p className="font-mono text-blue-600">3646</p>
                      <p className="text-xs text-gray-500">Service gratuit + prix appel</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UnemploymentSimulatorTool;
