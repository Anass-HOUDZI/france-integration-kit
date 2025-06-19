
/**
 * Index des traductions
 */
import { frTranslations } from './fr';
import { enTranslations } from './en';
import { Translations } from '../types';

// Traductions simplifiées pour les autres langues (à compléter)
const esTranslations: Translations = {
  'nav.home': 'Inicio',
  'home.title': 'Herramientas de Integración',
  'home.subtitle': 'para Francia',
  'category.admin': 'Procedimientos Administrativos',
  // ... autres traductions de base
};

const arTranslations: Translations = {
  'nav.home': 'الرئيسية',
  'home.title': 'أدوات الاندماج',
  'home.subtitle': 'في فرنسا',
  'category.admin': 'الإجراءات الإدارية',
  // ... autres traductions de base
};

const zhTranslations: Translations = {
  'nav.home': '首页',
  'home.title': '融入工具',
  'home.subtitle': '法国',
  'category.admin': '行政程序',
  // ... autres traductions de base
};

export const ALL_TRANSLATIONS: Record<string, Translations> = {
  fr: frTranslations,
  en: enTranslations,
  es: esTranslations,
  ar: arTranslations,
  zh: zhTranslations,
};
