
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { GraduationCap, Search, ExternalLink, CheckCircle } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

interface DiplomaEquivalenceToolProps {
  userProfile: any;
  diagnostic: any;
}

const DiplomaEquivalenceTool: React.FC<DiplomaEquivalenceToolProps> = ({ userProfile, diagnostic }) => {
  const { t } = useI18n();
  const [searchData, setSearchData] = useState({
    country: '',
    diplomaName: '',
    field: '',
    level: ''
  });
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const countries = [
    'Allemagne', 'Algérie', 'Belgique', 'Brésil', 'Canada', 'Chine', 'Espagne', 
    'États-Unis', 'Italie', 'Japon', 'Maroc', 'Portugal', 'Royaume-Uni', 'Suisse', 'Tunisie'
  ];

  const fields = [
    'Informatique', 'Ingénierie', 'Commerce/Gestion', 'Médecine', 'Droit', 
    'Éducation', 'Sciences', 'Arts', 'Langues', 'Psychologie'
  ];

  const levels = [
    'Bac+2 (DUT/BTS)', 'Bac+3 (Licence)', 'Bac+5 (Master)', 'Bac+8 (Doctorat)'
  ];

  const equivalenceDatabase = {
    'États-Unis': {
      'Bachelor': { french: 'Licence (Bac+3)', level: 6, recognition: 'Automatique' },
      'Master': { french: 'Master (Bac+5)', level: 7, recognition: 'Automatique' },
      'PhD': { french: 'Doctorat (Bac+8)', level: 8, recognition: 'Automatique' }
    },
    'Royaume-Uni': {
      'Bachelor': { french: 'Licence (Bac+3)', level: 6, recognition: 'Automatique' },
      'Master': { french: 'Master (Bac+5)', level: 7, recognition: 'Automatique' },
      'PhD': { french: 'Doctorat (Bac+8)', level: 8, recognition: 'Automatique' }
    },
    'Allemagne': {
      'Bachelor': { french: 'Licence (Bac+3)', level: 6, recognition: 'Automatique' },
      'Master': { french: 'Master (Bac+5)', level: 7, recognition: 'Automatique' },
      'Diplom': { french: 'Master (Bac+5)', level: 7, recognition: 'Sur dossier' }
    },
    'Canada': {
      'Bachelor': { french: 'Licence (Bac+3)', level: 6, recognition: 'Automatique' },
      'Master': { french: 'Master (Bac+5)', level: 7, recognition: 'Automatique' }
    },
    'Maroc': {
      'Licence': { french: 'Licence (Bac+3)', level: 6, recognition: 'Automatique' },
      'Master': { french: 'Master (Bac+5)', level: 7, recognition: 'Automatique' },
      'DUT': { french: 'DUT (Bac+2)', level: 5, recognition: 'Automatique' }
    }
  };

  const searchEquivalence = () => {
    const countryData = equivalenceDatabase[searchData.country as keyof typeof equivalenceDatabase];
    
    if (countryData) {
      const matches = Object.entries(countryData).filter(([key]) => 
        key.toLowerCase().includes(searchData.diplomaName.toLowerCase()) ||
        searchData.diplomaName.toLowerCase().includes(key.toLowerCase())
      );

      if (matches.length > 0) {
        setResults(matches.map(([diploma, info]) => ({
          originalDiploma: diploma,
          ...info,
          country: searchData.country
        })));
      } else {
        setResults([{
          originalDiploma: searchData.diplomaName,
          french: 'Équivalence à déterminer',
          level: 0,
          recognition: 'Évaluation nécessaire',
          country: searchData.country
        }]);
      }
    } else {
      setResults([{
        originalDiploma: searchData.diplomaName,
        french: 'Pays non référencé',
        level: 0,
        recognition: 'Contactez le CIEP',
        country: searchData.country
      }]);
    }
    
    setShowResults(true);
  };

  const getRecognitionBadge = (recognition: string) => {
    switch (recognition) {
      case 'Automatique':
        return <Badge className="bg-green-100 text-green-800">{t('diploma.automatic_recognition')}</Badge>;
      case 'Sur dossier':
        return <Badge className="bg-orange-100 text-orange-800">{t('diploma.file_evaluation')}</Badge>;
      case 'Évaluation nécessaire':
        return <Badge className="bg-blue-100 text-blue-800">{t('diploma.evaluation_needed')}</Badge>;
      default:
        return <Badge variant="outline">{t('diploma.to_determine')}</Badge>;
    }
  };

  const procedures = [
    {
      title: 'ENIC-NARIC France',
      description: 'Centre officiel pour la reconnaissance des diplômes étrangers',
      url: 'https://www.ciep.fr/enic-naric-france',
      cost: 'Gratuit pour attestation, 70€ pour évaluation'
    },
    {
      title: 'Campus France',
      description: 'Assistance pour les étudiants internationaux',
      url: 'https://www.campusfrance.org',
      cost: 'Gratuit'
    },
    {
      title: 'Validation des Acquis (VAE)',
      description: 'Alternative pour faire reconnaître vos compétences',
      url: 'https://www.vae.gouv.fr',
      cost: 'Variable selon l\'établissement'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            {t('diploma.title')}
          </CardTitle>
          <CardDescription>
            {t('diploma.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="country">{t('diploma.country_obtained')}</Label>
              <Select value={searchData.country} onValueChange={(value) => setSearchData({...searchData, country: value})}>
                <SelectTrigger>
                  <SelectValue placeholder={t('diploma.select_country')} />
                </SelectTrigger>
                <SelectContent>
                  {countries.map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="diplomaName">{t('diploma.diploma_name')}</Label>
              <Input
                id="diplomaName"
                value={searchData.diplomaName}
                onChange={(e) => setSearchData({...searchData, diplomaName: e.target.value})}
                placeholder={t('diploma.diploma_placeholder')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="field">{t('diploma.study_field')}</Label>
              <Select value={searchData.field} onValueChange={(value) => setSearchData({...searchData, field: value})}>
                <SelectTrigger>
                  <SelectValue placeholder={t('diploma.select_field')} />
                </SelectTrigger>
                <SelectContent>
                  {fields.map(field => (
                    <SelectItem key={field} value={field}>{field}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="level">{t('diploma.estimated_level')}</Label>
              <Select value={searchData.level} onValueChange={(value) => setSearchData({...searchData, level: value})}>
                <SelectTrigger>
                  <SelectValue placeholder={t('diploma.select_level')} />
                </SelectTrigger>
                <SelectContent>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={searchEquivalence} 
            className="w-full"
            disabled={!searchData.country || !searchData.diplomaName}
          >
            <Search className="mr-2 h-4 w-4" />
            {t('diploma.search_equivalence')}
          </Button>
        </CardContent>
      </Card>

      {showResults && (
        <Card>
          <CardHeader>
            <CardTitle>{t('diploma.search_results')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{result.originalDiploma}</h4>
                    <p className="text-sm text-gray-600">{result.country}</p>
                  </div>
                  {getRecognitionBadge(result.recognition)}
                </div>
                <div className="space-y-2">
                  <p><strong>{t('diploma.french_equivalent')} :</strong> {result.french}</p>
                  {result.level > 0 && (
                    <p><strong>{t('diploma.european_level')} :</strong> Niveau {result.level} du CEC</p>
                  )}
                </div>
              </div>
            ))}

            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Ces résultats sont indicatifs. Pour une reconnaissance officielle, 
                contactez ENIC-NARIC France ou l'établissement qui vous intéresse.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{t('diploma.recognition_procedures')}</CardTitle>
          <CardDescription>
            {t('diploma.official_organizations')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {procedures.map((procedure, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium">{procedure.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{procedure.description}</p>
                  <p className="text-sm font-medium mt-2">{t('diploma.cost')} : {procedure.cost}</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href={procedure.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {t('diploma.visit')}
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default DiplomaEquivalenceTool;
