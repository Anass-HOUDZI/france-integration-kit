
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Star, History, Trophy, Search, BookOpen, Target } from 'lucide-react';

interface MedicalTerm {
  french: string;
  translations: Record<string, string>;
  category: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  frequency: number;
}

interface UserProgressData {
  knownTerms: string[];
  difficultTerms: string[];
  searchHistory: string[];
  favoriteTerms: string[];
  quizProgress: Record<string, number>;
}

interface UserProgressProps {
  userProgress: UserProgressData;
  medicalTerms: MedicalTerm[];
  selectedLanguage: string;
  languages: { code: string; name: string; flag: string; }[];
  onToggleFavorite: (term: string) => void;
  onSearchTerm: (term: string) => void;
}

const UserProgress: React.FC<UserProgressProps> = ({
  userProgress,
  medicalTerms,
  selectedLanguage,
  languages,
  onToggleFavorite,
  onSearchTerm
}) => {
  const progressStats = {
    totalTerms: medicalTerms.length,
    favoriteTerms: userProgress.favoriteTerms.length,
    searchHistory: userProgress.searchHistory.length,
    knownTerms: userProgress.knownTerms.length,
    difficultTerms: userProgress.difficultTerms.length
  };

  const completionPercentage = Math.round((progressStats.knownTerms / progressStats.totalTerms) * 100);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-600" />
              Termes favoris
            </CardTitle>
            <CardDescription>
              Vos termes médicaux sauvegardés ({userProgress.favoriteTerms.length})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-48">
              {userProgress.favoriteTerms.length > 0 ? (
                <div className="space-y-2">
                  {userProgress.favoriteTerms.map((termFrench, index) => {
                    const term = medicalTerms.find(t => t.french === termFrench);
                    return term ? (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <div className="font-medium">{term.french}</div>
                          <div className="text-sm text-gray-600">{term.translations[selectedLanguage]}</div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onToggleFavorite(termFrench)}
                          className="text-yellow-500"
                        >
                          <Star className="h-4 w-4 fill-current" />
                        </Button>
                      </div>
                    ) : null;
                  })}
                </div>
              ) : (
                <div className="text-gray-500 text-center py-8">
                  <Star className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Aucun terme favori pour le moment</p>
                  <p className="text-sm mt-1">Cliquez sur ⭐ pour sauvegarder des termes</p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-blue-600" />
              Historique des recherches
            </CardTitle>
            <CardDescription>
              Vos dernières recherches ({userProgress.searchHistory.length})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-48">
              {userProgress.searchHistory.length > 0 ? (
                <div className="space-y-2">
                  {userProgress.searchHistory.map((term, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{term}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onSearchTerm(term)}
                        className="text-blue-600"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-center py-8">
                  <History className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Aucune recherche effectuée</p>
                  <p className="text-sm mt-1">Vos recherches apparaîtront ici</p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-purple-600" />
            Statistiques d'apprentissage
          </CardTitle>
          <CardDescription>
            Votre progression dans l'apprentissage du vocabulaire médical
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{progressStats.favoriteTerms}</div>
              <div className="text-sm text-purple-800">Termes sauvegardés</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{progressStats.searchHistory}</div>
              <div className="text-sm text-blue-800">Recherches effectuées</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{progressStats.totalTerms}</div>
              <div className="text-sm text-green-800">Termes disponibles</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{completionPercentage}%</div>
              <div className="text-sm text-orange-800">Progression</div>
            </div>
          </div>

          {/* Recommandations personnalisées */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              Recommandations personnalisées
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">📚 Pour améliorer votre vocabulaire :</h5>
                <ul className="space-y-1 text-gray-600">
                  <li>• Consultez quotidiennement 5 nouveaux termes</li>
                  <li>• Pratiquez la prononciation avec l'audio</li>
                  <li>• Sauvegardez les termes les plus utiles</li>
                  <li>• Révisez régulièrement vos favoris</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-800 mb-2">🎯 Objectifs suggérés :</h5>
                <ul className="space-y-1 text-gray-600">
                  <li>• Maîtriser 50 termes de base (symptômes)</li>
                  <li>• Apprendre les phrases d'urgence</li>
                  <li>• Mémoriser les numéros d'urgence</li>
                  <li>• Pratiquer avec un professionnel de santé</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badge de niveau */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-green-600" />
            Votre niveau
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              {completionPercentage < 25 && (
                <>
                  <div className="text-2xl font-bold text-green-600">🌱 Débutant</div>
                  <p className="text-gray-600">Continuez à explorer le vocabulaire médical !</p>
                </>
              )}
              {completionPercentage >= 25 && completionPercentage < 50 && (
                <>
                  <div className="text-2xl font-bold text-blue-600">📖 Intermédiaire</div>
                  <p className="text-gray-600">Bon progrès ! Continuez vos efforts.</p>
                </>
              )}
              {completionPercentage >= 50 && completionPercentage < 75 && (
                <>
                  <div className="text-2xl font-bold text-purple-600">🎓 Avancé</div>
                  <p className="text-gray-600">Excellente maîtrise du vocabulaire médical !</p>
                </>
              )}
              {completionPercentage >= 75 && (
                <>
                  <div className="text-2xl font-bold text-yellow-600">🏆 Expert</div>
                  <p className="text-gray-600">Félicitations ! Vous maîtrisez très bien le vocabulaire médical.</p>
                </>
              )}
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-800">{completionPercentage}%</div>
              <div className="text-sm text-gray-600">Progression</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProgress;
