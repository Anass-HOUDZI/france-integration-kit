import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LayoutGrid, User, Briefcase, MessageSquare, Share2, BarChart3, Eye, Download, Settings, Plus, Trash2, Edit, Star, Globe, Github, Linkedin, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ToolContainer from './ToolContainer';

interface PortfolioCreatorProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}

interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  photo: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  images: string[];
  link: string;
  github: string;
  featured: boolean;
}

interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  content: string;
  rating: number;
  project: string;
}

interface AnalyticsData {
  views: number;
  contacts: number;
  projectViews: number;
  socialShares: number;
}

const TEMPLATES = [
  {
    id: 'modern',
    name: 'Modern Tech',
    description: 'Design moderne pour développeurs',
    color: 'bg-gradient-to-r from-blue-500 to-purple-600'
  },
  {
    id: 'creative',
    name: 'Creative Pro',
    description: 'Template créatif pour designers',
    color: 'bg-gradient-to-r from-pink-500 to-orange-500'
  },
  {
    id: 'business',
    name: 'Business Classic',
    description: 'Style professionnel et élégant',
    color: 'bg-gradient-to-r from-gray-700 to-gray-900'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Design épuré et moderne',
    color: 'bg-gradient-to-r from-teal-400 to-blue-500'
  }
];

const PortfolioCreatorTool: React.FC<PortfolioCreatorProps> = ({ userProfile, diagnostic, onBack }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    photo: ''
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [newProject, setNewProject] = useState<Partial<Project>>({});
  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({});
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    views: Math.floor(Math.random() * 1000) + 100,
    contacts: Math.floor(Math.random() * 50) + 10,
    projectViews: Math.floor(Math.random() * 500) + 50,
    socialShares: Math.floor(Math.random() * 30) + 5
  });
  const [seoSettings, setSeoSettings] = useState({
    title: '',
    description: '',
    keywords: '',
    socialImage: ''
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const addProject = () => {
    if (newProject.title && newProject.description) {
      const project: Project = {
        id: Date.now().toString(),
        title: newProject.title,
        description: newProject.description || '',
        technologies: newProject.technologies || [],
        images: newProject.images || [],
        link: newProject.link || '',
        github: newProject.github || '',
        featured: false
      };
      setProjects(prev => [...prev, project]);
      setNewProject({});
    }
  };

  const removeProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const toggleFeaturedProject = (id: string) => {
    setProjects(prev => prev.map(p => 
      p.id === id ? { ...p, featured: !p.featured } : p
    ));
  };

  const addTestimonial = () => {
    if (newTestimonial.clientName && newTestimonial.content) {
      const testimonial: Testimonial = {
        id: Date.now().toString(),
        clientName: newTestimonial.clientName,
        clientRole: newTestimonial.clientRole || '',
        clientCompany: newTestimonial.clientCompany || '',
        content: newTestimonial.content || '',
        rating: newTestimonial.rating || 5,
        project: newTestimonial.project || ''
      };
      setTestimonials(prev => [...prev, testimonial]);
      setNewTestimonial({});
    }
  };

  const removeTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const generatePortfolioUrl = () => {
    const slug = personalInfo.name.toLowerCase().replace(/\s+/g, '-');
    return `https://${slug}-portfolio.vercel.app`;
  };

  const exportPortfolio = () => {
    const portfolioData = {
      template: selectedTemplate,
      personalInfo,
      projects,
      testimonials,
      seoSettings
    };
    
    const dataStr = JSON.stringify(portfolioData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio-config.json';
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const PortfolioPreview = () => (
    <div className={`min-h-screen p-8 ${selectedTemplate === 'modern' ? 'bg-gradient-to-br from-slate-50 to-blue-50' : 
      selectedTemplate === 'creative' ? 'bg-gradient-to-br from-pink-50 to-orange-50' :
      selectedTemplate === 'business' ? 'bg-gradient-to-br from-gray-50 to-slate-100' :
      'bg-white'}`}>
      
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="mb-6">
            {personalInfo.photo && (
              <img 
                src={personalInfo.photo} 
                alt={personalInfo.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
              />
            )}
            <h1 className="text-5xl font-bold mb-4">{personalInfo.name || 'Votre Nom'}</h1>
            <h2 className="text-2xl text-gray-600 mb-4">{personalInfo.title || 'Votre Titre'}</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">{personalInfo.bio || 'Votre bio professionnelle'}</p>
          </div>
          
          <div className="flex justify-center gap-4 mb-8">
            <Button variant="outline" size="sm">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
            <Button variant="outline" size="sm">
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </Button>
            <Button variant="outline" size="sm">
              <Globe className="h-4 w-4 mr-2" />
              Site Web
            </Button>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center">Projets Mis en Avant</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.filter(p => p.featured).map(project => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold mb-3">{project.title}</h4>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.link && (
                      <Button size="sm" variant="outline">Voir le projet</Button>
                    )}
                    {project.github && (
                      <Button size="sm" variant="outline">Code source</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-center">Témoignages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.slice(0, 4).map(testimonial => (
                <Card key={testimonial.id}>
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                    <div>
                      <div className="font-semibold">{testimonial.clientName}</div>
                      <div className="text-sm text-gray-600">
                        {testimonial.clientRole} {testimonial.clientCompany && `chez ${testimonial.clientCompany}`}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <ToolContainer
      title="Créateur de Portfolio Professionnel"
      description="Créez un portfolio moderne pour mettre en valeur vos compétences et projets"
      icon={<LayoutGrid className="h-8 w-8 text-purple-600" />}
      onBack={onBack}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button 
            variant={isPreviewMode ? "outline" : "default"}
            onClick={() => setIsPreviewMode(false)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Éditer
          </Button>
          <Button 
            variant={isPreviewMode ? "default" : "outline"}
            onClick={() => setIsPreviewMode(true)}
          >
            <Eye className="h-4 w-4 mr-2" />
            Aperçu
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportPortfolio}>
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Share2 className="h-4 w-4 mr-2" />
            Publier
          </Button>
        </div>
      </div>

      {isPreviewMode ? (
        <PortfolioPreview />
      ) : (
        <Tabs defaultValue="template" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="template">Template</TabsTrigger>
            <TabsTrigger value="personal">Profil</TabsTrigger>
            <TabsTrigger value="projects">Projets</TabsTrigger>
            <TabsTrigger value="testimonials">Témoignages</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="template">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LayoutGrid className="h-5 w-5" />
                  Choisissez votre Template
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {TEMPLATES.map(template => (
                    <div 
                      key={template.id}
                      className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                        selectedTemplate === template.id 
                          ? 'border-purple-500 bg-purple-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className={`h-32 rounded-lg mb-4 ${template.color}`}></div>
                      <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                      <p className="text-gray-600 text-sm">{template.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informations Personnelles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nom complet</Label>
                    <Input
                      id="name"
                      value={personalInfo.name}
                      onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Titre professionnel</Label>
                    <Input
                      id="title"
                      value={personalInfo.title}
                      onChange={(e) => handlePersonalInfoChange('title', e.target.value)}
                      placeholder="Développeur Full Stack"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                      placeholder="jean.dupont@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Localisation</Label>
                    <Input
                      id="location"
                      value={personalInfo.location}
                      onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                      placeholder="Paris, France"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio professionnelle</Label>
                  <Textarea
                    id="bio"
                    value={personalInfo.bio}
                    onChange={(e) => handlePersonalInfoChange('bio', e.target.value)}
                    placeholder="Décrivez votre parcours et vos compétences..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Photo de profil</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            setPersonalInfo(prev => ({ ...prev, photo: e.target?.result as string }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Choisir une photo
                    </Button>
                    {personalInfo.photo && (
                      <img 
                        src={personalInfo.photo} 
                        alt="Profile" 
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Ajouter un Projet
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="project-title">Titre du projet</Label>
                      <Input
                        id="project-title"
                        value={newProject.title || ''}
                        onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Mon Super Projet"
                      />
                    </div>
                    <div>
                      <Label htmlFor="project-link">Lien du projet</Label>
                      <Input
                        id="project-link"
                        value={newProject.link || ''}
                        onChange={(e) => setNewProject(prev => ({ ...prev, link: e.target.value }))}
                        placeholder="https://monprojet.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="project-description">Description</Label>
                    <Textarea
                      id="project-description"
                      value={newProject.description || ''}
                      onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Décrivez votre projet..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="project-technologies">Technologies (séparées par des virgules)</Label>
                    <Input
                      id="project-technologies"
                      value={newProject.technologies?.join(', ') || ''}
                      onChange={(e) => setNewProject(prev => ({ 
                        ...prev, 
                        technologies: e.target.value.split(',').map(t => t.trim()).filter(t => t)
                      }))}
                      placeholder="React, TypeScript, Node.js"
                    />
                  </div>

                  <Button onClick={addProject} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter le projet
                  </Button>
                </CardContent>
              </Card>

              {projects.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Mes Projets ({projects.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {projects.map(project => (
                        <div key={project.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold">{project.title}</h4>
                                {project.featured && (
                                  <Badge className="bg-yellow-100 text-yellow-800">
                                    <Star className="h-3 w-3 mr-1" />
                                    Mis en avant
                                  </Badge>
                                )}
                              </div>
                              <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {project.technologies.map((tech, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => toggleFeaturedProject(project.id)}
                              >
                                <Star className={`h-4 w-4 ${project.featured ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => removeProject(project.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="testimonials">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Ajouter un Témoignage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="client-name">Nom du client</Label>
                      <Input
                        id="client-name"
                        value={newTestimonial.clientName || ''}
                        onChange={(e) => setNewTestimonial(prev => ({ ...prev, clientName: e.target.value }))}
                        placeholder="Marie Martin"
                      />
                    </div>
                    <div>
                      <Label htmlFor="client-role">Poste</Label>
                      <Input
                        id="client-role"
                        value={newTestimonial.clientRole || ''}
                        onChange={(e) => setNewTestimonial(prev => ({ ...prev, clientRole: e.target.value }))}
                        placeholder="Directrice Marketing"
                      />
                    </div>
                    <div>
                      <Label htmlFor="client-company">Entreprise</Label>
                      <Input
                        id="client-company"
                        value={newTestimonial.clientCompany || ''}
                        onChange={(e) => setNewTestimonial(prev => ({ ...prev, clientCompany: e.target.value }))}
                        placeholder="TechCorp"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="testimonial-content">Témoignage</Label>
                    <Textarea
                      id="testimonial-content"
                      value={newTestimonial.content || ''}
                      onChange={(e) => setNewTestimonial(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Excellent travail, très professionnel..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="rating">Note (sur 5)</Label>
                    <Select
                      value={newTestimonial.rating?.toString() || '5'}
                      onValueChange={(value) => setNewTestimonial(prev => ({ ...prev, rating: parseInt(value) }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 étoiles</SelectItem>
                        <SelectItem value="4">4 étoiles</SelectItem>
                        <SelectItem value="3">3 étoiles</SelectItem>
                        <SelectItem value="2">2 étoiles</SelectItem>
                        <SelectItem value="1">1 étoile</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={addTestimonial} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter le témoignage
                  </Button>
                </CardContent>
              </Card>

              {testimonials.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Témoignages Clients ({testimonials.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {testimonials.map(testimonial => (
                        <div key={testimonial.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex">
                                  {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                                <span className="font-semibold">{testimonial.clientName}</span>
                                <span className="text-gray-600 text-sm">
                                  - {testimonial.clientRole} {testimonial.clientCompany && `chez ${testimonial.clientCompany}`}
                                </span>
                              </div>
                              <p className="text-gray-700 italic">"{testimonial.content}"</p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeTestimonial(testimonial.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="seo">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Optimisation SEO
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="seo-title">Titre de la page</Label>
                  <Input
                    id="seo-title"
                    value={seoSettings.title}
                    onChange={(e) => setSeoSettings(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Jean Dupont - Développeur Full Stack"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Recommandé: 50-60 caractères
                  </p>
                </div>

                <div>
                  <Label htmlFor="seo-description">Description</Label>
                  <Textarea
                    id="seo-description"
                    value={seoSettings.description}
                    onChange={(e) => setSeoSettings(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Portfolio professionnel de Jean Dupont, développeur full stack spécialisé en React et Node.js"
                    rows={3}
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Recommandé: 150-160 caractères
                  </p>
                </div>

                <div>
                  <Label htmlFor="seo-keywords">Mots-clés (séparés par des virgules)</Label>
                  <Input
                    id="seo-keywords"
                    value={seoSettings.keywords}
                    onChange={(e) => setSeoSettings(prev => ({ ...prev, keywords: e.target.value }))}
                    placeholder="développeur, react, nodejs, javascript, portfolio"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">URL de votre portfolio</h4>
                  <div className="flex items-center gap-2">
                    <code className="bg-white px-3 py-2 rounded border flex-1">
                      {generatePortfolioUrl()}
                    </code>
                    <Button size="sm" variant="outline">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Statistiques du Portfolio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">{analytics.views}</div>
                      <div className="text-sm text-gray-600">Vues totales</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">{analytics.contacts}</div>
                      <div className="text-sm text-gray-600">Contacts reçus</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">{analytics.projectViews}</div>
                      <div className="text-sm text-gray-600">Vues projets</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600">{analytics.socialShares}</div>
                      <div className="text-sm text-gray-600">Partages sociaux</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conseils d'Optimisation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>SEO:</strong> Complétez les méta-données pour améliorer votre référencement Google.
                      </AlertDescription>
                    </Alert>
                    
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Projets:</strong> Ajoutez au moins 3 projets mis en avant pour un impact maximum.
                      </AlertDescription>
                    </Alert>
                    
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Témoignages:</strong> Les témoignages clients augmentent la crédibilité de 40%.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Options de Partage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="outline" className="flex-1 min-w-[200px]">
                      <Linkedin className="h-4 w-4 mr-2" />
                      Partager sur LinkedIn
                    </Button>
                    <Button variant="outline" className="flex-1 min-w-[200px]">
                      <Globe className="h-4 w-4 mr-2" />
                      Copier le lien
                    </Button>
                    <Button variant="outline" className="flex-1 min-w-[200px]">
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </ToolContainer>
  );
};

export default PortfolioCreatorTool;
