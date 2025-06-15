
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Filter, CalendarDays, Search as SearchIcon } from "lucide-react";

interface Tradition {
  name: string;
  type: "Jour férié" | "Religieuse" | "Régionale" | "Civile";
  emoji: string;
  description: string;
  // Pour les dates mobiles, on pointe juste sur la date estimée pour l'année courante
  date: string;
  location?: string; // pour les localisées
}

const YEAR = new Date().getFullYear();

// Base de fêtes/traditions : extensible
const TRADITIONS: Tradition[] = [
  {
    name: "Jour de l’An",
    type: "Jour férié",
    emoji: "🎉",
    description: "Nouvel an civil, célébré dans toute la France.",
    date: `${YEAR}-01-01`
  },
  {
    name: "Épiphanie",
    type: "Religieuse",
    emoji: "👑",
    description: "Dégustation de la galette des rois, début janvier.",
    date: `${YEAR}-01-06`
  },
  {
    name: "Chandeleur",
    type: "Régionale", // corrigé depuis "Traditionnelle"
    emoji: "🥞",
    description: "Fête des crêpes le 2 février.",
    date: `${YEAR}-02-02`
  },
  {
    name: "Saint-Valentin",
    type: "Civile",
    emoji: "💌",
    description: "Fête des amoureux.",
    date: `${YEAR}-02-14`
  },
  {
    name: "Mardi Gras",
    type: "Régionale", // corrigé depuis "Traditionnelle"
    emoji: "🎭",
    description: "Carnaval, déguisements et gourmandises.",
    date: `${YEAR}-02-13` // 2025 : 4 mars, mais date variable, prendre estimée
  },
  {
    name: "Pâques",
    type: "Religieuse",
    emoji: "🐣",
    description: "Chasse aux œufs, fête chrétienne.",
    date: `${YEAR}-03-31` // 2024 : 31 mars, 2025 : 20 avril, date mobile simplifiée
  },
  {
    name: "Fête du Travail",
    type: "Jour férié",
    emoji: "🌱",
    description: "Distribution de muguet, 1er mai.",
    date: `${YEAR}-05-01`
  },
  {
    name: "Victoire 1945",
    type: "Jour férié",
    emoji: "✌️",
    description: "Commémoration de la fin de la Seconde Guerre mondiale en Europe.",
    date: `${YEAR}-05-08`
  },
  {
    name: "Fête de la Musique",
    type: "Civile",
    emoji: "🎶",
    description: "Concerts gratuits dans toute la France.",
    date: `${YEAR}-06-21`
  },
  {
    name: "Fête Nationale",
    type: "Jour férié",
    emoji: "🇫🇷",
    description: "Défilé, feux d’artifice, bal du 14 juillet.",
    date: `${YEAR}-07-14`
  },
  {
    name: "Assomption",
    type: "Religieuse",
    emoji: "🙏",
    description: "Fête catholique, jour férié.",
    date: `${YEAR}-08-15`
  },
  {
    name: "Toussaint",
    type: "Religieuse",
    emoji: "🕯️",
    description: "Jour de mémoire pour les défunts.",
    date: `${YEAR}-11-01`
  },
  {
    name: "Armistice 1918",
    type: "Jour férié",
    emoji: "🕊️",
    description: "Fin de la Première Guerre mondiale.",
    date: `${YEAR}-11-11`
  },
  {
    name: "Noël",
    type: "Religieuse",
    emoji: "🎄",
    description: "Réveillon, cadeaux, traditions familiales.",
    date: `${YEAR}-12-25`
  },
  {
    name: "Pardons bretons",
    type: "Régionale",
    emoji: "⛪",
    description: "Grandes processions religieuses en Bretagne.",
    date: `${YEAR}-08-15`,
    location: "Bretagne"
  },
  {
    name: "Féria de Nîmes",
    type: "Régionale",
    emoji: "🐂",
    description: "Courses de taureaux, festivités, Sud de la France.",
    date: `${YEAR}-05-17`,
    location: "Occitanie"
  },
  {
    name: "Fête des Lumières",
    type: "Régionale",
    emoji: "🕯️",
    description: "Illuminations, Lyon début décembre.",
    date: `${YEAR}-12-08`,
    location: "Lyon"
  },
  {
    name: "Carnaval de Nice",
    type: "Régionale",
    emoji: "🌼",
    description: "Défilé de chars fleuris, Nice en février.",
    date: `${YEAR}-02-17`,
    location: "Nice"
  }
];

const ALL_TYPES = [
  "Tous",
  ...Array.from(new Set(TRADITIONS.map(t => t.type)))
];

// Utilitaire formatage date DD/MM
const formatDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "long" });
};

interface TraditionsGuideToolProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}

const TraditionsGuideTool: React.FC<TraditionsGuideToolProps> = ({ onBack }) => {
  const [typeFilter, setTypeFilter] = useState<string>("Tous");
  const [query, setQuery] = useState<string>("");

  // Filtrage
  const filtered = useMemo(() => {
    return TRADITIONS.filter(t => {
      const okType = typeFilter === "Tous" || t.type === typeFilter;
      const okQuery =
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.description.toLowerCase().includes(query.toLowerCase());
      return okType && okQuery;
    }).sort((a, b) => a.date.localeCompare(b.date));
  }, [typeFilter, query]);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Button variant="outline" onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour
      </Button>
      <h1 className="text-2xl font-bold flex items-center gap-2 mt-6">
        <Heart className="h-7 w-7 text-indigo-600" />
        Guide Fêtes et Traditions
      </h1>

      <div className="flex flex-col md:flex-row items-stretch gap-3 mt-2 animate-fade-in">
        <div className="flex gap-2">
          <div className="relative flex items-center">
            <Filter className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-500" />
            <select
              value={typeFilter}
              className="pl-8 pr-4 py-2 rounded-md border text-sm shadow focus:ring-2 ring-indigo-500 bg-white"
              onChange={e => setTypeFilter(e.target.value)}
              aria-label="Filtrer par type"
            >
              {ALL_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-500" />
          <input
            type="search"
            aria-label="Recherche fête ou tradition"
            className="w-full pl-8 pr-4 py-2 rounded-md border text-sm shadow focus:ring-2 ring-indigo-500 bg-white"
            placeholder="Recherche par nom ou description…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoComplete="off"
          />
        </div>
      </div>

      <div className="mt-3 grid gap-3">
        {filtered.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            Aucune fête ou tradition trouvée.
          </div>
        )}
        {filtered.map((fete, i) => (
          <div
            key={fete.name + fete.date}
            className="flex flex-col md:flex-row items-center gap-4 animate-fade-in bg-indigo-50 dark:bg-indigo-950 rounded-lg border p-4 shadow-sm"
          >
            <div className="flex flex-col items-center min-w-[62px]">
              <span className="text-3xl" title={fete.emoji}>{fete.emoji}</span>
              <span className="text-xs mt-1 text-indigo-700">{fete.type}</span>
            </div>
            <div className="flex flex-col flex-1">
              <div className="font-bold text-indigo-900 dark:text-white text-lg flex items-center gap-2">
                {fete.name}
                <CalendarDays className="h-4 w-4 text-indigo-400" />
                <span className="text-sm text-gray-600">{formatDate(fete.date)}</span>
              </div>
              <div className="text-gray-700 dark:text-gray-200 text-sm mt-1">{fete.description}</div>
              {fete.location && (
                <span className="text-xs text-gray-500 mt-1 italic">Région/ville : {fete.location}</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-7 text-xs text-gray-400">
        Liste indicative : pour suggestions ou ajouts régionaux, contactez-nous !
      </div>
    </div>
  );
};

export default TraditionsGuideTool;
