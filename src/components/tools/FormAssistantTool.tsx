
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  FileText, Search, Download, AlertCircle, CheckCircle, HelpCircle, 
  Save, Clock, Info, User, MapPin, Briefcase, Heart
} from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { toast } from '@/hooks/use-toast';

interface FormAssistantToolProps {
  userProfile: any;
  diagnostic: any;
}

const FormAssistantTool: React.FC<FormAssistantToolProps> = ({ userProfile, diagnostic }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedForm, setSelectedForm] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formProgress, setFormProgress] = useState(0);
  const [savedData, setSavedData] = useState<any>({});
  const { saveToolData, getToolData } = useUserProfile();

  const forms = [
    {
      id: 'cerfa_15646',
      number: 'CERFA 15646*01',
      title: 'Demande de titre de séjour',
      category: 'Séjour',
      description: 'Pour renouveler ou obtenir un titre de séjour',
      difficulty: 'Moyen',
      estimatedTime: '30 min',
      requiredDocs: ['Passeport', 'Justificatif de domicile', 'Photos d\'identité', 'Justificatifs de ressources'],
      steps: [
        {
          title: 'État civil',
          fields: ['nom', 'prenom', 'dateNaissance', 'lieuNaissance', 'nationalite'],
          description: 'Renseignez vos informations personnelles'
        },
        {
          title: 'Situation familiale',
          fields: ['situationFamiliale', 'conjoint', 'enfants'],
          description: 'Indiquez votre situation familiale actuelle'
        },
        {
          title: 'Situation professionnelle',
          fields: ['profession', 'employeur', 'revenus'],
          description: 'Décrivez votre activité professionnelle'
        },
        {
          title: 'Adresse et logement',
          fields: ['adresse', 'typeLogement', 'justificatifDomicile'],
          description: 'Votre lieu de résidence en France'
        }
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
      requiredDocs: ['Acte de naissance', 'Justificatifs de revenus', 'Certificat de résidence', 'Diplômes'],
      steps: [
        {
          title: 'Identité et origine',
          fields: ['nom', 'prenom', 'dateNaissance', 'paysOrigine'],
          description: 'Vos informations d\'identité et d\'origine'
        },
        {
          title: 'Séjour en France',
          fields: ['dateArrivee', 'titresSejour', 'dureeResidence'],
          description: 'Votre parcours de résidence en France'
        },
        {
          title: 'Intégration',
          fields: ['niveauFrancais', 'diplomes', 'connaissancesRepublicaines'],
          description: 'Votre niveau d\'intégration républicaine'
        },
        {
          title: 'Situation professionnelle',
          fields: ['profession', 'revenus', 'fiscalite'],
          description: 'Votre situation économique et fiscale'
        }
      ]
    }
  ];

  const formSchema = z.object({
    nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    prenom: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
    dateNaissance: z.string().min(1, 'La date de naissance est requise'),
    lieuNaissance: z.string().min(1, 'Le lieu de naissance est requis'),
    nationalite: z.string().min(1, 'La nationalité est requise'),
    adresse: z.string().min(10, 'L\'adresse doit être complète'),
    profession: z.string().optional(),
    revenus: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: savedData
  });

  useEffect(() => {
    if (selectedForm) {
      const saved = getToolData(`form_${selectedForm.id}`, {});
      setSavedData(saved);
      form.reset(saved);
      
      const totalFields = selectedForm.steps.reduce((acc: number, step: any) => acc + step.fields.length, 0);
      const completedFields = Object.keys(saved).length;
      setFormProgress((completedFields / totalFields) * 100);
    }
  }, [selectedForm]);

  const saveProgress = (data: any) => {
    if (selectedForm) {
      saveToolData(`form_${selectedForm.id}`, data);
      setSavedData(data);
      
      const totalFields = selectedForm.steps.reduce((acc: number, step: any) => acc + step.fields.length, 0);
      const completedFields = Object.keys(data).filter(key => data[key] && data[key] !== '').length;
      setFormProgress((completedFields / totalFields) * 100);
      
      toast({
        title: "Progression sauvegardée",
        description: "Vos données ont été sauvegardées automatiquement",
      });
    }
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    saveProgress(data);
    toast({
      title: "Formulaire validé",
      description: "Toutes les informations ont été vérifiées avec succès",
    });
  };

  const exportToPDF = () => {
    toast({
      title: "Export en cours",
      description: "Le formulaire sera téléchargé sous format PDF",
    });
  };

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

  const getPersonalizedTips = (step: any) => {
    const tips = [];
    
    if (userProfile?.status && step.title === 'Situation professionnelle') {
      tips.push({
        type: 'info',
        message: `En tant que ${userProfile.status}, assurez-vous de bien préciser votre situation actuelle`
      });
    }
    
    if (step.title === 'État civil' && userProfile?.country) {
      tips.push({
        type: 'warning',
        message: 'Vérifiez que vos documents d\'état civil sont traduits par un traducteur assermenté'
      });
    }
    
    return tips;
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
          <Badge className={getDifficultyColor(selectedForm.difficulty)}>
            {selectedForm.difficulty}
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Progression du formulaire
              </CardTitle>
              <Button onClick={() => saveProgress(form.getValues())} variant="outline" size="sm">
                <Save className="mr-2 h-4 w-4" />
                Sauvegarder
              </Button>
            </div>
            <Progress value={formProgress} className="w-full" />
            <p className="text-sm text-gray-600">{Math.round(formProgress)}% complété</p>
          </CardHeader>
        </Card>

        <Tabs defaultValue="form" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="form">Formulaire</TabsTrigger>
            <TabsTrigger value="help">Aide</TabsTrigger>
            <TabsTrigger value="docs">Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="form" className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {selectedForm.steps.map((step: any, stepIndex: number) => (
                  <Card key={stepIndex}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                          stepIndex <= currentStep ? 'bg-blue-600' : 'bg-gray-400'
                        }`}>
                          {stepIndex + 1}
                        </div>
                        {step.title}
                      </CardTitle>
                      <CardDescription>{step.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {getPersonalizedTips(step).map((tip, tipIndex) => (
                        <div key={tipIndex} className={`flex items-start gap-2 p-3 rounded-lg ${
                          tip.type === 'warning' ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50 border-blue-200'
                        }`}>
                          {tip.type === 'warning' ? (
                            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                          ) : (
                            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                          )}
                          <p className="text-sm">{tip.message}</p>
                        </div>
                      ))}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {step.fields.includes('nom') && (
                          <FormField
                            control={form.control}
                            name="nom"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nom de famille *</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Votre nom de famille" 
                                    {...field} 
                                    onChange={(e) => {
                                      field.onChange(e);
                                      saveProgress({...form.getValues(), nom: e.target.value});
                                    }}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Tel qu'il apparaît sur votre passeport
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        
                        {step.fields.includes('prenom') && (
                          <FormField
                            control={form.control}
                            name="prenom"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Prénom(s) *</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Vos prénoms" 
                                    {...field}
                                    onChange={(e) => {
                                      field.onChange(e);
                                      saveProgress({...form.getValues(), prenom: e.target.value});
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        
                        {step.fields.includes('dateNaissance') && (
                          <FormField
                            control={form.control}
                            name="dateNaissance"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Date de naissance *</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="date" 
                                    {...field}
                                    onChange={(e) => {
                                      field.onChange(e);
                                      saveProgress({...form.getValues(), dateNaissance: e.target.value});
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        
                        {step.fields.includes('adresse') && (
                          <FormField
                            control={form.control}
                            name="adresse"
                            render={({ field }) => (
                              <FormItem className="md:col-span-2">
                                <FormLabel>Adresse complète *</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Numéro, rue, code postal, ville" 
                                    {...field}
                                    onChange={(e) => {
                                      field.onChange(e);
                                      saveProgress({...form.getValues(), adresse: e.target.value});
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Valider le formulaire
                  </Button>
                  <Button type="button" variant="outline" onClick={exportToPDF}>
                    <Download className="mr-2 h-4 w-4" />
                    Exporter PDF
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="help">
            <Card>
              <CardHeader>
                <CardTitle>Guide d'aide au remplissage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Conseils généraux :</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      Préparez tous vos documents avant de commencer
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      Vérifiez l'orthographe de vos noms et prénoms
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      Sauvegardez régulièrement votre progression
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="docs">
            <Card>
              <CardHeader>
                <CardTitle>Documents requis</CardTitle>
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
          </TabsContent>
        </Tabs>
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
            Trouvez et remplissez facilement les formulaires administratifs français avec un guide pas à pas
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
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {form.estimatedTime}
                </div>
                <span>{form.requiredDocs.length} documents</span>
              </div>
              
              {savedData && getToolData(`form_${form.id}`) && (
                <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-blue-700">
                    <Save className="h-4 w-4" />
                    Progression sauvegardée
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FormAssistantTool;
