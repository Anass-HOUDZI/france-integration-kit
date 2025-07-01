
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
  | 'childcare_assistant'
  | 'state-of-play'
  | 'rent-negotiator'
  | 'insurance-assistant'
  | 'moving-planner'
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
  | 'diploma_equivalence'
  | 'training_guide'
  | 'portfolio_creator';

export function useToolNavigation() {
  const [currentView, setCurrentView] = useState<View>('home');

  const navigateToTool = useCallback((toolId: string) => {
    // Si c'est une catégorie, naviguer vers la page de catégorie
    const categoryViews = ['admin', 'logement', 'emploi', 'sante', 'education', 'culture', 'transversal'];
    
    if (categoryViews.includes(toolId)) {
      setCurrentView(toolId as View);
    } else if (isValidView(toolId)) {
      // Si c'est un outil spécifique, naviguer directement
      setCurrentView(toolId as View);
    } else {
      console.warn(`Vue non trouvée: ${toolId}`);
      setCurrentView(toolId as View);
    }
  }, []);

  const navigateHome = useCallback(() => {
    setCurrentView('home');
  }, []);

  const navigateToModule = useCallback((moduleId: string) => {
    if (isValidView(moduleId)) {
      setCurrentView(moduleId as View);
    }
  }, []);

  return {
    currentView,
    navigateToTool,
    navigateHome,
    navigateToModule,
    setCurrentView
  };
}

// Fonction utilitaire pour vérifier si une vue est valide
function isValidView(view: string): view is View {
  const validViews = [
    'home', 'admin', 'logement', 'emploi', 'sante', 'education', 'culture', 'transversal',
    'letter-generator', 'fee-calculator', 'receipt-generator', 'delay-simulator',
    'budget-calculator', 'childcare_assistant', 'state-of-play', 'rent-negotiator', 
    'insurance-assistant', 'moving-planner', 'cv-translator', 'social-security-guide', 
    'social-services-locator', 'family-allowances-calculator', 'education-costs-calculator', 
    'culture-quiz', 'traditions-guide', 'french-learning-assistant', 'naturalization-simulator',
    'french-expressions-translator', 'emergency-assistant', 'planning-generator',
    'family-budget-assistant', 'rights-guide', 'medical-translator', 'cv_translator',
    'salaryCalculator', 'unemploymentSimulator', 'motivation_letter', 'interview_assistant',
    'diploma_equivalence', 'training_guide', 'portfolio_creator'
  ];
  
  return validViews.includes(view as View);
}
