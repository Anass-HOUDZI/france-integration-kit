/**
 * Service d'internationalisation
 */

type TranslationKey = string;
type TranslationValue = string | Record<string, any>;
type Translations = Record<TranslationKey, TranslationValue>;

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' }
];

const TRANSLATIONS: Record<string, Translations> = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.tools': 'Outils',
    'nav.profile': 'Profil',
    'nav.help': 'Aide',
    
    // Common
    'common.save': 'Sauvegarder',
    'common.cancel': 'Annuler',
    'common.next': 'Suivant',
    'common.previous': 'Précédent',
    'common.submit': 'Valider',
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    'common.required': 'Obligatoire',
    'common.back': 'Retour',
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
    'common.all': 'Tous',
    'common.use_tool': 'Utiliser l\'outil',
    'common.popular': 'Populaire',
    'common.excellent': 'Excellent',
    'common.good': 'Bon',
    'common.basic': 'Basique',
    'common.easy': 'Facile',
    'common.medium': 'Moyen',
    'common.advanced': 'Avancé',
    
    // Homepage
    'home.title': 'Outils d\'Intégration',
    'home.subtitle': 'en France',
    'home.description': 'Une suite complète d\'outils gratuits et modernes pour vous accompagner dans vos démarches administratives et votre intégration en France',
    'home.search_placeholder': 'Rechercher un outil...',
    'home.all_categories': 'Toutes les catégories',
    'home.tools_found': 'outils trouvés',
    'home.popular_tools': 'outils populaires',
    'home.popular_tools_title': 'Outils Populaires',
    'home.no_tools_found': 'Aucun outil trouvé',
    'home.no_tools_description': 'Essayez de modifier vos critères de recherche',
    'home.reset_filters': 'Réinitialiser les filtres',
    'home.tools_count': 'outils',
    
    // Categories
    'category.admin': 'Démarches Administratives',
    'category.logement': 'Logement & Vie Quotidienne',
    'category.emploi': 'Emploi & Formation',
    'category.sante': 'Santé & Social',
    'category.education': 'Éducation & Famille',
    'category.culture': 'Intégration Culturelle',
    'category.transversal': 'Outils Transversaux',
    
    // Tools
    'tool.letter_generator': 'Générateur de Lettres Administratives',
    'tool.letter_generator_desc': 'Créez des lettres officielles pour vos démarches (préfecture, CAF, Pôle Emploi)',
    'tool.fee_calculator': 'Calculateur de Frais de Dossier',
    'tool.fee_calculator_desc': 'Estimez les coûts de vos démarches administratives',
    'tool.receipt_generator': 'Générateur de Récépissés',
    'tool.receipt_generator_desc': 'Créez et suivez vos récépissés de dépôt de dossier',
    'tool.delay_simulator': 'Simulateur de Délais',
    'tool.delay_simulator_desc': 'Estimez les temps de traitement de vos démarches',
    'tool.budget_calculator': 'Calculateur Budget Logement',
    'tool.budget_calculator_desc': 'Calculez votre budget logement selon vos revenus',
    'tool.cv_translator': 'Traducteur de CV Français',
    'tool.cv_translator_desc': 'Adaptez votre CV aux standards français',
    'tool.social_security_guide': 'Guide Sécurité Sociale',
    'tool.social_security_guide_desc': 'Comprenez le système de santé français',
    'tool.social_services_locator': 'Localisateur Services Sociaux',
    'tool.social_services_locator_desc': 'Trouvez les services sociaux près de chez vous',
    'tool.family_allowances_calculator': 'Calculateur Allocations Familiales',
    'tool.family_allowances_calculator_desc': 'Estimez vos droits aux allocations familiales',
    'tool.education_costs_calculator': 'Calculateur Frais Scolarité',
    'tool.education_costs_calculator_desc': 'Budgétez les coûts de scolarité et bourses',
    'tool.culture_quiz': 'Quiz Culture Française',
    'tool.culture_quiz_desc': 'Testez vos connaissances sur la culture française',
    'tool.traditions_guide': 'Guide Fêtes et Traditions',
    'tool.traditions_guide_desc': 'Découvrez le calendrier culturel français',
    'tool.french_learning_assistant': 'Assistant Apprentissage Français',
    'tool.french_learning_assistant_desc': 'Améliorez votre français au quotidien',
    'tool.naturalization_simulator': 'Simulateur Test Naturalisation',
    'tool.naturalization_simulator_desc': 'Préparez votre entretien de naturalisation',
    'tool.french_expressions_translator': 'Traducteur Expressions Françaises',
    'tool.french_expressions_translator_desc': 'Maîtrisez les expressions idiomatiques françaises',
    'tool.emergency_assistant': 'Assistant Urgences',
    'tool.emergency_assistant_desc': 'Numéros d\'urgence et procédures essentielles',
    'tool.planning_generator': 'Générateur Planning',
    'tool.planning_generator_desc': 'Organisez toutes vos démarches administratives',
    'tool.family_budget_assistant': 'Assistant Budget Familial',
    'tool.family_budget_assistant_desc': 'Gérez vos finances familiales en France',
    'tool.rights_guide': 'Guide Droits et Recours',
    'tool.rights_guide_desc': 'Connaissez vos droits et les procédures de recours',
    
    // User Menu
    'user.my_account': 'Mon compte',
    'user.refresh': 'Actualiser',
    'user.refresh_desc': 'Recharger les données',
    'user.export': 'Exporter données',
    'user.export_desc': 'Sauvegarder localement',
    'user.import': 'Importer données',
    'user.import_desc': 'Restaurer une sauvegarde',
    
    // Modules
    'modules.admin.title': 'Démarches Administratives',
    'modules.admin.description': 'Outils pour vos démarches officielles',
    'modules.logement.title': 'Logement & Vie Quotidienne',
    'modules.logement.description': 'Trouvez et gérez votre logement',
    'modules.emploi.title': 'Emploi & Formation',
    'modules.emploi.description': 'Outils pour votre recherche d\'emploi',
    'modules.sante.title': 'Santé & Social',
    'modules.sante.description': 'Comprendre le système de santé français',
    'modules.education.title': 'Éducation & Famille',
    'modules.education.description': 'Scolarité et vie de famille en France',
    'modules.culture.title': 'Intégration Culturelle',
    'modules.culture.description': 'Découvrir la culture française',
    'modules.transversal.title': 'Outils Transversaux',
    'modules.transversal.description': 'Outils d\'aide générale',
    
    // Emergency Tool
    'emergency.title': 'Assistant urgences : les numéros utiles',
    'emergency.description': 'Cliquez sur un numéro d\'urgence pour plus d\'informations ou pour appeler directement.',
    'emergency.call': 'Appeler',
    'emergency.info': 'Infos',
    'emergency.hide': 'Masquer',
    'emergency.advice_title': 'Conseils lors de l\'appel :',
    'emergency.advice_1': 'Indiquez votre nom et votre numéro de téléphone.',
    'emergency.advice_2': 'Donnez l\'adresse exacte (+ étage, code, interphone...)',
    'emergency.advice_3': 'Expliquez brièvement le problème et l\'état des personnes.',
    'emergency.advice_4': 'Ne raccrochez pas tant qu\'on ne vous l\'a pas dit.',
    'emergency.vital_title': 'Urgence vitale : restez calme, agissez vite !',
    'emergency.vital_desc': 'Ne paniquez pas, protégez la zone, alertez un service adapté et secourez si possible.\nVous avez droit à une assistance même sans papiers. Tous les appels sont gratuits, depuis mobiles et cabines.',
    'emergency.samu': 'SAMU',
    'emergency.samu_desc': 'Urgences médicales graves (blessure, malaise, douleur violente...).',
    'emergency.samu_when': 'Malaise, blessure, fièvre élevée, coma...',
    'emergency.pompiers': 'Pompiers',
    'emergency.pompiers_desc': 'Secours, incendie, accidents de la route, noyade, fuite de gaz...',
    'emergency.pompiers_when': 'Incendie, accident, personne bloquée, fuite de gaz...',
    'emergency.police': 'Police / Gendarmerie',
    'emergency.police_desc': 'Urgences sécurité : agression, vol, violence, danger.',
    'emergency.police_when': 'Agression, cambriolage, violences...',
    'emergency.european': 'Numéro Européen',
    'emergency.european_desc': 'Pour toutes urgences, partout en Europe.',
    'emergency.european_when': 'Si vous ne savez pas qui appeler',
    'emergency.social': 'SAMU Social',
    'emergency.social_desc': 'Aide et hébergement d\'urgence, personnes sans abri.',
    'emergency.social_when': 'Personne à la rue, détresse sociale...',
  },
  
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.tools': 'Tools',
    'nav.profile': 'Profile',
    'nav.help': 'Help',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.submit': 'Submit',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.required': 'Required',
    'common.back': 'Back',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.all': 'All',
    'common.use_tool': 'Use tool',
    'common.popular': 'Popular',
    'common.excellent': 'Excellent',
    'common.good': 'Good',
    'common.basic': 'Basic',
    'common.easy': 'Easy',
    'common.medium': 'Medium',
    'common.advanced': 'Advanced',
    
    // Homepage
    'home.title': 'Integration Tools',
    'home.subtitle': 'for France',
    'home.description': 'A complete suite of free and modern tools to help you with administrative procedures and integration in France',
    'home.search_placeholder': 'Search for a tool...',
    'home.all_categories': 'All categories',
    'home.tools_found': 'tools found',
    'home.popular_tools': 'popular tools',
    'home.popular_tools_title': 'Popular Tools',
    'home.no_tools_found': 'No tools found',
    'home.no_tools_description': 'Try modifying your search criteria',
    'home.reset_filters': 'Reset filters',
    'home.tools_count': 'tools',
    
    // Categories
    'category.admin': 'Administrative Procedures',
    'category.logement': 'Housing & Daily Life',
    'category.emploi': 'Employment & Training',
    'category.sante': 'Health & Social',
    'category.education': 'Education & Family',
    'category.culture': 'Cultural Integration',
    'category.transversal': 'Cross-cutting Tools',
    
    // Tools
    'tool.letter_generator': 'Administrative Letter Generator',
    'tool.letter_generator_desc': 'Create official letters for your procedures (prefecture, CAF, Employment Office)',
    'tool.fee_calculator': 'File Fee Calculator',
    'tool.fee_calculator_desc': 'Estimate the costs of your administrative procedures',
    'tool.receipt_generator': 'Receipt Generator',
    'tool.receipt_generator_desc': 'Create and track your file submission receipts',
    'tool.delay_simulator': 'Delay Simulator',
    'tool.delay_simulator_desc': 'Estimate processing times for your procedures',
    'tool.budget_calculator': 'Housing Budget Calculator',
    'tool.budget_calculator_desc': 'Calculate your housing budget according to your income',
    'tool.cv_translator': 'French CV Translator',
    'tool.cv_translator_desc': 'Adapt your CV to French standards',
    'tool.social_security_guide': 'Social Security Guide',
    'tool.social_security_guide_desc': 'Understand the French healthcare system',
    'tool.social_services_locator': 'Social Services Locator',
    'tool.social_services_locator_desc': 'Find social services near you',
    'tool.family_allowances_calculator': 'Family Allowances Calculator',
    'tool.family_allowances_calculator_desc': 'Estimate your family allowance rights',
    'tool.education_costs_calculator': 'Education Costs Calculator',
    'tool.education_costs_calculator_desc': 'Budget education costs and scholarships',
    'tool.culture_quiz': 'French Culture Quiz',
    'tool.culture_quiz_desc': 'Test your knowledge of French culture',
    'tool.traditions_guide': 'Holidays and Traditions Guide',
    'tool.traditions_guide_desc': 'Discover the French cultural calendar',
    'tool.french_learning_assistant': 'French Learning Assistant',
    'tool.french_learning_assistant_desc': 'Improve your French daily',
    'tool.naturalization_simulator': 'Naturalization Test Simulator',
    'tool.naturalization_simulator_desc': 'Prepare for your naturalization interview',
    'tool.french_expressions_translator': 'French Expressions Translator',
    'tool.french_expressions_translator_desc': 'Master French idiomatic expressions',
    'tool.emergency_assistant': 'Emergency Assistant',
    'tool.emergency_assistant_desc': 'Emergency numbers and essential procedures',
    'tool.planning_generator': 'Planning Generator',
    'tool.planning_generator_desc': 'Organize all your administrative procedures',
    'tool.family_budget_assistant': 'Family Budget Assistant',
    'tool.family_budget_assistant_desc': 'Manage your family finances in France',
    'tool.rights_guide': 'Rights and Appeals Guide',
    'tool.rights_guide_desc': 'Know your rights and appeal procedures',
    
    // User Menu
    'user.my_account': 'My account',
    'user.refresh': 'Refresh',
    'user.refresh_desc': 'Reload data',
    'user.export': 'Export data',
    'user.export_desc': 'Save locally',
    'user.import': 'Import data',
    'user.import_desc': 'Restore backup',
    
    // Modules
    'modules.admin.title': 'Administrative Procedures',
    'modules.admin.description': 'Tools for your official procedures',
    'modules.logement.title': 'Housing & Daily Life',
    'modules.logement.description': 'Find and manage your accommodation',
    'modules.emploi.title': 'Employment & Training',
    'modules.emploi.description': 'Tools for your job search',
    'modules.sante.title': 'Health & Social',
    'modules.sante.description': 'Understand the French healthcare system',
    'modules.education.title': 'Education & Family',
    'modules.education.description': 'Education and family life in France',
    'modules.culture.title': 'Cultural Integration',
    'modules.culture.description': 'Discover French culture',
    'modules.transversal.title': 'Cross-cutting Tools',
    'modules.transversal.description': 'General assistance tools',
    
    // Emergency Tool
    'emergency.title': 'Emergency assistant: useful numbers',
    'emergency.description': 'Click on an emergency number for more information or to call directly.',
    'emergency.call': 'Call',
    'emergency.info': 'Info',
    'emergency.hide': 'Hide',
    'emergency.advice_title': 'Tips when calling:',
    'emergency.advice_1': 'State your name and phone number.',
    'emergency.advice_2': 'Give the exact address (+ floor, code, intercom...)',
    'emergency.advice_3': 'Briefly explain the problem and the condition of people.',
    'emergency.advice_4': 'Don\'t hang up until you\'re told to.',
    'emergency.vital_title': 'Life-threatening emergency: stay calm, act quickly!',
    'emergency.vital_desc': 'Don\'t panic, secure the area, alert an appropriate service and rescue if possible.\nYou have the right to assistance even without papers. All calls are free, from mobile phones and phone booths.',
    'emergency.samu': 'SAMU',
    'emergency.samu_desc': 'Serious medical emergencies (injury, discomfort, severe pain...).',
    'emergency.samu_when': 'Discomfort, injury, high fever, coma...',
    'emergency.pompiers': 'Fire Department',
    'emergency.pompiers_desc': 'Rescue, fire, road accidents, drowning, gas leak...',
    'emergency.pompiers_when': 'Fire, accident, person trapped, gas leak...',
    'emergency.police': 'Police / Gendarmerie',
    'emergency.police_desc': 'Security emergencies: assault, theft, violence, danger.',
    'emergency.police_when': 'Assault, burglary, violence...',
    'emergency.european': 'European Number',
    'emergency.european_desc': 'For all emergencies, throughout Europe.',
    'emergency.european_when': 'If you don\'t know who to call',
    'emergency.social': 'Social SAMU',
    'emergency.social_desc': 'Emergency aid and accommodation, homeless people.',
    'emergency.social_when': 'Person on the street, social distress...',
  },
  
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.tools': 'Herramientas',
    'nav.profile': 'Perfil',
    'nav.help': 'Ayuda',
    
    // Common
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.next': 'Siguiente',
    'common.previous': 'Anterior',
    'common.submit': 'Enviar',
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.required': 'Obligatorio',
    'common.back': 'Volver',
    'common.search': 'Buscar',
    'common.filter': 'Filtrar',
    'common.all': 'Todos',
    'common.use_tool': 'Usar herramienta',
    'common.popular': 'Popular',
    'common.excellent': 'Excelente',
    'common.good': 'Bueno',
    'common.basic': 'Básico',
    'common.easy': 'Fácil',
    'common.medium': 'Medio',
    'common.advanced': 'Avanzado',
    
    // Homepage
    'home.title': 'Herramientas de Integración',
    'home.subtitle': 'para Francia',
    'home.description': 'Una suite completa de herramientas gratuitas y modernas para ayudarte con los procedimientos administrativos y la integración en Francia',
    'home.search_placeholder': 'Buscar una herramienta...',
    'home.all_categories': 'Todas las categorías',
    'home.tools_found': 'herramientas encontradas',
    'home.popular_tools': 'herramientas populares',
    'home.popular_tools_title': 'Herramientas Populares',
    'home.no_tools_found': 'No se encontraron herramientas',
    'home.no_tools_description': 'Intenta modificar tus criterios de búsqueda',
    'home.reset_filters': 'Restablecer filtros',
    'home.tools_count': 'herramientas',
    
    // Categories
    'category.admin': 'Procedimientos Administrativos',
    'category.logement': 'Vivienda y Vida Diaria',
    'category.emploi': 'Empleo y Formación',
    'category.sante': 'Salud y Social',
    'category.education': 'Educación y Familia',
    'category.culture': 'Integración Cultural',
    'category.transversal': 'Herramientas Transversales',
    
    // User Menu
    'user.my_account': 'Mi cuenta',
    'user.refresh': 'Actualizar',
    'user.refresh_desc': 'Recargar datos',
    'user.export': 'Exportar datos',
    'user.export_desc': 'Guardar localmente',
    'user.import': 'Importar datos',
    'user.import_desc': 'Restaurar copia de seguridad',
    
    // Modules
    'modules.admin.title': 'Procedimientos Administrativos',
    'modules.logement.title': 'Vivienda y Vida Diaria',
    'modules.emploi.title': 'Empleo y Formación',
    'modules.sante.title': 'Salud y Social',
    'modules.education.title': 'Educación y Familia',
    'modules.culture.title': 'Integración Cultural',
    'modules.transversal.title': 'Herramientas Transversales',
  },
  
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.tools': 'الأدوات',
    'nav.profile': 'الملف الشخصي',
    'nav.help': 'المساعدة',
    
    // Common
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.next': 'التالي',
    'common.previous': 'السابق',
    'common.submit': 'إرسال',
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.success': 'نجح',
    'common.required': 'مطلوب',
    'common.back': 'العودة',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.all': 'الكل',
    'common.use_tool': 'استخدام الأداة',
    'common.popular': 'شائع',
    'common.excellent': 'ممتاز',
    'common.good': 'جيد',
    'common.basic': 'أساسي',
    'common.easy': 'سهل',
    'common.medium': 'متوسط',
    'common.advanced': 'متقدم',
    
    // Homepage
    'home.title': 'أدوات الاندماج',
    'home.subtitle': 'في فرنسا',
    'home.description': 'مجموعة كاملة من الأدوات المجانية والحديثة لمساعدتك في الإجراءات الإدارية والاندماج في فرنسا',
    'home.search_placeholder': 'البحث عن أداة...',
    'home.all_categories': 'جميع الفئات',
    'home.tools_found': 'أدوات موجودة',
    'home.popular_tools': 'أدوات شائعة',
    'home.popular_tools_title': 'الأدوات الشائعة',
    'home.no_tools_found': 'لم يتم العثور على أدوات',
    'home.no_tools_description': 'حاول تعديل معايير البحث',
    'home.reset_filters': 'إعادة تعيين المرشحات',
    'home.tools_count': 'أدوات',
    
    // Categories
    'category.admin': 'الإجراءات الإدارية',
    'category.logement': 'السكن والحياة اليومية',
    'category.emploi': 'العمل والتدريب',
    'category.sante': 'الصحة والاجتماعية',
    'category.education': 'التعليم والعائلة',
    'category.culture': 'الاندماج الثقافي',
    'category.transversal': 'أدوات شاملة',
    
    // User Menu
    'user.my_account': 'حسابي',
    'user.refresh': 'تحديث',
    'user.refresh_desc': 'إعادة تحميل البيانات',
    'user.export': 'تصدير البيانات',
    'user.export_desc': 'حفظ محلياً',
    'user.import': 'استيراد البيانات',
    'user.import_desc': 'استعادة النسخة الاحتياطية',
    
    // Modules
    'modules.admin.title': 'الإجراءات الإدارية',
    'modules.logement.title': 'السكن والحياة اليومية',
    'modules.emploi.title': 'العمل والتدريب',
    'modules.sante.title': 'الصحة والاجتماعية',
    'modules.education.title': 'التعليم والعائلة',
    'modules.culture.title': 'الاندماج الثقافي',
    'modules.transversal.title': 'أدوات شاملة',
  },
  
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.tools': '工具',
    'nav.profile': '个人资料',
    'nav.help': '帮助',
    
    // Common
    'common.save': '保存',
    'common.cancel': '取消',
    'common.next': '下一步',
    'common.previous': '上一步',
    'common.submit': '提交',
    'common.loading': '加载中...',
    'common.error': '错误',
    'common.success': '成功',
    'common.required': '必需',
    'common.back': '返回',
    'common.search': '搜索',
    'common.filter': '筛选',
    'common.all': '全部',
    'common.use_tool': '使用工具',
    'common.popular': '热门',
    'common.excellent': '优秀',
    'common.good': '良好',
    'common.basic': '基础',
    'common.easy': '简单',
    'common.medium': '中等',
    'common.advanced': '高级',
    
    // Homepage
    'home.title': '融入工具',
    'home.subtitle': '法国',
    'home.description': '一套完整的免费现代工具，帮助您处理行政程序并融入法国',
    'home.search_placeholder': '搜索工具...',
    'home.all_categories': '所有类别',
    'home.tools_found': '找到的工具',
    'home.popular_tools': '热门工具',
    'home.popular_tools_title': '热门工具',
    'home.no_tools_found': '未找到工具',
    'home.no_tools_description': '尝试修改搜索条件',
    'home.reset_filters': '重置筛选器',
    'home.tools_count': '工具',
    
    // Categories
    'category.admin': '行政程序',
    'category.logement': '住房与日常生活',
    'category.emploi': '就业与培训',
    'category.sante': '健康与社会',
    'category.education': '教育与家庭',
    'category.culture': '文化融入',
    'category.transversal': '综合工具',
    
    // User Menu
    'user.my_account': '我的账户',
    'user.refresh': '刷新',
    'user.refresh_desc': '重新加载数据',
    'user.export': '导出数据',
    'user.export_desc': '本地保存',
    'user.import': '导入数据',
    'user.import_desc': '恢复备份',
    
    // Modules
    'modules.admin.title': '行政程序',
    'modules.logement.title': '住房与日常生活',
    'modules.emploi.title': '就业与培训',
    'modules.sante.title': '健康与社会',
    'modules.education.title': '教育与家庭',
    'modules.culture.title': '文化融入',
    'modules.transversal.title': '综合工具',
  }
};

class I18nService {
  private currentLanguage: string = 'fr';
  private fallbackLanguage: string = 'fr';

  constructor() {
    // Détecter la langue du navigateur
    const browserLang = navigator.language.split('-')[0];
    if (SUPPORTED_LANGUAGES.some(lang => lang.code === browserLang)) {
      this.currentLanguage = browserLang;
    }
    
    // Charger la langue sauvegardée
    const savedLang = localStorage.getItem('user_language');
    if (savedLang && SUPPORTED_LANGUAGES.some(lang => lang.code === savedLang)) {
      this.currentLanguage = savedLang;
    }
  }

  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  getSupportedLanguages(): Language[] {
    return SUPPORTED_LANGUAGES;
  }

  setLanguage(languageCode: string): void {
    if (SUPPORTED_LANGUAGES.some(lang => lang.code === languageCode)) {
      this.currentLanguage = languageCode;
      localStorage.setItem('user_language', languageCode);
      
      // Déclencher un événement pour mettre à jour l'interface
      window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language: languageCode } 
      }));
    }
  }

  t(key: string, params?: Record<string, any>): string {
    const translation = this.getTranslation(key);
    
    if (!params) return translation;
    
    // Remplacer les paramètres dans la traduction
    return Object.keys(params).reduce((text, param) => {
      return text.replace(new RegExp(`{{${param}}}`, 'g'), String(params[param]));
    }, translation);
  }

  private getTranslation(key: string): string {
    const currentTranslations = TRANSLATIONS[this.currentLanguage];
    const fallbackTranslations = TRANSLATIONS[this.fallbackLanguage];
    
    // Chercher dans la langue actuelle
    if (currentTranslations && currentTranslations[key]) {
      return String(currentTranslations[key]);
    }
    
    // Chercher dans la langue de fallback
    if (fallbackTranslations && fallbackTranslations[key]) {
      return String(fallbackTranslations[key]);
    }
    
    // Retourner la clé si aucune traduction trouvée
    console.warn(`Translation missing for key: ${key}`);
    return key;
  }

  formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat(this.currentLanguage, options).format(value);
  }

  formatCurrency(value: number, currency: string = 'EUR'): string {
    return new Intl.NumberFormat(this.currentLanguage, {
      style: 'currency',
      currency: currency
    }).format(value);
  }

  formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
    return new Intl.DateTimeFormat(this.currentLanguage, options).format(date);
  }
}

export const i18n = new I18nService();
export type { Language, Translations };
