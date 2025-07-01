
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { GitCompare, Euro, AlertTriangle, CheckCircle, FileText } from 'lucide-react';
import { StateOfPlay, Comparison, useStateOfPlay } from '@/hooks/useStateOfPlay';

interface ComparisonViewProps {
  entryStates: StateOfPlay[];
  exitStates: StateOfPlay[];
  onCompare: (entryId: string, exitId: string) => Comparison | null;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({
  entryStates,
  exitStates,
  onCompare
}) => {
  const [selectedEntry, setSelectedEntry] = useState<string>('');
  const [selectedExit, setSelectedExit] = useState<string>('');
  const [comparison, setComparison] = useState<Comparison | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleCompare = () => {
    if (selectedEntry && selectedExit) {
      const result = onCompare(selectedEntry, selectedExit);
      setComparison(result);
      setShowDetails(true);
    }
  };

  const generateComparisonReport = async () => {
    if (!comparison) return;

    try {
      const { default: jsPDF } = await import('jspdf');
      const doc = new jsPDF();

      const entryState = entryStates.find(s => s.id === comparison.entryId);
      const exitState = exitStates.find(s => s.id === comparison.exitId);

      if (!entryState || !exitState) return;

      let yPosition = 20;
      const margin = 20;
      const pageHeight = doc.internal.pageSize.getHeight();

      const addText = (text: string, fontSize = 12, isBold = false) => {
        if (yPosition > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }
        doc.setFontSize(fontSize);
        doc.setFont(undefined, isBold ? 'bold' : 'normal');
        doc.text(text, margin, yPosition);
        yPosition += fontSize * 0.5 + 5;
      };

      // En-tête
      addText('RAPPORT DE COMPARAISON ÉTAT DES LIEUX', 18, true);
      addText(`Propriété: ${entryState.propertyAddress}`, 12);
      addText(`Locataire: ${entryState.tenantName}`, 12);
      yPosition += 10;

      // Informations des états
      addText('ÉTATS COMPARÉS', 14, true);
      addText(`État d'entrée: ${new Date(entryState.date).toLocaleDateString('fr-FR')}`);
      addText(`État de sortie: ${new Date(exitState.date).toLocaleDateString('fr-FR')}`);
      yPosition += 10;

      // Résumé des dégradations
      addText('RÉSUMÉ DES DÉGRADATIONS', 14, true);
      addText(`Nombre de dégradations détectées: ${comparison.damages.length}`);
      addText(`Montant total estimé: ${comparison.totalDeduction}€`, 12, true);
      yPosition += 10;

      if (comparison.damages.length > 0) {
        addText('DÉTAIL DES DÉGRADATIONS', 14, true);
        comparison.damages.forEach((damage, index) => {
          addText(`${index + 1}. ${damage.description}`);
          addText(`   Coût estimé: ${damage.estimatedCost}€`);
        });
      } else {
        addText('Aucune dégradation détectée', 12, true);
      }

      yPosition += 20;
      addText('RECOMMANDATIONS', 14, true);
      if (comparison.totalDeduction > 0) {
        addText('• Retenue sur dépôt de garantie recommandée');
        addText('• Vérifier les clauses du bail concernant les réparations');
        addText('• Obtenir des devis précis pour les réparations importantes');
      } else {
        addText('• Aucune retenue recommandée sur le dépôt de garantie');
        addText('• État du logement conforme aux standards');
      }

      const fileName = `comparaison_etat_des_lieux_${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);
    } catch (error) {
      console.error('Erreur lors de la génération du rapport:', error);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitCompare className="w-5 h-5" />
            Comparaison Entrée/Sortie
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">État d'entrée</label>
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
              <label className="text-sm font-medium">État de sortie</label>
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
            <GitCompare className="w-4 h-4 mr-2" />
            Comparer les états
          </Button>
        </CardContent>
      </Card>

      {comparison && showDetails && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Résultats de la comparaison
              </span>
              <Badge variant={comparison.totalDeduction > 0 ? "destructive" : "default"}>
                {comparison.totalDeduction > 0 ? "Dégradations détectées" : "Aucune dégradation"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Résumé financier */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-700">{comparison.damages.length}</div>
                <div className="text-sm text-gray-600">Dégradations</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{comparison.totalDeduction}€</div>
                <div className="text-sm text-gray-600">Retenue estimée</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {comparison.totalDeduction > 0 ? Math.round((comparison.totalDeduction / 1000) * 100) : 0}%
                </div>
                <div className="text-sm text-gray-600">Du dépôt (sur 1000€)</div>
              </div>
            </div>

            {/* Détail des dégradations */}
            {comparison.damages.length > 0 ? (
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  Dégradations détectées
                </h4>
                <div className="space-y-3">
                  {comparison.damages.map((damage, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-medium">{damage.description}</div>
                          <div className="text-sm text-gray-600 mt-1">
                            Pièce: {damage.roomId}
                          </div>
                        </div>
                        <Badge variant="destructive">
                          {damage.estimatedCost}€
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
                <h4 className="font-semibold text-green-700 mb-2">Aucune dégradation détectée</h4>
                <p className="text-gray-600">
                  Le logement est dans le même état qu'à l'entrée. 
                  Aucune retenue sur le dépôt de garantie n'est recommandée.
                </p>
              </div>
            )}

            <Separator />

            {/* Actions */}
            <div className="flex gap-2">
              <Button onClick={generateComparisonReport} className="flex-1">
                <FileText className="w-4 h-4 mr-2" />
                Générer rapport PDF
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowDetails(false)}
              >
                Fermer
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ComparisonView;
