
/**
 * Hook pour la gestion centralisée des données d'outils
 */
import { useState, useEffect } from 'react';
import { ToolFormData, ToolResult } from '@/types/tools';

export function useToolData(toolId: string) {
  const [formData, setFormData] = useState<ToolFormData>({});
  const [result, setResult] = useState<ToolResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Charger les données sauvegardées
  useEffect(() => {
    const savedData = localStorage.getItem(`tool_data_${toolId}`);
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (error) {
        console.warn(`Erreur lors du chargement des données pour ${toolId}:`, error);
      }
    }
  }, [toolId]);

  // Sauvegarder automatiquement
  useEffect(() => {
    if (isDirty && Object.keys(formData).length > 0) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem(`tool_data_${toolId}`, JSON.stringify(formData));
        setIsDirty(false);
      }, 1000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [formData, isDirty, toolId]);

  const updateFormData = (data: Partial<ToolFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    setIsDirty(true);
  };

  const clearFormData = () => {
    setFormData({});
    localStorage.removeItem(`tool_data_${toolId}`);
  };

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const setToolResult = (toolResult: ToolResult) => {
    setResult(toolResult);
  };

  return {
    formData,
    result,
    isLoading,
    isDirty,
    updateFormData,
    clearFormData,
    setLoading,
    setToolResult
  };
}
