
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Truck, Calculator, FileText, TrendingUp, MapPin, Users } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';

interface MovingCalculatorProps {
  userProfile: any;
  diagnostic: any;
}

const MovingCalculatorTool: React.FC<MovingCalculatorProps> = ({ userProfile }) => {
  const { saveToolData } = useUserProfile();
  const [currentCity, setCurrentCity] = useState('');
  const [targetCity, setTargetCity] = useState('');
  const [distance, setDistance] = useState('');
  const [homeSize, setHomeSize] = useState('');
  const [volume, setVolume] = useState('');
  const [hasElevator, setHasElevator] = useState(false);
  const [hasParking, setHasParking] = useState(false);
  const [hasFragileItems, setHasFragileItems] = useState(false);
  const [needsPacking, setNeedsPacking] = useState(false);
  const [needsStorage, setNeedsStorage] = useState(false);
  const [estimates, setEstimates] = useState<any>(null);

  const mockEstimates = [
    {
      type: 'Location camion + bricolage',
      basePrice: 150,
      description: 'Camion de déménagement + essence',
      included: ['Location véhicule', 'Kilométrage illimité', 'Assurance de base'],
      pros: ['Économique', 'Flexible'],
      cons: ['Effort physique', 'Responsabilité matériel']
    },
    {
      type: 'Déménageurs',
      basePrice: 650,
      description: 'Équipe professionnelle avec véhicule',
      included: ['Équipe 2-3 personnes', 'Camion adapté', 'Assurance tous risques', 'Matériel protection'],
      pros: ['Professionnel', 'Rapide', 'Sécurisé'],
      cons: ['Plus cher', 'Disponibilité limitée']
    },
    {
      type: 'Déménagement premium',
      basePrice: 1200,
      description: 'Service complet avec emballage',
      included: ['Emballage/déballage', 'Démontage/remontage', 'Nettoyage', 'Assurance premium'],
      pros: ['Service complet', 'Aucun effort', 'Garantie totale'],
      cons: ['Prix élevé', 'Moins de contrôle']
    }
  ];

  const calculateEstimates = () => {
    const dist = parseFloat(distance);
    const vol = parseFloat(volume);
    
    const multipliers = {
      distance: dist > 100 ? 1.5 : dist > 50 ? 1.2 : 1.0,
      volume: vol > 50 ? 1.4 : vol > 30 ? 1.2 : 1.0,
      elevator: hasElevator ? 1.0 : 1.3,
      parking: hasParking ? 1.0 : 1.2,
      fragile: hasFragileItems ? 1.15 : 1.0,
      packing: needsPacking ? 1.4 : 1.0,
      storage: needsStorage ? 1.3 : 1.0
    };

    const totalMultiplier = Object.values(multipliers).reduce((a, b) => a * b, 1);

    const calculatedEstimates = mockEstimates.map(estimate => ({
      ...estimate,
      finalPrice: Math.round(estimate.basePrice * totalMultiplier),
      details: {
        basePrice: estimate.basePrice,
        multipliers,
        totalMultiplier: Math.round(totalMultiplier * 100) / 100
      }
    }));

    const additionalCosts = {
      packing: needsPacking ? Math.round(vol * 8) : 0,
      storage: needsStorage ? 150 : 0,
      insurance: Math.round(vol * 12),
      tips: Math.round(calculatedEstimates[1].finalPrice * 0.1)
    };

    setEstimates({
      estimates: calculatedEstimates,
      additionalCosts,
      totalEstimate: calculatedEstimates[1].finalPrice + Object.values(additionalCosts).reduce((a, b) => a + b, 0)
    });

    saveToolData('moving_calculator', {
      currentCity,
      targetCity,
      distance: dist,
      volume: vol,
      options: { hasElevator, hasParking, hasFragileItems, needsPacking, needsStorage },
      estimates: calculatedEstimates,
      additionalCosts,
      createdAt: new Date().toISOString()
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Calculateur Frais de Déménagement
        </h1>
        <p className="text-lg text-gray-600">
          Estimez le coût de votre déménagement selon vos besoins
        </p>
      </div>

      {/* Formulaire */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Informations sur votre déménagement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="currentCity">Ville actuelle</Label>
              <Input
                id="currentCity"
                placeholder="Paris"
                value={currentCity}
                onChange={(e) => setCurrentCity(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="targetCity">Ville de destination</Label>
              <Input
                id="targetCity"
                placeholder="Lyon"
                value={targetCity}
                onChange={(e) => setTargetCity(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="distance">Distance (km)</Label>
              <Input
                id="distance"
                type="number"
                placeholder="500"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </div>
            
            <div>
              <Label>Type de logement</Label>
              <Select value={homeSize} onValueChange={setHomeSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="t2">T2</SelectItem>
                  <SelectItem value="t3">T3</SelectItem>
                  <SelectItem value="t4">T4 et +</SelectItem>
                  <SelectItem value="house">Maison</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="volume">Volume estimé (m³)</Label>
              <Input
                id="volume"
                type="number"
                placeholder="25"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">Options et contraintes</Label>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="elevator" 
                  checked={hasElevator}
                  onCheckedChange={(checked) => setHasElevator(checked === true)}
                />
                <Label htmlFor="elevator">Ascenseur disponible</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="parking" 
                  checked={hasParking}
                  onCheckedChange={(checked) => setHasParking(checked === true)}
                />
                <Label htmlFor="parking">Parking proche</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="fragile" 
                  checked={hasFragileItems}
                  onCheckedChange={(checked) => setHasFragileItems(checked === true)}
                />
                <Label htmlFor="fragile">Objets fragiles</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="packing" 
                  checked={needsPacking}
                  onCheckedChange={(checked) => setNeedsPacking(checked === true)}
                />
                <Label htmlFor="packing">Service emballage</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="storage" 
                  checked={needsStorage}
                  onCheckedChange={(checked) => setNeedsStorage(checked === true)}
                />
                <Label htmlFor="storage">Stockage temporaire</Label>
              </div>
            </div>
          </div>

          <Button 
            onClick={calculateEstimates}
            disabled={!currentCity || !targetCity || !distance || !volume}
            className="w-full"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculer les devis
          </Button>
        </CardContent>
      </Card>

      {/* Résultats */}
      {estimates && (
        <div className="space-y-6">
          {/* Comparaison des options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Comparaison des options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {estimates.estimates.map((estimate: any, index: number) => (
                  <div key={estimate.type} className={`p-4 border rounded-lg ${index === 1 ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          {estimate.type}
                          {index === 1 && <Badge className="bg-blue-600">Recommandé</Badge>}
                        </h3>
                        <p className="text-sm text-gray-600">{estimate.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {estimate.finalPrice}€
                        </div>
                        <div className="text-sm text-gray-600">
                          Base: {estimate.basePrice}€
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Inclus</h4>
                        <ul className="text-sm space-y-1">
                          {estimate.included.map((item: string, i: number) => (
                            <li key={i} className="flex items-center gap-1">
                              <span className="text-green-500">✓</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-green-600 mb-2">Avantages</h4>
                        <ul className="text-sm space-y-1">
                          {estimate.pros.map((pro: string, i: number) => (
                            <li key={i} className="flex items-center gap-1">
                              <span className="text-green-500">+</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-orange-600 mb-2">Inconvénients</h4>
                        <ul className="text-sm space-y-1">
                          {estimate.cons.map((con: string, i: number) => (
                            <li key={i} className="flex items-center gap-1">
                              <span className="text-orange-500">-</span>
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

          {/* Coûts additionnels */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Coûts additionnels à prévoir
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <div className="text-xl font-bold text-gray-900">
                    {estimates.additionalCosts.packing}€
                  </div>
                  <div className="text-sm text-gray-600">Emballage</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <div className="text-xl font-bold text-gray-900">
                    {estimates.additionalCosts.storage}€
                  </div>
                  <div className="text-sm text-gray-600">Stockage</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <div className="text-xl font-bold text-gray-900">
                    {estimates.additionalCosts.insurance}€
                  </div>
                  <div className="text-sm text-gray-600">Assurance</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <div className="text-xl font-bold text-gray-900">
                    {estimates.additionalCosts.tips}€
                  </div>
                  <div className="text-sm text-gray-600">Pourboires</div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Budget total recommandé:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {estimates.totalEstimate}€
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MovingCalculatorTool;
