
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Bell, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  reminder: boolean;
}

const AppointmentPlanner: React.FC<AppointmentPlannerProps> = ({ userProfile, diagnostic }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    date: '',
    time: '',
    location: '',
    notes: '',
    documents: '',
    reminder: true
  });
  const { toast } = useToast();

  const appointmentTypes = [
    { value: 'prefecture', label: 'Préfecture', color: 'bg-blue-500' },
    { value: 'caf', label: 'CAF', color: 'bg-green-500' },
    { value: 'pole_emploi', label: 'Pôle Emploi', color: 'bg-purple-500' },
    { value: 'bank', label: 'Banque', color: 'bg-orange-500' },
    { value: 'school', label: 'École', color: 'bg-yellow-500' },
    { value: 'medical', label: 'Médical', color: 'bg-red-500' },
    { value: 'other', label: 'Autre', color: 'bg-gray-500' }
  ];

  const addAppointment = () => {
    if (!formData.title || !formData.date || !formData.time) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      title: formData.title,
      type: formData.type,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      notes: formData.notes,
      documents: formData.documents.split(',').map(d => d.trim()).filter(d => d),
      reminder: formData.reminder
    };

    setAppointments([...appointments, newAppointment]);
    setFormData({
      title: '',
      type: '',
      date: '',
      time: '',
      location: '',
      notes: '',
      documents: '',
      reminder: true
    });
    setShowForm(false);

    toast({
      title: "Rendez-vous ajouté",
      description: "Votre rendez-vous a été ajouté avec succès"
    });
  };

  const deleteAppointment = (id: string) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
    toast({
      title: "Rendez-vous supprimé",
      description: "Le rendez-vous a été supprimé"
    });
  };

  const getTypeInfo = (type: string) => {
    return appointmentTypes.find(t => t.value === type) || appointmentTypes[appointmentTypes.length - 1];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Mes rendez-vous</h3>
          <p className="text-gray-600">{appointments.length} rendez-vous planifiés</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau rendez-vous
        </Button>
      </div>

      {/* Formulaire d'ajout */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Ajouter un rendez-vous</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Titre du rendez-vous *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Ex: Renouvellement titre de séjour"
                />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le type" />
                  </SelectTrigger>
                  <SelectContent>
                    {appointmentTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="time">Heure *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location">Lieu</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Adresse du rendez-vous"
              />
            </div>

            <div>
              <Label htmlFor="documents">Documents à apporter</Label>
              <Input
                id="documents"
                value={formData.documents}
                onChange={(e) => setFormData({...formData, documents: e.target.value})}
                placeholder="Séparez par des virgules (ex: Passeport, Justificatif de domicile)"
              />
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="Informations supplémentaires"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Annuler
              </Button>
              <Button onClick={addAppointment}>
                Ajouter le rendez-vous
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Liste des rendez-vous */}
      <div className="space-y-4">
        {appointments.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">Aucun rendez-vous planifié</p>
              <Button variant="outline" className="mt-4" onClick={() => setShowForm(true)}>
                Ajouter votre premier rendez-vous
              </Button>
            </CardContent>
          </Card>
        ) : (
          appointments
            .sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime())
            .map((appointment) => {
              const typeInfo = getTypeInfo(appointment.type);
              return (
                <Card key={appointment.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-3 h-3 rounded-full ${typeInfo.color}`}></div>
                          <h4 className="font-medium">{appointment.title}</h4>
                          <Badge variant="outline">{typeInfo.label}</Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(appointment.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{appointment.time}</span>
                          </div>
                          {appointment.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{appointment.location}</span>
                            </div>
                          )}
                        </div>

                        {appointment.documents.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-gray-700 mb-1">Documents à apporter :</p>
                            <div className="flex flex-wrap gap-1">
                              {appointment.documents.map((doc, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {doc}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {appointment.notes && (
                          <div className="mt-3">
                            <p className="text-sm text-gray-600">{appointment.notes}</p>
                          </div>
                        )}
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteAppointment(appointment.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
        )}
      </div>
    </div>
  );
};

export default AppointmentPlanner;
