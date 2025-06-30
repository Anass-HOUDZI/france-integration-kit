
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
