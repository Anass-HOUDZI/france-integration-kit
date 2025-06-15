import React, { useState } from 'react';
import { 
  FileText, CheckSquare, Calculator, Calendar, PiggyBank, Globe,
  Users, MapPin, TrendingUp, Building, BookOpen, Award, Heart, PhoneCall, GraduationCap
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Clock, Search } from 'lucide-react';
import Footer from "./Footer";
import SidebarNav from "./SidebarNav";
import ProgressBar from "./ProgressBar";
import UserMenu from "./UserMenu";
import { toast } from "@/hooks/use-toast";

// Toutes les icônes Lucide sont intégrées via SidebarNav, on utilise les couleurs là-bas.

interface HomePageProps {
  onStartJourney: () => void;
}

const allTools = [
  // Démarches Administratives (12 outils)
  { id: 'letter_generator', title: 'Générateur de Lettres', category: 'admin', icon: FileText, status: 'active' },
  { id: 'document_checker', title: 'Vérificateur de Documents', category: 'admin', icon: CheckSquare, status: 'active' },
  { id: 'fee_calculator', title: 'Calculateur de Frais', category: 'admin', icon: Calculator, status: 'active' },
  { id: 'appointment_planner', title: 'Planificateur RDV', category: 'admin', icon: Calendar, status: 'active' },
  { id: 'form_assistant', title: 'Assistant Formulaires CERFA', category: 'admin', icon: FileText, status: 'coming_soon' },
  { id: 'delay_simulator', title: 'Simulateur de Délais', category: 'admin', icon: Clock, status: 'coming_soon' },
  { id: 'receipt_generator', title: 'Générateur de Récépissés', category: 'admin', icon: FileText, status: 'coming_soon' },
  { id: 'tax_assistant', title: 'Assistant Déclarations Fiscales', category: 'admin', icon: Calculator, status: 'coming_soon' },
  { id: 'apl_calculator', title: 'Calculateur APL/CAF', category: 'admin', icon: PiggyBank, status: 'coming_soon' },
  { id: 'attestation_generator', title: 'Générateur Attestations', category: 'admin', icon: FileText, status: 'coming_soon' },
  { id: 'admin_translator', title: 'Traducteur Termes Administratifs', category: 'admin', icon: Globe, status: 'coming_soon' },
  { id: 'profile_guide', title: 'Guide Démarches par Profil', category: 'admin', icon: Users, status: 'coming_soon' },
  
  // Logement & Vie Quotidienne (8 outils)
  { id: 'budget_calculator', title: 'Calculateur Budget Logement', category: 'logement', icon: Calculator, status: 'active' },
  { id: 'rental_dossier', title: 'Générateur Dossier Locatif', category: 'logement', icon: FileText, status: 'active' },
  { id: 'state_of_play', title: 'Assistant État des Lieux', category: 'logement', icon: CheckSquare, status: 'active' },
  { id: 'neighborhood_comparator', title: 'Comparateur de Quartiers', category: 'logement', icon: MapPin, status: 'coming_soon' },
  { id: 'moving_calculator', title: 'Calculateur Frais Déménagement', category: 'logement', icon: Calculator, status: 'coming_soon' },
  { id: 'rent_negotiator', title: 'Guide Négociation Loyer', category: 'logement', icon: TrendingUp, status: 'coming_soon' },
  { id: 'moving_planner', title: 'Planificateur Emménagement', category: 'logement', icon: Calendar, status: 'coming_soon' },
  { id: 'insurance_assistant', title: 'Assistant Assurance Habitation', category: 'logement', icon: Building, status: 'coming_soon' },
  
  // Emploi & Formation (8 outils)
  { id: 'cv_translator', title: 'Traducteur de CV Français', category: 'emploi', icon: FileText, status: 'active' },
  { id: 'salary_calculator', title: 'Calculateur Salaire Net', category: 'emploi', icon: Calculator, status: 'active' },
  { id: 'motivation_letter', title: 'Générateur Lettres de Motivation', category: 'emploi', icon: FileText, status: 'active' },
  { id: 'diploma_equivalence', title: 'Équivalence Diplômes Étrangers', category: 'emploi', icon: GraduationCap, status: 'active' },
  { id: 'interview_assistant', title: 'Assistant Entretien d\'Embauche', category: 'emploi', icon: Users, status: 'active' },
  { id: 'unemployment_simulator', title: 'Simulateur Droits Pôle Emploi', category: 'emploi', icon: Calculator, status: 'coming_soon' },
  { id: 'training_guide', title: 'Guide Formation Professionnelle', category: 'emploi', icon: BookOpen, status: 'coming_soon' },
  { id: 'portfolio_creator', title: 'Créateur Portfolio Professionnel', category: 'emploi', icon: Award, status: 'coming_soon' },
  
  // Santé & Social (6 outils)
  { id: 'social_security_guide', title: 'Guide Sécurité Sociale', category: 'sante', icon: Heart, status: 'coming_soon' },
  { id: 'health_calculator', title: 'Calculateur Remboursements Santé', category: 'sante', icon: Calculator, status: 'coming_soon' },
  { id: 'mutual_assistant', title: 'Assistant Mutuelle', category: 'sante', icon: Building, status: 'coming_soon' },
  { id: 'medical_translator', title: 'Traducteur Médical', category: 'sante', icon: Globe, status: 'coming_soon' },
  { id: 'social_services', title: 'Localisateur Services Sociaux', category: 'sante', icon: MapPin, status: 'coming_soon' },
  { id: 'emergency_guide', title: 'Guide Urgences Médicales', category: 'sante', icon: PhoneCall, status: 'coming_soon' },
  
  // Éducation & Famille (6 outils)
  { id: 'school_enrollment', title: 'Guide Inscription Scolaire', category: 'education', icon: GraduationCap, status: 'coming_soon' },
  { id: 'family_allowances', title: 'Calculateur Allocations Familiales', category: 'education', icon: Calculator, status: 'coming_soon' },
  { id: 'childcare_assistant', title: 'Assistant Garde d\'Enfants', category: 'education', icon: Users, status: 'coming_soon' },
  { id: 'higher_education', title: 'Guide Études Supérieures', category: 'education', icon: GraduationCap, status: 'coming_soon' },
  { id: 'report_translator', title: 'Traducteur Bulletins Scolaires', category: 'education', icon: Globe, status: 'coming_soon' },
  { id: 'education_costs', title: 'Calculateur Frais Scolarité', category: 'education', icon: Calculator, status: 'coming_soon' },
  
  // Intégration Culturelle (5 outils)
  { id: 'culture_quiz', title: 'Quiz Culture Française', category: 'culture', icon: Globe, status: 'coming_soon' },
  { id: 'french_assistant', title: 'Assistant Apprentissage Français', category: 'culture', icon: BookOpen, status: 'coming_soon' },
  { id: 'traditions_guide', title: 'Guide Fêtes et Traditions', category: 'culture', icon: Heart, status: 'coming_soon' },
  { id: 'naturalization_test', title: 'Simulateur Test Naturalisation', category: 'culture', icon: Award, status: 'coming_soon' },
  { id: 'expressions_translator', title: 'Traducteur Expressions Françaises', category: 'culture', icon: Globe, status: 'coming_soon' },
  
  // Outils Transversaux (5 outils)
  { id: 'universal_converter', title: 'Convertisseur Universel', category: 'transversal', icon: Calculator, status: 'coming_soon' },
  { id: 'emergency_assistant', title: 'Assistant Urgences', category: 'transversal', icon: PhoneCall, status: 'coming_soon' },
  { id: 'planning_generator', title: 'Générateur Planning', category: 'transversal', icon: Calendar, status: 'coming_soon' },
  { id: 'budget_assistant', title: 'Assistant Budget Familial', category: 'transversal', icon: PiggyBank, status: 'coming_soon' },
  { id: 'rights_guide', title: 'Guide Droits et Recours', category: 'transversal', icon: FileText, status: 'coming_soon' }
];

const categories = [
  { id: 'all', name: 'Tous les outils', count: allTools.length, color: 'bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500' },
  { id: 'admin', name: 'Démarches Admin', count: allTools.filter(t => t.category === 'admin').length, color: 'bg-blue-500' },
  { id: 'logement', name: 'Logement', count: allTools.filter(t => t.category === 'logement').length, color: 'bg-green-500' },
  { id: 'emploi', name: 'Emploi', count: allTools.filter(t => t.category === 'emploi').length, color: 'bg-purple-500' },
  { id: 'sante', name: 'Santé', count: allTools.filter(t => t.category === 'sante').length, color: 'bg-red-500' },
  { id: 'education', name: 'Éducation', count: allTools.filter(t => t.category === 'education').length, color: 'bg-yellow-500' },
  { id: 'culture', name: 'Culture', count: allTools.filter(t => t.category === 'culture').length, color: 'bg-indigo-500' },
  { id: 'transversal', name: 'Transversal', count: allTools.filter(t => t.category === 'transversal').length, color: 'bg-gray-500' }
];

const HomePage: React.FC<HomePageProps> = ({ onStartJourney }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTools = allTools.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeToolsCount = allTools.filter(t => t.status === 'active').length;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-indigo-100 via-white to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      {/* Sidebar Navigation */}
      <div className="hidden md:block w-56 shrink-0">
        <SidebarNav selected={selectedCategory} onSelect={setSelectedCategory} />
      </div>

      {/* Main content */}
      <div className="flex-1 w-full max-w-full mx-auto px-2 sm:px-6 md:px-10 flex flex-col relative">

        {/* Sticky Top Area */}
        <section className="sticky top-0 z-30 bg-gradient-to-tr from-white/70 to-indigo-50/60 dark:from-gray-900 dark:to-gray-900/70 backdrop-blur flex flex-col md:flex-row items-center gap-2 pt-3 pb-1 shadow">
          <div className="flex flex-1 items-center gap-2 w-full">
            <Search className="text-indigo-400 h-5 w-5 absolute ml-4 pointer-events-none" />
            <Input
              placeholder="Rechercher un outil, une catégorie..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 py-2 w-full rounded-2xl bg-white/60 dark:bg-slate-800 border shadow-sm focus:outline-none max-w-xs"
            />
          </div>
          <div className="flex items-center gap-3">
            <UserMenu />
            <Button 
              variant="default"
              size="sm"
              onClick={onStartJourney}
              className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white font-bold px-4 py-2 rounded-full shadow hover:scale-105 transition-all"
            >
              Profiler mon parcours
            </Button>
          </div>
        </section>

        {/* ProgressBar */}
        <ProgressBar active={activeToolsCount} total={allTools.length} />

        {/* Hero */}
        <section className="pt-4 pb-4 text-center">
          <span className="inline-block rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-500 text-white px-4 py-2 mb-4 shadow-sm font-medium text-base">
            🇫🇷 Plateforme #1 de l’intégration gratuite
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-3">
            IntégrationFrance.org
          </h1>
          <p className="text-md md:text-lg text-gray-700 dark:text-gray-200 mb-3">
            <strong>+50 outils digitaux gratuits</strong> pour <b className="bg-fuchsia-100 dark:bg-fuchsia-900/30 rounded px-2 text-fuchsia-700 dark:text-fuchsia-200">réussir votre intégration</b> et démarches en France, <span className="underline">sans inscription</span>.
          </p>
          <div className="flex flex-col xs:flex-row gap-3 xs:justify-center items-center mb-5">
            <Badge variant="default" className="bg-green-100 text-green-700">{activeToolsCount} outils accessibles ✨</Badge>
            <Badge variant="secondary" className="bg-fuchsia-100 text-fuchsia-700">{allTools.length - activeToolsCount} en dev</Badge>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">100% gratuit</Badge>
          </div>
        </section>

        {/* Liste des outils */}
        <section className="pb-5 px-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredTools.map((tool) => (
              <Card 
                key={tool.id}
                className={`transition duration-200 border-0 rounded-2xl shadow-xl group hover:shadow-2xl hover:scale-105 cursor-pointer px-2 py-3 relative overflow-hidden ${
                  tool.status === 'active' 
                    ? 'hover:ring-2 hover:ring-indigo-200'
                    : 'opacity-70'
                } bg-white/90 dark:bg-slate-800/90`}
                onClick={tool.status === 'active' ? onStartJourney : undefined}
              >
                <CardHeader className="pb-1 flex items-center flex-row gap-3">
                  <div className={`rounded-full shadow-inner bg-gradient-to-br from-white via-indigo-100 to-indigo-300 dark:from-gray-800 dark:to-fuchsia-900 p-3 flex items-center`}>
                    {/* Icon: Lucide plus grande */}
                    <tool.icon className="h-8 w-8 text-indigo-500 group-hover:scale-110 transition" />
                  </div>
                  <CardTitle className="text-base font-bold flex-1 truncate">{tool.title}</CardTitle>
                  <Badge className={
                    tool.status === 'active'
                      ? "bg-green-400 text-white text-xs shadow-sm"
                      : "bg-fuchsia-200 text-fuchsia-800 text-xs"
                    }>
                    {tool.status === 'active' ? "Actif" : "Bientôt"}
                  </Badge>
                </CardHeader>
                <CardContent className="pt-0 pb-2">
                  {tool.status === 'active' ? (
                    <Button 
                      size="sm" 
                      className="w-full font-medium bg-gradient-to-tr from-indigo-400 via-violet-400 to-fuchsia-400 text-white shadow  text-xs mt-2"
                      onClick={onStartJourney}
                    >
                      Utiliser
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="w-full text-xs opacity-80 mt-2" disabled>
                      <Clock className="mr-1 h-3 w-3" />
                      Bientôt
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
