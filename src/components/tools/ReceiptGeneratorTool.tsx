
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Receipt, FileText, QrCode, Download, Upload, Calendar, 
  MapPin, User, Phone, Mail, CheckCircle, AlertCircle, Clock,
  Camera, Trash2, Eye, Home
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useI18n } from '@/hooks/useI18n';
import jsPDF from 'jspdf';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface ReceiptData {
  id: string;
  receiptNumber: string;
  date: string;
  time: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  procedureType: string;
  organization: string;
  location: string;
  documents: string[];
  notes: string;
  status: 'deposited' | 'in_progress' | 'completed' | 'rejected';
  qrCode: string;
  photos: string[];
  followUpDate?: string;
}

interface ReceiptGeneratorToolProps {
  userProfile: any;
  diagnostic: any;
  onBack?: () => void;
}

const ReceiptGeneratorTool: React.FC<ReceiptGeneratorToolProps> = ({ userProfile, diagnostic, onBack }) => {
  const { toast } = useToast();
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'create' | 'history' | 'track'>('create');
  const [receipts, setReceipts] = useState<ReceiptData[]>([]);
  const [currentReceipt, setCurrentReceipt] = useState<Partial<ReceiptData>>({
    applicantName: userProfile?.firstName && userProfile?.lastName ? 
      `${userProfile.firstName} ${userProfile.lastName}` : '',
    applicantEmail: userProfile?.email || '',
    applicantPhone: userProfile?.phone || '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].substring(0, 5),
    documents: [],
    photos: [],
    status: 'deposited'
  });
  const [trackingId, setTrackingId] = useState('');
  const [newDocumentName, setNewDocumentName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const procedureTypes = [
    'Demande de titre de séjour',
    'Renouvellement titre de séjour',
    'Changement de statut',
    'Regroupement familial',
    'Naturalisation',
    'Demande de logement social',
    'Inscription Pôle Emploi',
    'Demande CAF',
    'Demande RSA',
    'Autres démarches'
  ];

  const organizations = [
    'Préfecture',
    'Sous-préfecture',
    'Mairie',
    'CAF',
    'Pôle Emploi',
    'CPAM',
    'OFII',
    'Conseil Départemental',
    'Autre organisme'
  ];

  const generateReceiptNumber = () => {
    const date = new Date();
    const timestamp = date.getTime().toString().slice(-6);
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `REC-${date.getFullYear()}-${timestamp}-${random}`;
  };

  const generateQRCode = (receiptNumber: string) => {
    return `https://integration-france.org/receipt/${receiptNumber}`;
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setCurrentReceipt(prev => ({
              ...prev,
              photos: [...(prev.photos || []), e.target!.result as string]
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const addDocument = () => {
    if (newDocumentName.trim()) {
      setCurrentReceipt(prev => ({
        ...prev,
        documents: [...(prev.documents || []), newDocumentName.trim()]
      }));
      setNewDocumentName('');
    }
  };

  const removeDocument = (index: number) => {
    setCurrentReceipt(prev => ({
      ...prev,
      documents: prev.documents?.filter((_, i) => i !== index) || []
    }));
  };

  const removePhoto = (index: number) => {
    setCurrentReceipt(prev => ({
      ...prev,
      photos: prev.photos?.filter((_, i) => i !== index) || []
    }));
  };

  const generateReceipt = () => {
    if (!currentReceipt.applicantName || !currentReceipt.procedureType || !currentReceipt.organization) {
      toast({
        title: t('common.error'),
        description: t('receipt.fill_required'),
        variant: "destructive",
      });
      return;
    }

    const receiptNumber = generateReceiptNumber();
    const newReceipt: ReceiptData = {
      id: Date.now().toString(),
      receiptNumber,
      date: currentReceipt.date || new Date().toISOString().split('T')[0],
      time: currentReceipt.time || new Date().toTimeString().split(' ')[0].substring(0, 5),
      applicantName: currentReceipt.applicantName || '',
      applicantEmail: currentReceipt.applicantEmail || '',
      applicantPhone: currentReceipt.applicantPhone || '',
      procedureType: currentReceipt.procedureType || '',
      organization: currentReceipt.organization || '',
      location: currentReceipt.location || '',
      documents: currentReceipt.documents || [],
      notes: currentReceipt.notes || '',
      status: 'deposited',
      qrCode: generateQRCode(receiptNumber),
      photos: currentReceipt.photos || []
    };

    setReceipts(prev => [newReceipt, ...prev]);
    
    // Sauvegarder dans le localStorage
    const savedReceipts = JSON.parse(localStorage.getItem('generated_receipts') || '[]');
    savedReceipts.push(newReceipt);
    localStorage.setItem('generated_receipts', JSON.stringify(savedReceipts));

    toast({
      title: t('receipt.generated_success'),
      description: `${t('receipt.number')}: ${receiptNumber}`,
    });

    // Réinitialiser le formulaire
    setCurrentReceipt({
      applicantName: userProfile?.firstName && userProfile?.lastName ? 
        `${userProfile.firstName} ${userProfile.lastName}` : '',
      applicantEmail: userProfile?.email || '',
      applicantPhone: userProfile?.phone || '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().split(' ')[0].substring(0, 5),
      documents: [],
      photos: [],
      status: 'deposited'
    });

    setActiveTab('history');
  };

  const downloadReceiptPDF = (receipt: ReceiptData) => {
    const doc = new jsPDF();
    
    // Configuration du PDF
    doc.setFontSize(20);
    doc.text('RÉCÉPISSÉ DE DÉPÔT DE DOSSIER', 20, 30);
    
    doc.setFontSize(12);
    doc.text(`Numéro: ${receipt.receiptNumber}`, 20, 50);
    doc.text(`Date: ${receipt.date} à ${receipt.time}`, 20, 60);
    
    doc.text('DEMANDEUR:', 20, 80);
    doc.text(receipt.applicantName, 20, 90);
    if (receipt.applicantEmail) doc.text(receipt.applicantEmail, 20, 100);
    if (receipt.applicantPhone) doc.text(receipt.applicantPhone, 20, 110);
    
    doc.text('DÉMARCHE:', 20, 130);
    doc.text(`Type: ${receipt.procedureType}`, 20, 140);
    doc.text(`Organisme: ${receipt.organization}`, 20, 150);
    if (receipt.location) doc.text(`Lieu: ${receipt.location}`, 20, 160);
    
    doc.text('DOCUMENTS DÉPOSÉS:', 20, 180);
    receipt.documents.forEach((doc_name, index) => {
      doc.text(`- ${doc_name}`, 20, 190 + (index * 10));
    });
    
    if (receipt.notes) {
      const notesY = 190 + (receipt.documents.length * 10) + 20;
      doc.text('NOTES:', 20, notesY);
      doc.text(receipt.notes, 20, notesY + 10);
    }
    
    const footerY = 250;
    doc.text('Ce récépissé atteste du dépôt de votre dossier.', 20, footerY);
    doc.text('Conservez-le précieusement.', 20, footerY + 10);
    doc.text(`QR Code: ${receipt.qrCode}`, 20, footerY + 20);

    doc.save(`recepisse_${receipt.receiptNumber}.pdf`);

    toast({
      title: t('receipt.download_success'),
      description: t('receipt.download_desc'),
    });
  };

  const trackReceipt = () => {
    const receipt = receipts.find(r => r.receiptNumber === trackingId);
    if (receipt) {
      toast({
        title: t('receipt.file_found'),
        description: `${t('receipt.status')}: ${getStatusLabel(receipt.status)}`,
      });
    } else {
      toast({
        title: t('receipt.file_not_found'),
        description: t('receipt.check_number'),
        variant: "destructive",
      });
    }
  };

  React.useEffect(() => {
    // Charger les récépissés sauvegardés
    const savedReceipts = JSON.parse(localStorage.getItem('generated_receipts') || '[]');
    setReceipts(savedReceipts);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'deposited': return <Clock className="h-4 w-4 text-orange-500" />;
      case 'in_progress': return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'deposited': return t('status.deposited');
      case 'in_progress': return t('status.in_progress');
      case 'completed': return t('status.completed');
      case 'rejected': return t('status.rejected');
      default: return status;
    }
  };

  const renderNavButtons = () => (
    <div className="flex gap-2 mb-6">
      <Button 
        variant={activeTab === 'create' ? 'default' : 'outline'} 
        onClick={() => setActiveTab('create')}
      >
        <FileText className="mr-2 h-4 w-4" />
        {t('receipt.create')}
      </Button>
      <Button 
        variant={activeTab === 'history' ? 'default' : 'outline'} 
        onClick={() => setActiveTab('history')}
      >
        <Receipt className="mr-2 h-4 w-4" />
        {t('receipt.history')}
      </Button>
      <Button 
        variant={activeTab === 'track' ? 'default' : 'outline'} 
        onClick={() => setActiveTab('track')}
      >
        <QrCode className="mr-2 h-4 w-4" />
        {t('receipt.track')}
      </Button>
    </div>
  );

  const headerSection = (
    <div>
      <div className="flex items-center gap-4 mb-6">
        {onBack && (
          <Button variant="ghost" onClick={onBack} className="text-blue-600 hover:bg-blue-50">
            <Home className="h-4 w-4 mr-2" />
            {t('nav.back_home')}
          </Button>
        )}
        <div className="flex items-center gap-2">
          <Receipt className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">{t('receipt.title')}</h1>
        </div>
      </div>

      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink 
                href="#" 
                onClick={onBack}
                className="text-blue-600 hover:text-blue-800"
              >
                {t('nav.home')}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t('receipt.title')}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );

  if (activeTab === 'create') {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {headerSection}

        {renderNavButtons()}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {t('receipt.new_receipt')}
            </CardTitle>
            <CardDescription>
              {t('receipt.new_receipt_desc')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Informations du demandeur */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="h-5 w-5" />
                {t('receipt.applicant_info')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="applicantName">{t('receipt.full_name')} *</Label>
                  <Input
                    id="applicantName"
                    value={currentReceipt.applicantName || ''}
                    onChange={(e) => setCurrentReceipt(prev => ({ ...prev, applicantName: e.target.value }))}
                    placeholder="Prénom NOM"
                  />
                </div>
                <div>
                  <Label htmlFor="applicantEmail">{t('receipt.email')}</Label>
                  <Input
                    id="applicantEmail"
                    type="email"
                    value={currentReceipt.applicantEmail || ''}
                    onChange={(e) => setCurrentReceipt(prev => ({ ...prev, applicantEmail: e.target.value }))}
                    placeholder="email@exemple.com"
                  />
                </div>
                <div>
                  <Label htmlFor="applicantPhone">{t('receipt.phone')}</Label>
                  <Input
                    id="applicantPhone"
                    value={currentReceipt.applicantPhone || ''}
                    onChange={(e) => setCurrentReceipt(prev => ({ ...prev, applicantPhone: e.target.value }))}
                    placeholder="06 12 34 56 78"
                  />
                </div>
                <div>
                  <Label htmlFor="date">{t('receipt.deposit_date')}</Label>
                  <Input
                    id="date"
                    type="date"
                    value={currentReceipt.date || ''}
                    onChange={(e) => setCurrentReceipt(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Informations de la démarche */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {t('receipt.procedure_info')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="procedureType">{t('receipt.procedure_type')} *</Label>
                  <Select value={currentReceipt.procedureType || ''} onValueChange={(value) => setCurrentReceipt(prev => ({ ...prev, procedureType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une démarche" />
                    </SelectTrigger>
                    <SelectContent>
                      {procedureTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="organization">{t('receipt.organization')} *</Label>
                  <Select value={currentReceipt.organization || ''} onValueChange={(value) => setCurrentReceipt(prev => ({ ...prev, organization: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un organisme" />
                    </SelectTrigger>
                    <SelectContent>
                      {organizations.map(org => (
                        <SelectItem key={org} value={org}>{org}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="location">{t('receipt.location')}</Label>
                  <Input
                    id="location"
                    value={currentReceipt.location || ''}
                    onChange={(e) => setCurrentReceipt(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Adresse de l'organisme"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Documents */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {t('receipt.documents_deposited')}
              </h3>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder={t('receipt.document_name')}
                    value={newDocumentName}
                    onChange={(e) => setNewDocumentName(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addDocument();
                      }
                    }}
                  />
                  <Button type="button" onClick={addDocument}>
                    {t('receipt.add_document')}
                  </Button>
                </div>
                <div className="space-y-2">
                  {currentReceipt.documents?.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span>{doc}</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeDocument(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            {/* Photos */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Camera className="h-5 w-5" />
                {t('receipt.document_photos')}
              </h3>
              <div className="space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {t('receipt.add_photos')}
                </Button>
                {currentReceipt.photos && currentReceipt.photos.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {currentReceipt.photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img 
                          src={photo} 
                          alt={`Document ${index + 1}`}
                          className="w-full h-20 object-cover rounded border"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 h-6 w-6 p-0"
                          onClick={() => removePhoto(index)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Notes */}
            <div className="space-y-4">
              <Label htmlFor="notes">{t('receipt.additional_notes')}</Label>
              <Textarea
                id="notes"
                value={currentReceipt.notes || ''}
                onChange={(e) => setCurrentReceipt(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Informations complémentaires..."
                rows={3}
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={generateReceipt} className="bg-blue-600 hover:bg-blue-700">
                <Receipt className="mr-2 h-4 w-4" />
                {t('receipt.generate_receipt')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (activeTab === 'history') {
    return (
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {headerSection}

        {renderNavButtons()}

        {receipts.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Receipt className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('receipt.no_receipts')}</h3>
              <p className="text-gray-600 mb-4">{t('receipt.no_receipts_desc')}</p>
              <Button onClick={() => setActiveTab('create')}>
                {t('receipt.create_first')}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {receipts.map((receipt) => (
              <Card key={receipt.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{receipt.receiptNumber}</h3>
                        <Badge className="flex items-center gap-1">
                          {getStatusIcon(receipt.status)}
                          {getStatusLabel(receipt.status)}
                        </Badge>
                      </div>
                      <p className="text-gray-600">{receipt.procedureType} - {receipt.organization}</p>
                      <p className="text-sm text-gray-500">
                        {receipt.date} à {receipt.time}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadReceiptPDF(receipt)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        PDF
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(receipt.qrCode);
                          toast({
                            title: t('receipt.link_copied'),
                            description: t('receipt.link_copied_desc'),
                          });
                        }}
                      >
                        <QrCode className="mr-2 h-4 w-4" />
                        QR Code
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-700">{t('receipt.applicant')}</p>
                      <p>{receipt.applicantName}</p>
                      {receipt.applicantEmail && <p>{receipt.applicantEmail}</p>}
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">{t('receipt.place')}</p>
                      <p>{receipt.location || receipt.organization}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Documents</p>
                      <p>{receipt.documents.length} {t('receipt.documents_count')}</p>
                    </div>
                  </div>

                  {receipt.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded">
                      <p className="text-sm">{receipt.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (activeTab === 'track') {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {headerSection}

        {renderNavButtons()}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              {t('receipt.track_file')}
            </CardTitle>
            <CardDescription>
              {t('receipt.track_desc')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="REC-2024-123456-ABCD"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
              />
              <Button onClick={trackReceipt}>
                <Eye className="mr-2 h-4 w-4" />
                {t('receipt.track_button')}
              </Button>
            </div>

            {trackingId && receipts.find(r => r.receiptNumber === trackingId) && (
              <div className="mt-6">
                {(() => {
                  const receipt = receipts.find(r => r.receiptNumber === trackingId);
                  if (!receipt) return null;
                  
                  return (
                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          {getStatusIcon(receipt.status)}
                          <span className="font-semibold">{getStatusLabel(receipt.status)}</span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-medium">{t('receipt.procedure')}:</span> {receipt.procedureType}</p>
                          <p><span className="font-medium">{t('receipt.organization')}:</span> {receipt.organization}</p>
                          <p><span className="font-medium">{t('receipt.deposit_date_label')}:</span> {receipt.date}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })()}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

export default ReceiptGeneratorTool;
