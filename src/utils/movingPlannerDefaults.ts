
import { MovingTask, ServiceProvider, AddressChange, MovingPlan } from '@/types/movingPlanner';

export const generateDefaultTasks = (planData: Partial<MovingPlan>): MovingTask[] => {
  const tasks: MovingTask[] = [
    {
      id: '1',
      title: 'Résilier ancien logement',
      description: 'Donner congé au propriétaire (préavis de 3 mois pour location vide, 1 mois meublé)',
      category: 'Administratif',
      dueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      priority: 'high' as const,
      completed: false
    },
    {
      id: '2',
      title: 'Rechercher nouveau logement',
      description: 'Visites, constitution du dossier locatif, négociation',
      category: 'Recherche',
      dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      priority: 'high' as const,
      completed: false
    },
    {
      id: '3',
      title: 'Souscrire assurance habitation',
      description: 'Obligatoire avant remise des clés',
      category: 'Assurance',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      priority: 'high' as const,
      completed: false,
      estimatedCost: 200
    },
    {
      id: '4',
      title: 'Organiser déménagement',
      description: 'Réserver déménageurs ou location camion',
      category: 'Logistique',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      priority: 'high' as const,
      completed: false,
      estimatedCost: 800
    },
    {
      id: '5',
      title: 'État des lieux sortant',
      description: 'Avec le propriétaire ou agence, photos à l\'appui',
      category: 'Administratif',
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      priority: 'medium' as const,
      completed: false
    },
    {
      id: '6',
      title: 'Faire les cartons',
      description: 'Trier, emballer, étiqueter par pièce',
      category: 'Préparation',
      dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      priority: 'medium' as const,
      completed: false,
      estimatedCost: 50
    }
  ];

  // Ajouter des tâches spécifiques selon le profil
  if (planData.hasKids) {
    tasks.push({
      id: '7',
      title: 'Inscrire les enfants dans nouvelle école',
      description: 'Certificat de radiation, inscription, fournitures',
      category: 'Famille',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      priority: 'high' as const,
      completed: false
    });
  }

  if (planData.hasPets) {
    tasks.push({
      id: '8',
      title: 'Préparer transport animaux',
      description: 'Cage de transport, documents vétérinaires, stress',
      category: 'Animaux',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      priority: 'medium' as const,
      completed: false
    });
  }

  return tasks;
};

export const generateDefaultProviders = (): ServiceProvider[] => [
  {
    id: '1',
    name: 'Déménageurs Pros',
    type: 'mover',
    contact: '01 23 45 67 89',
    email: 'contact@demenageurs-pros.fr',
    estimatedCost: 800,
    status: 'pending'
  },
  {
    id: '2',
    name: 'EDF',
    type: 'utility',
    contact: '09 69 32 15 15',
    status: 'pending'
  },
  {
    id: '3',
    name: 'Veolia Eau',
    type: 'utility',
    contact: '09 69 32 35 29',
    status: 'pending'
  },
  {
    id: '4',
    name: 'Orange/SFR/Free',
    type: 'internet',
    contact: 'Service client',
    status: 'pending'
  }
];

export const generateDefaultAddressChanges = (): AddressChange[] => [
  {
    id: '1',
    organization: 'Impôts',
    type: 'administrative',
    priority: 'high',
    completed: false
  },
  {
    id: '2',
    organization: 'CAF',
    type: 'administrative',
    priority: 'high',
    completed: false
  },
  {
    id: '3',
    organization: 'Sécurité Sociale',
    type: 'health',
    priority: 'high',
    completed: false
  },
  {
    id: '4',
    organization: 'Banque',
    type: 'financial',
    priority: 'high',
    completed: false
  },
  {
    id: '5',
    organization: 'Employeur',
    type: 'other',
    priority: 'medium',
    completed: false
  },
  {
    id: '6',
    organization: 'Assurance auto',
    type: 'other',
    priority: 'medium',
    completed: false
  }
];
