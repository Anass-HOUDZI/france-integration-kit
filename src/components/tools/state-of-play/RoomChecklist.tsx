
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Camera, MapPin, Eye, Trash2 } from 'lucide-react';
import { Room, ChecklistItem } from '@/hooks/useStateOfPlay';
import PhotoCapture from './PhotoCapture';

interface RoomChecklistProps {
  room: Room;
  items: ChecklistItem[];
  onUpdateItem: (itemId: string, updates: Partial<ChecklistItem>) => void;
  onAddPhoto: (itemId: string, file: File, description: string) => Promise<void>;
}

const conditionLabels = {
  excellent: { label: 'Excellent', color: 'bg-green-500' },
  good: { label: 'Bon', color: 'bg-blue-500' },
  fair: { label: 'Correct', color: 'bg-yellow-500' },
  poor: { label: 'Mauvais', color: 'bg-orange-500' },
  damaged: { label: 'Endommagé', color: 'bg-red-500' }
};

const RoomChecklist: React.FC<RoomChecklistProps> = ({
  room,
  items,
  onUpdateItem,
  onAddPhoto
}) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showPhotoCapture, setShowPhotoCapture] = useState(false);

  const handleConditionChange = (itemId: string, condition: ChecklistItem['condition']) => {
    onUpdateItem(itemId, { condition });
  };

  const handleNotesChange = (itemId: string, notes: string) => {
    onUpdateItem(itemId, { notes });
  };

  const handlePhotoCapture = async (file: File, description: string) => {
    if (selectedItem) {
      await onAddPhoto(selectedItem, file, description);
      setShowPhotoCapture(false);
      setSelectedItem(null);
    }
  };

  const removePhoto = (itemId: string, photoId: string) => {
    const item = items.find(i => i.id === itemId);
    if (item) {
      const updatedPhotos = item.photos.filter(p => p.id !== photoId);
      onUpdateItem(itemId, { photos: updatedPhotos });
    }
  };

  const completedItems = items.filter(item => item.condition !== null).length;
  const totalItems = items.length;
  const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            {room.name}
            <Badge variant="outline">
              {completedItems}/{totalItems} éléments
            </Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <span className="text-sm text-gray-600">{completionPercentage}%</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <Label className="text-base font-medium">{item.label}</Label>
                <Badge variant="outline" className="ml-2 text-xs">
                  {item.category}
                </Badge>
              </div>
              
              <Select
                value={item.condition || ''}
                onValueChange={(value) => handleConditionChange(item.id, value as ChecklistItem['condition'])}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="État" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(conditionLabels).map(([key, { label, color }]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${color}`} />
                        {label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {item.condition && (
              <div className="space-y-3">
                <div>
                  <Label htmlFor={`notes-${item.id}`}>Observations</Label>
                  <Textarea
                    id={`notes-${item.id}`}
                    placeholder="Détails, défauts observés..."
                    value={item.notes}
                    onChange={(e) => handleNotesChange(item.id, e.target.value)}
                    className="mt-1"
                    rows={2}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedItem(item.id);
                      setShowPhotoCapture(true);
                    }}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Ajouter photo ({item.photos.length})
                  </Button>
                </div>

                {item.photos.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {item.photos.map((photo) => (
                      <div key={photo.id} className="relative group">
                        <img
                          src={photo.url}
                          alt={photo.description}
                          className="w-full h-20 object-cover rounded border"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 flex gap-1">
                            {photo.location && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-white p-1 h-auto"
                                onClick={() => {
                                  window.open(
                                    `https://maps.google.com?q=${photo.location!.latitude},${photo.location!.longitude}`,
                                    '_blank'
                                  );
                                }}
                              >
                                <MapPin className="w-3 h-3" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-white p-1 h-auto"
                              onClick={() => window.open(photo.url, '_blank')}
                            >
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-white p-1 h-auto"
                              onClick={() => removePhoto(item.id, photo.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="absolute bottom-0 inset-x-0 bg-black bg-opacity-75 text-white text-xs p-1 rounded-b">
                          <div className="truncate">{photo.description}</div>
                          <div className="flex justify-between text-xs opacity-75">
                            <span>{new Date(photo.timestamp).toLocaleDateString()}</span>
                            {photo.location && <MapPin className="w-3 h-3" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {showPhotoCapture && selectedItem && (
          <PhotoCapture
            onCapture={handlePhotoCapture}
            onCancel={() => {
              setShowPhotoCapture(false);
              setSelectedItem(null);
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default RoomChecklist;
