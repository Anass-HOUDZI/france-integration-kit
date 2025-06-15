
/**
 * Hook pour la gestion du profil utilisateur
 */
import { useState, useEffect } from 'react';
import { storage, type UserProfile } from '@/services/storage';

export function useUserProfile() {
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(null);
  const [availableProfiles, setAvailableProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = () => {
    setLoading(true);
    try {
      const current = storage.getCurrentUserProfile();
      const profiles = storage.getUserProfiles();
      
      setCurrentProfile(current);
      setAvailableProfiles(profiles);
    } catch (error) {
      console.error('Error loading profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const createProfile = (profileData: Omit<UserProfile, 'id' | 'created' | 'updated'>) => {
    const profile: UserProfile = {
      ...profileData,
      id: `profile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      created: Date.now(),
      updated: Date.now()
    };

    storage.saveUserProfile(profile);
    setCurrentProfile(profile);
    loadProfiles();
    
    return profile;
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!currentProfile) return null;

    const updatedProfile: UserProfile = {
      ...currentProfile,
      ...updates,
      updated: Date.now()
    };

    storage.saveUserProfile(updatedProfile);
    setCurrentProfile(updatedProfile);
    loadProfiles();
    
    return updatedProfile;
  };

  const switchProfile = (profileId: string) => {
    const profile = availableProfiles.find(p => p.id === profileId);
    if (profile) {
      storage.saveUserProfile(profile);
      setCurrentProfile(profile);
    }
  };

  const deleteProfile = (profileId: string) => {
    // Supprimer les données du profil
    storage.remove(`user_profile`);
    
    // Recharger la liste
    loadProfiles();
    
    // Si c'était le profil actuel, le déconnecter
    if (currentProfile?.id === profileId) {
      setCurrentProfile(null);
    }
  };

  const saveToolData = (toolId: string, data: any) => {
    storage.saveToolData(toolId, data);
  };

  const getToolData = <T>(toolId: string, defaultValue?: T): T | null => {
    return storage.getToolData<T>(toolId, defaultValue);
  };

  return {
    currentProfile,
    availableProfiles,
    loading,
    createProfile,
    updateProfile,
    switchProfile,
    deleteProfile,
    saveToolData,
    getToolData,
    hasProfile: !!currentProfile
  };
}
