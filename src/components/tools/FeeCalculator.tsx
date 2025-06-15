
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calculator, FileText, AlertCircle, DollarSign } from 'lucide-react';

interface FeeCalculatorProps {
  userProfile: any;
  diagnostic: any;
}

const FeeCalculator: React.FC<FeeCalculatorProps> = ({ userProfile, diagnostic }) => {
  const [selectedProcedure, setSelectedProcedure] = useState('');
  const [department, setDepartment] = useState('');
  const [familySize, setFamilySize] = useState(1);
  const [income, setIncome] = useState('');
  const [calculation, setCalculation] = useState<any>(null);

  const procedures = [
    {
      id: 'titre_sejour',
      name: 'Titre de séjour',
      baseFee: 225,
      category: 'Préfecture',
      documents: ['Photos', 'Timbres fiscaux', 'Traductions']
    },
    {
      id: 'naturalisation',
      name: 'Naturalisation',
      baseFee: 55,
      category: 'Préfecture', 
      documents: ['Dossier complet', 'Traductions certifiées']
    },
    {
      id: 'carte_resident',
      name: 'Carte de résident',
      baseFee: 225,
      category: 'Préfecture',
      documents: ['Photos', 'Justificatifs', 'Timbres']
    },
    {
      id: 'regroupement_familial',
      name: 'Regroupement familial',
      baseFee: 220,
      category: 'OFII',
      documents: ['Dossier OFII', 'Traductions', 'Légalisations']
    }
  ];

  const additionalCosts = {
    photos: 15,
    translation_page: 25,
    certified_copy: 3,
    postage: 8,
    travel: 50
  };

  const calculateFees = () => {
    const procedure = procedures.find(p => p.id === selectedProcedure);
    if (!procedure) return;

    let total = procedure.baseFee;
    let breakdown = [
      { item: 'Frais de base', amount: procedure.baseFee }
    ];

    // Photos d'identité
    total += additionalCosts.photos;
    breakdown.push({ item: 'Photos d\'identité', amount: additionalCosts.photos });

    // Traductions (estimation)
    const translationCost = additionalCosts.translation_page * 3;
    total += translationCost;
    breakdown.push({ item: 'Traductions (3 pages)', amount: translationCost });

    // Copies certifiées
    const copiesCost = additionalCosts.certified_copy * 5;
    total += copiesCost;
    breakdown.push({ item: 'Copies certifiées', amount: copiesCost });

    // Frais de courrier
    total += additionalCosts.postage;
    breakdown.push({ item: 'Frais d\'envoi', amount: additionalCosts.postage });

    // Déplacement (optionnel)
    if (department && department !== 'paris') {
      total += additionalCosts.travel;
      breakdown.push({ item: 'Déplacement (estimation)', amount: additionalCosts.travel });
    }

    // Réductions possibles
    let reduction = 0;
    const monthlyIncome = parseInt(income) || 0;
    if (monthlyIncome < 1000) {
      reduction = procedure.baseFee * 0.5; // 50% de réduction sur les frais de base
      breakdown.push({ item: 'Réduction (revenus modestes)', amount: -reduction });
      total -= reduction;
    }

    setCalculation({
      procedure: procedure.name,
      total: Math.round(total),
      breakdown,
      reduction,
      canGetReduction: monthlyIncome < 1000
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Formulaire */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Calculateur de Frais
            </CardTitle>
            <CardDescription>
              Estimez les coûts de vos démarches administratives
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="procedure">Type de démarche</Label>
              <Select value={selectedProcedure} onValueChange={setSelectedProcedure}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une démarche" />
                </SelectTrigger>
                <SelectContent>
                  {procedures.map(procedure => (
                    <SelectItem key={procedure.id} value={procedure.id}>
                      <div>
                        <div className="font-medium">{procedure.name}</div>
                        <Badge variant="outline" className="text-xs">
                          {procedure.category}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="department">Département</Label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre département" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="75">Paris (75)</SelectItem>
                  <SelectItem value="92">Hauts-de-Seine (92)</SelectItem>
                  <SelectItem value="93">Seine-Saint-Denis (93)</SelectItem>
                  <SelectItem value="94">Val-de-Marne (94)</SelectItem>
                  <SelectItem value="69">Rhône (69)</SelectItem>
                  <SelectItem value="13">Bouches-du-Rhône (13)</SelectItem>
                  <SelectItem value="other">Autre département</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="income">Revenus mensuels (€)</Label>
              <Input
                id="income"
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="Revenus mensuels nets"
              />
              <p className="text-xs text-gray-600 mt-1">
                Pour calculer d'éventuelles réductions
              </p>
            </div>

            <div>
              <Label htmlFor="familySize">Nombre de personnes dans le foyer</Label>
              <Input
                id="familySize"
                type="number"
                value={familySize}
                onChange={(e) => setFamilySize(parseInt(e.target.value) || 1)}
                min="1"
                max="10"
              />
            </div>

            <Button onClick={calculateFees} className="w-full" disabled={!selectedProcedure}>
              Calculer les frais
            </Button>
          </CardContent>
        </Card>

        {/* Résultat */}
        <Card>
          <CardHeader>
            <CardTitle>Estimation des coûts</CardTitle>
          </CardHeader>
          <CardContent>
            {calculation ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="font-medium">Total estimé</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {calculation.total} €
                  </span>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Détail des coûts :</h4>
                  <div className="space-y-2">
                    {calculation.breakdown.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className={item.amount < 0 ? 'text-green-600' : ''}>{item.item}</span>
                        <span className={item.amount < 0 ? 'text-green-600' : ''}>
                          {item.amount > 0 ? '+' : ''}{item.amount} €
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {calculation.canGetReduction && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded">
                    <div className="flex items-center gap-2 text-green-800">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Réduction possible</span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                      Vos revenus vous permettent de bénéficier d'une réduction sur les frais administratifs.
                    </p>
                  </div>
                )}

                <div className="text-xs text-gray-600 p-3 bg-gray-50 rounded">
                  <p>⚠️ Cette estimation est indicative. Les frais réels peuvent varier selon votre situation.</p>
                  <p className="mt-1">💡 Consultez le site officiel de votre préfecture pour les tarifs actualisés.</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Sélectionnez une démarche pour calculer les frais</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeeCalculator;
