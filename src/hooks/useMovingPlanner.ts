
import { useState, useEffect } from 'react';
import { MovingPlan, MovingTask, ServiceProvider, AddressChange } from '@/types/movingPlanner';
import { generateDefaultTasks, generateDefaultProviders, generateDefaultAddressChanges } from '@/utils/movingPlannerDefaults';

export const useMovingPlanner = () => {
  const [movingPlan, setMovingPlan] = useState<MovingPlan | null>(null);

  // Charger le plan depuis localStorage
  useEffect(() => {
    const savedPlan = localStorage.getItem('movingPlan');
    if (savedPlan) {
      setMovingPlan(JSON.parse(savedPlan));
    }
  }, []);

  // Sauvegarder automatiquement
  useEffect(() => {
    if (movingPlan) {
      localStorage.setItem('movingPlan', JSON.stringify(movingPlan));
    }
  }, [movingPlan]);

  const createMovingPlan = (planData: any) => {
    const newPlan: MovingPlan = {
      id: `plan-${Date.now()}`,
      movingDate: planData.movingDate,
      oldAddress: planData.oldAddress || '',
      newAddress: planData.newAddress || '',
      hasKids: planData.hasKids || false,
      hasPets: planData.hasPets || false,
      isLongDistance: planData.isLongDistance || false,
      householdSize: planData.householdSize || 1,
      budget: planData.budget || 2000,
      tasks: generateDefaultTasks(planData),
      serviceProviders: generateDefaultProviders(),
      addressChanges: generateDefaultAddressChanges(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setMovingPlan(newPlan);
  };

  const updateTask = (taskId: string, updates: Partial<MovingTask>) => {
    if (!movingPlan) return;
    
    setMovingPlan(prev => ({
      ...prev!,
      tasks: prev!.tasks.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      ),
      updatedAt: new Date().toISOString()
    }));
  };

  const addTask = (task: Omit<MovingTask, 'id'>) => {
    if (!movingPlan) return;
    
    const newTask: MovingTask = {
      ...task,
      id: `task-${Date.now()}`
    };

    setMovingPlan(prev => ({
      ...prev!,
      tasks: [...prev!.tasks, newTask],
      updatedAt: new Date().toISOString()
    }));
  };

  const updateServiceProvider = (providerId: string, updates: Partial<ServiceProvider>) => {
    if (!movingPlan) return;
    
    setMovingPlan(prev => ({
      ...prev!,
      serviceProviders: prev!.serviceProviders.map(provider => 
        provider.id === providerId ? { ...provider, ...updates } : provider
      ),
      updatedAt: new Date().toISOString()
    }));
  };

  const addServiceProvider = (provider: Omit<ServiceProvider, 'id'>) => {
    if (!movingPlan) return;
    
    const newProvider: ServiceProvider = {
      ...provider,
      id: `provider-${Date.now()}`
    };

    setMovingPlan(prev => ({
      ...prev!,
      serviceProviders: [...prev!.serviceProviders, newProvider],
      updatedAt: new Date().toISOString()
    }));
  };

  const updateAddressChange = (changeId: string, updates: Partial<AddressChange>) => {
    if (!movingPlan) return;
    
    setMovingPlan(prev => ({
      ...prev!,
      addressChanges: prev!.addressChanges.map(change => 
        change.id === changeId ? { ...change, ...updates } : change
      ),
      updatedAt: new Date().toISOString()
    }));
  };

  const calculateBudget = () => {
    if (!movingPlan) return { estimated: 0, actual: 0 };
    
    const taskEstimated = movingPlan.tasks.reduce((sum, task) => 
      sum + (task.estimatedCost || 0), 0
    );
    const taskActual = movingPlan.tasks.reduce((sum, task) => 
      sum + (task.actualCost || 0), 0
    );
    const serviceEstimated = movingPlan.serviceProviders.reduce((sum, provider) => 
      sum + (provider.estimatedCost || 0), 0
    );
    const serviceActual = movingPlan.serviceProviders.reduce((sum, provider) => 
      sum + (provider.actualCost || 0), 0
    );

    return {
      estimated: taskEstimated + serviceEstimated,
      actual: taskActual + serviceActual
    };
  };

  return {
    movingPlan,
    createMovingPlan,
    updateTask,
    addTask,
    updateServiceProvider,
    addServiceProvider,
    updateAddressChange,
    calculateBudget
  };
};
