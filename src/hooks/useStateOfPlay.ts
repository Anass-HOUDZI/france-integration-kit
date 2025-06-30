
import { useState, useEffect } from 'react';

export interface Room {
  id: string;
  name: string;
  type: 'living' | 'bedroom' | 'kitchen' | 'bathroom' | 'other';
}

export interface ChecklistItem {
  id: string;
  category: string;
  description: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor' | 'damaged';
  photos: string[];
  notes?: string;
}

export interface StateOfPlay {
  id: string;
  type: 'entry' | 'exit';
  date: string;
  propertyAddress: string;
  tenantName: string;
  landlordName: string;
  rooms: Record<string, ChecklistItem[]>;
  completed: boolean;
}

export const useStateOfPlay = () => {
  const [currentStateOfPlay, setCurrentStateOfPlay] = useState<StateOfPlay | null>(null);
  const [savedStatesOfPlay, setSavedStatesOfPlay] = useState<StateOfPlay[]>([]);
  const [rooms, setRooms] = useState<Room[]>([
    { id: 'living', name: 'Salon', type: 'living' },
    { id: 'kitchen', name: 'Cuisine', type: 'kitchen' },
    { id: 'bedroom1', name: 'Chambre 1', type: 'bedroom' },
    { id: 'bathroom', name: 'Salle de bain', type: 'bathroom' }
  ]);
  const [comparison, setComparison] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('statesOfPlay');
    if (saved) {
      setSavedStatesOfPlay(JSON.parse(saved));
    }
  }, []);

  const createNewStateOfPlay = (type: 'entry' | 'exit', details: any) => {
    const newState: StateOfPlay = {
      id: `state-${Date.now()}`,
      type,
      date: new Date().toISOString(),
      propertyAddress: details.address,
      tenantName: details.tenantName,
      landlordName: details.landlordName,
      rooms: {},
      completed: false
    };
    setCurrentStateOfPlay(newState);
  };

  const updateChecklistItem = (roomId: string, itemId: string, updates: Partial<ChecklistItem>) => {
    if (!currentStateOfPlay) return;
    
    setCurrentStateOfPlay(prev => ({
      ...prev!,
      rooms: {
        ...prev!.rooms,
        [roomId]: (prev!.rooms[roomId] || []).map(item =>
          item.id === itemId ? { ...item, ...updates } : item
        )
      }
    }));
  };

  const addPhoto = (roomId: string, itemId: string, file: File, description: string) => {
    // Simulation de l'ajout de photo
    const photoUrl = URL.createObjectURL(file);
    updateChecklistItem(roomId, itemId, {
      photos: [...((currentStateOfPlay?.rooms[roomId]?.find(i => i.id === itemId)?.photos) || []), photoUrl]
    });
  };

  const saveStateOfPlay = () => {
    if (!currentStateOfPlay) return;
    
    const completed = { ...currentStateOfPlay, completed: true };
    const updated = savedStatesOfPlay.filter(s => s.id !== completed.id);
    updated.push(completed);
    
    setSavedStatesOfPlay(updated);
    localStorage.setItem('statesOfPlay', JSON.stringify(updated));
  };

  const loadStateOfPlay = (id: string) => {
    const state = savedStatesOfPlay.find(s => s.id === id);
    if (state) {
      setCurrentStateOfPlay({ ...state, completed: false });
    }
  };

  const compareStatesOfPlay = (entryId: string, exitId: string) => {
    const entry = savedStatesOfPlay.find(s => s.id === entryId);
    const exit = savedStatesOfPlay.find(s => s.id === exitId);
    
    if (entry && exit) {
      const result = {
        entry,
        exit,
        differences: [] as any[]
      };
      setComparison(result);
      return result;
    }
    return null;
  };

  const addRoom = (name: string, type: Room['type']) => {
    const newRoom: Room = {
      id: `room-${Date.now()}`,
      name,
      type
    };
    setRooms(prev => [...prev, newRoom]);
  };

  return {
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
  };
};
