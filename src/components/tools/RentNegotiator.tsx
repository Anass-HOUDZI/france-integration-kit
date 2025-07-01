
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingDown, FileText, Calculator, MessageSquare, CheckSquare, AlertTriangle, Scale, Clock, Calendar, BarChart } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';

interface RentNegotiatorProps {
  userProfile: any;
  diagnostic: any;
}

const RentNegotiator: React.FC<RentNegotiatorProps> = ({ userProfile }) => {
  const { saveToolData } = useUserProfile();
  const [activeTab, setActiveTab] = useState('analysis');
  const [currentRent, setCurrentRent] = useState('');
  const [propertySize, setPropertySize] = useState('');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [leaseType, setLeaseType] = useState('');
  const [leaseStartDate, setLeaseStartDate] = useState('');
  const [issues, setIssues] = useState<string[]>([]);
  const [customIssue, setCustomIssue] = useState('');
  const [negotiationStrategy, setNegotiationStrategy] = useState<any>(null);
  const [selectedArguments, setSelectedArguments] = useState<string[]>([]);
  const [negotiationProgress, setNegotiationProgress] = useState<any>(null);

  const commonIssues = [
    'Problèmes d\'humidité',
    'Isolation phonique insuffisante',
    'Chauffage défaillant',
    'Vétusté de la salle de bain',
    'Cuisine non équipée',
    'Pas d\'ascenseur',
    'Fenêtres vétustes',
    'Problèmes de plomberie',
    'Absence de parking',
    'Quartier bruyant'
  ];

  const legalArguments = [
    {
      id: 'market_price',
      title: 'Prix du marché',
      description: 'Le loyer dépasse les prix pratiqués dans le secteur',
      article: 'Art. 17 Loi 89-462',
      strength: 'Fort'
    },
    {
      id: 'property_state',
      title: 'État du logement',
      description: 'Défauts affectant l\'usage normal du logement',
      article: 'Art. 1719 Code Civil',
      strength: 'Fort'
    },
    {
      id: 'irl_revision',
      title: 'Révision IRL',
      description: 'Révision selon l\'Indice de Référence des Loyers',
      article: 'Art. 17-1 Loi 89-462',
      strength: 'Moyen'
    },
    {
      id: 'loyal_tenant',
      title: 'Locataire fidèle',
      description: 'Historique de paiements réguliers',
      article: 'Négociation amiable',
      strength: 'Faible'
    }
  ];

  // Calcul IRL
  const calculateIRL = () => {
    const rent = parseFloat(currentRent);
    if (!rent || !leaseStartDate) return null;

    // Simulation IRL (en réalité, il faudrait utiliser les données INSEE)
    const currentIRL = 134.65; // IRL T4 2024 (exemple)
    const baseIRL = 128.45; // IRL lors de la signature (exemple)
    const irlIncrease = (currentIRL / baseIRL - 1) * 100;
    const maxIncrease = rent * (currentIRL / baseIRL - 1);

    return {
      currentIRL,
      baseIRL,
      irlIncrease,
      maxIncrease,
      newMaxRent: rent + maxIncrease
    };
  };

  // Analyse prix marché
  const analyzeMarketPrice = () => {
    const rent = parseFloat(currentRent);
    const size = parseFloat(propertySize);
    const pricePerM2 = rent / size;
    
    // Simulation d'analyse de marché selon la localisation
    const marketData = {
      'Paris': { min: 28, max: 45, avg: 35 },
      'Lyon': { min: 15, max: 25, avg: 20 },
      'Marseille': { min: 12, max: 20, avg: 16 },
      'Toulouse': { min: 13, max: 22, avg: 17 }
    };

    const cityData = marketData[location as keyof typeof marketData] || { min: 15, max: 30, avg: 22 };
    const marketPricePerM2 = cityData.avg;
    const isOverpriced = pricePerM2 > marketPricePerM2 * 1.15;
    const potentialReduction = isOverpriced ? Math.round((pricePerM2 - marketPricePerM2) * size) : 0;
    
    return {
      currentPricePerM2: pricePerM2.toFixed(2),
      marketPricePerM2: marketPricePerM2.toFixed(2),
      marketRange: `${cityData.min}-${cityData.max}€/m²`,
      isOverpriced,
      potentialReduction,
      negotiationChance: issues.length > 2 ? 'Élevée' : issues.length > 0 ? 'Moyenne' : 'Faible'
    };
  };

  const addIssue = (issue: string) => {
    if (!issues.includes(issue)) {
      setIssues([...issues, issue]);
    }
  };

  const removeIssue = (issue: string) => {
    setIssues(issues.filter(i => i !== issue));
  };

  const addCustomIssue = () => {
    if (customIssue && !issues.includes(customIssue)) {
      setIssues([...issues, customIssue]);
      setCustomIssue('');
    }
  };

  const generateStrategy = () => {
    const marketAnalysis = analyzeMarketPrice();
    const irlData = calculateIRL();
    
    const strategy = {
      marketAnalysis,
      irlData,
      arguments: generateArguments(),
      letterTemplates: generateLetterTemplates(),
      conciliationProcess: getConciliationProcess(),
      followUp: getFollowUpSteps()
    };
    
    setNegotiationStrategy(strategy);
    
    // Sauvegarde
    saveToolData('rent_negotiator', {
      currentRent: parseFloat(currentRent),
      propertySize: parseFloat(propertySize),
      location,
      propertyType,
      leaseType,
      issues,
      strategy,
      createdAt: new Date().toISOString()
    });
  };

  const generateArguments = () => {
    const marketAnalysis = analyzeMarketPrice();
    const args = [];
    
    if (marketAnalysis.isOverpriced) {
      args.push({
        ...legalArguments.find(arg => arg.id === 'market_price')!,
        evidence: `Écart de ${(parseFloat(marketAnalysis.currentPricePerM2) - parseFloat(marketAnalysis.marketPricePerM2)).toFixed(2)}€/m² vs marché`
      });
    }
    
    if (issues.length > 0) {
      args.push({
        ...legalArguments.find(arg => arg.id === 'property_state')!,
        evidence: `${issues.length} problème(s) identifié(s) affectant l'usage`
      });
    }
    
    const irlData = calculateIRL();
    if (irlData && leaseType === 'renewal') {
      args.push({
        ...legalArguments.find(arg => arg.id === 'irl_revision')!,
        evidence: `Révision légale maximale : ${irlData.maxIncrease.toFixed(2)}€`
      });
    }
    
    if (leaseType === 'renewal') {
      args.push({
        ...legalArguments.find(arg => arg.id === 'loyal_tenant')!,
        evidence: 'Locataire sans incident de paiement'
      });
    }
    
    return args;
  };

  const generateLetterTemplates = () => {
    const baseInfo = {
      currentRent: parseFloat(currentRent),
      potentialReduction: analyzeMarketPrice().potentialReduction
    };

    return {
      initial: generateInitialLetter(baseInfo),
      formal: generateFormalLetter(baseInfo),
      conciliation: generateConciliationLetter(baseInfo)
    };
  };

  const generateInitialLetter = (info: any) => {
    return `Madame, Monsieur,

Je me permets de vous contacter concernant le logement que j'occupe au [ADRESSE], pour lequel je souhaiterais engager une discussion sur le montant du loyer.

Après analyse du marché locatif local et compte tenu de l'état du logement, je pense qu'une révision du loyer serait justifiée.

ARGUMENTS PRINCIPAUX :
${issues.length > 0 ? `• État du logement : Plusieurs dysfonctionnements affectent mon usage (${issues.slice(0, 3).join(', ')})` : ''}
• Analyse comparative : Le loyer actuel (${info.currentRent}€) semble supérieur aux prix pratiqués dans le secteur

Je propose une réduction de ${info.potentialReduction}€, soit un nouveau loyer de ${(info.currentRent - info.potentialReduction)}€.

Je reste à votre disposition pour en discuter.

Cordialement,
[VOTRE NOM]`;
  };

  const generateFormalLetter = (info: any) => {
    return `LETTRE RECOMMANDÉE AVEC ACCUSÉ DE RÉCEPTION

Madame, Monsieur,

Par la présente, je vous informe de ma demande de révision du loyer du logement situé [ADRESSE], conformément aux dispositions légales.

FONDEMENTS JURIDIQUES :
• Article 17 de la loi n°89-462 du 6 juillet 1989
• Article 1719 du Code Civil
${calculateIRL() ? '• Article 17-1 concernant la révision selon l\'IRL' : ''}

ÉLÉMENTS DE JUSTIFICATION :
• Analyse comparative du marché locatif
• État du logement nécessitant des améliorations
• Respect des dispositions légales

En l'absence de réponse dans un délai de 2 mois, je me réserve le droit de saisir la commission départementale de conciliation.

Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

[VOTRE NOM]
[DATE]`;
  };

  const generateConciliationLetter = (info: any) => {
    return `SAISINE COMMISSION DÉPARTEMENTALE DE CONCILIATION

Madame, Monsieur le Président,

Je saisis votre commission d'un litige locatif m'opposant à mon propriétaire concernant le montant du loyer.

OBJET DU LITIGE :
• Demande de révision du loyer pour sur-évaluation
• Loyer actuel : ${info.currentRent}€
• Réduction demandée : ${info.potentialReduction}€

TENTATIVES DE RÉSOLUTION AMIABLE :
• Courrier du [DATE] resté sans réponse
• Relance du [DATE] sans suite

PIÈCES JOINTES :
• Copie du bail
• Justificatifs des désordres
• Étude comparative des loyers

Je sollicite votre intervention pour parvenir à un accord amiable.

Veuillez agréer, Madame, Monsieur le Président, l'expression de ma haute considération.

[VOTRE NOM]`;
  };

  const getConciliationProcess = () => {
    return {
      steps: [
        {
          title: 'Saisine de la commission',
          description: 'Envoi du dossier à la commission départementale',
          delay: 'Immédiat',
          required: ['Copie du bail', 'Preuves des désordres', 'Étude comparative']
        },
        {
          title: 'Convocation des parties',
          description: 'Réception de la convocation par courrier',
          delay: '4-6 semaines',
          required: ['Présence obligatoire', 'Dossier complet']
        },
        {
          title: 'Audience de conciliation',
          description: 'Présentation des arguments devant la commission',
          delay: '1-2 heures',
          required: ['Arguments préparés', 'Pièces justificatives']
        },
        {
          title: 'Décision',
          description: 'Avis motivé de la commission',
          delay: '15 jours',
          required: ['Mise en œuvre selon accord']
        }
      ],
      contacts: {
        commission: 'Commission Départementale de Conciliation',
        adresse: '[À rechercher selon votre département]',
        gratuit: true
      }
    };
  };

  const getFollowUpSteps = () => {
    return [
      {
        week: 1,
        action: 'Envoi courrier initial',
        status: 'À faire'
      },
      {
        week: 3,
        action: 'Relance si pas de réponse',
        status: 'En attente'
      },
      {
        week: 6,
        action: 'Courrier recommandé',
        status: 'En attente'
      },
      {
        week: 10,
        action: 'Saisine commission conciliation',
        status: 'En attente'
      }
    ];
  };

  const startNegotiationTracking = () => {
    const progress = {
      startDate: new Date().toISOString(),
      status: 'initiated',
      steps: getFollowUpSteps(),
      communications: []
    };
    setNegotiationProgress(progress);
    
    saveToolData('rent_negotiation_progress', progress);
  };

  const renderAnalysisTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Informations sur votre logement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="currentRent">Loyer actuel (€)</Label>
              <Input
                id="currentRent"
                type="number"
                placeholder="1200"
                value={currentRent}
                onChange={(e) => setCurrentRent(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="propertySize">Surface (m²)</Label>
              <Input
                id="propertySize"
                type="number"
                placeholder="50"
                value={propertySize}
                onChange={(e) => setPropertySize(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="location">Ville</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Paris">Paris</SelectItem>
                  <SelectItem value="Lyon">Lyon</SelectItem>
                  <SelectItem value="Marseille">Marseille</SelectItem>
                  <SelectItem value="Toulouse">Toulouse</SelectItem>
                  <SelectItem value="autre">Autre ville</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Type de bien</Label>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="t1">T1</SelectItem>
                  <SelectItem value="t2">T2</SelectItem>
                  <SelectItem value="t3">T3</SelectItem>
                  <SelectItem value="t4">T4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Type de négociation</Label>
              <Select value={leaseType} onValueChange={setLeaseType}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="initial">Nouveau bail</SelectItem>
                  <SelectItem value="renewal">Renouvellement</SelectItem>
                  <SelectItem value="revision">Révision en cours de bail</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="leaseStartDate">Date début bail</Label>
              <Input
                id="leaseStartDate"
                type="date"
                value={leaseStartDate}
                onChange={(e) => setLeaseStartDate(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Problèmes identifiés */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Problèmes du logement
          </CardTitle>
          <CardDescription>
            Sélectionnez les problèmes qui affectent votre logement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {commonIssues.map((issue) => (
                <Button
                  key={issue}
                  variant={issues.includes(issue) ? "default" : "outline"}
                  size="sm"
                  onClick={() => issues.includes(issue) ? removeIssue(issue) : addIssue(issue)}
                  className="text-left justify-start h-auto py-2"
                >
                  {issue}
                </Button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Autre problème..."
                value={customIssue}
                onChange={(e) => setCustomIssue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCustomIssue()}
              />
              <Button onClick={addCustomIssue} disabled={!customIssue}>
                Ajouter
              </Button>
            </div>
            
            {issues.length > 0 && (
              <div className="space-y-2">
                <Label>Problèmes sélectionnés :</Label>
                <div className="flex flex-wrap gap-2">
                  {issues.map((issue) => (
                    <Badge key={issue} variant="secondary" className="cursor-pointer" onClick={() => removeIssue(issue)}>
                      {issue} ×
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Button 
        onClick={generateStrategy}
        disabled={!currentRent || !propertySize || !location}
        className="w-full"
        size="lg"
      >
        <BarChart className="mr-2 h-5 w-5" />
        Analyser ma situation
      </Button>
    </div>
  );

  const renderResultsTab = () => {
    if (!negotiationStrategy) return null;

    return (
      <div className="space-y-6">
        {/* Analyse marché */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Analyse du marché
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {negotiationStrategy.marketAnalysis.currentPricePerM2}€
                </div>
                <div className="text-sm text-gray-600">Prix/m² actuel</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {negotiationStrategy.marketAnalysis.marketPricePerM2}€
                </div>
                <div className="text-sm text-gray-600">Prix/m² marché</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {negotiationStrategy.marketAnalysis.negotiationChance}
                </div>
                <div className="text-sm text-gray-600">Chance de succès</div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Fourchette marché :</strong> {negotiationStrategy.marketAnalysis.marketRange}
              </p>
              {negotiationStrategy.marketAnalysis.potentialReduction > 0 && (
                <p className="text-green-700 font-medium">
                  <strong>Réduction potentielle :</strong> {negotiationStrategy.marketAnalysis.potentialReduction}€/mois
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Calcul IRL */}
        {negotiationStrategy.irlData && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Calcul IRL (Indice Référence Loyers)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded">
                  <div className="text-lg font-bold text-blue-600">
                    {negotiationStrategy.irlData.baseIRL}
                  </div>
                  <div className="text-xs text-gray-600">IRL signature</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded">
                  <div className="text-lg font-bold text-green-600">
                    {negotiationStrategy.irlData.currentIRL}
                  </div>
                  <div className="text-xs text-gray-600">IRL actuel</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded">
                  <div className="text-lg font-bold text-yellow-600">
                    +{negotiationStrategy.irlData.irlIncrease.toFixed(2)}%
                  </div>
                  <div className="text-xs text-gray-600">Évolution</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded">
                  <div className="text-lg font-bold text-red-600">
                    {negotiationStrategy.irlData.newMaxRent.toFixed(0)}€
                  </div>
                  <div className="text-xs text-gray-600">Loyer max légal</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Arguments juridiques */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Arguments juridiques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {negotiationStrategy.arguments.map((arg: any, index: number) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <CheckSquare className="h-5 w-5 text-green-600 mt-1" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{arg.title}</h4>
                      <div className="flex gap-2">
                        <Badge variant={arg.strength === 'Fort' ? 'default' : arg.strength === 'Moyen' ? 'secondary' : 'outline'}>
                          {arg.strength}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{arg.description}</p>
                    <p className="text-xs text-blue-600">{arg.article}</p>
                    {arg.evidence && (
                      <p className="text-sm font-medium text-green-700 mt-2">
                        Preuve : {arg.evidence}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderLettersTab = () => {
    if (!negotiationStrategy) return null;

    return (
      <div className="space-y-6">
        {Object.entries(negotiationStrategy.letterTemplates).map(([type, template]) => (
          <Card key={type}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {type === 'initial' ? 'Courrier initial' : 
                 type === 'formal' ? 'Lettre recommandée' : 
                 'Saisine conciliation'}
              </CardTitle>
              <CardDescription>
                {type === 'initial' ? 'Premier contact amiable' : 
                 type === 'formal' ? 'Mise en demeure officielle' : 
                 'Recours en cas d\'échec'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={template as string}
                readOnly
                className="min-h-[200px] font-mono text-sm"
              />
              <Button className="mt-2" variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Copier le modèle
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderConciliationTab = () => {
    if (!negotiationStrategy) return null;

    const process = negotiationStrategy.conciliationProcess;

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Procédure de conciliation
            </CardTitle>
            <CardDescription>
              Étapes pour saisir la commission départementale
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {process.steps.map((step: any, index: number) => (
                <div key={index} className="flex gap-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{step.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">
                        <Clock className="mr-1 h-3 w-3" />
                        {step.delay}
                      </Badge>
                      <div className="text-sm text-gray-500">
                        Documents : {step.required.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Informations importantes</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• La procédure est entièrement gratuite</li>
                <li>• La commission n'a qu'un rôle consultatif</li>
                <li>• L'avis n'est pas contraignant mais fait autorité</li>
                <li>• Possibilité de recours au tribunal judiciaire ensuite</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderTrackingTab = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Suivi de négociation
            </CardTitle>
            <CardDescription>
              Planifiez et suivez vos démarches
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!negotiationProgress ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">
                  Lancez le suivi de votre négociation pour planifier vos actions
                </p>
                <Button onClick={startNegotiationTracking}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Démarrer le suivi
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {negotiationProgress.steps.map((step: any, index: number) => (
                  <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${
                      step.status === 'completed' ? 'bg-green-500' : 
                      step.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                    }`} />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{step.action}</span>
                        <Badge variant="outline">Semaine {step.week}</Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      {step.status === 'completed' ? 'Fait' : 'Marquer fait'}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Guide Négociation Loyer
        </h1>
        <p className="text-lg text-gray-600">
          Analysez, argumentez et négociez votre loyer avec tous les outils juridiques
        </p>
      </div>

      {/* Navigation tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: 'analysis', label: 'Analyse', icon: BarChart },
          { id: 'results', label: 'Résultats', icon: Calculator },
          { id: 'letters', label: 'Modèles lettres', icon: FileText },
          { id: 'conciliation', label: 'Conciliation', icon: Scale },
          { id: 'tracking', label: 'Suivi', icon: Calendar }
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'outline'}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-2"
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Content based on active tab */}
      {activeTab === 'analysis' && renderAnalysisTab()}
      {activeTab === 'results' && renderResultsTab()}
      {activeTab === 'letters' && renderLettersTab()}
      {activeTab === 'conciliation' && renderConciliationTab()}
      {activeTab === 'tracking' && renderTrackingTab()}
    </div>
  );
};

export default RentNegotiator;
