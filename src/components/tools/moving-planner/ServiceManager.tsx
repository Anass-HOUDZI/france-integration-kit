
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Users, Plus, Phone, Mail, Calendar, Euro } from 'lucide-react';
import { ServiceProvider } from '@/types/movingPlanner';

interface ServiceManagerProps {
  serviceProviders: ServiceProvider[];
  onUpdateServiceProvider: (providerId: string, updates: Partial<ServiceProvider>) => void;
  onAddServiceProvider: (provider: Omit<ServiceProvider, 'id'>) => void;
}

const ServiceManager: React.FC<ServiceManagerProps> = ({
  serviceProviders,
  onUpdateServiceProvider,
  onAddServiceProvider
}) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [newProvider, setNewProvider] = useState({
    name: '',
    type: 'other' as const,
    contact: '',
    email: '',
    phone: '',
    estimatedCost: '',
    appointmentDate: '',
    notes: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'booked': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'mover': return '🚚';
      case 'utility': return '⚡';
      case 'internet': return '📡';
      case 'insurance': return '🛡️';
      case 'cleaning': return '🧹';
      default: return '🔧';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'À contacter';
      case 'contacted': return 'Contacté';
      case 'booked': return 'Réservé';
      case 'completed': return 'Terminé';
      default: return status;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'mover': return 'Déménageur';
      case 'utility': return 'Énergie';
      case 'internet': return 'Internet';
      case 'insurance': return 'Assurance';
      case 'cleaning': return 'Ménage';
      default: return 'Autre';
    }
  };

  const handleAddProvider = () => {
    onAddServiceProvider({
      ...newProvider,
      status: 'pending',
      estimatedCost: newProvider.estimatedCost ? parseFloat(newProvider.estimatedCost) : undefined
    });
    
    setIsAddDialogOpen(false);
    setNewProvider({
      name: '',
      type: 'other',
      contact: '',
      email: '',
      phone: '',
      estimatedCost: '',
      appointmentDate: '',
      notes: ''
    });
  };

  const groupedProviders = serviceProviders.reduce((acc, provider) => {
    if (!acc[provider.type]) acc[provider.type] = [];
    acc[provider.type].push(provider);
    return acc;
  }, {} as Record<string, ServiceProvider[]>);

  const totalEstimated = serviceProviders
    .filter(p => p.estimatedCost)
    .reduce((sum, p) => sum + (p.estimatedCost || 0), 0);

  const totalActual = serviceProviders
    .filter(p => p.actualCost)
    .reduce((sum, p) => sum + (p.actualCost || 0), 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Gestion des fournisseurs
          </CardTitle>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Ajouter
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Ajouter un prestataire</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nom du prestataire</Label>
                  <Input
                    id="name"
                    value={newProvider.name}
                    onChange={(e) => setNewProvider({...newProvider, name: e.target.value})}
                    placeholder="Ex: Déménagements Martin"
                  />
                </div>
                
                <div>
                  <Label htmlFor="type">Type de service</Label>
                  <Select value={newProvider.type} onValueChange={(value: any) => setNewProvider({...newProvider, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mover">Déménageur</SelectItem>
                      <SelectItem value="utility">Énergie</SelectItem>
                      <SelectItem value="internet">Internet</SelectItem>
                      <SelectItem value="insurance">Assurance</SelectItem>
                      <SelectItem value="cleaning">Ménage</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={newProvider.phone}
                      onChange={(e) => setNewProvider({...newProvider, phone: e.target.value})}
                      placeholder="01 23 45 67 89"
                    />
                  </div>
                  <div>
                    <Label htmlFor="estimatedCost">Coût estimé (€)</Label>
                    <Input
                      id="estimatedCost"
                      type="number"
                      value={newProvider.estimatedCost}
                      onChange={(e) => setNewProvider({...newProvider, estimatedCost: e.target.value})}
                      placeholder="500"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newProvider.email}
                    onChange={(e) => setNewProvider({...newProvider, email: e.target.value})}
                    placeholder="contact@prestataire.fr"
                  />
                </div>
                
                <div>
                  <Label htmlFor="appointmentDate">Date de rendez-vous</Label>
                  <Input
                    id="appointmentDate"
                    type="datetime-local"
                    value={newProvider.appointmentDate}
                    onChange={(e) => setNewProvider({...newProvider, appointmentDate: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newProvider.notes}
                    onChange={(e) => setNewProvider({...newProvider, notes: e.target.value})}
                    placeholder="Informations supplémentaires"
                  />
                </div>
                
                <Button onClick={handleAddProvider} className="w-full">
                  Ajouter à la liste
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Statistiques budgétaires */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {serviceProviders.length}
            </div>
            <div className="text-sm text-gray-600">Prestataires</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {serviceProviders.filter(p => p.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600">Terminés</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {totalEstimated}€
            </div>
            <div className="text-sm text-gray-600">Budget estimé</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {totalActual}€
            </div>
            <div className="text-sm text-gray-600">Coût réel</div>
          </div>
        </div>

        {/* Liste par catégorie */}
        {Object.entries(groupedProviders).map(([type, providers]: [string, ServiceProvider[]]) => (
          <div key={type} className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              <span className="text-lg">{getTypeIcon(type)}</span>
              {getTypeLabel(type)}
              <Badge variant="secondary" className="text-xs">
                {providers.length}
              </Badge>
            </h3>
            
            <div className="grid gap-3">
              {providers.map((provider) => (
                <div key={provider.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{provider.name}</h4>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(provider.status)}>
                        {getStatusLabel(provider.status)}
                      </Badge>
                      {provider.estimatedCost && (
                        <Badge variant="outline" className="text-green-600">
                          {provider.estimatedCost}€
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600 mb-3">
                    {provider.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        <a href={`tel:${provider.phone}`} className="hover:text-blue-600">
                          {provider.phone}
                        </a>
                      </div>
                    )}
                    {provider.email && (
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        <a href={`mailto:${provider.email}`} className="hover:text-blue-600">
                          {provider.email}
                        </a>
                      </div>
                    )}
                    {provider.appointmentDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(provider.appointmentDate).toLocaleDateString('fr-FR')}
                      </div>
                    )}
                  </div>
                  
                  {provider.notes && (
                    <p className="text-sm text-gray-500 mb-3">{provider.notes}</p>
                  )}
                  
                  <div className="flex gap-2">
                    <Select
                      value={provider.status}
                      onValueChange={(value: any) => onUpdateServiceProvider(provider.id, { status: value })}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">À contacter</SelectItem>
                        <SelectItem value="contacted">Contacté</SelectItem>
                        <SelectItem value="booked">Réservé</SelectItem>
                        <SelectItem value="completed">Terminé</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {provider.status === 'completed' && !provider.actualCost && (
                      <Input
                        type="number"
                        placeholder="Coût final"
                        className="w-32"
                        onBlur={(e) => {
                          const cost = parseFloat(e.target.value);
                          if (!isNaN(cost)) {
                            onUpdateServiceProvider(provider.id, { actualCost: cost });
                          }
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ServiceManager;
