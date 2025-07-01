
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useHomePageData } from '@/hooks/useHomePageData';
import Header from '@/components/Header';

interface CategoryPageProps {
  categoryId: string;
  onSelectTool: (toolId: string) => void;
  onBack: () => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ categoryId, onSelectTool, onBack }) => {
  const tools = useHomePageData();
  
  const categoryMap: Record<string, string> = {
    'admin': 'Démarches Administratives',
    'logement': 'Logement & Vie Quotidienne',
    'emploi': 'Emploi & Formation',
    'sante': 'Santé & Social',
    'education': 'Éducation & Famille',
    'culture': 'Intégration Culturelle',
    'transversal': 'Outils Transversaux'
  };

  const categoryTitle = categoryMap[categoryId] || 'Catégorie';
  const categoryTools = tools.filter(tool => {
    const toolCategory = tool.category.toLowerCase();
    const searchCategory = categoryId.toLowerCase();
    
    if (searchCategory === 'admin') return toolCategory.includes('administratives');
    if (searchCategory === 'logement') return toolCategory.includes('logement') || toolCategory.includes('quotidienne');
    if (searchCategory === 'emploi') return toolCategory.includes('emploi') || toolCategory.includes('formation');
    if (searchCategory === 'sante') return toolCategory.includes('santé') || toolCategory.includes('social');
    if (searchCategory === 'education') return toolCategory.includes('éducation') || toolCategory.includes('famille');
    if (searchCategory === 'culture') return toolCategory.includes('culturelle') || toolCategory.includes('intégration');
    if (searchCategory === 'transversal') return toolCategory.includes('transversaux');
    
    return false;
  });

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
    if (difficulty === 'Facile') {
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    } else if (difficulty === 'Moyen') {
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    } else if (difficulty === 'Avancé') {
      return 'bg-red-100 text-red-800 hover:bg-red-200';
    }
    return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header onSelectTool={onSelectTool} showHomeButton={true} toolTitle={categoryTitle} />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <Button 
            onClick={onBack}
            variant="ghost" 
            className="mb-6 text-purple-600 hover:bg-purple-50 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Button>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {categoryTitle}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {categoryTools.length} outils disponibles dans cette catégorie
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {categoryTools.map(tool => {
            const IconComponent = tool.icon;
            return (
              <Card key={tool.id} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:scale-105 bg-white/90 backdrop-blur-sm hover:bg-white">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${tool.gradient} text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight group-hover:text-purple-600 transition-colors">
                    {tool.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {tool.description}
                  </CardDescription>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getDifficultyColor(tool.difficulty)}>
                      {tool.difficulty}
                    </Badge>
                    {getAccessibilityBadge(tool.accessibility)}
                  </div>
                  
                  <Button 
                    onClick={() => onSelectTool(tool.id)} 
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl group-hover:scale-105"
                  >
                    Utiliser l'outil
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {categoryTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">Aucun outil disponible dans cette catégorie pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
