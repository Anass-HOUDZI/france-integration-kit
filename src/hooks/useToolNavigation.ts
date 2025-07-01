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

// Mapping des outils vers leurs modules
const TOOL_TO_MODULE_MAP: Record<string, View> = {
  // Outils administratifs
  'letter-generator': 'admin',
  'fee-calculator': 'admin',
  'receipt-generator': 'admin',
  'delay-simulator': 'admin',
  
  // Outils logement
  'budget-calculator': 'logement',
  'childcare_assistant': 'logement', // Ajout de l'Assistant Garde d'Enfants
  
  // Outils emploi
  'cv-translator': 'emploi',
  'cv_translator': 'emploi',
  'salaryCalculator': 'emploi',
  'unemploymentSimulator': 'emploi',
  'motivation_letter': 'emploi',
  'interview_assistant': 'emploi',
  'diploma_equivalence': 'emploi',
  
  // Outils santé
  'social-security-guide': 'sante',
  'social-services-locator': 'sante',
  'medical-translator': 'sante',
  
  // Outils éducation
  'family-allowances-calculator': 'education',
  'education-costs-calculator': 'education',
  
  // Outils culture
  'culture-quiz': 'culture',
  'traditions-guide': 'culture',
  'french-learning-assistant': 'culture',
  'naturalization-simulator': 'culture',
  'french-expressions-translator': 'culture',
  
  // Outils transversaux
  'emergency-assistant': 'transversal',
  'planning-generator': 'transversal',
  'family-budget-assistant': 'transversal',
  'rights-guide': 'transversal'
};

export function useToolNavigation() {
  const [currentView, setCurrentView] = useState<View>('home');

  const navigateToTool = useCallback((toolId: string) => {
    // Vérifier si l'outil existe dans le mapping
    const moduleView = TOOL_TO_MODULE_MAP[toolId];
    
    if (moduleView) {
      // Si l'outil appartient à un module, naviguer vers ce module
      setCurrentView(moduleView);
    } else if (isValidView(toolId)) {
      // Si c'est une vue directe valide, naviguer directement
      setCurrentView(toolId as View);
    } else {
      // Par défaut, essayer de naviguer vers l'outil directement
      console.warn(`Outil non trouvé dans le mapping: ${toolId}`);
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
    'budget-calculator', 'childcare_assistant', 'cv-translator', 'social-security-guide', 'social-services-locator',
    'family-allowances-calculator', 'education-costs-calculator', 'culture-quiz',
    'traditions-guide', 'french-learning-assistant', 'naturalization-simulator',
    'french-expressions-translator', 'emergency-assistant', 'planning-generator',
    'family-budget-assistant', 'rights-guide', 'medical-translator', 'cv_translator',
    'salaryCalculator', 'unemploymentSimulator', 'motivation_letter', 'interview_assistant',
    'diploma_equivalence'
  ];
  
  return validViews.includes(view as View);
}
