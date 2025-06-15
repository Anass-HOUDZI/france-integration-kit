
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, MapPin, FileText, Calendar, CheckSquare, AlertTriangle } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';

interface SchoolEnrollmentProps {
  userProfile: any;
  diagnostic: any;
}

const SchoolEnrollmentTool: React.FC<SchoolEnrollmentProps> = ({ userProfile }) => {
  const { saveToolData } = useUserProfile();
  const [childAge, setChildAge] = useState('');
  const [currentLevel, setCurrentLevel] = useState('');
  const [address, setAddress] = useState('');
  const [situation, setSituation] = useState('');
  const [enrollmentPlan, setEnrollmentPlan] = useState<any>(null);

  const levels = [
    { id: 'maternelle', name: 'Maternelle (3-6 ans)', minAge: 3, maxAge: 6 },
    { id: 'elementaire', name: 'École élémentaire (6-11 ans)', minAge: 6, maxAge: 11 },
    { id: 'college', name: 'Collège (11-15 ans)', minAge: 11, maxAge: 15 },
    { id: 'lycee', name: 'Lycée (15-18 ans)', minAge: 15, maxAge: 18 }
  ];

  const situations = [
    { id: 'primo_arrivant', name: 'Primo-arrivant en France' },
    { id: 'demenagement', name: 'Déménagement en France' },
    { id: 'changement_etablissement', name: 'Changement d\'établissement' }
  ];

  const generateEnrollmentPlan = () => {
    const age = parseInt(childAge);
    const appropriateLevel = levels.find(level => age >= level.minAge && age <= level.maxAge);
    
    if (!appropriateLevel) {
      alert('Âge invalide pour les niveaux scolaires français');
      return;
    }

    const plan = {
      level: appropriateLevel,
      documents: getRequiredDocuments(appropriateLevel.id, situation),
      timeline: getEnrollmentTimeline(appropriateLevel.id),
      procedures: getEnrollmentProcedures(appropriateLevel.id, situation),
      tips: getEnrollmentTips(appropriateLevel.id, situation),
      contacts: getContacts(appropriateLevel.id)
    };

    setEnrollmentPlan(plan);
    
    saveToolData('school_enrollment', {
      childAge: age,
      level: appropriateLevel.id,
      address,
      situation,
      plan,
      createdAt: new Date().toISOString()
    });
  };

  const getRequiredDocuments = (level: string, situation: string) => {
    const baseDocuments = [
      'Livret de famille ou acte de naissance',
      'Justificatif de domicile récent',
      'Carnet de santé / vaccinations',
      'Certificat de radiation (si changement d\'école)'
    ];

    if (situation === 'primo_arrivant') {
      baseDocuments.push(
        'Titre de séjour ou passeport',
        'Diplômes traduits et apostillés',
        'Certificat de scolarité du pays d\'origine'
      );
    }

    if (level === 'lycee') {
      baseDocuments.push('Bulletins scolaires des 2 dernières années');
    }

    return baseDocuments;
  };

  const getEnrollmentTimeline = (level: string) => {
    const timeline = [
      { period: 'Janvier-Mars', action: 'Recherche d\'établissements dans la zone' },
      { period: 'Avril-Mai', action: 'Constitution du dossier d\'inscription' },
      { period: 'Juin', action: 'Dépôt des dossiers' },
      { period: 'Juillet', action: 'Résultats d\'affectation' },
      { period: 'Août-Septembre', action: 'Finalisation inscription' }
    ];

    if (level === 'maternelle') {
      timeline[0] = { period: 'Décembre-Février', action: 'Inscription en mairie' };
    }

    return timeline;
  };

  const getEnrollmentProcedures = (level: string, situation: string) => {
    const procedures = [];

    if (level === 'maternelle' || level === 'elementaire') {
      procedures.push(
        'Se rendre en mairie avec les documents requis',
        'Obtenir un certificat d\'inscription',
        'Prendre rendez-vous avec l\'école désignée',
        'Finaliser l\'inscription à l\'école'
      );
    } else {
      procedures.push(
        'Consulter la carte scolaire pour connaître l\'établissement de secteur',
        'Remplir les dossiers d\'affectation',
        'Déposer le dossier dans les délais',
        'Attendre les résultats d\'affectation'
      );
    }

    if (situation === 'primo_arrivant') {
      procedures.unshift('Faire traduire les diplômes étrangers si nécessaire');
    }

    return procedures;
  };

  const getEnrollmentTips = (level: string, situation: string) => {
    const tips = [
      'Commencez les démarches dès janvier pour une rentrée en septembre',
      'Gardez des copies de tous les documents',
      'Visitez les établissements lors des portes ouvertes'
    ];

    if (situation === 'primo_arrivant') {
      tips.push(
        'Contactez le CASNAV pour l\'accompagnement linguistique',
        'Renseignez-vous sur les classes d\'accueil (UPE2A)'
      );
    }

    if (level === 'lycee') {
      tips.push('Explorez les différentes filières (générale, technologique, professionnelle)');
    }

    return tips;
  };

  const getContacts = (level: string) => {
    const contacts = [
      { name: 'Mairie', role: 'Inscription école primaire', phone: 'Variable selon commune' },
      { name: 'Rectorat', role: 'Affectation collège/lycée', phone: 'Variable selon académie' }
    ];

    if (level === 'college' || level === 'lycee') {
      contacts.push(
        { name: 'DSDEN', role: 'Direction des services départementaux', phone: 'Variable selon département' }
      );
    }

    return contacts;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Guide Inscription Scolaire
        </h1>
        <p className="text-lg text-gray-600">
          Procédures pour inscrire votre enfant dans le système éducatif français
        </p>
      </div>

      {/* Formulaire */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Informations sur votre enfant
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="childAge">Âge de l'enfant</Label>
              <Input
                id="childAge"
                type="number"
                placeholder="7"
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
              />
            </div>
            
            <div>
              <Label>Niveau scolaire actuel</Label>
              <Select value={currentLevel} onValueChange={setCurrentLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez" />
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
            <Label htmlFor="address">Adresse de résidence</Label>
            <Input
              id="address"
              placeholder="Ville ou code postal"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div>
            <Label>Votre situation</Label>
            <Select value={situation} onValueChange={setSituation}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez votre situation" />
              </SelectTrigger>
              <SelectContent>
                {situations.map(sit => (
                  <SelectItem key={sit.id} value={sit.id}>
                    {sit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={generateEnrollmentPlan}
            disabled={!childAge || !situation}
            className="w-full"
          >
            <FileText className="mr-2 h-4 w-4" />
            Générer mon plan d'inscription
          </Button>
        </CardContent>
      </Card>

      {/* Plan d'inscription */}
      {enrollmentPlan && (
        <div className="space-y-6">
          {/* Niveau recommandé */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800">
                Niveau recommandé : {enrollmentPlan.level.name}
              </CardTitle>
            </CardHeader>
          </Card>

          {/* Documents requis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documents requis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {enrollmentPlan.documents.map((doc: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckSquare className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{doc}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Calendrier */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Calendrier d'inscription
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {enrollmentPlan.timeline.map((step: any, index: number) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded">
                    <Badge variant="outline">{step.period}</Badge>
                    <span className="text-sm">{step.action}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Procédures */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Étapes à suivre
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {enrollmentPlan.procedures.map((procedure: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-sm">{procedure}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Conseils */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Conseils utiles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {enrollmentPlan.tips.map((tip: string, index: number) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-blue-600">💡</span>
                    <span className="text-sm">{tip}</span>
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

export default SchoolEnrollmentTool;
