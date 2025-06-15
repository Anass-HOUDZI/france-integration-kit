
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { FileText, Search, Download, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';

interface FormAssistantToolProps {
  userProfile: any;
  diagnostic: any;
}

const FormAssistantTool: React.FC<FormAssistantToolProps> = ({ userProfile, diagnostic }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedForm, setSelectedForm] = useState<any>(null);

  const forms = [
    {
      id: 'cerfa_15646',
      number: 'CERFA 15646*01',
      title: 'Demande de titre de séjour',
      category: 'Séjour',
      description: 'Pour renouveler ou obtenir un titre de séjour',
      difficulty: 'Moyen',
      estimatedTime: '30 min',
      requiredDocs: ['Passeport', 'Justificatif de domicile', 'Photos d\'identité'],
      steps: [
        'Renseigner l\'état civil',
        'Indiquer la situation familiale',
        'Préciser la situation professionnelle',
        'Joindre les pièces justificatives'
      ]
    },
    {
      id: 'cerfa_12100',
      number: 'CERFA 12100*02',
      title: 'Demande de nationalité française',
      category: 'Naturalisation',
      description: 'Pour demander la nationalité française par naturalisation',
      difficulty: 'Difficile',
      estimatedTime: '60 min',
      requiredDocs: ['Acte de naissance', 'Justificatifs de revenus', 'Certificat de résidence'],
      steps: [
        'Vérifier les conditions d\'éligibilité',
        'Compléter l\'état civil',
        'Renseigner la situation professionnelle',
        'Joindre tous les justificatifs requis'
      ]
    },
    {
      id: 'cerfa_11916',
      number: 'CERFA 11916*05',
      title: 'Demande de carte de résident',
      category: 'Séjour',
      description: 'Pour obtenir une carte de résident de 10 ans',
      difficulty: 'Moyen',
      estimatedTime: '45 min',
      requiredDocs: ['Titre de séjour actuel', 'Justificatifs de ressources', 'Attestation d\'assurance'],
      steps: [
        'Justifier de la durée de séjour',
        'Prouver l\'intégration républicaine',
        'Démontrer la stabilité des ressources'
      ]
    }
  ];

  const filteredForms = forms.filter(form => 
    form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Facile': return 'bg-green-100 text-green-800';
      case 'Moyen': return 'bg-yellow-100 text-yellow-800';
      case 'Difficile': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedForm(null)}
            className="text-blue-600"
          >
            ← Retour à la liste
          </Button>
          <h2 className="text-2xl font-bold">{selectedForm.title}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Guide de remplissage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedForm.steps.map((step: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">{step}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conseils personnalisés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-900">Pour votre profil ({userProfile?.title})</p>
                      <p className="text-sm text-green-700">
                        Assurez-vous de bien renseigner votre situation professionnelle actuelle
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-900">Attention</p>
                      <p className="text-sm text-yellow-700">
                        Vérifiez que tous vos documents sont traduits par un traducteur assermenté
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">Numéro CERFA</Label>
                  <p className="font-mono text-sm bg-gray-100 p-2 rounded">{selectedForm.number}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Difficulté</Label>
                  <Badge className={getDifficultyColor(selectedForm.difficulty)}>
                    {selectedForm.difficulty}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Temps estimé</Label>
                  <p className="text-sm">{selectedForm.estimatedTime}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Documents requis</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {selectedForm.requiredDocs.map((doc: string, index: number) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Button className="w-full" onClick={() => window.open('https://www.service-public.fr', '_blank')}>
              <Download className="mr-2 h-4 w-4" />
              Télécharger le formulaire
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Assistant Formulaires CERFA
          </CardTitle>
          <CardDescription>
            Trouvez et remplissez facilement les formulaires administratifs français
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher un formulaire..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredForms.map((form) => (
          <Card 
            key={form.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedForm(form)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <Badge variant="outline" className="mb-2">
                  {form.category}
                </Badge>
                <Badge className={getDifficultyColor(form.difficulty)}>
                  {form.difficulty}
                </Badge>
              </div>
              <CardTitle className="text-lg">{form.title}</CardTitle>
              <p className="text-sm text-gray-600 font-mono">{form.number}</p>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                {form.description}
              </CardDescription>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{form.estimatedTime}</span>
                <span>{form.requiredDocs.length} documents</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FormAssistantTool;
