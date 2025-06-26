
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
  | 'rights-guide'
  | 'medical-translator'
  | 'salary_calculator'
  | 'unemployment_simulator'
  | 'motivation_letter'
  | 'interview_assistant'
  | 'diploma_equivalence';

export function useToolNavigation() {
  const [currentView, setCurrentView] = useState<View>('home');

  const navigateToTool = useCallback((toolId: string) => {
    // Gérer les outils du module emploi
    if (['cv_translator', 'salary_calculator', 'unemployment_simulator', 'motivation_letter', 'interview_assistant', 'diploma_equivalence'].includes(toolId)) {
      setCurrentView('emploi');
    } else {
      setCurrentView(toolId as View);
    }
  }, []);

  const navigateHome = useCallback(() => {
    setCurrentView('home');
  }, []);

  const navigateToModule = useCallback((moduleId: string) => {
    setCurrentView(moduleId as View);
  }, []);

  return {
    currentView,
    navigateToTool,
    navigateHome,
    navigateToModule,
    setCurrentView
  };
}
