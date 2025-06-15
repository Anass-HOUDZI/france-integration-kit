
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
    
    // Modules
    'modules.admin.title': 'Démarches Administratives',
    'modules.admin.description': 'Outils pour vos démarches officielles',
    'modules.logement.title': 'Logement & Vie Quotidienne',
    'modules.logement.description': 'Trouvez et gérez votre logement',
    'modules.emploi.title': 'Emploi & Formation',
    'modules.emploi.description': 'Outils pour votre recherche d\'emploi',
    
    // Tools
    'tools.letter_generator': 'Générateur de lettres',
    'tools.fee_calculator': 'Calculateur de frais',
    'tools.appointment_planner': 'Planificateur de rendez-vous',
    'tools.budget_calculator': 'Calculateur de budget',
    'tools.rental_dossier': 'Dossier locatif',
    'tools.cv_translator': 'Traducteur de CV',
    'tools.salary_calculator': 'Calculateur de salaire',
    
    // Profile
    'profile.select.title': 'Sélectionnez votre profil',
    'profile.student': 'Étudiant',
    'profile.worker': 'Travailleur',
    'profile.family': 'Famille',
    'profile.jobseeker': 'Demandeur d\'emploi',
    'profile.retiree': 'Retraité',
    
    // Validation
    'validation.required': 'Ce champ est obligatoire',
    'validation.email': 'Adresse email invalide',
    'validation.phone': 'Numéro de téléphone invalide',
    'validation.postal_code': 'Code postal invalide'
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
    
    // Modules
    'modules.admin.title': 'Administrative Procedures',
    'modules.admin.description': 'Tools for your official procedures',
    'modules.logement.title': 'Housing & Daily Life',
    'modules.logement.description': 'Find and manage your accommodation',
    'modules.emploi.title': 'Employment & Training',
    'modules.emploi.description': 'Tools for your job search',
    
    // Tools
    'tools.letter_generator': 'Letter Generator',
    'tools.fee_calculator': 'Fee Calculator',
    'tools.appointment_planner': 'Appointment Planner',
    'tools.budget_calculator': 'Budget Calculator',
    'tools.rental_dossier': 'Rental Dossier',
    'tools.cv_translator': 'CV Translator',
    'tools.salary_calculator': 'Salary Calculator',
    
    // Profile
    'profile.select.title': 'Select your profile',
    'profile.student': 'Student',
    'profile.worker': 'Worker',
    'profile.family': 'Family',
    'profile.jobseeker': 'Job Seeker',
    'profile.retiree': 'Retiree',
    
    // Validation
    'validation.required': 'This field is required',
    'validation.email': 'Invalid email address',
    'validation.phone': 'Invalid phone number',
    'validation.postal_code': 'Invalid postal code'
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
