
/**
 * English translations index - combines all translation modules
 */
import { commonTranslations } from './common';
import { homepageTranslations } from './homepage';
import { categoriesTranslations } from './categories';
import { toolsTranslations } from './tools';
import { specificToolsTranslations } from './specific-tools';
import { uiStatusTranslations } from './ui-status';
import type { Translations } from '../../types';

export const enTranslations: Translations = {
  ...commonTranslations,
  ...homepageTranslations,
  ...categoriesTranslations,
  ...toolsTranslations,
  ...specificToolsTranslations,
  ...uiStatusTranslations,
};
