import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Award, BookOpen, Flag } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

// Types de thèmes disponibles pour le test
const THEMES = [
  { id: "civisme", label: "Civisme & Valeurs", icon: <Flag className="inline h-5 w-5 mr-2 text-indigo-600" /> },
  { id: "histoire", label: "Histoire de France", icon: <BookOpen className="inline h-5 w-5 mr-2 text-indigo-600" /> }
  // Ajoutez ici d'autres thèmes plus tard
];

// Questions par thème
const QUESTIONS_DB: Record<string, { question: string; options: string[]; answer: number; explanation: string; }[]> = {
  civisme: [
    {
      question: "Quels sont les trois principes de la devise de la France ?",
      options: [
        "Travail, Famille, Patrie",
        "Liberté, Égalité, Fraternité",
        "Paix, Union, Respect",
        "Force, Honneur, Gloire"
      ],
      answer: 1,
      explanation: "La devise officielle est « Liberté, Égalité, Fraternité »."
    },
    {
      question: "Que garantit la laïcité en France ?",
      options: [
        "Le pouvoir à l’Église",
        "L’égalité homme-femme",
        "La liberté de croire ou de ne pas croire",
        "La préférence religieuse à l’école"
      ],
      answer: 2,
      explanation: "La laïcité garantit la liberté de conscience et assure la neutralité de l’État."
    }
  ],
  histoire: [
    {
      question: "Qu’a-t-on célébré le 14 juillet 1789 ?",
      options: [
        "La prise de la Bastille",
        "Le sacre de Napoléon",
        "La déclaration des droits de l’homme",
        "L’indépendance de la France"
      ],
      answer: 0,
      explanation: "Le 14 juillet 1789, la prise de la Bastille marque le début de la Révolution Française."
    },
    {
      question: "Qui était Jeanne d’Arc ?",
      options: [
        "Une reine de France",
        "Une héroïne de la guerre de Cent Ans",
        "Une chanteuse populaire",
        "Une peintre impressionniste"
      ],
      answer: 1,
      explanation: "Jeanne d’Arc mena les armées françaises durant la guerre de Cent Ans."
    }
  ]
};

// Gestion du score local
function loadHistory() {
  try {
    const s = localStorage.getItem("naturalization_history");
    return s ? JSON.parse(s) : [];
  } catch {
    return [];
  }
}
function saveHistory(history: any[]) {
  try {
    localStorage.setItem("naturalization_history", JSON.stringify(history));
  } catch {}
}

interface NaturalizationTestSimulatorToolProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}

const NaturalizationTestSimulatorTool: React.FC<NaturalizationTestSimulatorToolProps> = ({ onBack }) => {
  const { t } = useI18n();
  const [step, setStep] = useState<"theme" | "quiz" | "result" | "history">("theme");
  const [theme, setTheme] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  // Lorsque l'utilisateur choisit un thème
  const startQuiz = (selectedTheme: string) => {
    setTheme(selectedTheme);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setShowFeedback(false);
    setStep("quiz");
  };

  // Lorsque l'utilisateur répond à une question
  const handleAnswer = (idx: number) => {
    if (selected !== null) return; // déjà répondu
    setSelected(idx);
    setShowFeedback(true);
    if (theme && idx === QUESTIONS_DB[theme][current].answer) {
      setScore((prev) => prev + 1);
    }
  };

  // Passer à la question suivante ou au résultat
  const handleNext = () => {
    setShowFeedback(false);
    setSelected(null);
    if (theme && current + 1 < QUESTIONS_DB[theme].length) {
      setCurrent(current + 1);
    } else {
      setStep("result");
      // Enregistrer score en historique
      const newHistory = [
        { date: new Date().toLocaleDateString("fr-FR",{ day:"2-digit", month:"2-digit", year:"numeric" }), theme, score }
      , ...history].slice(0,10); // Garder 10 dernières
      setHistory(newHistory);
      saveHistory(newHistory);
    }
  };

  // Relancer test ou retour
  const handleRestart = () => {
    setStep("theme");
    setTheme(null);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setShowFeedback(false);
  };

  // Bloc sélection du thème
  function ThemeSelection() {
    return (
      <div className="space-y-6 animate-fade-in">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('common.back')}
        </Button>
        <h1 className="text-2xl font-bold flex items-center gap-2 mt-6">
          <Award className="h-7 w-7 text-indigo-600" />
          {t('naturalization.title')}
        </h1>
        <div className="mt-5">
          <div className="text-gray-700 font-semibold mb-1">{t('naturalization.choose_theme')}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {THEMES.map(t => (
              <Button key={t.id} className="flex-1 text-base" variant="default" onClick={() => startQuiz(t.id)}>
                {t.icon}
                {t.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <Button size="sm" variant="outline" onClick={()=>setStep("history")} className="text-xs">
            {t('naturalization.view_history')}
          </Button>
        </div>
      </div>
    );
  }

  // Bloc QCM quiz
  function QuizBlock() {
    if (!theme) return null;
    const q = QUESTIONS_DB[theme][current];
    return (
      <div className="space-y-6 animate-fade-in">
        <Button variant="outline" onClick={handleRestart}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('naturalization.change_theme')}
        </Button>
        <div className="flex items-center gap-3 mt-4">
          <Award className="h-6 w-6 text-indigo-600" />
          <span className="text-xl font-semibold">{THEMES.find(t=>t.id===theme)?.label} : {t('naturalization.question')} {current+1}/{QUESTIONS_DB[theme].length}</span>
        </div>
        <div className="p-4 border rounded-lg bg-indigo-50 dark:bg-indigo-950 dark:text-white text-lg font-medium">{q.question}</div>
        <div className="flex flex-col gap-2">
          {q.options.map((opt, idx) => (
            <Button
              key={idx}
              variant="outline"
              onClick={() => handleAnswer(idx)}
              disabled={selected!==null}
              className={`w-full text-left transition 
                ${selected!==null
                  ? idx===q.answer
                    ? "bg-green-100 text-green-900 font-semibold"
                    : idx===selected
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100"
                  : "bg-white"
                }`}
            >
              {opt}
            </Button>
          ))}
        </div>
        {showFeedback && (
          <div className={`rounded-lg p-4 mt-2 ${selected===q.answer?"bg-green-50 text-green-800":"bg-red-50 text-red-800"}`}>
            {selected === q.answer ? `✅ ${t('naturalization.correct_answer')}` : `❌ ${t('naturalization.wrong_answer')}`}
            <div className="italic mt-1 text-sm">{q.explanation}</div>
          </div>
        )}
        <div className="flex gap-2 mt-4">
          {showFeedback && (
            <Button onClick={handleNext} variant="default" className="ml-auto">
              {current+1 < QUESTIONS_DB[theme].length ? t('naturalization.next_question') : t('naturalization.see_score')}
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Bloc Résultat
  function ResultBlock() {
    if (!theme) return null;
    const total = QUESTIONS_DB[theme].length;
    const percent = Math.round((score/total)*100);
    let message = "";
    if (percent===100) message=t('naturalization.perfect_score');
    else if (percent >=80) message=t('naturalization.excellent_score');
    else if (percent >=60) message=t('naturalization.good_score');
    else message=t('naturalization.keep_trying');

    return (
      <div className="space-y-6 text-center animate-fade-in">
        <h2 className="text-2xl font-bold text-indigo-700 mt-4">
          {t('naturalization.result_theme')} {THEMES.find(t=>t.id===theme)?.label}
        </h2>
        <div className="text-5xl font-bold text-indigo-800">{score} / {total}</div>
        <div className="text-lg text-gray-700 mt-2">{message}</div>
        <Button className="mt-4" variant="outline" onClick={handleRestart}>
          {t('naturalization.retake_test')}
        </Button>
        <Button className="mt-4 ml-2" variant="outline" onClick={()=>setStep("theme")}>
          {t('naturalization.choose_another_theme')}
        </Button>
        <Button className="mt-4 ml-2" size="sm" variant="outline" onClick={()=>setStep("history")}>
          {t('naturalization.view_my_history')}
        </Button>
        <Button className="mt-4 ml-2" size="sm" variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('common.back')}
        </Button>
      </div>
    );
  }

  // Bloc historique de scores récents
  function HistoryBlock() {
    return (
      <div className="max-w-lg mx-auto p-4 animate-fade-in">
        <Button variant="outline" onClick={()=>setStep("theme")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('naturalization.back_to_test')}
        </Button>
        <h2 className="text-xl font-bold mt-5 mb-2 flex items-center gap-2">
          <Award className="h-6 w-6 text-indigo-600" />
          {t('naturalization.score_history')}
        </h2>
        {history.length === 0 ? (
          <div className="text-gray-500 py-8 text-center">{t('naturalization.no_tests')}</div>
        ) : (
          <table className="w-full mt-3 text-sm">
            <thead>
              <tr className="text-left text-gray-700">
                <th className="py-2">{t('naturalization.date')}</th>
                <th className="py-2">{t('naturalization.theme')}</th>
                <th className="py-2">{t('naturalization.score')}</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h, i) => (
                <tr key={h.date + h.theme + i} className="border-t">
                  <td className="py-1">{h.date}</td>
                  <td className="py-1">{THEMES.find(t=>t.id===h.theme)?.label || h.theme}</td>
                  <td className="py-1">{h.score} / {QUESTIONS_DB[h.theme]?.length||"--"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {step === "theme" && <ThemeSelection />}
      {step === "quiz" && <QuizBlock />}
      {step === "result" && <ResultBlock />}
      {step === "history" && <HistoryBlock />}
    </div>
  );
};

export default NaturalizationTestSimulatorTool;
