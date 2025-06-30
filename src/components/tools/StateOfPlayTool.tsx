
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, Plus, FileText, GitCompare, Home, Save, ArrowLeft } from 'lucide-react';
import { useStateOfPlay, Room } from '@/hooks/useStateOfPlay';
import ToolContainer from '@/components/tools/ToolContainer';
import RoomChecklist from '@/components/tools/state-of-play/RoomChecklist';
import PDFGenerator from '@/components/tools/state-of-play/PDFGenerator';
import ComparisonView from '@/components/tools/state-of-play/ComparisonView';
import { toast } from 'sonner';

interface StateOfPlayToolProps {
  userProfile: any;
  diagnostic: any;
  onBack?: () => void;
}

const StateOfPlayTool: React.FC<StateOfPlayToolProps> = ({ userProfile, diagnostic, onBack }) => {
  const {
    currentStateOfPlay,
    savedStatesOfPlay,
    rooms,
    comparison,
    createNewStateOfPlay,
    updateChecklistItem,
    addPhoto,
    saveStateOfPlay,
    loadStateOfPlay,
    compareStatesOfPlay,
    addRoom
  } = useStateOfPlay();

  const [activeTab, setActiveTab] = useState('overview');
  const [newStateForm, setNewStateForm] = useState({
    type: 'entry' as 'entry' | 'exit',
    address: '',
    tenantName: '',
    landlordName: ''
  });
  const [newRoomForm, setNewRoomForm] = useState({
    name: '',
    type: 'other' as Room['type']
  });
  const [showNewStateForm, setShowNewStateForm] = useState(false);
  const [showNewRoomForm, setShowNewRoomForm] = useState(false);

  const handleCreateStateOfPlay = () => {
    if (!newStateForm.address || !newStateForm.tenantName || !newStateForm.landlordName) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    createNewStateOfPlay(newStateForm.type, {
      address: newStateForm.address,
      tenantName: newStateForm.tenantName,
      landlordName: newStateForm.landlordName
    });

    setShowNewStateForm(false);
    setActiveTab('checklist');
    toast.success('Nouvel état des lieux créé avec succès');
  };

  const handleSaveStateOfPlay = () => {
    saveStateOfPlay();
    toast.success('État des lieux sauvegardé avec succès');
  };

  const handleAddRoom = () => {
    if (!newRoomForm.name.trim()) {
      toast.error('Veuillez saisir un nom de pièce');
      return;
    }

    addRoom(newRoomForm.name.trim(), newRoomForm.type);
    setNewRoomForm({ name: '', type: 'other' });
    setShowNewRoomForm(false);
    toast.success('Pièce ajoutée avec succès');
  };

  const entryStates = savedStatesOfPlay.filter(s => s.type === 'entry' && s.completed);
  const exitStates = savedStatesOfPlay.filter(s => s.type === 'exit' && s.completed);

  return (
    <ToolContainer
      title="Assistant État des Lieux"
      description="Réalisez des états des lieux précis avec photos géolocalisées"
      icon={<CheckSquare className="h-8 w-8 text-purple-600" />}
      onBack={onBack}
    >
      <div className="space-y-6">
        {/* Message personnalisé */}
        {userProfile && (
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Home className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-purple-900">
                  Bonjour {userProfile.name || 'cher utilisateur'} !
                </span>
              </div>
              <p className="text-purple-800 text-sm">
                Créez des états des lieux complets et conformes avec photos géolocalisées 
                et génération automatique de PDF officiel.
              </p>
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Accueil
            </TabsTrigger>
            <TabsTrigger value="checklist" className="flex items-center gap-2" disabled={!currentStateOfPlay}>
              <CheckSquare className="h-4 w-4" />
              Inspection
            </TabsTrigger>
            <TabsTrigger value="pdf" className="flex items-center gap-2" disabled={!currentStateOfPlay}>
              <FileText className="h-4 w-4" />
              Génération PDF
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-2">
              <GitCompare className="h-4 w-4" />
              Comparaison
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Tableau de bord */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {savedStatesOfPlay.length}
                  </div>
                  <div className="text-sm text-gray-600">États sauvegardés</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {entryStates.length}
                  </div>
                  <div className="text-sm text-gray-600">États d'entrée</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {exitStates.length}
                  </div>
                  <div className="text-sm text-gray-600">États de sortie</div>
                </CardContent>
              </Card>
            </div>

            {/* Actions principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Nouvel état des lieux</CardTitle>
                </CardHeader>
                <CardContent>
                  {!showNewStateForm ? (
                    <Button onClick={() => setShowNewStateForm(true)} className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Créer un état des lieux
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <Label>Type d'état</Label>
                        <Select 
                          value={newStateForm.type} 
                          onValueChange={(value: 'entry' | 'exit') => 
                            setNewStateForm(prev => ({ ...prev, type: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="entry">État d'entrée</SelectItem>
                            <SelectItem value="exit">État de sortie</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="address">Adresse du bien *</Label>
                        <Input
                          id="address"
                          value={newStateForm.address}
                          onChange={(e) => setNewStateForm(prev => ({ ...prev, address: e.target.value }))}
                          placeholder="123 rue de la Paix, 75001 Paris"
                        />
                      </div>

                      <div>
                        <Label htmlFor="tenant">Nom du locataire *</Label>
                        <Input
                          id="tenant"
                          value={newStateForm.tenantName}
                          onChange={(e) => setNewStateForm(prev => ({ ...prev, tenantName: e.target.value }))}
                          placeholder="Jean Dupont"
                        />
                      </div>

                      <div>
                        <Label htmlFor="landlord">Propriétaire/Agent *</Label>
                        <Input
                          id="landlord"
                          value={newStateForm.landlordName}
                          onChange={(e) => setNewStateForm(prev => ({ ...prev, landlordName: e.target.value }))}
                          placeholder="Marie Martin"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={handleCreateStateOfPlay} className="flex-1">
                          Créer
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setShowNewStateForm(false)}
                        >
                          Annuler
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {currentStateOfPlay && (
                <Card>
                  <CardHeader>
                    <CardTitle>État en cours</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Type:</span>
                        <Badge variant={currentStateOfPlay.type === 'entry' ? 'default' : 'secondary'}>
                          {currentStateOfPlay.type === 'entry' ? 'Entrée' : 'Sortie'}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        {currentStateOfPlay.propertyAddress}
                      </div>
                      <div className="text-sm text-gray-600">
                        Locataire: {currentStateOfPlay.tenantName}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={() => setActiveTab('checklist')}
                        className="flex-1"
                      >
                        Continuer
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={handleSaveStateOfPlay}
                      >
                        <Save className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* États sauvegardés */}
            {savedStatesOfPlay.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>États des lieux sauvegardés</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {savedStatesOfPlay.slice(0, 5).map((state) => (
                      <div key={state.id} className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <div className="font-medium">{state.propertyAddress}</div>
                          <div className="text-sm text-gray-600">
                            {state.tenantName} - {new Date(state.date).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={state.type === 'entry' ? 'default' : 'secondary'}>
                            {state.type === 'entry' ? 'Entrée' : 'Sortie'}
                          </Badge>
                          {state.completed && (
                            <Badge variant="outline" className="text-green-600">
                              Terminé
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="checklist" className="space-y-6">
            {currentStateOfPlay && (
              <>
                {/* En-tête de l'état en cours */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">
                          État des lieux - {currentStateOfPlay.type === 'entry' ? 'Entrée' : 'Sortie'}
                        </h3>
                        <p className="text-sm text-gray-600">{currentStateOfPlay.propertyAddress}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {!showNewRoomForm ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setShowNewRoomForm(true)}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Ajouter pièce
                          </Button>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Input
                              placeholder="Nom de la pièce"
                              value={newRoomForm.name}
                              onChange={(e) => setNewRoomForm(prev => ({ ...prev, name: e.target.value }))}
                              className="w-32"
                            />
                            <Select
                              value={newRoomForm.type}
                              onValueChange={(value: Room['type']) => 
                                setNewRoomForm(prev => ({ ...prev, type: value }))
                              }
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="living">Salon</SelectItem>
                                <SelectItem value="bedroom">Chambre</SelectItem>
                                <SelectItem value="kitchen">Cuisine</SelectItem>
                                <SelectItem value="bathroom">Salle de bain</SelectItem>
                                <SelectItem value="other">Autre</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button size="sm" onClick={handleAddRoom}>
                              OK
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setShowNewRoomForm(false)}
                            >
                              <ArrowLeft className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                        <Button onClick={handleSaveStateOfPlay}>
                          <Save className="w-4 h-4 mr-2" />
                          Sauvegarder
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Checklist par pièce */}
                <div className="space-y-6">
                  {rooms.map((room) => (
                    <RoomChecklist
                      key={room.id}
                      room={room}
                      items={currentStateOfPlay.rooms[room.id] || []}
                      onUpdateItem={(itemId, updates) => updateChecklistItem(room.id, itemId, updates)}
                      onAddPhoto={(itemId, file, description) => addPhoto(room.id, itemId, file, description)}
                    />
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="pdf" className="space-y-6">
            {currentStateOfPlay && (
              <PDFGenerator
                stateOfPlay={currentStateOfPlay}
                onGenerate={() => toast.success('PDF généré avec succès')}
              />
            )}
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <ComparisonView
              entryStates={entryStates}
              exitStates={exitStates}
              onCompare={(entryId, exitId) => {
                const result = compareStatesOfPlay(entryId, exitId);
                if (result) {
                  toast.success('Comparaison effectuée avec succès');
                }
                return result;
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </ToolContainer>
  );
};

export default StateOfPlayTool;
