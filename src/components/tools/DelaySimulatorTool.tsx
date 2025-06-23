
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Clock, Calendar, MapPin, TrendingUp, AlertTriangle, Bell, Share2, Save, History, FileText } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

interface DelaySimulatorToolProps {
  userProfile: any;
  diagnostic: any;
  onBack?: () => void;
}

interface DelayResult {
  procedure: string;
  department: string;
  minDelay: number;
  maxDelay: number;
  avgDelay: number;
  estimatedDate: Date;
  factors: {
    department: number;
    period: number;
    complexity: number;
  };
  timeline: Array<{
    step: string;
    date: Date;
    completed: boolean;
  }>;
}

interface SavedEstimation {
  id: string;
  date: Date;
  procedure: string;
  department: string;
  result: DelayResult;
}

const DelaySimulatorTool: React.FC<DelaySimulatorToolProps> = ({ userProfile, diagnostic, onBack }) => {
  const { t } = useI18n();
  const [selectedProcedure, setSelectedProcedure] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedComplexity, setSelectedComplexity] = useState('');
  const [result, setResult] = useState<DelayResult | null>(null);
  const [savedEstimations, setSavedEstimations] = useState<SavedEstimation[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Load saved estimations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('delay-estimations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSavedEstimations(parsed.map((item: any) => ({
          ...item,
          date: new Date(item.date),
          result: {
            ...item.result,
            estimatedDate: new Date(item.result.estimatedDate),
            timeline: item.result.timeline.map((step: any) => ({
              ...step,
              date: new Date(step.date)
            }))
          }
        })));
      } catch (error) {
        console.error('Error loading saved estimations:', error);
      }
    }
  }, []);

  // Enhanced procedures with more options
  const procedures = [
    { id: 'titre_sejour', name: t('delay.residence_permit'), baseDelay: 60, variation: 30, complexity: 2 },
    { id: 'naturalisation', name: t('delay.naturalization'), baseDelay: 540, variation: 180, complexity: 5 },
    { id: 'regroupement_familial', name: t('delay.family_reunification'), baseDelay: 180, variation: 90, complexity: 4 },
    { id: 'carte_resident', name: t('delay.resident_card'), baseDelay: 120, variation: 60, complexity: 3 },
    { id: 'visa_long_sejour', name: t('delay.long_stay_visa'), baseDelay: 45, variation: 15, complexity: 2 },
    { id: 'autorisation_travail', name: t('delay.work_permit'), baseDelay: 30, variation: 15, complexity: 2 },
    { id: 'titre_etudiant', name: t('delay.student_permit'), baseDelay: 60, variation: 20, complexity: 2 },
    { id: 'carte_visiteur', name: t('delay.visitor_permit'), baseDelay: 90, variation: 30, complexity: 2 },
    { id: 'passeport_talent', name: t('delay.talent_passport'), baseDelay: 60, variation: 20, complexity: 3 },
    { id: 'carte_ue', name: t('delay.eu_card'), baseDelay: 180, variation: 60, complexity: 4 }
  ];

  // Enhanced departments with real delay factors
  const departments = [
    { id: '75', name: 'Paris', factor: 1.8, load: 'high' },
    { id: '69', name: 'Rhône (Lyon)', factor: 1.5, load: 'high' },
    { id: '13', name: 'Bouches-du-Rhône (Marseille)', factor: 1.6, load: 'high' },
    { id: '59', name: 'Nord (Lille)', factor: 1.3, load: 'medium' },
    { id: '31', name: 'Haute-Garonne (Toulouse)', factor: 1.2, load: 'medium' },
    { id: '44', name: 'Loire-Atlantique (Nantes)', factor: 1.1, load: 'medium' },
    { id: '67', name: 'Bas-Rhin (Strasbourg)', factor: 1.2, load: 'medium' },
    { id: '33', name: 'Gironde (Bordeaux)', factor: 1.1, load: 'medium' },
    { id: '06', name: 'Alpes-Maritimes (Nice)', factor: 1.4, load: 'high' },
    { id: '92', name: 'Hauts-de-Seine', factor: 1.7, load: 'high' },
    { id: '93', name: 'Seine-Saint-Denis', factor: 1.9, load: 'very_high' },
    { id: '94', name: 'Val-de-Marne', factor: 1.6, load: 'high' },
    { id: 'autre', name: 'Autre département', factor: 0.9, load: 'low' }
  ];

  const periods = [
    { id: 'current', name: 'Période actuelle', factor: 1.0 },
    { id: 'summer', name: 'Été (Juin-Août)', factor: 1.4 },
    { id: 'rentree', name: 'Rentrée (Septembre)', factor: 1.5 },
    { id: 'winter', name: 'Hiver (Décembre-Février)', factor: 1.2 },
    { id: 'spring', name: 'Printemps (Mars-Mai)', factor: 1.1 }
  ];

  const complexityLevels = [
    { id: 'simple', name: 'Dossier simple', factor: 0.8 },
    { id: 'standard', name: 'Dossier standard', factor: 1.0 },
    { id: 'complex', name: 'Dossier complexe', factor: 1.3 },
    { id: 'very_complex', name: 'Dossier très complexe', factor: 1.6 }
  ];

  const generateTimeline = (procedure: any, avgDelay: number): Array<{step: string; date: Date; completed: boolean}> => {
    const today = new Date();
    const timeline = [];
    
    // Step 1: Dépôt du dossier
    timeline.push({
      step: 'Dépôt du dossier',
      date: new Date(today),
      completed: true
    });

    // Step 2: Accusé de réception
    const step2Date = new Date(today);
    step2Date.setDate(today.getDate() + 7);
    timeline.push({
      step: 'Accusé de réception',
      date: step2Date,
      completed: false
    });

    // Step 3: Instruction du dossier
    const step3Date = new Date(today);
    step3Date.setDate(today.getDate() + Math.round(avgDelay * 0.2));
    timeline.push({
      step: 'Début instruction',
      date: step3Date,
      completed: false
    });

    // Step 4: Convocation (si nécessaire)
    if (procedure.complexity >= 3) {
      const step4Date = new Date(today);
      step4Date.setDate(today.getDate() + Math.round(avgDelay * 0.6));
      timeline.push({
        step: 'Convocation entretien',
        date: step4Date,
        completed: false
      });
    }

    // Step 5: Décision
    const finalDate = new Date(today);
    finalDate.setDate(today.getDate() + avgDelay);
    timeline.push({
      step: 'Décision finale',
      date: finalDate,
      completed: false
    });

    return timeline;
  };

  const calculateDelay = () => {
    const procedure = procedures.find(p => p.id === selectedProcedure);
    const department = departments.find(d => d.id === selectedDepartment);
    const period = periods.find(p => p.id === selectedPeriod);
    const complexity = complexityLevels.find(c => c.id === selectedComplexity);

    if (!procedure || !department || !period || !complexity) return;

    const baseDelay = procedure.baseDelay;
    const totalFactor = department.factor * period.factor * complexity.factor;
    
    const minDelay = Math.round(baseDelay * totalFactor * 0.7);
    const maxDelay = Math.round(baseDelay * totalFactor * 1.3);
    const avgDelay = Math.round(baseDelay * totalFactor);

    const today = new Date();
    const estimatedDate = new Date(today);
    estimatedDate.setDate(today.getDate() + avgDelay);

    const timeline = generateTimeline(procedure, avgDelay);

    const newResult: DelayResult = {
      procedure: procedure.name,
      department: department.name,
      minDelay,
      maxDelay,
      avgDelay,
      estimatedDate,
      factors: {
        department: department.factor,
        period: period.factor,
        complexity: complexity.factor
      },
      timeline
    };

    setResult(newResult);
  };

  const saveEstimation = () => {
    if (!result) return;

    const newEstimation: SavedEstimation = {
      id: Date.now().toString(),
      date: new Date(),
      procedure: selectedProcedure,
      department: selectedDepartment,
      result
    };

    const updated = [newEstimation, ...savedEstimations.slice(0, 9)]; // Keep only last 10
    setSavedEstimations(updated);
    
    localStorage.setItem('delay-estimations', JSON.stringify(updated));
    
    // Show success message
    const event = new CustomEvent('notification', {
      detail: {
        type: 'success',
        title: t('delay.save_estimation'),
        description: 'Estimation sauvegardée avec succès'
      }
    });
    window.dispatchEvent(event);
  };

  const shareEstimation = async () => {
    if (!result) return;

    const shareText = `Estimation délai ${result.procedure}: ${formatDelay(result.avgDelay)} (${result.department})`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Estimation de délai administratif',
          text: shareText,
        });
      } catch (error) {
        console.log('Sharing cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText);
      const event = new CustomEvent('notification', {
        detail: {
          type: 'success',
          title: t('common.copied'),
          description: 'Estimation copiée dans le presse-papiers'
        }
      });
      window.dispatchEvent(event);
    }
  };

  const formatDelay = (days: number) => {
    if (days < 30) return `${days} jours`;
    if (days < 365) return `${Math.round(days / 30)} mois`;
    return `${Math.round(days / 365 * 10) / 10} ans`;
  };

  const getDelayStatus = (days: number, baseDays: number) => {
    const ratio = days / baseDays;
    if (ratio < 0.9) return { status: 'fast', color: 'green' };
    if (ratio < 1.1) return { status: 'normal', color: 'blue' };
    return { status: 'slow', color: 'red' };
  };

  if (showHistory) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => setShowHistory(false)}
              className="flex items-center gap-2"
            >
              ← Retour
            </Button>
            <h2 className="text-2xl font-bold">{t('delay.historical_data')}</h2>
          </div>
        </div>

        {savedEstimations.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Aucune estimation sauvegardée</p>
              <Button
                onClick={() => setShowHistory(false)}
                className="mt-4"
              >
                Créer une estimation
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {savedEstimations.map((estimation) => (
              <Card key={estimation.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{estimation.result.procedure}</h3>
                      <p className="text-sm text-gray-600">
                        {estimation.result.department} • {estimation.date.toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">
                        {formatDelay(estimation.result.avgDelay)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {estimation.result.estimatedDate.toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {onBack && (
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2 mb-6"
        >
          ← {t('common.back')}
        </Button>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            {t('delay.title')}
          </CardTitle>
          <CardDescription>
            {t('delay.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label className="block text-sm font-medium mb-2">{t('delay.procedure_type')}</Label>
              <Select value={selectedProcedure} onValueChange={setSelectedProcedure}>
                <SelectTrigger>
                  <SelectValue placeholder={t('delay.choose_procedure')} />
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
              <Label className="block text-sm font-medium mb-2">{t('delay.department')}</Label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder={t('delay.choose_department')} />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept.id} value={dept.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{dept.name}</span>
                        <Badge variant={dept.load === 'very_high' ? 'destructive' : dept.load === 'high' ? 'secondary' : 'default'}>
                          {dept.load === 'very_high' ? 'Très chargé' : dept.load === 'high' ? 'Chargé' : dept.load === 'medium' ? 'Moyen' : 'Rapide'}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="block text-sm font-medium mb-2">{t('delay.deposit_period')}</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder={t('delay.choose_period')} />
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

            <div>
              <Label className="block text-sm font-medium mb-2">Complexité du dossier</Label>
              <Select value={selectedComplexity} onValueChange={setSelectedComplexity}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir la complexité" />
                </SelectTrigger>
                <SelectContent>
                  {complexityLevels.map(level => (
                    <SelectItem key={level.id} value={level.id}>
                      {level.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={calculateDelay}
              disabled={!selectedProcedure || !selectedDepartment || !selectedPeriod || !selectedComplexity}
              className="flex-1"
            >
              {t('delay.calculate_delays')}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowHistory(true)}
              className="flex items-center gap-2"
            >
              <History className="h-4 w-4" />
              Historique
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {t('delay.estimation')}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={saveEstimation}
                    className="flex items-center gap-1"
                  >
                    <Save className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={shareEstimation}
                    className="flex items-center gap-1"
                  >
                    <Share2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {formatDelay(result.avgDelay)}
                </div>
                <p className="text-gray-600">{t('delay.average_delay')}</p>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="font-semibold text-green-600">{formatDelay(result.minDelay)}</div>
                  <div className="text-xs text-gray-500">{t('delay.minimum')}</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-red-600">{formatDelay(result.maxDelay)}</div>
                  <div className="text-xs text-gray-500">{t('delay.maximum')}</div>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">{t('delay.estimated_response_date')}</span>
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
                {t('delay.influence_factors')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Département : {result.department}</span>
                  <Badge variant={result.factors.department > 1.4 ? "destructive" : result.factors.department > 1.1 ? "secondary" : "default"}>
                    x{result.factors.department}
                  </Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{width: `${Math.min(result.factors.department * 40, 100)}%`}}
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
                    style={{width: `${Math.min(result.factors.period * 60, 100)}%`}}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Complexité du dossier</span>
                  <Badge variant={result.factors.complexity > 1.3 ? "destructive" : result.factors.complexity > 1.0 ? "secondary" : "default"}>
                    x{result.factors.complexity}
                  </Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full" 
                    style={{width: `${Math.min(result.factors.complexity * 50, 100)}%`}}
                  ></div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-900">{t('delay.acceleration_tips')}</p>
                    <ul className="text-yellow-700 mt-1 space-y-1">
                      <li>• {t('delay.complete_file_tip')}</li>
                      <li>• {t('delay.avoid_peak_periods')}</li>
                      <li>• {t('delay.book_early')}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {t('delay.timeline')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.timeline.map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-full ${step.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <div className="flex-1">
                      <div className="font-medium">{step.step}</div>
                      <div className="text-sm text-gray-600">
                        {step.date.toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                    <Badge variant={step.completed ? 'default' : 'secondary'}>
                      {step.completed ? 'Terminé' : 'À venir'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DelaySimulatorTool;
