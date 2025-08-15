import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckSquare, AlertTriangle, CheckCircle, Upload, Download } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import ToolContainer from '@/components/tools/ToolContainer';
import { toast } from 'sonner';

interface DocumentCheckerToolProps {
  userProfile: any;
  diagnostic: any;
  onBack?: () => void;
}

interface Document {
  id: string;
  name: string;
  required: boolean;
  checked: boolean;
  valid: boolean;
  expires?: string;
}

const DocumentCheckerTool: React.FC<DocumentCheckerToolProps> = ({ userProfile, diagnostic, onBack }) => {
  const { t } = useI18n();
  const [selectedProcedure, setSelectedProcedure] = useState('');
  const [documents, setDocuments] = useState<Document[]>([]);

  const procedures = [
    { 
      id: 'titre_sejour', 
      name: 'Demande de titre de séjour',
      docs: [
        { id: 'passeport', name: 'Passeport en cours de validité', required: true },
        { id: 'visa', name: 'Visa d\'entrée en France', required: true },
        { id: 'photos', name: '3 photos d\'identité récentes', required: true },
        { id: 'justif_domicile', name: 'Justificatif de domicile < 3 mois', required: true },
        { id: 'justif_ressources', name: 'Justificatifs de ressources', required: true },
        { id: 'acte_naissance', name: 'Acte de naissance traduit', required: false }
      ]
    },
    {
      id: 'naturalisation',
      name: 'Demande de naturalisation',
      docs: [
        { id: 'titre_sejour_valid', name: 'Titre de séjour en cours', required: true },
        { id: 'justif_residence', name: 'Justificatifs de résidence 5 ans', required: true },
        { id: 'fiche_paie', name: '3 dernières fiches de paie', required: true },
        { id: 'avis_impots', name: 'Avis d\'imposition N-1', required: true },
        { id: 'casier_judiciaire', name: 'Extrait casier judiciaire pays origine', required: true }
      ]
    }
  ];

  const handleProcedureSelect = (procedureId: string) => {
    setSelectedProcedure(procedureId);
    const procedure = procedures.find(p => p.id === procedureId);
    if (procedure) {
      const newDocs = procedure.docs.map(doc => ({
        ...doc,
        checked: false,
        valid: false
      }));
      setDocuments(newDocs);
    }
  };

  const handleDocumentCheck = (docId: string, checked: boolean) => {
    setDocuments(docs => 
      docs.map(doc => 
        doc.id === docId ? { ...doc, checked, valid: checked } : doc
      )
    );
  };

  const calculateProgress = () => {
    if (documents.length === 0) return 0;
    const checkedDocs = documents.filter(doc => doc.checked).length;
    return Math.round((checkedDocs / documents.length) * 100);
  };

  const getRequiredMissing = () => {
    return documents.filter(doc => doc.required && !doc.checked).length;
  };

  const generateChecklist = () => {
    const checklist = {
      procedure: selectedProcedure,
      documents,
      completionRate: calculateProgress(),
      missingRequired: getRequiredMissing(),
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(checklist, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `checklist_${selectedProcedure}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Checklist exportée');
  };

  return (
    <ToolContainer
      title="Vérificateur de Documents"
      description="Vérifiez la complétude de vos dossiers administratifs"
      icon={<CheckSquare className="h-8 w-8" />}
      onBack={onBack}
      categoryId="admin"
    >
      <div className="grid gap-6">
        {/* Sélection de la procédure */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5" />
              Type de démarche
            </CardTitle>
            <CardDescription>
              Sélectionnez votre démarche pour obtenir la liste des documents requis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedProcedure} onValueChange={handleProcedureSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choisissez votre démarche" />
              </SelectTrigger>
              <SelectContent>
                {procedures.map((procedure) => (
                  <SelectItem key={procedure.id} value={procedure.id}>
                    {procedure.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Progress et statut */}
        {selectedProcedure && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Progression du dossier</span>
                <span className="text-2xl font-bold">{calculateProgress()}%</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={calculateProgress()} className="mb-4" />
              <div className="flex justify-between text-sm">
                <span>{documents.filter(d => d.checked).length} / {documents.length} documents</span>
                {getRequiredMissing() > 0 && (
                  <span className="text-destructive">
                    {getRequiredMissing()} obligatoires manquants
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Liste des documents */}
        {documents.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Documents requis
              </CardTitle>
              <CardDescription>
                Cochez les documents que vous possédez et vérifiez leur validité
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div 
                    key={doc.id} 
                    className={`flex items-center space-x-3 p-3 rounded-lg border ${
                      doc.required ? 'border-orange-200 bg-orange-50' : 'border-gray-200'
                    }`}
                  >
                    <Checkbox
                      id={doc.id}
                      checked={doc.checked}
                      onCheckedChange={(checked) => handleDocumentCheck(doc.id, !!checked)}
                    />
                    <div className="flex-1">
                      <Label htmlFor={doc.id} className="font-medium cursor-pointer">
                        {doc.name}
                        {doc.required && <span className="text-red-500 ml-1">*</span>}
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      {doc.checked ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : doc.required ? (
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                      ) : (
                        <div className="h-5 w-5" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    * Documents obligatoires
                  </div>
                  <Button onClick={generateChecklist} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exporter checklist
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Conseils de qualité */}
        <Card>
          <CardHeader>
            <CardTitle>Conseils pour des documents conformes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">📸 Photos et scans</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Résolution minimum 300 DPI</li>
                  <li>• Format PDF ou JPG</li>
                  <li>• Document entier visible</li>
                  <li>• Bonne luminosité</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">📋 Validité</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Vérifiez les dates d'expiration</li>
                  <li>• Documents en cours de validité</li>
                  <li>• Traductions certifiées si nécessaire</li>
                  <li>• Originaux + photocopies</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolContainer>
  );
};

export default DocumentCheckerTool;