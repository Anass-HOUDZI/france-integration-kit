
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, BookOpen, AlertCircle, Trophy } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import ToolContainer from '@/components/tools/ToolContainer';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import MedicalDictionary from '@/components/tools/medical-translator/MedicalDictionary';
import EmergencyPhrases from '@/components/tools/medical-translator/EmergencyPhrases';
import UserProgress from '@/components/tools/medical-translator/UserProgress';
import { medicalTerms, emergencyPhrases, languages } from '@/hooks/useMedicalData';

interface MedicalTranslatorProps {
  userProfile: any;
  diagnostic: any;
  onBack?: () => void;
}

interface UserProgressData {
  knownTerms: string[];
  difficultTerms: string[];
  searchHistory: string[];
  favoriteTerms: string[];
  quizProgress: Record<string, number>;
}

const MedicalTranslatorTool: React.FC<MedicalTranslatorProps> = ({ userProfile, diagnostic, onBack }) => {
  const { t } = useI18n();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('dictionary');
  const [userProgress, setUserProgress] = useLocalStorage<UserProgressData>('medical-translator-progress', {
    knownTerms: [],
    difficultTerms: [],
    searchHistory: [],
    favoriteTerms: [],
    quizProgress: {}
  });

  // Fonction de synthèse vocale
  const speak = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      // Arrêter toute synthèse en cours
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'en' ? 'en-US' : lang === 'fr' ? 'fr-FR' : 'en-US';
      utterance.rate = 0.8;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  // Gestion des favoris
  const toggleFavorite = (termFrench: string) => {
    const newFavorites = userProgress.favoriteTerms.includes(termFrench)
      ? userProgress.favoriteTerms.filter(t => t !== termFrench)
      : [...userProgress.favoriteTerms, termFrench];
    
    setUserProgress({
      ...userProgress,
      favoriteTerms: newFavorites
    });
  };

  // Ajout à l'historique de recherche
  const addToSearchHistory = (term: string) => {
    if (term.trim()) {
      const newHistory = [term, ...userProgress.searchHistory.filter(h => h !== term)].slice(0, 10);
      setUserProgress({
        ...userProgress,
        searchHistory: newHistory
      });
    }
  };

  // Gestion de la recherche avec historique
  const handleSearchTerm = (term: string) => {
    setSearchTerm(term);
    setActiveTab('dictionary');
  };

  // Effet pour ajouter à l'historique
  useEffect(() => {
    if (searchTerm) {
      const timer = setTimeout(() => {
        addToSearchHistory(searchTerm);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [searchTerm]);

  // Initialisation de la langue selon le profil utilisateur
  useEffect(() => {
    if (userProfile?.language && languages.find(l => l.code === userProfile.language)) {
      setSelectedLanguage(userProfile.language);
    }
  }, [userProfile]);

  return (
    <ToolContainer
      title="Traducteur Médical"
      description="Facilitez la communication avec les professionnels de santé français"
      icon={<Globe className="h-8 w-8 text-blue-600" />}
      onBack={onBack}
    >
      <div className="space-y-6">
        {/* Message personnalisé selon le profil */}
        {userProfile && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">
              👋 Bienvenue {userProfile.name || 'cher utilisateur'} !
            </h3>
            <p className="text-blue-800 text-sm">
              Ce traducteur médical vous aidera à communiquer efficacement avec les professionnels de santé français. 
              Explorez le vocabulaire médical, apprenez les phrases d'urgence et suivez votre progression.
            </p>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="dictionary" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Dictionnaire ({medicalTerms.length} termes)
            </TabsTrigger>
            <TabsTrigger value="emergency" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Urgences ({emergencyPhrases.length} phrases)
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Mon Progrès
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dictionary">
            <MedicalDictionary
              terms={medicalTerms}
              languages={languages}
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              favoriteTerms={userProgress.favoriteTerms}
              onToggleFavorite={toggleFavorite}
              onSpeak={speak}
            />
          </TabsContent>

          <TabsContent value="emergency">
            <EmergencyPhrases
              phrases={emergencyPhrases}
              languages={languages}
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
              onSpeak={speak}
            />
          </TabsContent>

          <TabsContent value="progress">
            <UserProgress
              userProgress={userProgress}
              medicalTerms={medicalTerms}
              selectedLanguage={selectedLanguage}
              languages={languages}
              onToggleFavorite={toggleFavorite}
              onSearchTerm={handleSearchTerm}
            />
          </TabsContent>
        </Tabs>
      </div>
    </ToolContainer>
  );
};

export default MedicalTranslatorTool;
