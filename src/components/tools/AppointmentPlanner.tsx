
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Plus, Trash2, AlertCircle } from 'lucide-react';

interface AppointmentPlannerProps {
  userProfile: any;
  diagnostic: any;
}

interface Appointment {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  notes: string;
  documents: string[];
  status: 'planned' | 'confirmed' | 'completed' | 'cancelled';
}

const AppointmentPlanner: React.FC<AppointmentPlannerProps> = ({ userProfile, diagnostic }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    type: '',
    date: '',
    time: '',
    location: '',
    notes: '',
    documents: [] as string[]
  });

  const appointmentTypes = [
    { value: 'prefecture', label: 'Préfecture', color: 'bg-blue-500' },
    { value: 'mairie', label: 'Mairie', color: 'bg-green-500' },
    { value: 'caf', label: 'CAF', color: 'bg-purple-500' },
    { value: 'pole_emploi', label: 'Pôle Emploi', color: 'bg-orange-500' },
    { value: 'ofii', label: 'OFII', color: 'bg-red-500' },
    { value: 'assurance_maladie', label: 'Assurance Maladie', color: 'bg-teal-500' },
    { value: 'banque', label: 'Banque', color: 'bg-indigo-500' },
    { value: 'autre', label: 'Autre', color: 'bg-gray-500' }
  ];

  const commonDocuments = [
    'Passeport',
    'Visa',
    'Titre de séjour',
    'Justificatif de domicile',
    'Relevé bancaire',
    'Contrat de travail',
    'Fiches de paie',
    'Attestation d\'assurance',
    'Photos d\'identité',
    'Acte de naissance'
  ];

  useEffect(() => {
    // Load appointments from localStorage
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }
  }, []);

  const saveAppointments = (newAppointments: Appointment[]) => {
    setAppointments(newAppointments);
    localStorage.setItem('appointments', JSON.stringify(newAppointments));
  };

  const addAppointment = () => {
    if (!newAppointment.title || !newAppointment.type || !newAppointment.date) return;

    const appointment: Appointment = {
      id: Date.now().toString(),
      ...newAppointment,
      status: 'planned'
    };

    const updatedAppointments = [...appointments, appointment];
    saveAppointments(updatedAppointments);

    setNewAppointment({
      title: '',
      type: '',
      date: '',
      time: '',
      location: '',
      notes: '',
      documents: []
    });
    setShowAddForm(false);
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    const updatedAppointments = appointments.map(apt => 
      apt.id === id ? { ...apt, status } : apt
    );
    saveAppointments(updatedAppointments);
  };

  const deleteAppointment = (id: string) => {
    const updatedAppointments = appointments.filter(apt => apt.id !== id);
    saveAppointments(updatedAppointments);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      planned: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      planned: 'Planifié',
      confirmed: 'Confirmé',
      completed: 'Terminé',
      cancelled: 'Annulé'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const upcomingAppointments = appointments
    .filter(apt => new Date(apt.date) >= new Date() && apt.status !== 'cancelled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Planificateur de Rendez-vous
          </CardTitle>
          <CardDescription>
            Organisez tous vos rendez-vous administratifs en un seul endroit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nouveau rendez-vous
          </Button>
        </CardContent>
      </Card>

      {upcomingAppointments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              Prochains rendez-vous
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingAppointments.slice(0, 3).map((appointment) => {
                const appointmentType = appointmentTypes.find(t => t.value === appointment.type);
                return (
                  <div key={appointment.id} className="flex items-center gap-4 p-3 bg-orange-50 rounded-lg">
                    <div className={`w-3 h-3 ${appointmentType?.color || 'bg-gray-500'} rounded-full`} />
                    <div className="flex-1">
                      <div className="font-medium">{appointment.title}</div>
                      <div className="text-sm text-gray-600">
                        {new Date(appointment.date).toLocaleDateString('fr-FR')} 
                        {appointment.time && ` à ${appointment.time}`}
                      </div>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>
                      {getStatusLabel(appointment.status)}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Nouveau rendez-vous</CardTitle>
            <CardDescription>
              Ajoutez un nouveau rendez-vous à votre planning
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Objet du rendez-vous</Label>
                <Input
                  id="title"
                  placeholder="Ex: Renouvellement titre de séjour"
                  value={newAppointment.title}
                  onChange={(e) => setNewAppointment(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type d'organisme</Label>
                <Select 
                  value={newAppointment.type} 
                  onValueChange={(value) => setNewAppointment(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez l'organisme" />
                  </SelectTrigger>
                  <SelectContent>
                    {appointmentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 ${type.color} rounded-full`} />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Heure (optionnel)</Label>
                <Input
                  id="time"
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment(prev => ({ ...prev, time: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Lieu</Label>
              <Input
                id="location"
                placeholder="Adresse du rendez-vous"
                value={newAppointment.location}
                onChange={(e) => setNewAppointment(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Informations complémentaires"
                rows={3}
                value={newAppointment.notes}
                onChange={(e) => setNewAppointment(prev => ({ ...prev, notes: e.target.value }))}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={addAppointment} className="bg-purple-600 hover:bg-purple-700">
                Ajouter le rendez-vous
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {appointments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Tous mes rendez-vous</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((appointment) => {
                  const appointmentType = appointmentTypes.find(t => t.value === appointment.type);
                  return (
                    <Card key={appointment.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className={`w-4 h-4 ${appointmentType?.color || 'bg-gray-500'} rounded-full mt-1`} />
                          <div>
                            <h3 className="font-medium">{appointment.title}</h3>
                            <div className="text-sm text-gray-600 mt-1">
                              <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {new Date(appointment.date).toLocaleDateString('fr-FR')}
                                </span>
                                {appointment.time && (
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {appointment.time}
                                  </span>
                                )}
                                {appointment.location && (
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {appointment.location}
                                  </span>
                                )}
                              </div>
                            </div>
                            {appointment.notes && (
                              <p className="text-sm text-gray-600 mt-2">{appointment.notes}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(appointment.status)}>
                            {getStatusLabel(appointment.status)}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteAppointment(appointment.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      )}

      {appointments.length === 0 && !showAddForm && (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun rendez-vous planifié
            </h3>
            <p className="text-gray-600 mb-4">
              Commencez par ajouter votre premier rendez-vous administratif
            </p>
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un rendez-vous
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AppointmentPlanner;
