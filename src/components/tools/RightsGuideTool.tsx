
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, FileText, ChevronRight } from "lucide-react";

// Base locale des droits essentiels pour étrangers en France
const GUIDE_DATA = [
  {
    id: "sejour",
    category: "Séjour & Titres",
    rights: [
      {
        question: "Ai-je le droit de séjourner en France ?",
        answer:
          "Selon votre situation (visa, statut étudiant, regroupement familial, asile…), vous devez disposer d’un titre de séjour valide.\n\nLa demande se fait généralement en préfecture, avec dossier complet (justificatifs, formulaires).\n\n**En cas de refus :**\n- Exiger une notification écrite motivée\n- Possibilité de recours gracieux (à la préfecture) sous 2 mois\n- Ou recours contentieux devant le tribunal administratif sous 2 mois\n\n**Ressources :**\n- https://www.service-public.fr/particuliers/vosdroits/N110\n- Associations d’aide : France Terre d’Asile, Cimade…",
      },
      {
        question: "Que faire si mon récépissé a expiré ?",
        answer:
          "Vous pouvez demander un renouvellement en préfecture, en expliquant la situation (délais, absence de réponse, etc.). Préparez toute preuve de démarche ou d’attente.\n\n**Conseil :** Prenez rendez-vous en ligne dès que possible. En cas de difficulté, contactez une association d’aide.",
      },
    ],
  },
  {
    id: "logement",
    category: "Logement",
    rights: [
      {
        question: "Quels sont mes droits pour accéder à un logement ?",
        answer:
          "Tout étranger régulièrement installé peut louer un logement et a droit à la protection du domicile (expulsion encadrée).\n\n**En cas de refus de location ou de discrimination :**\n- Demander une justification écrite du refus\n- Saisir le Défenseur des Droits (gratuit)\n\n**Recours :** Si vous recevez un préavis d’expulsion ou tout document officiel, contactez rapidement une association ou l’ADIL locale.",
      },
      {
        question: "Ai-je droit à des aides au logement ?",
        answer:
          "Vous pouvez prétendre à l’APL (CAF) si vous êtes locataire, selon votre statut, ressources et le type de logement.\n\n**Démarches :**\n- Créer un compte CAF.fr et compléter la demande\n- Transmettre pièce d’identité/titre de séjour\n- Joindre bail, justificatif de loyer, RIB\n\nEn cas de refus, faire une réclamation sur votre espace CAF, puis saisir la Commission de Recours Amiable.",
      },
    ],
  },
  {
    id: "travail",
    category: "Travail & Emploi",
    rights: [
      {
        question: "Puis-je travailler avec mon titre de séjour ?",
        answer:
          "Certains titres l’autorisent explicitement (mention « autorise travail »). Pour les étudiants, il existe un quota d’heures.\n\nDemandez l’ajout de la mention en préfecture si besoin.\n\n**En cas de refus d’employeur lié à votre titre :**\n- Demandez une justification écrite\n- Saisir le Défenseur des Droits en cas de discrimination.",
      },
      {
        question: "Que faire si mon contrat est rompu (discrimination, licenciement injuste…) ?",
        answer:
          "Contactez l’Inspection du travail ou une association spécialisée (France Terre d’Asile, syndicats).\n\nVous pouvez contester un licenciement devant le Conseil de Prud’hommes, même en étant étranger.",
      },
    ],
  },
  {
    id: "sante",
    category: "Santé & Droits sociaux",
    rights: [
      {
        question: "Comment accéder à la Sécurité sociale en tant qu’étranger ?",
        answer:
          "Il faut s’inscrire à la CPAM (Assurance Maladie) avec votre titre de séjour. Pour les demandeurs d’asile, l’AME (Aide Médicale d’État) peut couvrir vos frais.\n\n**Ressources et recours :**\n- Si refus, saisir la CRA de la CPAM\n- Aide gratuite : PASS (hôpital) ou assistante sociale",
      },
      {
        question: "Ai-je droit à la complémentaire santé (mutuelle) ?",
        answer:
          "La Complémentaire Santé Solidaire (CSS, ex-CMU) est accessible sous conditions de ressources, pour tous résidant en France stablement. Faire la demande auprès de la caisse d’assurance maladie.",
      },
    ],
  },
  {
    id: "education",
    category: "Éducation & Famille",
    rights: [
      {
        question: "Mon enfant a-t-il droit à la scolarisation ?",
        answer:
          "Oui : tout enfant résidant, même sans-papiers, a droit à l’école gratuite de 3 à 16 ans. L’école n’a pas le droit de refuser l’inscription.\n\n**En cas de refus :**\n- Demander un refus écrit\n- Saisir le rectorat ou la mairie\n- Appeler le Défenseur des Droits en cas de blocage persistant.",
      },
      {
        question: "Quelles aides familiales puis-je demander ?",
        answer:
          "Les allocations familiales (CAF) sont versées selon la situation de séjour/résidence et le nombre d’enfants. Renseignez-vous auprès de la CAF locale : toute décision de refus ou de radiation peut être contestée devant la Commission de Recours Amiable dans les 2 mois.",
      },
    ],
  },
];

type GuideEntry = {
  question: string,
  answer: string
};

interface RightsGuideToolProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}

const RightsGuideTool: React.FC<RightsGuideToolProps> = ({ onBack }) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<{catId: string, idx: number} | null>(null);

  // Filtrage dynamique : question ou catégorie
  const filtered = GUIDE_DATA.flatMap(cat => {
    const entries = cat.rights
      .map((entry, idx) => ({ ...entry, catId: cat.id, category: cat.category, idx }))
      .filter(entry =>
        entry.question.toLowerCase().includes(search.toLowerCase())
        || entry.answer.toLowerCase().includes(search.toLowerCase())
        || cat.category.toLowerCase().includes(search.toLowerCase())
      );
    return entries.length > 0 ? entries : [];
  });

  // Affichage détail si sélectionné
  if (selected) {
    const cat = GUIDE_DATA.find(c => c.id === selected.catId);
    const entry = cat?.rights[selected.idx];
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <Button variant="outline" onClick={() => setSelected(null)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{entry?.question}</CardTitle>
            <CardDescription>Catégorie : {cat?.category}</CardDescription>
          </CardHeader>
          <CardContent className="prose max-w-none whitespace-pre-line text-gray-700">
            {entry?.answer?.split('\n').map((line, i) => (
              <div key={i}>
                {line.startsWith("**") && line.endsWith("**") ? (
                  <b>{line.replace(/\*+/g, '')}</b>
                ) : (
                  <>{line}</>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Button variant="outline" onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour
      </Button>
      <h1 className="text-2xl font-bold flex items-center gap-2 mt-6">
        <FileText className="h-7 w-7 text-gray-800" />
        Guide Droits &amp; Recours
      </h1>
      <Input
        placeholder="Rechercher (droit, situation, catégorie...)"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full max-w-md mt-2"
      />
      <div className="space-y-5">
        {GUIDE_DATA.map(cat => {
          const entries = cat.rights
            .map((entry, idx) => ({ ...entry, idx }))
            .filter(
              entry =>
                entry.question.toLowerCase().includes(search.toLowerCase()) ||
                entry.answer.toLowerCase().includes(search.toLowerCase()) ||
                cat.category.toLowerCase().includes(search.toLowerCase())
            );
          if (entries.length === 0) return null;
          return (
            <div key={cat.id}>
              <h2 className="text-lg font-semibold mt-4 mb-2 text-blue-700">{cat.category}</h2>
              <div className="grid gap-3">
                {entries.map(entry => (
                  <Card key={entry.question} className="cursor-pointer hover:shadow-lg focus:ring-2 focus:ring-blue-400"
                    tabIndex={0}
                    onClick={() => setSelected({ catId: cat.id, idx: entry.idx })}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') setSelected({ catId: cat.id, idx: entry.idx });
                    }}
                  >
                    <CardContent className="py-2 flex items-center justify-between">
                      <span>{entry.question}</span>
                      <ChevronRight />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            Aucun droit trouvé. Modifiez votre recherche ou consultez une association spécialisée.
          </div>
        )}
      </div>
      <div className="text-xs text-gray-500 pt-8">
        Données informatives. <b>Pensez à consulter un professionnel ou une association pour les cas complexes.</b>
      </div>
    </div>
  );
};

export default RightsGuideTool;
