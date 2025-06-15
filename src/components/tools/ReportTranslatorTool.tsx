
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Globe, FileText, ArrowRight, BookOpen, GraduationCap, Award } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';

interface ReportTranslatorProps {
  userProfile: any;
  diagnostic: any;
}

const ReportTranslatorTool: React.FC<ReportTranslatorProps> = ({ userProfile }) => {
  const { saveToolData } = useUserProfile();
  const [originCountry, setOriginCountry] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [originalGrade, setOriginalGrade] = useState('');
  const [comments, setComments] = useState('');
  const [translation, setTranslation] = useState<any>(null);

  const countries = [
    { id: 'usa', name: 'États-Unis', system: 'A-F / 0-100%' },
    { id: 'uk', name: 'Royaume-Uni', system: 'A*-U / 1st-3rd class' },
    { id: 'germany', name: 'Allemagne', system: '1-6' },
    { id: 'spain', name: 'Espagne', system: '0-10' },
    { id: 'italy', name: 'Italie', system: '18-30' },
    { id: 'canada', name: 'Canada', system: 'A-F / %' },
    { id: 'australia', name: 'Australie', system: 'HD-N' },
    { id: 'china', name: 'Chine', system: '0-100' },
    { id: 'japan', name: 'Japon', system: 'S-F' },
    { id: 'brazil', name: 'Brésil', system: '0-10' },
    { id: 'morocco', name: 'Maroc', system: '0-20' },
    { id: 'algeria', name: 'Algérie', system: '0-20' },
    { id: 'tunisia', name: 'Tunisie', system: '0-20' },
    { id: 'other', name: 'Autre pays', system: 'Système variable' }
  ];

  const levels = [
    { id: 'primaire', name: 'École primaire' },
    { id: 'college', name: 'Collège (6ème-3ème)' },
    { id: 'lycee', name: 'Lycée (2nde-Terminale)' },
    { id: 'superieur', name: 'Enseignement supérieur' },
    { id: 'professionnel', name: 'Formation professionnelle' }
  ];

  const translateGrade = () => {
    const countryData = countries.find(c => c.id === originCountry);
    
    if (!originCountry || !gradeLevel || !originalGrade) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const translation = {
      original: {
        country: countryData?.name,
        system: countryData?.system,
        grade: originalGrade,
        level: levels.find(l => l.id === gradeLevel)?.name
      },
      french: {
        grade: convertToFrenchGrade(originCountry, originalGrade, gradeLevel),
        scale: getFrenchScale(gradeLevel),
        mention: getMention(originCountry, originalGrade, gradeLevel),
        equivalent: getEquivalent(originCountry, originalGrade, gradeLevel)
      },
      explanation: getExplanation(originCountry, gradeLevel),
      context: getContext(gradeLevel),
      tips: getTips(gradeLevel)
    };

    setTranslation(translation);
    
    saveToolData('report_translator', {
      originCountry,
      gradeLevel,
      originalGrade,
      comments,
      translation,
      createdAt: new Date().toISOString()
    });
  };

  const convertToFrenchGrade = (country: string, grade: string, level: string) => {
    const numGrade = parseFloat(grade);
    
    switch (country) {
      case 'usa':
        if (grade.includes('%')) {
          const percent = parseInt(grade);
          return Math.round((percent / 100) * 20 * 100) / 100;
        }
        // Conversion A-F
        const letterGrades: { [key: string]: number } = {
          'A+': 19, 'A': 18, 'A-': 17,
          'B+': 16, 'B': 15, 'B-': 14,
          'C+': 13, 'C': 12, 'C-': 11,
          'D+': 10, 'D': 9, 'D-': 8,
          'F': 5
        };
        return letterGrades[grade.toUpperCase()] || 'Non convertible';
        
      case 'uk':
        const ukGrades: { [key: string]: number } = {
          'A*': 19, 'A': 18, 'B': 16, 'C': 14, 'D': 12, 'E': 10,
          '1st': 18, '2:1': 16, '2:2': 14, '3rd': 12, 'Pass': 10
        };
        return ukGrades[grade] || 'Non convertible';
        
      case 'germany':
        if (numGrade >= 1 && numGrade <= 6) {
          // 1 = excellent, 6 = insuffisant
          return Math.round((7 - numGrade) * 3.33 * 100) / 100;
        }
        break;
        
      case 'spain':
      case 'brazil':
        if (numGrade >= 0 && numGrade <= 10) {
          return Math.round((numGrade / 10) * 20 * 100) / 100;
        }
        break;
        
      case 'italy':
        if (numGrade >= 18 && numGrade <= 30) {
          return Math.round(((numGrade - 18) / 12) * 12 + 8) * 100 / 100;
        }
        break;
        
      case 'china':
        if (numGrade >= 0 && numGrade <= 100) {
          return Math.round((numGrade / 100) * 20 * 100) / 100;
        }
        break;
        
      case 'morocco':
      case 'algeria':
      case 'tunisia':
        if (numGrade >= 0 && numGrade <= 20) {
          return numGrade; // Même système
        }
        break;
        
      default:
        return 'Conversion manuelle nécessaire';
    }
    
    return 'Grade non reconnu';
  };

  const getFrenchScale = (level: string) => {
    switch (level) {
      case 'primaire':
      case 'college':
        return 'Évaluation par compétences (A, B, C, D) ou notes sur 20';
      case 'lycee':
        return 'Notes sur 20 (0-20)';
      case 'superieur':
        return 'Notes sur 20 avec mentions (10-20)';
      case 'professionnel':
        return 'Validation par compétences ou notes sur 20';
      default:
        return 'Notes sur 20';
    }
  };

  const getMention = (country: string, grade: string, level: string) => {
    const frenchGrade = convertToFrenchGrade(country, grade, level);
    
    if (typeof frenchGrade !== 'number') return 'Non applicable';
    
    if (level === 'superieur' || level === 'lycee') {
      if (frenchGrade >= 18) return 'Très Bien';
      if (frenchGrade >= 16) return 'Bien';
      if (frenchGrade >= 14) return 'Assez Bien';
      if (frenchGrade >= 12) return 'Passable';
      if (frenchGrade >= 10) return 'Admis';
      return 'Non admis';
    }
    
    return 'Non applicable à ce niveau';
  };

  const getEquivalent = (country: string, grade: string, level: string) => {
    const frenchGrade = convertToFrenchGrade(country, grade, level);
    
    if (typeof frenchGrade !== 'number') return 'Évaluation qualitative nécessaire';
    
    if (frenchGrade >= 16) return 'Excellent niveau';
    if (frenchGrade >= 14) return 'Bon niveau';
    if (frenchGrade >= 12) return 'Niveau satisfaisant';
    if (frenchGrade >= 10) return 'Niveau acceptable';
    return 'Niveau insuffisant';
  };

  const getExplanation = (country: string, level: string) => {
    const explanations = {
      usa: 'Le système américain utilise des lettres (A-F) ou des pourcentages. A correspond à excellent, F à échec.',
      uk: 'Le système britannique utilise des lettres pour le secondaire et des classes (1st, 2:1, etc.) pour le supérieur.',
      germany: 'Le système allemand va de 1 (très bien) à 6 (insuffisant), inversement aux notes françaises.',
      spain: 'Le système espagnol utilise une échelle de 0 à 10, similaire au système français ramené sur 20.',
      italy: 'Le système italien supérieur va de 18 (minimum) à 30 (maximum), avec 30 cum laude pour l\'excellence.',
      morocco: 'Le système marocain utilise la même échelle que la France (0-20).',
      algeria: 'Le système algérien utilise la même échelle que la France (0-20).',
      tunisia: 'Le système tunisien utilise la même échelle que la France (0-20).'
    };
    
    return explanations[country as keyof typeof explanations] || 'Système de notation spécifique à analyser au cas par cas.';
  };

  const getContext = (level: string) => {
    switch (level) {
      case 'primaire':
        return 'En primaire française, l\'évaluation se fait de plus en plus par compétences (A, B, C, D).';
      case 'college':
        return 'Au collège, les notes sur 20 coexistent avec l\'évaluation par compétences.';
      case 'lycee':
        return 'Au lycée, le système de notation sur 20 est généralisé pour préparer au baccalauréat.';
      case 'superieur':
        return 'Dans le supérieur, les notes vont de 0 à 20 avec un système de mentions et crédits ECTS.';
      case 'professionnel':
        return 'En formation professionnelle, l\'évaluation combine contrôle continu et validation de compétences.';
      default:
        return 'Contexte éducatif français basé sur une échelle de 0 à 20.';
    }
  };

  const getTips = (level: string) => {
    const tips = [
      'Conservez toujours les bulletins originaux avec traduction certifiée',
      'Demandez une attestation de comparabilité au centre ENIC-NARIC France',
      'Joignez une explication du système de notation de votre pays d\'origine'
    ];
    
    if (level === 'superieur') {
      tips.push('Pour le supérieur, vérifiez l\'équivalence ECTS de vos crédits');
    }
    
    if (level === 'lycee') {
      tips.push('Pour l\'équivalence du bac, consultez le rectorat de votre académie');
    }
    
    return tips;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Traducteur Bulletins Scolaires
        </h1>
        <p className="text-lg text-gray-600">
          Convertissez vos notes étrangères vers le système français
        </p>
      </div>

      {/* Formulaire */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Informations sur vos notes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Pays d'origine</Label>
              <Select value={originCountry} onValueChange={setOriginCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre pays" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map(country => (
                    <SelectItem key={country.id} value={country.id}>
                      {country.name} ({country.system})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Niveau scolaire</Label>
              <Select value={gradeLevel} onValueChange={setGradeLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le niveau" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map(level => (
                    <SelectItem key={level.id} value={level.id}>
                      {level.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="grade">Note ou mention obtenue</Label>
            <Input
              id="grade"
              placeholder="Ex: A, 15/20, 85%, Bien..."
              value={originalGrade}
              onChange={(e) => setOriginalGrade(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="comments">Commentaires ou appréciations (optionnel)</Label>
            <Textarea
              id="comments"
              placeholder="Commentaires du bulletin original..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={3}
            />
          </div>

          <Button 
            onClick={translateGrade}
            disabled={!originCountry || !gradeLevel || !originalGrade}
            className="w-full"
          >
            <ArrowRight className="mr-2 h-4 w-4" />
            Traduire vers le système français
          </Button>
        </CardContent>
      </Card>

      {/* Traduction */}
      {translation && (
        <div className="space-y-6">
          {/* Conversion principale */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800">Conversion de note</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="text-sm text-gray-600">Note originale</div>
                  <div className="text-2xl font-bold">{translation.original.grade}</div>
                  <div className="text-sm text-gray-500">{translation.original.system}</div>
                </div>
                
                <ArrowRight className="h-8 w-8 text-blue-600" />
                
                <div className="text-center">
                  <div className="text-sm text-gray-600">Note française</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {typeof translation.french.grade === 'number' 
                      ? `${translation.french.grade}/20` 
                      : translation.french.grade}
                  </div>
                  <div className="text-sm text-gray-500">{translation.french.scale}</div>
                </div>
              </div>
              
              {translation.french.mention !== 'Non applicable' && (
                <div className="mt-4 text-center">
                  <Badge className="bg-blue-200 text-blue-800">
                    Mention : {translation.french.mention}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Équivalence et explication */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Équivalence qualitative
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium text-green-600 mb-2">
                  {translation.french.equivalent}
                </p>
                <p className="text-sm text-gray-600">
                  {translation.explanation}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Contexte français
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">
                  {translation.context}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Conseils */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Conseils pour la reconnaissance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {translation.tips.map((tip: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Avertissement */}
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <span className="text-amber-600 text-2xl">⚠️</span>
                <div>
                  <h3 className="font-medium text-amber-800 mb-2">Important</h3>
                  <p className="text-sm text-amber-700">
                    Cette conversion est indicative. Pour une reconnaissance officielle, 
                    contactez le centre ENIC-NARIC France ou l'établissement français concerné. 
                    Une traduction certifiée peut être exigée.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ReportTranslatorTool;
