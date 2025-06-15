
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Clock, Users, Heart, Home, Building, Search } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';

interface SocialServicesLocatorProps {
  userProfile: any;
  diagnostic: any;
}

const SocialServicesLocatorTool: React.FC<SocialServicesLocatorProps> = ({ userProfile }) => {
  const { saveToolData } = useUserProfile();
  const [city, setCity] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [urgency, setUrgency] = useState('');
  const [results, setResults] = useState<any>(null);

  const serviceTypes = [
    { id: 'ccas', name: 'CCAS/CIAS', description: 'Centre Communal d\'Action Sociale' },
    { id: 'caf', name: 'CAF', description: 'Caisse d\'Allocations Familiales' },
    { id: 'pole_emploi', name: 'Pôle Emploi', description: 'Service public de l\'emploi' },
    { id: 'crous', name: 'CROUS', description: 'Aide aux étudiants' },
    { id: 'mission_locale', name: 'Mission Locale', description: 'Accompagnement des jeunes' },
    { id: 'secours_populaire', name: 'Secours Populaire', description: 'Aide d\'urgence et solidarité' },
    { id: 'restos_coeur', name: 'Restos du Cœur', description: 'Aide alimentaire' },
    { id: 'croix_rouge', name: 'Croix-Rouge', description: 'Aide humanitaire et sociale' },
    { id: 'emmaues', name: 'Emmaüs', description: 'Aide aux plus démunis' },
    { id: 'secours_catholique', name: 'Secours Catholique', description: 'Solidarité et accompagnement' }
  ];

  const urgencyLevels = [
    { id: 'immediate', name: 'Urgent (24h)', description: 'Besoin immédiat' },
    { id: 'quick', name: 'Rapide (cette semaine)', description: 'Besoin sous quelques jours' },
    { id: 'normal', name: 'Normal (ce mois)', description: 'Pas d\'urgence particulière' }
  ];

  // Simulation de services (en réalité, cela viendrait d'une API)
  const generateServices = () => {
    const services = [
      {
        id: 1,
        name: 'CCAS de Paris 11e',
        type: 'CCAS',
        address: '12 Place Léon Blum, 75011 Paris',
        phone: '01 53 27 11 00',
        email: 'ccas11@paris.fr',
        website: 'www.paris.fr',
        hours: 'Lun-Ven: 8h30-17h',
        services: ['Aide alimentaire', 'Aide au logement', 'Accompagnement social'],
        distance: '2.3 km',
        urgencySupport: true,
        description: 'Centre communal proposant des aides diverses aux résidents du 11e arrondissement.'
      },
      {
        id: 2,
        name: 'CAF de Paris',
        type: 'CAF',
        address: '15 Boulevard Diderot, 75012 Paris',
        phone: '32 30',
        email: 'contact@caf.fr',
        website: 'www.caf.fr',
        hours: 'Lun-Mer-Ven: 9h-16h30',
        services: ['Allocations familiales', 'RSA', 'Prime d\'activité', 'APL'],
        distance: '4.1 km',
        urgencySupport: false,
        description: 'Organisme versant les prestations familiales et sociales.'
      },
      {
        id: 3,
        name: 'Secours Populaire Paris 11e',
        type: 'Association',
        address: '58 Boulevard Voltaire, 75011 Paris',
        phone: '01 43 55 66 77',
        email: 'paris11@secourspopulaire.fr',
        website: 'www.secourspopulaire.fr',
        hours: 'Mar-Jeu: 14h-17h, Sam: 9h-12h',
        services: ['Aide alimentaire', 'Vestimentaire', 'Soutien scolaire', 'Vacances'],
        distance: '1.8 km',
        urgencySupport: true,
        description: 'Association de solidarité proposant une aide immédiate.'
      },
      {
        id: 4,
        name: 'Mission Locale Paris Est',
        type: 'Mission Locale',
        address: '210 Quai de Jemmapes, 75010 Paris',
        phone: '01 42 02 02 02',
        email: 'contact@mlpest.org',
        website: 'www.missionlocale-parisest.fr',
        hours: 'Lun-Ven: 9h-17h',
        services: ['Insertion professionnelle', 'Formation', 'Logement jeunes', 'Santé'],
        distance: '3.5 km',
        urgencySupport: false,
        description: 'Accompagnement des jeunes de 16 à 25 ans vers l\'autonomie.'
      }
    ];

    // Filtrage selon le type de service sélectionné
    let filteredServices = services;
    if (serviceType && serviceType !== 'all') {
      const selectedType = serviceTypes.find(t => t.id === serviceType);
      if (selectedType) {
        filteredServices = services.filter(s => 
          s.type.toLowerCase().includes(selectedType.name.toLowerCase()) ||
          s.name.toLowerCase().includes(selectedType.name.toLowerCase())
        );
      }
    }

    // Filtrage selon l'urgence
    if (urgency === 'immediate') {
      filteredServices = filteredServices.filter(s => s.urgencySupport);
    }

    return filteredServices;
  };

  const searchServices = () => {
    if (!city.trim()) return;

    const services = generateServices();
    
    const searchResults = {
      city,
      serviceType: serviceTypes.find(t => t.id === serviceType)?.name || 'Tous',
      urgency: urgencyLevels.find(u => u.id === urgency)?.name || 'Normal',
      services,
      totalFound: services.length,
      searchDate: new Date().toISOString()
    };

    setResults(searchResults);

    saveToolData('social_services_locator', {
      city,
      serviceType,
      urgency,
      results: searchResults,
      createdAt: new Date().toISOString()
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Localisateur Services Sociaux
        </h1>
        <p className="text-lg text-gray-600">
          Trouvez l'aide sociale près de chez vous
        </p>
      </div>

      {/* Formulaire de recherche */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Rechercher des services
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">Votre ville</Label>
              <Input
                id="city"
                placeholder="Paris, Lyon, Marseille..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            
            <div>
              <Label>Type de service</Label>
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les services" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les services</SelectItem>
                  {serviceTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name} - {type.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Urgence</Label>
              <Select value={urgency} onValueChange={setUrgency}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez" />
                </SelectTrigger>
                <SelectContent>
                  {urgencyLevels.map(level => (
                    <SelectItem key={level.id} value={level.id}>
                      {level.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={searchServices}
            disabled={!city.trim()}
            className="w-full"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Rechercher les services
          </Button>
        </CardContent>
      </Card>

      {/* Résultats */}
      {results && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Résultats de recherche</CardTitle>
              <CardDescription>
                {results.totalFound} service(s) trouvé(s) à {results.city}
                {results.serviceType !== 'Tous' && ` - ${results.serviceType}`}
                {results.urgency !== 'Normal' && ` - ${results.urgency}`}
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {results.services.map((service: any) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">{service.type}</Badge>
                        {service.urgencySupport && (
                          <Badge className="bg-red-100 text-red-800">
                            Urgence 24h
                          </Badge>
                        )}
                        <Badge variant="secondary">{service.distance}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{service.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{service.address}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{service.phone}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{service.hours}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Services proposés
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {service.services.map((s: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="mr-1 h-3 w-3" />
                      Appeler
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <MapPin className="mr-1 h-3 w-3" />
                      Itinéraire
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {results.services.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucun service trouvé
                </h3>
                <p className="text-gray-600 mb-4">
                  Aucun service ne correspond à vos critères de recherche.
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>Suggestions :</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Élargissez votre recherche en sélectionnant "Tous les services"</li>
                    <li>Vérifiez l'orthographe de votre ville</li>
                    <li>Essayez avec une ville voisine</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Aide en urgence */}
      <Card className="bg-red-50 border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <Heart className="h-5 w-5" />
            Besoin d'aide en urgence ?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded border">
              <div className="text-2xl font-bold text-red-600">115</div>
              <div className="font-medium">SAMU Social</div>
              <div className="text-sm text-gray-600">Urgence sociale</div>
            </div>
            <div className="text-center p-4 bg-white rounded border">
              <div className="text-2xl font-bold text-blue-600">3919</div>
              <div className="font-medium">Violence Femmes</div>
              <div className="text-sm text-gray-600">Info violences</div>
            </div>
            <div className="text-center p-4 bg-white rounded border">
              <div className="text-2xl font-bold text-green-600">0800 840 800</div>
              <div className="font-medium">Maltraitance</div>
              <div className="text-sm text-gray-600">Enfants en danger</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialServicesLocatorTool;
