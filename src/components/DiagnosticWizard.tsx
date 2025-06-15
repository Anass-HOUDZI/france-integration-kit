
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, ArrowLeft, MapPin, Clock, AlertCircle } from 'lucide-react';

interface DiagnosticWizardProps {
  userProfile: any;
  onDiagnosticComplete: (diagnostic: any) => void;
  onBack: () => void;
}

const DiagnosticWizard: React.FC<DiagnosticWizardProps> = ({ 
  userProfile, 
  onDiagnosticComplete, 
  onBack 
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const questions = [
    {
      id: 'situation_administrative',
      title: 'Quelle est votre situation administrative ?',
      type: 'single',
      options: [
        { value: 'tourist', label: 'Touriste (moins de 3 mois)' },
        { value: 'student_visa', label: 'Visa étudiant' },
        { value: 'work_visa', label: 'Visa de travail' },
        { value: 'family_reunification', label: 'Regroupement familial' },
        { value: 'asylum_seeker', label: 'Demandeur d\'asile' },
        { value: 'eu_citizen', label: 'Citoyen européen' },
        { value: 'refugee', label: 'Réfugié' },
        { value: 'other', label: 'Autre situation' }
      ]
    },
    {
      id: 'duration_stay',
      title: 'Combien de temps prévoyez-vous de rester en France ?',
      type: 'single',
      options: [
        { value: 'temporary', label: 'Temporaire (moins d\'1 an)' },
        { value: 'medium', label: '1 à 3 ans' },
        { value: 'long', label: '3 à 10 ans' },
        { value: 'permanent', label: 'Installation permanente' },
        { value: 'unsure', label: 'Je ne sais pas encore' }
      ]
    },
    {
      id: 'region',
      title: 'Dans quelle région de France êtes-vous ou souhaitez-vous vous installer ?',
      type: 'single',
      options: [
        { value: 'ile_de_france', label: 'Île-de-France (Paris et région parisienne)' },
        { value: 'provence', label: 'Provence-Alpes-Côte d\'Azur' },
        { value: 'rhone_alpes', label: 'Auvergne-Rhône-Alpes' },
        { value: 'occitanie', label: 'Occitanie' },
        { value: 'nouvelle_aquitaine', label: 'Nouvelle-Aquitaine' },
        { value: 'grand_est', label: 'Grand Est' },
        { value: 'hauts_de_france', label: 'Hauts-de-France' },
        { value: 'normandie', label: 'Normandie' },
        { value: 'bretagne', label: 'Bretagne' },
        { value: 'other', label: 'Autre région' }
      ]
    },
    {
      id: 'urgent_needs',
      title: 'Quels sont vos besoins les plus urgents ?',
      type: 'multiple',
      options: [
        { value: 'housing', label: 'Trouver un logement' },
        { value: 'papers', label: 'Régulariser ma situation administrative' },
        { value: 'job', label: 'Trouver un emploi' },
        { value: 'healthcare', label: 'Accéder aux soins de santé' },
        { value: 'education', label: 'Inscrire mes enfants à l\'école' },
        { value: 'language', label: 'Apprendre le français' },
        { value: 'bank', label: 'Ouvrir un compte bancaire' },
        { value: 'transport', label: 'Me déplacer (transports)' }
      ]
    },
    {
      id: 'french_level',
      title: 'Quel est votre niveau de français ?',
      type: 'single',
      options: [
        { value: 'none', label: 'Débutant (A1 ou moins)' },
        { value: 'basic', label: 'Élémentaire (A2)' },
        { value: 'intermediate', label: 'Intermédiaire (B1-B2)' },
        { value: 'advanced', label: 'Avancé (C1-C2)' },
        { value: 'native', label: 'Langue maternelle' }
      ]
    }
  ];

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Generate diagnostic
      const diagnostic = generateDiagnostic();
      onDiagnosticComplete(diagnostic);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const generateDiagnostic = () => {
    const urgentNeeds = answers.urgent_needs || [];
    const situation = answers.situation_administrative;
    const duration = answers.duration_stay;
    
    // Generate priority tools based on answers
    const priorities = [];
    
    if (urgentNeeds.includes('papers') || ['asylum_seeker', 'work_visa', 'student_visa'].includes(situation)) {
      priorities.push({
        module: 'admin',
        title: 'Démarches Administratives',
        urgency: 'high',
        tools: ['Générateur de lettres', 'Calculateur de frais', 'Planning rendez-vous']
      });
    }
    
    if (urgentNeeds.includes('housing')) {
      priorities.push({
        module: 'logement',
        title: 'Logement',
        urgency: urgentNeeds.includes('housing') ? 'high' : 'medium',
        tools: ['Calculateur budget', 'Générateur dossier locatif', 'Comparateur quartiers']
      });
    }
    
    if (urgentNeeds.includes('job') || userProfile?.id === 'travailleur') {
      priorities.push({
        module: 'emploi',
        title: 'Emploi & Formation',
        urgency: urgentNeeds.includes('job') ? 'high' : 'medium',
        tools: ['Traducteur CV', 'Lettres de motivation', 'Calculateur salaire']
      });
    }

    return {
      userProfile,
      answers,
      priorities,
      createdAt: new Date(),
      completionPercentage: 0
    };
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentAnswer = answers[currentQ.id];
  const canContinue = currentAnswer && (
    currentQ.type === 'single' ? currentAnswer : currentAnswer.length > 0
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="ghost" 
            onClick={handlePrevious}
            className="text-blue-600 hover:bg-blue-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Précédent
          </Button>
          <Badge variant="outline">
            Question {currentQuestion + 1} / {questions.length}
          </Badge>
        </div>
        
        <Progress value={progress} className="h-2 mb-4" />
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Diagnostic personnalisé
          </h2>
          <p className="text-gray-600">
            Quelques questions pour vous proposer les meilleurs outils
          </p>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            {currentQ.title}
          </CardTitle>
          {currentQ.type === 'multiple' && (
            <CardDescription>
              Vous pouvez sélectionner plusieurs réponses
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQ.options.map((option) => {
            const isSelected = currentQ.type === 'single' 
              ? currentAnswer === option.value
              : currentAnswer?.includes(option.value);
              
            return (
              <Card 
                key={option.value}
                className={`cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => {
                  if (currentQ.type === 'single') {
                    handleAnswer(currentQ.id, option.value);
                  } else {
                    const current = currentAnswer || [];
                    const updated = current.includes(option.value)
                      ? current.filter((v: string) => v !== option.value)
                      : [...current, option.value];
                    handleAnswer(currentQ.id, updated);
                  }
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected 
                        ? 'bg-blue-600 border-blue-600' 
                        : 'border-gray-300'
                    }`}>
                      {isSelected && <CheckCircle className="h-3 w-3 text-white" />}
                    </div>
                    <span className={`font-medium ${
                      isSelected ? 'text-blue-900' : 'text-gray-700'
                    }`}>
                      {option.label}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </CardContent>
      </Card>

      <div className="text-center">
        <Button 
          size="lg"
          onClick={handleNext}
          disabled={!canContinue}
          className="bg-blue-600 hover:bg-blue-700 px-8 py-3"
        >
          {currentQuestion === questions.length - 1 ? 'Terminer le diagnostic' : 'Question suivante'}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default DiagnosticWizard;
