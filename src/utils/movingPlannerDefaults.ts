
import { MovingTask, ServiceProvider, AddressChange, MovingPlan } from '@/types/movingPlanner';

export const generateDefaultTasks = (planData: Partial<MovingPlan>): MovingTask[] => {
  const movingDate = new Date(planData.movingDate || Date.now());
  
  const baseTasks = [
    {
      title: 'Rechercher et réserver déménageurs',
      description: 'Comparer les devis et choisir une entreprise',
      category: 'Déménageurs',
      dueDate: new Date(movingDate.getTime() - 56 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'high' as const,
      estimatedCost: 800
    },
    {
      title: 'Commander cartons et matériel',
      description: 'Papier bulle, adhésif, étiquettes',
      category: 'Matériel',
      dueDate: new Date(movingDate.getTime() - 42 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'high' as const,
      estimatedCost: 150
    },
    {
      title: 'Résilier contrats actuels',
      description: 'Électricité, gaz, internet, assurances',
      category: 'Administratif',
      dueDate: new Date(movingDate.getTime() - 42 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'high' as const
    },
    {
      title: 'Souscrire contrats nouveau logement',
      description: 'Services essentiels nouveau domicile',
      category: 'Administratif',
      dueDate: new Date(movingDate.getTime() - 35 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'high' as const
    },
    {
      title: 'Faire état des lieux sortant',
      description: 'Avec propriétaire ou agent',
      category: 'Logement',
      dueDate: new Date(movingDate.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'high' as const
    }
  ];

  // Ajout tâches spécifiques selon profil
  if (planData.hasKids) {
    baseTasks.push({
      title: 'Inscrire enfants nouvelle école',
      description: 'Transfert dossiers scolaires',
      category: 'Famille',
      dueDate: new Date(movingDate.getTime() - 28 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'high' as const
    });
  }

  if (planData.hasPets) {
    baseTasks.push({
      title: 'Organiser transport animaux',
      description: 'Cage de transport, documents vétérinaires',
      category: 'Animaux',
      dueDate: new Date(movingDate.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'medium' as const
    });
  }

  return baseTasks.map((task, index) => ({
    ...task,
    id: `default-${index}`,
    completed: false
  }));
};

export const generateDefaultProviders = (): ServiceProvider[] => {
  return [
    {
      id: 'mover-1',
      name: 'Déménageurs professionnels',
      type: 'mover',
      contact: 'À contacter',
      status: 'pending',
      estimatedCost: 800
    },
    {
      id: 'utility-1',
      name: 'EDF/Engie',
      type: 'utility',
      contact: 'Service client',
      status: 'pending'
    },
    {
      id: 'internet-1',
      name: 'Fournisseur Internet',
      type: 'internet',
      contact: 'À contacter',
      status: 'pending',
      estimatedCost: 50
    }
  ];
};

export const generateDefaultAddressChanges = (): AddressChange[] => {
  return [
    {
      id: 'caf',
      organization: 'CAF',
      type: 'administrative' as const,
      priority: 'high' as const,
      completed: false,
      contact: 'www.caf.fr'
    },
    {
      id: 'cpam',
      organization: 'CPAM',
      type: 'health' as const,
      priority: 'high' as const,
      completed: false,
      contact: 'www.ameli.fr'
    },
    {
      id: 'pole-emploi',
      organization: 'Pôle Emploi',
      type: 'administrative' as const,  
      priority: 'high' as const,
      completed: false,
      contact: 'www.pole-emploi.fr'
    },
    {
      id: 'impots',
      organization: 'Centre des Impôts',
      type: 'administrative' as const,
      priority: 'high' as const,
      completed: false,
      contact: 'www.impots.gouv.fr'
    },
    {
      id: 'banque',
      organization: 'Banque principale',
      type: 'financial' as const,
      priority: 'high' as const,
      completed: false
    },
    {
      id: 'assurance',
      organization: 'Assurance auto/habitation',
      type: 'financial' as const,
      priority: 'high' as const,
      completed: false
    },
    {
      id: 'mutuelle',
      organization: 'Mutuelle santé',
      type: 'health' as const,
      priority: 'medium' as const,
      completed: false
    },
    {
      id: 'employeur',
      organization: 'Employeur/RH',
      type: 'administrative' as const,
      priority: 'high' as const,
      completed: false
    }
  ];
};
