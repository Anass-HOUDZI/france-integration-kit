
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Printer } from 'lucide-react';
import { StateOfPlay } from '@/hooks/useStateOfPlay';

interface PDFGeneratorProps {
  stateOfPlay: StateOfPlay;
  onGenerate: () => void;
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ stateOfPlay, onGenerate }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      // Import jsPDF dynamically
      const { default: jsPDF } = await import('jspdf');
      const doc = new jsPDF();

      // Configuration
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      let yPosition = margin;

      // Fonction pour ajouter du texte avec saut de page automatique
      const addText = (text: string, fontSize = 12, isBold = false) => {
        if (yPosition > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }
        
        doc.setFontSize(fontSize);
        if (isBold) {
          doc.setFont(undefined, 'bold');
        } else {
          doc.setFont(undefined, 'normal');
        }
        
        doc.text(text, margin, yPosition);
        yPosition += fontSize * 0.5 + 5;
      };

      // En-tête
      addText('ÉTAT DES LIEUX', 20, true);
      addText(`Type: ${stateOfPlay.type === 'entry' ? 'ENTRÉE' : 'SORTIE'}`, 16, true);
      yPosition += 10;

      // Informations générales
      addText('INFORMATIONS GÉNÉRALES', 14, true);
      addText(`Adresse du bien: ${stateOfPlay.propertyAddress}`);
      addText(`Locataire: ${stateOfPlay.tenantName}`);
      addText(`Propriétaire/Agent: ${stateOfPlay.landlordName}`);
      addText(`Date: ${new Date(stateOfPlay.date).toLocaleDateString('fr-FR')}`);
      yPosition += 10;

      // Détail par pièce
      Object.entries(stateOfPlay.rooms).forEach(([roomId, items]) => {
        const roomName = roomId.charAt(0).toUpperCase() + roomId.slice(1);
        
        addText(`PIÈCE: ${roomName.toUpperCase()}`, 14, true);
        yPosition += 5;

        items.forEach(item => {
          const conditionText = item.condition ? 
            {
              excellent: 'Excellent',
              good: 'Bon',
              fair: 'Correct',
              poor: 'Mauvais',
              damaged: 'Endommagé'
            }[item.condition] : 'Non évalué';

          addText(`• ${item.label}: ${conditionText}`);
          
          if (item.notes) {
            addText(`  Notes: ${item.notes}`, 10);
          }
          
          if (item.photos.length > 0) {
            addText(`  Photos: ${item.photos.length} photo(s) jointe(s)`, 10);
          }
        });
        
        yPosition += 10;
      });

      // Résumé
      const totalItems = Object.values(stateOfPlay.rooms).flat().length;
      const completedItems = Object.values(stateOfPlay.rooms).flat().filter(item => item.condition !== null).length;
      
      addText('RÉSUMÉ', 14, true);
      addText(`Éléments évalués: ${completedItems}/${totalItems}`);
      addText(`Pourcentage de complétion: ${Math.round((completedItems / totalItems) * 100)}%`);
      addText(`Nombre total de photos: ${stateOfPlay.photos.length}`);

      if (stateOfPlay.type === 'entry') {
        yPosition += 15;
        addText('SIGNATURES', 14, true);
        addText('Locataire: ________________________   Date: ___________');
        yPosition += 15;
        addText('Propriétaire/Agent: _______________   Date: ___________');
      }

      // Pied de page
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.text(
          `Page ${i}/${pageCount} - État des lieux généré le ${new Date().toLocaleDateString('fr-FR')}`,
          margin,
          pageHeight - 10
        );
      }

      // Télécharger le PDF
      const fileName = `etat_des_lieux_${stateOfPlay.type}_${stateOfPlay.date}.pdf`;
      doc.save(fileName);

      onGenerate();
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const totalItems = Object.values(stateOfPlay.rooms).flat().length;
  const completedItems = Object.values(stateOfPlay.rooms).flat().filter(item => item.condition !== null).length;
  const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Génération PDF
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{completedItems}/{totalItems}</div>
            <div className="text-sm text-gray-600">Éléments évalués</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{stateOfPlay.photos.length}</div>
            <div className="text-sm text-gray-600">Photos jointes</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progression globale</span>
            <span>{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Informations incluses:</div>
          <div className="space-y-1">
            <Badge variant="outline">Données générales</Badge>
            <Badge variant="outline">État par pièce</Badge>
            <Badge variant="outline">Observations détaillées</Badge>
            <Badge variant="outline">Référencement photos</Badge>
            {stateOfPlay.type === 'entry' && (
              <Badge variant="outline">Espaces signatures</Badge>
            )}
          </div>
        </div>

        <Button 
          onClick={generatePDF}
          disabled={isGenerating || completedItems === 0}
          className="w-full"
        >
          <Download className="w-4 h-4 mr-2" />
          {isGenerating ? 'Génération...' : 'Télécharger PDF officiel'}
        </Button>

        {completedItems === 0 && (
          <p className="text-sm text-amber-600 text-center">
            Évaluez au moins un élément pour générer le PDF
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default PDFGenerator;
