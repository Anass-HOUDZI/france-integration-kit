
/**
 * Service d'internationalisation - Point d'entrée principal
 */
import { I18nService } from './i18n/I18nService';
import type { Language } from './i18n/types';

export const i18n = new I18nService();
export type { Language };
