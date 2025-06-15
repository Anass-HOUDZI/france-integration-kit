
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FileText, CheckCircle, AlertCircle, Download, User, Briefcase, Home } from 'lucide-react';

interface RentalDossierProps {
  userProfile: any;
  diagnostic: any;
}

const RentalDossier: React.FC<RentalDossierProps> = ({ userProfile, diagnostic }) => {
  const [dossierData, setDossierData] = useState({
    // Personal info
    firstName: '',
    lastName: '',
    birthDate: '',
    nationality: '',
    phone: '',
    email: '',
    
    // Professional info
    profession: '',
    employer: '',
    salary: '',
    contractType: '',
    
    // Current housing
    currentAddress: '',
    currentRent: '',
    reasonForLeaving: '',
    
    // Financial info
    savings: '',
    guarantor: false,
    guarantorInfo: ''
  });

  const [checkedDocuments, setCheckedDocuments] = useState<Record<string, boolean>>({});

  const requiredDocuments = [
    {
      id: 'identity',
      category: 'Identité',
      items: [
        'Carte d\'identité ou passeport',
        'Titre de séjour (si applicable)',
        'Acte de naissance'
      ]
    },
    {
      id: 'income',
      category: 'Revenus',
      items: [
        '3 dernières fiches de paie',
        'Contrat de travail',
        'Avis d\'imposition',
        'Relevés bancaires (3 mois)'
      ]
    },
    {
      id: 'housing',
      category: 'Logement actuel',
      items: [
        'Quittances de loyer (3 dernières)',
        'Attestation du propriétaire actuel',
        'Préavis (si donné)'
      ]
    },
    {
      id: 'insurance',
      category: 'Assurances',
      items: [
        'Attestation d\'assurance habitation',
        'RIB (Relevé d\'Identité Bancaire)'
      ]
    },
    {
      id: 'guarantor',
      category: 'Garant (si requis)',
      items: [
        'Pièce d\'identité du garant',
        'Justificatifs de revenus du garant',
        'Attestation de domicile du garant'
      ]
    }
  ];

  const handleDocumentCheck = (docId: string, checked: boolean) => {
    setCheckedDocuments(prev => ({
      ...prev,
      [docId]: checked
    }));
  };

  const calculateCompleteness = () => {
    const totalItems = requiredDocuments.reduce((sum, cat) => sum + cat.items.length, 0);
    const checkedItems = Object.values(checkedDocuments).filter(Boolean).length;
    return Math.round((checkedItems / totalItems) * 100);
  };

  const generateDossierSummary = () => {
    const completeness = calculateCompleteness();
    const personalComplete = dossierData.firstName && dossierData.lastName && dossierData.phone && dossierData.email;
    const professionalComplete = dossierData.profession && dossierData.salary && dossierData.contractType;
    
    return {
      completeness,
      personalComplete,
      professionalComplete,
      documentsReady: completeness >= 80,
      score: personalComplete && professionalComplete && completeness >= 80 ? 'excellent' : 
             personalComplete && professionalComplete && completeness >= 60 ? 'good' : 'needs_work'
    };
  };

  const summary = generateDossierSummary();

  const downloadDossier = () => {
    const dossierText = `
DOSSIER LOCATIF
================

INFORMATIONS PERSONNELLES
-------------------------
Nom: ${dossierData.lastName}
Prénom: ${dossierData.firstName}
Date de naissance: ${dossierData.birthDate}
Nationalité: ${dossierData.nationality}
Téléphone: ${dossierData.phone}
Email: ${dossierData.email}

INFORMATIONS PROFESSIONNELLES
-----------------------------
Profession: ${dossierData.profession}
Employeur: ${dossierData.employer}
Salaire: ${dossierData.salary}€
Type de contrat: ${dossierData.contractType}

LOGEMENT ACTUEL
---------------
Adresse: ${dossierData.currentAddress}
Loyer actuel: ${dossierData.currentRent}€
Raison du déménagement: ${dossierData.reasonForLeaving}

SITUATION FINANCIÈRE
--------------------
Épargne: ${dossierData.savings}€
Garant: ${dossierData.guarantor ? 'Oui' : 'Non'}
${dossierData.guarantorInfo ? 'Informations garant: ' + dossierData.guarantorInfo : ''}

DOCUMENTS FOURNIS
-----------------
${requiredDocuments.map(cat => 
  `${cat.category}:\n${cat.items.map(item => 
    `- ${checkedDocuments[item] ? '✓' : '✗'} ${item}`
  ).join('\n')}`
).join('\n\n')}
`;

    const element = document.createElement('a');
    const file = new Blob([dossierText], { type: 'text/plain; charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `dossier_locatif_${dossierData.lastName}_${Date.now()}.txt`;
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
            Générateur de Dossier Locatif
          </CardTitle>
          <CardDescription>
            Créez un dossier locatif complet et professionnel pour maximiser vos chances
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Complétude du dossier</span>
                  <span className="text-sm text-gray-600">{summary.completeness}%</span>
                </div>
                <Progress value={summary.completeness} className="h-2" />
              </div>
              <Badge 
                className={
                  summary.score === 'excellent' ? 'bg-green-100 text-green-800' :
                  summary.score === 'good' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }
              >
                {summary.score === 'excellent' ? 'Excellent' :
                 summary.score === 'good' ? 'Bon' : 'À améliorer'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informations personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    value={dossierData.firstName}
                    onChange={(e) => setDossierData(prev => ({ ...prev, firstName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    value={dossierData.lastName}
                    onChange={(e) => setDossierData(prev => ({ ...prev, lastName: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Date de naissance</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={dossierData.birthDate}
                    onChange={(e) => setDossierData(prev => ({ ...prev, birthDate: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationalité</Label>
                  <Input
                    id="nationality"
                    value={dossierData.nationality}
                    onChange={(e) => setDossierData(prev => ({ ...prev, nationality: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={dossierData.phone}
                    onChange={(e) => setDossierData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={dossierData.email}
                    onChange={(e) => setDossierData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Situation professionnelle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profession">Profession</Label>
                <Input
                  id="profession"
                  value={dossierData.profession}
                  onChange={(e) => setDossierData(prev => ({ ...prev, profession: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employer">Employeur</Label>
                <Input
                  id="employer"
                  value={dossierData.employer}
                  onChange={(e) => setDossierData(prev => ({ ...prev, employer: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salary">Salaire net (€/mois)</Label>
                  <Input
                    id="salary"
                    type="number"
                    value={dossierData.salary}
                    onChange={(e) => setDossierData(prev => ({ ...prev, salary: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contractType">Type de contrat</Label>
                  <Input
                    id="contractType"
                    placeholder="CDI, CDD, etc."
                    value={dossierData.contractType}
                    onChange={(e) => setDossierData(prev => ({ ...prev, contractType: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Logement actuel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentAddress">Adresse actuelle</Label>
                <Textarea
                  id="currentAddress"
                  rows={2}
                  value={dossierData.currentAddress}
                  onChange={(e) => setDossierData(prev => ({ ...prev, currentAddress: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentRent">Loyer actuel (€)</Label>
                  <Input
                    id="currentRent"
                    type="number"
                    value={dossierData.currentRent}
                    onChange={(e) => setDossierData(prev => ({ ...prev, currentRent: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="savings">Épargne (€)</Label>
                  <Input
                    id="savings"
                    type="number"
                    value={dossierData.savings}
                    onChange={(e) => setDossierData(prev => ({ ...prev, savings: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reasonForLeaving">Raison du déménagement</Label>
                <Textarea
                  id="reasonForLeaving"
                  rows={2}
                  value={dossierData.reasonForLeaving}
                  onChange={(e) => setDossierData(prev => ({ ...prev, reasonForLeaving: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Checklist des documents</CardTitle>
              <CardDescription>
                Cochez les documents que vous avez préparés
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {requiredDocuments.map((category) => (
                <div key={category.id} className="space-y-3">
                  <h3 className="font-semibold text-gray-900">{category.category}</h3>
                  <div className="space-y-2">
                    {category.items.map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox
                          id={item}
                          checked={checkedDocuments[item] || false}
                          onCheckedChange={(checked) => handleDocumentCheck(item, !!checked)}
                        />
                        <Label 
                          htmlFor={item} 
                          className={`text-sm ${checkedDocuments[item] ? 'text-green-700' : 'text-gray-600'}`}
                        >
                          {item}
                        </Label>
                        {checkedDocuments[item] && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Évaluation du dossier</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {summary.personalComplete ? 
                    <CheckCircle className="h-5 w-5 text-green-600" /> : 
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                  }
                  <span className={summary.personalComplete ? 'text-green-700' : 'text-orange-700'}>
                    Informations personnelles
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {summary.professionalComplete ? 
                    <CheckCircle className="h-5 w-5 text-green-600" /> : 
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                  }
                  <span className={summary.professionalComplete ? 'text-green-700' : 'text-orange-700'}>
                    Situation professionnelle
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {summary.documentsReady ? 
                    <CheckCircle className="h-5 w-5 text-green-600" /> : 
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                  }
                  <span className={summary.documentsReady ? 'text-green-700' : 'text-orange-700'}>
                    Documents requis ({summary.completeness}%)
                  </span>
                </div>
              </div>

              <Button 
                onClick={downloadDossier}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={summary.completeness < 50}
              >
                <Download className="mr-2 h-4 w-4" />
                Télécharger le dossier
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RentalDossier;
