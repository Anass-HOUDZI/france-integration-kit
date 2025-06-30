
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GitCompare } from 'lucide-react';
import { StateOfPlay } from '@/hooks/useStateOfPlay';

interface ComparisonViewProps {
  entryStates: StateOfPlay[];
  exitStates: StateOfPlay[];
  onCompare: (entryId: string, exitId: string) => any;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({ 
  entryStates, 
  exitStates, 
  onCompare 
}) => {
  const [selectedEntry, setSelectedEntry] = useState<string>('');
  const [selectedExit, setSelectedExit] = useState<string>('');
  const [comparison, setComparison] = useState<any>(null);

  const handleCompare = () => {
    if (selectedEntry && selectedExit) {
      const result = onCompare(selectedEntry, selectedExit);
      setComparison(result);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitCompare className="w-5 h-5" />
          Comparaison entrée / sortie
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">État d'entrée</label>
            <Select value={selectedEntry} onValueChange={setSelectedEntry}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un état d'entrée" />
              </SelectTrigger>
              <SelectContent>
                {entryStates.map((state) => (
                  <SelectItem key={state.id} value={state.id}>
                    {state.propertyAddress} - {new Date(state.date).toLocaleDateString('fr-FR')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">État de sortie</label>
            <Select value={selectedExit} onValueChange={setSelectedExit}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un état de sortie" />
              </SelectTrigger>
              <SelectContent>
                {exitStates.map((state) => (
                  <SelectItem key={state.id} value={state.id}>
                    {state.propertyAddress} - {new Date(state.date).toLocaleDateString('fr-FR')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={handleCompare}
          disabled={!selectedEntry || !selectedExit}
          className="w-full"
        >
          Comparer les états
        </Button>

        {comparison && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Résultat de la comparaison</h3>
            <p className="text-sm text-gray-600">
              Comparaison entre l'état d'entrée et de sortie du {comparison.entry.propertyAddress}
            </p>
            <div className="mt-4">
              <p className="text-sm">
                <strong>Différences détectées :</strong> {comparison.differences.length}
              </p>
            </div>
          </div>
        )}

        {entryStates.length === 0 && exitStates.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <GitCompare className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Aucun état des lieux sauvegardé pour effectuer une comparaison.</p>
            <p className="text-sm mt-2">Créez d'abord des états d'entrée et de sortie.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ComparisonView;
