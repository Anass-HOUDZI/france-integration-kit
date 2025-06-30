
export interface MedicalTerm {
  french: string;
  translations: Record<string, string>;
  category: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  frequency: number;
}

export interface EmergencyPhrase {
  french: string;
  translations: Record<string, string>;
  priority: 'high' | 'medium' | 'low';
  context: string;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export const languages: Language[] = [
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

export const medicalTerms: MedicalTerm[] = [
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
  {
    french: 'Douleur thoracique',
    translations: {
      en: 'Chest pain', es: 'Dolor en el pecho', ar: 'ألم في الصدر', pt: 'Dor no peito',
      ru: 'Боль в груди', zh: '胸痛', de: 'Brustschmerzen', it: 'Dolore toracico',
      nl: 'Pijn op de borst', pl: 'Ból w klatce piersiowej', tr: 'Göğüs ağrısı', ja: '胸痛',
      ko: '흉통', hi: 'छाती में दर्द', th: 'ปวดหน้าอก', vi: 'Đau ngực',
      ro: 'Durere în piept', bg: 'Болка в гърдите', hr: 'Bol u prsima', sr: 'Бол у грудима'
    },
    category: 'symptoms',
    description: 'Douleur ressentie dans la région du thorax',
    difficulty: 'medium',
    frequency: 70
  },
  {
    french: 'Vertige',
    translations: {
      en: 'Dizziness', es: 'Mareo', ar: 'دوخة', pt: 'Tontura',
      ru: 'Головокружение', zh: '头晕', de: 'Schwindel', it: 'Vertigine',
      nl: 'Duizeligheid', pl: 'Zawroty głowy', tr: 'Baş dönmesi', ja: 'めまい',
      ko: '어지럼증', hi: 'चक्कर आना', th: 'เวียนหัว', vi: 'Chóng mặt',
      ro: 'Amețeală', bg: 'Замайване', hr: 'Vrtoglavica', sr: 'Вртоглавица'
    },
    category: 'symptoms',
    description: 'Sensation de perte d\'équilibre ou de rotation',
    difficulty: 'medium',
    frequency: 65
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
  {
    french: 'Asthme',
    translations: {
      en: 'Asthma', es: 'Asma', ar: 'الربو', pt: 'Asma',
      ru: 'Астма', zh: '哮喘', de: 'Asthma', it: 'Asma',
      nl: 'Astma', pl: 'Astma', tr: 'Astım', ja: '喘息',
      ko: '천식', hi: 'दमा', th: 'หอบหืด', vi: 'Hen suyễn',
      ro: 'Astm', bg: 'Астма', hr: 'Astma', sr: 'Астма'
    },
    category: 'diseases',
    description: 'Maladie respiratoire chronique avec difficultés respiratoires',
    difficulty: 'medium',
    frequency: 45
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
  {
    french: 'Vaccin',
    translations: {
      en: 'Vaccine', es: 'Vacuna', ar: 'لقاح', pt: 'Vacina',
      ru: 'Вакцина', zh: '疫苗', de: 'Impfstoff', it: 'Vaccino',
      nl: 'Vaccin', pl: 'Szczepionka', tr: 'Aşı', ja: 'ワクチン',
      ko: '백신', hi: 'टीका', th: 'วัคซีน', vi: 'Vắc-xin',
      ro: 'Vaccin', bg: 'Ваксина', hr: 'Cjepivo', sr: 'Вакцина'
    },
    category: 'medications',
    description: 'Préparation destinée à créer une immunité contre une maladie',
    difficulty: 'medium',
    frequency: 55
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
  },
  {
    french: 'Échographie',
    translations: {
      en: 'Ultrasound', es: 'Ecografía', ar: 'تصوير بالموجات فوق الصوتية', pt: 'Ultrassom',
      ru: 'УЗИ', zh: '超声波检查', de: 'Ultraschall', it: 'Ecografia',
      nl: 'Echografie', pl: 'USG', tr: 'Ultrason', ja: '超音波検査',
      ko: '초음파 검사', hi: 'अल्ट्रासाउंड', th: 'อัลตราซาวด์', vi: 'Siêu âm',
      ro: 'Ecografie', bg: 'Ехография', hr: 'Ultrazvuk', sr: 'Ултразвук'
    },
    category: 'procedures',
    description: 'Examen médical utilisant les ultrasons pour visualiser les organes',
    difficulty: 'medium',
    frequency: 50
  }
];

export const emergencyPhrases: EmergencyPhrase[] = [
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
  },
  {
    french: 'J\'ai mal ici',
    translations: {
      en: 'It hurts here', es: 'Me duele aquí', ar: 'أشعر بالألم هنا',
      pt: 'Dói aqui', ru: 'У меня болит здесь', zh: '这里疼',
      de: 'Hier tut es weh', it: 'Mi fa male qui',
      nl: 'Hier doet het pijn', pl: 'Tutaj mnie boli',
      tr: 'Burada ağrıyor', ja: 'ここが痛いです',
      ko: '여기가 아픕니다', hi: 'यहाँ दर्द है',
      th: 'เจ็บตรงนี้', vi: 'Tôi đau ở đây', ro: 'Mă doare aici',
      bg: 'Боли ме тук', hr: 'Boli me ovdje', sr: 'Боли ме овде'
    },
    priority: 'medium',
    context: 'Localisation douleur'
  },
  {
    french: 'Je ne me sens pas bien',
    translations: {
      en: 'I don\'t feel well', es: 'No me siento bien', ar: 'لا أشعر بحالة جيدة',
      pt: 'Não me sinto bem', ru: 'Мне плохо', zh: '我感觉不舒服',
      de: 'Mir ist nicht gut', it: 'Non mi sento bene',
      nl: 'Ik voel me niet goed', pl: 'Źle się czuję',
      tr: 'Kendimi iyi hissetmiyorum', ja: '具合が悪いです',
      ko: '몸이 좋지 않습니다', hi: 'मैं अच्छा महसूस नहीं कर रहा',
      th: 'ฉันรู้สึกไม่สบาย', vi: 'Tôi cảm thấy không khỏe', ro: 'Nu mă simt bine',
      bg: 'Не се чувствам добре', hr: 'Ne osjećam se dobro', sr: 'Не осећам се добро'
    },
    priority: 'medium',
    context: 'Malaise général'
  }
];
