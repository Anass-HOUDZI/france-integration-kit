
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';
import { StateOfPlay } from '@/hooks/useStateOfPlay';

interface PDFGeneratorProps {
  stateOfPlay: StateOfPlay;
  onGenerate: () => void;
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ stateOfPlay, onGenerate }) => {
  const handleGeneratePDF = () => {
    // Simulation de génération PDF
    console.log('Génération PDF pour:', stateOfPlay);
    onGenerate();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Génération PDF officiel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium mb-2">Aperçu du document</h3>
          <div className="text-sm space-y-1">
            <div><strong>Type :</strong> État des lieux {stateOfPlay.type === 'entry' ? 'd\'entrée' : 'de sortie'}</div>
            <div><strong>Adresse :</strong> {stateOfPlay.propertyAddress}</div>
            <div><strong>Locataire :</strong> {stateOfPlay.tenantName}</div>
            <div><strong>Propriétaire :</strong> {stateOfPlay.landlordName}</div>
            <div><strong>Date :</strong> {new Date(stateOfPlay.date).toLocaleDateString('fr-FR')}</div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Contenu inclus :</h4>
          <ul className="text-sm space-y-1 ml-4">
            <li>• Informations générales du bien</li>
            <li>• Détail par pièce avec état</li>
            <li>• Photos géolocalisées</li>
            <li>• Signatures électroniques</li>
            <li>• Conformité légale française</li>
          </ul>
        </div>

        <Button onClick={handleGeneratePDF} className="w-full" size="lg">
          <Download className="w-4 h-4 mr-2" />
          Générer le PDF officiel
        </Button>
      </CardContent>
    </Card>
  );
};

export default PDFGenerator;
