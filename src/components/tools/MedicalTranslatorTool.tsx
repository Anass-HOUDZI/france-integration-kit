
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Globe, Search, Heart, AlertCircle, Volume2, BookOpen, Star, History, Trophy } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import ToolContainer from '@/components/tools/ToolContainer';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface MedicalTranslatorProps {
  userProfile: any;
  diagnostic: any;
  onBack?: () => void;
}

interface MedicalTerm {
  french: string;
  translations: Record<string, string>;
  category: string;
  description: string;
  pronunciation?: Record<string, string>;
  difficulty: 'easy' | 'medium' | 'hard';
  frequency: number;
}

interface EmergencyPhrase {
  french: string;
  translations: Record<string, string>;
  priority: 'high' | 'medium' | 'low';
  context: string;
}

interface UserProgress {
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
  const [userProgress, setUserProgress] = useLocalStorage<UserProgress>('medical-translator-progress', {
    knownTerms: [],
    difficultTerms: [],
    searchHistory: [],
    favoriteTerms: [],
    quizProgress: {}
  });

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'ro', name: 'Română', flag: '🇷🇴' },
    { code: 'bg', name: 'Български', flag: '🇧🇬' },
    { code: 'hr', name: 'Hrvatski', flag: '🇭🇷' },
    { code: 'sr', name: 'Српски', flag: '🇷🇸' }
  ];

  const medicalTerms: MedicalTerm[] = [
    // Symptômes courants
    {
      french: 'Mal de tête',
      translations: {
        en: 'Headache', es: 'Dolor de cabeza', ar: 'صداع', pt: 'Dor de cabeça',
        ru: 'Головная боль', zh: '头痛', de: 'Kopfschmerzen', it: 'Mal di testa',
        nl: 'Hoofdpijn', pl: 'Ból głowy', tr: 'Baş ağrısı', ja: '頭痛',
        ko: '두통', hi: 'सिरदर्द', th: 'ปวดหัว', vi: 'Đau đầu',
        ro: 'Durere de cap', bg: 'Главоболие', hr: 'Glavobolja', sr: 'Главобоља'
      },
      category: 'symptoms',
      description: 'Douleur dans la région de la tête ou du cou',
      difficulty: 'easy',
      frequency: 95
    },
    {
      french: 'Fièvre',
      translations: {
        en: 'Fever', es: 'Fiebre', ar: 'حمى', pt: 'Febre',
        ru: 'Лихорадка', zh: '发烧', de: 'Fieber', it: 'Febbre',
        nl: 'Koorts', pl: 'Gorączka', tr: 'Ateş', ja: '発熱',
        ko: '열', hi: 'बुखार', th: 'ไข้', vi: 'Sốt',
        ro: 'Febră', bg: 'Треска', hr: 'Groznica', sr: 'Грозница'
      },
      category: 'symptoms',
      description: 'Élévation de la température corporelle au-dessus de 37.5°C',
      difficulty: 'easy',
      frequency: 90
    },
    {
      french: 'Nausée',
      translations: {
        en: 'Nausea', es: 'Náusea', ar: 'غثيان', pt: 'Náusea',
        ru: 'Тошнота', zh: '恶心', de: 'Übelkeit', it: 'Nausea',
        nl: 'Misselijkheid', pl: 'Nudności', tr: 'Mide bulantısı', ja: '吐き気',
        ko: '메스꺼움', hi: 'जी मिचलाना', th: 'คลื่นไส้', vi: 'Buồn nôn',
        ro: 'Greață', bg: 'Гадене', hr: 'Mučnina', sr: 'Мучнина'
      },
      category: 'symptoms',
      description: 'Sensation désagréable avec envie de vomir',
      difficulty: 'medium',
      frequency: 75
    },
    {
      french: 'Essoufflement',
      translations: {
        en: 'Shortness of breath', es: 'Falta de aire', ar: 'ضيق في التنفس', pt: 'Falta de ar',
        ru: 'Одышка', zh: '呼吸急促', de: 'Atemnot', it: 'Mancanza di respiro',
        nl: 'Kortademigheid', pl: 'Duszność', tr: 'Nefes darlığı', ja: '息切れ',
        ko: '숨가쁨', hi: 'सांस की तकलीफ', th: 'หายใจลำบาก', vi: 'Khó thở',
        ro: 'Dificultate în respirație', bg: 'Задух', hr: 'Otežano disanje', sr: 'Отежано дисање'
      },
      category: 'symptoms',
      description: 'Difficulté à respirer normalement',
      difficulty: 'medium',
      frequency: 60
    },
    // Maladies communes
    {
      french: 'Diabète',
      translations: {
        en: 'Diabetes', es: 'Diabetes', ar: 'داء السكري', pt: 'Diabetes',
        ru: 'Диабет', zh: '糖尿病', de: 'Diabetes', it: 'Diabete',
        nl: 'Diabetes', pl: 'Cukrzyca', tr: 'Şeker hastalığı', ja: '糖尿病',
        ko: '당뇨병', hi: 'मधुमेह', th: 'เบาหวาน', vi: 'Tiểu đường',
        ro: 'Diabet', bg: 'Диабет', hr: 'Dijabetes', sr: 'Дијабетес'
      },
      category: 'diseases',
      description: 'Maladie chronique caractérisée par un taux de sucre élevé dans le sang',
      difficulty: 'medium',
      frequency: 50
    },
    {
      french: 'Hypertension',
      translations: {
        en: 'High blood pressure', es: 'Hipertensión', ar: 'ارتفاع ضغط الدم', pt: 'Hipertensão',
        ru: 'Гипертония', zh: '高血压', de: 'Bluthochdruck', it: 'Ipertensione',
        nl: 'Hoge bloeddruk', pl: 'Nadciśnienie', tr: 'Yüksek tansiyon', ja: '高血圧',
        ko: '고혈압', hi: 'उच्च रक्तचाप', th: 'ความดันโลหิตสูง', vi: 'Tăng huyết áp',
        ro: 'Hipertensiune', bg: 'Хипертония', hr: 'Hipertenzija', sr: 'Хипертензија'
      },
      category: 'diseases',
      description: 'Élévation anormale de la pression artérielle',
      difficulty: 'hard',
      frequency: 40
    },
    // Médicaments
    {
      french: 'Antibiotique',
      translations: {
        en: 'Antibiotic', es: 'Antibiótico', ar: 'مضاد حيوي', pt: 'Antibiótico',
        ru: 'Антибиотик', zh: '抗生素', de: 'Antibiotikum', it: 'Antibiotico',
        nl: 'Antibioticum', pl: 'Antybiotyk', tr: 'Antibiyotik', ja: '抗生物質',
        ko: '항생제', hi: 'प्रतिजैविक', th: 'ยาปฏิชีวนะ', vi: 'Thuốc kháng sinh',
        ro: 'Antibiotic', bg: 'Антибиотик', hr: 'Antibiotik', sr: 'Антибиотик'
      },
      category: 'medications',
      description: 'Médicament utilisé pour traiter les infections bactériennes',
      difficulty: 'medium',
      frequency: 65
    },
    {
      french: 'Antidouleur',
      translations: {
        en: 'Painkiller', es: 'Analgésico', ar: 'مسكن للألم', pt: 'Analgésico',
        ru: 'Обезболивающее', zh: '止痛药', de: 'Schmerzmittel', it: 'Antidolorifico',
        nl: 'Pijnstiller', pl: 'Środek przeciwbólowy', tr: 'Ağrı kesici', ja: '鎮痛剤',
        ko: '진통제', hi: 'दर्द निवारक', th: 'ยาแก้ปวด', vi: 'Thuốc giảm đau',
        ro: 'Analgezic', bg: 'Болкоуспокояващо', hr: 'Analgetik', sr: 'Аналгетик'
      },
      category: 'medications',
      description: 'Médicament qui réduit ou élimine la douleur',
      difficulty: 'easy',
      frequency: 80
    },
    // Examens médicaux
    {
      french: 'Prise de sang',
      translations: {
        en: 'Blood test', es: 'Análisis de sangre', ar: 'فحص الدم', pt: 'Exame de sangue',
        ru: 'Анализ крови', zh: '血液检查', de: 'Blutuntersuchung', it: 'Esame del sangue',
        nl: 'Bloedonderzoek', pl: 'Badanie krwi', tr: 'Kan tahlili', ja: '血液検査',
        ko: '혈액 검사', hi: 'रक्त जांच', th: 'ตรวจเลือด', vi: 'Xét nghiệm máu',
        ro: 'Analiză de sânge', bg: 'Кръвен тест', hr: 'Krvni test', sr: 'Анализа крви'
      },
      category: 'procedures',
      description: 'Prélèvement et analyse du sang pour diagnostic',
      difficulty: 'easy',
      frequency: 70
    },
    {
      french: 'Radiographie',
      translations: {
        en: 'X-ray', es: 'Radiografía', ar: 'أشعة سينية', pt: 'Raio-X',
        ru: 'Рентген', zh: 'X光检查', de: 'Röntgen', it: 'Radiografia',
        nl: 'Röntgenfoto', pl: 'Prześwietlenie', tr: 'Röntgen', ja: 'レントゲン',
        ko: 'X선 촬영', hi: 'एक्स-रे', th: 'เอ็กซ์เรย์', vi: 'Chụp X-quang',
        ro: 'Radiografie', bg: 'Рентген', hr: 'Rendgen', sr: 'Рендген'
      },
      category: 'procedures',
      description: 'Examen d\'imagerie médicale utilisant les rayons X',
      difficulty: 'medium',
      frequency: 55
    }
  ];

  const emergencyPhrases: EmergencyPhrase[] = [
    {
      french: 'J\'ai besoin d\'aide médicale urgente',
      translations: {
        en: 'I need urgent medical help', es: 'Necesito ayuda médica urgente', ar: 'أحتاج مساعدة طبية عاجلة',
        pt: 'Preciso de ajuda médica urgente', ru: 'Мне нужна срочная медицинская помощь', zh: '我需要紧急医疗帮助',
        de: 'Ich brauche dringend medizinische Hilfe', it: 'Ho bisogno di aiuto medico urgente',
        nl: 'Ik heb dringend medische hulp nodig', pl: 'Potrzebuję pilnej pomocy medycznej',
        tr: 'Acil tıbbi yardıma ihtiyacım var', ja: '緊急医療援助が必要です',
        ko: '응급 의료 도움이 필요합니다', hi: 'मुझे तत्काल चिकित्सा सहायता चाहिए',
        th: 'ฉันต้องการความช่วยเหลือทางการแพทย์เร่งด่วน', vi: 'Tôi cần trợ giúp y tế khẩn cấp',
        ro: 'Am nevoie de ajutor medical urgent', bg: 'Имам нужда от спешна медицинска помощ',
        hr: 'Trebam hitnu medicinsku pomoć', sr: 'Треба ми хитна медицинска помоћ'
      },
      priority: 'high',
      context: 'Urgence générale'
    },
    {
      french: 'Appelez une ambulance',
      translations: {
        en: 'Call an ambulance', es: 'Llamen una ambulancia', ar: 'اتصلوا بسيارة الإسعاف',
        pt: 'Chamem uma ambulância', ru: 'Вызовите скорую помощь', zh: '叫救护车',
        de: 'Rufen Sie einen Krankenwagen', it: 'Chiamate un\'ambulanza',
        nl: 'Bel een ambulance', pl: 'Wezwijcie karetkę', tr: 'Ambulans çağırın',
        ja: '救急車を呼んでください', ko: '구급차를 불러주세요', hi: 'एम्बुलेंस बुलाएं',
        th: 'เรียกรถพยาบาล', vi: 'Gọi xe cứu thương', ro: 'Chemați o ambulanță',
        bg: 'Извикайте линейка', hr: 'Pozovite hitnu pomoć', sr: 'Позовите хитну помоћ'
      },
      priority: 'high',
      context: 'Demande d\'ambulance'
    },
    {
      french: 'Je suis allergique à...',
      translations: {
        en: 'I am allergic to...', es: 'Soy alérgico a...', ar: 'أنا أعاني من حساسية تجاه...',
        pt: 'Sou alérgico a...', ru: 'У меня аллергия на...', zh: '我对...过敏',
        de: 'Ich bin allergisch gegen...', it: 'Sono allergico a...',
        nl: 'Ik ben allergisch voor...', pl: 'Jestem uczulony na...',
        tr: '...ya karşı alerjim var', ja: '...にアレルギーがあります',
        ko: '...에 알레르기가 있습니다', hi: 'मुझे ... से एलर्जी है',
        th: 'ฉันแพ้...', vi: 'Tôi bị dị ứng với...', ro: 'Sunt alergic la...',
        bg: 'Алергичен съм към...', hr: 'Alergičan sam na...', sr: 'Алергичан сам на...'
      },
      priority: 'high',
      context: 'Information allergies'
    },
    {
      french: 'Où est l\'hôpital le plus proche?',
      translations: {
        en: 'Where is the nearest hospital?', es: '¿Dónde está el hospital más cercano?',
        ar: 'أين أقرب مستشفى؟', pt: 'Onde fica o hospital mais próximo?',
        ru: 'Где ближайшая больница?', zh: '最近的医院在哪里？',
        de: 'Wo ist das nächste Krankenhaus?', it: 'Dov\'è l\'ospedale più vicino?',
        nl: 'Waar is het dichtstbijzijnde ziekenhuis?', pl: 'Gdzie jest najbliższy szpital?',
        tr: 'En yakın hastane nerede?', ja: '一番近い病院はどこですか？',
        ko: '가장 가까운 병원이 어디인가요?', hi: 'सबसे नजदीकी अस्पताल कहाँ है?',
        th: 'โรงพยาบาลที่ใกล้ที่สุดอยู่ที่ไหน?', vi: 'Bệnh viện gần nhất ở đâu?',
        ro: 'Unde este spitalul cel mai apropiat?', bg: 'Къде е най-близката болница?',
        hr: 'Gdje je najbliža bolnica?', sr: 'Где је најближа болница?'
      },
      priority: 'medium',
      context: 'Recherche hôpital'
    }
  ];

  const categories = [
    { id: 'all', name: 'Tous les termes', icon: BookOpen, count: medicalTerms.length },
    { id: 'symptoms', name: 'Symptômes', icon: AlertCircle, count: medicalTerms.filter(t => t.category === 'symptoms').length },
    { id: 'diseases', name: 'Maladies', icon: Heart, count: medicalTerms.filter(t => t.category === 'diseases').length },
    { id: 'medications', name: 'Médicaments', icon: Heart, count: medicalTerms.filter(t => t.category === 'medications').length },
    { id: 'procedures', name: 'Examens', icon: Search, count: medicalTerms.filter(t => t.category === 'procedures').length }
  ];

  const filteredTerms = medicalTerms.filter(term => {
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      term.french.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.translations[selectedLanguage]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const speak = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'en' ? 'en-US' : lang === 'fr' ? 'fr-FR' : 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const addToFavorites = (termFrench: string) => {
    const newFavorites = userProgress.favoriteTerms.includes(termFrench)
      ? userProgress.favoriteTerms.filter(t => t !== termFrench)
      : [...userProgress.favoriteTerms, termFrench];
    
    setUserProgress({
      ...userProgress,
      favoriteTerms: newFavorites
    });
  };

  const addToSearchHistory = (term: string) => {
    if (term.trim()) {
      const newHistory = [term, ...userProgress.searchHistory.filter(h => h !== term)].slice(0, 10);
      setUserProgress({
        ...userProgress,
        searchHistory: newHistory
      });
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const timer = setTimeout(() => {
        addToSearchHistory(searchTerm);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [searchTerm]);

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
    <ToolContainer
      title="Traducteur Médical"
      description="Facilitez la communication avec les professionnels de santé"
      icon={<Globe className="h-8 w-8 text-blue-600" />}
      onBack={onBack}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="dictionary" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Dictionnaire
          </TabsTrigger>
          <TabsTrigger value="emergency" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Urgences
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Progrès
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dictionary" className="space-y-6">
          {/* Filtres et recherche */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Rechercher un terme médical
              </CardTitle>
              <CardDescription>
                Trouvez rapidement les termes médicaux dont vous avez besoin
              </CardDescription>
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
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label>Langue de traduction</Label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map(lang => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <span className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map(category => {
                  const IconComponent = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="flex items-center gap-2"
                    >
                      <IconComponent className="h-4 w-4" />
                      {category.name} ({category.count})
                    </Button>
                  );
                })}
              </div>

              {userProgress.searchHistory.length > 0 && (
                <div>
                  <Label className="text-sm text-gray-600">Recherches récentes</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {userProgress.searchHistory.slice(0, 5).map((term, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        onClick={() => setSearchTerm(term)}
                        className="text-xs"
                      >
                        <History className="h-3 w-3 mr-1" />
                        {term}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Résultats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTerms.map((term, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {term.french}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addToFavorites(term.french)}
                        className="text-yellow-500 hover:text-yellow-600"
                      >
                        <Star className={`h-4 w-4 ${userProgress.favoriteTerms.includes(term.french) ? 'fill-current' : ''}`} />
                      </Button>
                    </CardTitle>
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
                          onClick={() => speak(term.french, 'fr')}
                          title="Écouter en français"
                        >
                          <Volume2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => speak(term.translations[selectedLanguage], selectedLanguage)}
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
                  <SelectTrigger className="w-full md:w-64 mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map(lang => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {emergencyPhrases.map((phrase, index) => (
                  <Card key={index} className={`${phrase.priority === 'high' ? 'bg-red-50 border-red-200' : 'bg-orange-50 border-orange-200'}`}>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900 text-lg">
                              {phrase.french}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <span>🇫🇷</span>
                              <span>Français</span>
                            </div>
                            <Badge variant="outline" className="mt-2 text-xs">
                              {phrase.context}
                            </Badge>
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
                            <div className={`font-medium text-lg ${phrase.priority === 'high' ? 'text-red-900' : 'text-orange-900'}`}>
                              {phrase.translations[selectedLanguage]}
                            </div>
                            <div className={`text-sm flex items-center gap-1 ${phrase.priority === 'high' ? 'text-red-600' : 'text-orange-600'}`}>
                              <span>{languages.find(l => l.code === selectedLanguage)?.flag}</span>
                              <span>{languages.find(l => l.code === selectedLanguage)?.name}</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => speak(phrase.translations[selectedLanguage], selectedLanguage)}
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
              <CardDescription>
                Numéros essentiels à connaître en cas d'urgence médicale
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">15</div>
                  <div className="font-medium text-red-800">SAMU</div>
                  <div className="text-sm text-red-600">Urgences médicales</div>
                  <div className="text-xs text-red-500 mt-1">Service d'Aide Médicale Urgente</div>
                </div>
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">18</div>
                  <div className="font-medium text-orange-800">Pompiers</div>
                  <div className="text-sm text-orange-600">Secours d'urgence</div>
                  <div className="text-xs text-orange-500 mt-1">Secours et lutte contre l'incendie</div>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">112</div>
                  <div className="font-medium text-blue-800">Urgences EU</div>
                  <div className="text-sm text-blue-600">Numéro européen</div>
                  <div className="text-xs text-blue-500 mt-1">Urgences depuis portable</div>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">3624</div>
                  <div className="font-medium text-green-800">SOS Médecins</div>
                  <div className="text-sm text-green-600">Consultations urgentes</div>
                  <div className="text-xs text-green-500 mt-1">Consultations à domicile</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
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
                              onClick={() => addToFavorites(termFrench)}
                              className="text-yellow-500"
                            >
                              <Star className="h-4 w-4 fill-current" />
                            </Button>
                          </div>
                        ) : null;
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">Aucun terme favori pour le moment</p>
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
                            onClick={() => setSearchTerm(term)}
                            className="text-blue-600"
                          >
                            <Search className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">Aucune recherche effectuée</p>
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
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{userProgress.favoriteTerms.length}</div>
                  <div className="text-sm text-purple-800">Termes sauvegardés</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{userProgress.searchHistory.length}</div>
                  <div className="text-sm text-blue-800">Recherches effectuées</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{medicalTerms.length}</div>
                  <div className="text-sm text-green-800">Termes disponibles</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </ToolContainer>
  );
};

export default MedicalTranslatorTool;
