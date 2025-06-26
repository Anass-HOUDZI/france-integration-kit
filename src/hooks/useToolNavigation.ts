
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
  | 'cv_translator'
  | 'salaryCalculator'
  | 'unemploymentSimulator'
  | 'motivation_letter'
  | 'interview_assistant'
  | 'diploma_equivalence';

export function useToolNavigation() {
  const [currentView, setCurrentView] = useState<View>('home');

  const navigateToTool = useCallback((toolId: string) => {
    // Convertir les anciens IDs vers les nouveaux si nécessaire
    const toolMapping: { [key: string]: string } = {
      'salary_calculator': 'salaryCalculator',
      'unemployment_simulator': 'unemploymentSimulator'
    };
    
    const mappedToolId = toolMapping[toolId] || toolId;
    
    // Outils du module emploi
    const employmentTools = [
      'cv_translator',
      'salaryCalculator', 
      'unemploymentSimulator',
      'motivation_letter',
      'interview_assistant',
      'diploma_equivalence'
    ];
    
    if (employmentTools.includes(mappedToolId)) {
      setCurrentView('emploi');
    } else {
      setCurrentView(mappedToolId as View);
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
