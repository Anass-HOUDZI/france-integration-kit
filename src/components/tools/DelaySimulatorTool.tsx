
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, MapPin, TrendingUp, AlertTriangle } from 'lucide-react';

interface DelaySimulatorToolProps {
  userProfile: any;
  diagnostic: any;
}

const DelaySimulatorTool: React.FC<DelaySimulatorToolProps> = ({ userProfile, diagnostic }) => {
  const [selectedProcedure, setSelectedProcedure] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [result, setResult] = useState<any>(null);

  const procedures = [
    { id: 'titre_sejour', name: 'Titre de séjour', baseDelay: 60, variation: 30 },
    { id: 'naturalisation', name: 'Naturalisation', baseDelay: 540, variation: 180 },
    { id: 'regroupement_familial', name: 'Regroupement familial', baseDelay: 180, variation: 90 },
    { id: 'carte_resident', name: 'Carte de résident', baseDelay: 120, variation: 60 },
    { id: 'visa_long_sejour', name: 'Visa long séjour', baseDelay: 45, variation: 15 }
  ];

  const departments = [
    { id: '75', name: 'Paris', factor: 1.5 },
    { id: '69', name: 'Rhône (Lyon)', factor: 1.3 },
    { id: '13', name: 'Bouches-du-Rhône (Marseille)', factor: 1.4 },
    { id: '59', name: 'Nord (Lille)', factor: 1.2 },
    { id: '31', name: 'Haute-Garonne (Toulouse)', factor: 1.1 },
    { id: '44', name: 'Loire-Atlantique (Nantes)', factor: 1.0 },
    { id: '67', name: 'Bas-Rhin (Strasbourg)', factor: 1.1 },
    { id: '33', name: 'Gironde (Bordeaux)', factor: 1.0 },
    { id: 'autre', name: 'Autre département', factor: 0.9 }
  ];

  const periods = [
    { id: 'current', name: 'Période actuelle', factor: 1.0 },
    { id: 'summer', name: 'Été (Juin-Août)', factor: 1.3 },
    { id: 'rentrée', name: 'Rentrée (Septembre)', factor: 1.4 },
    { id: 'winter', name: 'Hiver (Décembre-Février)', factor: 1.1 }
  ];

  const calculateDelay = () => {
    const procedure = procedures.find(p => p.id === selectedProcedure);
    const department = departments.find(d => d.id === selectedDepartment);
    const period = periods.find(p => p.id === selectedPeriod);

    if (!procedure || !department || !period) return;

    const baseDelay = procedure.baseDelay;
    const totalFactor = department.factor * period.factor;
    
    const minDelay = Math.round(baseDelay * totalFactor * 0.8);
    const maxDelay = Math.round(baseDelay * totalFactor * 1.2);
    const avgDelay = Math.round(baseDelay * totalFactor);

    const today = new Date();
    const estimatedDate = new Date(today);
    estimatedDate.setDate(today.getDate() + avgDelay);

    setResult({
      procedure: procedure.name,
      department: department.name,
      minDelay,
      maxDelay,
      avgDelay,
      estimatedDate,
      factors: {
        department: department.factor,
        period: period.factor
      }
    });
  };

  const formatDelay = (days: number) => {
    if (days < 30) return `${days} jours`;
    if (days < 365) return `${Math.round(days / 30)} mois`;
    return `${Math.round(days / 365 * 10) / 10} ans`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Simulateur de Délais Administratifs
          </CardTitle>
          <CardDescription>
            Estimez les temps de traitement de vos démarches administratives
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Type de démarche</label>
              <Select value={selectedProcedure} onValueChange={setSelectedProcedure}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir une démarche" />
                </SelectTrigger>
                <SelectContent>
                  {procedures.map(procedure => (
                    <SelectItem key={procedure.id} value={procedure.id}>
                      {procedure.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Département</label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un département" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Période de dépôt</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir une période" />
                </SelectTrigger>
                <SelectContent>
                  {periods.map(period => (
                    <SelectItem key={period.id} value={period.id}>
                      {period.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={calculateDelay}
            disabled={!selectedProcedure || !selectedDepartment || !selectedPeriod}
            className="w-full"
          >
            Calculer les délais
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Estimation des délais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {formatDelay(result.avgDelay)}
                </div>
                <p className="text-gray-600">Délai moyen estimé</p>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="font-semibold text-green-600">{formatDelay(result.minDelay)}</div>
                  <div className="text-xs text-gray-500">Minimum</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-red-600">{formatDelay(result.maxDelay)}</div>
                  <div className="text-xs text-gray-500">Maximum</div>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Date estimée de réponse</span>
                </div>
                <div className="text-lg font-semibold text-blue-900">
                  {result.estimatedDate.toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Facteurs d'influence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Département : {result.department}</span>
                  <Badge variant={result.factors.department > 1.2 ? "destructive" : result.factors.department > 1.0 ? "secondary" : "default"}>
                    x{result.factors.department}
                  </Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{width: `${Math.min(result.factors.department * 50, 100)}%`}}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Période de dépôt</span>
                  <Badge variant={result.factors.period > 1.2 ? "destructive" : result.factors.period > 1.0 ? "secondary" : "default"}>
                    x{result.factors.period}
                  </Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-600 h-2 rounded-full" 
                    style={{width: `${Math.min(result.factors.period * 50, 100)}%`}}
                  ></div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-900">Conseils pour accélérer</p>
                    <ul className="text-yellow-700 mt-1 space-y-1">
                      <li>• Préparez un dossier complet dès le premier dépôt</li>
                      <li>• Évitez les périodes de forte affluence</li>
                      <li>• Prenez rendez-vous le plus tôt possible</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DelaySimulatorTool;
