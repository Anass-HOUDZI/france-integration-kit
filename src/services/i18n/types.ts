
/**
 * Types pour le système d'internationalisation
 */

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷'
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧'
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸'
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪'
  },
  {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹'
  }
];

export interface Translations {
  [key: string]: string;
}
