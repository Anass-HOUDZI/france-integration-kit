
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calculator, Info, AlertTriangle } from 'lucide-react';

interface FeeCalculatorProps {
  userProfile: any;
  diagnostic: any;
}

const FeeCalculator: React.FC<FeeCalculatorProps> = ({ userProfile, diagnostic }) => {
  const [procedure, setProcedure] = useState('');
  const [applicationType, setApplicationType] = useState('');
  const [isFirstTime, setIsFirstTime] = useState('');
  const [calculatedFees, setCalculatedFees] = useState<any>(null);

  const procedures = [
    { value: 'titre_sejour', label: 'Titre de séjour', category: 'Immigration' },
    { value: 'naturalisation', label: 'Naturalisation', category: 'Nationalité' },
    { value: 'visa', label: 'Visa', category: 'Immigration' },
    { value: 'carte_resident', label: 'Carte de résident', category: 'Immigration' },
    { value: 'passeport', label: 'Passeport français', category: 'Documents' },
    { value: 'cni', label: 'Carte nationale d\'identité', category: 'Documents' },
    { value: 'permis_conduire', label: 'Permis de conduire', category: 'Transport' }
  ];

  const fees = {
    titre_sejour: {
      first_time: { base: 225, stamp: 25, total: 250 },
      renewal: { base: 225, stamp: 25, total: 250 },
      urgent: { base: 225, stamp: 25, urgency: 50, total: 300 }
    },
    naturalisation: {
      first_time: { base: 55, stamp: 0, total: 55 },
      renewal: { base: 55, stamp: 0, total: 55 }
    },
    carte_resident: {
      first_time: { base: 225, stamp: 25, total: 250 },
      renewal: { base: 225, stamp: 25, total: 250 }
    },
    passeport: {
      first_time: { base: 86, stamp: 0, total: 86 },
      renewal: { base: 86, stamp: 0, total: 86 },
      urgent: { base: 86, urgency: 30, total: 116 }
    }
  };

  const calculateFees = () => {
    if (!procedure || !applicationType) return;

    const procedureFees = fees[procedure as keyof typeof fees];
    if (!procedureFees) return;

    const feeStructure = procedureFees[applicationType as keyof typeof procedureFees];
    if (!feeStructure) return;

    setCalculatedFees({
      procedure: procedures.find(p => p.value === procedure)?.label,
      type: applicationType,
      breakdown: feeStructure,
      paymentMethods: ['Timbre fiscal', 'Paiement en ligne', 'Espèces (selon préfecture)'],
      validity: getValidity(procedure)
    });
  };

  const getValidity = (proc: string) => {
    const validityMap: Record<string, string> = {
      titre_sejour: '1 à 10 ans selon le type',
      naturalisation: 'Permanent',
      carte_resident: '10 ans renouvelable',
      passeport: '10 ans',
      cni: '15 ans'
    };
    return validityMap[proc] || 'Variable';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Calculateur de Frais Administratifs
          </CardTitle>
          <CardDescription>
            Calculez précisément les coûts de vos démarches administratives
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="procedure">Type de procédure</Label>
              <Select value={procedure} onValueChange={setProcedure}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une procédure" />
                </SelectTrigger>
                <SelectContent>
                  {procedures.map((proc) => (
                    <SelectItem key={proc.value} value={proc.value}>
                      <div className="flex items-center gap-2">
                        {proc.label}
                        <Badge variant="outline" className="text-xs">
                          {proc.category}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="applicationType">Type de demande</Label>
              <Select value={applicationType} onValueChange={setApplicationType}>
                <SelectTrigger>
                  <SelectValue placeholder="Première demande ou renouvellement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first_time">Première demande</SelectItem>
                  <SelectItem value="renewal">Renouvellement</SelectItem>
                  <SelectItem value="urgent">Procédure d'urgence</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={calculateFees} 
            disabled={!procedure || !applicationType}
            className="bg-green-600 hover:bg-green-700"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculer les frais
          </Button>
        </CardContent>
      </Card>

      {calculatedFees && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-600" />
              Détail des frais - {calculatedFees.procedure}
            </CardTitle>
            <CardDescription>
              {calculatedFees.type === 'first_time' ? 'Première demande' : 
               calculatedFees.type === 'renewal' ? 'Renouvellement' : 'Procédure d\'urgence'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {calculatedFees.breakdown.total}€
              </div>
              <p className="text-blue-800 text-sm">Coût total de la procédure</p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Détail des coûts</h3>
              <div className="space-y-2">
                {calculatedFees.breakdown.base && (
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Frais de dossier</span>
                    <span className="font-medium">{calculatedFees.breakdown.base}€</span>
                  </div>
                )}
                {calculatedFees.breakdown.stamp && (
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Timbre fiscal</span>
                    <span className="font-medium">{calculatedFees.breakdown.stamp}€</span>
                  </div>
                )}
                {calculatedFees.breakdown.urgency && (
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Supplément urgence</span>
                    <span className="font-medium text-orange-600">{calculatedFees.breakdown.urgency}€</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-2 font-bold text-lg">
                  <span>Total</span>
                  <span className="text-blue-600">{calculatedFees.breakdown.total}€</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Moyens de paiement acceptés</h3>
              <div className="flex flex-wrap gap-2">
                {calculatedFees.paymentMethods.map((method: string, index: number) => (
                  <Badge key={index} variant="outline">
                    {method}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">Informations importantes</span>
              </div>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li>• Validité du document : {calculatedFees.validity}</li>
                <li>• Les tarifs peuvent varier selon les préfectures</li>
                <li>• Vérifiez les tarifs actuels sur le site officiel</li>
                <li>• Gardez tous les justificatifs de paiement</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FeeCalculator;
