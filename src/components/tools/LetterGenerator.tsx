import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Copy, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useI18n } from '@/hooks/useI18n';
import ToolContainer from './ToolContainer';

interface LetterGeneratorProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}

const LetterGenerator: React.FC<LetterGeneratorProps> = ({ userProfile, diagnostic, onBack }) => {
  const { t } = useI18n();
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [formData, setFormData] = useState({
    senderName: userProfile?.name || '',
    senderAddress: '',
    recipientName: '',
    recipientAddress: '',
    subject: '',
    content: '',
    customRequest: ''
  });
  const [generatedLetter, setGeneratedLetter] = useState('');
  const { toast } = useToast();

  const letterTemplates = [
    {
      id: 'prefecture_appointment',
      title: t('letter.prefecture_appointment'),
      category: t('letter.prefecture_category'),
      description: t('letter.prefecture_desc')
    },
    {
      id: 'caf_housing_aid',
      title: t('letter.caf_housing_aid'),
      category: t('letter.caf_category'),
      description: t('letter.caf_desc')
    },
    {
      id: 'pole_emploi_registration',
      title: t('letter.job_center_registration'),
      category: t('letter.job_center_category'),
      description: t('letter.job_center_desc')
    },
    {
      id: 'bank_account_opening',
      title: t('letter.bank_account_opening'),
      category: t('letter.bank_category'),
      description: t('letter.bank_desc')
    },
    {
      id: 'school_enrollment',
      title: t('letter.school_enrollment'),
      category: t('letter.education_category'),
      description: t('letter.school_desc')
    }
  ];

  const generateLetter = () => {
    const template = letterTemplates.find(t => t.id === selectedTemplate);
    if (!template) {
      toast({
        title: t('common.error'),
        description: t('letter.select_template_error'),
        variant: "destructive"
      });
      return;
    }

    const today = new Date().toLocaleDateString(t('locale') || 'fr-FR');
    
    let letterContent = '';
    
    // En-tête
    letterContent += `${formData.senderName}\n`;
    letterContent += `${formData.senderAddress}\n\n`;
    letterContent += `${formData.recipientName}\n`;
    letterContent += `${formData.recipientAddress}\n\n`;
    letterContent += `${today}\n\n`;
    letterContent += `${t('letter.subject_label')} : ${formData.subject || template.title}\n\n`;
    letterContent += `${t('letter.greeting')},\n\n`;

    // Corps selon le template
    switch (selectedTemplate) {
      case 'prefecture_appointment':
        letterContent += `${t('letter.prefecture_content_1')} ${formData.customRequest || t('letter.prefecture_default')}.\n\n`;
        letterContent += `${t('letter.prefecture_content_2')} ${userProfile?.title || t('letter.resident')}${t('letter.prefecture_content_3')}.\n\n`;
        break;
        
      case 'caf_housing_aid':
        letterContent += `${t('letter.caf_content_1')}.\n\n`;
        letterContent += `${t('letter.situation_label')} : ${formData.customRequest || t('letter.caf_default')}\n\n`;
        break;
        
      default:
        letterContent += `${formData.content || t('letter.default_content')}\n\n`;
    }

    letterContent += `${t('letter.closing_1')}\n\n`;
    letterContent += `${t('letter.closing_2')}\n\n`;
    letterContent += `${formData.senderName}`;

    setGeneratedLetter(letterContent);
    
    toast({
      title: t('letter.generated_title'),
      description: t('letter.generated_desc')
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    toast({
      title: t('common.copied'),
      description: t('letter.copied_desc')
    });
  };

  return (
    <ToolContainer
      title={t('tool.letter-generator')}
      description={t('tool.letter-generator_desc')}
      icon={<FileText className="h-7 w-7 text-blue-600" />}
      onBack={onBack}
      toolId="letter-generator"
      categoryId="admin"
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* Formulaire */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {t('letter.form_title')}
            </CardTitle>
            <CardDescription>
              {t('letter.form_description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="template">{t('letter.template_label')}</Label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder={t('letter.select_template')} />
                </SelectTrigger>
                <SelectContent>
                  {letterTemplates.map(template => (
                    <SelectItem key={template.id} value={template.id}>
                      <div>
                        <div className="font-medium">{template.title}</div>
                        <Badge variant="outline" className="text-xs">
                          {template.category}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="senderName">{t('letter.your_name')}</Label>
                <Input
                  id="senderName"
                  value={formData.senderName}
                  onChange={(e) => setFormData({...formData, senderName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="recipientName">{t('letter.recipient_name')}</Label>
                <Input
                  id="recipientName"
                  value={formData.recipientName}
                  onChange={(e) => setFormData({...formData, recipientName: e.target.value})}
                  placeholder={t('letter.recipient_placeholder')}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="senderAddress">{t('letter.your_address')}</Label>
              <Textarea
                id="senderAddress"
                value={formData.senderAddress}
                onChange={(e) => setFormData({...formData, senderAddress: e.target.value})}
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="recipientAddress">{t('letter.recipient_address')}</Label>
              <Textarea
                id="recipientAddress"
                value={formData.recipientAddress}
                onChange={(e) => setFormData({...formData, recipientAddress: e.target.value})}
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="customRequest">{t('letter.custom_request')}</Label>
              <Input
                id="customRequest"
                value={formData.customRequest}
                onChange={(e) => setFormData({...formData, customRequest: e.target.value})}
                placeholder={t('letter.custom_request_placeholder')}
              />
            </div>

            <Button onClick={generateLetter} className="w-full">
              {t('letter.generate_letter')}
            </Button>
          </CardContent>
        </Card>

        {/* Aperçu */}
        <Card>
          <CardHeader>
            <CardTitle>{t('letter.preview')}</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyToClipboard} disabled={!generatedLetter}>
                <Copy className="mr-2 h-4 w-4" />
                {t('common.copy')}
              </Button>
              <Button variant="outline" size="sm" disabled={!generatedLetter}>
                <Download className="mr-2 h-4 w-4" />
                {t('letter.pdf')}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {generatedLetter ? (
              <div className="bg-white dark:bg-gray-800 border rounded p-4 min-h-96 text-sm whitespace-pre-line font-mono">
                {generatedLetter}
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-800 border rounded p-4 min-h-96 flex items-center justify-center text-gray-500 dark:text-gray-400">
                {t('letter.preview_placeholder')}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolContainer>
  );
};

export default LetterGenerator;