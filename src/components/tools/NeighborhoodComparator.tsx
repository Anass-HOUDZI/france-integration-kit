
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { MapPin, TrendingUp, Car, ShoppingCart, Train, School, Hospital, Star } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';

interface NeighborhoodComparatorProps {
  userProfile: any;
  diagnostic: any;
}

const NeighborhoodComparator: React.FC<NeighborhoodComparatorProps> = ({ userProfile }) => {
  const { saveToolData, getToolData } = useUserProfile();
  const [city, setCity] = useState('');
  const [maxBudget, setMaxBudget] = useState([1500]);
  const [priorities, setPriorities] = useState({
    transport: 5,
    shopping: 3,
    schools: 4,
    safety: 5,
    price: 4
  });
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const mockNeighborhoods = [
    {
      name: "Belleville",
      arrondissement: "20ème",
      pricePerM2: 9500,
      transportScore: 8,
      shoppingScore: 7,
      schoolScore: 6,
      safetyScore: 7,
      description: "Quartier artistique et multiculturel",
      pros: ["Vie nocturne animée", "Transport excellent", "Prix abordables"],
      cons: ["Peut être bruyant", "Gentrification en cours"]
    },
    {
      name: "Marais",
      arrondissement: "3ème/4ème",
      pricePerM2: 14500,
      transportScore: 9,
      shoppingScore: 9,
      schoolScore: 8,
      safetyScore: 8,
      description: "Quartier historique au cœur de Paris",
      pros: ["Centre historique", "Nombreux commerces", "Très sûr"],
      cons: ["Très cher", "Très touristique"]
    },
    {
      name: "Menilmontant",
      arrondissement: "20ème",
      pricePerM2: 8800,
      transportScore: 7,
      shoppingScore: 6,
      schoolScore: 7,
      safetyScore: 8,
      description: "Quartier en développement, familial",
      pros: ["Prix corrects", "Ambiance village", "Parc des Buttes-Chaumont"],
      cons: ["Transport limité", "Moins de commerces"]
    }
  ];

  const handleSearch = () => {
    setLoading(true);
    
    // Simulation de recherche
    setTimeout(() => {
      const filtered = mockNeighborhoods.filter(n => 
        n.pricePerM2 <= maxBudget[0] * 15 // Estimation grossière
      );
      
      // Score les quartiers selon les priorités
      const scored = filtered.map(neighborhood => {
        const score = (
          (neighborhood.transportScore * priorities.transport) +
          (neighborhood.shoppingScore * priorities.shopping) +
          (neighborhood.schoolScore * priorities.schools) +
          (neighborhood.safetyScore * priorities.safety) +
          ((10 - Math.min(neighborhood.pricePerM2 / 1000, 10)) * priorities.price)
        ) / 25;
        
        return { ...neighborhood, globalScore: score };
      }).sort((a, b) => b.globalScore - a.globalScore);
      
      setResults(scored);
      setLoading(false);
      
      // Sauvegarde
      saveToolData('neighborhood_comparator', {
        city,
        maxBudget: maxBudget[0],
        priorities,
        results: scored,
        searchDate: new Date().toISOString()
      });
    }, 1500);
  };

  const renderScoreBar = (score: number, label: string) => (
    <div className="flex items-center gap-2 mb-2">
      <span className="text-sm w-16 text-gray-600">{label}</span>
      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all"
          style={{ width: `${score * 10}%` }}
        />
      </div>
      <span className="text-sm font-medium w-8">{score}/10</span>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Comparateur de Quartiers
        </h1>
        <p className="text-lg text-gray-600">
          Trouvez le quartier parfait selon vos critères et priorités
        </p>
      </div>

      {/* Formulaire de recherche */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Critères de recherche
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="city">Ville</Label>
              <Input
                id="city"
                placeholder="Paris, Lyon, Marseille..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            
            <div>
              <Label>Budget maximum (loyer)</Label>
              <div className="mt-2">
                <Slider
                  value={maxBudget}
                  onValueChange={setMaxBudget}
                  max={3000}
                  min={500}
                  step={50}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>500€</span>
                  <span className="font-medium">{maxBudget[0]}€</span>
                  <span>3000€</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Label className="text-base font-medium mb-4 block">
              Vos priorités (1 = pas important, 5 = très important)
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(priorities).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <Label className="flex items-center gap-2">
                    {key === 'transport' && <Train className="h-4 w-4" />}
                    {key === 'shopping' && <ShoppingCart className="h-4 w-4" />}
                    {key === 'schools' && <School className="h-4 w-4" />}
                    {key === 'safety' && <Hospital className="h-4 w-4" />}
                    {key === 'price' && <TrendingUp className="h-4 w-4" />}
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Label>
                  <Slider
                    value={[value]}
                    onValueChange={(newValue) => setPriorities(prev => ({
                      ...prev,
                      [key]: newValue[0]
                    }))}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-gray-600">{value}/5</div>
                </div>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleSearch}
            disabled={!city || loading}
            className="w-full"
          >
            {loading ? 'Recherche en cours...' : 'Comparer les quartiers'}
          </Button>
        </CardContent>
      </Card>

      {/* Résultats */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Résultats pour {city}
          </h2>
          
          <div className="grid gap-6">
            {results.map((neighborhood, index) => (
              <Card key={neighborhood.name} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {neighborhood.name}
                        <Badge variant="outline">{neighborhood.arrondissement}</Badge>
                        {index === 0 && <Badge className="bg-gold-500">🏆 Meilleur match</Badge>}
                      </CardTitle>
                      <CardDescription>{neighborhood.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-bold">{neighborhood.globalScore.toFixed(1)}/10</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {neighborhood.pricePerM2}€/m²
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Scores détaillés</h4>
                      {renderScoreBar(neighborhood.transportScore, 'Transport')}
                      {renderScoreBar(neighborhood.shoppingScore, 'Commerces')}
                      {renderScoreBar(neighborhood.schoolScore, 'Écoles')}
                      {renderScoreBar(neighborhood.safetyScore, 'Sécurité')}
                    </div>
                    
                    <div>
                      <div className="mb-4">
                        <h4 className="font-medium text-green-600 mb-2">Avantages</h4>
                        <ul className="space-y-1">
                          {neighborhood.pros.map((pro: string, i: number) => (
                            <li key={i} className="text-sm flex items-center gap-2">
                              <span className="text-green-500">✓</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-orange-600 mb-2">Inconvénients</h4>
                        <ul className="space-y-1">
                          {neighborhood.cons.map((con: string, i: number) => (
                            <li key={i} className="text-sm flex items-center gap-2">
                              <span className="text-orange-500">⚠</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NeighborhoodComparator;
