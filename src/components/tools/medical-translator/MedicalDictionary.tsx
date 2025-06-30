
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Volume2, Star, Search, BookOpen } from 'lucide-react';

interface MedicalTerm {
  french: string;
  translations: Record<string, string>;
  category: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  frequency: number;
}

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface MedicalDictionaryProps {
  terms: MedicalTerm[];
  languages: Language[];
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  favoriteTerms: string[];
  onToggleFavorite: (term: string) => void;
  onSpeak: (text: string, lang: string) => void;
}

const MedicalDictionary: React.FC<MedicalDictionaryProps> = ({
  terms,
  languages,
  selectedLanguage,
  onLanguageChange,
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  favoriteTerms,
  onToggleFavorite,
  onSpeak
}) => {
  const categories = [
    { id: 'all', name: 'Tous les termes', count: terms.length },
    { id: 'symptoms', name: 'Symptômes', count: terms.filter(t => t.category === 'symptoms').length },
    { id: 'diseases', name: 'Maladies', count: terms.filter(t => t.category === 'diseases').length },
    { id: 'medications', name: 'Médicaments', count: terms.filter(t => t.category === 'medications').length },
    { id: 'procedures', name: 'Examens', count: terms.filter(t => t.category === 'procedures').length }
  ];

  const filteredTerms = terms.filter(term => {
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      term.french.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.translations[selectedLanguage]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Facile';
      case 'medium': return 'Moyen';
      case 'hard': return 'Difficile';
      default: return 'Inconnu';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filtres et recherche */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Rechercher un terme médical
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="search">Recherche</Label>
              <Input
                id="search"
                placeholder="Rechercher en français ou dans votre langue..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label>Langue de traduction</Label>
              <select 
                value={selectedLanguage} 
                onChange={(e) => onLanguageChange(e.target.value)}
                className="mt-1 w-full p-2 border rounded-md"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange(category.id)}
                className="flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Résultats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTerms.map((term, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold">{term.french}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleFavorite(term.french)}
                    className="text-yellow-500 hover:text-yellow-600"
                  >
                    <Star className={`h-4 w-4 ${favoriteTerms.includes(term.french) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">
                    {categories.find(c => c.id === term.category)?.name}
                  </Badge>
                  <Badge className={`text-xs ${getDifficultyColor(term.difficulty)}`}>
                    {getDifficultyLabel(term.difficulty)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-blue-900 text-lg">
                      {term.translations[selectedLanguage]}
                    </div>
                    <div className="text-sm text-blue-600 flex items-center gap-1">
                      <span>{languages.find(l => l.code === selectedLanguage)?.flag}</span>
                      <span>{languages.find(l => l.code === selectedLanguage)?.name}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSpeak(term.french, 'fr')}
                      title="Écouter en français"
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSpeak(term.translations[selectedLanguage], selectedLanguage)}
                      title={`Écouter en ${languages.find(l => l.code === selectedLanguage)?.name}`}
                    >
                      <Volume2 className="h-4 w-4 text-blue-600" />
                    </Button>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                  <strong>Description:</strong> {term.description}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Fréquence d'usage: {term.frequency}%</span>
                  <Progress value={term.frequency} className="w-20 h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Aucun terme trouvé pour votre recherche.</p>
            <p className="text-gray-500 text-sm mt-2">Essayez d'autres mots-clés ou changez de catégorie.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MedicalDictionary;
