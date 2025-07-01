
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, BookOpen, Award, Calendar, Euro, Building, CheckCircle, Clock, Star, Users } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ToolContainer from './ToolContainer';

interface TrainingGuideProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}

interface CPFRights {
  availableAmount: number;
  totalEarned: number;
  usedAmount: number;
  nextUpdate: string;
}

interface Training {
  id: string;
  title: string;
  provider: string;
  duration: string;
  cost: number;
  cpfEligible: boolean;
  certification: string;
  rating: number;
  category: string;
  level: string;
  format: string;
  nextSession: string;
}

interface FinancingOption {
  type: string;
  coverage: number;
  requirements: string[];
  deadline: string;
}

const TrainingGuideTool: React.FC<TrainingGuideProps> = ({ userProfile, diagnostic, onBack }) => {
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [currentSector, setCurrentSector] = useState('');
  const [targetSector, setTargetSector] = useState('');
  const [cpfRights, setCpfRights] = useState<CPFRights | null>(null);
  const [availableTrainings, setAvailableTrainings] = useState<Training[]>([]);
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);
  const [financingOptions, setFinancingOptions] = useState<FinancingOption[]>([]);
  const [trainingPlan, setTrainingPlan] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);

  // Simuler les données CPF
  useEffect(() => {
    if (employmentStatus && currentSector) {
      const mockCPFRights: CPFRights = {
        availableAmount: Math.floor(Math.random() * 3000) + 500,
        totalEarned: Math.floor(Math.random() * 5000) + 1000,
        usedAmount: Math.floor(Math.random() * 1000),
        nextUpdate: "2024-12-31"
      };
      setCpfRights(mockCPFRights);
      
      // Générer des formations éligibles
      generateEligibleTrainings();
      generateFinancingOptions();
    }
  }, [employmentStatus, currentSector, targetSector]);

  const generateEligibleTrainings = () => {
    const mockTrainings: Training[] = [
      {
        id: '1',
        title: 'Développement Web Full Stack',
        provider: 'OpenClassrooms',
        duration: '6 mois',
        cost: 2400,
        cpfEligible: true,
        certification: 'RNCP Niveau 5',
        rating: 4.5,
        category: 'Informatique',
        level: 'Intermédiaire',
        format: 'En ligne',
        nextSession: '2024-02-15'
      },
      {
        id: '2',
        title: 'Gestionnaire de Paie',
        provider: 'CNAM',
        duration: '8 mois',
        cost: 3200,
        cpfEligible: true,
        certification: 'Titre Professionnel',
        rating: 4.2,
        category: 'RH',
        level: 'Professionnel',
        format: 'Hybride',
        nextSession: '2024-03-01'
      },
      {
        id: '3',
        title: 'Marketing Digital',
        provider: 'IFOCOP',
        duration: '4 mois',
        cost: 1800,
        cpfEligible: true,
        certification: 'Certificat professionnel',
        rating: 4.3,
        category: 'Marketing',
        level: 'Débutant',
        format: 'Présentiel',
        nextSession: '2024-02-20'
      }
    ];
    setAvailableTrainings(mockTrainings);
  };

  const generateFinancingOptions = () => {
    const options: FinancingOption[] = [
      {
        type: 'CPF',
        coverage: 100,
        requirements: ['Être actif ou demandeur d\'emploi'],
        deadline: 'Permanent'
      },
      {
        type: 'Pôle Emploi (AIF)',
        coverage: 80,
        requirements: ['Être demandeur d\'emploi', 'Formation validée par conseiller'],
        deadline: '2024-03-31'
      },
      {
        type: 'Région',
        coverage: 60,
        requirements: ['Résider dans la région', 'Projet professionnel défini'],
        deadline: '2024-04-15'
      }
    ];
    setFinancingOptions(options);
  };

  const createTrainingPlan = (training: Training) => {
    const plan = [
      {
        phase: 'Inscription et financement',
        duration: '2 semaines',
        tasks: ['Dossier CPF', 'Validation employeur si nécessaire', 'Inscription organisme'],
        status: 'pending'
      },
      {
        phase: 'Formation théorique',
        duration: training.duration,
        tasks: ['Modules en ligne', 'Évaluations', 'Projets pratiques'],
        status: 'pending'
      },
      {
        phase: 'Certification',
        duration: '1 mois',
        tasks: ['Examen final', 'Soutenance projet', 'Obtention certificat'],
        status: 'pending'
      }
    ];
    setTrainingPlan(plan);
  };

  const handleTrainingSelection = (training: Training) => {
    setSelectedTraining(training);
    createTrainingPlan(training);
  };

  return (
    <ToolContainer
      title="Guide Formation Professionnelle"
      description="Naviguez dans le système de formation français avec un accompagnement personnalisé"
      icon={<BookOpen className="h-8 w-8 text-blue-600" />}
      onBack={onBack}
    >
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="cpf">Droits CPF</TabsTrigger>
          <TabsTrigger value="trainings">Formations</TabsTrigger>
          <TabsTrigger value="financing">Financement</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Votre Profil Professionnel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employment-status">Statut actuel</Label>
                  <Select value={employmentStatus} onValueChange={setEmploymentStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employee">Salarié</SelectItem>
                      <SelectItem value="unemployed">Demandeur d'emploi</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                      <SelectItem value="student">Étudiant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="current-sector">Secteur actuel</Label>
                  <Select value={currentSector} onValueChange={setCurrentSector}>
                    <SelectTrigger>
                      <SelectValue placeholder="Votre secteur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">Informatique</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="hr">Ressources Humaines</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="target-sector">Secteur visé (optionnel)</Label>
                <Select value={targetSector} onValueChange={setTargetSector}>
                  <SelectTrigger>
                    <SelectValue placeholder="Secteur de reconversion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it">Informatique</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="hr">Ressources Humaines</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Santé</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {employmentStatus && currentSector && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Profil enregistré ! Vous pouvez maintenant découvrir vos droits CPF et les formations disponibles.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cpf">
          <div className="space-y-6">
            {cpfRights ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Euro className="h-5 w-5" />
                      Vos Droits CPF
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">
                          {cpfRights.availableAmount}€
                        </div>
                        <div className="text-sm text-gray-600">Disponible</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">
                          {cpfRights.totalEarned}€
                        </div>
                        <div className="text-sm text-gray-600">Total acquis</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-orange-600">
                          {cpfRights.usedAmount}€
                        </div>
                        <div className="text-sm text-gray-600">Utilisé</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Prochaine mise à jour</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Vos droits seront mis à jour le {cpfRights.nextUpdate}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Comment optimiser vos droits CPF</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Abondement employeur</div>
                          <div className="text-sm text-gray-600">
                            Demandez à votre employeur de compléter votre CPF
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Formations prioritaires</div>
                          <div className="text-sm text-gray-600">
                            Certaines formations bénéficient d'aides supplémentaires
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Complétez votre profil pour voir vos droits CPF
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="trainings">
          <div className="space-y-6">
            {availableTrainings.length > 0 ? (
              availableTrainings.map((training) => (
                <Card key={training.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{training.title}</h3>
                        <p className="text-gray-600">{training.provider}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          {training.cost}€
                        </div>
                        {training.cpfEligible && (
                          <Badge className="bg-green-100 text-green-800">
                            CPF Éligible
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600">Durée</div>
                        <div className="font-medium">{training.duration}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Format</div>
                        <div className="font-medium">{training.format}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Certification</div>
                        <div className="font-medium">{training.certification}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Note</div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{training.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <Calendar className="h-4 w-4 inline mr-1" />
                        Prochaine session : {training.nextSession}
                      </div>
                      <Button 
                        onClick={() => handleTrainingSelection(training)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Choisir cette formation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Complétez votre profil pour voir les formations disponibles
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="financing">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Euro className="h-5 w-5" />
                  Options de Financement Disponibles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {financingOptions.map((option, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">{option.type}</h4>
                          <div className="text-2xl font-bold text-green-600">
                            {option.coverage}% de prise en charge
                          </div>
                        </div>
                        <Badge variant="outline">
                          Deadline: {option.deadline}
                        </Badge>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-2">Conditions requises:</h5>
                        <ul className="space-y-1">
                          {option.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedTraining && cpfRights && (
              <Card>
                <CardHeader>
                  <CardTitle>Simulation de Financement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Coût de la formation:</span>
                      <span className="font-semibold">{selectedTraining.cost}€</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Prise en charge CPF:</span>
                      <span className="font-semibold text-green-600">
                        -{Math.min(cpfRights.availableAmount, selectedTraining.cost)}€
                      </span>
                    </div>
                    <hr />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Reste à charge:</span>
                      <span className={
                        Math.max(0, selectedTraining.cost - cpfRights.availableAmount) === 0 
                          ? "text-green-600" 
                          : "text-orange-600"
                      }>
                        {Math.max(0, selectedTraining.cost - cpfRights.availableAmount)}€
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="planning">
          <div className="space-y-6">
            {selectedTraining ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Planning de Formation - {selectedTraining.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {trainingPlan.map((phase, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold">{phase.phase}</h4>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span className="text-sm">{phase.duration}</span>
                              <Badge 
                                variant={phase.status === 'completed' ? 'default' : 'secondary'}
                              >
                                {phase.status === 'completed' ? 'Terminé' : 'À venir'}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            {phase.tasks.map((task: string, taskIndex: number) => (
                              <div key={taskIndex} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                <span className="text-sm">{task}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Suivi de Certification
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Progression vers la certification</span>
                        <span className="font-semibold">0%</span>
                      </div>
                      <Progress value={0} className="w-full" />
                      
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h5 className="font-medium mb-2">Certification visée:</h5>
                        <p className="text-sm text-blue-800">{selectedTraining.certification}</p>
                        <p className="text-xs text-blue-600 mt-1">
                          Cette certification est reconnue par l'État et les entreprises
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Sélectionnez une formation pour voir le planning détaillé
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </ToolContainer>
  );
};

export default TrainingGuideTool;
