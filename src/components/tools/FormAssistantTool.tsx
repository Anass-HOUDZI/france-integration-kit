import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileCheck, HelpCircle, Download, Save } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import ToolContainer from '@/components/tools/ToolContainer';
import { toast } from 'sonner';

interface FormAssistantToolProps {
  userProfile: any;
  diagnostic: any;
  onBack?: () => void;
}

const FormAssistantTool: React.FC<FormAssistantToolProps> = ({ userProfile, diagnostic, onBack }) => {
  const { t } = useI18n();
  const [selectedForm, setSelectedForm] = useState('');
  const [formData, setFormData] = useState<Record<string, string>>({});

  const formTypes = [
    { id: 'cerfa_10798', name: 'Demande de titre de séjour - CERFA 10798', category: 'Prefecture' },
    { id: 'cerfa_11580', name: 'Déclaration de revenus - CERFA 11580', category: 'Impôts' },
    { id: 'cerfa_11383', name: 'Demande RSA - CERFA 11383', category: 'CAF' },
    { id: 'cerfa_12504', name: 'Demande de logement social - CERFA 12504', category: 'Logement' }
  ];

  const handleFormSelect = (formId: string) => {
    setSelectedForm(formId);
    setFormData({});
    toast.success('Formulaire sélectionné. Aide contextuelle activée.');
  };

  const handleSave = () => {
    const savedData = JSON.stringify(formData);
    localStorage.setItem(`form_${selectedForm}`, savedData);
    toast.success('Progression sauvegardée');
  };

  const handleExport = () => {
    const exportData = {
      form: selectedForm,
      data: formData,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `form_${selectedForm}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Données exportées');
  };

  return (
    <ToolContainer
      title="Assistant Formulaires Français"
      description="Aide au remplissage des formulaires administratifs français"
      icon={<FileCheck className="h-8 w-8" />}
      onBack={onBack}
      categoryId="admin"
    >
      <div className="grid gap-6">
        {/* Sélection du formulaire */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5" />
              Sélection du formulaire
            </CardTitle>
            <CardDescription>
              Choisissez le formulaire que vous souhaitez remplir avec assistance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              {formTypes.map((form) => (
                <Card 
                  key={form.id} 
                  className={`cursor-pointer transition-colors ${
                    selectedForm === form.id ? 'ring-2 ring-primary' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => handleFormSelect(form.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{form.name}</h4>
                        <p className="text-sm text-muted-foreground">{form.category}</p>
                      </div>
                      {selectedForm === form.id && (
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assistant de remplissage */}
        {selectedForm && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Assistant de remplissage
              </CardTitle>
              <CardDescription>
                Remplissez les champs avec nos conseils et exemples
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Exemple de champs avec aide contextuelle */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom de famille</Label>
                  <Input
                    id="nom"
                    placeholder="Ex: DUPONT"
                    value={formData.nom || ''}
                    onChange={(e) => setFormData({...formData, nom: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground">
                    💡 Saisissez votre nom tel qu'il apparaît sur vos documents officiels
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prenom">Prénom(s)</Label>
                  <Input
                    id="prenom"
                    placeholder="Ex: Jean Pierre"
                    value={formData.prenom || ''}
                    onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground">
                    💡 Indiquez tous vos prénoms dans l'ordre de l'état civil
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nationalite">Nationalité</Label>
                  <Select
                    value={formData.nationalite || ''}
                    onValueChange={(value) => setFormData({...formData, nationalite: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre nationalité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="algerienne">Algérienne</SelectItem>
                      <SelectItem value="marocaine">Marocaine</SelectItem>
                      <SelectItem value="tunisienne">Tunisienne</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    💡 Choisissez votre nationalité actuelle, pas celle souhaitée
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motif">Motif de la demande</Label>
                  <Textarea
                    id="motif"
                    placeholder="Décrivez brièvement le motif de votre demande..."
                    value={formData.motif || ''}
                    onChange={(e) => setFormData({...formData, motif: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground">
                    💡 Soyez précis et factuel. Évitez les expressions subjectives.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSave} variant="outline">
                  <Save className="h-4 w-4 mr-2" />
                  Sauvegarder
                </Button>
                <Button onClick={handleExport}>
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Conseils généraux */}
        <Card>
          <CardHeader>
            <CardTitle>Conseils pour bien remplir vos formulaires</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Écrivez en majuscules</strong> pour les noms et prénoms</li>
              <li>• <strong>Utilisez l'encre noire</strong> pour les formulaires papier</li>
              <li>• <strong>Ne laissez aucune case vide</strong> - écrivez "Néant" si nécessaire</li>
              <li>• <strong>Photocopiez</strong> votre formulaire avant envoi</li>
              <li>• <strong>Joignez tous les justificatifs</strong> demandés</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </ToolContainer>
  );
};

export default FormAssistantTool;