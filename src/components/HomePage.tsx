
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Calculator, 
  Calendar, 
  Home, 
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
    { id: 'all', name: 'Tous les outils', count: allTools.length },
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center gap-3 mb-6">
            <span className="text-6xl">🇫🇷</span>
            <h1 className="text-5xl font-bold text-gray-900">
              IntégrationFrance.org
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            La plateforme complète avec <strong>50 outils gratuits</strong> pour faciliter votre intégration en France. 
            Démarches administratives, logement, emploi, santé, éducation et plus encore.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Badge variant="outline" className="text-lg px-4 py-2">
              ✅ {activeToolsCount} outils déjà disponibles
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              🔄 {allTools.length - activeToolsCount} outils en développement
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              📱 100% gratuit & sans inscription
            </Badge>
          </div>
          
          <Button 
            size="lg" 
            onClick={onStartJourney}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            🚀 Commencer votre parcours d'intégration
          </Button>
        </div>
      </section>

      {/* Filtres et Recherche */}
      <section className="py-8 px-4 bg-white/50 backdrop-blur-sm sticky top-0 z-40 border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher un outil..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id ? 'bg-blue-600' : ''}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Liste des Outils */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {filteredTools.length} outil{filteredTools.length > 1 ? 's' : ''} 
              {selectedCategory !== 'all' && ` - ${categories.find(c => c.id === selectedCategory)?.name}`}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
              <Card 
                key={tool.id}
                className={`transition-all duration-300 ${
                  tool.status === 'active' 
                    ? 'hover:shadow-lg cursor-pointer hover:scale-105' 
                    : 'opacity-75'
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <tool.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex gap-1">
                      {tool.status === 'active' ? (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          ✅ Actif
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">
                          🔄 Bientôt
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-sm leading-tight">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  {tool.status === 'active' ? (
                    <Button 
                      size="sm" 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-xs"
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

      {/* Section CTA Final */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à simplifier votre intégration en France ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Définissez votre profil en 2 minutes et accédez aux outils personnalisés pour votre situation.
          </p>
          <Button 
            size="lg" 
            onClick={onStartJourney}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-xl"
          >
            🎯 Définir mon profil maintenant
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
