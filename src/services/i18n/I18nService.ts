
/**
 * Service d'internationalisation refactorisé
 */
import { SUPPORTED_LANGUAGES, type Language, type Translations } from './types';
import { ALL_TRANSLATIONS } from './translations';

export class I18nService {
  private currentLanguage: string = 'fr'; // Français par défaut
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

    // Appliquer la direction RTL/LTR
    this.applyLanguageDirection();
  }

  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  getCurrentLanguageInfo(): Language | undefined {
    return SUPPORTED_LANGUAGES.find(lang => lang.code === this.currentLanguage);
  }

  getSupportedLanguages(): Language[] {
    return SUPPORTED_LANGUAGES;
  }

  setLanguage(languageCode: string): void {
    if (SUPPORTED_LANGUAGES.some(lang => lang.code === languageCode)) {
      this.currentLanguage = languageCode;
      localStorage.setItem('user_language', languageCode);
      
      // Appliquer la direction RTL/LTR
      this.applyLanguageDirection();
      
      // Déclencher un événement pour mettre à jour l'interface
      window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language: languageCode } 
      }));
    }
  }

  private applyLanguageDirection(): void {
    const currentLangInfo = this.getCurrentLanguageInfo();
    if (currentLangInfo) {
      document.documentElement.dir = currentLangInfo.direction;
      document.documentElement.lang = currentLangInfo.code;
      
      // Ajouter une classe CSS pour le RTL
      if (currentLangInfo.direction === 'rtl') {
        document.documentElement.classList.add('rtl');
      } else {
        document.documentElement.classList.remove('rtl');
      }
    }
  }

  isRTL(): boolean {
    const currentLangInfo = this.getCurrentLanguageInfo();
    return currentLangInfo?.direction === 'rtl';
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
    const currentTranslations = ALL_TRANSLATIONS[this.currentLanguage];
    const fallbackTranslations = ALL_TRANSLATIONS[this.fallbackLanguage];
    
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
