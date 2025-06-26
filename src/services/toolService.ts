
export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon?: string;
  popular?: boolean;
}

export const TOOLS: Tool[] = [
  {
    id: 'letter-generator',
    name: 'Générateur de Lettres Administratives',
    description: 'Créez des lettres officielles conformes aux standards français',
    category: 'admin',
    popular: true
  },
  {
    id: 'fee-calculator',
    name: 'Calculateur de Frais',
    description: 'Estimez les coûts de vos démarches administratives',
    category: 'admin',
    popular: true
  },
  {
    id: 'receipt-generator',
    name: 'Générateur de Récépissés',
    description: 'Créez et suivez vos récépissés de dépôt',
    category: 'admin'
  },
  {
    id: 'delay-simulator',
    name: 'Simulateur de Délais',
    description: 'Estimez les temps de traitement administratifs',
    category: 'admin'
  },
  {
    id: 'budget-calculator',
    name: 'Calculateur de Budget Logement',
    description: 'Estimez votre budget logement par région',
    category: 'logement',
    popular: true
  },
  {
    id: 'cv-translator',
    name: 'Traducteur de CV',
    description: 'Adaptez votre CV aux standards français',
    category: 'emploi',
    popular: true
  },
  {
    id: 'social-security-guide',
    name: 'Guide Sécurité Sociale',
    description: 'Comprenez le système de santé français',
    category: 'sante'
  },
  {
    id: 'culture-quiz',
    name: 'Quiz Culture Française',
    description: 'Testez vos connaissances culturelles',
    category: 'culture',
    popular: true
  }
];

export const getToolsByCategory = (category: string): Tool[] => {
  return TOOLS.filter(tool => tool.category === category);
};

export const getPopularTools = (): Tool[] => {
  return TOOLS.filter(tool => tool.popular);
};

export const getToolById = (id: string): Tool | undefined => {
  return TOOLS.find(tool => tool.id === id);
};
