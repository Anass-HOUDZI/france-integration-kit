
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Lightbulb } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

interface CVTranslatorProps {
  userProfile: any;
  diagnostic: any;
}

const CVTranslator: React.FC<CVTranslatorProps> = ({ userProfile, diagnostic }) => {
  const { t } = useI18n();
  const [cvData, setCvData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      birthDate: '',
      nationality: ''
    },
    objective: '',
    experience: '',
    education: '',
    skills: '',
    languages: '',
    interests: ''
  });
  
  const [targetSector, setTargetSector] = useState('');
  const [translatedCV, setTranslatedCV] = useState('');

  const sectors = [
    { value: 'tech', label: 'Informatique / Tech' },
    { value: 'finance', label: 'Finance / Banque' },
    { value: 'marketing', label: 'Marketing / Communication' },
    { value: 'sales', label: 'Commerce / Vente' },
    { value: 'healthcare', label: 'Santé / Médical' },
    { value: 'education', label: 'Éducation / Formation' },
    { value: 'engineering', label: 'Ingénierie' },
    { value: 'hospitality', label: 'Hôtellerie / Restauration' },
    { value: 'retail', label: 'Commerce de détail' },
    { value: 'other', label: 'Autre secteur' }
  ];

  const frenchCVTips = {
    structure: [
      "Photo professionnelle recommandée (contrairement aux pays anglo-saxons)",
      "État civil complet (âge, situation familiale, nationalité)",
      "Expériences en ordre ante-chronologique (plus récent en premier)",
      "Formation détaillée avec équivalences françaises",
      "Compétences linguistiques selon le CECRL (A1-C2)"
    ],
    vocabulary: [
      "Utiliser des termes professionnels français spécifiques au secteur",
      "Éviter les anglicismes non adaptés au contexte français",
      "Privilégier les verbes d'action en français",
      "Adapter les titres de postes aux équivalents français"
    ],
    format: [
      "CV sur 1-2 pages maximum",
      "Police classique (Arial, Calibri) 10-12pt",
      "Marges équilibrées et présentation aérée",
      "Couleurs sobres et professionnelles"
    ]
  };

  const generateFrenchCV = () => {
    if (!cvData.personalInfo.firstName || !cvData.personalInfo.lastName) return;

    const cv = `${cvData.personalInfo.firstName} ${cvData.personalInfo.lastName}
${cvData.personalInfo.address}
Tél : ${cvData.personalInfo.phone}
Email : ${cvData.personalInfo.email}
${cvData.personalInfo.birthDate ? `Né(e) le : ${new Date(cvData.personalInfo.birthDate).toLocaleDateString('fr-FR')}` : ''}
${cvData.personalInfo.nationality ? `Nationalité : ${cvData.personalInfo.nationality}` : ''}

${cvData.objective ? `OBJECTIF PROFESSIONNEL
${cvData.objective}

` : ''}EXPÉRIENCE PROFESSIONNELLE
${cvData.experience || 'À compléter avec vos expériences en ordre ante-chronologique'}

FORMATION
${cvData.education || 'À compléter avec votre formation et équivalences françaises'}

COMPÉTENCES
${cvData.skills || 'À compléter avec vos compétences techniques et transversales'}

LANGUES
${cvData.languages || 'Français : Niveau à préciser (A1-C2)\nAnglais : Niveau à préciser (A1-C2)\nAutres langues...'}

${cvData.interests ? `CENTRES D'INTÉRÊT
${cvData.interests}` : ''}`;

    setTranslatedCV(cv);
  };

  const downloadCV = () => {
    const element = document.createElement('a');
    const file = new Blob([translatedCV], { type: 'text/plain; charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `CV_${cvData.personalInfo.lastName}_${cvData.personalInfo.firstName}_FR.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {t('cv.title')}
          </CardTitle>
          <CardDescription>
            {t('cv.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="targetSector">{t('cv.target_sector')}</Label>
              <Select value={targetSector} onValueChange={setTargetSector}>
                <SelectTrigger>
                  <SelectValue placeholder={t('cv.select_sector')} />
                </SelectTrigger>
                <SelectContent>
                  {sectors.map((sector) => (
                    <SelectItem key={sector.value} value={sector.value}>
                      {sector.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">{t('cv.personal_info')}</TabsTrigger>
              <TabsTrigger value="experience">{t('cv.experience')}</TabsTrigger>
              <TabsTrigger value="education">{t('cv.education')}</TabsTrigger>
              <TabsTrigger value="skills">{t('cv.skills')}</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <h3 className="font-semibold">{t('cv.personal_info')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t('cv.first_name')}</Label>
                  <Input
                    id="firstName"
                    value={cvData.personalInfo.firstName}
                    onChange={(e) => setCvData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, firstName: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{t('cv.last_name')}</Label>
                  <Input
                    id="lastName"
                    value={cvData.personalInfo.lastName}
                    onChange={(e) => setCvData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, lastName: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('cv.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={cvData.personalInfo.email}
                    onChange={(e) => setCvData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, email: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('cv.phone')}</Label>
                  <Input
                    id="phone"
                    value={cvData.personalInfo.phone}
                    onChange={(e) => setCvData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, phone: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">{t('cv.address')}</Label>
                  <Input
                    id="address"
                    value={cvData.personalInfo.address}
                    onChange={(e) => setCvData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, address: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">{t('cv.birth_date')}</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={cvData.personalInfo.birthDate}
                    onChange={(e) => setCvData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, birthDate: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">{t('cv.nationality')}</Label>
                  <Input
                    id="nationality"
                    value={cvData.personalInfo.nationality}
                    onChange={(e) => setCvData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, nationality: e.target.value }
                    }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="objective">{t('cv.objective')}</Label>
                <Textarea
                  id="objective"
                  value={cvData.objective}
                  onChange={(e) => setCvData(prev => ({ ...prev, objective: e.target.value }))}
                  placeholder="Décrivez votre objectif professionnel..."
                />
              </div>
            </TabsContent>

            <TabsContent value="experience" className="space-y-4">
              <h3 className="font-semibold">{t('cv.experience')}</h3>
              <div className="space-y-2">
                <Label htmlFor="experience">{t('cv.experience')} (ordre ante-chronologique)</Label>
                <Textarea
                  id="experience"
                  placeholder="2020-2023 : Poste - Entreprise - Ville, Pays
• Accomplissement 1
• Accomplissement 2
• Accomplissement 3

2018-2020 : Poste précédent - Entreprise - Ville, Pays
• Accomplissement 1
• Accomplissement 2"
                  rows={8}
                  value={cvData.experience}
                  onChange={(e) => setCvData(prev => ({ ...prev, experience: e.target.value }))}
                />
              </div>
            </TabsContent>

            <TabsContent value="education" className="space-y-4">
              <h3 className="font-semibold">{t('cv.education')}</h3>
              <div className="space-y-2">
                <Label htmlFor="education">{t('cv.education')} et diplômes</Label>
                <Textarea
                  id="education"
                  placeholder="2018 : Master en [Spécialité] - Université - Ville, Pays
Équivalence française : Master 2 (Bac+5)

2016 : Licence en [Spécialité] - Université - Ville, Pays
Équivalence française : Licence (Bac+3)"
                  rows={6}
                  value={cvData.education}
                  onChange={(e) => setCvData(prev => ({ ...prev, education: e.target.value }))}
                />
              </div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="skills">{t('cv.skills')} techniques</Label>
                    <Textarea
                      id="skills"
                      placeholder="• Compétence 1
• Compétence 2
• Logiciels maîtrisés
• Certifications"
                      rows={6}
                      value={cvData.skills}
                      onChange={(e) => setCvData(prev => ({ ...prev, skills: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interests">{t('cv.interests')}</Label>
                    <Textarea
                      id="interests"
                      placeholder="Sports, voyages, bénévolat, etc."
                      rows={3}
                      value={cvData.interests}
                      onChange={(e) => setCvData(prev => ({ ...prev, interests: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="languages">{t('cv.languages')} (niveau CECRL)</Label>
                  <Textarea
                    id="languages"
                    placeholder="Français : B2 (intermédiaire avancé)
Anglais : C1 (avancé)
Espagnol : A2 (élémentaire)
Langue maternelle : [Votre langue]"
                    rows={6}
                    value={cvData.languages}
                    onChange={(e) => setCvData(prev => ({ ...prev, languages: e.target.value }))}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-4 mt-6">
            <Button onClick={generateFrenchCV} disabled={!cvData.personalInfo.firstName || !cvData.personalInfo.lastName}>
              {t('cv.generate_cv')}
            </Button>
            {translatedCV && (
              <Button onClick={downloadCV} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                {t('cv.download')}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {translatedCV && (
        <Card>
          <CardHeader>
            <CardTitle>Votre CV adapté aux standards français</CardTitle>
            <CardDescription>
              Vérifiez et personnalisez le contenu avant utilisation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg mb-4 max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-line text-sm font-mono">
                {translatedCV}
              </pre>
            </div>
            <div className="flex gap-2">
              <Button onClick={downloadCV} className="bg-blue-600 hover:bg-blue-700">
                <Download className="mr-2 h-4 w-4" />
                Télécharger le CV
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            {t('cv.tips')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="structure" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="structure">Structure</TabsTrigger>
              <TabsTrigger value="vocabulary">Vocabulaire</TabsTrigger>
              <TabsTrigger value="format">Format</TabsTrigger>
            </TabsList>

            <TabsContent value="structure" className="space-y-3">
              {frenchCVTips.structure.map((tip, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-1">
                    {index + 1}
                  </Badge>
                  <p className="text-sm text-gray-700">{tip}</p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="vocabulary" className="space-y-3">
              {frenchCVTips.vocabulary.map((tip, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-1">
                    {index + 1}
                  </Badge>
                  <p className="text-sm text-gray-700">{tip}</p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="format" className="space-y-3">
              {frenchCVTips.format.map((tip, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-1">
                    {index + 1}
                  </Badge>
                  <p className="text-sm text-gray-700">{tip}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CVTranslator;
