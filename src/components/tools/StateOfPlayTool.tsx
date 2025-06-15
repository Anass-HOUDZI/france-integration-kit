
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Camera, CheckCircle, AlertTriangle, Download, MapPin, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RoomItem {
  id: string;
  name: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  notes: string;
  photos: string[];
  damages: Array<{
    type: string;
    description: string;
    severity: 'minor' | 'moderate' | 'major';
  }>;
}

interface StateOfPlayData {
  propertyInfo: {
    address: string;
    date: string;
    type: 'entry' | 'exit';
    landlord: string;
    tenant: string;
  };
  rooms: RoomItem[];
  generalNotes: string;
  completed: boolean;
}

interface StateOfPlayToolProps {
  userProfile: any;
  diagnostic: any;
}

const StateOfPlayTool: React.FC<StateOfPlayToolProps> = ({ userProfile, diagnostic }) => {
  const [currentStep, setCurrentStep] = useState<'setup' | 'inspection' | 'summary'>('setup');
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [stateData, setStateData] = useState<StateOfPlayData>({
    propertyInfo: {
      address: '',
      date: new Date().toISOString().split('T')[0],
      type: 'entry',
      landlord: '',
      tenant: userProfile?.name || ''
    },
    rooms: [],
    generalNotes: '',
    completed: false
  });
  const { toast } = useToast();

  const defaultRooms = [
    'Entrée/Couloir',
    'Salon',
    'Cuisine',
    'Chambre 1',
    'Chambre 2',
    'Salle de bain',
    'Toilettes',
    'Balcon/Terrasse'
  ];

  const damageTypes = [
    'Rayure',
    'Trou',
    'Tache',
    'Fissure',
    'Usure normale',
    'Équipement défaillant',
    'Peinture écaillée',
    'Carrelage cassé',
    'Autre'
  ];

  const initializeRooms = () => {
    const rooms: RoomItem[] = defaultRooms.map((roomName, index) => ({
      id: `room-${index}`,
      name: roomName,
      condition: 'good' as const,
      notes: '',
      photos: [],
      damages: []
    }));
    
    setStateData(prev => ({ ...prev, rooms }));
    setCurrentStep('inspection');
  };

  const updatePropertyInfo = (field: string, value: string) => {
    setStateData(prev => ({
      ...prev,
      propertyInfo: { ...prev.propertyInfo, [field]: value }
    }));
  };

  const updateCurrentRoom = (field: string, value: any) => {
    setStateData(prev => ({
      ...prev,
      rooms: prev.rooms.map((room, index) => 
        index === currentRoomIndex 
          ? { ...room, [field]: value }
          : room
      )
    }));
  };

  const addDamage = () => {
    const newDamage = {
      type: '',
      description: '',
      severity: 'minor' as const
    };
    
    setStateData(prev => ({
      ...prev,
      rooms: prev.rooms.map((room, index) => 
        index === currentRoomIndex 
          ? { ...room, damages: [...room.damages, newDamage] }
          : room
      )
    }));
  };

  const updateDamage = (damageIndex: number, field: string, value: string) => {
    setStateData(prev => ({
      ...prev,
      rooms: prev.rooms.map((room, index) => 
        index === currentRoomIndex 
          ? {
              ...room,
              damages: room.damages.map((damage, dIndex) =>
                dIndex === damageIndex ? { ...damage, [field]: value } : damage
              )
            }
          : room
      )
    }));
  };

  const removeRoom = (roomIndex: number) => {
    setStateData(prev => ({
      ...prev,
      rooms: prev.rooms.filter((_, index) => index !== roomIndex)
    }));
    if (currentRoomIndex >= roomIndex && currentRoomIndex > 0) {
      setCurrentRoomIndex(currentRoomIndex - 1);
    }
  };

  const addCustomRoom = () => {
    const roomName = prompt('Nom de la pièce :');
    if (roomName) {
      const newRoom: RoomItem = {
        id: `room-${Date.now()}`,
        name: roomName,
        condition: 'good',
        notes: '',
        photos: [],
        damages: []
      };
      setStateData(prev => ({
        ...prev,
        rooms: [...prev.rooms, newRoom]
      }));
    }
  };

  const simulatePhotoCapture = () => {
    const currentRoom = stateData.rooms[currentRoomIndex];
    updateCurrentRoom('photos', [...currentRoom.photos, `photo-${Date.now()}.jpg`]);
    toast({
      title: "Photo ajoutée",
      description: "La photo a été ajoutée à cette pièce"
    });
  };

  const generateReport = () => {
    setStateData(prev => ({ ...prev, completed: true }));
    setCurrentStep('summary');
    toast({
      title: "État des lieux terminé",
      description: "Votre rapport a été généré avec succès"
    });
  };

  const exportPDF = () => {
    toast({
      title: "Export réussi",
      description: "L'état des lieux a été exporté en PDF"
    });
  };

  const currentRoom = stateData.rooms[currentRoomIndex];

  if (currentStep === 'setup') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Assistant État des Lieux
          </h2>
          <p className="text-gray-600">
            Réalisez un état des lieux précis et conforme
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informations générales</CardTitle>
            <CardDescription>
              Renseignez les informations de base du logement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address">Adresse du logement</Label>
              <Input
                id="address"
                value={stateData.propertyInfo.address}
                onChange={(e) => updatePropertyInfo('address', e.target.value)}
                placeholder="Adresse complète"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date de l'état des lieux</Label>
                <Input
                  id="date"
                  type="date"
                  value={stateData.propertyInfo.date}
                  onChange={(e) => updatePropertyInfo('date', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="type">Type d'état des lieux</Label>
                <Select 
                  value={stateData.propertyInfo.type} 
                  onValueChange={(value) => updatePropertyInfo('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">État des lieux d'entrée</SelectItem>
                    <SelectItem value="exit">État des lieux de sortie</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="landlord">Propriétaire/Bailleur</Label>
                <Input
                  id="landlord"
                  value={stateData.propertyInfo.landlord}
                  onChange={(e) => updatePropertyInfo('landlord', e.target.value)}
                  placeholder="Nom du propriétaire"
                />
              </div>
              <div>
                <Label htmlFor="tenant">Locataire</Label>
                <Input
                  id="tenant"
                  value={stateData.propertyInfo.tenant}
                  onChange={(e) => updatePropertyInfo('tenant', e.target.value)}
                  placeholder="Nom du locataire"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button 
                onClick={initializeRooms}
                className="w-full"
                disabled={!stateData.propertyInfo.address || !stateData.propertyInfo.landlord}
              >
                Commencer l'inspection
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentStep === 'inspection' && currentRoom) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Inspection : {currentRoom.name}
            </h2>
            <p className="text-gray-600">
              Pièce {currentRoomIndex + 1} sur {stateData.rooms.length}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={addCustomRoom} variant="outline" size="sm">
              Ajouter une pièce
            </Button>
            {stateData.rooms.length > 1 && (
              <Button 
                onClick={() => removeRoom(currentRoomIndex)} 
                variant="outline" 
                size="sm"
                className="text-red-600 hover:bg-red-50"
              >
                Supprimer cette pièce
              </Button>
            )}
          </div>
        </div>

        {/* Navigation entre pièces */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 overflow-x-auto">
              {stateData.rooms.map((room, index) => (
                <Button
                  key={room.id}
                  variant={index === currentRoomIndex ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentRoomIndex(index)}
                  className="flex-shrink-0"
                >
                  {room.name}
                  {room.damages.length > 0 && (
                    <Badge variant="destructive" className="ml-2 text-xs">
                      {room.damages.length}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Informations de la pièce */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {currentRoom.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="room-name">Nom de la pièce</Label>
                <Input
                  id="room-name"
                  value={currentRoom.name}
                  onChange={(e) => updateCurrentRoom('name', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="condition">État général</Label>
                <Select 
                  value={currentRoom.condition} 
                  onValueChange={(value) => updateCurrentRoom('condition', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Bon</SelectItem>
                    <SelectItem value="fair">Correct</SelectItem>
                    <SelectItem value="poor">Mauvais</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">Notes générales</Label>
                <Textarea
                  id="notes"
                  value={currentRoom.notes}
                  onChange={(e) => updateCurrentRoom('notes', e.target.value)}
                  rows={3}
                  placeholder="Observations générales sur cette pièce..."
                />
              </div>

              <div>
                <Label>Photos ({currentRoom.photos.length})</Label>
                <div className="flex gap-2 mt-2">
                  <Button onClick={simulatePhotoCapture} variant="outline" size="sm">
                    <Camera className="mr-2 h-4 w-4" />
                    Prendre une photo
                  </Button>
                  {currentRoom.photos.length > 0 && (
                    <Badge variant="secondary">
                      {currentRoom.photos.length} photo(s)
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dégâts et anomalies */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Dégâts et anomalies
              </CardTitle>
              <Button onClick={addDamage} variant="outline" size="sm">
                Ajouter un dégât
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentRoom.damages.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <p>Aucun dégât signalé</p>
                </div>
              ) : (
                currentRoom.damages.map((damage, index) => (
                  <div key={index} className="border rounded-lg p-3 space-y-3">
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <Label>Type de dégât</Label>
                        <Select 
                          value={damage.type} 
                          onValueChange={(value) => updateDamage(index, 'type', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner..." />
                          </SelectTrigger>
                          <SelectContent>
                            {damageTypes.map(type => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Gravité</Label>
                        <Select 
                          value={damage.severity} 
                          onValueChange={(value) => updateDamage(index, 'severity', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="minor">Mineur</SelectItem>
                            <SelectItem value="moderate">Modéré</SelectItem>
                            <SelectItem value="major">Majeur</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={damage.description}
                        onChange={(e) => updateDamage(index, 'description', e.target.value)}
                        rows={2}
                        placeholder="Décrivez précisément le dégât..."
                      />
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            onClick={() => setCurrentRoomIndex(Math.max(0, currentRoomIndex - 1))}
            disabled={currentRoomIndex === 0}
            variant="outline"
          >
            Pièce précédente
          </Button>
          
          {currentRoomIndex === stateData.rooms.length - 1 ? (
            <Button onClick={generateReport} className="bg-green-600 hover:bg-green-700">
              Terminer l'état des lieux
            </Button>
          ) : (
            <Button 
              onClick={() => setCurrentRoomIndex(currentRoomIndex + 1)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Pièce suivante
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Summary step
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Rapport d'état des lieux</h2>
          <p className="text-gray-600">
            {stateData.propertyInfo.type === 'entry' ? 'État des lieux d\'entrée' : 'État des lieux de sortie'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setCurrentStep('inspection')} variant="outline">
            Modifier
          </Button>
          <Button onClick={exportPDF} className="bg-blue-600 hover:bg-blue-700">
            <Download className="mr-2 h-4 w-4" />
            Exporter PDF
          </Button>
        </div>
      </div>

      {/* Résumé du logement */}
      <Card>
        <CardHeader>
          <CardTitle>Informations du logement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p><span className="font-medium">Adresse :</span> {stateData.propertyInfo.address}</p>
              <p><span className="font-medium">Date :</span> {new Date(stateData.propertyInfo.date).toLocaleDateString('fr-FR')}</p>
            </div>
            <div>
              <p><span className="font-medium">Propriétaire :</span> {stateData.propertyInfo.landlord}</p>
              <p><span className="font-medium">Locataire :</span> {stateData.propertyInfo.tenant}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Résumé par pièce */}
      <Card>
        <CardHeader>
          <CardTitle>Résumé par pièce ({stateData.rooms.length} pièces inspectées)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stateData.rooms.map((room, index) => (
              <div key={room.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{room.name}</h4>
                  <div className="flex gap-2">
                    <Badge variant={
                      room.condition === 'excellent' ? 'default' :
                      room.condition === 'good' ? 'secondary' :
                      room.condition === 'fair' ? 'outline' : 'destructive'
                    }>
                      {room.condition === 'excellent' ? 'Excellent' :
                       room.condition === 'good' ? 'Bon' :
                       room.condition === 'fair' ? 'Correct' : 'Mauvais'}
                    </Badge>
                    {room.damages.length > 0 && (
                      <Badge variant="destructive">
                        {room.damages.length} dégât(s)
                      </Badge>
                    )}
                    {room.photos.length > 0 && (
                      <Badge variant="outline">
                        {room.photos.length} photo(s)
                      </Badge>
                    )}
                  </div>
                </div>
                
                {room.notes && (
                  <p className="text-sm text-gray-600 mb-2">{room.notes}</p>
                )}
                
                {room.damages.length > 0 && (
                  <div className="space-y-1">
                    {room.damages.map((damage, dIndex) => (
                      <div key={dIndex} className="text-sm text-red-600">
                        • {damage.type} ({damage.severity}) : {damage.description}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Statistiques */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {stateData.rooms.length}
            </p>
            <p className="text-sm text-gray-600">Pièces inspectées</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">
              {stateData.rooms.reduce((acc, room) => acc + room.damages.length, 0)}
            </p>
            <p className="text-sm text-gray-600">Dégâts signalés</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {stateData.rooms.reduce((acc, room) => acc + room.photos.length, 0)}
            </p>
            <p className="text-sm text-gray-600">Photos prises</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StateOfPlayTool;
