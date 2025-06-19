import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, ArrowRight, Users, Home, Briefcase, Heart, GraduationCap, FileText, Globe, Calculator, Sparkles, TrendingUp, Star, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
interface HomePageProps {
  onSelectTool: (toolId: string) => void;
}
const HomePage: React.FC<HomePageProps> = ({
  onSelectTool
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const tools = [
  // DÉMARCHES ADMINISTRATIVES
  {
    id: 'letter-generator',
    title: 'Générateur de Lettres Administratives',
    description: 'Créez des lettres officielles pour vos démarches (préfecture, CAF, Pôle Emploi)',
    category: 'Démarches Administratives',
    icon: FileText,
    gradient: 'from-blue-500 to-blue-600',
    difficulty: 'Facile',
    popular: true,
    accessibility: 'excellent'
  }, {
    id: 'fee-calculator',
    title: 'Calculateur de Frais de Dossier',
    description: 'Estimez les coûts de vos démarches administratives',
    category: 'Démarches Administratives',
    icon: Calculator,
    gradient: 'from-green-500 to-green-600',
    difficulty: 'Facile',
    popular: false,
    accessibility: 'good'
  }, {
    id: 'receipt-generator',
    title: 'Générateur de Récépissés',
    description: 'Créez et suivez vos récépissés de dépôt de dossier',
    category: 'Démarches Administratives',
    icon: FileText,
    gradient: 'from-purple-500 to-purple-600',
    difficulty: 'Facile',
    popular: false,
    accessibility: 'good'
  }, {
    id: 'delay-simulator',
    title: 'Simulateur de Délais',
    description: 'Estimez les temps de traitement de vos démarches',
    category: 'Démarches Administratives',
    icon: Calculator,
    gradient: 'from-orange-500 to-orange-600',
    difficulty: 'Facile',
    popular: false,
    accessibility: 'excellent'
  },
  // LOGEMENT & VIE QUOTIDIENNE
  {
    id: 'budget-calculator',
    title: 'Calculateur Budget Logement',
    description: 'Calculez votre budget logement selon vos revenus',
    category: 'Logement & Vie Quotidienne',
    icon: Home,
    gradient: 'from-teal-500 to-teal-600',
    difficulty: 'Facile',
    popular: true,
    accessibility: 'excellent'
  },
  // EMPLOI & FORMATION
  {
    id: 'cv-translator',
    title: 'Traducteur de CV Français',
    description: 'Adaptez votre CV aux standards français',
    category: 'Emploi & Formation',
    icon: Briefcase,
    gradient: 'from-indigo-500 to-indigo-600',
    difficulty: 'Moyen',
    popular: true,
    accessibility: 'good'
  },
  // SANTÉ & SOCIAL
  {
    id: 'social-security-guide',
    title: 'Guide Sécurité Sociale',
    description: 'Comprenez le système de santé français',
    category: 'Santé & Social',
    icon: Heart,
    gradient: 'from-red-500 to-red-600',
    difficulty: 'Moyen',
    popular: false,
    accessibility: 'excellent'
  }, {
    id: 'social-services-locator',
    title: 'Localisateur Services Sociaux',
    description: 'Trouvez les services sociaux près de chez vous',
    category: 'Santé & Social',
    icon: Users,
    gradient: 'from-pink-500 to-pink-600',
    difficulty: 'Facile',
    popular: true,
    accessibility: 'good'
  },
  // ÉDUCATION & FAMILLE
  {
    id: 'family-allowances-calculator',
    title: 'Calculateur Allocations Familiales',
    description: 'Estimez vos droits aux allocations familiales',
    category: 'Éducation & Famille',
    icon: GraduationCap,
    gradient: 'from-yellow-500 to-yellow-600',
    difficulty: 'Facile',
    popular: false,
    accessibility: 'excellent'
  }, {
    id: 'education-costs-calculator',
    title: 'Calculateur Frais Scolarité',
    description: 'Budgétez les coûts de scolarité et bourses',
    category: 'Éducation & Famille',
    icon: Calculator,
    gradient: 'from-cyan-500 to-cyan-600',
    difficulty: 'Facile',
    popular: false,
    accessibility: 'good'
  },
  // INTÉGRATION CULTURELLE
  {
    id: 'culture-quiz',
    title: 'Quiz Culture Française',
    description: 'Testez vos connaissances sur la culture française',
    category: 'Intégration Culturelle',
    icon: Globe,
    gradient: 'from-violet-500 to-violet-600',
    difficulty: 'Moyen',
    popular: true,
    accessibility: 'excellent'
  }, {
    id: 'traditions-guide',
    title: 'Guide Fêtes et Traditions',
    description: 'Découvrez le calendrier culturel français',
    category: 'Intégration Culturelle',
    icon: Heart,
    gradient: 'from-rose-500 to-rose-600',
    difficulty: 'Facile',
    popular: false,
    accessibility: 'good'
  }, {
    id: 'french-learning-assistant',
    title: 'Assistant Apprentissage Français',
    description: 'Améliorez votre français au quotidien',
    category: 'Intégration Culturelle',
    icon: GraduationCap,
    gradient: 'from-emerald-500 to-emerald-600',
    difficulty: 'Moyen',
    popular: true,
    accessibility: 'excellent'
  }, {
    id: 'naturalization-simulator',
    title: 'Simulateur Test Naturalisation',
    description: 'Préparez votre entretien de naturalisation',
    category: 'Intégration Culturelle',
    icon: FileText,
    gradient: 'from-amber-500 to-amber-600',
    difficulty: 'Avancé',
    popular: false,
    accessibility: 'good'
  }, {
    id: 'french-expressions-translator',
    title: 'Traducteur Expressions Françaises',
    description: 'Maîtrisez les expressions idiomatiques françaises',
    category: 'Intégration Culturelle',
    icon: Globe,
    gradient: 'from-lime-500 to-lime-600',
    difficulty: 'Moyen',
    popular: false,
    accessibility: 'excellent'
  },
  // OUTILS TRANSVERSAUX
  {
    id: 'emergency-assistant',
    title: 'Assistant Urgences',
    description: 'Numéros d\'urgence et procédures essentielles',
    category: 'Outils Transversaux',
    icon: Heart,
    gradient: 'from-red-600 to-red-700',
    difficulty: 'Facile',
    popular: false,
    accessibility: 'excellent'
  }, {
    id: 'planning-generator',
    title: 'Générateur Planning',
    description: 'Organisez toutes vos démarches administratives',
    category: 'Outils Transversaux',
    icon: Calculator,
    gradient: 'from-blue-600 to-blue-700',
    difficulty: 'Facile',
    popular: false,
    accessibility: 'good'
  }, {
    id: 'family-budget-assistant',
    title: 'Assistant Budget Familial',
    description: 'Gérez vos finances familiales en France',
    category: 'Outils Transversaux',
    icon: Calculator,
    gradient: 'from-green-600 to-green-700',
    difficulty: 'Moyen',
    popular: false,
    accessibility: 'excellent'
  }, {
    id: 'rights-guide',
    title: 'Guide Droits et Recours',
    description: 'Connaissez vos droits et les procédures de recours',
    category: 'Outils Transversaux',
    icon: FileText,
    gradient: 'from-purple-600 to-purple-700',
    difficulty: 'Avancé',
    popular: false,
    accessibility: 'good'
  }];
  const categories = [...new Set(tools.map(tool => tool.category))];
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) || tool.description.toLowerCase().includes(searchTerm.toLowerCase()) || tool.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const popularTools = tools.filter(tool => tool.popular);
  const totalTools = tools.length;
  const completionPercentage = Math.round(totalTools / 50 * 100);
  const getAccessibilityBadge = (level: string) => {
    switch (level) {
      case 'excellent':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">★★★ Excellent</Badge>;
      case 'good':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">★★☆ Bon</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">★☆☆ Basique</Badge>;
    }
  };
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Facile':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Moyen':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'Avancé':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-3xl -z-10"></div>
          <div className="py-16 px-8">
            
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Outils d'Intégration
              </span>
              <br />
              <span className="text-gray-800 dark:text-gray-200">en France</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Une suite complète d'<strong>outils gratuits et modernes</strong> pour vous accompagner dans vos démarches administratives et votre intégration en France
            </p>
          </div>
        </div>

        {/* Search and Filter Section - Sticky */}
        <div className="sticky top-20 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input type="text" placeholder="Rechercher un outil..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-12 py-3 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl" />
            </div>
            
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-gray-400" />
              <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-800">
                <option value="all">Toutes les catégories</option>
                {categories.map(category => <option key={category} value={category}>{category}</option>)}
              </select>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span>{filteredTools.length} outils trouvés</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>{popularTools.length} outils populaires</span>
            </div>
          </div>
        </div>

        {/* Popular Tools Section */}
        {selectedCategory === 'all' && !searchTerm && <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
              <Star className="h-8 w-8 text-yellow-500" />
              Outils Populaires
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularTools.map(tool => {
            const IconComponent = tool.icon;
            return <Card key={tool.id} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:scale-105 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${tool.gradient} text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                          <IconComponent className="h-8 w-8" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Badge className={getDifficultyColor(tool.difficulty)}>
                            {tool.difficulty}
                          </Badge>
                          {getAccessibilityBadge(tool.accessibility)}
                        </div>
                      </div>
                      <CardTitle className="text-xl leading-tight group-hover:text-blue-600 transition-colors">
                        {tool.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-gray-600 mb-6 text-base leading-relaxed">
                        {tool.description}
                      </CardDescription>
                      <Button onClick={() => onSelectTool(tool.id)} className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl group-hover:scale-105">
                        Utiliser l'outil
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>;
          })}
            </div>
          </div>}

        {/* All Tools by Category */}
        <div className="space-y-12">
          {categories.map(category => {
          const categoryTools = filteredTools.filter(tool => tool.category === category);
          if (categoryTools.length === 0) return null;
          return <div key={category} className="animate-fade-in">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-4">
                    <div className="w-2 h-12 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                    {category}
                  </h2>
                  <Badge variant="secondary" className="text-lg px-4 py-2 bg-blue-100 text-blue-800">
                    {categoryTools.length} outils
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categoryTools.map(tool => {
                const IconComponent = tool.icon;
                return <Card key={tool.id} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-md hover:scale-105 bg-white/80 backdrop-blur-sm hover:bg-white">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between mb-3">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${tool.gradient} text-white shadow-md group-hover:shadow-lg transition-all duration-300`}>
                              <IconComponent className="h-6 w-6" />
                            </div>
                            {tool.popular && <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                <Star className="h-3 w-3" />
                                Populaire
                              </div>}
                          </div>
                          <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors">
                            {tool.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-4">
                          <CardDescription className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                            {tool.description}
                          </CardDescription>
                          
                          <div className="flex flex-wrap gap-2">
                            <Badge className={getDifficultyColor(tool.difficulty)}>
                              {tool.difficulty}
                            </Badge>
                            {getAccessibilityBadge(tool.accessibility)}
                          </div>
                          
                          <Button onClick={() => onSelectTool(tool.id)} className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 text-white font-medium py-2.5 rounded-lg shadow-md hover:shadow-lg">
                            Utiliser
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </CardContent>
                      </Card>;
              })}
                </div>
              </div>;
        })}
        </div>

        {filteredTools.length === 0 && <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Aucun outil trouvé</h3>
            <p className="text-gray-600 text-lg mb-6">Essayez de modifier vos critères de recherche</p>
            <Button onClick={() => {
          setSearchTerm('');
          setSelectedCategory('all');
        }} variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
              Réinitialiser les filtres
            </Button>
          </div>}
      </div>
    </div>;
};
export default HomePage;