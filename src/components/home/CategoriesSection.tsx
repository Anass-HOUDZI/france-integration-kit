
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles } from 'lucide-react';
import { FileText, Home, Briefcase, Heart, GraduationCap, Globe, Settings } from 'lucide-react';

interface Category {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  gradient: string;
  toolCount: number;
  color: string;
}

interface CategoriesSectionProps {
  onSelectCategory: (categoryId: string) => void;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onSelectCategory }) => {
  const categories: Category[] = [
    {
      id: 'admin',
      title: 'Démarches Administratives',
      description: 'Lettres officielles, frais de dossier, délais et récépissés pour vos démarches',
      icon: FileText,
      gradient: 'from-blue-500 to-indigo-600',
      toolCount: 4,
      color: 'bg-blue-500'
    },
    {
      id: 'logement',
      title: 'Logement & Vie Quotidienne',
      description: 'Budget logement, état des lieux, négociation et assurance habitation',
      icon: Home,
      gradient: 'from-green-500 to-emerald-600',
      toolCount: 6,
      color: 'bg-green-500'
    },
    {
      id: 'emploi',
      title: 'Emploi & Formation',
      description: 'CV, lettres de motivation, salaires et formation professionnelle',
      icon: Briefcase,
      gradient: 'from-purple-500 to-violet-600',
      toolCount: 8,
      color: 'bg-purple-500'
    },
    {
      id: 'sante',
      title: 'Santé & Social',
      description: 'Sécurité sociale, services sociaux et traduction médicale',
      icon: Heart,
      gradient: 'from-red-500 to-rose-600',
      toolCount: 3,
      color: 'bg-red-500'
    },
    {
      id: 'education',
      title: 'Éducation & Famille',
      description: 'Allocations familiales, frais de scolarité et garde d\'enfants',
      icon: GraduationCap,
      gradient: 'from-yellow-500 to-amber-600',
      toolCount: 2,
      color: 'bg-yellow-500'
    },
    {
      id: 'culture',
      title: 'Intégration Culturelle',
      description: 'Culture française, apprentissage et naturalisation',
      icon: Globe,
      gradient: 'from-indigo-500 to-blue-600',
      toolCount: 5,
      color: 'bg-indigo-500'
    },
    {
      id: 'transversal',
      title: 'Outils Transversaux',
      description: 'Urgences, planning, budget familial et droits juridiques',
      icon: Settings,
      gradient: 'from-gray-500 to-slate-600',
      toolCount: 4,
      color: 'bg-gray-500'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 rounded-full px-6 py-3 mb-6">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-medium">Nos Catégories</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Découvrez nos outils
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Chaque catégorie regroupe des outils spécialisés pour répondre à vos besoins spécifiques
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card key={category.id} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:scale-105 bg-white/90 backdrop-blur-sm hover:bg-white min-h-[280px]">
                <CardHeader className="pb-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-6 rounded-3xl bg-gradient-to-br ${category.gradient} text-white shadow-xl group-hover:shadow-2xl transition-all duration-300`}>
                      <IconComponent className="h-12 w-12" />
                    </div>
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 text-lg px-4 py-2">
                      {category.toolCount} outils
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl leading-tight group-hover:text-purple-600 transition-colors mb-3">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    onClick={() => onSelectCategory(category.id)} 
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 text-white font-medium py-4 rounded-xl shadow-lg hover:shadow-xl group-hover:scale-105 text-lg"
                  >
                    Voir les outils
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
