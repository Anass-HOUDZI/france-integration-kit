
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingDown, FileText, Calculator, MessageSquare, CheckSquare, AlertTriangle } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';

interface RentNegotiatorProps {
  userProfile: any;
  diagnostic: any;
}

const RentNegotiator: React.FC<RentNegotiatorProps> = ({ userProfile }) => {
  const { saveToolData } = useUserProfile();
  const [currentRent, setCurrentRent] = useState('');
  const [propertySize, setPropertySize] = useState('');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [leaseType, setLeaseType] = useState('');
  const [issues, setIssues] = useState<string[]>([]);
  const [customIssue, setCustomIssue] = useState('');
  const [negotiationStrategy, setNegotiationStrategy] = useState<any>(null);

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
    const rent = parseFloat(currentRent);
    const size = parseFloat(propertySize);
    const pricePerM2 = rent / size;
    
    // Simulation d'analyse de marché
    const marketPricePerM2 = 25; // Prix moyen simulé
    const isOverpriced = pricePerM2 > marketPricePerM2 * 1.1;
    const potentialReduction = isOverpriced ? Math.round((pricePerM2 - marketPricePerM2) * size) : 0;
    
    const strategy = {
      analysis: {
        currentPricePerM2: pricePerM2.toFixed(2),
        marketPricePerM2: marketPricePerM2.toFixed(2),
        isOverpriced,
        potentialReduction,
        negotiationChance: issues.length > 2 ? 'Élevée' : issues.length > 0 ? 'Moyenne' : 'Faible'
      },
      arguments: generateArguments(),
      letterTemplate: generateLetter(),
      tips: [
        'Préparez votre dossier avec des preuves (photos, estimations)',
        'Restez courtois et professionnel',
        'Proposez une contrepartie (bail plus long, travaux)',
        'Envoyez votre demande par courrier recommandé',
        'Préparez-vous à la négociation'
      ]
    };
    
    setNegotiationStrategy(strategy);
    
    // Sauvegarde
    saveToolData('rent_negotiator', {
      currentRent: rent,
      propertySize: size,
      location,
      propertyType,
      issues,
      strategy,
      createdAt: new Date().toISOString()
    });
  };

  const generateArguments = () => {
    const args = [];
    
    if (issues.length > 0) {
      args.push({
        title: 'Problèmes identifiés',
        description: `Le logement présente ${issues.length} problème(s) qui affectent le confort`,
        strength: 'Fort'
      });
    }
    
    args.push({
      title: 'Analyse du marché',
      description: 'Comparaison avec les prix pratiqués dans le quartier',
      strength: 'Moyen'
    });
    
    if (leaseType === 'renewal') {
      args.push({
        title: 'Locataire fidèle',
        description: 'Historique de paiements réguliers et entretien du logement',
        strength: 'Moyen'
      });
    }
    
    return args;
  };

  const generateLetter = () => {
    return `Madame, Monsieur,

Je me permets de vous contacter concernant le logement que j'occupe au [ADRESSE].

Après [DURÉE] de location, je souhaiterais renégocier le montant du loyer actuellement fixé à ${currentRent}€.

Arguments justifiant ma demande :

${issues.length > 0 ? `• État du logement : Le logement présente plusieurs problèmes (${issues.slice(0, 3).join(', ')}) qui affectent mon confort quotidien.` : ''}

• Analyse du marché : Selon mes recherches, le loyer pratiqué semble supérieur aux prix du marché pour ce type de bien dans ce quartier.

• Proposition : Je propose une réduction du loyer de [MONTANT]€, soit un nouveau loyer de [NOUVEAU_MONTANT]€.

En contrepartie, je m'engage à :
- Maintenir le logement en parfait état
- [AUTRES CONTREPARTIES]

Je reste à votre disposition pour en discuter et trouver une solution mutuellement satisfaisante.

Cordialement,
[VOTRE NOM]`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Guide Négociation Loyer
        </h1>
        <p className="text-lg text-gray-600">
          Obtenez les arguments et outils pour négocier votre loyer
        </p>
      </div>

      {/* Informations du logement */}
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
              <Label htmlFor="location">Localisation</Label>
              <Input
                id="location"
                placeholder="Paris 11ème, Lyon 2ème..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
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
            
            <div className="md:col-span-2">
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
        <TrendingDown className="mr-2 h-5 w-5" />
        Générer ma stratégie de négociation
      </Button>

      {/* Résultats */}
      {negotiationStrategy && (
        <div className="space-y-6">
          {/* Analyse */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Analyse de votre situation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {negotiationStrategy.analysis.currentPricePerM2}€
                  </div>
                  <div className="text-sm text-gray-600">Prix/m² actuel</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {negotiationStrategy.analysis.marketPricePerM2}€
                  </div>
                  <div className="text-sm text-gray-600">Prix/m² marché</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {negotiationStrategy.analysis.negotiationChance}
                  </div>
                  <div className="text-sm text-gray-600">Chance de succès</div>
                </div>
              </div>
              
              {negotiationStrategy.analysis.potentialReduction > 0 && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800">
                    <strong>Réduction potentielle :</strong> {negotiationStrategy.analysis.potentialReduction}€/mois
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Arguments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Vos arguments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {negotiationStrategy.arguments.map((arg: any, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <CheckSquare className="h-5 w-5 text-green-600 mt-1" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{arg.title}</h4>
                        <Badge variant={arg.strength === 'Fort' ? 'default' : 'secondary'}>
                          {arg.strength}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{arg.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Modèle de lettre */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Modèle de lettre
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={negotiationStrategy.letterTemplate}
                readOnly
                className="min-h-[300px] font-mono text-sm"
              />
              <p className="text-sm text-gray-600 mt-2">
                Adaptez cette lettre à votre situation et envoyez-la par courrier recommandé.
              </p>
            </CardContent>
          </Card>

          {/* Conseils */}
          <Card>
            <CardHeader>
              <CardTitle>Conseils pour réussir</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {negotiationStrategy.tips.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckSquare className="h-4 w-4 text-green-600 mt-1" />
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RentNegotiator;
