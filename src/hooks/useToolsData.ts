
import { FileText, Calculator, TrendingUp, Mail, GraduationCap, Users, LayoutGrid, BookOpen } from 'lucide-react';
import CVTranslatorTool from '@/components/tools/CVTranslatorTool';
import SalaryCalculatorTool from '@/components/tools/SalaryCalculatorTool';
import MotivationLetterTool from '@/components/tools/MotivationLetterTool';
import InterviewAssistantTool from '@/components/tools/InterviewAssistantTool';
import DiplomaEquivalenceTool from '@/components/tools/DiplomaEquivalenceTool';
import UnemploymentSimulatorTool from '@/components/tools/UnemploymentSimulatorTool';
import TrainingGuideTool from '@/components/tools/TrainingGuideTool';
import PortfolioCreatorTool from '@/components/tools/PortfolioCreatorTool';

export interface ToolData {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  category: string;
  status: 'active' | 'coming_soon';
  component?: React.ComponentType<any>;
}

// Hook pour les outils d'emploi - Tous les 8 outils actifs
export const useEmploymentTools = (): ToolData[] => {
  return [
    {
      id: 'cv_translator',
      title: 'Traducteur de CV Français',
      description: 'Adaptez votre CV aux standards français avec IA - Optimisation automatique',
      icon: FileText,
      color: 'bg-blue-500',
      category: 'CV & Candidature',
      status: 'active',
      component: CVTranslatorTool
    },
    {
      id: 'salaryCalculator',
      title: 'Calculateur Salaire Net',
      description: 'Convertissez brut en net, charges sociales et prélèvements détaillés en temps réel',
      icon: Calculator,
      color: 'bg-teal-500',
      category: 'Salaire & Finances',
      status: 'active',
      component: SalaryCalculatorTool
    },
    {
      id: 'unemploymentSimulator',
      title: 'Simulateur Droits Pôle Emploi',
      description: 'Calculez vos droits aux allocations chômage, conditions et durée d\'indemnisation',
      icon: TrendingUp,
      color: 'bg-orange-500',
      category: 'Droits & Allocations',
      status: 'active',
      component: UnemploymentSimulatorTool
    },
    {
      id: 'motivation_letter',
      title: 'Générateur Lettres de Motivation',
      description: 'Créez des lettres de motivation percutantes personnalisées par secteur d\'activité',
      icon: Mail,
      color: 'bg-green-500',
      category: 'CV & Candidature',
      status: 'active',
      component: MotivationLetterTool
    },
    {
      id: 'diploma_equivalence',
      title: 'Équivalence Diplômes Étrangers',
      description: 'Trouvez les équivalences officielles de vos diplômes étrangers en France',
      icon: GraduationCap,
      color: 'bg-purple-500',
      category: 'Diplômes & Formation',
      status: 'active',
      component: DiplomaEquivalenceTool
    },
    {
      id: 'interview_assistant',
      title: 'Assistant Entretien d\'Embauche',
      description: 'Préparez vos entretiens avec simulation IA, conseils personnalisés et questions types',
      icon: Users,
      color: 'bg-indigo-500',
      category: 'Entretien & Préparation',
      status: 'active',
      component: InterviewAssistantTool
    },
    {
      id: 'training_guide',
      title: 'Guide Formation Professionnelle',
      description: 'CPF, formations éligibles, financement et parcours de reconversion professionnelle',
      icon: BookOpen,
      color: 'bg-pink-500',
      category: 'Diplômes & Formation',
      status: 'active',
      component: TrainingGuideTool
    },
    {
      id: 'portfolio_creator',
      title: 'Créateur Portfolio Professionnel',
      description: 'Mettez en valeur vos compétences et projets avec des templates modernes',
      icon: LayoutGrid,
      color: 'bg-cyan-500',
      category: 'CV & Candidature',
      status: 'active',
      component: PortfolioCreatorTool
    }
  ];
};

// Hook pour tous les outils de l'application
export const useAllTools = () => {
  const employmentTools = useEmploymentTools();
  
  // Retourner tous les outils organisés par catégorie
  return {
    employment: employmentTools,
    // Ici nous pouvons ajouter d'autres catégories d'outils
  };
};
