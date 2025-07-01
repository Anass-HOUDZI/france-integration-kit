import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Shield, Calculator, FileText, TrendingUp, CheckSquare, AlertCircle, Phone, Mail, Globe, X, Eye, Download, Calendar } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useI18n } from '@/hooks/useI18n';

interface InsuranceOffer {
  id: string;
  name: string;
  monthlyPremium: number;
  coverage: number;
  deductible: number;
  features: string[];
  rating: number;
  pros: string[];
  cons: string[];
  contractConditions: string[];
  exclusions: string[];
  recommended?: boolean;
  contactInfo: {
    phone: string;
    email: string;
    website: string;
  };
}

interface ClaimRecord {
  id: string;
  date: string;
  type: 'Vol' | 'Incendie' | 'Dégâts des eaux' | 'Bris de glace' | 'Autre';
  description: string;
  amount: number;
  status: 'En cours' | 'Accepté' | 'Refusé' | 'Payé';
  documents: string[];
}

interface InsuranceProfile {
  propertyType: string;
  propertySize: string;
  propertyValue: string;
  location: string;
  floor: string;
  hasBalcony: boolean;
  hasGarden: boolean;
  hasCellar: boolean;
  hasExpensiveItems: boolean;
  currentInsurer?: string;
  currentPremium?: number;
  preferredLanguage: string;
}

interface InsuranceAssistantCompleteProps {
  userProfile?: any;
  diagnostic?: any;
}

const InsuranceAssistantComplete: React.FC<InsuranceAssistantCompleteProps> = ({ userProfile, diagnostic }) => {
  const { t, currentLanguage } = useI18n();
  const [activeTab, setActiveTab] = useState('simulation');
  const [profile, setProfile] = useLocalStorage<InsuranceProfile>('insurance_profile', {
    propertyType: '',
    propertySize: '',
    propertyValue: '',
    location: '',
    floor: '',
    hasBalcony: false,
    hasGarden: false,
    hasCellar: false,
    hasExpensiveItems: false,
    preferredLanguage: currentLanguage
  });
  
  const [offers, setOffers] = useLocalStorage<InsuranceOffer[]>('insurance_offers', []);
  const [claims, setClaims] = useLocalStorage<ClaimRecord[]>('insurance_claims', []);
  const [selectedOffer, setSelectedOffer] = useState<InsuranceOffer | null>(null);
  const [showConditions, setShowConditions] = useState(false);
  const [newClaim, setNewClaim] = useState<Partial<ClaimRecord>>({});

  // Base d'assureurs avec données complètes
  const baseInsurers: InsuranceOffer[] = [
    {
      id: 'maif',
      name: 'Maif',
      monthlyPremium: 15.99,
      coverage: 150000,
      deductible: 150,
      features: ['Vol', 'Incendie', 'Dégâts des eaux', 'Bris de glace', 'Responsabilité civile'],
      rating: 4.5,
      pros: ['Service client réactif', 'Tarifs compétitifs', 'Application mobile pratique'],
      cons: ['Franchise élevée pour certains sinistres', 'Couverture limitée objets de valeur'],
      contractConditions: [
        'Engagement minimum 1 an',
        'Préavis résiliation 2 mois',
        'Expertise obligatoire sinistres > 1600€',
        'Franchise modulable selon garanties'
      ],
      exclusions: [
        'Objets de valeur > 3000€ non déclarés',
        'Dégâts dus à négligence grave',
        'Catastrophes naturelles sans arrêté préfectoral'
      ],
      contactInfo: {
        phone: '05 49 73 73 73',
        email: 'contact@maif.fr',
        website: 'www.maif.fr'
      }
    },
    {
      id: 'macif',
      name: 'Macif',
      monthlyPremium: 18.50,
      coverage: 200000,
      deductible: 120,
      features: ['Vol', 'Incendie', 'Dégâts des eaux', 'Responsabilité civile', 'Protection juridique', 'Assistance 24h/24'],
      rating: 4.3,
      pros: ['Couverture étendue', 'Assistance 24h/24', 'Protection juridique incluse'],
      cons: ['Prix légèrement plus élevé', 'Conditions strictes pour le vol'],
      contractConditions: [
        'Sans engagement',
        'Résiliation à tout moment après 1 an',
        'Télédéclaration sinistres',
        'Indemnisation rapide'
      ],
      exclusions: [
        'Vol sans effraction',
        'Dommages électriques sur appareils > 10 ans',
        'Négligence caractérisée'
      ],
      contactInfo: {
        phone: '09 69 32 20 32',
        email: 'contact@macif.fr',
        website: 'www.macif.fr'
      }
    },
    {
      id: 'matmut',
      name: 'Matmut',
      monthlyPremium: 14.20,
      coverage: 120000,
      deductible: 180,
      features: ['Vol', 'Incendie', 'Dégâts des eaux', 'Bris de glace'],
      rating: 4.1,
      pros: ['Prix attractif', 'Simplicité des contrats', 'Proximité conseillers'],
      cons: ['Couverture basique', 'Franchise importante', 'Options payantes'],
      contractConditions: [
        'Engagement 1 an renouvelable',
        'Préavis 2 mois pour résiliation',
        'Expertise systématique > 800€'
      ],
      exclusions: [
        'Appareils électroniques > 5 ans',
        'Jardins et extérieurs',
        'Objets précieux non déclarés'
      ],
      contactInfo: {
        phone: '02 35 03 68 68',
        email: 'contact@matmut.fr',
        website: 'www.matmut.fr'
      }
    }
  ];

  const calculateOffers = () => {
    const size = parseFloat(profile.propertySize);
    const value = parseFloat(profile.propertyValue);
    
    // Calcul des facteurs de risque
    const riskFactors = {
      location: profile.location.toLowerCase().includes('paris') ? 1.3 : 1.0,
      floor: parseInt(profile.floor) === 0 ? 1.2 : parseInt(profile.floor) > 3 ? 0.9 : 1.0,
      balcony: profile.hasBalcony ? 1.1 : 1.0,
      expensive: profile.hasExpensiveItems ? 1.4 : 1.0,
      propertyType: profile.propertyType === 'house' ? 1.2 : 1.0
    };
    
    const riskMultiplier = Object.values(riskFactors).reduce((a, b) => a * b, 1);
    
    // Ajustement des offres selon profil
    const adjustedOffers = baseInsurers.map(insurer => ({
      ...insurer,
      monthlyPremium: Math.round(insurer.monthlyPremium * riskMultiplier * 100) / 100,
      recommended: insurer.coverage >= value * 0.8
    })).sort((a, b) => {
      if (a.recommended && !b.recommended) return -1;
      if (!a.recommended && b.recommended) return 1;
      return a.monthlyPremium - b.monthlyPremium;
    });
    
    setOffers(adjustedOffers);
  };

  const translateConditions = (conditions: string[], targetLang: string) => {
    // Simulation de traduction - en réalité utiliserait une API
    const translations: Record<string, Record<string, string>> = {
      en: {
        'Engagement minimum 1 an': 'Minimum 1 year commitment',
        'Préavis résiliation 2 mois': '2 months notice for cancellation',
        'Vol sans effraction': 'Theft without break-in',
        'Dégâts des eaux': 'Water damage'
      },
      es: {
        'Engagement minimum 1 an': 'Compromiso mínimo 1 año',
        'Préavis résiliation 2 mois': 'Aviso previo 2 meses para cancelación',
        'Vol sans effraction': 'Robo sin allanamiento',
        'Dégâts des eaux': 'Daños por agua'
      }
    };
    
    if (targetLang === 'fr') return conditions;
    
    return conditions.map(condition => 
      translations[targetLang]?.[condition] || condition
    );
  };

  const addClaim = () => {
    if (newClaim.type && newClaim.description && newClaim.amount) {
      const claim: ClaimRecord = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        type: newClaim.type as ClaimRecord['type'],
        description: newClaim.description,
        amount: newClaim.amount,
        status: 'En cours',
        documents: []
      };
      setClaims([...claims, claim]);
      setNewClaim({});
    }
  };

  const cancelInsurance = (insurerId: string) => {
    // Génère une lettre de résiliation type
    const cancellationLetter = `
Madame, Monsieur,

Par la présente, je vous informe de ma décision de résilier mon contrat d'assurance habitation n° [NUMÉRO_CONTRAT] souscrit auprès de ${insurerId}.

Conformément aux dispositions légales, je respecte le préavis de 2 mois.

La résiliation prendra effet le [DATE_EFFET].

Je vous prie de bien vouloir me confirmer la prise en compte de cette résiliation et le remboursement du trop-perçu le cas échéant.

Cordialement,
[VOTRE NOM]
    `;
    
    // Simule le téléchargement
    const blob = new Blob([cancellationLetter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resiliation_${insurerId}.txt`;
    a.click();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
          <Shield className="h-8 w-8 text-blue-600" />
          Assistant Assurance Habitation Complet
        </h1>
        <p className="text-lg text-gray-600">
          Comparez, souscrivez et gérez votre assurance habitation en toute simplicité
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="simulation">Simulation</TabsTrigger>
          <TabsTrigger value="comparison">Comparaison</TabsTrigger>
          <TabsTrigger value="conditions">Conditions</TabsTrigger>
          <TabsTrigger value="claims">Sinistres</TabsTrigger>
          <TabsTrigger value="cancellation">Résiliation</TabsTrigger>
          <TabsTrigger value="profile">Profil</TabsTrigger>
        </TabsList>

        {/* Onglet Simulation */}
        <TabsContent value="simulation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Simulation selon votre profil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Type de logement</Label>
                  <Select value={profile.propertyType} onValueChange={(value) => setProfile({...profile, propertyType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Appartement</SelectItem>
                      <SelectItem value="house">Maison</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="loft">Loft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="propertySize">Surface (m²)</Label>
                  <Input
                    id="propertySize"
                    type="number"
                    placeholder="50"
                    value={profile.propertySize}
                    onChange={(e) => setProfile({...profile, propertySize: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="propertyValue">Valeur des biens (€)</Label>
                  <Input
                    id="propertyValue"
                    type="number"
                    placeholder="30000"
                    value={profile.propertyValue}
                    onChange={(e) => setProfile({...profile, propertyValue: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Ville/Quartier</Label>
                  <Input
                    id="location"
                    placeholder="Paris 11ème, Lyon..."
                    value={profile.location}
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="balcony" 
                    checked={profile.hasBalcony}
                    onCheckedChange={(checked) => setProfile({...profile, hasBalcony: checked === true})}
                  />
                  <Label htmlFor="balcony">Balcon/Terrasse</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="garden" 
                    checked={profile.hasGarden}
                    onCheckedChange={(checked) => setProfile({...profile, hasGarden: checked === true})}
                  />
                  <Label htmlFor="garden">Jardin</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="cellar" 
                    checked={profile.hasCellar}
                    onCheckedChange={(checked) => setProfile({...profile, hasCellar: checked === true})}
                  />
                  <Label htmlFor="cellar">Cave/Grenier</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="expensive" 
                    checked={profile.hasExpensiveItems}
                    onCheckedChange={(checked) => setProfile({...profile, hasExpensiveItems: checked === true})}
                  />
                  <Label htmlFor="expensive">Objets de valeur</Label>
                </div>
              </div>

              <Button onClick={calculateOffers} className="w-full">
                <Calculator className="mr-2 h-4 w-4" />
                Calculer les offres optimales
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Comparaison */}
        <TabsContent value="comparison">
          <div className="space-y-4">
            {offers.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">Effectuez d'abord une simulation pour voir les offres</p>
                </CardContent>
              </Card>
            ) : (
              offers.map((offer, index) => (
                <Card key={offer.id} className={`${offer.recommended ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {offer.name}
                          {index === 0 && <Badge className="bg-green-600">Recommandé</Badge>}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>⭐ {offer.rating}/5</span>
                          <span>Franchise: {offer.deductible}€</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {offer.monthlyPremium}€/mois
                        </div>
                        <div className="text-sm text-gray-600">
                          Couverture: {offer.coverage.toLocaleString()}€
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Garanties</h4>
                        <div className="space-y-1">
                          {offer.features.map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs mr-1 mb-1">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-green-600 mb-2">Avantages</h4>
                        <ul className="text-sm space-y-1">
                          {offer.pros.map((pro, i) => (
                            <li key={i} className="flex items-center gap-1">
                              <CheckSquare className="h-3 w-3 text-green-500" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-orange-600 mb-2">Inconvénients</h4>
                        <ul className="text-sm space-y-1">
                          {offer.cons.map((con, i) => (
                            <li key={i} className="flex items-center gap-1">
                              <AlertCircle className="h-3 w-3 text-orange-500" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedOffer(offer)}
                        >
                          <Eye className="mr-1 h-3 w-3" />
                          Détails
                        </Button>
                        <div className="text-xs space-y-1">
                          <div>📞 {offer.contactInfo.phone}</div>
                          <div>📧 {offer.contactInfo.email}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Onglet Conditions */}
        <TabsContent value="conditions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Traduction des conditions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Label>Langue de traduction</Label>
                <Select value={profile.preferredLanguage} onValueChange={(value) => setProfile({...profile, preferredLanguage: value})}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="it">Italiano</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {offers.map((offer) => (
                <Card key={offer.id} className="mb-4">
                  <CardHeader>
                    <CardTitle className="text-lg">{offer.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Conditions contractuelles</h4>
                      <ul className="space-y-1">
                        {translateConditions(offer.contractConditions, profile.preferredLanguage).map((condition, i) => (
                          <li key={i} className="text-sm flex items-center gap-2">
                            <CheckSquare className="h-3 w-3 text-blue-500" />
                            {condition}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2 text-red-600">Exclusions</h4>
                      <ul className="space-y-1">
                        {translateConditions(offer.exclusions, profile.preferredLanguage).map((exclusion, i) => (
                          <li key={i} className="text-sm flex items-center gap-2">
                            <X className="h-3 w-3 text-red-500" />
                            {exclusion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Sinistres */}
        <TabsContent value="claims">
          <div className="space-y-6">
            {/* Nouveau sinistre */}
            <Card>
              <CardHeader>
                <CardTitle>Déclarer un nouveau sinistre</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Type de sinistre</Label>
                    <Select value={newClaim.type || ''} onValueChange={(value) => setNewClaim({...newClaim, type: value as ClaimRecord['type']})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Vol">Vol</SelectItem>
                        <SelectItem value="Incendie">Incendie</SelectItem>
                        <SelectItem value="Dégâts des eaux">Dégâts des eaux</SelectItem>
                        <SelectItem value="Bris de glace">Bris de glace</SelectItem>
                        <SelectItem value="Autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="amount">Montant estimé (€)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="500"
                      value={newClaim.amount || ''}
                      onChange={(e) => setNewClaim({...newClaim, amount: parseFloat(e.target.value)})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description détaillée</Label>
                  <Textarea
                    id="description"
                    placeholder="Décrivez les circonstances du sinistre..."
                    value={newClaim.description || ''}
                    onChange={(e) => setNewClaim({...newClaim, description: e.target.value})}
                  />
                </div>
                
                <Button onClick={addClaim}>
                  Déclarer le sinistre
                </Button>
              </CardContent>
            </Card>

            {/* Liste des sinistres */}
            <Card>
              <CardHeader>
                <CardTitle>Historique des sinistres</CardTitle>
              </CardHeader>
              <CardContent>
                {claims.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Aucun sinistre déclaré</p>
                ) : (
                  <div className="space-y-4">
                    {claims.map((claim) => (
                      <div key={claim.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{claim.type}</h4>
                            <p className="text-sm text-gray-600">{claim.date}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={claim.status === 'Payé' ? 'default' : 'secondary'}>
                              {claim.status}
                            </Badge>
                            <div className="text-sm font-medium">{claim.amount}€</div>
                          </div>
                        </div>
                        <p className="text-sm">{claim.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Onglet Résiliation */}
        <TabsContent value="cancellation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Résiliation simplifiée
              </CardTitle>
              <CardDescription>
                Générez automatiquement votre lettre de résiliation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentInsurer">Assureur actuel</Label>
                <Input
                  id="currentInsurer"
                  placeholder="Nom de votre assureur actuel"
                  value={profile.currentInsurer || ''}
                  onChange={(e) => setProfile({...profile, currentInsurer: e.target.value})}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Informations importantes</h4>
                <ul className="text-sm space-y-1">
                  <li>• Préavis de résiliation : généralement 2 mois</li>
                  <li>• Loi Hamon : résiliation possible après 1 an sans frais</li>
                  <li>• Résiliation pour déménagement : 1 mois de préavis</li>
                  <li>• Envoi en recommandé avec accusé de réception obligatoire</li>
                </ul>
              </div>

              {offers.map((offer) => (
                <div key={offer.id} className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">{offer.name}</h4>
                  <Button 
                    variant="outline" 
                    onClick={() => cancelInsurance(offer.name)}
                    className="mr-2"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger lettre de résiliation
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Profil */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Mon profil d'assurance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Type de logement</Label>
                  <div className="font-medium">{profile.propertyType || 'Non renseigné'}</div>
                </div>
                <div>
                  <Label>Surface</Label>
                  <div className="font-medium">{profile.propertySize ? `${profile.propertySize} m²` : 'Non renseigné'}</div>
                </div>
                <div>
                  <Label>Valeur des biens</Label>
                  <div className="font-medium">{profile.propertyValue ? `${profile.propertyValue}€` : 'Non renseigné'}</div>
                </div>
                <div>
                  <Label>Localisation</Label>
                  <div className="font-medium">{profile.location || 'Non renseigné'}</div>
                </div>
              </div>

              <div>
                <Label>Caractéristiques</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.hasBalcony && <Badge variant="outline">Balcon</Badge>}
                  {profile.hasGarden && <Badge variant="outline">Jardin</Badge>}
                  {profile.hasCellar && <Badge variant="outline">Cave</Badge>}
                  {profile.hasExpensiveItems && <Badge variant="outline">Objets de valeur</Badge>}
                </div>
              </div>

              <Button onClick={() => setActiveTab('simulation')}>
                Modifier mon profil
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog détails offre */}
      {selectedOffer && (
        <Dialog open={!!selectedOffer} onOpenChange={() => setSelectedOffer(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedOffer.name} - Détails complets</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Prime mensuelle</Label>
                  <div className="text-2xl font-bold text-blue-600">{selectedOffer.monthlyPremium}€</div>
                </div>
                <div>
                  <Label>Couverture</Label>
                  <div className="text-lg font-medium">{selectedOffer.coverage.toLocaleString()}€</div>
                </div>
              </div>
              
              <div>
                <Label>Contact</Label>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {selectedOffer.contactInfo.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {selectedOffer.contactInfo.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    {selectedOffer.contactInfo.website}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default InsuranceAssistantComplete;
