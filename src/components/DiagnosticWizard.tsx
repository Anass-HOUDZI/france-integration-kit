
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';

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
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const questions = [
    {
      id: 'situation',
      title: 'Quelle est votre situation actuelle en France ?',
      type: 'radio',
      options: [
        { value: 'new_arrival', label: 'Je viens d\'arriver (moins de 3 mois)' },
        { value: 'settling', label: 'Je suis en cours d\'installation (3-12 mois)' },
        { value: 'established', label: 'Je suis installé depuis plus d\'un an' }
      ]
    },
    {
      id: 'priority',
      title: 'Quelle est votre priorité immédiate ?',
      type: 'radio',
      options: [
        { value: 'admin', label: 'Régulariser ma situation administrative' },
        { value: 'housing', label: 'Trouver un logement' },
        { value: 'work', label: 'Trouver du travail' },
        { value: 'health', label: 'Accéder aux soins de santé' },
        { value: 'education', label: 'Scolariser mes enfants' }
      ]
    },
    {
      id: 'difficulties',
      title: 'Quelles sont vos principales difficultés ?',
      type: 'checkbox',
      options: [
        { value: 'language', label: 'Barrière de la langue' },
        { value: 'paperwork', label: 'Complexité administrative' },
        { value: 'costs', label: 'Coûts des démarches' },
        { value: 'time', label: 'Manque de temps' },
        { value: 'information', label: 'Manque d\'information' }
      ]
    }
  ];

  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Générer le diagnostic
      const diagnostic = {
        profile: userProfile,
        answers,
        recommendations: generateRecommendations(userProfile, answers),
        completed: Date.now()
      };
      onDiagnosticComplete(diagnostic);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const generateRecommendations = (profile: any, answers: any) => {
    const recommendations = [];
    
    // Recommandations basées sur le profil
    if (profile?.id === 'etudiant') {
      recommendations.push({
        module: 'admin',
        priority: 'high',
        reason: 'Régularisation du statut étudiant'
      });
    }
    
    if (profile?.id === 'travailleur') {
      recommendations.push({
        module: 'emploi',
        priority: 'high',
        reason: 'Recherche d\'emploi et équivalences'
      });
    }
    
    // Recommandations basées sur les réponses
    if (answers.priority === 'housing') {
      recommendations.push({
        module: 'logement',
        priority: 'high',
        reason: 'Recherche de logement prioritaire'
      });
    }
    
    return recommendations;
  };

  const currentQuestion = questions[currentStep];
  const canProceed = currentQuestion && answers[currentQuestion.id];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button 
            variant="ghost" 
            onClick={handlePrevious}
            className="text-blue-600 hover:bg-blue-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {currentStep === 0 ? 'Retour' : 'Précédent'}
          </Button>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">
              Diagnostic personnalisé
            </h2>
            <p className="text-gray-600">
              Étape {currentStep + 1} sur {questions.length}
            </p>
          </div>
        </div>
        
        <Progress value={progress} className="w-full" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            {currentQuestion.title}
          </CardTitle>
          <CardDescription>
            Sélectionnez la réponse qui correspond le mieux à votre situation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentQuestion.type === 'radio' && (
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id={option.value}
                    name={currentQuestion.id}
                    value={option.value}
                    checked={answers[currentQuestion.id] === option.value}
                    onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <label htmlFor={option.value} className="text-gray-700 cursor-pointer">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          )}

          {currentQuestion.type === 'checkbox' && (
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id={option.value}
                    checked={(answers[currentQuestion.id] || []).includes(option.value)}
                    onChange={(e) => {
                      const currentValues = answers[currentQuestion.id] || [];
                      const newValues = e.target.checked
                        ? [...currentValues, option.value]
                        : currentValues.filter((v: string) => v !== option.value);
                      handleAnswer(currentQuestion.id, newValues);
                    }}
                    className="w-4 h-4 text-blue-600"
                  />
                  <label htmlFor={option.value} className="text-gray-700 cursor-pointer">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          )}

          <div className="pt-6 flex justify-end">
            <Button 
              onClick={handleNext}
              disabled={!canProceed}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {currentStep === questions.length - 1 ? (
                <>
                  Terminer le diagnostic
                  <CheckCircle className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Suivant
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiagnosticWizard;
