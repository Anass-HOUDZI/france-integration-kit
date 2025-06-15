
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Globe, Search, Heart, AlertCircle, Volume2 } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';

interface MedicalTranslatorProps {
  userProfile: any;
  diagnostic: any;
}

const MedicalTranslatorTool: React.FC<MedicalTranslatorProps> = ({ userProfile }) => {
  const { saveToolData } = useUserProfile();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'ar', name: 'العربية' },
    { code: 'pt', name: 'Português' },
    { code: 'ru', name: 'Русский' },
    { code: 'zh', name: '中文' },
    { code: 'de', name: 'Deutsch' },
    { code: 'it', name: 'Italiano' }
  ];

  const medicalTerms = [
    {
      french: 'Mal de tête',
      translations: {
        en: 'Headache',
        es: 'Dolor de cabeza',
        ar: 'صداع',
        pt: 'Dor de cabeça',
        ru: 'Головная боль',
        zh: '头痛',
        de: 'Kopfschmerzen',
        it: 'Mal di testa'
      },
      category: 'symptoms',
      description: 'Douleur dans la région de la tête'
    },
    {
      french: 'Fièvre',
      translations: {
        en: 'Fever',
        es: 'Fiebre',
        ar: 'حمى',
        pt: 'Febre',
        ru: 'Лихорадка',
        zh: '发烧',
        de: 'Fieber',
        it: 'Febbre'
      },
      category: 'symptoms',
      description: 'Élévation de la température corporelle'
    },
    {
      french: 'Douleur thoracique',
      translations: {
        en: 'Chest pain',
        es: 'Dolor en el pecho',
        ar: 'ألم في الصدر',
        pt: 'Dor no peito',
        ru: 'Боль в груди',
        zh: '胸痛',
        de: 'Brustschmerzen',
        it: 'Dolore toracico'
      },
      category: 'symptoms',
      description: 'Douleur dans la région du thorax'
    },
    {
      french: 'Nausée',
      translations: {
        en: 'Nausea',
        es: 'Náusea',
        ar: 'غثيان',
        pt: 'Náusea',
        ru: 'Тошнота',
        zh: '恶心',
        de: 'Übelkeit',
        it: 'Nausea'
      },
      category: 'symptoms',
      description: 'Sensation de mal-être avec envie de vomir'
    },
    {
      french: 'Diabète',
      translations: {
        en: 'Diabetes',
        es: 'Diabetes',
        ar: 'داء السكري',
        pt: 'Diabetes',
        ru: 'Диабет',
        zh: '糖尿病',
        de: 'Diabetes',
        it: 'Diabete'
      },
      category: 'diseases',
      description: 'Maladie chronique du métabolisme du sucre'
    },
    {
      french: 'Hypertension',
      translations: {
        en: 'High blood pressure',
        es: 'Hipertensión',
        ar: 'ارتفاع ضغط الدم',
        pt: 'Hipertensão',
        ru: 'Гипертония',
        zh: '高血压',
        de: 'Bluthochdruck',
        it: 'Ipertensione'
      },
      category: 'diseases',
      description: 'Pression artérielle élevée'
    },
    {
      french: 'Antibiotique',
      translations: {
        en: 'Antibiotic',
        es: 'Antibiótico',
        ar: 'مضاد حيوي',
        pt: 'Antibiótico',
        ru: 'Антибиотик',
        zh: '抗生素',
        de: 'Antibiotikum',
        it: 'Antibiotico'
      },
      category: 'medications',
      description: 'Médicament qui combat les infections bactériennes'
    },
    {
      french: 'Antidouleur',
      translations: {
        en: 'Painkiller',
        es: 'Analgésico',
        ar: 'مسكن للألم',
        pt: 'Analgésico',
        ru: 'Обезболивающее',
        zh: '止痛药',
        de: 'Schmerzmittel',
        it: 'Antidolorifico'
      },
      category: 'medications',
      description: 'Médicament qui soulage la douleur'
    },
    {
      french: 'Prise de sang',
      translations: {
        en: 'Blood test',
        es: 'Análisis de sangre',
        ar: 'فحص الدم',
        pt: 'Exame de sangue',
        ru: 'Анализ крови',
        zh: '血液检查',
        de: 'Blutuntersuchung',
        it: 'Esame del sangue'
      },
      category: 'procedures',
      description: 'Prélèvement sanguin pour analyse'
    },
    {
      french: 'Radiographie',
      translations: {
        en: 'X-ray',
        es: 'Radiografía',
        ar: 'أشعة سينية',
        pt: 'Raio-X',
        ru: 'Рентген',
        zh: 'X光',
        de: 'Röntgen',
        it: 'Radiografia'
      },
      category: 'procedures',
      description: 'Examen d\'imagerie médicale'
    }
  ];

  const emergencyPhrases = [
    {
      french: 'J\'ai besoin d\'aide',
      translations: {
        en: 'I need help',
        es: 'Necesito ayuda',
        ar: 'أحتاج المساعدة',
        pt: 'Preciso de ajuda',
        ru: 'Мне нужна помощь',
        zh: '我需要帮助',
        de: 'Ich brauche Hilfe',
        it: 'Ho bisogno di aiuto'
      }
    },
    {
      french: 'Appelez une ambulance',
      translations: {
        en: 'Call an ambulance',
        es: 'Llamen una ambulancia',
        ar: 'اتصلوا بسيارة الإسعاف',
        pt: 'Chamem uma ambulância',
        ru: 'Вызовите скорую помощь',
        zh: '叫救护车',
        de: 'Rufen Sie einen Krankenwagen',
        it: 'Chiamate un\'ambulanza'
      }
    },
    {
      french: 'Je suis allergique à...',
      translations: {
        en: 'I am allergic to...',
        es: 'Soy alérgico a...',
        ar: 'أنا أعاني من حساسية تجاه...',
        pt: 'Sou alérgico a...',
        ru: 'У меня аллергия на...',
        zh: '我对...过敏',
        de: 'Ich bin allergisch gegen...',
        it: 'Sono allergico a...'
      }
    },
    {
      french: 'Où est l\'hôpital le plus proche ?',
      translations: {
        en: 'Where is the nearest hospital?',
        es: '¿Dónde está el hospital más cercano?',
        ar: 'أين أقرب مستشفى؟',
        pt: 'Onde fica o hospital mais próximo?',
        ru: 'Где ближайшая больница?',
        zh: '最近的医院在哪里？',
        de: 'Wo ist das nächste Krankenhaus?',
        it: 'Dov\'è l\'ospedale più vicino?'
      }
    }
  ];

  const categories = [
    { id: 'all', name: 'Tous', count: medicalTerms.length },
    { id: 'symptoms', name: 'Symptômes', count: medicalTerms.filter(t => t.category === 'symptoms').length },
    { id: 'diseases', name: 'Maladies', count: medicalTerms.filter(t => t.category === 'diseases').length },
    { id: 'medications', name: 'Médicaments', count: medicalTerms.filter(t => t.category === 'medications').length },
    { id: 'procedures', name: 'Examens', count: medicalTerms.filter(t => t.category === 'procedures').length }
  ];

  const filteredTerms = medicalTerms.filter(term => {
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    const matchesSearch = term.french.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.translations[selectedLanguage as keyof typeof term.translations]?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const speak = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'en' ? 'en-US' : 'fr-FR';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Traducteur Médical
        </h1>
        <p className="text-lg text-gray-600">
          Facilitez la communication avec les professionnels de santé
        </p>
      </div>

      <Tabs defaultValue="dictionary" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dictionary">Dictionnaire médical</TabsTrigger>
          <TabsTrigger value="emergency">Phrases d'urgence</TabsTrigger>
        </TabsList>

        <TabsContent value="dictionary" className="space-y-6">
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
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label>Langue de traduction</Label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map(lang => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                  >
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
                    <CardTitle className="text-lg">{term.french}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {categories.find(c => c.id === term.category)?.name}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <div className="font-medium text-blue-900">
                          {term.translations[selectedLanguage as keyof typeof term.translations]}
                        </div>
                        <div className="text-sm text-blue-600">
                          {languages.find(l => l.code === selectedLanguage)?.name}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => speak(term.translations[selectedLanguage as keyof typeof term.translations], selectedLanguage)}
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      {term.description}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="emergency" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                Phrases d'urgence médicale
              </CardTitle>
              <CardDescription>
                Phrases essentielles pour communiquer en cas d'urgence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Label>Langue de traduction</Label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-full md:w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map(lang => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {emergencyPhrases.map((phrase, index) => (
                  <Card key={index} className="bg-red-50 border-red-200">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">
                              {phrase.french}
                            </div>
                            <div className="text-sm text-gray-500">Français</div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => speak(phrase.french, 'fr')}
                          >
                            <Volume2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-white rounded border">
                          <div>
                            <div className="font-medium text-red-900">
                              {phrase.translations[selectedLanguage as keyof typeof phrase.translations]}
                            </div>
                            <div className="text-sm text-red-600">
                              {languages.find(l => l.code === selectedLanguage)?.name}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => speak(phrase.translations[selectedLanguage as keyof typeof phrase.translations], selectedLanguage)}
                          >
                            <Volume2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Numéros d'urgence */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-600" />
                Numéros d'urgence en France
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                  <div className="text-3xl font-bold text-red-600">15</div>
                  <div className="font-medium">SAMU</div>
                  <div className="text-sm text-gray-600">Urgences médicales</div>
                </div>
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg text-center">
                  <div className="text-3xl font-bold text-orange-600">18</div>
                  <div className="font-medium">Pompiers</div>
                  <div className="text-sm text-gray-600">Secours d'urgence</div>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600">112</div>
                  <div className="font-medium">Urgences EU</div>
                  <div className="text-sm text-gray-600">Numéro européen</div>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                  <div className="text-3xl font-bold text-green-600">3624</div>
                  <div className="font-medium">SOS Médecins</div>
                  <div className="text-sm text-gray-600">Consultations urgentes</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MedicalTranslatorTool;
