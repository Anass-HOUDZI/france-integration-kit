
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, CheckSquare, Users, MapPin, Wallet, Settings } from 'lucide-react';
import { useMovingPlanner } from '@/hooks/useMovingPlanner';
import TimelineView from '@/components/tools/moving-planner/TimelineView';
import AddressChangeTracker from '@/components/tools/moving-planner/AddressChangeTracker';
import ServiceManager from '@/components/tools/moving-planner/ServiceManager';
import BudgetTracker from '@/components/tools/moving-planner/BudgetTracker';

interface MovingPlannerProps {
  userProfile: any;
  diagnostic: any;
}

const MovingPlannerTool: React.FC<MovingPlannerProps> = ({ userProfile }) => {
  const {
    movingPlan,
    createMovingPlan,
    updateTask,
    addTask,
    updateServiceProvider,
    addServiceProvider,
    updateAddressChange,
    calculateBudget
  } = useMovingPlanner();

  const [setupData, setSetupData] = useState({
    movingDate: '',
    oldAddress: '',
    newAddress: '',
    hasKids: false,
    hasPets: false,
    isLongDistance: false,
    householdSize: 1,
    budget: 2000
  });

  const handleCreatePlan = () => {
    createMovingPlan(setupData);
  };

  const updatePlanBudget = (newBudget: number) => {
    if (movingPlan) {
      // Mise à jour du budget dans le plan existant
      // Cette fonctionnalité serait implémentée dans le hook
    }
  };

  // Écran de configuration initial
  if (!movingPlan) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Planificateur d'Emménagement
          </h1>
          <p className="text-lg text-gray-600">
            Organisez votre déménagement étape par étape sans rien oublier
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuration de votre déménagement
            </CardTitle>
            <CardDescription>
              Ces informations nous permettront de personnaliser votre planning
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="movingDate">Date prévue du déménagement *</Label>
                <Input
                  id="movingDate"
                  type="date"
                  value={setupData.movingDate}
                  onChange={(e) => setSetupData({...setupData, movingDate: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="householdSize">Taille du foyer</Label>
                <Input
                  id="householdSize"
                  type="number"
                  min="1"
                  value={setupData.householdSize}
                  onChange={(e) => setSetupData({...setupData, householdSize: parseInt(e.target.value) || 1})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="oldAddress">Adresse actuelle</Label>
              <Input
                id="oldAddress"
                value={setupData.oldAddress}
                onChange={(e) => setSetupData({...setupData, oldAddress: e.target.value})}
                placeholder="123 Rue de la Paix, 75001 Paris"
              />
            </div>

            <div>
              <Label htmlFor="newAddress">Nouvelle adresse</Label>
              <Input
                id="newAddress"
                value={setupData.newAddress}
                onChange={(e) => setSetupData({...setupData, newAddress: e.target.value})}
                placeholder="456 Avenue des Champs, 69000 Lyon"
              />
            </div>

            <div>
              <Label htmlFor="budget">Budget total estimé (€)</Label>
              <Input
                id="budget"
                type="number"
                value={setupData.budget}
                onChange={(e) => setSetupData({...setupData, budget: parseInt(e.target.value) || 0})}
                placeholder="2000"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">Votre situation</Label>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="kids" 
                    checked={setupData.hasKids}
                    onCheckedChange={(checked) => setSetupData({...setupData, hasKids: checked === true})}
                  />
                  <Label htmlFor="kids">Avec enfants</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="pets" 
                    checked={setupData.hasPets}
                    onCheckedChange={(checked) => setSetupData({...setupData, hasPets: checked === true})}
                  />
                  <Label htmlFor="pets">Avec animaux</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="longDistance" 
                    checked={setupData.isLongDistance}
                    onCheckedChange={(checked) => setSetupData({...setupData, isLongDistance: checked === true})}
                  />
                  <Label htmlFor="longDistance">Longue distance (+200km)</Label>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleCreatePlan}
              disabled={!setupData.movingDate}
              className="w-full"
              size="lg"
            >
              <CheckSquare className="mr-2 h-5 w-5" />
              Créer mon planning personnalisé
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Interface principale avec onglets
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Planning de Déménagement
        </h1>
        <p className="text-lg text-gray-600">
          Déménagement prévu le {new Date(movingPlan.movingDate).toLocaleDateString('fr-FR')}
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <div className="text-sm">
            <span className="font-medium">De:</span> {movingPlan.oldAddress || 'Non renseigné'}
          </div>
          <div className="text-sm">
            <span className="font-medium">Vers:</span> {movingPlan.newAddress || 'Non renseigné'}
          </div>
        </div>
      </div>

      <Tabs defaultValue="timeline" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="address" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Adresses
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Services
          </TabsTrigger>
          <TabsTrigger value="budget" className="flex items-center gap-2">
            <Wallet className="w-4 h-4" />
            Budget
          </TabsTrigger>
        </TabsList>

        <TabsContent value="timeline">
          <TimelineView
            tasks={movingPlan.tasks}
            onUpdateTask={updateTask}
            movingDate={movingPlan.movingDate}
          />
        </TabsContent>

        <TabsContent value="address">
          <AddressChangeTracker
            addressChanges={movingPlan.addressChanges}
            onUpdateAddressChange={updateAddressChange}
            oldAddress={movingPlan.oldAddress}
            newAddress={movingPlan.newAddress}
          />
        </TabsContent>

        <TabsContent value="services">
          <ServiceManager
            serviceProviders={movingPlan.serviceProviders}
            onUpdateServiceProvider={updateServiceProvider}
            onAddServiceProvider={addServiceProvider}
          />
        </TabsContent>

        <TabsContent value="budget">
          <BudgetTracker
            budget={movingPlan.budget}
            tasks={movingPlan.tasks}
            serviceProviders={movingPlan.serviceProviders}
            onUpdateBudget={updatePlanBudget}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MovingPlannerTool;
