
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Calculator, 
  Calendar, 
  Home as HomeIcon, 
  Briefcase, 
  Heart,
  GraduationCap,
  Globe,
  Settings,
  Search,
  CheckSquare,
  Clock,
  MapPin,
  Users,
  PhoneCall,
  TrendingUp,
  BookOpen,
  Award,
  Building,
  PiggyBank
} from 'lucide-react';

interface HomePageProps {
  onStartJourney: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartJourney }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  const filteredTools = allTools.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeToolsCount = allTools.filter(t => t.status === 'active').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      {/* Recherche sticky top */}
      <section className="w-full sticky top-0 bg-white/80 dark:bg-gray-900/90 z-50 border-b shadow-md backdrop-blur-[6px] pb-2 pt-2">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-2 px-2">
          <div className="flex-1 flex items-center gap-2">
            <Search className="text-indigo-400 h-5 w-5 absolute ml-3 pointer-events-none" />
            <Input
              placeholder="Rechercher un outil, une catégorie..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 py-2 w-full rounded-2xl bg-white/60 dark:bg-slate-800 focus:outline-none border border-indigo-100 dark:border-slate-700 shadow-sm"
              style={{ maxWidth: 320 }}
            />
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                className={`rounded-full px-3 py-1 font-semibold ${selectedCategory === category.id ? 'bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow' : 'bg-white/70 dark:bg-slate-800'} transition-all duration-200`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name} <span className="ml-1 text-gray-300">{category.count}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="w-full pt-12 pb-6 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-500 text-white px-4 py-2 mb-4 shadow-sm font-medium text-base">
            🇫🇷 Plateforme #1 de l’intégration gratuite
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
            IntégrationFrance.org
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-4">
            <strong>+50 outils digitaux gratuits</strong> pour <b className="bg-fuchsia-100 dark:bg-fuchsia-900/30 rounded px-2 text-fuchsia-700 dark:text-fuchsia-200">réussir votre intégration</b> et toutes vos démarches en France, sans inscription ni publicité.
          </p>
          <div className="flex flex-col xs:flex-row gap-3 xs:justify-center items-center mb-8">
            <Badge variant="outline" className="bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
              {activeToolsCount} outils déjà accessibles ✨
            </Badge>
            <Badge variant="outline" className="bg-fuchsia-50 dark:bg-fuchsia-900/40 text-fuchsia-700 dark:text-fuchsia-200">
              {allTools.length - activeToolsCount} en développement
            </Badge>
            <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-200">
              100% gratuit et anonyme
            </Badge>
          </div>
          <Button 
            size="lg" 
            onClick={onStartJourney}
            className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white px-8 py-4 text-lg rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all"
          >
            🚀 Commencer mon parcours
          </Button>
        </div>
      </section>

      {/* Liste Catégories, sous forme cartes modernes et compactes */}
      <section className="px-4 pt-2 pb-2">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-4">
          {categories.slice(1).map(cat => {
            let Icon = HomeIcon;
            if (cat.id === 'admin') Icon = FileText;
            else if (cat.id === 'logement') Icon = HomeIcon;
            else if (cat.id === 'emploi') Icon = Briefcase;
            else if (cat.id === 'sante') Icon = Heart;
            else if (cat.id === 'education') Icon = GraduationCap;
            else if (cat.id === 'culture') Icon = Globe;
            else if (cat.id === 'transversal') Icon = Settings;
            return (
              <Card
                key={cat.id}
                className={`group flex flex-col items-center py-5 bg-white dark:bg-gray-800 rounded-2xl border-0 shadow-md hover:shadow-xl cursor-pointer transition-shadow relative overflow-hidden hover:scale-[1.045] duration-200`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <div className={`rounded-full mb-2 p-2 transition-colors duration-200 ${cat.color} shadow-inner`}>
                  <Icon className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
                <div className="text-base font-semibold text-gray-800 dark:text-white text-center">
                  {cat.name}
                </div>
                <div className="text-xs text-gray-400">{cat.count} outils</div>
                <div className={`absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_20%,rgba(147,51,234,0.16)_0%,transparent_70%)] opacity-0 group-hover:opacity-60 transition-opacity duration-200`} />
              </Card>
            );
          })}
        </div>
      </section>

      {/* Liste des Outils */}
      <section className="py-7 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredTools.map((tool) => (
              <Card 
                key={tool.id}
                className={`transition transform duration-200 border-0 rounded-xl shadow group ${
                  tool.status === 'active' 
                    ? 'hover:shadow-lg hover:scale-[1.03] cursor-pointer'
                    : 'opacity-75'
                } px-2 py-2 bg-white/90 dark:bg-slate-800/90`}
              >
                <CardHeader className="pb-2 flex items-center flex-row gap-2">
                  <div className="rounded-full bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-violet-500 flex items-center justify-center shadow-inner p-3">
                    {/* Icon: Lucide, plus grande */}
                    <tool.icon className="h-7 w-7 text-white drop-shadow-md" />
                  </div>
                  <CardTitle className="text-base font-bold flex-1 truncate">{tool.title}</CardTitle>
                  {tool.status === 'active' ? (
                    <Badge className="bg-gradient-to-tr from-green-300 via-green-400 to-emerald-500 text-green-900 text-xs shadow-sm">
                      Actif
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      Bientôt
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="pt-0 pb-1">
                  {tool.status === 'active' ? (
                    <Button 
                      size="sm" 
                      className="w-full font-medium bg-gradient-to-tr from-indigo-400 via-violet-400 to-fuchsia-400 text-white shadow hover:opacity-90 text-xs"
                      onClick={onStartJourney}
                    >
                      Utiliser
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="w-full text-xs" disabled>
                      <Clock className="mr-1 h-3 w-3" />
                      Bientôt
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-12 px-2 bg-gradient-to-tr from-indigo-500 via-violet-600 to-fuchsia-500 text-white mt-8 rounded-t-3xl shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à simplifier votre intégration en France ?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Définissez votre profil en 2 minutes et accédez aux outils personnalisés pour votre situation.
          </p>
          <Button 
            size="lg" 
            onClick={onStartJourney}
            className="bg-white text-indigo-600 hover:bg-slate-100 px-8 py-4 text-lg rounded-xl font-bold shadow"
          >
            🎯 Définir mon profil maintenant
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
