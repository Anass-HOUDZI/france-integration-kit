
import { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export interface MovingTask {
  id: string;
  title: string;
  description: string;
  category: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  estimatedCost?: number;
  actualCost?: number;
  notes?: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  type: 'mover' | 'utility' | 'internet' | 'insurance' | 'cleaning' | 'other';
  contact: string;
  email?: string;
  phone?: string;
  estimatedCost?: number;
  actualCost?: number;
  status: 'pending' | 'contacted' | 'booked' | 'completed';
  appointmentDate?: string;
  notes?: string;
}

export interface AddressChange {
  id: string;
  organization: string;
  type: 'administrative' | 'financial' | 'subscription' | 'health' | 'other';
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  dueDate?: string;
  contact?: string;
  notes?: string;
}

export interface MovingPlan {
  id: string;
  movingDate: string;
  oldAddress: string;
  newAddress: string;
  hasKids: boolean;
  hasPets: boolean;
  isLongDistance: boolean;
  householdSize: number;
  budget: number;
  tasks: MovingTask[];
  serviceProviders: ServiceProvider[];
  addressChanges: AddressChange[];
  totalEstimatedCost: number;
  totalActualCost: number;
  createdAt: string;
  updatedAt: string;
}

export const useMovingPlanner = () => {
  const [movingPlan, setMovingPlan] = useLocalStorage<MovingPlan | null>('moving_plan', null);
  const [isLoading, setIsLoading] = useState(false);

  const createMovingPlan = (planData: Partial<MovingPlan>) => {
    const newPlan: MovingPlan = {
      id: Date.now().toString(),
      movingDate: planData.movingDate || '',
      oldAddress: planData.oldAddress || '',
      newAddress: planData.newAddress || '',
      hasKids: planData.hasKids || false,
      hasPets: planData.hasPets || false,
      isLongDistance: planData.isLongDistance || false,
      householdSize: planData.householdSize || 1,
      budget: planData.budget || 0,
      tasks: generateDefaultTasks(planData),
      serviceProviders: generateDefaultProviders(),
      addressChanges: generateDefaultAddressChanges(),
      totalEstimatedCost: 0,
      totalActualCost: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setMovingPlan(newPlan);
    return newPlan;
  };

  const updateTask = (taskId: string, updates: Partial<MovingTask>) => {
    if (!movingPlan) return;

    const updatedTasks = movingPlan.tasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    );

    setMovingPlan({
      ...movingPlan,
      tasks: updatedTasks,
      updatedAt: new Date().toISOString()
    });
  };

  const addTask = (task: Omit<MovingTask, 'id'>) => {
    if (!movingPlan) return;

    const newTask: MovingTask = {
      ...task,
      id: Date.now().toString()
    };

    setMovingPlan({
      ...movingPlan,
      tasks: [...movingPlan.tasks, newTask],
      updatedAt: new Date().toISOString()
    });
  };

  const updateServiceProvider = (providerId: string, updates: Partial<ServiceProvider>) => {
    if (!movingPlan) return;

    const updatedProviders = movingPlan.serviceProviders.map(provider =>
      provider.id === providerId ? { ...provider, ...updates } : provider
    );

    setMovingPlan({
      ...movingPlan,
      serviceProviders: updatedProviders,
      updatedAt: new Date().toISOString()
    });
  };

  const addServiceProvider = (provider: Omit<ServiceProvider, 'id'>) => {
    if (!movingPlan) return;

    const newProvider: ServiceProvider = {
      ...provider,
      id: Date.now().toString()
    };

    setMovingPlan({
      ...movingPlan,
      serviceProviders: [...movingPlan.serviceProviders, newProvider],
      updatedAt: new Date().toISOString()
    });
  };

  const updateAddressChange = (changeId: string, updates: Partial<AddressChange>) => {
    if (!movingPlan) return;

    const updatedChanges = movingPlan.addressChanges.map(change =>
      change.id === changeId ? { ...change, ...updates } : change
    );

    setMovingPlan({
      ...movingPlan,
      addressChanges: updatedChanges,
      updatedAt: new Date().toISOString()
    });
  };

  const calculateBudget = () => {
    if (!movingPlan) return { estimated: 0, actual: 0 };

    const estimatedCosts = [
      ...movingPlan.tasks.filter(t => t.estimatedCost).map(t => t.estimatedCost || 0),
      ...movingPlan.serviceProviders.filter(p => p.estimatedCost).map(p => p.estimatedCost || 0)
    ];

    const actualCosts = [
      ...movingPlan.tasks.filter(t => t.actualCost).map(t => t.actualCost || 0),
      ...movingPlan.serviceProviders.filter(p => p.actualCost).map(p => p.actualCost || 0)
    ];

    return {
      estimated: estimatedCosts.reduce((sum, cost) => sum + cost, 0),
      actual: actualCosts.reduce((sum, cost) => sum + cost, 0)
    };
  };

  return {
    movingPlan,
    setMovingPlan,
    createMovingPlan,
    updateTask,
    addTask,
    updateServiceProvider,
    addServiceProvider,
    updateAddressChange,
    calculateBudget,
    isLoading
  };
};

const generateDefaultTasks = (planData: Partial<MovingPlan>): MovingTask[] => {
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

const generateDefaultProviders = (): ServiceProvider[] => {
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

const generateDefaultAddressChanges = (): AddressChange[] => {
  return [
    {
      id: 'caf',
      organization: 'CAF',
      type: 'administrative',
      priority: 'high' as const,
      completed: false,
      contact: 'www.caf.fr'
    },
    {
      id: 'cpam',
      organization: 'CPAM',
      type: 'health',
      priority: 'high' as const,
      completed: false,
      contact: 'www.ameli.fr'
    },
    {
      id: 'pole-emploi',
      organization: 'Pôle Emploi',
      type: 'administrative',
      priority: 'high' as const,
      completed: false,
      contact: 'www.pole-emploi.fr'
    },
    {
      id: 'impots',
      organization: 'Centre des Impôts',
      type: 'administrative',
      priority: 'high' as const,
      completed: false,
      contact: 'www.impots.gouv.fr'
    },
    {
      id: 'banque',
      organization: 'Banque principale',
      type: 'financial',
      priority: 'high' as const,
      completed: false
    },
    {
      id: 'assurance',
      organization: 'Assurance auto/habitation',
      type: 'financial',
      priority: 'high' as const,
      completed: false
    },
    {
      id: 'mutuelle',
      organization: 'Mutuelle santé',
      type: 'health',
      priority: 'medium' as const,
      completed: false
    },
    {
      id: 'employeur',
      organization: 'Employeur/RH',
      type: 'administrative',
      priority: 'high' as const,
      completed: false
    }
  ];
};
