
export interface MovingTask {
  id: string;
  title: string;
  description: string;
  category: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
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
  status: 'pending' | 'contacted' | 'booked' | 'completed';
  estimatedCost?: number;
  actualCost?: number;
  appointmentDate?: string;
  notes?: string;
}

export interface AddressChange {
  id: string;
  organization: string;
  type: 'administrative' | 'financial' | 'health' | 'subscription' | 'other';
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
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
  createdAt: string;
  updatedAt: string;
}
