
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Copy, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LetterGeneratorProps {
  userProfile: any;
  diagnostic: any;
}

const LetterGenerator: React.FC<LetterGeneratorProps> = ({ userProfile, diagnostic }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [formData, setFormData] = useState({
    senderName: userProfile?.name || '',
    senderAddress: '',
    recipientName: '',
    recipientAddress: '',
    subject: '',
    content: '',
    customRequest: ''
  });
  const [generatedLetter, setGeneratedLetter] = useState('');
  const { toast } = useToast();

  const letterTemplates = [
    {
      id: 'prefecture_appointment',
      title: 'Demande de rendez-vous en préfecture',
      category: 'Préfecture',
      description: 'Pour demander un rendez-vous administratif'
    },
    {
      id: 'caf_housing_aid',
      title: 'Demande d\'aide au logement CAF',
      category: 'CAF',
      description: 'Pour une demande d\'APL ou ALS'
    },
    {
      id: 'pole_emploi_registration',
      title: 'Inscription Pôle Emploi',
      category: 'Pôle Emploi',
      description: 'Pour s\'inscrire comme demandeur d\'emploi'
    },
    {
      id: 'bank_account_opening',
      title: 'Ouverture de compte bancaire',
      category: 'Banque',
      description: 'Pour ouvrir un compte en banque'
    },
    {
      id: 'school_enrollment',
      title: 'Inscription scolaire',
      category: 'Éducation',
      description: 'Pour inscrire un enfant à l\'école'
    }
  ];

  const generateLetter = () => {
    const template = letterTemplates.find(t => t.id === selectedTemplate);
    if (!template) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un modèle de lettre",
        variant: "destructive"
      });
      return;
    }

    const today = new Date().toLocaleDateString('fr-FR');
    
    let letterContent = '';
    
    // En-tête
    letterContent += `${formData.senderName}\n`;
    letterContent += `${formData.senderAddress}\n\n`;
    letterContent += `${formData.recipientName}\n`;
    letterContent += `${formData.recipientAddress}\n\n`;
    letterContent += `${today}\n\n`;
    letterContent += `Objet : ${formData.subject || template.title}\n\n`;
    letterContent += `Madame, Monsieur,\n\n`;

    // Corps selon le template
    switch (selectedTemplate) {
      case 'prefecture_appointment':
        letterContent += `Je sollicite par la présente un rendez-vous en préfecture pour ${formData.customRequest || 'mes démarches administratives'}.\n\n`;
        letterContent += `En tant que ${userProfile?.title || 'résidant'}, je souhaite régulariser ma situation administrative.\n\n`;
        break;
        
      case 'caf_housing_aid':
        letterContent += `Je vous adresse par la présente ma demande d'aide au logement.\n\n`;
        letterContent += `Ma situation : ${formData.customRequest || 'locataire recherchant une aide financière'}\n\n`;
        break;
        
      default:
        letterContent += `${formData.content || 'Je vous écris concernant ma demande administrative.'}\n\n`;
    }

    letterContent += `Je vous prie de bien vouloir examiner ma demande et reste à votre disposition pour tout complément d'information.\n\n`;
    letterContent += `Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.\n\n`;
    letterContent += `${formData.senderName}`;

    setGeneratedLetter(letterContent);
    
    toast({
      title: "Lettre générée",
      description: "Votre lettre a été générée avec succès"
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    toast({
      title: "Copié",
      description: "La lettre a été copiée dans le presse-papiers"
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Formulaire */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Générateur de Lettres
            </CardTitle>
            <CardDescription>
              Créez des lettres administratives conformes aux standards français
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="template">Modèle de lettre</Label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un modèle" />
                </SelectTrigger>
                <SelectContent>
                  {letterTemplates.map(template => (
                    <SelectItem key={template.id} value={template.id}>
                      <div>
                        <div className="font-medium">{template.title}</div>
                        <Badge variant="outline" className="text-xs">
                          {template.category}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="senderName">Votre nom</Label>
                <Input
                  id="senderName"
                  value={formData.senderName}
                  onChange={(e) => setFormData({...formData, senderName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="recipientName">Destinataire</Label>
                <Input
                  id="recipientName"
                  value={formData.recipientName}
                  onChange={(e) => setFormData({...formData, recipientName: e.target.value})}
                  placeholder="Préfecture de..."
                />
              </div>
            </div>

            <div>
              <Label htmlFor="senderAddress">Votre adresse</Label>
              <Textarea
                id="senderAddress"
                value={formData.senderAddress}
                onChange={(e) => setFormData({...formData, senderAddress: e.target.value})}
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="recipientAddress">Adresse du destinataire</Label>
              <Textarea
                id="recipientAddress"
                value={formData.recipientAddress}
                onChange={(e) => setFormData({...formData, recipientAddress: e.target.value})}
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="customRequest">Demande spécifique</Label>
              <Input
                id="customRequest"
                value={formData.customRequest}
                onChange={(e) => setFormData({...formData, customRequest: e.target.value})}
                placeholder="Précisez votre demande..."
              />
            </div>

            <Button onClick={generateLetter} className="w-full">
              Générer la lettre
            </Button>
          </CardContent>
        </Card>

        {/* Aperçu */}
        <Card>
          <CardHeader>
            <CardTitle>Aperçu de la lettre</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyToClipboard} disabled={!generatedLetter}>
                <Copy className="mr-2 h-4 w-4" />
                Copier
              </Button>
              <Button variant="outline" size="sm" disabled={!generatedLetter}>
                <Download className="mr-2 h-4 w-4" />
                PDF
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {generatedLetter ? (
              <div className="bg-white border rounded p-4 min-h-96 text-sm whitespace-pre-line font-mono">
                {generatedLetter}
              </div>
            ) : (
              <div className="bg-gray-50 border rounded p-4 min-h-96 flex items-center justify-center text-gray-500">
                Sélectionnez un modèle et remplissez le formulaire pour générer votre lettre
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LetterGenerator;
