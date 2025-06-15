
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FileText, CheckCircle, AlertCircle, Download, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RentalDossierProps {
  userProfile: any;
  diagnostic: any;
}

const RentalDossier: React.FC<RentalDossierProps> = ({ userProfile, diagnostic }) => {
  const [documents, setDocuments] = useState<Record<string, boolean>>({});
  const [personalInfo, setPersonalInfo] = useState({
    fullName: userProfile?.name || '',
    phone: '',
    email: '',
    currentAddress: '',
    profession: '',
    employer: '',
    monthlyIncome: '',
    guarantorName: '',
    guarantorIncome: ''
  });
  const { toast } = useToast();

  const requiredDocuments = [
    {
      id: 'id_document',
      name: 'Pièce d\'identité en cours de validité',
      category: 'Identité',
      required: true,
      description: 'Passeport, CNI ou titre de séjour'
    },
    {
      id: 'income_proof',
      name: 'Justificatifs de revenus (3 derniers mois)',
      category: 'Revenus',
      required: true,
      description: 'Bulletins de salaire ou attestation employeur'
    },
    {
      id: 'tax_notice',
      name: 'Avis d\'imposition',
      category: 'Revenus',
      required: true,
      description: 'Dernier avis d\'imposition français'
    },
    {
      id: 'bank_statements',
      name: 'Relevés bancaires (3 derniers mois)',
      category: 'Finances',
      required: true,
      description: 'Comptes courants et épargne'
    },
    {
      id: 'employment_contract',
      name: 'Contrat de travail',
      category: 'Emploi',
      required: true,
      description: 'CDI, CDD ou attestation stage'
    },
    {
      id: 'address_proof',
      name: 'Justificatif de domicile actuel',
      category: 'Logement',
      required: false,
      description: 'Facture électricité, quittance loyer'
    },
    {
      id: 'guarantor_id',
      name: 'Pièce d\'identité du garant',
      category: 'Garant',
      required: false,
      description: 'Si vous avez un garant'
    },
    {
      id: 'guarantor_income',
      name: 'Justificatifs revenus du garant',
      category: 'Garant',
      required: false,
      description: 'Bulletins salaire du garant'
    }
  ];

  const categories = ['Identité', 'Revenus', 'Finances', 'Emploi', 'Logement', 'Garant'];

  const handleDocumentCheck = (docId: string, checked: boolean) => {
    setDocuments(prev => ({
      ...prev,
      [docId]: checked
    }));
  };

  const calculateCompleteness = () => {
    const requiredDocs = requiredDocuments.filter(doc => doc.required);
    const completedRequired = requiredDocs.filter(doc => documents[doc.id]).length;
    const totalCompleted = requiredDocuments.filter(doc => documents[doc.id]).length;
    
    return {
      requiredProgress: (completedRequired / requiredDocs.length) * 100,
      totalProgress: (totalCompleted / requiredDocuments.length) * 100,
      completedRequired,
      totalRequired: requiredDocs.length,
      completedTotal: totalCompleted,
      totalDocs: requiredDocuments.length
    };
  };

  const generateDossier = () => {
    const progress = calculateCompleteness();
    
    if (progress.completedRequired < progress.totalRequired) {
      toast({
        title: "Dossier incomplet",
        description: `Il manque ${progress.totalRequired - progress.completedRequired} documents obligatoires`,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Dossier généré",
      description: "Votre dossier locatif est prêt à être téléchargé"
    });
  };

  const progress = calculateCompleteness();

  return (
    <div className="space-y-6">
      {/* En-tête avec progression */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Générateur de Dossier Locatif
          </CardTitle>
          <CardDescription>
            Créez un dossier locatif complet et conforme aux exigences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Documents obligatoires</span>
                <span>{progress.completedRequired}/{progress.totalRequired}</span>
              </div>
              <Progress value={progress.requiredProgress} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Complétude totale</span>
                <span>{progress.completedTotal}/{progress.totalDocs}</span>
              </div>
              <Progress value={progress.totalProgress} className="h-2" />
            </div>

            <div className="flex gap-2">
              <Button onClick={generateDossier} disabled={progress.completedRequired < progress.totalRequired}>
                <Download className="mr-2 h-4 w-4" />
                Générer le dossier PDF
              </Button>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Importer documents
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Informations personnelles */}
        <Card>
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Nom complet</Label>
                <Input
                  id="fullName"
                  value={personalInfo.fullName}
                  onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={personalInfo.email}
                onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="currentAddress">Adresse actuelle</Label>
              <Input
                id="currentAddress"
                value={personalInfo.currentAddress}
                onChange={(e) => setPersonalInfo({...personalInfo, currentAddress: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="profession">Profession</Label>
                <Input
                  id="profession"
                  value={personalInfo.profession}
                  onChange={(e) => setPersonalInfo({...personalInfo, profession: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="monthlyIncome">Revenus mensuels (€)</Label>
                <Input
                  id="monthlyIncome"
                  type="number"
                  value={personalInfo.monthlyIncome}
                  onChange={(e) => setPersonalInfo({...personalInfo, monthlyIncome: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="employer">Employeur</Label>
              <Input
                id="employer"
                value={personalInfo.employer}
                onChange={(e) => setPersonalInfo({...personalInfo, employer: e.target.value})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Documents à fournir */}
        <Card>
          <CardHeader>
            <CardTitle>Documents à fournir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map(category => {
                const categoryDocs = requiredDocuments.filter(doc => doc.category === category);
                if (categoryDocs.length === 0) return null;

                return (
                  <div key={category}>
                    <h4 className="font-medium text-gray-900 mb-2">{category}</h4>
                    <div className="space-y-2">
                      {categoryDocs.map(doc => (
                        <div key={doc.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                          <Checkbox
                            id={doc.id}
                            checked={documents[doc.id] || false}
                            onCheckedChange={(checked) => handleDocumentCheck(doc.id, checked as boolean)}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <label htmlFor={doc.id} className="text-sm font-medium cursor-pointer">
                                {doc.name}
                              </label>
                              {doc.required && (
                                <Badge variant="destructive" className="text-xs">
                                  Obligatoire
                                </Badge>
                              )}
                              {documents[doc.id] && (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              )}
                            </div>
                            <p className="text-xs text-gray-600 mt-1">{doc.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conseils */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            Conseils pour un dossier attractif
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">✅ À faire :</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Documents récents (moins de 3 mois)</li>
                <li>• Copies lisibles et de qualité</li>
                <li>• Classement par catégorie</li>
                <li>• Lettre de motivation personnalisée</li>
                <li>• Références d'anciens propriétaires</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">❌ À éviter :</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Documents flous ou illisibles</li>
                <li>• Informations incohérentes</li>
                <li>• Dossier incomplet</li>
                <li>• Délais de réponse trop longs</li>
                <li>• Fausses déclarations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RentalDossier;
