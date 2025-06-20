
/**
 * Index des traductions - Point d'entrée pour toutes les langues
 */
import { frTranslations } from './fr';
import { enTranslations } from './en';
import { esTranslations } from './es';
import { deTranslations } from './de';
import { itTranslations } from './it';
import type { Translations } from '../types';

export const ALL_TRANSLATIONS: Record<string, Translations> = {
  fr: frTranslations,
  en: enTranslations,
  es: esTranslations,
  de: deTranslations,
  it: itTranslations,
};

export {
  frTranslations,
  enTranslations,
  esTranslations,
  deTranslations,
  itTranslations,
};
