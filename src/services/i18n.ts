
/**
 * Service d'internationalisation pour l'application
 */

export type Language = 'fr' | 'en' | 'es' | 'ar' | 'zh';

interface Translation {
  [key: string]: string | Translation;
}

interface Translations {
  [key: string]: Translation;
}

const translations: Translations = {
  fr: {
    common: {
      back: 'Retour',
      next: 'Suivant',
      previous: 'Précédent',
      submit: 'Soumettre',
      cancel: 'Annuler',
      save: 'Enregistrer',
      delete: 'Supprimer',
      edit: 'Modifier',
      add: 'Ajouter',
      search: 'Rechercher',
      filter: 'Filtrer',
      export: 'Exporter',
      import: 'Importer',
      download: 'Télécharger',
      upload: 'Téléverser',
      copy: 'Copier',
      print: 'Imprimer',
      close: 'Fermer',
      open: 'Ouvrir',
      yes: 'Oui',
      no: 'Non',
      ok: 'OK',
      error: 'Erreur',
      success: 'Succès',
      loading: 'Chargement...',
      more: 'Plus',
      less: 'Moins',
      all: 'Tous',
      none: 'Aucun',
      total: 'Total',
      free: 'Gratuit'
    },
    home: {
      title: 'Intégration France',
      subtitle: '50 outils gratuits pour votre intégration en France',
      description: 'Une suite complète d\'outils pour faciliter vos démarches administratives, logement, emploi et intégration culturelle en France.',
      get_started: 'Commencer',
      explore_tools: 'Explorer les outils',
      total_tools: 'outils disponibles',
      categories: 'catégories'
    },
    modules: {
      admin: {
        title: 'Démarches Administratives',
        description: 'Outils pour vos formalités et démarches officielles',
        tools_count: '12 outils'
      },
      logement: {
        title: 'Logement & Vie Quotidienne',
        description: 'Trouvez et gérez votre logement en France',
        tools_count: '8 outils'
      },
      emploi: {
        title: 'Emploi & Formation',
        description: 'Recherche d\'emploi et développement professionnel',
        tools_count: '8 outils'
      },
      sante: {
        title: 'Santé & Social',
        description: 'Accès aux soins et aides sociales',
        tools_count: '6 outils'
      },
      education: {
        title: 'Éducation & Famille',
        description: 'Scolarité et aides familiales',
        tools_count: '6 outils'
      },
      culture: {
        title: 'Intégration Culturelle',
        description: 'Apprenez la culture et la langue françaises',
        tools_count: '5 outils'
      },
      transversal: {
        title: 'Outils Transversaux',
        description: 'Outils utiles pour toutes situations',
        tools_count: '5 outils'
      }
    },
    tools: {
      letter_generator: {
        title: 'Générateur de Lettres',
        description: 'Créez des lettres administratives conformes'
      },
      fee_calculator: {
        title: 'Calculateur de Frais',
        description: 'Estimez les coûts de vos démarches'
      },
      budget_calculator: {
        title: 'Calculateur Budget Logement',
        description: 'Calculez votre budget logement optimal'
      },
      cv_translator: {
        title: 'Traducteur de CV',
        description: 'Adaptez votre CV aux standards français'
      },
      motivation_letter: {
        title: 'Lettres de Motivation',
        description: 'Générez des lettres de motivation percutantes'
      },
      social_security: {
        title: 'Guide Sécurité Sociale',
        description: 'Comprenez le système de santé français'
      },
      social_services: {
        title: 'Services Sociaux',
        description: 'Trouvez l\'aide sociale près de chez vous'
      },
      family_allowances: {
        title: 'Allocations Familiales',
        description: 'Calculez vos droits aux aides familiales'
      },
      education_costs: {
        title: 'Frais de Scolarité',
        description: 'Budgétez les coûts de scolarité'
      },
      culture_quiz: {
        title: 'Quiz Culture Française',
        description: 'Testez vos connaissances culturelles'
      },
      traditions_guide: {
        title: 'Guide des Traditions',
        description: 'Découvrez les fêtes et traditions françaises'
      },
      french_learning: {
        title: 'Assistant Français',
        description: 'Améliorez votre français progressivement'
      },
      naturalization_test: {
        title: 'Test de Naturalisation',
        description: 'Préparez votre entretien de naturalisation'
      },
      expressions_translator: {
        title: 'Expressions Françaises',
        description: 'Maîtrisez les expressions idiomatiques'
      },
      emergency_assistant: {
        title: 'Assistant Urgences',
        description: 'Numéros d\'urgence et procédures'
      },
      planning_generator: {
        title: 'Générateur Planning',
        description: 'Organisez vos démarches efficacement'
      },
      budget_assistant: {
        title: 'Assistant Budget Familial',
        description: 'Gérez votre budget familial'
      },
      rights_guide: {
        title: 'Guide Droits & Recours',
        description: 'Connaissez vos droits et recours'
      }
    },
    user: {
      my_account: 'Mon Compte',
      profile: 'Profil',
      profile_desc: 'Gérer vos informations personnelles',
      settings: 'Paramètres',
      settings_desc: 'Configurer l\'application',
      refresh: 'Actualiser',
      refresh_desc: 'Recharger l\'application',
      export: 'Exporter',
      export_desc: 'Sauvegarder vos données',
      import: 'Importer',
      import_desc: 'Restaurer vos données',
      help: 'Aide',
      help_desc: 'Obtenir de l\'aide',
      logout: 'Déconnexion',
      logout_desc: 'Se déconnecter de l\'application'
    },
    emergency: {
      title: 'Assistant Urgences',
      description: 'Numéros d\'urgence et conseils pour réagir efficacement',
      samu: 'SAMU',
      samu_desc: 'Urgences médicales, secours à personne',
      samu_when: 'Urgence médicale, malaise, accident grave',
      pompiers: 'Pompiers',
      pompiers_desc: 'Incendies, accidents, secours',
      pompiers_when: 'Incendie, accident, personne en danger',
      police: 'Police',
      police_desc: 'Urgences sécuritaires, crimes',
      police_when: 'Crime, vol, agression, trouble ordre public',
      european: 'Numéro Européen',
      european_desc: 'Numéro d\'urgence européen unifié',
      european_when: 'Toute urgence depuis un portable',
      social: 'Urgence Sociale',
      social_desc: 'Hébergement d\'urgence, aide sociale',
      social_when: 'Sans-abri, détresse sociale',
      call: 'Appeler',
      info: 'Infos',
      hide: 'Masquer',
      advice_title: 'Conseils avant d\'appeler :',
      advice_1: 'Restez calme et parlez clairement',
      advice_2: 'Donnez votre localisation précise',
      advice_3: 'Décrivez la situation sans raccrocher',
      advice_4: 'Suivez les instructions données',
      vital_title: 'Informations Vitales',
      vital_desc: 'En cas d\'urgence vitale, appelez immédiatement le 15 (SAMU) ou le 112. Ne perdez pas de temps à chercher le bon numéro.'
    }
  },
  en: {
    common: {
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      search: 'Search',
      filter: 'Filter',
      export: 'Export',
      import: 'Import',
      download: 'Download',
      upload: 'Upload',
      copy: 'Copy',
      print: 'Print',
      close: 'Close',
      open: 'Open',
      yes: 'Yes',
      no: 'No',
      ok: 'OK',
      error: 'Error',
      success: 'Success',
      loading: 'Loading...',
      more: 'More',
      less: 'Less',
      all: 'All',
      none: 'None',
      total: 'Total',
      free: 'Free'
    },
    home: {
      title: 'France Integration',
      subtitle: '50 free tools for your integration in France',
      description: 'A complete suite of tools to facilitate your administrative procedures, housing, employment and cultural integration in France.',
      get_started: 'Get Started',
      explore_tools: 'Explore Tools',
      total_tools: 'available tools',
      categories: 'categories'
    },
    modules: {
      admin: {
        title: 'Administrative Procedures',
        description: 'Tools for your formalities and official procedures',
        tools_count: '12 tools'
      },
      logement: {
        title: 'Housing & Daily Life',
        description: 'Find and manage your housing in France',
        tools_count: '8 tools'
      },
      emploi: {
        title: 'Employment & Training',
        description: 'Job search and professional development',
        tools_count: '8 tools'
      },
      sante: {
        title: 'Health & Social',
        description: 'Access to healthcare and social assistance',
        tools_count: '6 tools'
      },
      education: {
        title: 'Education & Family',
        description: 'Schooling and family assistance',
        tools_count: '6 tools'
      },
      culture: {
        title: 'Cultural Integration',
        description: 'Learn French culture and language',
        tools_count: '5 tools'
      },
      transversal: {
        title: 'Universal Tools',
        description: 'Useful tools for all situations',
        tools_count: '5 tools'
      }
    },
    tools: {
      letter_generator: {
        title: 'Letter Generator',
        description: 'Create compliant administrative letters'
      },
      fee_calculator: {
        title: 'Fee Calculator',
        description: 'Estimate the costs of your procedures'
      },
      budget_calculator: {
        title: 'Housing Budget Calculator',
        description: 'Calculate your optimal housing budget'
      },
      cv_translator: {
        title: 'CV Translator',
        description: 'Adapt your CV to French standards'
      },
      motivation_letter: {
        title: 'Motivation Letters',
        description: 'Generate compelling motivation letters'
      },
      social_security: {
        title: 'Social Security Guide',
        description: 'Understand the French healthcare system'
      },
      social_services: {
        title: 'Social Services',
        description: 'Find social assistance near you'
      },
      family_allowances: {
        title: 'Family Allowances',
        description: 'Calculate your family assistance rights'
      },
      education_costs: {
        title: 'School Fees',
        description: 'Budget schooling costs'
      },
      culture_quiz: {
        title: 'French Culture Quiz',
        description: 'Test your cultural knowledge'
      },
      traditions_guide: {
        title: 'Traditions Guide',
        description: 'Discover French holidays and traditions'
      },
      french_learning: {
        title: 'French Assistant',
        description: 'Improve your French progressively'
      },
      naturalization_test: {
        title: 'Naturalization Test',
        description: 'Prepare your naturalization interview'
      },
      expressions_translator: {
        title: 'French Expressions',
        description: 'Master idiomatic expressions'
      },
      emergency_assistant: {
        title: 'Emergency Assistant',
        description: 'Emergency numbers and procedures'
      },
      planning_generator: {
        title: 'Planning Generator',
        description: 'Organize your procedures efficiently'
      },
      budget_assistant: {
        title: 'Family Budget Assistant',
        description: 'Manage your family budget'
      },
      rights_guide: {
        title: 'Rights & Appeals Guide',
        description: 'Know your rights and appeals'
      }
    },
    user: {
      my_account: 'My Account',
      profile: 'Profile',
      profile_desc: 'Manage your personal information',
      settings: 'Settings',
      settings_desc: 'Configure the application',
      refresh: 'Refresh',
      refresh_desc: 'Reload the application',
      export: 'Export',
      export_desc: 'Save your data',
      import: 'Import',
      import_desc: 'Restore your data',
      help: 'Help',
      help_desc: 'Get help',
      logout: 'Logout',
      logout_desc: 'Sign out of the application'
    },
    emergency: {
      title: 'Emergency Assistant',
      description: 'Emergency numbers and advice to react effectively',
      samu: 'SAMU',
      samu_desc: 'Medical emergencies, person rescue',
      samu_when: 'Medical emergency, discomfort, serious accident',
      pompiers: 'Fire Department',
      pompiers_desc: 'Fires, accidents, rescue',
      pompiers_when: 'Fire, accident, person in danger',
      police: 'Police',
      police_desc: 'Security emergencies, crimes',
      police_when: 'Crime, theft, assault, public order disturbance',
      european: 'European Number',
      european_desc: 'Unified European emergency number',
      european_when: 'Any emergency from a mobile phone',
      social: 'Social Emergency',
      social_desc: 'Emergency accommodation, social assistance',
      social_when: 'Homeless, social distress',
      call: 'Call',
      info: 'Info',
      hide: 'Hide',
      advice_title: 'Advice before calling:',
      advice_1: 'Stay calm and speak clearly',
      advice_2: 'Give your precise location',
      advice_3: 'Describe the situation without hanging up',
      advice_4: 'Follow the given instructions',
      vital_title: 'Vital Information',
      vital_desc: 'In case of life-threatening emergency, immediately call 15 (SAMU) or 112. Don\'t waste time looking for the right number.'
    }
  },
  es: {
    common: {
      back: 'Atrás',
      next: 'Siguiente',
      previous: 'Anterior',
      submit: 'Enviar',
      cancel: 'Cancelar',
      save: 'Guardar',
      delete: 'Eliminar',
      edit: 'Editar',
      add: 'Añadir',
      search: 'Buscar',
      filter: 'Filtrar',
      export: 'Exportar',
      import: 'Importar',
      download: 'Descargar',
      upload: 'Subir',
      copy: 'Copiar',
      print: 'Imprimir',
      close: 'Cerrar',
      open: 'Abrir',
      yes: 'Sí',
      no: 'No',
      ok: 'OK',
      error: 'Error',
      success: 'Éxito',
      loading: 'Cargando...',
      more: 'Más',
      less: 'Menos',
      all: 'Todos',
      none: 'Ninguno',
      total: 'Total',
      free: 'Gratis'
    },
    home: {
      title: 'Integración Francia',
      subtitle: '50 herramientas gratuitas para tu integración en Francia',
      description: 'Un conjunto completo de herramientas para facilitar tus trámites administrativos, vivienda, empleo e integración cultural en Francia.',
      get_started: 'Comenzar',
      explore_tools: 'Explorar Herramientas',
      total_tools: 'herramientas disponibles',
      categories: 'categorías'
    },
    modules: {
      admin: {
        title: 'Trámites Administrativos',
        description: 'Herramientas para tus formalidades y procedimientos oficiales',
        tools_count: '12 herramientas'
      },
      logement: {
        title: 'Vivienda y Vida Cotidiana',
        description: 'Encuentra y gestiona tu vivienda en Francia',
        tools_count: '8 herramientas'
      },
      emploi: {
        title: 'Empleo y Formación',
        description: 'Búsqueda de empleo y desarrollo profesional',
        tools_count: '8 herramientas'
      },
      sante: {
        title: 'Salud y Social',
        description: 'Acceso a la salud y asistencia social',
        tools_count: '6 herramientas'
      },
      education: {
        title: 'Educación y Familia',
        description: 'Escolarización y asistencia familiar',
        tools_count: '6 herramientas'
      },
      culture: {
        title: 'Integración Cultural',
        description: 'Aprende la cultura y el idioma francés',
        tools_count: '5 herramientas'
      },
      transversal: {
        title: 'Herramientas Universales',
        description: 'Herramientas útiles para todas las situaciones',
        tools_count: '5 herramientas'
      }
    },
    tools: {
      letter_generator: {
        title: 'Generador de Cartas',
        description: 'Crea cartas administrativas conformes'
      },
      fee_calculator: {
        title: 'Calculadora de Tarifas',
        description: 'Estima los costos de tus trámites'
      },
      budget_calculator: {
        title: 'Calculadora Presupuesto Vivienda',
        description: 'Calcula tu presupuesto óptimo de vivienda'
      },
      cv_translator: {
        title: 'Traductor de CV',
        description: 'Adapta tu CV a los estándares franceses'
      },
      motivation_letter: {
        title: 'Cartas de Motivación',
        description: 'Genera cartas de motivación convincentes'
      },
      social_security: {
        title: 'Guía Seguridad Social',
        description: 'Entiende el sistema de salud francés'
      },
      social_services: {
        title: 'Servicios Sociales',
        description: 'Encuentra asistencia social cerca de ti'
      },
      family_allowances: {
        title: 'Subsidios Familiares',
        description: 'Calcula tus derechos de asistencia familiar'
      },
      education_costs: {
        title: 'Gastos Escolares',
        description: 'Presupuesta los costos de escolarización'
      },
      culture_quiz: {
        title: 'Quiz Cultura Francesa',
        description: 'Pon a prueba tu conocimiento cultural'
      },
      traditions_guide: {
        title: 'Guía de Tradiciones',
        description: 'Descubre las fiestas y tradiciones francesas'
      },
      french_learning: {
        title: 'Asistente de Francés',
        description: 'Mejora tu francés progresivamente'
      },
      naturalization_test: {
        title: 'Test de Naturalización',
        description: 'Prepara tu entrevista de naturalización'
      },
      expressions_translator: {
        title: 'Expresiones Francesas',
        description: 'Domina las expresiones idiomáticas'
      },
      emergency_assistant: {
        title: 'Asistente de Emergencias',
        description: 'Números de emergencia y procedimientos'
      },
      planning_generator: {
        title: 'Generador de Planificación',
        description: 'Organiza tus trámites eficientemente'
      },
      budget_assistant: {
        title: 'Asistente Presupuesto Familiar',
        description: 'Gestiona tu presupuesto familiar'
      },
      rights_guide: {
        title: 'Guía Derechos y Recursos',
        description: 'Conoce tus derechos y recursos'
      }
    },
    user: {
      my_account: 'Mi Cuenta',
      profile: 'Perfil',
      profile_desc: 'Gestionar tu información personal',
      settings: 'Configuración',
      settings_desc: 'Configurar la aplicación',
      refresh: 'Actualizar',
      refresh_desc: 'Recargar la aplicación',
      export: 'Exportar',
      export_desc: 'Guardar tus datos',
      import: 'Importar',
      import_desc: 'Restaurar tus datos',
      help: 'Ayuda',
      help_desc: 'Obtener ayuda',
      logout: 'Cerrar Sesión',
      logout_desc: 'Cerrar sesión de la aplicación'
    },
    emergency: {
      title: 'Asistente de Emergencias',
      description: 'Números de emergencia y consejos para reaccionar eficazmente',
      samu: 'SAMU',
      samu_desc: 'Emergencias médicas, rescate de personas',
      samu_when: 'Emergencia médica, malestar, accidente grave',
      pompiers: 'Bomberos',
      pompiers_desc: 'Incendios, accidentes, rescate',
      pompiers_when: 'Incendio, accidente, persona en peligro',
      police: 'Policía',
      police_desc: 'Emergencias de seguridad, crímenes',
      police_when: 'Crimen, robo, agresión, alteración del orden público',
      european: 'Número Europeo',
      european_desc: 'Número de emergencia europeo unificado',
      european_when: 'Cualquier emergencia desde un móvil',
      social: 'Emergencia Social',
      social_desc: 'Alojamiento de emergencia, asistencia social',
      social_when: 'Sin hogar, angustia social',
      call: 'Llamar',
      info: 'Info',
      hide: 'Ocultar',
      advice_title: 'Consejos antes de llamar:',
      advice_1: 'Mantén la calma y habla claramente',
      advice_2: 'Da tu ubicación precisa',
      advice_3: 'Describe la situación sin colgar',
      advice_4: 'Sigue las instrucciones dadas',
      vital_title: 'Información Vital',
      vital_desc: 'En caso de emergencia vital, llama inmediatamente al 15 (SAMU) o al 112. No pierdas tiempo buscando el número correcto.'
    }
  },
  ar: {
    common: {
      back: 'العودة',
      next: 'التالي',
      previous: 'السابق',
      submit: 'إرسال',
      cancel: 'إلغاء',
      save: 'حفظ',
      delete: 'حذف',
      edit: 'تعديل',
      add: 'إضافة',
      search: 'بحث',
      filter: 'تصفية',
      export: 'تصدير',
      import: 'استيراد',
      download: 'تحميل',
      upload: 'رفع',
      copy: 'نسخ',
      print: 'طباعة',
      close: 'إغلاق',
      open: 'فتح',
      yes: 'نعم',
      no: 'لا',
      ok: 'موافق',
      error: 'خطأ',
      success: 'نجح',
      loading: 'جارٍ التحميل...',
      more: 'المزيد',
      less: 'أقل',
      all: 'الكل',
      none: 'لا شيء',
      total: 'المجموع',
      free: 'مجاني'
    },
    home: {
      title: 'الاندماج في فرنسا',
      subtitle: '50 أداة مجانية للاندماج في فرنسا',
      description: 'مجموعة كاملة من الأدوات لتسهيل إجراءاتك الإدارية والسكن والعمل والاندماج الثقافي في فرنسا.',
      get_started: 'ابدأ',
      explore_tools: 'استكشف الأدوات',
      total_tools: 'أداة متاحة',
      categories: 'فئات'
    },
    modules: {
      admin: {
        title: 'الإجراءات الإدارية',
        description: 'أدوات للشكليات والإجراءات الرسمية',
        tools_count: '12 أداة'
      },
      logement: {
        title: 'السكن والحياة اليومية',
        description: 'العثور على السكن وإدارته في فرنسا',
        tools_count: '8 أدوات'
      },
      emploi: {
        title: 'العمل والتدريب',
        description: 'البحث عن عمل والتطوير المهني',
        tools_count: '8 أدوات'
      },
      sante: {
        title: 'الصحة والاجتماعية',
        description: 'الوصول إلى الرعاية الصحية والمساعدة الاجتماعية',
        tools_count: '6 أدوات'
      },
      education: {
        title: 'التعليم والعائلة',
        description: 'التعليم والمساعدة العائلية',
        tools_count: '6 أدوات'
      },
      culture: {
        title: 'الاندماج الثقافي',
        description: 'تعلم الثقافة واللغة الفرنسية',
        tools_count: '5 أدوات'
      },
      transversal: {
        title: 'الأدوات الشاملة',
        description: 'أدوات مفيدة لجميع الحالات',
        tools_count: '5 أدوات'
      }
    },
    tools: {
      letter_generator: {
        title: 'مولد الرسائل',
        description: 'إنشاء رسائل إدارية متوافقة'
      },
      fee_calculator: {
        title: 'حاسبة الرسوم',
        description: 'تقديرتكاليف إجراءاتك'
      },
      budget_calculator: {
        title: 'حاسبة ميزانية السكن',
        description: 'احسب ميزانية السكن المثلى'
      },
      cv_translator: {
        title: 'مترجم السيرة الذاتية',
        description: 'تكييف سيرتك الذاتية مع المعايير الفرنسية'
      },
      motivation_letter: {
        title: 'رسائل الدافع',
        description: 'إنشاء رسائل دافع مقنعة'
      },
      social_security: {
        title: 'دليل الضمان الاجتماعي',
        description: 'فهم نظام الرعاية الصحية الفرنسي'
      },
      social_services: {
        title: 'الخدمات الاجتماعية',
        description: 'العثور على المساعدة الاجتماعية بالقرب منك'
      },
      family_allowances: {
        title: 'البدلات العائلية',
        description: 'احسب حقوق المساعدة العائلية'
      },
      education_costs: {
        title: 'رسوم المدرسة',
        description: 'وضع ميزانية لتكاليف التعليم'
      },
      culture_quiz: {
        title: 'اختبار الثقافة الفرنسية',
        description: 'اختبر معرفتك الثقافية'
      },
      traditions_guide: {
        title: 'دليل التقاليد',
        description: 'اكتشف الأعياد والتقاليد الفرنسية'
      },
      french_learning: {
        title: 'مساعد الفر نسية',
        description: 'تحسين الفرنسية تدريجياً'
      },
      naturalization_test: {
        title: 'اختبار التجنس',
        description: 'تحضير مقابلة التجنس'
      },
      expressions_translator: {
        title: 'التعبيرات الفرنسية',
        description: 'إتقان التعبيرات الاصطلاحية'
      },
      emergency_assistant: {
        title: 'مساعد الطوارئ',
        description: 'أرقام الطوارئ والإجراءات'
      },
      planning_generator: {
        title: 'مولد التخطيط',
        description: 'تنظيم إجراءاتك بكفاءة'
      },
      budget_assistant: {
        title: 'مساعد الميزانية العائلية',
        description: 'إدارة ميزانيتك العائلية'
      },
      rights_guide: {
        title: 'دليل الحقوق والاستئناف',
        description: 'تعرف على حقوقك والاستئناف'
      }
    },
    user: {
      my_account: 'حسابي',
      profile: 'الملف الشخصي',
      profile_desc: 'إدارة معلوماتك الشخصية',
      settings: 'الإعدادات',
      settings_desc: 'تكوين التطبيق',
      refresh: 'تحديث',
      refresh_desc: 'إعادة تحميل التطبيق',
      export: 'تصدير',
      export_desc: 'حفظ بياناتك',
      import: 'استيراد',
      import_desc: 'استعادة بياناتك',
      help: 'مساعدة',
      help_desc: 'الحصول على المساعدة',
      logout: 'تسجيل الخروج',
      logout_desc: 'تسجيل الخروج من التطبيق'
    },
    emergency: {
      title: 'مساعد الطوارئ',
      description: 'أرقام الطوارئ ونصائح للتفاعل بفعالية',
      samu: 'سامو',
      samu_desc: 'حالات الطوارئ الطبية، إنقاذ الأشخاص',
      samu_when: 'طوارئ طبية، إعياء، حادث خطير',
      pompiers: 'رجال الإطفاء',
      pompiers_desc: 'حرائق، حوادث، إنقاذ',
      pompiers_when: 'حريق، حادث، شخص في خطر',
      police: 'الشرطة',
      police_desc: 'حالات طوارئ أمنية، جرائم',
      police_when: 'جريمة، سرقة، اعتداء، اضطراب النظام العام',
      european: 'الرقم الأوروبي',
      european_desc: 'رقم الطوارئ الأوروبي الموحد',
      european_when: 'أي طارئ من الهاتف المحمول',
      social: 'الطوارئ الاجتماعية',
      social_desc: 'إسكان طارئ، مساعدة اجتماعية',
      social_when: 'بلا مأوى، ضائقة اجتماعية',
      call: 'اتصال',
      info: 'معلومات',
      hide: 'إخفاء',
      advice_title: 'نصائح قبل الاتصال:',
      advice_1: 'ابق هادئاً وتحدث بوضوح',
      advice_2: 'أعط موقعك الدقيق',
      advice_3: 'صف الحالة دون إغلاق الخط',
      advice_4: 'اتبع التعليمات المعطاة',
      vital_title: 'معلومات حيوية',
      vital_desc: 'في حالة طوارئ مهددة للحياة، اتصل فوراً بـ 15 (سامو) أو 112. لا تضيع وقتاً في البحث عن الرقم الصحيح.'
    }
  },
  zh: {
    common: {
      back: '返回',
      next: '下一步',
      previous: '上一步',
      submit: '提交',
      cancel: '取消',
      save: '保存',
      delete: '删除',
      edit: '编辑',
      add: '添加',
      search: '搜索',
      filter: '筛选',
      export: '导出',
      import: '导入',
      download: '下载',
      upload: '上传',
      copy: '复制',
      print: '打印',
      close: '关闭',
      open: '打开',
      yes: '是',
      no: '否',
      ok: '确定',
      error: '错误',
      success: '成功',
      loading: '加载中...',
      more: '更多',
      less: '较少',
      all: '全部',
      none: '无',
      total: '总计',
      free: '免费'
    },
    home: {
      title: '法国融入',
      subtitle: '50个免费工具助您融入法国',
      description: '完整的工具套件，帮助您在法国进行行政手续、住房、就业和文化融入。',
      get_started: '开始',
      explore_tools: '探索工具',
      total_tools: '可用工具',
      categories: '类别'
    },
    modules: {
      admin: {
        title: '行政手续',
        description: '您的正式手续和官方程序工具',
        tools_count: '12个工具'
      },
      logement: {
        title: '住房与日常生活',
        description: '在法国寻找和管理您的住房',
        tools_count: '8个工具'
      },
      emploi: {
        title: '就业与培训',
        description: '求职和职业发展',
        tools_count: '8个工具'
      },
      sante: {
        title: '健康与社会',
        description: '获得医疗保健和社会援助',
        tools_count: '6个工具'
      },
      education: {
        title: '教育与家庭',
        description: '教育和家庭援助',
        tools_count: '6个工具'
      },
      culture: {
        title: '文化融入',
        description: '学习法国文化和语言',
        tools_count: '5个工具'
      },
      transversal: {
        title: '通用工具',
        description: '适用于所有情况的有用工具',
        tools_count: '5个工具'
      }
    },
    tools: {
      letter_generator: {
        title: '信函生成器',
        description: '创建符合规范的行政信函'
      },
      fee_calculator: {
        title: '费用计算器',
        description: '估算您的手续费用'
      },
      budget_calculator: {
        title: '住房预算计算器',
        description: '计算您的最佳住房预算'
      },
      cv_translator: {
        title: '简历翻译器',
        description: '将您的简历适应法国标准'
      },
      motivation_letter: {
        title: '动机信',
        description: '生成有说服力的动机信'
      },
      social_security: {
        title: '社会保障指南',
        description: '了解法国医疗保健系统'
      },
      social_services: {
        title: '社会服务',
        description: '找到您附近的社会援助'
      },
      family_allowances: {
        title: '家庭补贴',
        description: '计算您的家庭援助权利'
      },
      education_costs: {
        title: '学费',
        description: '预算教育费用'
      },
      culture_quiz: {
        title: '法国文化测验',
        description: '测试您的文化知识'
      },
      traditions_guide: {
        title: '传统指南',
        description: '发现法国节日和传统'
      },
      french_learning: {
        title: '法语助手',
        description: '循序渐进提高您的法语'
      },
      naturalization_test: {
        title: '归化测试',
        description: '准备您的归化面试'
      },
      expressions_translator: {
        title: '法语表达',
        description: '掌握习语表达'
      },
      emergency_assistant: {
        title: '紧急助手',
        description: '紧急号码和程序'
      },
      planning_generator: {
        title: '规划生成器',
        description: '高效组织您的手续'
      },
      budget_assistant: {
        title: '家庭预算助手',
        description: '管理您的家庭预算'
      },
      rights_guide: {
        title: '权利与申诉指南',
        description: '了解您的权利和申诉'
      }
    },
    user: {
      my_account: '我的账户',
      profile: '个人资料',
      profile_desc: '管理您的个人信息',
      settings: '设置',
      settings_desc: '配置应用程序',
      refresh: '刷新',
      refresh_desc: '重新加载应用程序',
      export: '导出',
      export_desc: '保存您的数据',
      import: '导入',
      import_desc: '恢复您的数据',
      help: '帮助',
      help_desc: '获得帮助',
      logout: '登出',
      logout_desc: '退出应用程序'
    },
    emergency: {
      title: '紧急助手',
      description: '紧急号码和有效应对建议',
      samu: 'SAMU',
      samu_desc: '医疗紧急情况，人员救援',
      samu_when: '医疗紧急情况，不适，严重事故',
      pompiers: '消防队',
      pompiers_desc: '火灾，事故，救援',
      pompiers_when: '火灾，事故，人员危险',
      police: '警察',
      police_desc: '安全紧急情况，犯罪',
      police_when: '犯罪，盗窃，袭击，公共秩序扰乱',
      european: '欧洲号码',
      european_desc: '统一的欧洲紧急号码',
      european_when: '来自手机的任何紧急情况',
      social: '社会紧急情况',
      social_desc: '紧急住宿，社会援助',
      social_when: '无家可归，社会困扰',
      call: '呼叫',
      info: '信息',
      hide: '隐藏',
      advice_title: '呼叫前的建议：',
      advice_1: '保持冷静，说话清楚',
      advice_2: '提供您的精确位置',
      advice_3: '描述情况，不要挂断',
      advice_4: '按照给出的指示',
      vital_title: '重要信息',
      vital_desc: '在生命危险的紧急情况下，立即拨打15（SAMU）或112。不要浪费时间寻找正确的号码。'
    }
  }
};

class I18nService {
  private currentLanguage: Language = 'fr';
  private translations: Translations = translations;

  constructor() {
    // Récupérer la langue sauvegardée ou utiliser la langue du navigateur
    const savedLanguage = localStorage.getItem('language') as Language;
    const browserLanguage = navigator.language.split('-')[0] as Language;
    
    if (savedLanguage && this.isValidLanguage(savedLanguage)) {
      this.currentLanguage = savedLanguage;
    } else if (this.isValidLanguage(browserLanguage)) {
      this.currentLanguage = browserLanguage;
    }
  }

  private isValidLanguage(lang: string): lang is Language {
    return ['fr', 'en', 'es', 'ar', 'zh'].includes(lang);
  }

  setLanguage(languageCode: string): void {
    if (this.isValidLanguage(languageCode)) {
      this.currentLanguage = languageCode;
      localStorage.setItem('language', languageCode);
      
      // Émettre un événement pour notifier les composants
      window.dispatchEvent(new CustomEvent('languageChanged', {
        detail: { language: languageCode }
      }));
    }
  }

  getCurrentLanguage(): Language {
    return this.currentLanguage;
  }

  getSupportedLanguages(): Array<{code: Language, name: string, nativeName: string, flag: string}> {
    return [
      { code: 'fr', name: 'Français', nativeName: 'Français', flag: '🇫🇷' },
      { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
      { code: 'es', name: 'Español', nativeName: 'Español', flag: '🇪🇸' },
      { code: 'ar', name: 'العربية', nativeName: 'العربية', flag: '🇸🇦' },
      { code: 'zh', name: '中文', nativeName: '中文', flag: '🇨🇳' }
    ];
  }

  t(key: string, params?: Record<string, any>): string {
    const keys = key.split('.');
    let value: any = this.translations[this.currentLanguage];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback vers le français si la clé n'existe pas
        value = this.translations.fr;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Retourner la clé si aucune traduction n'est trouvée
          }
        }
        break;
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    // Remplacer les paramètres dans la chaîne
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey] || match;
      });
    }

    return value;
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

  formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat(this.currentLanguage, options).format(value);
  }
}

export const i18n = new I18nService();
