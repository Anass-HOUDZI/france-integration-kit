
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChecklistItem, Room } from '@/hooks/useStateOfPlay';

interface RoomChecklistProps {
  room: Room;
  items: ChecklistItem[];
  onUpdateItem: (itemId: string, updates: Partial<ChecklistItem>) => void;
  onAddPhoto: (itemId: string, file: File, description: string) => void;
}

const RoomChecklist: React.FC<RoomChecklistProps> = ({ 
  room, 
  items, 
  onUpdateItem, 
  onAddPhoto 
}) => {
  const defaultItems: Omit<ChecklistItem, 'id'>[] = [
    { category: 'Murs', description: 'État des murs', condition: 'good', photos: [] },
    { category: 'Sol', description: 'État du sol', condition: 'good', photos: [] },
    { category: 'Plafond', description: 'État du plafond', condition: 'good', photos: [] },
    { category: 'Éclairage', description: 'Fonctionnement éclairage', condition: 'good', photos: [] },
  ];

  const currentItems = items.length > 0 ? items : defaultItems.map((item, index) => ({
    ...item,
    id: `${room.id}-item-${index}`
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {currentItems.map((item) => (
            <div key={item.id} className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">{item.category}</h4>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm">État :</label>
                <select 
                  value={item.condition}
                  onChange={(e) => onUpdateItem(item.id, { condition: e.target.value as any })}
                  className="px-2 py-1 border rounded text-sm"
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Bon</option>
                  <option value="fair">Correct</option>
                  <option value="poor">Mauvais</option>
                  <option value="damaged">Endommagé</option>
                </select>
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    onAddPhoto(item.id, file, item.description);
                  }
                }}
                className="text-sm"
              />
              
              {item.photos.length > 0 && (
                <div className="mt-2">
                  <span className="text-sm text-green-600">
                    {item.photos.length} photo(s) ajoutée(s)
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomChecklist;
