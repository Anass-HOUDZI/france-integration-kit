
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { AlertCircle, Heart, Volume2, PhoneCall, MapPin } from 'lucide-react';

interface EmergencyPhrase {
  french: string;
  translations: Record<string, string>;
  priority: 'high' | 'medium' | 'low';
  context: string;
}

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface EmergencyPhrasesProps {
  phrases: EmergencyPhrase[];
  languages: Language[];
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
  onSpeak: (text: string, lang: string) => void;
}

const EmergencyPhrases: React.FC<EmergencyPhrasesProps> = ({
  phrases,
  languages,
  selectedLanguage,
  onLanguageChange,
  onSpeak
}) => {
  const emergencyNumbers = [
    {
      number: '15',
      service: 'SAMU',
      description: 'Urgences médicales',
      details: 'Service d\'Aide Médicale Urgente',
      color: 'red'
    },
    {
      number: '18',
      service: 'Pompiers',
      description: 'Secours d\'urgence',
      details: 'Secours et lutte contre l\'incendie',
      color: 'orange'
    },
    {
      number: '112',
      service: 'Urgences EU',
      description: 'Numéro européen',
      details: 'Urgences depuis portable',
      color: 'blue'
    },
    {
      number: '3624',
      service: 'SOS Médecins',
      description: 'Consultations urgentes',
      details: 'Consultations à domicile',
      color: 'green'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            Phrases d'urgence médicale
          </CardTitle>
          <CardDescription>
            Phrases essentielles pour communiquer en cas d'urgence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label>Langue de traduction</Label>
            <select 
              value={selectedLanguage} 
              onChange={(e) => onLanguageChange(e.target.value)}
              className="w-full md:w-64 mt-1 p-2 border rounded-md"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            {phrases.map((phrase, index) => (
              <Card key={index} className={`${phrase.priority === 'high' ? 'bg-red-50 border-red-200' : 'bg-orange-50 border-orange-200'}`}>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900 text-lg">
                          {phrase.french}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <span>🇫🇷</span>
                          <span>Français</span>
                        </div>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {phrase.context}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onSpeak(phrase.french, 'fr')}
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <div>
                        <div className={`font-medium text-lg ${phrase.priority === 'high' ? 'text-red-900' : 'text-orange-900'}`}>
                          {phrase.translations[selectedLanguage]}
                        </div>
                        <div className={`text-sm flex items-center gap-1 ${phrase.priority === 'high' ? 'text-red-600' : 'text-orange-600'}`}>
                          <span>{languages.find(l => l.code === selectedLanguage)?.flag}</span>
                          <span>{languages.find(l => l.code === selectedLanguage)?.name}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onSpeak(phrase.translations[selectedLanguage], selectedLanguage)}
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Numéros d'urgence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PhoneCall className="h-5 w-5 text-red-600" />
            Numéros d'urgence en France
          </CardTitle>
          <CardDescription>
            Numéros essentiels à connaître en cas d'urgence médicale
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyNumbers.map((emergency, index) => (
              <div key={index} className={`p-4 bg-${emergency.color}-50 border border-${emergency.color}-200 rounded-lg text-center`}>
                <div className={`text-3xl font-bold text-${emergency.color}-600 mb-2`}>{emergency.number}</div>
                <div className={`font-medium text-${emergency.color}-800`}>{emergency.service}</div>
                <div className={`text-sm text-${emergency.color}-600`}>{emergency.description}</div>
                <div className={`text-xs text-${emergency.color}-500 mt-1`}>{emergency.details}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conseils d'urgence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-600" />
            Conseils en cas d'urgence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-red-700">🚨 Que faire en cas d'urgence ?</h4>
              <ul className="text-sm space-y-2">
                <li>• Gardez votre calme</li>
                <li>• Évaluez la situation</li>
                <li>• Appelez le bon numéro d'urgence</li>
                <li>• Donnez votre localisation précise</li>
                <li>• Décrivez clairement les symptômes</li>
                <li>• Restez en ligne si demandé</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-red-700">📍 Informations à préparer</h4>
              <ul className="text-sm space-y-2">
                <li>• Votre nom et numéro de téléphone</li>
                <li>• Adresse exacte de l'urgence</li>
                <li>• Nature du problème médical</li>
                <li>• État de conscience de la personne</li>
                <li>• Allergies connues</li>
                <li>• Médicaments pris récemment</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyPhrases;
