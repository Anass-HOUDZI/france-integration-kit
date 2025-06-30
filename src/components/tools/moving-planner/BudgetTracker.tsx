
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Wallet, TrendingUp, TrendingDown, AlertTriangle, PieChart } from 'lucide-react';
import { MovingTask, ServiceProvider } from '@/types/movingPlanner';

interface BudgetTrackerProps {
  budget: number;
  tasks: MovingTask[];
  serviceProviders: ServiceProvider[];
  onUpdateBudget: (newBudget: number) => void;
}

interface BudgetCategory {
  name: string;
  estimated: number;
  actual: number;
  color: string;
}

const BudgetTracker: React.FC<BudgetTrackerProps> = ({
  budget,
  tasks,
  serviceProviders,
  onUpdateBudget
}) => {
  const [newBudget, setNewBudget] = useState(budget.toString());

  // Calculs des coûts
  const taskEstimated = tasks.filter(t => t.estimatedCost).reduce((sum, t) => sum + (t.estimatedCost || 0), 0);
  const taskActual = tasks.filter(t => t.actualCost).reduce((sum, t) => sum + (t.actualCost || 0), 0);
  const serviceEstimated = serviceProviders.filter(p => p.estimatedCost).reduce((sum, p) => sum + (p.estimatedCost || 0), 0);
  const serviceActual = serviceProviders.filter(p => p.actualCost).reduce((sum, p) => sum + (p.actualCost || 0), 0);

  const totalEstimated = taskEstimated + serviceEstimated;
  const totalActual = taskActual + serviceActual;

  // Catégories de budget
  const categories: BudgetCategory[] = [
    {
      name: 'Déménageurs',
      estimated: serviceProviders.filter(p => p.type === 'mover').reduce((sum, p) => sum + (p.estimatedCost || 0), 0),
      actual: serviceProviders.filter(p => p.type === 'mover').reduce((sum, p) => sum + (p.actualCost || 0), 0),
      color: 'bg-blue-500'
    },
    {
      name: 'Services & Utilities',
      estimated: serviceProviders.filter(p => ['utility', 'internet', 'insurance'].includes(p.type)).reduce((sum, p) => sum + (p.estimatedCost || 0), 0),
      actual: serviceProviders.filter(p => ['utility', 'internet', 'insurance'].includes(p.type)).reduce((sum, p) => sum + (p.actualCost || 0), 0),
      color: 'bg-green-500'
    },
    {
      name: 'Matériel & Divers',
      estimated: taskEstimated + serviceProviders.filter(p => ['cleaning', 'other'].includes(p.type)).reduce((sum, p) => sum + (p.estimatedCost || 0), 0),
      actual: taskActual + serviceProviders.filter(p => ['cleaning', 'other'].includes(p.type)).reduce((sum, p) => sum + (p.actualCost || 0), 0),
      color: 'bg-purple-500'
    }
  ];

  const budgetUsagePercentage = budget > 0 ? Math.round((totalEstimated / budget) * 100) : 0;
  const actualUsagePercentage = budget > 0 ? Math.round((totalActual / budget) * 100) : 0;
  const savings = totalEstimated - totalActual;

  const getBudgetStatus = () => {
    if (totalEstimated > budget) return { status: 'over', color: 'text-red-600', icon: TrendingUp };
    if (totalEstimated > budget * 0.9) return { status: 'warning', color: 'text-orange-600', icon: AlertTriangle };
    return { status: 'good', color: 'text-green-600', icon: TrendingDown };
  };

  const budgetStatus = getBudgetStatus();
  const StatusIcon = budgetStatus.icon;

  const handleBudgetUpdate = () => {
    const numBudget = parseFloat(newBudget);
    if (!isNaN(numBudget) && numBudget >= 0) {
      onUpdateBudget(numBudget);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          Suivi budget déménagement
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Configuration budget */}
        <div className="flex gap-2">
          <Input
            type="number"
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
            placeholder="Budget total"
            className="flex-1"
          />
          <Button onClick={handleBudgetUpdate} variant="outline">
            Mettre à jour
          </Button>
        </div>

        {/* Vue d'ensemble */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{budget}€</div>
            <div className="text-sm text-gray-600">Budget total</div>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{totalEstimated}€</div>
            <div className="text-sm text-gray-600">Coût estimé</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{totalActual}€</div>
            <div className="text-sm text-gray-600">Coût réel</div>
          </div>
          <div className={`p-4 rounded-lg ${savings >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className={`text-2xl font-bold ${savings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {savings >= 0 ? '+' : ''}{savings}€
            </div>
            <div className="text-sm text-gray-600">
              {savings >= 0 ? 'Économie' : 'Dépassement'}
            </div>
          </div>
        </div>

        {/* Barres de progression */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Budget estimé utilisé</span>
              <div className="flex items-center gap-2">
                <StatusIcon className={`w-4 h-4 ${budgetStatus.color}`} />
                <span className={`text-sm font-medium ${budgetStatus.color}`}>
                  {budgetUsagePercentage}%
                </span>
              </div>
            </div>
            <Progress 
              value={Math.min(budgetUsagePercentage, 100)} 
              className="h-3"
            />
            {budgetUsagePercentage > 100 && (
              <p className="text-xs text-red-600 mt-1">
                Dépassement de {budgetUsagePercentage - 100}%
              </p>
            )}
          </div>

          {totalActual > 0 && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Budget réel utilisé</span>
                <span className="text-sm font-medium text-green-600">
                  {actualUsagePercentage}%
                </span>
              </div>
              <Progress 
                value={Math.min(actualUsagePercentage, 100)} 
                className="h-3"
              />
            </div>
          )}
        </div>

        {/* Répartition par catégorie */}
        <div className="space-y-4">
          <h3 className="font-medium flex items-center gap-2">
            <PieChart className="w-4 h-4" />
            Répartition par catégorie
          </h3>
          
          {categories.map((category) => (
            <div key={category.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{category.name}</span>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">
                    Est. {category.estimated}€
                  </Badge>
                  {category.actual > 0 && (
                    <Badge variant="outline" className="text-xs text-green-600">
                      Réel {category.actual}€
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <div className="flex-1">
                  <div className={`h-2 ${category.color} rounded-full`} 
                       style={{width: `${budget > 0 ? Math.min((category.estimated / budget) * 100, 100) : 0}%`}}>
                  </div>
                </div>
                {category.actual > 0 && (
                  <div className="flex-1">
                    <div className={`h-2 ${category.color} rounded-full opacity-60`} 
                         style={{width: `${budget > 0 ? Math.min((category.actual / budget) * 100, 100) : 0}%`}}>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="text-xs text-gray-500">
                {budget > 0 ? Math.round((category.estimated / budget) * 100) : 0}% du budget total
              </div>
            </div>
          ))}
        </div>

        {/* Conseils d'optimisation */}
        {budgetUsagePercentage > 90 && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h4 className="font-medium text-amber-800 mb-2">💡 Conseils d'optimisation</h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Comparez plusieurs devis de déménageurs</li>
              <li>• Vendez/donnez les objets non essentiels</li>
              <li>• Demandez des cartons gratuits aux commerces</li>
              <li>• Négociez les tarifs des prestataires</li>
              <li>• Planifiez le déménagement en semaine (moins cher)</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetTracker;
