
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, CreditCard, Clock, MapPin, Phone, FileText, AlertCircle, CheckSquare } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';

interface SocialSecurityGuideProps {
  userProfile: any;
  diagnostic: any;
}

const SocialSecurityGuideTool: React.FC<SocialSecurityGuideProps> = ({ userProfile }) => {
  const { saveToolData } = useUserProfile();
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const inscriptionSteps = [
    {
      id: 'documents',
      title: 'Rassembler les documents',
      description: 'Préparer tous les documents nécessaires à l\'inscription',
      documents: [
        'Passeport ou carte d\'identité',
        'Acte de naissance avec filiation',
        'Justificatif de domicile',
        'Titre de séjour (si étranger)',
        'Contrat de travail ou attestation employeur',
        'RIB'
      ]
    },
    {
      id: 'inscription',
      title: 'S\'inscrire à la CPAM',
      description: 'Effectuer l\'inscription auprès de votre CPAM locale',
      actions: [
        'Prendre RDV ou aller au guichet CPAM',
        'Remplir formulaire S1106',
        'Déposer le dossier complet',
        'Obtenir un récépissé'
      ]
    },
    {
      id: 'carte_vitale',
      title: 'Recevoir la carte Vitale',
      description: 'Attendre et activer votre carte Vitale',
      infos: [
        'Délai de réception : 2-3 semaines',
        'Activation en pharmacie ou borne',
        'Télécharger l\'app Ameli',
        'Créer compte ameli.fr'
      ]
    },
    {
      id: 'medecin_traitant',
      title: 'Choisir un médecin traitant',
      description: 'Déclarer votre médecin traitant pour optimiser vos remboursements',
      benefits: [
        'Meilleurs remboursements (70% vs 30%)',
        'Pas d\'avance de frais',
        'Suivi médical coordonné',
        'Parcours de soins respecté'
      ]
    }
  ];

  const remboursementRates = [
    { soin: 'Consultation médecin généraliste', taux: '70%', restCharge: '7,50€' },
    { soin: 'Consultation spécialiste', taux: '70%', restCharge: '9€-15€' },
    { soin: 'Médicaments remboursables', taux: '65%', restCharge: '35%' },
    { soin: 'Analyses biologiques', taux: '60%', restCharge: '40%' },
    { soin: 'Radiologie', taux: '70%', restCharge: '30%' },
    { soin: 'Hospitalisation', taux: '80%', restCharge: '20€/jour' },
    { soin: 'Dentaire (soins conservateurs)', taux: '70%', restCharge: '30%' },
    { soin: 'Optique (verres)', taux: '60%', restCharge: 'Selon tarif' }
  ];

  const urgentNumbers = [
    { service: 'SAMU', numero: '15', description: 'Urgences médicales' },
    { service: 'Pompiers', numero: '18', description: 'Secours et urgences' },
    { service: 'Police/Gendarmerie', numero: '17', description: 'Urgences sécuritaires' },
    { service: 'Numéro européen', numero: '112', description: 'Toutes urgences' },
    { service: 'SOS Médecins', numero: '3624', description: 'Consultations urgentes' },
    { service: 'Pharmacie de garde', numero: '3237', description: 'Pharmacies ouvertes' }
  ];

  const toggleStep = (stepId: string) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
    
    saveToolData('social_security_guide', {
      completedSteps: completedSteps.includes(stepId) 
        ? completedSteps.filter(id => id !== stepId)
        : [...completedSteps, stepId],
      lastUpdate: new Date().toISOString()
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Guide de la Sécurité Sociale
        </h1>
        <p className="text-lg text-gray-600">
          Tout comprendre du système de santé français
        </p>
      </div>

      <Tabs defaultValue="inscription" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="inscription">Inscription</TabsTrigger>
          <TabsTrigger value="remboursements">Remboursements</TabsTrigger>
          <TabsTrigger value="droits">Droits & Devoirs</TabsTrigger>
          <TabsTrigger value="urgences">Urgences</TabsTrigger>
        </TabsList>

        <TabsContent value="inscription" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Étapes d'inscription à la Sécurité Sociale
              </CardTitle>
              <CardDescription>
                Suivez ces étapes pour vous inscrire et bénéficier de la couverture santé
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {inscriptionSteps.map((step, index) => (
                  <div key={step.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => toggleStep(step.id)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          completedSteps.includes(step.id)
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {completedSteps.includes(step.id) ? '✓' : index + 1}
                      </button>
                      {index < inscriptionSteps.length - 1 && (
                        <div className="w-0.5 h-16 bg-gray-200 mt-2" />
                      )}
                    </div>
                    
                    <div className="flex-1 pb-8">
                      <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                      <p className="text-gray-600 mb-3">{step.description}</p>
                      
                      {step.documents && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Documents nécessaires :</h4>
                          <ul className="space-y-1">
                            {step.documents.map((doc, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm">
                                <CheckSquare className="h-4 w-4 text-blue-600" />
                                {doc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {step.actions && (
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Actions à effectuer :</h4>
                          <ul className="space-y-1">
                            {step.actions.map((action, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm">
                                <CheckSquare className="h-4 w-4 text-green-600" />
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {step.infos && (
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Informations importantes :</h4>
                          <ul className="space-y-1">
                            {step.infos.map((info, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm">
                                <AlertCircle className="h-4 w-4 text-purple-600" />
                                {info}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {step.benefits && (
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Avantages :</h4>
                          <ul className="space-y-1">
                            {step.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm">
                                <Heart className="h-4 w-4 text-orange-600" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="remboursements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Taux de remboursement Sécurité Sociale</CardTitle>
              <CardDescription>
                Comprendre ce qui reste à votre charge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Type de soin</th>
                      <th className="text-left p-3">Remboursement</th>
                      <th className="text-left p-3">Reste à charge</th>
                    </tr>
                  </thead>
                  <tbody>
                    {remboursementRates.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3">{item.soin}</td>
                        <td className="p-3">
                          <Badge className="bg-green-100 text-green-800">
                            {item.taux}
                          </Badge>
                        </td>
                        <td className="p-3 text-gray-600">{item.restCharge}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="droits" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Vos Droits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckSquare className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-medium">Soins gratuits d'urgence</h4>
                    <p className="text-sm text-gray-600">Même sans couverture</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckSquare className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-medium">Confidentialité médicale</h4>
                    <p className="text-sm text-gray-600">Secret médical garanti</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckSquare className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-medium">Libre choix du médecin</h4>
                    <p className="text-sm text-gray-600">Secteur public ou privé</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckSquare className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-medium">Accès au dossier médical</h4>
                    <p className="text-sm text-gray-600">Consultation de vos données</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-orange-600">Vos Devoirs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-600 mt-1" />
                  <div>
                    <h4 className="font-medium">Respecter le parcours de soins</h4>
                    <p className="text-sm text-gray-600">Médecin traitant d'abord</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-600 mt-1" />
                  <div>
                    <h4 className="font-medium">Présenter la carte Vitale</h4>
                    <p className="text-sm text-gray-600">À chaque consultation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-600 mt-1" />
                  <div>
                    <h4 className="font-medium">Mettre à jour vos données</h4>
                    <p className="text-sm text-gray-600">Changement d'adresse, situation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-600 mt-1" />
                  <div>
                    <h4 className="font-medium">Payer les participations</h4>
                    <p className="text-sm text-gray-600">Franchise, ticket modérateur</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="urgences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Numéros d'urgence
              </CardTitle>
              <CardDescription>
                En cas d'urgence médicale, contactez immédiatement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {urgentNumbers.map((emergency, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{emergency.service}</h3>
                      <span className="text-2xl font-bold text-red-600">
                        {emergency.numero}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{emergency.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Que faire en cas d'urgence ?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">Urgence vitale</h4>
                  <p className="text-sm text-red-800">Appelez le 15 (SAMU) ou 112. Vous serez pris en charge gratuitement.</p>
                </div>
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">Urgence non vitale</h4>
                  <p className="text-sm text-orange-800">Contactez SOS Médecins (3624) ou rendez-vous aux urgences de l'hôpital le plus proche.</p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Sans carte Vitale</h4>
                  <p className="text-sm text-blue-800">Les soins d'urgence sont assurés. Vous pourrez régulariser plus tard.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialSecurityGuideTool;
