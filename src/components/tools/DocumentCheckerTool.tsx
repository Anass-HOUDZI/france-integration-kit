
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { 
  FileCheck, 
  FileX, 
  AlertCircle, 
  CheckCircle, 
  Upload, 
  Download,
  Calendar,
  FileText,
  Shield
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DocumentItem {
  id: string;
  name: string;
  required: boolean;
  category: string;
  status: 'missing' | 'uploaded' | 'valid' | 'expired' | 'invalid';
  expiryDate?: string;
  notes?: string;
  alternatives?: string[];
}

interface ProcedureConfig {
  id: string;
  name: string;
  documents: DocumentItem[];
}

interface DocumentCheckerToolProps {
  userProfile: any;
  diagnostic: any;
}

const DocumentCheckerTool: React.FC<DocumentCheckerToolProps> = ({ userProfile, diagnostic }) => {
  const [selectedProcedure, setSelectedProcedure] = useState<string>('');
  const [currentConfig, setCurrentConfig] = useState<ProcedureConfig | null>(null);
  const [completionScore, setCompletionScore] = useState(0);
  const { toast } = useToast();

  const procedures = [
    {
      id: 'titre_sejour',
      name: 'Demande de titre de séjour',
      description: 'Documents pour première demande ou renouvellement'
    },
    {
      id: 'naturalisation',
      name: 'Demande de naturalisation',
      description: 'Dossier de demande de nationalité française'
    },
    {
      id: 'regroupement_familial',
      name: 'Regroupement familial',
      description: 'Faire venir sa famille en France'
    },
    {
      id: 'carte_resident',
      name: 'Carte de résident',
      description: 'Demande de carte de résident 10 ans'
    },
    {
      id: 'changement_statut',
      name: 'Changement de statut',
      description: 'Modification du statut de séjour'
    }
  ];

  const documentConfigs: Record<string, ProcedureConfig> = {
    titre_sejour: {
      id: 'titre_sejour',
      name: 'Titre de séjour',
      documents: [
        {
          id: 'passport',
          name: 'Passeport en cours de validité',
          required: true,
          category: 'Identité',
          status: 'missing'
        },
        {
          id: 'visa',
          name: 'Visa d\'entrée en France',
          required: true,
          category: 'Identité',
          status: 'missing'
        },
        {
          id: 'birth_certificate',
          name: 'Acte de naissance avec filiation',
          required: true,
          category: 'État civil',
          status: 'missing'
        },
        {
          id: 'address_proof',
          name: 'Justificatif de domicile',
          required: true,
          category: 'Domicile',
          status: 'missing',
          alternatives: ['Facture EDF/Gaz', 'Quittance de loyer', 'Attestation d\'hébergement']
        },
        {
          id: 'income_proof',
          name: 'Justificatifs de ressources',
          required: true,
          category: 'Ressources',
          status: 'missing',
          alternatives: ['Bulletins de salaire', 'Avis d\'imposition', 'Attestation Pôle Emploi']
        },
        {
          id: 'health_insurance',
          name: 'Justificatif d\'assurance maladie',
          required: false,
          category: 'Santé',
          status: 'missing'
        },
        {
          id: 'photos',
          name: 'Photos d\'identité récentes',
          required: true,
          category: 'Photos',
          status: 'missing'
        },
        {
          id: 'tax_stamps',
          name: 'Timbres fiscaux',
          required: true,
          category: 'Frais',
          status: 'missing'
        }
      ]
    },
    naturalisation: {
      id: 'naturalisation',
      name: 'Naturalisation',
      documents: [
        {
          id: 'demande_form',
          name: 'Formulaire de demande complété',
          required: true,
          category: 'Formulaires',
          status: 'missing'
        },
        {
          id: 'passport',
          name: 'Passeport en cours de validité',
          required: true,
          category: 'Identité',
          status: 'missing'
        },
        {
          id: 'titre_sejour',
          name: 'Titre de séjour en cours',
          required: true,
          category: 'Identité',
          status: 'missing'
        },
        {
          id: 'birth_certificate_apostille',
          name: 'Acte de naissance apostillé et traduit',
          required: true,
          category: 'État civil',
          status: 'missing'
        },
        {
          id: 'casier_judiciaire',
          name: 'Casier judiciaire du pays d\'origine',
          required: true,
          category: 'Antécédents',
          status: 'missing'
        },
        {
          id: 'french_integration',
          name: 'Justificatifs d\'intégration française',
          required: true,
          category: 'Intégration',
          status: 'missing',
          alternatives: ['Diplôme français', 'Certificat de formation civique', 'Attestation employeur']
        },
        {
          id: 'language_level',
          name: 'Justificatif niveau de français B1',
          required: true,
          category: 'Langue',
          status: 'missing'
        },
        {
          id: 'tax_notice',
          name: 'Avis d\'imposition (3 dernières années)',
          required: true,
          category: 'Fiscalité',
          status: 'missing'
        }
      ]
    }
  };

  const loadProcedure = (procedureId: string) => {
    const config = documentConfigs[procedureId];
    if (config) {
      setCurrentConfig(config);
      calculateCompletionScore(config.documents);
    }
  };

  const calculateCompletionScore = (documents: DocumentItem[]) => {
    const requiredDocs = documents.filter(doc => doc.required);
    const validDocs = requiredDocs.filter(doc => doc.status === 'valid' || doc.status === 'uploaded');
    const score = requiredDocs.length > 0 ? (validDocs.length / requiredDocs.length) * 100 : 0;
    setCompletionScore(score);
  };

  const updateDocumentStatus = (docId: string, status: DocumentItem['status']) => {
    if (!currentConfig) return;
    
    const updatedDocuments = currentConfig.documents.map(doc =>
      doc.id === docId ? { ...doc, status } : doc
    );
    
    setCurrentConfig({ ...currentConfig, documents: updatedDocuments });
    calculateCompletionScore(updatedDocuments);
    
    toast({
      title: "Document mis à jour",
      description: `Le statut du document a été modifié`
    });
  };

  const simulateDocumentUpload = (docId: string) => {
    updateDocumentStatus(docId, 'uploaded');
    
    // Simulation de validation après 2 secondes
    setTimeout(() => {
      updateDocumentStatus(docId, 'valid');
    }, 2000);
  };

  const generateReport = () => {
    if (!currentConfig) return;
    
    toast({
      title: "Rapport généré",
      description: "Votre checklist de documents a été exportée"
    });
  };

  const getStatusIcon = (status: DocumentItem['status']) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'uploaded':
        return <FileCheck className="h-5 w-5 text-blue-600" />;
      case 'expired':
        return <Calendar className="h-5 w-5 text-orange-600" />;
      case 'invalid':
        return <FileX className="h-5 w-5 text-red-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: DocumentItem['status']) => {
    switch (status) {
      case 'valid':
        return 'bg-green-100 text-green-800';
      case 'uploaded':
        return 'bg-blue-100 text-blue-800';
      case 'expired':
        return 'bg-orange-100 text-orange-800';
      case 'invalid':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!currentConfig) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Vérificateur de Documents
          </h2>
          <p className="text-gray-600">
            Vérifiez la complétude de votre dossier administratif
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sélectionnez votre démarche</CardTitle>
            <CardDescription>
              Choisissez le type de dossier que vous souhaitez vérifier
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {procedures.map((procedure) => (
                <Card 
                  key={procedure.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => {
                    setSelectedProcedure(procedure.id);
                    loadProcedure(procedure.id);
                  }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{procedure.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {procedure.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {userProfile && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-900">Recommandation personnalisée</span>
              </div>
              <p className="text-blue-800 text-sm">
                En tant que <strong>{userProfile.title}</strong>, nous recommandons de commencer par 
                vérifier votre dossier de titre de séjour.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  const categories = [...new Set(currentConfig.documents.map(doc => doc.category))];
  const requiredCount = currentConfig.documents.filter(doc => doc.required).length;
  const validCount = currentConfig.documents.filter(doc => doc.status === 'valid').length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Vérification : {currentConfig.name}
          </h2>
          <p className="text-gray-600">
            Vérifiez la complétude de votre dossier
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => setCurrentConfig(null)} 
            variant="outline"
          >
            Changer de démarche
          </Button>
          <Button onClick={generateReport} className="bg-green-600 hover:bg-green-700">
            <Download className="mr-2 h-4 w-4" />
            Exporter rapport
          </Button>
        </div>
      </div>

      {/* Progression globale */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-6 w-6" />
              Progression du dossier
            </CardTitle>
            <Badge variant={completionScore === 100 ? "default" : "secondary"}>
              {validCount}/{requiredCount} documents requis
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Complétude du dossier</span>
              <span>{Math.round(completionScore)}%</span>
            </div>
            <Progress value={completionScore} className="w-full" />
          </div>
          
          {completionScore === 100 && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-green-800 font-medium">
                  Dossier complet ! Vous pouvez procéder au dépôt.
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documents par catégorie */}
      <div className="space-y-6">
        {categories.map(category => {
          const categoryDocs = currentConfig.documents.filter(doc => doc.category === category);
          const categoryValidDocs = categoryDocs.filter(doc => doc.status === 'valid').length;
          
          return (
            <Card key={category}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{category}</CardTitle>
                  <Badge variant="outline">
                    {categoryValidDocs}/{categoryDocs.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categoryDocs.map(doc => (
                    <div 
                      key={doc.id} 
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        {getStatusIcon(doc.status)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{doc.name}</span>
                            {doc.required && (
                              <Badge variant="destructive" className="text-xs">
                                Obligatoire
                              </Badge>
                            )}
                          </div>
                          {doc.alternatives && (
                            <p className="text-sm text-gray-600 mt-1">
                              Alternatives : {doc.alternatives.join(', ')}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(doc.status)}>
                          {doc.status === 'missing' ? 'Manquant' :
                           doc.status === 'uploaded' ? 'Envoyé' :
                           doc.status === 'valid' ? 'Validé' :
                           doc.status === 'expired' ? 'Expiré' : 'Invalide'}
                        </Badge>
                        
                        {doc.status === 'missing' && (
                          <Button 
                            onClick={() => simulateDocumentUpload(doc.id)}
                            size="sm"
                            variant="outline"
                          >
                            <Upload className="mr-1 h-3 w-3" />
                            Ajouter
                          </Button>
                        )}
                        
                        {doc.status === 'uploaded' && (
                          <div className="text-sm text-blue-600">
                            Vérification...
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Conseils */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-900 mb-1">Conseils importants</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Vérifiez les dates d'expiration de vos documents</li>
                <li>• Préparez des copies et conservez les originaux</li>
                <li>• Traduisez les documents étrangers par un traducteur assermenté</li>
                <li>• Prévoyez un délai de traitement de 3 à 6 mois</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentCheckerTool;
