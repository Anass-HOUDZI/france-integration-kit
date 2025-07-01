
import { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export interface Room {
  id: string;
  name: string;
  type: 'living' | 'bedroom' | 'kitchen' | 'bathroom' | 'other';
}

export interface ChecklistItem {
  id: string;
  label: string;
  category: 'walls' | 'floor' | 'ceiling' | 'equipment' | 'fixtures';
  condition: 'excellent' | 'good' | 'fair' | 'poor' | 'damaged' | null;
  notes: string;
  photos: Photo[];
}

export interface Photo {
  id: string;
  url: string;
  timestamp: number;
  location?: {
    latitude: number;
    longitude: number;
  };
  description: string;
}

export interface StateOfPlay {
  id: string;
  type: 'entry' | 'exit';
  propertyAddress: string;
  tenantName: string;
  landlordName: string;
  date: string;
  rooms: Record<string, ChecklistItem[]>;
  photos: Photo[];
  completed: boolean;
  signature?: string;
}

export interface Comparison {
  entryId: string;
  exitId: string;
  damages: Array<{
    roomId: string;
    itemId: string;
    description: string;
    estimatedCost: number;
  }>;
  totalDeduction: number;
}

const defaultRooms: Room[] = [
  { id: 'living', name: 'Salon', type: 'living' },
  { id: 'kitchen', name: 'Cuisine', type: 'kitchen' },
  { id: 'bedroom1', name: 'Chambre 1', type: 'bedroom' },
  { id: 'bathroom', name: 'Salle de bain', type: 'bathroom' },
  { id: 'entrance', name: 'Entrée', type: 'other' }
];

const getDefaultChecklist = (roomType: Room['type']): ChecklistItem[] => {
  const baseItems: ChecklistItem[] = [
    {
      id: 'walls',
      label: 'État des murs',
      category: 'walls',
      condition: null,
      notes: '',
      photos: []
    },
    {
      id: 'floor',
      label: 'État du sol',
      category: 'floor',
      condition: null,
      notes: '',
      photos: []
    },
    {
      id: 'ceiling',
      label: 'État du plafond',
      category: 'ceiling',
      condition: null,
      notes: '',
      photos: []
    }
  ];

  const specificItems: Record<Room['type'], ChecklistItem[]> = {
    kitchen: [
      {
        id: 'appliances',
        label: 'Électroménager',
        category: 'equipment',
        condition: null,
        notes: '',
        photos: []
      },
      {
        id: 'sink',
        label: 'Évier et robinetterie',
        category: 'fixtures',
        condition: null,
        notes: '',
        photos: []
      }
    ],
    bathroom: [
      {
        id: 'shower',
        label: 'Douche/Baignoire',
        category: 'fixtures',
        condition: null,
        notes: '',
        photos: []
      },
      {
        id: 'toilet',
        label: 'WC',
        category: 'fixtures',
        condition: null,
        notes: '',
        photos: []
      }
    ],
    bedroom: [
      {
        id: 'closet',
        label: 'Placards',
        category: 'fixtures',
        condition: null,
        notes: '',
        photos: []
      }
    ],
    living: [
      {
        id: 'windows',
        label: 'Fenêtres',
        category: 'fixtures',
        condition: null,
        notes: '',
        photos: []
      }
    ],
    other: []
  };

  return [...baseItems, ...specificItems[roomType]];
};

export function useStateOfPlay() {
  const [currentStateOfPlay, setCurrentStateOfPlay] = useState<StateOfPlay | null>(null);
  const [savedStatesOfPlay, setSavedStatesOfPlay] = useLocalStorage<StateOfPlay[]>('states-of-play', []);
  const [rooms, setRooms] = useState<Room[]>(defaultRooms);
  const [comparison, setComparison] = useState<Comparison | null>(null);

  const createNewStateOfPlay = (type: 'entry' | 'exit', propertyData: {
    address: string;
    tenantName: string;
    landlordName: string;
  }): StateOfPlay => {
    const newId = `state-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const roomsData: Record<string, ChecklistItem[]> = {};
    
    rooms.forEach(room => {
      roomsData[room.id] = getDefaultChecklist(room.type);
    });

    const newStateOfPlay: StateOfPlay = {
      id: newId,
      type,
      propertyAddress: propertyData.address,
      tenantName: propertyData.tenantName,
      landlordName: propertyData.landlordName,
      date: new Date().toISOString().split('T')[0],
      rooms: roomsData,
      photos: [],
      completed: false
    };

    setCurrentStateOfPlay(newStateOfPlay);
    return newStateOfPlay;
  };

  const updateChecklistItem = (roomId: string, itemId: string, updates: Partial<ChecklistItem>) => {
    if (!currentStateOfPlay) return;

    const updatedStateOfPlay = {
      ...currentStateOfPlay,
      rooms: {
        ...currentStateOfPlay.rooms,
        [roomId]: currentStateOfPlay.rooms[roomId].map(item =>
          item.id === itemId ? { ...item, ...updates } : item
        )
      }
    };

    setCurrentStateOfPlay(updatedStateOfPlay);
  };

  const addPhoto = async (roomId: string, itemId: string, file: File, description: string) => {
    const photoId = `photo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Créer l'URL de l'image
    const url = URL.createObjectURL(file);
    
    // Tenter d'obtenir la géolocalisation
    let location: { latitude: number; longitude: number } | undefined;
    
    try {
      if (navigator.geolocation) {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 5000,
            enableHighAccuracy: true
          });
        });
        
        location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
      }
    } catch (error) {
      console.warn('Impossible d\'obtenir la géolocalisation:', error);
    }

    const newPhoto: Photo = {
      id: photoId,
      url,
      timestamp: Date.now(),
      location,
      description
    };

    if (!currentStateOfPlay) return;

    const updatedStateOfPlay = {
      ...currentStateOfPlay,
      rooms: {
        ...currentStateOfPlay.rooms,
        [roomId]: currentStateOfPlay.rooms[roomId].map(item =>
          item.id === itemId 
            ? { ...item, photos: [...item.photos, newPhoto] }
            : item
        )
      },
      photos: [...currentStateOfPlay.photos, newPhoto]
    };

    setCurrentStateOfPlay(updatedStateOfPlay);
  };

  const saveStateOfPlay = () => {
    if (!currentStateOfPlay) return;

    const updatedStateOfPlay = {
      ...currentStateOfPlay,
      completed: true
    };

    const existingIndex = savedStatesOfPlay.findIndex(s => s.id === currentStateOfPlay.id);
    
    if (existingIndex >= 0) {
      const updated = [...savedStatesOfPlay];
      updated[existingIndex] = updatedStateOfPlay;
      setSavedStatesOfPlay(updated);
    } else {
      setSavedStatesOfPlay([...savedStatesOfPlay, updatedStateOfPlay]);
    }

    setCurrentStateOfPlay(updatedStateOfPlay);
  };

  const loadStateOfPlay = (id: string) => {
    const stateOfPlay = savedStatesOfPlay.find(s => s.id === id);
    if (stateOfPlay) {
      setCurrentStateOfPlay(stateOfPlay);
    }
  };

  const compareStatesOfPlay = (entryId: string, exitId: string): Comparison | null => {
    const entryState = savedStatesOfPlay.find(s => s.id === entryId && s.type === 'entry');
    const exitState = savedStatesOfPlay.find(s => s.id === exitId && s.type === 'exit');

    if (!entryState || !exitState) return null;

    const damages: Comparison['damages'] = [];
    let totalCost = 0;

    // Comparer chaque pièce et élément
    Object.keys(entryState.rooms).forEach(roomId => {
      const entryItems = entryState.rooms[roomId];
      const exitItems = exitState.rooms[roomId] || [];

      entryItems.forEach(entryItem => {
        const exitItem = exitItems.find(item => item.id === entryItem.id);
        
        if (exitItem && entryItem.condition !== exitItem.condition) {
          // Calculer le coût estimé selon la dégradation
          const costMap = {
            'excellent': { 'good': 0, 'fair': 50, 'poor': 100, 'damaged': 200 },
            'good': { 'fair': 30, 'poor': 80, 'damaged': 150 },
            'fair': { 'poor': 50, 'damaged': 100 },
            'poor': { 'damaged': 50 }
          };

          const estimatedCost = entryItem.condition && exitItem.condition 
            ? (costMap[entryItem.condition]?.[exitItem.condition] || 0)
            : 0;

          if (estimatedCost > 0) {
            damages.push({
              roomId,
              itemId: entryItem.id,
              description: `${entryItem.label}: ${entryItem.condition} → ${exitItem.condition}`,
              estimatedCost
            });
            totalCost += estimatedCost;
          }
        }
      });
    });

    const comparisonResult: Comparison = {
      entryId,
      exitId,
      damages,
      totalDeduction: totalCost
    };

    setComparison(comparisonResult);
    return comparisonResult;
  };

  const addRoom = (name: string, type: Room['type']) => {
    const newRoom: Room = {
      id: `room-${Date.now()}`,
      name,
      type
    };
    setRooms([...rooms, newRoom]);

    if (currentStateOfPlay) {
      const updatedStateOfPlay = {
        ...currentStateOfPlay,
        rooms: {
          ...currentStateOfPlay.rooms,
          [newRoom.id]: getDefaultChecklist(type)
        }
      };
      setCurrentStateOfPlay(updatedStateOfPlay);
    }
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
    addRoom,
    setCurrentStateOfPlay
  };
}
