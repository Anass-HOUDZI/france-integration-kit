
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Users, Play, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';

interface InterviewAssistantToolProps {
  userProfile: any;
  diagnostic: any;
}

const InterviewAssistantTool: React.FC<InterviewAssistantToolProps> = ({ userProfile, diagnostic }) => {
  const [step, setStep] = useState('setup');
  const [interviewData, setInterviewData] = useState({
    position: '',
    company: '',
    sector: '',
    type: ''
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [feedback, setFeedback] = useState<{[key: number]: string}>({});

  const interviewTypes = [
    'Entretien RH',
    'Entretien technique',
    'Entretien avec manager',
    'Entretien collectif',
    'Entretien vidéo'
  ];

  const getQuestions = () => {
    const baseQuestions = [
      "Présentez-vous en quelques minutes.",
      "Pourquoi voulez-vous travailler chez nous ?",
      "Quelles sont vos principales qualités ?",
      "Citez un défaut que vous avez et comment vous travaillez dessus.",
      "Où vous voyez-vous dans 5 ans ?",
      "Pourquoi quittez-vous votre emploi actuel ?",
      "Avez-vous des questions à nous poser ?"
    ];

    const technicalQuestions = [
      "Décrivez votre expérience avec les technologies que nous utilisons.",
      "Comment résoudriez-vous ce problème technique ?",
      "Parlez-nous d'un projet dont vous êtes fier.",
      "Comment vous tenez-vous au courant des nouvelles technologies ?"
    ];

    if (interviewData.type === 'Entretien technique') {
      return [...baseQuestions.slice(0, 3), ...technicalQuestions, ...baseQuestions.slice(-2)];
    }

    return baseQuestions;
  };

  const questions = getQuestions();

  const provideFeedback = (questionIndex: number, answer: string) => {
    const question = questions[questionIndex];
    let feedbackText = '';

    if (question.includes('Présentez-vous')) {
      if (answer.length < 50) {
        feedbackText = "Votre présentation est trop courte. Développez sur votre parcours, vos compétences et votre motivation.";
      } else if (answer.length > 300) {
        feedbackText = "Votre présentation est trop longue. Soyez plus concis et allez à l'essentiel.";
      } else {
        feedbackText = "Bonne longueur ! Assurez-vous de mentionner votre parcours, vos compétences clés et votre motivation.";
      }
    } else if (question.includes('qualités')) {
      if (!answer.includes('exemple') && !answer.includes('situation')) {
        feedbackText = "Donnez des exemples concrets pour illustrer vos qualités.";
      } else {
        feedbackText = "Excellent ! Vous illustrez vos qualités avec des exemples.";
      }
    } else if (question.includes('défaut')) {
      if (answer.includes('perfectionniste') || answer.includes('travaille trop')) {
        feedbackText = "Évitez les 'faux défauts'. Mentionnez un vrai point d'amélioration et comment vous y travaillez.";
      } else {
        feedbackText = "Bien ! Vous montrez de l'authenticité et une capacité d'auto-amélioration.";
      }
    } else {
      feedbackText = "Réponse notée. Pensez à être spécifique et à donner des exemples concrets.";
    }

    setFeedback({...feedback, [questionIndex]: feedbackText});
  };

  const startInterview = () => {
    if (interviewData.position && interviewData.company) {
      setStep('interview');
      setCurrentQuestion(0);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep('results');
    }
  };

  const restartInterview = () => {
    setStep('setup');
    setCurrentQuestion(0);
    setAnswers({});
    setFeedback({});
  };

  if (step === 'setup') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Assistant Entretien d'Embauche
          </CardTitle>
          <CardDescription>
            Préparez-vous efficacement pour vos entretiens d'embauche
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="position">Poste visé</Label>
              <Input
                id="position"
                value={interviewData.position}
                onChange={(e) => setInterviewData({...interviewData, position: e.target.value})}
                placeholder="Ex: Développeur Front-End"
              />
            </div>
            <div>
              <Label htmlFor="company">Entreprise</Label>
              <Input
                id="company"
                value={interviewData.company}
                onChange={(e) => setInterviewData({...interviewData, company: e.target.value})}
                placeholder="Nom de l'entreprise"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sector">Secteur</Label>
              <Input
                id="sector"
                value={interviewData.sector}
                onChange={(e) => setInterviewData({...interviewData, sector: e.target.value})}
                placeholder="Ex: Informatique"
              />
            </div>
            <div>
              <Label htmlFor="type">Type d'entretien</Label>
              <Select value={interviewData.type} onValueChange={(value) => setInterviewData({...interviewData, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir le type" />
                </SelectTrigger>
                <SelectContent>
                  {interviewTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={startInterview} className="w-full" disabled={!interviewData.position || !interviewData.company}>
            <Play className="mr-2 h-4 w-4" />
            Commencer la simulation
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (step === 'interview') {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Simulation d'entretien</CardTitle>
              <Badge variant="outline">
                Question {currentQuestion + 1} / {questions.length}
              </Badge>
            </div>
            <CardDescription>
              Entretien pour le poste de {interviewData.position} chez {interviewData.company}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-medium text-blue-900">Question :</p>
              <p className="text-blue-800">{questions[currentQuestion]}</p>
            </div>

            <div>
              <Label htmlFor="answer">Votre réponse</Label>
              <Textarea
                id="answer"
                value={answers[currentQuestion] || ''}
                onChange={(e) => setAnswers({...answers, [currentQuestion]: e.target.value})}
                placeholder="Tapez votre réponse ici..."
                rows={4}
              />
            </div>

            {feedback[currentQuestion] && (
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="font-medium text-green-900 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Feedback :
                </p>
                <p className="text-green-800">{feedback[currentQuestion]}</p>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={() => provideFeedback(currentQuestion, answers[currentQuestion] || '')}
                variant="outline"
                disabled={!answers[currentQuestion]}
              >
                Obtenir un feedback
              </Button>
              <Button
                onClick={nextQuestion}
                disabled={!answers[currentQuestion]}
              >
                {currentQuestion === questions.length - 1 ? 'Terminer' : 'Question suivante'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          Simulation terminée !
        </CardTitle>
        <CardDescription>
          Voici un résumé de votre performance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {questions.map((question, index) => (
            <div key={index} className="border rounded-lg p-3">
              <p className="font-medium text-sm text-gray-700">{question}</p>
              <p className="text-sm mt-1">{answers[index]}</p>
              {feedback[index] && (
                <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-blue-800">
                  {feedback[index]}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <p className="font-medium text-green-900">Conseils généraux :</p>
          <ul className="text-green-800 text-sm mt-2 space-y-1">
            <li>• Préparez des exemples concrets pour chaque compétence</li>
            <li>• Renseignez-vous sur l'entreprise et ses valeurs</li>
            <li>• Préparez des questions à poser au recruteur</li>
            <li>• Entraînez-vous à parler de manière fluide et confiante</li>
          </ul>
        </div>

        <Button onClick={restartInterview} className="w-full">
          <RotateCcw className="mr-2 h-4 w-4" />
          Nouvelle simulation
        </Button>
      </CardContent>
    </Card>
  );
};

export default InterviewAssistantTool;
