
/**
 * Hook React pour l'internationalisation
 */
import { useState, useEffect } from 'react';
import { i18n, type Language } from '@/services/i18n';

export function useI18n() {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.getCurrentLanguage());

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  const t = (key: string, params?: Record<string, any>) => i18n.t(key, params);
  
  const setLanguage = (languageCode: string) => {
    i18n.setLanguage(languageCode);
  };

  const formatCurrency = (value: number, currency?: string) => 
    i18n.formatCurrency(value, currency);

  const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions) => 
    i18n.formatDate(date, options);

  const formatNumber = (value: number, options?: Intl.NumberFormatOptions) => 
    i18n.formatNumber(value, options);

  return {
    t,
    currentLanguage,
    setLanguage,
    supportedLanguages: i18n.getSupportedLanguages(),
    formatCurrency,
    formatDate,
    formatNumber
  };
}
