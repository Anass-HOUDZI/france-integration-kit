
/**
 * Service de stockage local sécurisé avec chiffrement
 */

interface StorageItem {
  data: any;
  timestamp: number;
  encrypted?: boolean;
}

interface UserProfile {
  id: string;
  name: string;
  status: 'student' | 'worker' | 'family' | 'jobseeker' | 'retiree';
  languages: string[];
  region?: string;
  created: number;
  updated: number;
}

class SecureStorage {
  private readonly ENCRYPTION_KEY = 'integration-france-v1';
  
  // Stockage simple pour données non-sensibles
  set(key: string, value: any): void {
    try {
      const item: StorageItem = {
        data: value,
        timestamp: Date.now()
      };
      localStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.error('Storage error:', error);
    }
  }

  get<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(key);
      if (!item) return defaultValue || null;
      
      const parsed: StorageItem = JSON.parse(item);
      return parsed.data;
    } catch (error) {
      console.error('Storage retrieval error:', error);
      return defaultValue || null;
    }
  }

  // Stockage chiffré pour données sensibles
  setSecure(key: string, value: any): void {
    try {
      const encrypted = this.encrypt(JSON.stringify(value));
      const item: StorageItem = {
        data: encrypted,
        timestamp: Date.now(),
        encrypted: true
      };
      localStorage.setItem(`secure_${key}`, JSON.stringify(item));
    } catch (error) {
      console.error('Secure storage error:', error);
    }
  }

  getSecure<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(`secure_${key}`);
      if (!item) return defaultValue || null;
      
      const parsed: StorageItem = JSON.parse(item);
      const decrypted = this.decrypt(parsed.data);
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Secure storage retrieval error:', error);
      return defaultValue || null;
    }
  }

  remove(key: string): void {
    localStorage.removeItem(key);
    localStorage.removeItem(`secure_${key}`);
  }

  clear(): void {
    localStorage.clear();
  }

  // Chiffrement simple pour démonstration (à améliorer en production)
  private encrypt(text: string): string {
    return btoa(text);
  }

  private decrypt(text: string): string {
    return atob(text);
  }

  // Gestion des profils utilisateur
  saveUserProfile(profile: UserProfile): void {
    this.setSecure('user_profile', profile);
    
    // Sauvegarder aussi la liste des profils
    const profiles = this.getUserProfiles();
    const existingIndex = profiles.findIndex(p => p.id === profile.id);
    
    if (existingIndex >= 0) {
      profiles[existingIndex] = profile;
    } else {
      profiles.push(profile);
    }
    
    this.set('user_profiles_list', profiles.map(p => ({
      id: p.id,
      name: p.name,
      status: p.status,
      updated: p.updated
    })));
  }

  getCurrentUserProfile(): UserProfile | null {
    return this.getSecure<UserProfile>('user_profile');
  }

  getUserProfiles(): UserProfile[] {
    return this.get('user_profiles_list', []);
  }

  // Gestion des données d'outils
  saveToolData(toolId: string, data: any): void {
    const profile = this.getCurrentUserProfile();
    if (!profile) return;
    
    const key = `tool_data_${profile.id}_${toolId}`;
    this.setSecure(key, {
      ...data,
      saved: Date.now()
    });
  }

  getToolData<T>(toolId: string, defaultValue?: T): T | null {
    const profile = this.getCurrentUserProfile();
    if (!profile) return defaultValue || null;
    
    const key = `tool_data_${profile.id}_${toolId}`;
    return this.getSecure<T>(key, defaultValue);
  }
}

export const storage = new SecureStorage();
export type { UserProfile, StorageItem };
