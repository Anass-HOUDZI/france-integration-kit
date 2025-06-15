
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Copy, Eye } from 'lucide-react';

interface LetterGeneratorProps {
  userProfile: any;
  diagnostic: any;
}

const LetterGenerator: React.FC<LetterGeneratorProps> = ({ userProfile, diagnostic }) => {
  const [letterType, setLetterType] = useState('');
  const [formData, setFormData] = useState({
    senderName: '',
    senderAddress: '',
    recipientName: '',
    recipientAddress: '',
    subject: '',
    content: '',
    date: new Date().toLocaleDateString('fr-FR')
  });
  const [generatedLetter, setGeneratedLetter] = useState('');

  const letterTypes = [
    { value: 'prefecture', label: 'Lettre à la Préfecture', category: 'Administrative' },
    { value: 'mairie', label: 'Lettre à la Mairie', category: 'Administrative' },
    { value: 'caf', label: 'Lettre à la CAF', category: 'Social' },
    { value: 'assurance_maladie', label: 'Lettre Assurance Maladie', category: 'Santé' },
    { value: 'pole_emploi', label: 'Lettre Pôle Emploi', category: 'Emploi' },
    { value: 'logement_social', label: 'Demande Logement Social', category: 'Logement' },
    { value: 'recours', label: 'Lettre de Recours', category: 'Juridique' },
    { value: 'motivation', label: 'Lettre de Motivation', category: 'Emploi' }
  ];

  const templates = {
    prefecture: {
      subject: 'Demande de rendez-vous pour renouvellement de titre de séjour',
      content: `Madame, Monsieur,

Je me permets de vous écrire pour solliciter un rendez-vous en vue du renouvellement de mon titre de séjour.

Actuellement titulaire d'un [TYPE DE TITRE], arrivant à échéance le [DATE], je souhaiterais convenir d'un rendez-vous dans les meilleurs délais pour effectuer les démarches nécessaires au renouvellement.

Je reste à votre disposition pour tout complément d'information et vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations respectueuses.`
    },
    caf: {
      subject: 'Demande d\'ouverture de droits aux prestations familiales',
      content: `Madame, Monsieur,

Par la présente, je sollicite l'ouverture de mes droits aux prestations familiales suite à mon installation en France.

Vous trouverez ci-joint les pièces justificatives nécessaires à l'étude de mon dossier.

Je vous remercie par avance de l'attention que vous porterez à ma demande et vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.`
    }
  };

  const generateLetter = () => {
    const template = templates[letterType as keyof typeof templates];
    if (!template) return;

    const letter = `${formData.senderName}
${formData.senderAddress}

${formData.recipientName}
${formData.recipientAddress}

Le ${formData.date}

Objet : ${formData.subject || template.subject}

${formData.content || template.content}

${formData.senderName}`;

    setGeneratedLetter(letter);
  };

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(generatedLetter);
  };

  const handleDownloadLetter = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `lettre_${letterType}_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Générateur de Lettres Officielles
          </CardTitle>
          <CardDescription>
            Créez des lettres administratives conformes aux standards français
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="letterType">Type de lettre</Label>
              <Select value={letterType} onValueChange={setLetterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le type de lettre" />
                </SelectTrigger>
                <SelectContent>
                  {letterTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        {type.label}
                        <Badge variant="outline" className="text-xs">
                          {type.category}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={new Date().toISOString().split('T')[0]}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  date: new Date(e.target.value).toLocaleDateString('fr-FR')
                }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Expéditeur</h3>
              <div className="space-y-2">
                <Label htmlFor="senderName">Nom complet</Label>
                <Input
                  id="senderName"
                  placeholder="Votre nom complet"
                  value={formData.senderName}
                  onChange={(e) => setFormData(prev => ({ ...prev, senderName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="senderAddress">Adresse complète</Label>
                <Textarea
                  id="senderAddress"
                  placeholder="Votre adresse complète"
                  rows={3}
                  value={formData.senderAddress}
                  onChange={(e) => setFormData(prev => ({ ...prev, senderAddress: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Destinataire</h3>
              <div className="space-y-2">
                <Label htmlFor="recipientName">Nom/Service</Label>
                <Input
                  id="recipientName"
                  placeholder="Nom du destinataire ou service"
                  value={formData.recipientName}
                  onChange={(e) => setFormData(prev => ({ ...prev, recipientName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipientAddress">Adresse</Label>
                <Textarea
                  id="recipientAddress"
                  placeholder="Adresse du destinataire"
                  rows={3}
                  value={formData.recipientAddress}
                  onChange={(e) => setFormData(prev => ({ ...prev, recipientAddress: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Objet de la lettre</Label>
            <Input
              id="subject"
              placeholder="Objet de votre lettre"
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Contenu de la lettre</Label>
            <Textarea
              id="content"
              placeholder="Corps de votre lettre"
              rows={6}
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={generateLetter} disabled={!letterType} className="bg-blue-600 hover:bg-blue-700">
              <Eye className="mr-2 h-4 w-4" />
              Générer la lettre
            </Button>
          </div>
        </CardContent>
      </Card>

      {generatedLetter && (
        <Card>
          <CardHeader>
            <CardTitle>Votre lettre générée</CardTitle>
            <CardDescription>
              Vérifiez le contenu avant utilisation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <pre className="whitespace-pre-line text-sm font-mono">
                {generatedLetter}
              </pre>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCopyLetter} variant="outline">
                <Copy className="mr-2 h-4 w-4" />
                Copier
              </Button>
              <Button onClick={handleDownloadLetter} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Télécharger
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LetterGenerator;
