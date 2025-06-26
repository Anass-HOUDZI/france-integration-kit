import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calculator, Heart, TrendingUp, AlertCircle } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';

interface HealthCalculatorProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}

const HealthCalculatorTool: React.FC<HealthCalculatorProps> = ({ userProfile, onBack }) => {
  const { saveToolData } = useUserProfile();
  const [consultationType, setConsultationType] = useState('');
  const [consultationCost, setConsultationCost] = useState('');
  const [hasMutuelle, setHasMutuelle] = useState(false);
  const [mutuelleCoverage, setMutuelleCoverage] = useState('');
  const [hasALD, setHasALD] = useState(false);
  const [results, setResults] = useState<any>(null);

  const consultationTypes = [
    { id: 'generaliste', name: 'Médecin généraliste', tarif: 25, remboursement: 70 },
    { id: 'specialiste_s1', name: 'Spécialiste secteur 1', tarif: 30, remboursement: 70 },
    { id: 'specialiste_s2', name: 'Spécialiste secteur 2', tarif: 50, remboursement: 70 },
    { id: 'dentiste', name: 'Dentiste (soins)', tarif: 23, remboursement: 70 },
    { id: 'ophtalmo', name: 'Ophtalmologue', tarif: 30, remboursement: 70 },
    { id: 'gynecologue', name: 'Gynécologue', tarif: 30, remboursement: 70 },
    { id: 'kine', name: 'Kinésithérapeute', tarif: 22, remboursement: 60 },
    { id: 'radio', name: 'Radiologie', tarif: 70, remboursement: 70 }
  ];

  const calculateReimbursement = () => {
    const selectedConsultation = consultationTypes.find(c => c.id === consultationType);
    if (!selectedConsultation) return;

    const cost = parseFloat(consultationCost) || selectedConsultation.tarif;
    const baseRemboursement = hasALD ? 100 : selectedConsultation.remboursement;
    
    // Calcul remboursement Sécurité Sociale
    const secu = (cost * baseRemboursement) / 100;
    const franchise = hasALD ? 0 : 1; // Franchise de 1€ sauf ALD
    const secuNet = Math.max(0, secu - franchise);
    
    // Calcul reste à charge après Sécu
    const resteApresSecu = cost - secuNet;
    
    // Calcul remboursement mutuelle
    const mutuellePct = parseFloat(mutuelleCoverage) || 0;
    const mutuelleAmount = hasMutuelle ? (resteApresSecu * mutuellePct) / 100 : 0;
    
    // Reste à charge final
    const resteACharge = resteApresSecu - mutuelleAmount;

    const simulation = {
      consultationType: selectedConsultation.name,
      cost,
      secuRemboursement: secuNet,
      franchise,
      mutuelleRemboursement: mutuelleAmount,
      resteACharge: Math.max(0, resteACharge),
      totalRemboursement: secuNet + mutuelleAmount,
      tauxCouverture: ((secuNet + mutuelleAmount) / cost) * 100,
      hasALD,
      hasMutuelle
    };

    setResults(simulation);

    saveToolData('health_calculator', {
      consultationType,
      cost,
      hasMutuelle,
      mutuelleCoverage,
      hasALD,
      simulation,
      createdAt: new Date().toISOString()
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Calculateur Remboursements Santé
        </h1>
        <p className="text-lg text-gray-600">
          Estimez vos frais de santé restant à charge
        </p>
      </div>

      {/* Formulaire */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Type de consultation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Type de consultation</Label>
              <Select value={consultationType} onValueChange={setConsultationType}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez" />
                </SelectTrigger>
                <SelectContent>
                  {consultationTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name} ({type.tarif}€)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="cost">Coût réel (€)</Label>
              <Input
                id="cost"
                type="number"
                placeholder="25"
                value={consultationCost}
                onChange={(e) => setConsultationCost(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="mutuelle" 
                checked={hasMutuelle}
                onCheckedChange={(checked) => setHasMutuelle(checked === true)}
              />
              <Label htmlFor="mutuelle">J'ai une mutuelle/complémentaire santé</Label>
            </div>
            
            {hasMutuelle && (
              <div>
                <Label htmlFor="coverage">Taux de remboursement mutuelle (%)</Label>
                <Input
                  id="coverage"
                  type="number"
                  placeholder="100"
                  value={mutuelleCoverage}
                  onChange={(e) => setMutuelleCoverage(e.target.value)}
                />
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="ald" 
                checked={hasALD}
                onCheckedChange={(checked) => setHasALD(checked === true)}
              />
              <Label htmlFor="ald">Affection Longue Durée (ALD)</Label>
            </div>
          </div>

          <Button 
            onClick={calculateReimbursement}
            disabled={!consultationType}
            className="w-full"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculer mes remboursements
          </Button>
        </CardContent>
      </Card>

      {/* Résultats */}
      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-600" />
                Détail des remboursements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Coût de la consultation :</span>
                  <span className="font-bold">{results.cost}€</span>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-blue-600">
                    <span>Remboursement Sécurité Sociale :</span>
                    <span className="font-bold">{results.secuRemboursement.toFixed(2)}€</span>
                  </div>
                  {results.franchise > 0 && (
                    <div className="text-sm text-gray-500">
                      (dont {results.franchise}€ de franchise déduite)
                    </div>
                  )}
                </div>
                
                {results.hasMutuelle && (
                  <div className="flex justify-between text-green-600">
                    <span>Remboursement mutuelle :</span>
                    <span className="font-bold">{results.mutuelleRemboursement.toFixed(2)}€</span>
                  </div>
                )}
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Reste à votre charge :</span>
                    <span className={results.resteACharge > 0 ? 'text-red-600' : 'text-green-600'}>
                      {results.resteACharge.toFixed(2)}€
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Analyse de votre couverture
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {results.tauxCouverture.toFixed(0)}%
                </div>
                <div className="text-sm text-gray-600">de couverture totale</div>
              </div>
              
              <div className="space-y-3">
                {results.hasALD && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">ALD activée</span>
                    </div>
                    <p className="text-xs text-blue-800">
                      Remboursement à 100% par la Sécurité Sociale
                    </p>
                  </div>
                )}
                
                {!results.hasMutuelle && results.resteACharge > 0 && (
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-900">Conseil</span>
                    </div>
                    <p className="text-xs text-orange-800">
                      Une mutuelle pourrait réduire votre reste à charge
                    </p>
                  </div>
                )}
                
                {results.tauxCouverture >= 90 && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-900">Excellente couverture</span>
                    </div>
                    <p className="text-xs text-green-800">
                      Votre couverture santé est très bien optimisée
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default HealthCalculatorTool;
