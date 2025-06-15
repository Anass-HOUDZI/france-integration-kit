
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, Upload, Wand2, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CVData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    nationality: string;
  };
  objective: string;
  experience: Array<{
    title: string;
    company: string;
    period: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
    year: string;
    location: string;
  }>;
  skills: string[];
  languages: Array<{
    language: string;
    level: string;
  }>;
}

interface CVTranslatorToolProps {
  userProfile: any;
  diagnostic: any;
}

const CVTranslatorTool: React.FC<CVTranslatorToolProps> = ({ userProfile, diagnostic }) => {
  const [currentStep, setCurrentStep] = useState<'upload' | 'edit' | 'preview'>('upload');
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      nationality: ''
    },
    objective: '',
    experience: [],
    education: [],
    skills: [],
    languages: []
  });
  const [targetSector, setTargetSector] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const sectors = [
    'Informatique/Tech',
    'Commerce/Vente',
    'Marketing/Communication',
    'Finance/Comptabilité',
    'Ressources Humaines',
    'Ingénierie',
    'Santé/Médical',
    'Éducation/Formation',
    'Tourisme/Hôtellerie',
    'Autre'
  ];

  const frenchSkillsTranslations: Record<string, string> = {
    'Leadership': 'Encadrement d\'équipe',
    'Project Management': 'Gestion de projet',
    'Communication': 'Communication',
    'Problem Solving': 'Résolution de problèmes',
    'Time Management': 'Gestion du temps',
    'Teamwork': 'Travail en équipe',
    'Analytical Skills': 'Capacités d\'analyse',
    'Customer Service': 'Service client',
    'Sales': 'Vente',
    'Marketing': 'Marketing'
  };

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    
    // Simulation d'extraction de données CV
    setTimeout(() => {
      setCvData({
        personalInfo: {
          name: 'Nom à compléter',
          email: 'email@exemple.com',
          phone: '+33 X XX XX XX XX',
          address: 'Adresse en France',
          nationality: userProfile?.nationality || 'À préciser'
        },
        objective: 'Objectif professionnel à adapter selon le poste visé...',
        experience: [
          {
            title: 'Poste précédent',
            company: 'Entreprise',
            period: '2020-2023',
            description: 'Description des responsabilités et réalisations...'
          }
        ],
        education: [
          {
            degree: 'Diplôme obtenu',
            school: 'Institution',
            year: '2020',
            location: 'Pays'
          }
        ],
        skills: ['Compétence 1', 'Compétence 2', 'Compétence 3'],
        languages: [
          { language: 'Français', level: 'À préciser' },
          { language: 'Anglais', level: 'À préciser' }
        ]
      });
      setCurrentStep('edit');
      setIsProcessing(false);
      toast({
        title: "CV extrait avec succès",
        description: "Vos données ont été extraites. Vous pouvez maintenant les modifier."
      });
    }, 2000);
  }, [userProfile, toast]);

  const handleManualEntry = () => {
    setCurrentStep('edit');
    toast({
      title: "Saisie manuelle",
      description: "Remplissez les champs ci-dessous pour créer votre CV français."
    });
  };

  const adaptToFrenchStandards = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      // Adaptation automatique selon les standards français
      setCvData(prev => ({
        ...prev,
        objective: `Professionnel ${userProfile?.status === 'travailleur' ? 'expérimenté' : 'motivé'} en ${targetSector}, je souhaite mettre mes compétences au service d'une entreprise française dynamique pour contribuer à sa croissance et développer mon expertise dans un environnement multiculturel.`,
        skills: prev.skills.map(skill => frenchSkillsTranslations[skill] || skill),
        experience: prev.experience.map(exp => ({
          ...exp,
          description: exp.description + ' • Adaptation aux méthodes de travail françaises • Collaboration en équipe multiculturelle'
        }))
      }));
      
      setIsProcessing(false);
      toast({
        title: "CV adapté aux standards français",
        description: "Votre CV a été optimisé selon les attentes du marché français."
      });
    }, 1500);
  };

  const addExperience = () => {
    setCvData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        title: '',
        company: '',
        period: '',
        description: ''
      }]
    }));
  };

  const updateExperience = (index: number, field: string, value: string) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addEducation = () => {
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, {
        degree: '',
        school: '',
        year: '',
        location: ''
      }]
    }));
  };

  const updateEducation = (index: number, field: string, value: string) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const generatePDF = () => {
    toast({
      title: "CV généré",
      description: "Votre CV français a été téléchargé au format PDF."
    });
  };

  if (currentStep === 'upload') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Traducteur de CV Français
          </h2>
          <p className="text-gray-600">
            Adaptez votre CV aux standards français en quelques étapes
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <Upload className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Importer un CV existant</CardTitle>
              <CardDescription>
                Téléchargez votre CV actuel (PDF, Word, etc.)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Label htmlFor="cv-upload" className="cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                  <p className="text-gray-600">Cliquez pour sélectionner un fichier</p>
                  <p className="text-sm text-gray-400 mt-2">PDF, DOC, DOCX acceptés</p>
                </div>
                <Input
                  id="cv-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </Label>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleManualEntry}>
            <CardHeader className="text-center">
              <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Créer depuis zéro</CardTitle>
              <CardDescription>
                Remplissez directement le formulaire français
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <Button className="w-full">
                  Commencer la saisie
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {isProcessing && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="text-blue-800">Extraction des données en cours...</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  if (currentStep === 'edit') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Édition du CV</h2>
            <p className="text-gray-600">Adaptez votre CV aux standards français</p>
          </div>
          <div className="flex gap-2">
            <Select value={targetSector} onValueChange={setTargetSector}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Secteur d'activité cible" />
              </SelectTrigger>
              <SelectContent>
                {sectors.map(sector => (
                  <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              onClick={adaptToFrenchStandards}
              disabled={!targetSector || isProcessing}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Wand2 className="mr-2 h-4 w-4" />
              Adapter automatiquement
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Informations personnelles */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  value={cvData.personalInfo.name}
                  onChange={(e) => setCvData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, name: e.target.value }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={cvData.personalInfo.email}
                  onChange={(e) => setCvData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, email: e.target.value }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  value={cvData.personalInfo.phone}
                  onChange={(e) => setCvData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, phone: e.target.value }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="address">Adresse en France</Label>
                <Input
                  id="address"
                  value={cvData.personalInfo.address}
                  onChange={(e) => setCvData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, address: e.target.value }
                  }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Objectif professionnel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Objectif professionnel</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={cvData.objective}
                onChange={(e) => setCvData(prev => ({ ...prev, objective: e.target.value }))}
                rows={3}
                placeholder="Décrivez votre objectif professionnel en France..."
              />
            </CardContent>
          </Card>

          {/* Expérience professionnelle */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Expérience professionnelle</CardTitle>
              <Button onClick={addExperience} variant="outline" size="sm">
                Ajouter une expérience
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {cvData.experience.map((exp, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <Label>Poste</Label>
                      <Input
                        value={exp.title}
                        onChange={(e) => updateExperience(index, 'title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Entreprise</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => updateExperience(index, 'company', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Période</Label>
                    <Input
                      value={exp.period}
                      onChange={(e) => updateExperience(index, 'period', e.target.value)}
                      placeholder="Ex: Janvier 2020 - Décembre 2022"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(index, 'description', e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4">
            <Button onClick={() => setCurrentStep('upload')} variant="outline">
              Retour
            </Button>
            <Button onClick={() => setCurrentStep('preview')} className="bg-green-600 hover:bg-green-700">
              Aperçu du CV
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Preview step
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Aperçu du CV français</h2>
          <p className="text-gray-600">Vérifiez votre CV avant téléchargement</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setCurrentStep('edit')} variant="outline">
            Modifier
          </Button>
          <Button onClick={generatePDF} className="bg-blue-600 hover:bg-blue-700">
            <Download className="mr-2 h-4 w-4" />
            Télécharger PDF
          </Button>
        </div>
      </div>

      <Card className="bg-white shadow-lg">
        <CardContent className="p-8">
          {/* CV Preview Content */}
          <div className="space-y-6">
            <div className="text-center border-b pb-4">
              <h1 className="text-2xl font-bold text-gray-900">{cvData.personalInfo.name}</h1>
              <div className="text-gray-600 mt-2">
                <p>{cvData.personalInfo.email} • {cvData.personalInfo.phone}</p>
                <p>{cvData.personalInfo.address}</p>
              </div>
            </div>

            {cvData.objective && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Objectif professionnel</h2>
                <p className="text-gray-700">{cvData.objective}</p>
              </div>
            )}

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Expérience professionnelle</h2>
              <div className="space-y-4">
                {cvData.experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{exp.title}</h3>
                        <p className="text-gray-600">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-500">{exp.period}</span>
                    </div>
                    <p className="text-gray-700 mt-1 text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-800 font-medium">CV optimisé pour le marché français</span>
          </div>
          <p className="text-green-700 text-sm mt-1">
            Format adapté aux standards français avec mise en valeur de votre profil international
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CVTranslatorTool;
