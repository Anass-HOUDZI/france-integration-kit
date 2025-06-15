
import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Globe, Star, StarOff, Search } from "lucide-react";

// Dictionnaire simplifié pour démarrer
type Expression = {
  id: string;
  expression: string;
  description: string;
  traductions: Record<string, { traduction: string; exemple?: string }>;
  explication: string;
};

const EXPRESSIONS: Expression[] = [
  {
    id: "1",
    expression: "Donner sa langue au chat",
    description: "Abandonner la recherche d’une solution, ne pas savoir répondre à une question.",
    explication: "Cette expression vient du jeu de devinettes : si l’on « donne sa langue au chat », on abandonne et on demande la réponse.",
    traductions: {
      en: { traduction: "To give up (on finding the answer)", exemple: "I give up! What's the answer?" },
      ar: { traduction: "أستسلم (ولا أعرف الجواب)" },
      es: { traduction: "Rendirse, no saber la réponse" }
    }
  },
  {
    id: "2",
    expression: "Tomber dans les pommes",
    description: "S’évanouir, perdre connaissance.",
    explication: "Populaire : jeu sur le mot 'pâmes', vieux français pour évanouissement.",
    traductions: {
      en: { traduction: "To faint, to pass out", exemple: "She fainted during class." },
      ar: { traduction: "يُغمى عليه" },
      es: { traduction: "Desmayarse" }
    }
  },
  {
    id: "3",
    expression: "Avoir le cafard",
    description: "Être déprimé, avoir le moral bas.",
    explication: "Expression imagée : le « cafard » symbolise la mélancolie, la tristesse.",
    traductions: {
      en: { traduction: "To feel blue, to be down", exemple: "He's got the blues today." },
      ar: { traduction: "يشعر بالاكتئاب" },
      es: { traduction: "Estar deprimido" }
    }
  },
  {
    id: "4",
    expression: "Coûter les yeux de la tête",
    description: "Être extrêmement cher.",
    explication: "Très imagée, exprime un coût jugé excessif, douloureux.",
    traductions: {
      en: { traduction: "To cost an arm and a leg" },
      ar: { traduction: "غالي جدًا" },
      es: { traduction: "Costar un ojo de la cara" }
    }
  },
  {
    id: "5",
    expression: "Poser un lapin",
    description: "Ne pas honorer un rendez-vous.",
    explication: "Remonterait au XIXe siècle, en référence à l’attente vaine.",
    traductions: {
      en: { traduction: "To stand someone up", exemple: "He stood me up last night." },
      ar: { traduction: "يترك شخصًا دون حضور موعد" },
      es: { traduction: "Dejar plantado/a" }
    }
  }
];

const SUPPORTED_LANGUAGES = [
  { code: "en", label: "Anglais" },
  { code: "ar", label: "Arabe" },
  { code: "es", label: "Espagnol" },
  // extensible : on pourra ajouter d’autres langues facilement
];

function loadFavorites(): string[] {
  try {
    return JSON.parse(localStorage.getItem("expression_favorites") || "[]");
  } catch {
    return [];
  }
}

function saveFavorites(favs: string[]) {
  localStorage.setItem("expression_favorites", JSON.stringify(favs));
}

interface ExpressionsTranslatorToolProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}

// UI favori (étoile pleine/vide)
function FavoriteStar({ favorited, onClick }: { favorited: boolean; onClick: () => void }) {
  return favorited ? (
    <Star className="text-yellow-400 cursor-pointer" onClick={onClick} strokeWidth={2.5} fill="#facc15" />
  ) : (
    <StarOff className="text-gray-300 cursor-pointer" onClick={onClick} strokeWidth={2.5} />
  );
}

const ExpressionsTranslatorTool: React.FC<ExpressionsTranslatorToolProps> = ({ onBack }) => {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("en");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showOnlyFavs, setShowOnlyFavs] = useState(false);

  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  // Expressions filtrées : recherche + favoris
  const expressions = useMemo(() => {
    let filtered = EXPRESSIONS.filter(exp =>
      exp.expression.toLowerCase().includes(query.trim().toLowerCase()) ||
      exp.description.toLowerCase().includes(query.trim().toLowerCase())
    );
    if (showOnlyFavs) {
      filtered = filtered.filter(exp => favorites.includes(exp.id));
    }
    // Suggest if not found
    return filtered;
  }, [query, showOnlyFavs, favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((curr) => {
      if (curr.includes(id)) {
        toast({ title: "Expression retirée des favoris !", description: undefined });
        return curr.filter(fid => fid !== id);
      } else {
        toast({ title: "Expression ajoutée aux favoris !", description: undefined });
        return [...curr, id];
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6 animate-fade-in">
      <Button variant="outline" onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour
      </Button>
      <h1 className="text-2xl font-bold flex items-center gap-2 mt-4">
        <Globe className="h-7 w-7 text-indigo-600" />
        Traducteur Expressions Françaises
      </h1>
      <p className="text-gray-600">
        Tapez une expression idiomatique française (ex : <span className="font-semibold">"Donner sa langue au chat"</span>) ou un mot-clé, choisissez votre langue, puis cliquez sur les étoiles pour ajouter en favori.
      </p>
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 flex gap-2">
          <Input
            placeholder="Chercher une expression…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="bg-white dark:bg-gray-800"
          />
        </div>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SUPPORTED_LANGUAGES.map(({ code, label }) => (
              <SelectItem key={code} value={code}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant={showOnlyFavs ? "default" : "outline"}
          className="md:w-40 mt-2 md:mt-0"
          onClick={() => setShowOnlyFavs(f => !f)}
        >
          <Star className={`mr-2 ${showOnlyFavs ? "text-yellow-400" : "text-gray-400"}`} fill={showOnlyFavs ? "#fde68a" : "none"} />
          {showOnlyFavs ? "Voir tous" : "Favoris"}
        </Button>
      </div>

      <div className="space-y-4">
        {expressions.length === 0 ? (
          <div className="text-center text-gray-500 flex flex-col items-center gap-2 mt-8">
            <Search className="h-7 w-7" />
            <span>Aucune expression trouvée…</span>
          </div>
        ) : (
          expressions.map(expr => {
            const trad = expr.traductions[language];
            return (
              <Card key={expr.id} className="relative shadow hover:shadow-lg transition-shadow bg-slate-50 dark:bg-slate-900">
                <CardHeader className="flex-row flex items-center gap-3">
                  <CardTitle className="flex-1">{expr.expression}</CardTitle>
                  <FavoriteStar favorited={favorites.includes(expr.id)} onClick={() => toggleFavorite(expr.id)} />
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-gray-800 dark:text-gray-200 italic">{expr.description}</div>
                  <div className="text-sm text-gray-500">{expr.explication}</div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                    <Badge className="bg-indigo-100 text-indigo-800">
                      Traduction&nbsp;
                      {SUPPORTED_LANGUAGES.find(l => l.code === language)?.label}
                    </Badge>
                    <span className="font-semibold">{trad?.traduction || <span className="text-gray-400">Non disponible</span>}</span>
                  </div>
                  {trad?.exemple && (
                    <div className="mt-1 text-xs text-gray-400">
                      Exemple : <span className="italic">{trad.exemple}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
      <div className="text-xs text-gray-400 pt-6 border-t mt-8 text-center">
        Plus de 500 expressions bientôt, suggestions possibles – Vos favoris sont stockés sur cet appareil.
      </div>
    </div>
  );
};

export default ExpressionsTranslatorTool;

