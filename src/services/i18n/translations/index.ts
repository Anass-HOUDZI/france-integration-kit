
/**
 * Index des traductions - Point d'entrée pour toutes les langues
 */
import { frTranslations } from './fr';
import { enTranslations } from './en';
import { arTranslations } from './ar';
import type { Translations } from '../types';

export const ALL_TRANSLATIONS: Record<string, Translations> = {
  en: enTranslations,
  fr: frTranslations,
  ar: arTranslations,
};

export {
  frTranslations,
  enTranslations,
  arTranslations,
};
