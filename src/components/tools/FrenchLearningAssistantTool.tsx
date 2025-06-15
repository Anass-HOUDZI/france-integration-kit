
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Star, Repeat } from "lucide-react";

// Types d’exercice possible
type Level = "debutant" | "intermediaire" | "avance";

// Questions de vocabulaire/grammaire (exemple simplifié, peut étendre)
const EXERCICES = {
  debutant: [
    {
      type: "vocab",
      question: "Comment traduit-on 'cat' en français ?",
      answer: "chat",
      explanation: "« Cat » se traduit par « chat » en français.",
    },
    {
      type: "gram",
      question: "Complétez : Je ____ (être) étudiant.",
      answer: "suis",
      explanation: "Au présent : Je suis étudiant.",
    },
  ],
  intermediaire: [
    {
      type: "vocab",
      question: "Que signifie 'chaise' en anglais ?",
      answer: "chair",
      explanation: "« Chaise » veut dire « chair » en anglais.",
    },
    {
      type: "gram",
      question: "Accordez : Les enfants sont ______ (heureux).",
      answer: "heureux",
      explanation: "Ici, 'heureux' prend la marque du pluriel mais reste masculin.",
    },
  ],
  avance: [
    {
      type: "vocab",
      question: "Traduisez : 'environment' (français) ?",
      answer: "environnement",
      explanation: "« Environment » se traduit par « environnement ».",
    },
    {
      type: "gram",
      question: "Transformez : Il a parlé (au plus-que-parfait).",
      answer: "avait parlé",
      explanation: "Au plus-que-parfait : Il avait parlé.",
    },
  ],
};

// Stockage local du niveau et score pour continuité UX
function saveToStorage(level: Level, score: number) {
  try {
    localStorage.setItem("french_level", level);
    localStorage.setItem("french_score", String(score));
  } catch {}
}
function loadFromStorage(): { level: Level; score: number } {
  let level: Level = "debutant";
  let score = 0;
  try {
    level = (localStorage.getItem("french_level") as Level) || "debutant";
    score = parseInt(localStorage.getItem("french_score") || "0", 10);
  } catch {}
  return { level, score };
}

interface FrenchLearningAssistantToolProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}

const LEVEL_LABELS: Record<Level, string> = {
  debutant: "Débutant",
  intermediaire: "Intermédiaire",
  avance: "Avancé",
};

const FrenchLearningAssistantTool: React.FC<FrenchLearningAssistantToolProps> = ({ onBack }) => {
  const [level, setLevel] = useState<Level>("debutant");
  const [step, setStep] = useState<"selection" | "exercises" | "result">("selection");
  const [current, setCurrent] = useState(0);
  const [value, setValue] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  // Recharge level préférentiel
  useEffect(() => {
    const { level: storedLevel, score: storedScore } = loadFromStorage();
    setLevel(storedLevel);
    setScore(storedScore);
  }, []);

  // Gestion choix du niveau
  const handleLevelSelect = (lvl: Level) => {
    setLevel(lvl);
    setStep("exercises");
    setCurrent(0);
    setScore(0);
    saveToStorage(lvl, 0);
  };

  // Validation d’une réponse
  const handleValidate = () => {
    const correct = value.trim().toLowerCase() === EXERCICES[level][current].answer.toLowerCase();
    setShowFeedback(true);
    setSuccess(correct);
    if (correct) {
      const newScore = score + 1;
      setScore(newScore);
      saveToStorage(level, newScore);
    }
  };

  // Question suivante
  const handleNext = () => {
    setValue("");
    setShowFeedback(false);
    setSuccess(null);
    if (current + 1 < EXERCICES[level].length) {
      setCurrent(current + 1);
    } else {
      setStep("result");
    }
  };

  // Recommencer
  const handleRestart = () => {
    setStep("selection");
    setCurrent(0);
    setScore(0);
    setValue("");
    setShowFeedback(false);
    setSuccess(null);
  };

  // Bloc sélection du niveau
  function LevelSelection() {
    return (
      <div className="space-y-6 animate-fade-in">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold flex items-center gap-2 mt-6">
          <BookOpen className="h-7 w-7 text-indigo-600" />
          Assistant Apprentissage Français
        </h1>
        <div className="mt-4">
          <div className="font-semibold">Choisissez votre niveau :</div>
          <div className="flex flex-col md:flex-row gap-4 mt-2">
            {(["debutant", "intermediaire", "avance"] as Level[]).map((lvl) => (
              <Button
                key={lvl}
                variant={level === lvl ? "default" : "outline"}
                className="flex-1"
                onClick={() => handleLevelSelect(lvl)}
              >
                {LEVEL_LABELS[lvl]}
              </Button>
            ))}
          </div>
        </div>
        <div className="text-sm mt-4 text-gray-500">
          Votre dernier niveau <b>{LEVEL_LABELS[level]}</b> — Score enregistré : <Star className="inline h-4 w-4 text-yellow-400 mr-1" /> {score} / {EXERCICES[level].length}
        </div>
      </div>
    );
  }

  // Bloc exercice
  function ExerciseBlock() {
    const ex = EXERCICES[level][current];
    return (
      <div className="space-y-6 animate-fade-in">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <div className="flex items-center gap-3 mt-4">
          <BookOpen className="h-6 w-6 text-indigo-600" />
          <span className="text-xl font-semibold">Niveau {LEVEL_LABELS[level]}</span>
        </div>
        <div className="text-md text-gray-700 mt-3">Exercice {current + 1} / {EXERCICES[level].length}</div>
        <div className="p-4 border rounded-lg bg-indigo-50 dark:bg-indigo-950 dark:text-white text-lg font-medium">{ex.question}</div>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          disabled={showFeedback}
          className="w-full border rounded-md p-2 focus:ring-2 ring-indigo-500 text-base"
          placeholder="Votre réponse ici"
          onKeyDown={e => {
            if (e.key === "Enter" && !showFeedback) handleValidate();
          }}
        />
        <div className="flex flex-col md:flex-row gap-2 mt-2">
          {!showFeedback && (
            <Button variant="default" onClick={handleValidate} disabled={!value}>
              Valider
            </Button>
          )}
          {showFeedback && (
            <Button
              variant={current + 1 < EXERCICES[level].length ? "default" : "secondary"}
              onClick={handleNext}
            >
              {current + 1 < EXERCICES[level].length ? "Suivant" : "Voir mon score"}
            </Button>
          )}
        </div>

        {showFeedback && (
          <div
            className={`rounded-lg p-4 mt-4 ${
              success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
            }`}
          >
            {success ? "✅ Bonne réponse !" : `❌ Mauvaise réponse. Réponse attendue : `}
            {!success && <b className="ml-1">{ex.answer}</b>}
            <div className="italic mt-1 text-sm">{ex.explanation}</div>
          </div>
        )}
        <div className="mt-4 text-gray-500 text-xs">
          Appuyez sur Entrée pour valider plus vite.
        </div>
      </div>
    );
  }

  // Bloc résultat
  function ResultBlock() {
    const percent = Math.round((score / EXERCICES[level].length) * 100);
    let message = "";
    if (percent === 100) message = "Parfait ! 🇫🇷";
    else if (percent >= 80) message = "Excellent !";
    else if (percent >= 50) message = "Vous progressez bien !";
    else message = "Continuez, la pratique mène au succès !";
    return (
      <div className="space-y-6 text-center animate-fade-in">
        <h2 className="text-2xl font-bold text-indigo-700 mt-4">
          Résultat niveau {LEVEL_LABELS[level]}
        </h2>
        <div className="text-5xl font-bold text-indigo-800 flex items-center justify-center gap-2">
          <Star className="h-8 w-8 text-yellow-400" />
          {score} / {EXERCICES[level].length}
        </div>
        <div className="text-lg text-gray-700 mt-2">{message}</div>
        <Button variant="outline" className="mt-6" onClick={handleRestart}>
          <Repeat className="inline h-5 w-5 mr-2" />
          Recommencer / Choisir un autre niveau
        </Button>
        <Button className="mt-4 ml-2" variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
      </div>
    );
  }

  // Rendement principal
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {step === "selection" && <LevelSelection />}
      {step === "exercises" && <ExerciseBlock />}
      {step === "result" && <ResultBlock />}
    </div>
  );
};

export default FrenchLearningAssistantTool;

