
import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { MovingTask, ServiceProvider, AddressChange, MovingPlan } from '@/types/movingPlanner';
import { generateDefaultTasks, generateDefaultProviders, generateDefaultAddressChanges } from '@/utils/movingPlannerDefaults';

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
