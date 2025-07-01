
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
import { Progress } from '@/components/ui/progress';
import { Shield, Calculator, FileText, TrendingUp, CheckSquare, AlertCircle, Phone, Mail, Globe, X, Eye, Download, Calendar, Star, Euro, Users, Home } from 'lucide-react';
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
  optimalScore?: number;
  contactInfo: {
    phone: string;
    email: string;
    website: string;
  };
}

interface ClaimRecord {
  id: string;
  date: string;
  type: 'Vol' | 'Incendie' | 'Dégâts des eaux' | 'Bris de glace' | 'Catastrophe naturelle' | 'Autre';
  description: string;
  amount: number;
  status: 'En cours' | 'Accepté' | 'Refusé' | 'Payé';
  documents: string[];
  followUpDate?: string;
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
  budget: number;
  riskTolerance: 'low' | 'medium' | 'high';
  priorities: string[];
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
    preferredLanguage: currentLanguage,
    budget: 0,
    riskTolerance: 'medium',
    priorities: []
  });
  
  const [offers, setOffers] = useLocalStorage<InsuranceOffer[]>('insurance_offers', []);
  const [claims, setClaims] = useLocalStorage<ClaimRecord[]>('insurance_claims', []);
  const [selectedOffer, setSelectedOffer] = useState<InsuranceOffer | null>(null);
  const [newClaim, setNewClaim] = useState<Partial<ClaimRecord>>({});
  const [optimalCalculation, setOptimalCalculation] = useState(false);

  // Base d'assureurs enrichie avec données complètes
  const baseInsurers: InsuranceOffer[] = [
    {
      id: 'maif',
      name: 'Maif',
      monthlyPremium: 15.99,
      coverage: 150000,
      deductible: 150,
      features: ['Vol', 'Incendie', 'Dégâts des eaux', 'Bris de glace', 'Responsabilité civile'],
      rating: 4.5,
      pros: ['Service client réactif', 'Tarifs compétitifs', 'Application mobile pratique', 'Réseau d\'agences étendu'],
      cons: ['Franchise élevée pour certains sinistres', 'Couverture limitée objets de valeur'],
      contractConditions: [
        'Engagement minimum 1 an',
        'Préavis résiliation 2 mois',
        'Expertise obligatoire sinistres > 1600€',
        'Franchise modulable selon garanties',
        'Revalorisation automatique du capital'
      ],
      exclusions: [
        'Objets de valeur > 3000€ non déclarés',
        'Dégâts dus à négligence grave',
        'Catastrophes naturelles sans arrêté préfectoral',
        'Guerres et émeutes',
        'Usure normale'
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
      pros: ['Couverture étendue', 'Assistance 24h/24', 'Protection juridique incluse', 'Indemnisation rapide'],
      cons: ['Prix légèrement plus élevé', 'Conditions strictes pour le vol'],
      contractConditions: [
        'Sans engagement après 1 an',
        'Résiliation à tout moment après 1 an',
        'Télédéclaration sinistres 24h/24',
        'Indemnisation sous 15 jours',
        'Extension famille possible'
      ],
      exclusions: [
        'Vol sans effraction caractérisée',
        'Dommages électriques sur appareils > 10 ans',
        'Négligence caractérisée',
        'Activités professionnelles',
        'Locations saisonnières'
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
      pros: ['Prix attractif', 'Simplicité des contrats', 'Proximité conseillers', 'Mutuelle familiale'],
      cons: ['Couverture basique', 'Franchise importante', 'Options payantes'],
      contractConditions: [
        'Engagement 1 an renouvelable',
        'Préavis 2 mois pour résiliation',
        'Expertise systématique > 800€',
        'Paiement mensuel ou annuel',
        'Réduction fidélité après 3 ans'
      ],
      exclusions: [
        'Appareils électroniques > 5 ans',
        'Jardins et extérieurs',
        'Objets précieux non déclarés',
        'Vols à la tire',
        'Infiltrations progressives'
      ],
      contactInfo: {
        phone: '02 35 03 68 68',
        email: 'contact@matmut.fr',
        website: 'www.matmut.fr'
      }
    },
    {
      id: 'axa',
      name: 'Axa',
      monthlyPremium: 22.80,
      coverage: 250000,
      deductible: 100,
      features: ['Vol', 'Incendie', 'Dégâts des eaux', 'Bris de glace', 'Catastrophes naturelles', 'Objets de valeur'],
      rating: 4.4,
      pros: ['Couverture premium', 'Service haut de gamme', 'Réseau international', 'Objets de valeur inclus'],
      cons: ['Prix élevé', 'Conditions d\'accès strictes'],
      contractConditions: [
        'Engagement 2 ans',
        'Service premium inclus',
        'Expertise gratuite',
        'Remplacement à neuf garanti',
        'Couverture mondiale'
      ],
      exclusions: [
        'Activités à risque',
        'Locations de courte durée',
        'Catastrophes prévisibles'
      ],
      contactInfo: {
        phone: '09 78 40 50 00',
        email: 'contact@axa.fr',
        website: 'www.axa.fr'
      }
    }
  ];

  const calculateOptimalOffers = () => {
    setOptimalCalculation(true);
    const size = parseFloat(profile.propertySize);
    const value = parseFloat(profile.propertyValue);
    
    // Calcul des facteurs de risque sophistiqué
    const riskFactors = {
      location: profile.location.toLowerCase().includes('paris') ? 1.4 : 
                profile.location.toLowerCase().includes('marseille') ? 1.2 : 
                profile.location.toLowerCase().includes('lyon') ? 1.1 : 1.0,
      floor: parseInt(profile.floor) === 0 ? 1.3 : 
             parseInt(profile.floor) === 1 ? 1.1 : 
             parseInt(profile.floor) > 3 ? 0.85 : 1.0,
      balcony: profile.hasBalcony ? 1.15 : 1.0,
      garden: profile.hasGarden ? 1.25 : 1.0,
      cellar: profile.hasCellar ? 1.1 : 1.0,
      expensive: profile.hasExpensiveItems ? 1.5 : 1.0,
      propertyType: profile.propertyType === 'house' ? 1.3 : 
                   profile.propertyType === 'apartment' ? 1.0 : 
                   profile.propertyType === 'studio' ? 0.9 : 1.0,
      size: size > 100 ? 1.2 : size > 60 ? 1.1 : size < 30 ? 0.9 : 1.0
    };
    
    const riskMultiplier = Object.values(riskFactors).reduce((a, b) => a * b, 1);
    
    // Calcul du score optimal pour chaque assureur
    const adjustedOffers = baseInsurers.map(insurer => {
      const adjustedPremium = Math.round(insurer.monthlyPremium * riskMultiplier * 100) / 100;
      const budgetScore = profile.budget > 0 ? Math.max(0, 100 - Math.abs(adjustedPremium - profile.budget/12) / (profile.budget/12) * 100) : 50;
      const coverageScore = Math.min(100, (insurer.coverage / Math.max(value, size * 1000)) * 100);
      const ratingScore = (insurer.rating / 5) * 100;
      const featureScore = (insurer.features.length / 8) * 100;
      const deductibleScore = Math.max(0, 100 - (insurer.deductible / 300) * 100);
      
      // Score pondéré selon la tolérance au risque
      let optimalScore;
      if (profile.riskTolerance === 'low') {
        optimalScore = (coverageScore * 0.4 + ratingScore * 0.3 + featureScore * 0.2 + budgetScore * 0.1);
      } else if (profile.riskTolerance === 'high') {
        optimalScore = (budgetScore * 0.4 + deductibleScore * 0.3 + coverageScore * 0.2 + ratingScore * 0.1);
      } else {
        optimalScore = (budgetScore * 0.25 + coverageScore * 0.25 + ratingScore * 0.25 + featureScore * 0.25);
      }
      
      return {
        ...insurer,
        monthlyPremium: adjustedPremium,
        optimalScore: Math.round(optimalScore),
        recommended: optimalScore > 75 && insurer.coverage >= value * 0.8
      };
    }).sort((a, b) => (b.optimalScore || 0) - (a.optimalScore || 0));
    
    setOffers(adjustedOffers);
    setTimeout(() => setOptimalCalculation(false), 2000);
  };

  const translateConditions = (conditions: string[], targetLang: string) => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        'Engagement minimum 1 an': 'Minimum 1 year commitment',
        'Préavis résiliation 2 mois': '2 months notice for cancellation',
        'Vol sans effraction': 'Theft without break-in',
        'Dégâts des eaux': 'Water damage',
        'Responsabilité civile': 'Civil liability',
        'Protection juridique': 'Legal protection',
        'Catastrophes naturelles': 'Natural disasters',
        'Objets de valeur': 'Valuable items',
        'Expertise obligatoire': 'Mandatory expertise',
        'Franchise modulable': 'Adjustable deductible'
      },
      es: {
        'Engagement minimum 1 an': 'Compromiso mínimo 1 año',
        'Préavis résiliation 2 mois': 'Aviso previo 2 meses para cancelación',
        'Vol sans effraction': 'Robo sin allanamiento',
        'Dégâts des eaux': 'Daños por agua',
        'Responsabilité civile': 'Responsabilidad civil',
        'Protection juridique': 'Protección jurídica',
        'Catastrophes naturelles': 'Catástrofes naturales',
        'Objets de valeur': 'Objetos de valor'
      },
      de: {
        'Engagement minimum 1 an': 'Mindestlaufzeit 1 Jahr',
        'Préavis résiliation 2 mois': '2 Monate Kündigungsfrist',
        'Vol sans effraction': 'Diebstahl ohne Einbruch',
        'Dégâts des eaux': 'Wasserschäden',
        'Responsabilité civile': 'Haftpflichtversicherung',
        'Protection juridique': 'Rechtsschutz'
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
        documents: [],
        followUpDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };
      setClaims([...claims, claim]);
      setNewClaim({});
    }
  };

  const generateCancellationLetter = (insurerId: string, reason: string = 'changement') => {
    const today = new Date();
    const effectiveDate = new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000); // 2 mois plus tard
    
    const cancellationLetter = `
Objet : Résiliation contrat d'assurance habitation

Madame, Monsieur,

Par la présente lettre recommandée avec accusé de réception, je vous informe de ma décision de résilier mon contrat d'assurance habitation n° [NUMÉRO_CONTRAT] souscrit auprès de ${insurerId}.

Motif de résiliation : ${reason === 'moving' ? 'Déménagement' : reason === 'better_offer' ? 'Meilleure offre concurrente' : 'Changement de situation'}

Conformément aux dispositions légales et aux conditions générales de mon contrat, je respecte le préavis de résiliation requis.

Date d'effet souhaitée : ${effectiveDate.toLocaleDateString('fr-FR')}

Je vous prie de bien vouloir :
- Confirmer la prise en compte de cette résiliation
- Me faire parvenir un décompte des sommes dues ou à rembourser
- Procéder au remboursement du trop-perçu le cas échéant

Je reste à votre disposition pour toute information complémentaire.

Cordialement,

[VOTRE NOM]
[VOTRE ADRESSE]
[TÉLÉPHONE]
[EMAIL]

Date : ${today.toLocaleDateString('fr-FR')}

---
PIÈCES JOINTES :
- Copie pièce d'identité
- Justificatif de domicile (si déménagement)
- Nouvelle attestation d'assurance (si changement d'assureur)
    `;
    
    const blob = new Blob([cancellationLetter], { type: 'text/plain; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lettre_resiliation_${insurerId}_${today.toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
          <Shield className="h-8 w-8 text-blue-600" />
          Assistant Assurance Habitation Complet
        </h1>
        <p className="text-lg text-gray-600">
          Comparez, optimisez et gérez votre assurance habitation avec intelligence artificielle
        </p>
        
        {diagnostic && (
          <Card className="bg-blue-50 border-blue-200 mt-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-900">Conseil personnalisé</span>
              </div>
              <p className="text-blue-800 text-sm">
                En tant que <strong>{userProfile?.title}</strong>, nous recommandons de commencer par définir 
                votre budget et vos priorités, puis d'utiliser notre calcul optimal des garanties.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="simulation">Simulation</TabsTrigger>
          <TabsTrigger value="optimal">Calcul Optimal</TabsTrigger>
          <TabsTrigger value="comparison">Comparaison</TabsTrigger>
          <TabsTrigger value="conditions">Conditions</TabsTrigger>
          <TabsTrigger value="claims">Sinistres</TabsTrigger>
          <TabsTrigger value="cancellation">Résiliation</TabsTrigger>
        </TabsList>

        {/* Onglet Simulation */}
        <TabsContent value="simulation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Profil et simulation personnalisée
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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

                <div>
                  <Label htmlFor="budget">Budget mensuel souhaité (€)</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="20"
                    value={profile.budget || ''}
                    onChange={(e) => setProfile({...profile, budget: parseFloat(e.target.value)})}
                  />
                </div>

                <div>
                  <Label>Tolérance au risque</Label>
                  <Select value={profile.riskTolerance} onValueChange={(value: 'low' | 'medium' | 'high') => setProfile({...profile, riskTolerance: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Faible (sécurité maximale)</SelectItem>
                      <SelectItem value="medium">Moyenne (équilibrée)</SelectItem>
                      <SelectItem value="high">Élevée (budget optimal)</SelectItem>
                    </SelectContent>
                  </Select>
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

              <Button onClick={calculateOptimalOffers} className="w-full" disabled={!profile.propertyType || !profile.propertySize}>
                <Calculator className="mr-2 h-4 w-4" />
                Lancer la simulation intelligente
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Calcul Optimal */}
        <TabsContent value="optimal">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Calcul optimal des garanties
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {optimalCalculation && (
                <div className="text-center space-y-4">
                  <div className="text-lg font-medium">Analyse en cours...</div>
                  <Progress value={85} className="w-full" />
                  <p className="text-sm text-gray-600">
                    Calcul des facteurs de risque, comparaison des offres et optimisation selon votre profil
                  </p>
                </div>
              )}

              {offers.length > 0 && !optimalCalculation && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Analyse de votre profil</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold">{offers[0]?.optimalScore}%</div>
                        <div className="text-sm text-gray-600">Score optimal</div>
                      </div>
                      <div className="text-center">
                        <Euro className="h-8 w-8 text-green-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold">{offers[0]?.monthlyPremium}€</div>
                        <div className="text-sm text-gray-600">Prime optimale/mois</div>
                      </div>
                      <div className="text-center">
                        <Shield className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold">{offers[0]?.coverage?.toLocaleString()}€</div>
                        <div className="text-sm text-gray-600">Couverture recommandée</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Recommandations personnalisées :</h4>
                    <div className="space-y-2">
                      {profile.riskTolerance === 'low' && (
                        <div className="flex items-center gap-2 text-sm bg-blue-50 p-3 rounded">
                          <Shield className="h-4 w-4 text-blue-600" />
                          Profil sécuritaire : Nous privilégions une couverture maximale et un assureur fiable.
                        </div>
                      )}
                      {profile.hasExpensiveItems && (
                        <div className="flex items-center gap-2 text-sm bg-orange-50 p-3 rounded">
                          <AlertCircle className="h-4 w-4 text-orange-600" />
                          Objets de valeur détectés : Vérifiez les plafonds de garantie pour vos biens précieux.
                        </div>
                      )}
                      {parseFloat(profile.propertySize) > 80 && (
                        <div className="flex items-center gap-2 text-sm bg-green-50 p-3 rounded">
                          <Home className="h-4 w-4 text-green-600" />
                          Grand logement : Considérez une extension de garantie pour les dépendances.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {offers.length === 0 && (
                <div className="text-center py-8">
                  <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Complétez d'abord votre profil dans l'onglet Simulation</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Comparaison amélioré */}
        <TabsContent value="comparison">
          <div className="space-y-4">
            {offers.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">Effectuez d'abord une simulation pour voir les offres optimisées</p>
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
                          {index === 0 && <Badge className="bg-green-600">Optimal pour vous</Badge>}
                          {offer.optimalScore && offer.optimalScore > 80 && <Badge variant="outline" className="text-blue-600">Excellence</Badge>}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">⭐ {offer.rating}/5</span>
                          <span>Franchise: {offer.deductible}€</span>
                          {offer.optimalScore && (
                            <span className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" />
                              Score: {offer.optimalScore}%
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {offer.monthlyPremium}€/mois
                        </div>
                        <div className="text-sm text-gray-600">
                          Couverture: {offer.coverage.toLocaleString()}€
                        </div>
                        <div className="text-xs text-gray-500">
                          {(offer.monthlyPremium * 12).toFixed(0)}€/an
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

        {/* Onglet Conditions avec traduction améliorée */}
        <TabsContent value="conditions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Traduction intelligente des conditions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Label>Langue de traduction</Label>
                <Select value={profile.preferredLanguage} onValueChange={(value) => setProfile({...profile, preferredLanguage: value})}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">🇫🇷 Français</SelectItem>
                    <SelectItem value="en">🇬🇧 English</SelectItem>
                    <SelectItem value="es">🇪🇸 Español</SelectItem>
                    <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
                    <SelectItem value="it">🇮🇹 Italiano</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {offers.map((offer) => (
                <Card key={offer.id} className="mb-4">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      {offer.name}
                      <Badge variant={offer.recommended ? "default" : "outline"}>
                        {offer.optimalScore}% optimal
                      </Badge>
                    </CardTitle>
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

        {/* Onglet Sinistres amélioré */}
        <TabsContent value="claims">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Déclarer un nouveau sinistre</CardTitle>
                <CardDescription>
                  Assistant intelligent pour la déclaration de sinistres
                </CardDescription>
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

            <Card>
              <CardHeader>
                <CardTitle>Suivi de vos sinistres</CardTitle>
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
                            <p className="text-sm text-gray-600">{new Date(claim.date).toLocaleDateString('fr-FR')}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={
                              claim.status === 'Payé' ? 'default' : 
                              claim.status === 'Accepté' ? 'secondary' : 
                              claim.status === 'Refusé' ? 'destructive' : 
                              'outline'
                            }>
                              {claim.status}
                            </Badge>
                            <div className="text-sm font-medium">{claim.amount.toLocaleString()}€</div>
                          </div>
                        </div>
                        <p className="text-sm mb-2">{claim.description}</p>
                        {claim.followUpDate && claim.status === 'En cours' && (
                          <div className="text-xs text-blue-600 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Suivi prévu le {new Date(claim.followUpDate).toLocaleDateString('fr-FR')}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Onglet Résiliation amélioré */}
        <TabsContent value="cancellation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Résiliation simplifiée et optimisée
              </CardTitle>
              <CardDescription>
                Générateur automatique de lettres de résiliation conformes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="currentInsurer">Assureur actuel</Label>
                <Input
                  id="currentInsurer"
                  placeholder="Nom de votre assureur actuel"
                  value={profile.currentInsurer || ''}
                  onChange={(e) => setProfile({...profile, currentInsurer: e.target.value})}
                />
              </div>

              <div className="bg-amber-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  Guide de résiliation 2024
                </h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Loi Hamon :</strong> Résiliation possible après 1 an sans frais ni justification</li>
                  <li>• <strong>Préavis standard :</strong> 2 mois avant l'échéance annuelle</li>
                  <li>• <strong>Déménagement :</strong> 1 mois de préavis seulement</li>
                  <li>• <strong>Envoi obligatoire :</strong> Lettre recommandée avec accusé de réception</li>
                  <li>• <strong>Changement de situation :</strong> Résiliation immédiate possible</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Motif de résiliation :</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => generateCancellationLetter(profile.currentInsurer || 'Mon assureur', 'better_offer')}
                    className="h-auto p-4 flex flex-col items-center gap-2"
                  >
                    <TrendingUp className="h-5 w-5" />
                    <span className="text-sm">Meilleure offre trouvée</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => generateCancellationLetter(profile.currentInsurer || 'Mon assureur', 'moving')}
                    className="h-auto p-4 flex flex-col items-center gap-2"
                  >
                    <Home className="h-5 w-5" />
                    <span className="text-sm">Déménagement</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => generateCancellationLetter(profile.currentInsurer || 'Mon assureur', 'changement')}
                    className="h-auto p-4 flex flex-col items-center gap-2"
                  >
                    <Users className="h-5 w-5" />
                    <span className="text-sm">Changement de situation</span>
                  </Button>
                </div>
              </div>

              {offers.length > 0 && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">🎯 Votre nouvelle assurance optimale :</h4>
                  <div className="text-sm space-y-1">
                    <div><strong>{offers[0].name}</strong> - {offers[0].monthlyPremium}€/mois</div>
                    <div>Économies annuelles potentielles : <strong className="text-green-600">
                      {profile.currentPremium ? Math.max(0, (profile.currentPremium - offers[0].monthlyPremium * 12)).toFixed(0) : 'N/A'}€
                    </strong></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog détails offre */}
      {selectedOffer && (
        <Dialog open={!!selectedOffer} onOpenChange={() => setSelectedOffer(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedOffer.name} - Analyse complète
                {selectedOffer.optimalScore && (
                  <Badge variant="outline">{selectedOffer.optimalScore}% optimal</Badge>
                )}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Prime mensuelle</Label>
                  <div className="text-2xl font-bold text-blue-600">{selectedOffer.monthlyPremium}€</div>
                  <div className="text-sm text-gray-600">Soit {(selectedOffer.monthlyPremium * 12).toFixed(0)}€/an</div>
                </div>
                <div>
                  <Label>Couverture totale</Label>
                  <div className="text-lg font-medium">{selectedOffer.coverage.toLocaleString()}€</div>
                  <div className="text-sm text-gray-600">Franchise: {selectedOffer.deductible}€</div>
                </div>
              </div>
              
              <div>
                <Label>Informations de contact</Label>
                <div className="space-y-1 text-sm bg-gray-50 p-3 rounded">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <a href={`tel:${selectedOffer.contactInfo.phone}`} className="text-blue-600 hover:underline">
                      {selectedOffer.contactInfo.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a href={`mailto:${selectedOffer.contactInfo.email}`} className="text-blue-600 hover:underline">
                      {selectedOffer.contactInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <a href={`https://${selectedOffer.contactInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {selectedOffer.contactInfo.website}
                    </a>
                  </div>
                </div>
              </div>

              {selectedOffer.optimalScore && (
                <div>
                  <Label>Pourquoi cette offre vous convient</Label>
                  <div className="bg-blue-50 p-3 rounded text-sm">
                    Score d'adéquation : <strong>{selectedOffer.optimalScore}%</strong><br />
                    {selectedOffer.optimalScore > 80 && "Cette offre correspond parfaitement à votre profil et vos besoins."}
                    {selectedOffer.optimalScore > 60 && selectedOffer.optimalScore <= 80 && "Cette offre représente un bon compromis pour votre situation."}
                    {selectedOffer.optimalScore <= 60 && "Cette offre peut convenir mais d'autres options pourraient être plus adaptées."}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default InsuranceAssistantComplete;
