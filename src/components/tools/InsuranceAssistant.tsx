
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield, Calculator, FileText, TrendingUp, CheckSquare, AlertCircle } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';

interface InsuranceAssistantProps {
  userProfile: any;
  diagnostic: any;
}

const InsuranceAssistant: React.FC<InsuranceAssistantProps> = ({ userProfile }) => {
  const { saveToolData } = useUserProfile();
  const [propertyType, setPropertyType] = useState('');
  const [propertySize, setPropertySize] = useState('');
  const [propertyValue, setPropertyValue] = useState('');
  const [location, setLocation] = useState('');
  const [floor, setFloor] = useState('');
  const [hasBalcony, setHasBalcony] = useState(false);
  const [hasGarden, setHasGarden] = useState(false);
  const [hasCellar, setHasCellar] = useState(false);
  const [hasExpensiveItems, setHasExpensiveItems] = useState(false);
  const [recommendations, setRecommendations] = useState<any>(null);

  const mockInsurers = [
    {
      name: "Maif",
      monthlyPremium: 15.99,
      coverage: 150000,
      deductible: 150,
      features: ["Vol", "Incendie", "Dégâts des eaux", "Bris de glace"],
      rating: 4.5,
      pros: ["Service client réactif", "Tarifs compétitifs"],
      cons: ["Franchise élevée pour certains sinistres"]
    },
    {
      name: "Macif",
      monthlyPremium: 18.50,
      coverage: 200000,
      deductible: 120,
      features: ["Vol", "Incendie", "Dégâts des eaux", "Responsabilité civile", "Protection juridique"],
      rating: 4.3,
      pros: ["Couverture étendue", "Assistance 24h/24"],
      cons: ["Prix légèrement plus élevé"]
    },
    {
      name: "Matmut",
      monthlyPremium: 14.20,
      coverage: 120000,
      deductible: 180,
      features: ["Vol", "Incendie", "Dégâts des eaux"],
      rating: 4.1,
      pros: ["Prix attractif", "Simplicité des contrats"],
      cons: ["Couverture basique", "Franchise importante"]
    }
  ];

  const calculateRecommendations = () => {
    const size = parseFloat(propertySize);
    const value = parseFloat(propertyValue);
    
    // Calcul des risques
    const riskFactors = {
      location: location.toLowerCase().includes('paris') ? 1.3 : 1.0,
      floor: parseInt(floor) === 0 ? 1.2 : parseInt(floor) > 3 ? 0.9 : 1.0,
      balcony: hasBalcony ? 1.1 : 1.0,
      expensive: hasExpensiveItems ? 1.4 : 1.0
    };
    
    const riskMultiplier = Object.values(riskFactors).reduce((a, b) => a * b, 1);
    
    // Ajustement des primes selon les risques
    const adjustedInsurers = mockInsurers.map(insurer => ({
      ...insurer,
      monthlyPremium: Math.round(insurer.monthlyPremium * riskMultiplier * 100) / 100,
      recommended: insurer.coverage >= value * 0.8
    })).sort((a, b) => {
      if (a.recommended && !b.recommended) return -1;
      if (!a.recommended && b.recommended) return 1;
      return a.monthlyPremium - b.monthlyPremium;
    });
    
    const requiredCoverage = Math.max(value, size * 1000); // Minimum selon la surface
    
    const recommendations = {
      requiredCoverage,
      riskLevel: riskMultiplier > 1.2 ? 'Élevé' : riskMultiplier > 1.1 ? 'Moyen' : 'Faible',
      insurers: adjustedInsurers,
      tips: generateTips(riskMultiplier),
      estimatedAnnualCost: adjustedInsurers[0].monthlyPremium * 12
    };
    
    setRecommendations(recommendations);
    
    // Sauvegarde
    saveToolData('insurance_assistant', {
      propertyType,
      propertySize: size,
      propertyValue: value,
      location,
      riskFactors,
      recommendations,
      createdAt: new Date().toISOString()
    });
  };

  const generateTips = (riskMultiplier: number) => {
    const tips = [
      "Vérifiez que la valeur de vos biens est bien couverte",
      "Pensez à déclarer les modifications importantes du logement",
      "Gardez les factures de vos biens de valeur",
      "Installez des détecteurs de fumée (obligatoire)"
    ];
    
    if (riskMultiplier > 1.2) {
      tips.push("Considérez une sécurité renforcée (alarme, serrures)");
      tips.push("Vérifiez les exclusions de garantie vol");
    }
    
    if (hasExpensiveItems) {
      tips.push("Déclarez spécifiquement vos objets de valeur");
      tips.push("Considérez une extension de garantie pour les biens précieux");
    }
    
    return tips;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Assistant Assurance Habitation
        </h1>
        <p className="text-lg text-gray-600">
          Trouvez l'assurance habitation adaptée à votre logement et budget
        </p>
      </div>

      {/* Formulaire */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Informations sur votre logement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Type de logement</Label>
              <Select value={propertyType} onValueChange={setPropertyType}>
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
                value={propertySize}
                onChange={(e) => setPropertySize(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="propertyValue">Valeur des biens (€)</Label>
              <Input
                id="propertyValue"
                type="number"
                placeholder="30000"
                value={propertyValue}
                onChange={(e) => setPropertyValue(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="location">Ville/Quartier</Label>
              <Input
                id="location"
                placeholder="Paris 11ème, Lyon..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <div>
              <Label>Étage</Label>
              <Select value={floor} onValueChange={setFloor}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Rez-de-chaussée</SelectItem>
                  <SelectItem value="1">1er étage</SelectItem>
                  <SelectItem value="2">2ème étage</SelectItem>
                  <SelectItem value="3">3ème étage</SelectItem>
                  <SelectItem value="4">4ème étage et +</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">Caractéristiques du logement</Label>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="balcony" 
                  checked={hasBalcony}
                  onCheckedChange={setHasBalcony}
                />
                <Label htmlFor="balcony">Balcon/Terrasse</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="garden" 
                  checked={hasGarden}
                  onCheckedChange={setHasGarden}
                />
                <Label htmlFor="garden">Jardin</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="cellar" 
                  checked={hasCellar}
                  onCheckedChange={setHasCellar}
                />
                <Label htmlFor="cellar">Cave/Grenier</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="expensive" 
                  checked={hasExpensiveItems}
                  onCheckedChange={setHasExpensiveItems}
                />
                <Label htmlFor="expensive">Objets de valeur</Label>
              </div>
            </div>
          </div>

          <Button 
            onClick={calculateRecommendations}
            disabled={!propertyType || !propertySize || !propertyValue || !location}
            className="w-full"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculer mes recommandations
          </Button>
        </CardContent>
      </Card>

      {/* Résultats */}
      {recommendations && (
        <div className="space-y-6">
          {/* Analyse des risques */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Analyse de votre profil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {recommendations.requiredCoverage.toLocaleString()}€
                  </div>
                  <div className="text-sm text-gray-600">Couverture recommandée</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {recommendations.riskLevel}
                  </div>
                  <div className="text-sm text-gray-600">Niveau de risque</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {recommendations.estimatedAnnualCost}€
                  </div>
                  <div className="text-sm text-gray-600">Coût estimé/an</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comparaison des assureurs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Comparaison des offres
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.insurers.map((insurer: any, index: number) => (
                  <div key={insurer.name} className={`p-4 border rounded-lg ${insurer.recommended ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          {insurer.name}
                          {index === 0 && <Badge className="bg-green-600">Recommandé</Badge>}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>⭐ {insurer.rating}/5</span>
                          <span>Franchise: {insurer.deductible}€</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {insurer.monthlyPremium}€/mois
                        </div>
                        <div className="text-sm text-gray-600">
                          Couverture: {insurer.coverage.toLocaleString()}€
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Garanties incluses</h4>
                        <div className="flex flex-wrap gap-1">
                          {insurer.features.map((feature: string) => (
                            <Badge key={feature} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-green-600 mb-2">Avantages</h4>
                        <ul className="text-sm space-y-1">
                          {insurer.pros.map((pro: string, i: number) => (
                            <li key={i} className="flex items-center gap-1">
                              <span className="text-green-500">✓</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-orange-600 mb-2">Inconvénients</h4>
                        <ul className="text-sm space-y-1">
                          {insurer.cons.map((con: string, i: number) => (
                            <li key={i} className="flex items-center gap-1">
                              <span className="text-orange-500">⚠</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Conseils */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5" />
                Conseils personnalisés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {recommendations.tips.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckSquare className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
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

export default InsuranceAssistant;
