
/**
 * Hook pour la gestion du profil utilisateur
 */
import { useState, useEffect } from 'react';
import { storage, type UserProfile } from '@/services/storage';

export function useUserProfile() {
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(null);
  const [availableProfiles, setAvailableProfiles] = useState<UserProfile[]>([]);
  const [diagnostic, setDiagnostic] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [favoriteTools, setFavoriteTools] = useState<string[]>([]);

  useEffect(() => {
    loadProfiles();
    loadDiagnostic();
  }, []);

  useEffect(() => {
    if (currentProfile) {
      const favs = storage.getToolData<string[]>('favorite_tools', []);
      setFavoriteTools(favs || []);
    } else {
      setFavoriteTools([]);
    }
  }, [currentProfile]);

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

  const loadDiagnostic = () => {
    try {
      const savedDiagnostic = storage.get('current_diagnostic');
      setDiagnostic(savedDiagnostic);
    } catch (error) {
      console.error('Error loading diagnostic:', error);
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

  const saveProfile = (profileData: any) => {
    return createProfile(profileData);
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

  const saveDiagnostic = (diagnosticData: any) => {
    storage.set('current_diagnostic', diagnosticData);
    setDiagnostic(diagnosticData);
  };

  const switchProfile = (profileId: string) => {
    const profile = availableProfiles.find(p => p.id === profileId);
    if (profile) {
      storage.saveUserProfile(profile);
      setCurrentProfile(profile);
    }
  };

  const deleteProfile = (profileId: string) => {
    storage.remove(`user_profile`);
    loadProfiles();
    
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

  const toggleFavoriteTool = (toolId: string) => {
    const newFavorites = favoriteTools.includes(toolId)
      ? favoriteTools.filter(id => id !== toolId)
      : [...favoriteTools, toolId];
    setFavoriteTools(newFavorites);
    saveToolData('favorite_tools', newFavorites);
  };

  return {
    currentProfile,
    availableProfiles,
    diagnostic,
    loading,
    createProfile,
    saveProfile,
    saveDiagnostic,
    updateProfile,
    switchProfile,
    deleteProfile,
    saveToolData,
    getToolData,
    favoriteTools,
    toggleFavoriteTool,
    hasProfile: !!currentProfile
  };
}
