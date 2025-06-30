
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Plus, ExternalLink, AlertCircle } from 'lucide-react';
import { AddressChange } from '@/types/movingPlanner';

interface AddressChangeTrackerProps {
  addressChanges: AddressChange[];
  onUpdateAddressChange: (changeId: string, updates: Partial<AddressChange>) => void;
  oldAddress: string;
  newAddress: string;
}

const AddressChangeTracker: React.FC<AddressChangeTrackerProps> = ({
  addressChanges,
  onUpdateAddressChange,
  oldAddress,
  newAddress
}) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newChange, setNewChange] = useState({
    organization: '',
    type: 'other' as const,
    priority: 'medium' as const,
    contact: '',
    notes: ''
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'administrative': return 'bg-blue-100 text-blue-800';
      case 'financial': return 'bg-green-100 text-green-800';
      case 'health': return 'bg-purple-100 text-purple-800';
      case 'subscription': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const groupedChanges = addressChanges.reduce((acc, change) => {
    if (!acc[change.type]) acc[change.type] = [];
    acc[change.type].push(change);
    return acc;
  }, {} as Record<string, AddressChange[]>);

  const completionStats = {
    total: addressChanges.length,
    completed: addressChanges.filter(c => c.completed).length,
    high: addressChanges.filter(c => c.priority === 'high').length,
    highCompleted: addressChanges.filter(c => c.priority === 'high' && c.completed).length
  };

  const handleAddChange = () => {
    // Cette fonction serait connectée au hook parent
    setIsAddDialogOpen(false);
    setNewChange({
      organization: '',
      type: 'other',
      priority: 'medium',
      contact: '',
      notes: ''
    });
  };

  const openOfficialLink = (organization: string) => {
    const links = {
      'CAF': 'https://www.caf.fr/allocataires/changement-de-situation',
      'CPAM': 'https://www.ameli.fr/assure/adresse-et-contact',
      'Pôle Emploi': 'https://www.pole-emploi.fr',
      'Centre des Impôts': 'https://www.impots.gouv.fr'
    };
    
    const link = links[organization as keyof typeof links];
    if (link) {
      window.open(link, '_blank');
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Changement d'adresse automatisé
          </CardTitle>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Ajouter
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter un organisme</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="organization">Nom de l'organisme</Label>
                  <Input
                    id="organization"
                    value={newChange.organization}
                    onChange={(e) => setNewChange({...newChange, organization: e.target.value})}
                    placeholder="Ex: Ma banque"
                  />
                </div>
                
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={newChange.type} onValueChange={(value: any) => setNewChange({...newChange, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="administrative">Administratif</SelectItem>
                      <SelectItem value="financial">Financier</SelectItem>
                      <SelectItem value="health">Santé</SelectItem>
                      <SelectItem value="subscription">Abonnement</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="priority">Priorité</Label>
                  <Select value={newChange.priority} onValueChange={(value: any) => setNewChange({...newChange, priority: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">Haute</SelectItem>
                      <SelectItem value="medium">Moyenne</SelectItem>
                      <SelectItem value="low">Basse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="contact">Contact</Label>
                  <Input
                    id="contact"
                    value={newChange.contact}
                    onChange={(e) => setNewChange({...newChange, contact: e.target.value})}
                    placeholder="Téléphone, email ou site web"
                  />
                </div>
                
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newChange.notes}
                    onChange={(e) => setNewChange({...newChange, notes: e.target.value})}
                    placeholder="Informations supplémentaires"
                  />
                </div>
                
                <Button onClick={handleAddChange} className="w-full">
                  Ajouter à la liste
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Adresses */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium mb-2">Changement d'adresse</h3>
          <div className="text-sm space-y-1">
            <div><strong>Ancienne :</strong> {oldAddress || 'Non renseignée'}</div>
            <div><strong>Nouvelle :</strong> {newAddress || 'Non renseignée'}</div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {completionStats.completed}/{completionStats.total}
            </div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {completionStats.highCompleted}/{completionStats.high}
            </div>
            <div className="text-sm text-gray-600">Priorité haute</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {Math.round((completionStats.completed / completionStats.total) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Progression</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {addressChanges.filter(c => !c.completed && c.priority === 'high').length}
            </div>
            <div className="text-sm text-gray-600">Urgentes</div>
          </div>
        </div>

        {/* Liste par catégorie */}
        {Object.entries(groupedChanges).map(([type, changes]: [string, AddressChange[]]) => (
          <div key={type} className="space-y-3">
            <h3 className="font-medium capitalize flex items-center gap-2">
              <Badge className={getTypeColor(type)}>
                {type === 'administrative' ? 'Administratif' :
                 type === 'financial' ? 'Financier' :
                 type === 'health' ? 'Santé' :
                 type === 'subscription' ? 'Abonnements' : 'Autre'}
              </Badge>
              <span className="text-sm text-gray-500">
                ({changes.filter(c => c.completed).length}/{changes.length})
              </span>
            </h3>
            
            <div className="space-y-2">
              {changes.map((change) => (
                <div key={change.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    checked={change.completed}
                    onCheckedChange={(checked) => 
                      onUpdateAddressChange(change.id, { completed: checked === true })
                    }
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-medium ${change.completed ? 'line-through text-gray-500' : ''}`}>
                        {change.organization}
                      </span>
                      <Badge variant="outline" className={getPriorityColor(change.priority)}>
                        {change.priority === 'high' ? 'Urgent' : 
                         change.priority === 'medium' ? 'Important' : 'Normal'}
                      </Badge>
                      {!change.completed && change.priority === 'high' && (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    
                    {change.contact && (
                      <div className="text-sm text-gray-600">
                        Contact: {change.contact}
                      </div>
                    )}
                    
                    {change.notes && (
                      <div className="text-sm text-gray-500 mt-1">
                        {change.notes}
                      </div>
                    )}
                  </div>
                  
                  {change.contact && change.contact.startsWith('www.') && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openOfficialLink(change.organization)}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AddressChangeTracker;
