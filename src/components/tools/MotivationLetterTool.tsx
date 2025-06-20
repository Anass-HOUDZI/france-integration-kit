
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Wand2, Copy, Check } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

interface MotivationLetterToolProps {
  userProfile: any;
  diagnostic: any;
}

const MotivationLetterTool: React.FC<MotivationLetterToolProps> = ({ userProfile, diagnostic }) => {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    sector: '',
    experience: '',
    motivation: '',
    skills: ''
  });
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [copied, setCopied] = useState(false);

  const sectors = [
    'Informatique/Tech',
    'Commerce/Vente',
    'Marketing/Communication',
    'Finance/Comptabilité',
    'Ressources Humaines',
    'Ingénierie',
    'Santé/Social',
    'Éducation',
    'Hôtellerie/Restauration',
    'Logistique/Transport'
  ];

  const generateLetter = () => {
    const letter = `Madame, Monsieur,

Actuellement ${userProfile?.situation || 'à la recherche d\'opportunités professionnelles'}, je me permets de vous adresser ma candidature pour le poste de ${formData.position} au sein de ${formData.company}.

${formData.experience && `Fort(e) de ${formData.experience} d'expérience dans le domaine ${formData.sector}, j'ai développé des compétences solides qui me permettront de contribuer efficacement à vos équipes.`}

Mes principales compétences incluent :
${formData.skills.split(',').map(skill => `• ${skill.trim()}`).join('\n')}

Ce qui me motive particulièrement pour ce poste :
${formData.motivation}

${userProfile?.status === 'student' ? 'En tant qu\'étudiant(e), je suis particulièrement motivé(e) par l\'opportunité d\'appliquer mes connaissances théoriques dans un contexte professionnel.' : ''}

${userProfile?.status === 'newcomer' ? 'Nouvellement arrivé(e) en France, je suis déterminé(e) à m\'intégrer professionnellement et à apporter ma perspective internationale à votre équipe.' : ''}

Je serais ravi(e) de vous rencontrer pour échanger sur ma candidature et vous démontrer ma motivation.

En vous remerciant de l'attention que vous porterez à ma candidature, je vous prie d'agréer, Madame, Monsieur, mes salutations distinguées.

${userProfile?.name || '[Votre nom]'}`;

    setGeneratedLetter(letter);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadLetter = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `lettre_motivation_${formData.company}_${formData.position}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {t('motivation.title')}
          </CardTitle>
          <CardDescription>
            {t('motivation.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company">{t('motivation.company')}</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                placeholder={t('motivation.company_placeholder')}
              />
            </div>
            <div>
              <Label htmlFor="position">{t('motivation.position')}</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                placeholder={t('motivation.position_placeholder')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sector">{t('motivation.sector')}</Label>
              <Select value={formData.sector} onValueChange={(value) => setFormData({...formData, sector: value})}>
                <SelectTrigger>
                  <SelectValue placeholder={t('motivation.select_sector')} />
                </SelectTrigger>
                <SelectContent>
                  {sectors.map(sector => (
                    <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="experience">{t('motivation.experience')}</Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                placeholder={t('motivation.experience_placeholder')}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="skills">{t('motivation.skills')}</Label>
            <Textarea
              id="skills"
              value={formData.skills}
              onChange={(e) => setFormData({...formData, skills: e.target.value})}
              placeholder={t('motivation.skills_placeholder')}
            />
          </div>

          <div>
            <Label htmlFor="motivation">{t('motivation.motivation_reason')}</Label>
            <Textarea
              id="motivation"
              value={formData.motivation}
              onChange={(e) => setFormData({...formData, motivation: e.target.value})}
              placeholder={t('motivation.motivation_placeholder')}
            />
          </div>

          <Button 
            onClick={generateLetter} 
            className="w-full"
            disabled={!formData.company || !formData.position}
          >
            <Wand2 className="mr-2 h-4 w-4" />
            {t('motivation.generate_letter')}
          </Button>
        </CardContent>
      </Card>

      {generatedLetter && (
        <Card>
          <CardHeader>
            <CardTitle>{t('motivation.your_letter')}</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {copied ? t('common.copied') : t('common.copy')}
              </Button>
              <Button variant="outline" size="sm" onClick={downloadLetter}>
                <Download className="mr-2 h-4 w-4" />
                {t('common.download')}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap font-serif text-sm">{generatedLetter}</pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MotivationLetterTool;
