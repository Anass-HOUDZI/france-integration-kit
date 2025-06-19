
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Clock, Users, Heart, Search, ArrowLeft, Navigation, Star, AlertCircle, ExternalLink } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';

interface SocialServicesLocatorProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}

const SocialServicesLocatorTool: React.FC<SocialServicesLocatorProps> = ({ userProfile, onBack }) => {
  const { saveToolData } = useUserProfile();
  const [city, setCity] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [urgency, setUrgency] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const serviceTypes = [
    { id: 'ccas', name: 'CCAS/CIAS', description: 'Centre Communal d\'Action Sociale', icon: Users },
    { id: 'caf', name: 'CAF', description: 'Caisse d\'Allocations Familiales', icon: Heart },
    { id: 'pole_emploi', name: 'Pôle Emploi', description: 'Service public de l\'emploi', icon: Users },
    { id: 'crous', name: 'CROUS', description: 'Aide aux étudiants', icon: Users },
    { id: 'mission_locale', name: 'Mission Locale', description: 'Accompagnement des jeunes', icon: Users },
    { id: 'secours_populaire', name: 'Secours Populaire', description: 'Aide d\'urgence et solidarité', icon: Heart },
    { id: 'restos_coeur', name: 'Restos du Cœur', description: 'Aide alimentaire', icon: Heart },
    { id: 'croix_rouge', name: 'Croix-Rouge', description: 'Aide humanitaire et sociale', icon: Heart },
    { id: 'emmaues', name: 'Emmaüs', description: 'Aide aux plus démunis', icon: Heart },
    { id: 'secours_catholique', name: 'Secours Catholique', description: 'Solidarité et accompagnement', icon: Heart }
  ];

  const urgencyLevels = [
    { id: 'immediate', name: 'Urgent (24h)', description: 'Besoin immédiat', color: 'red' },
    { id: 'quick', name: 'Rapide (cette semaine)', description: 'Besoin sous quelques jours', color: 'orange' },
    { id: 'normal', name: 'Normal (ce mois)', description: 'Pas d\'urgence particulière', color: 'green' }
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
        rating: 4.5,
        reviews: 124,
        description: 'Centre communal proposant des aides diverses aux résidents du 11e arrondissement.',
        gradient: 'from-blue-500 to-blue-600'
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
        rating: 4.2,
        reviews: 89,
        description: 'Organisme versant les prestations familiales et sociales.',
        gradient: 'from-green-500 to-green-600'
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
        rating: 4.7,
        reviews: 156,
        description: 'Association de solidarité proposant une aide immédiate.',
        gradient: 'from-red-500 to-red-600'
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
        rating: 4.3,
        reviews: 67,
        description: 'Accompagnement des jeunes de 16 à 25 ans vers l\'autonomie.',
        gradient: 'from-purple-500 to-purple-600'
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

  const searchServices = async () => {
    if (!city.trim()) return;

    setLoading(true);
    
    // Simulation d'une recherche avec délai
    await new Promise(resolve => setTimeout(resolve, 1500));

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
    setLoading(false);

    saveToolData('social_services_locator', {
      city,
      serviceType,
      urgency,
      results: searchResults,
      createdAt: new Date().toISOString()
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex items-center gap-2 hover:scale-105 transition-all duration-200 bg-white/80 backdrop-blur-sm border-gray-200 hover:border-blue-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-3xl -z-10"></div>
          <div className="py-12 px-8">
            <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg border border-blue-100">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Services Sociaux</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Localisateur Services Sociaux
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Trouvez rapidement l'aide sociale près de chez vous avec notre outil intelligent
            </p>
          </div>
        </div>

        {/* Search Form */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl text-white">
                <Search className="h-6 w-6" />
              </div>
              Rechercher des services
            </CardTitle>
            <CardDescription className="text-base">
              Complétez les informations ci-dessous pour trouver les services sociaux adaptés à vos besoins
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-base font-medium">Votre ville</Label>
                <Input
                  id="city"
                  placeholder="Paris, Lyon, Marseille..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="py-3 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-base font-medium">Type de service</Label>
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger className="py-3 text-base border-gray-200 focus:border-blue-500 rounded-xl">
                    <SelectValue placeholder="Tous les services" />
                  </SelectTrigger>
                  <SelectContent className="z-50">
                    <SelectItem value="all">Tous les services</SelectItem>
                    {serviceTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>
                        <div className="flex items-center gap-3">
                          <type.icon className="h-4 w-4" />
                          <div>
                            <div className="font-medium">{type.name}</div>
                            <div className="text-xs text-gray-500">{type.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-base font-medium">Niveau d'urgence</Label>
                <Select value={urgency} onValueChange={setUrgency}>
                  <SelectTrigger className="py-3 text-base border-gray-200 focus:border-blue-500 rounded-xl">
                    <SelectValue placeholder="Sélectionnez" />
                  </SelectTrigger>
                  <SelectContent className="z-50">
                    {urgencyLevels.map(level => (
                      <SelectItem key={level.id} value={level.id}>
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full bg-${level.color}-500`}></div>
                          <div>
                            <div className="font-medium">{level.name}</div>
                            <div className="text-xs text-gray-500">{level.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={searchServices}
              disabled={!city.trim() || loading}
              className="w-full py-4 text-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Recherche en cours...
                </div>
              ) : (
                <>
                  <Search className="mr-2 h-5 w-5" />
                  Rechercher les services
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {results && (
          <div className="space-y-8 animate-fade-in">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Résultats de recherche</CardTitle>
                <CardDescription className="text-base">
                  <strong>{results.totalFound}</strong> service(s) trouvé(s) à <strong>{results.city}</strong>
                  {results.serviceType !== 'Tous' && ` - ${results.serviceType}`}
                  {results.urgency !== 'Normal' && ` - ${results.urgency}`}
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {results.services.map((service: any) => (
                <Card key={service.id} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:scale-105 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-3 group-hover:text-blue-600 transition-colors">
                          {service.name}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge className={`bg-gradient-to-r ${service.gradient} text-white`}>
                            {service.type}
                          </Badge>
                          {service.urgencySupport && (
                            <Badge className="bg-red-100 text-red-800 border border-red-200">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Urgence 24h
                            </Badge>
                          )}
                          <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                            <Navigation className="h-3 w-3 mr-1" />
                            {service.distance}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < Math.floor(service.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {service.rating} ({service.reviews} avis)
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-600 text-base leading-relaxed">{service.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 text-sm">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{service.address}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="h-4 w-4 text-blue-500 flex-shrink-0" />
                        <a href={`tel:${service.phone}`} className="text-blue-600 hover:text-blue-800 font-medium">
                          {service.phone}
                        </a>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm">
                        <Clock className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{service.hours}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2 text-base">
                        <Users className="h-4 w-4 text-blue-500" />
                        Services proposés
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.services.map((s: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                      <Button variant="outline" size="sm" className="flex-1 hover:bg-blue-50 hover:border-blue-300">
                        <Phone className="mr-2 h-4 w-4" />
                        Appeler
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 hover:bg-green-50 hover:border-green-300">
                        <Navigation className="mr-2 h-4 w-4" />
                        Itinéraire
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 hover:bg-indigo-50 hover:border-indigo-300">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Site web
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {results.services.length === 0 && (
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Aucun service trouvé
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    Aucun service ne correspond à vos critères de recherche.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-md mx-auto">
                    <h4 className="font-semibold text-blue-900 mb-3">Suggestions :</h4>
                    <ul className="text-sm text-blue-800 space-y-2 text-left">
                      <li>• Élargissez votre recherche en sélectionnant "Tous les services"</li>
                      <li>• Vérifiez l'orthographe de votre ville</li>
                      <li>• Essayez avec une ville voisine</li>
                      <li>• Contactez votre mairie pour plus d'informations</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Emergency Help Section */}
        <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-red-800 text-2xl">
              <div className="p-2 bg-red-500 rounded-xl text-white">
                <Heart className="h-6 w-6" />
              </div>
              Besoin d'aide en urgence ?
            </CardTitle>
            <CardDescription className="text-red-700 text-base">
              Des services d'urgence sont disponibles 24h/24 pour vous aider
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105">
                <div className="text-3xl font-bold text-red-600 mb-2">115</div>
                <div className="font-semibold text-gray-900 mb-1">SAMU Social</div>
                <div className="text-sm text-gray-600">Urgence sociale</div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105">
                <div className="text-3xl font-bold text-blue-600 mb-2">3919</div>
                <div className="font-semibold text-gray-900 mb-1">Violence Femmes</div>
                <div className="text-sm text-gray-600">Info violences</div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105">
                <div className="text-3xl font-bold text-green-600 mb-2">0800 840 800</div>
                <div className="font-semibold text-gray-900 mb-1">Maltraitance</div>
                <div className="text-sm text-gray-600">Enfants en danger</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SocialServicesLocatorTool;
