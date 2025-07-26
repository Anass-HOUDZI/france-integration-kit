
/**
 * Index des traductions - Point d'entrée pour toutes les langues
 */
import { frTranslations } from './fr';
import { enTranslations } from './en';
import { arTranslations } from './ar';
import { esTranslations } from './es';
import { itTranslations } from './it';
import { deTranslations } from './de';
import type { Translations } from '../types';

export const ALL_TRANSLATIONS: Record<string, Translations> = {
  fr: frTranslations,
  en: enTranslations,
  ar: arTranslations,
  es: esTranslations,
  it: itTranslations,
  de: deTranslations,
};

export {
  frTranslations,
  enTranslations,
  arTranslations,
};
