
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, ArrowRight, Users, Home, Briefcase, Heart, GraduationCap, FileText, Globe, Calculator } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface HomePageProps {
  onSelectTool: (toolId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSelectTool }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const tools = [
    // DÉMARCHES ADMINISTRATIVES
    {
      id: 'letter-generator',
      title: 'Générateur de Lettres Administratives',
      description: 'Créez des lettres officielles pour vos démarches (préfecture, CAF, Pôle Emploi)',
      category: 'Démarches Administratives',
      icon: FileText,
      color: 'bg-blue-500',
      difficulty: 'Facile'
    },
    {
      id: 'fee-calculator',
      title: 'Calculateur de Frais de Dossier',
      description: 'Estimez les coûts de vos démarches administratives',
      category: 'Démarches Administratives', 
      icon: Calculator,
      color: 'bg-green-500',
      difficulty: 'Facile'
    },
    {
      id: 'receipt-generator',
      title: 'Générateur de Récépissés',
      description: 'Créez et suivez vos récépissés de dépôt de dossier',
      category: 'Démarches Administratives',
      icon: FileText,
      color: 'bg-purple-500',
      difficulty: 'Facile'
    },
    {
      id: 'delay-simulator',
      title: 'Simulateur de Délais',
      description: 'Estimez les temps de traitement de vos démarches',
      category: 'Démarches Administratives',
      icon: Calculator,
      color: 'bg-orange-500',
      difficulty: 'Facile'
    },

    // LOGEMENT & VIE QUOTIDIENNE
    {
      id: 'budget-calculator',
      title: 'Calculateur Budget Logement',
      description: 'Calculez votre budget logement selon vos revenus',
      category: 'Logement & Vie Quotidienne',
      icon: Home,
      color: 'bg-teal-500',
      difficulty: 'Facile'
    },

    // EMPLOI & FORMATION
    {
      id: 'cv-translator',
      title: 'Traducteur de CV Français',
      description: 'Adaptez votre CV aux standards français',
      category: 'Emploi & Formation',
      icon: Briefcase,
      color: 'bg-indigo-500',
      difficulty: 'Moyen'
    },

    // SANTÉ & SOCIAL
    {
      id: 'social-security-guide',
      title: 'Guide Sécurité Sociale',
      description: 'Comprenez le système de santé français',
      category: 'Santé & Social',
      icon: Heart,
      color: 'bg-red-500',
      difficulty: 'Moyen'
    },
    {
      id: 'social-services-locator',
      title: 'Localisateur Services Sociaux',
      description: 'Trouvez les services sociaux près de chez vous',
      category: 'Santé & Social',
      icon: Users,
      color: 'bg-pink-500',
      difficulty: 'Facile'
    },

    // ÉDUCATION & FAMILLE
    {
      id: 'family-allowances-calculator',
      title: 'Calculateur Allocations Familiales',
      description: 'Estimez vos droits aux allocations familiales',
      category: 'Éducation & Famille',
      icon: GraduationCap,
      color: 'bg-yellow-500',
      difficulty: 'Facile'
    },
    {
      id: 'education-costs-calculator',
      title: 'Calculateur Frais Scolarité',
      description: 'Budgétez les coûts de scolarité et bourses',
      category: 'Éducation & Famille',
      icon: Calculator,
      color: 'bg-cyan-500',
      difficulty: 'Facile'
    },

    // INTÉGRATION CULTURELLE
    {
      id: 'culture-quiz',
      title: 'Quiz Culture Française',
      description: 'Testez vos connaissances sur la culture française',
      category: 'Intégration Culturelle',
      icon: Globe,
      color: 'bg-violet-500',
      difficulty: 'Moyen'
    },
    {
      id: 'traditions-guide',
      title: 'Guide Fêtes et Traditions',
      description: 'Découvrez le calendrier culturel français',
      category: 'Intégration Culturelle',
      icon: Heart,
      color: 'bg-rose-500',
      difficulty: 'Facile'
    },
    {
      id: 'french-learning-assistant',
      title: 'Assistant Apprentissage Français',
      description: 'Améliorez votre français au quotidien',
      category: 'Intégration Culturelle',
      icon: GraduationCap,
      color: 'bg-emerald-500',
      difficulty: 'Moyen'
    },
    {
      id: 'naturalization-simulator',
      title: 'Simulateur Test Naturalisation',
      description: 'Préparez votre entretien de naturalisation',
      category: 'Intégration Culturelle',
      icon: FileText,
      color: 'bg-amber-500',
      difficulty: 'Avancé'
    },
    {
      id: 'french-expressions-translator',
      title: 'Traducteur Expressions Françaises',
      description: 'Maîtrisez les expressions idiomatiques françaises',
      category: 'Intégration Culturelle',
      icon: Globe,
      color: 'bg-lime-500',
      difficulty: 'Moyen'
    },

    // OUTILS TRANSVERSAUX
    {
      id: 'emergency-assistant',
      title: 'Assistant Urgences',
      description: 'Numéros d\'urgence et procédures essentielles',
      category: 'Outils Transversaux',
      icon: Heart,
      color: 'bg-red-600',
      difficulty: 'Facile'
    },
    {
      id: 'planning-generator',
      title: 'Générateur Planning',
      description: 'Organisez toutes vos démarches administratives',
      category: 'Outils Transversaux',
      icon: Calculator,
      color: 'bg-blue-600',
      difficulty: 'Facile'
    },
    {
      id: 'family-budget-assistant',
      title: 'Assistant Budget Familial',
      description: 'Gérez vos finances familiales en France',
      category: 'Outils Transversaux',
      icon: Calculator,
      color: 'bg-green-600',
      difficulty: 'Moyen'
    },
    {
      id: 'rights-guide',
      title: 'Guide Droits et Recours',
      description: 'Connaissez vos droits et les procédures de recours',
      category: 'Outils Transversaux',
      icon: FileText,
      color: 'bg-purple-600',
      difficulty: 'Avancé'
    }
  ];

  const categories = [...new Set(tools.map(tool => tool.category))];

  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toolsByCategory = categories.reduce((acc, category) => {
    acc[category] = filteredTools.filter(tool => tool.category === category);
    return acc;
  }, {} as Record<string, typeof tools>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Outils d'Intégration en France
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une suite complète d'outils gratuits pour vous accompagner dans vos démarches administratives et votre intégration en France
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Rechercher un outil..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>
        </div>

        {/* Tools by Category */}
        <div className="space-y-12">
          {categories.map(category => {
            const categoryTools = toolsByCategory[category];
            if (categoryTools.length === 0) return null;

            return (
              <div key={category}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 bg-blue-500 rounded-full"></span>
                  {category}
                  <Badge variant="secondary" className="ml-2">
                    {categoryTools.length} outils
                  </Badge>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryTools.map(tool => {
                    const IconComponent = tool.icon;
                    return (
                      <Card key={tool.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between">
                            <div className={`p-3 rounded-lg ${tool.color} text-white`}>
                              <IconComponent className="h-6 w-6" />
                            </div>
                            <Badge 
                              variant={tool.difficulty === 'Facile' ? 'default' : tool.difficulty === 'Moyen' ? 'secondary' : 'destructive'}
                              className="text-xs"
                            >
                              {tool.difficulty}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg leading-tight">
                            {tool.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <CardDescription className="text-gray-600 mb-4 text-sm leading-relaxed">
                            {tool.description}
                          </CardDescription>
                          <Button 
                            onClick={() => onSelectTool(tool.id)}
                            className="w-full group-hover:bg-blue-600 transition-colors"
                          >
                            Utiliser l'outil
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun outil trouvé pour votre recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
