
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Globe } from "lucide-react";

interface CultureQuizToolProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}

// Quelques questions de culture générale française (exemples)
const QUESTIONS = [
  {
    question: "Quelle est la devise officielle de la République française ?",
    options: [
      "Unité, Travail, Progrès",
      "Liberté, Égalité, Fraternité",
      "Paix, Justice, Liberté",
      "Force, Honneur, Patrie"
    ],
    answer: 1,
    explanation: "La devise officielle est bien « Liberté, Égalité, Fraternité »."
  },
  {
    question: "Quel est l’hymne national de la France ?",
    options: [
      "La Marseillaise",
      "La Liberté guidant le peuple",
      "La Vie en rose",
      "Le Chant des Partisans"
    ],
    answer: 0,
    explanation: "« La Marseillaise » est l’hymne officiel de la France."
  },
  {
    question: "Qui était le premier président de la Ve République française ?",
    options: [
      "Nicolas Sarkozy",
      "Charles de Gaulle",
      "François Mitterrand",
      "Valéry Giscard d’Estaing"
    ],
    answer: 1,
    explanation: "Charles de Gaulle est devenu le premier président en 1959."
  },
  {
    question: "Quelle fête nationale célèbre-t-on le 14 juillet ?",
    options: [
      "La Fête du Travail",
      "La Fête de la Musique",
      "La Fête Nationale (Prise de la Bastille)",
      "L’Ascension"
    ],
    answer: 2,
    explanation: "Le 14 juillet, c’est la fête nationale en mémoire de la prise de la Bastille."
  },
  {
    question: "La France fait partie :",
    options: [
      "Du Commonwealth",
      "De l’Union Européenne",
      "De l’ALENA",
      "De l’Union Africaine"
    ],
    answer: 1,
    explanation: "La France est l’un des fondateurs de l’Union Européenne."
  },
];

const CultureQuizTool: React.FC<CultureQuizToolProps> = ({ onBack }) => {
  const [step, setStep] = useState<"quiz" | "result">("quiz");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const resetQuiz = () => {
    setStep("quiz");
    setCurrent(0);
    setSelected(null);
    setCorrectCount(0);
    setShowFeedback(false);
  };

  // Gestion de la sélection réponse
  const handleAnswer = (index: number) => {
    if (selected !== null) return; // déjà répondu
    setSelected(index);
    setShowFeedback(true);
    if (index === QUESTIONS[current].answer) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  // Passage à la question suivante
  const handleNext = () => {
    if (current + 1 < QUESTIONS.length) {
      setCurrent(current + 1);
      setSelected(null);
      setShowFeedback(false);
    } else {
      setStep("result");
    }
  };

  // Rendu d’une question et options QCM
  function QuestionBlock() {
    const q = QUESTIONS[current];
    return (
      <div className="space-y-6 animate-fade-in">
        <h2 className="text-xl font-bold mt-6 flex items-center gap-2">
          <Globe className="h-6 w-6 text-indigo-600" />
          Question {current + 1} / {QUESTIONS.length}
        </h2>
        <div className="text-lg font-medium">{q.question}</div>
        <div className="space-y-3">
          {q.options.map((opt, idx) => (
            <Button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className={`w-full text-left ${
                selected !== null
                  ? idx === q.answer
                    ? "bg-green-200 text-green-900"
                    : idx === selected
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100"
                  : "bg-white"
              }`}
              variant={selected === idx ? "outline" : "outline"}
              disabled={selected !== null}
            >
              <span className="block">{opt}</span>
            </Button>
          ))}
        </div>
        {showFeedback && (
          <div
            className={`rounded-lg p-4 mt-2 ${
              selected === q.answer ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
            }`}
          >
            {selected === q.answer ? "✅ Bonne réponse !" : "❌ Mauvaise réponse."}
            <div className="italic mt-1 text-sm">{q.explanation}</div>
          </div>
        )}
        <div className="flex gap-2 mt-4">
          {showFeedback && (
            <Button onClick={handleNext} variant="default" className="ml-auto">
              {current + 1 < QUESTIONS.length ? "Question suivante" : "Voir mon score"}
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Résultat du quiz
  function ResultBlock() {
    const score = correctCount;
    const total = QUESTIONS.length;
    const percent = Math.round((score / total) * 100);
    let message = "";
    if (percent === 100) message = "Parfait ! 🇫🇷";
    else if (percent >= 80) message = "Excellent !";
    else if (percent >= 60) message = "Très bien !";
    else if (percent >= 40) message = "Pas mal, continuez !";
    else message = "N’abandonnez pas, c’est en forgeant qu’on devient Français !";

    return (
      <div className="space-y-6 text-center animate-fade-in">
        <h2 className="text-2xl font-bold text-indigo-700 mt-4">Votre score :</h2>
        <div className="text-5xl font-bold text-indigo-800">{score} / {total}</div>
        <div className="text-lg text-gray-700 mt-2">{message}</div>
        <Button className="mt-4" variant="outline" onClick={resetQuiz}>
          Recommencer le quiz
        </Button>
        <Button className="mt-4 ml-2" variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {step === "quiz" && (
        <>
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          <h1 className="text-2xl font-bold flex items-center gap-2 mt-6">
            <Globe className="h-7 w-7 text-indigo-600" />
            Quiz Culture Française
          </h1>
          <QuestionBlock />
        </>
      )}
      {step === "result" && <ResultBlock />}
    </div>
  );
};

export default CultureQuizTool;

