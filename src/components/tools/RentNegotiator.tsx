
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, BarChart3, FileText, Users, Calendar } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import ToolContainer from './ToolContainer';

interface RentNegotiatorProps {
  userProfile: any;
  diagnostic: any;
}

const RentNegotiator: React.FC<RentNegotiatorProps> = ({ userProfile, diagnostic }) => {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    currentRent: '',
    surface: '',
    city: '',
    propertyType: '',
    negotiationType: '',
    leaseStartDate: '',
    problems: [] as string[]
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProblemToggle = (problem: string) => {
    setFormData(prev => ({
      ...prev,
      problems: prev.problems.includes(problem)
        ? prev.problems.filter(p => p !== problem)
        : [...prev.problems, problem]
    }));
  };

  const problems = [
    'humidity_problems',
    'insufficient_sound_insulation',
    'failing_heating',
    'bathroom_wear',
    'unequipped_kitchen',
    'no_elevator',
    'old_windows',
    'plumbing_problems',
    'no_parking',
    'noisy_neighborhood'
  ];

  return (
    <ToolContainer
      title={t('rent.title')}
      description={t('rent.description')}
      icon={<BarChart3 className="h-8 w-8" />}
      categoryId="logement"
    >
      <Tabs defaultValue="analyse" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="analyse" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            {t('rent.analyse')}
          </TabsTrigger>
          <TabsTrigger value="resultats" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            {t('rent.resultats')}
          </TabsTrigger>
          <TabsTrigger value="modeles" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            {t('rent.modeles_lettres')}
          </TabsTrigger>
          <TabsTrigger value="conciliation" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {t('rent.conciliation')}
          </TabsTrigger>
          <TabsTrigger value="suivi" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {t('rent.suivi')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analyse" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                {t('rent.housing_info')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentRent">{t('rent.current_rent')}</Label>
                  <Input
                    id="currentRent"
                    type="number"
                    value={formData.currentRent}
                    onChange={(e) => handleInputChange('currentRent', e.target.value)}
                    placeholder="1200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="surface">{t('rent.surface')}</Label>
                  <Select value={formData.surface} onValueChange={(value) => handleInputChange('surface', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="50" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 m²</SelectItem>
                      <SelectItem value="50">50 m²</SelectItem>
                      <SelectItem value="70">70 m²</SelectItem>
                      <SelectItem value="90">90 m²</SelectItem>
                      <SelectItem value="110">110 m²</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">{t('rent.city')}</Label>
                  <Select value={formData.city} onValueChange={(value) => handleInputChange('city', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('rent.select_city')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paris">Paris</SelectItem>
                      <SelectItem value="lyon">Lyon</SelectItem>
                      <SelectItem value="marseille">Marseille</SelectItem>
                      <SelectItem value="toulouse">Toulouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="propertyType">{t('rent.property_type')}</Label>
                  <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('rent.select_property_type')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="t1">T1</SelectItem>
                      <SelectItem value="t2">T2</SelectItem>
                      <SelectItem value="t3">T3</SelectItem>
                      <SelectItem value="t4">T4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="negotiationType">{t('rent.negotiation_type')}</Label>
                  <Select value={formData.negotiationType} onValueChange={(value) => handleInputChange('negotiationType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('rent.select_negotiation_type')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="decrease">Diminution</SelectItem>
                      <SelectItem value="freeze">Gel</SelectItem>
                      <SelectItem value="revision">Révision</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leaseStartDate">{t('rent.lease_start_date')}</Label>
                  <Input
                    id="leaseStartDate"
                    type="date"
                    value={formData.leaseStartDate}
                    onChange={(e) => handleInputChange('leaseStartDate', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                {t('rent.housing_problems')}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {t('rent.housing_problems_desc')}
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {problems.map((problem) => (
                  <div
                    key={problem}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      formData.problems.includes(problem)
                        ? 'bg-primary/10 border-primary'
                        : 'bg-muted/50 border-muted hover:bg-muted'
                    }`}
                    onClick={() => handleProblemToggle(problem)}
                  >
                    <div className="text-sm font-medium">
                      {t(`rent.${problem}`)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resultats">
          <Card>
            <CardHeader>
              <CardTitle>{t('rent.resultats')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Résultats de l'analyse à venir...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modeles">
          <Card>
            <CardHeader>
              <CardTitle>{t('rent.modeles_lettres')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Modèles de lettres à venir...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conciliation">
          <Card>
            <CardHeader>
              <CardTitle>{t('rent.conciliation')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Processus de conciliation à venir...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suivi">
          <Card>
            <CardHeader>
              <CardTitle>{t('rent.suivi')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Suivi de la négociation à venir...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </ToolContainer>
  );
};

export default RentNegotiator;
