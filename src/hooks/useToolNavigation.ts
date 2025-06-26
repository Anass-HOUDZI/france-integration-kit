
import { useState, useCallback } from 'react';

export type View = 
  | 'home'
  | 'admin'
  | 'logement'
  | 'emploi'
  | 'sante'
  | 'education'
  | 'culture'
  | 'transversal'
  | 'letter-generator'
  | 'fee-calculator'
  | 'receipt-generator'
  | 'delay-simulator'
  | 'budget-calculator'
  | 'cv-translator'
  | 'social-security-guide'
  | 'social-services-locator'
  | 'family-allowances-calculator'
  | 'education-costs-calculator'
  | 'culture-quiz'
  | 'traditions-guide'
  | 'french-learning-assistant'
  | 'naturalization-simulator'
  | 'french-expressions-translator'
  | 'emergency-assistant'
  | 'planning-generator'
  | 'family-budget-assistant'
  | 'rights-guide';

export function useToolNavigation() {
  const [currentView, setCurrentView] = useState<View>('home');

  const navigateToTool = useCallback((toolId: string) => {
    setCurrentView(toolId as View);
  }, []);

  const navigateHome = useCallback(() => {
    setCurrentView('home');
  }, []);

  return {
    currentView,
    navigateToTool,
    navigateHome
  };
}
