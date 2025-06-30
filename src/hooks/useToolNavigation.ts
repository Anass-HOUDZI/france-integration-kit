
import { useState } from 'react';

export type ViewType = 
  | 'home'
  | 'admin' | 'logement' | 'emploi' | 'sante' | 'education' | 'culture' | 'transversal'
  | 'letter-generator' | 'fee-calculator' | 'receipt-generator' | 'delay-simulator'
  | 'budget-calculator' | 'cv-translator' 
  | 'moving-planner' | 'moving-calculator' | 'state-of-play'
  | 'rental-dossier' | 'neighborhood-comparator' | 'rent-negotiator' | 'insurance-assistant'
  | 'social-security-guide' | 'social-services-locator' | 'family-allowances-calculator'
  | 'education-costs-calculator' | 'culture-quiz' | 'traditions-guide'
  | 'french-learning-assistant' | 'naturalization-simulator' | 'french-expressions-translator'
  | 'emergency-assistant' | 'planning-generator' | 'family-budget-assistant'
  | 'rights-guide' | 'medical-translator';

export const useToolNavigation = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');

  const navigateToTool = (toolId: string) => {
    console.log('Navigating to tool:', toolId);
    setCurrentView(toolId as ViewType);
  };

  const navigateHome = () => {
    setCurrentView('home');
  };

  return {
    currentView,
    navigateToTool,
    navigateHome
  };
};
