
/**
 * Index des traductions étendues
 */
import { frTranslations } from './fr';
import { enTranslations } from './en';
import { Translations } from '../types';

// Traductions de base pour les autres langues avec les nouvelles clés
const esTranslations: Translations = {
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
  'common.back': 'Volver',
  'common.generate': 'Generar',
  'common.calculate': 'Calcular',
  'common.download': 'Descargar',
  'common.copy': 'Copiar',
  'common.copied': 'Copiado',
  
  // Homepage
  'home.title': 'Herramientas de Integración',
  'home.subtitle': 'para Francia',
  'home.description': 'Una suite completa de herramientas gratuitas para ayudarte en Francia',
  'home.search_placeholder': 'Buscar herramienta...',
  'home.all_categories': 'Todas las categorías',
  
  // Categories
  'category.admin': 'Procedimientos Administrativos',
  'category.logement': 'Vivienda y Vida Diaria',
  'category.emploi': 'Empleo y Formación',
  'category.sante': 'Salud y Social',
  'category.education': 'Educación y Familia',
  'category.culture': 'Integración Cultural',
  'category.transversal': 'Herramientas Transversales',
  
  // Tools principales
  'tool.letter_generator': 'Generador de Cartas Administrativas',
  'tool.budget_calculator': 'Calculadora de Presupuesto de Vivienda',
  'tool.motivation_letter': 'Generador de Cartas de Motivación',
  'tool.culture_quiz': 'Quiz de Cultura Francesa',
  'tool.moving_planner': 'Planificador de Mudanza',
  'tool.neighborhood_comparator': 'Comparador de Barrios',
  'tool.diploma_equivalence': 'Equivalencia de Diplomas Extranjeros',
  
  // Tool sections
  'motivation.title': 'Generador de Cartas de Motivación',
  'budget.title': 'Calculadora de Presupuesto de Vivienda',
  'quiz.title': 'Quiz de Cultura Francesa',
  'moving.title': 'Planificador de Mudanza',
  'neighborhood.title': 'Comparador de Barrios',
  'diploma.title': 'Equivalencia de Diplomas Extranjeros',
  
  // User Menu
  'user.my_account': 'Mi cuenta',
  'user.refresh': 'Actualizar',
  'user.export': 'Exportar datos',
  'user.import': 'Importar datos',
};

const arTranslations: Translations = {
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
  'common.back': 'رجوع',
  'common.generate': 'إنشاء',
  'common.calculate': 'حساب',
  'common.download': 'تحميل',
  'common.copy': 'نسخ',
  'common.copied': 'تم النسخ',
  
  // Homepage
  'home.title': 'أدوات الاندماج',
  'home.subtitle': 'في فرنسا',
  'home.description': 'مجموعة كاملة من الأدوات المجانية لمساعدتك في فرنسا',
  'home.search_placeholder': 'البحث عن أداة...',
  'home.all_categories': 'جميع الفئات',
  
  // Categories
  'category.admin': 'الإجراءات الإدارية',
  'category.logement': 'السكن والحياة اليومية',
  'category.emploi': 'العمل والتدريب',
  'category.sante': 'الصحة والاجتماعية',
  'category.education': 'التعليم والأسرة',
  'category.culture': 'الاندماج الثقافي',
  'category.transversal': 'الأدوات المتقاطعة',
  
  // Tools principales
  'tool.letter_generator': 'مولد الرسائل الإدارية',
  'tool.budget_calculator': 'حاسبة ميزانية السكن',
  'tool.motivation_letter': 'مولد رسائل الدافع',
  'tool.culture_quiz': 'اختبار الثقافة الفرنسية',
  'tool.moving_planner': 'مخطط الانتقال',
  'tool.neighborhood_comparator': 'مقارن الأحياء',
  'tool.diploma_equivalence': 'معادلة الشهادات الأجنبية',
  
  // Tool sections
  'motivation.title': 'مولد رسائل الدافع',
  'budget.title': 'حاسبة ميزانية السكن',
  'quiz.title': 'اختبار الثقافة الفرنسية',
  'moving.title': 'مخطط الانتقال',
  'neighborhood.title': 'مقارن الأحياء',
  'diploma.title': 'معادلة الشهادات الأجنبية',
  
  // User Menu
  'user.my_account': 'حسابي',
  'user.refresh': 'تحديث',
  'user.export': 'تصدير البيانات',
  'user.import': 'استيراد البيانات',
};

const zhTranslations: Translations = {
  // Navigation
  'nav.home': '首页',
  'nav.tools': '工具',
  'nav.profile': '个人资料',
  'nav.help': '帮助',
  
  // Common
  'common.save': '保存',
  'common.cancel': '取消',
  'common.next': '下一个',
  'common.previous': '上一个',
  'common.submit': '提交',
  'common.loading': '加载中...',
  'common.error': '错误',
  'common.success': '成功',
  'common.back': '返回',
  'common.generate': '生成',
  'common.calculate': '计算',
  'common.download': '下载',
  'common.copy': '复制',
  'common.copied': '已复制',
  
  // Homepage
  'home.title': '融入工具',
  'home.subtitle': '法国',
  'home.description': '完整的免费工具套件，帮助您在法国',
  'home.search_placeholder': '搜索工具...',
  'home.all_categories': '所有类别',
  
  // Categories
  'category.admin': '行政程序',
  'category.logement': '住房与日常生活',
  'category.emploi': '就业与培训',
  'category.sante': '健康与社会',
  'category.education': '教育与家庭',
  'category.culture': '文化融合',
  'category.transversal': '横向工具',
  
  // Tools principales
  'tool.letter_generator': '行政信函生成器',
  'tool.budget_calculator': '住房预算计算器',
  'tool.motivation_letter': '动机信生成器',
  'tool.culture_quiz': '法国文化测验',
  'tool.moving_planner': '搬家规划器',
  'tool.neighborhood_comparator': '社区比较器',
  'tool.diploma_equivalence': '外国文凭等效',
  
  // Tool sections
  'motivation.title': '动机信生成器',
  'budget.title': '住房预算计算器',
  'quiz.title': '法国文化测验',
  'moving.title': '搬家规划器',
  'neighborhood.title': '社区比较器',
  'diploma.title': '外国文凭等效',
  
  // User Menu
  'user.my_account': '我的账户',
  'user.refresh': '刷新',
  'user.export': '导出数据',
  'user.import': '导入数据',
};

export const ALL_TRANSLATIONS: Record<string, Translations> = {
  fr: frTranslations,
  en: enTranslations,
  es: esTranslations,
  ar: arTranslations,
  zh: zhTranslations,
};
