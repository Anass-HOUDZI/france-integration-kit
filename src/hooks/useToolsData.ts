
import { FileText, Calculator, TrendingUp, Mail, GraduationCap, Users, LayoutGrid, Clock } from 'lucide-react';
import CVTranslatorTool from '@/components/tools/CVTranslatorTool';
import SalaryCalculatorTool from '@/components/tools/SalaryCalculatorTool';
import MotivationLetterTool from '@/components/tools/MotivationLetterTool';
import InterviewAssistantTool from '@/components/tools/InterviewAssistantTool';
import DiplomaEquivalenceTool from '@/components/tools/DiplomaEquivalenceTool';
import UnemploymentSimulatorTool from '@/components/tools/UnemploymentSimulatorTool';

export const useEmploymentTools = () => {
  return [
    {
      id: 'cv_translator',
      title: 'Traducteur de CV Français',
      description: 'Adaptez votre CV aux standards français avec IA',
      icon: FileText,
      color: 'bg-blue-500',
      category: 'CV',
      status: 'active' as const,
      component: CVTranslatorTool
    },
    {
      id: 'salaryCalculator',
      title: 'Calculateur Salaire Net',
      description: 'Convertissez brut en net, charges sociales et prélèvements détaillés',
      icon: Calculator,
      color: 'bg-teal-500',
      category: 'Salaire',
      status: 'active' as const,
      component: SalaryCalculatorTool
    },
    {
      id: 'unemploymentSimulator',
      title: 'Simulateur Droits Pôle Emploi',
      description: 'Calculez vos droits aux allocations chômage et conditions',
      icon: TrendingUp,
      color: 'bg-orange-500',
      category: 'Droits',
      status: 'active' as const,
      component: UnemploymentSimulatorTool
    },
    {
      id: 'motivation_letter',
      title: 'Générateur Lettres de Motivation',
      description: 'Créez des lettres de motivation percutantes par secteur',
      icon: Mail,
      color: 'bg-green-500',
      category: 'Candidature',
      status: 'active' as const,
      component: MotivationLetterTool
    },
    {
      id: 'diploma_equivalence',
      title: 'Équivalence Diplômes Étrangers',
      description: 'Trouvez les équivalences officielles de vos diplômes',
      icon: GraduationCap,
      color: 'bg-purple-500',
      category: 'Diplômes',
      status: 'active' as const,
      component: DiplomaEquivalenceTool
    },
    {
      id: 'interview_assistant',
      title: 'Assistant Entretien d\'Embauche',
      description: 'Préparez vos entretiens avec simulation et conseils',
      icon: Users,
      color: 'bg-indigo-500',
      category: 'Entretien',
      status: 'active' as const,
      component: InterviewAssistantTool
    },
    {
      id: 'training_guide',
      title: 'Guide Formation Professionnelle',
      description: 'CPF, formations éligibles et financement',
      icon: GraduationCap,
      color: 'bg-pink-500',
      category: 'Formation',
      status: 'coming_soon' as const
    },
    {
      id: 'portfolio_creator',
      title: 'Créateur Portfolio Professionnel',
      description: 'Mettez en valeur vos compétences et projets',
      icon: LayoutGrid,
      color: 'bg-cyan-500',
      category: 'Portfolio',
      status: 'coming_soon' as const
    }
  ];
};
