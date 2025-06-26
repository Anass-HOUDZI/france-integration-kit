
import { FileText, Calculator, Home, Heart, GraduationCap, Briefcase, Globe, Users } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

export function useHomePageData() {
  const { t } = useI18n();

  return [
    // DÉMARCHES ADMINISTRATIVES
    {
      id: 'letter-generator',
      title: t('tool.letter_generator'),
      description: t('tool.letter_generator_desc'),
      category: t('category.admin'),
      icon: FileText,
      gradient: 'from-blue-500 to-blue-600',
      difficulty: t('common.easy'),
      accessibility: 'excellent'
    },
    {
      id: 'fee-calculator',
      title: t('tool.fee_calculator'),
      description: t('tool.fee_calculator_desc'),
      category: t('category.admin'),
      icon: Calculator,
      gradient: 'from-green-500 to-green-600',
      difficulty: t('common.easy'),
      accessibility: 'good'
    },
    {
      id: 'receipt-generator',
      title: t('tool.receipt_generator'),
      description: t('tool.receipt_generator_desc'),
      category: t('category.admin'),
      icon: FileText,
      gradient: 'from-purple-500 to-purple-600',
      difficulty: t('common.easy'),
      accessibility: 'good'
    },
    {
      id: 'delay-simulator',
      title: t('tool.delay_simulator'),
      description: t('tool.delay_simulator_desc'),
      category: t('category.admin'),
      icon: Calculator,
      gradient: 'from-orange-500 to-orange-600',
      difficulty: t('common.easy'),
      accessibility: 'excellent'
    },
    // LOGEMENT & VIE QUOTIDIENNE
    {
      id: 'budget-calculator',
      title: t('tool.budget_calculator'),
      description: t('tool.budget_calculator_desc'),
      category: t('category.logement'),
      icon: Home,
      gradient: 'from-teal-500 to-teal-600',
      difficulty: t('common.easy'),
      accessibility: 'excellent'
    },
    // EMPLOI & FORMATION
    {
      id: 'cv-translator',
      title: t('tool.cv_translator'),
      description: t('tool.cv_translator_desc'),
      category: t('category.emploi'),
      icon: Briefcase,
      gradient: 'from-indigo-500 to-indigo-600',
      difficulty: t('common.medium'),
      accessibility: 'good'
    },
    {
      id: 'salaryCalculator',
      title: 'Calculateur Salaire Net',
      description: 'Convertissez brut en net, charges sociales et prélèvements',
      category: t('category.emploi'),
      icon: Calculator,
      gradient: 'from-teal-500 to-teal-600',
      difficulty: t('common.easy'),
      accessibility: 'excellent'
    },
    {
      id: 'unemploymentSimulator',
      title: 'Simulateur Droits Pôle Emploi',
      description: 'Calculez vos droits aux allocations chômage',
      category: t('category.emploi'),
      icon: Calculator,
      gradient: 'from-orange-500 to-orange-600',
      difficulty: t('common.medium'),
      accessibility: 'good'
    },
    // SANTÉ & SOCIAL
    {
      id: 'social-security-guide',
      title: t('tool.social_security_guide'),
      description: t('tool.social_security_guide_desc'),
      category: t('category.sante'),
      icon: Heart,
      gradient: 'from-red-500 to-red-600',
      difficulty: t('common.medium'),
      accessibility: 'excellent'
    },
    {
      id: 'social-services-locator',
      title: t('tool.social_services_locator'),
      description: t('tool.social_services_locator_desc'),
      category: t('category.sante'),
      icon: Users,
      gradient: 'from-pink-500 to-pink-600',
      difficulty: t('common.easy'),
      accessibility: 'good'
    },
    {
      id: 'medical-translator',
      title: 'Traducteur Médical',
      description: 'Facilitez la communication avec les professionnels de santé',
      category: t('category.sante'),
      icon: Globe,
      gradient: 'from-blue-500 to-green-500',
      difficulty: t('common.medium'),
      accessibility: 'excellent'
    },
    // ÉDUCATION & FAMILLE
    {
      id: 'family-allowances-calculator',
      title: t('tool.family_allowances_calculator'),
      description: t('tool.family_allowances_calculator_desc'),
      category: t('category.education'),
      icon: GraduationCap,
      gradient: 'from-yellow-500 to-yellow-600',
      difficulty: t('common.easy'),
      accessibility: 'excellent'
    },
    {
      id: 'education-costs-calculator',
      title: t('tool.education_costs_calculator'),
      description: t('tool.education_costs_calculator_desc'),
      category: t('category.education'),
      icon: Calculator,
      gradient: 'from-cyan-500 to-cyan-600',
      difficulty: t('common.easy'),
      accessibility: 'good'
    },
    // INTÉGRATION CULTURELLE
    {
      id: 'culture-quiz',
      title: t('tool.culture_quiz'),
      description: t('tool.culture_quiz_desc'),
      category: t('category.culture'),
      icon: Globe,
      gradient: 'from-violet-500 to-violet-600',
      difficulty: t('common.medium'),
      accessibility: 'excellent'
    },
    {
      id: 'traditions-guide',
      title: t('tool.traditions_guide'),
      description: t('tool.traditions_guide_desc'),
      category: t('category.culture'),
      icon: Heart,
      gradient: 'from-rose-500 to-rose-600',
      difficulty: t('common.easy'),
      accessibility: 'good'
    },
    {
      id: 'french-learning-assistant',
      title: t('tool.french_learning_assistant'),
      description: t('tool.french_learning_assistant_desc'),
      category: t('category.culture'),
      icon: GraduationCap,
      gradient: 'from-emerald-500 to-emerald-600',
      difficulty: t('common.medium'),
      accessibility: 'excellent'
    },
    {
      id: 'naturalization-simulator',
      title: t('tool.naturalization_simulator'),
      description: t('tool.naturalization_simulator_desc'),
      category: t('category.culture'),
      icon: FileText,
      gradient: 'from-amber-500 to-amber-600',
      difficulty: t('common.advanced'),
      accessibility: 'good'
    },
    {
      id: 'french-expressions-translator',
      title: t('tool.french_expressions_translator'),
      description: t('tool.french_expressions_translator_desc'),
      category: t('category.culture'),
      icon: Globe,
      gradient: 'from-lime-500 to-lime-600',
      difficulty: t('common.medium'),
      accessibility: 'excellent'
    },
    // OUTILS TRANSVERSAUX
    {
      id: 'emergency-assistant',
      title: t('tool.emergency_assistant'),
      description: t('tool.emergency_assistant_desc'),
      category: t('category.transversal'),
      icon: Heart,
      gradient: 'from-red-600 to-red-700',
      difficulty: t('common.easy'),
      accessibility: 'excellent'
    },
    {
      id: 'planning-generator',
      title: t('tool.planning_generator'),
      description: t('tool.planning_generator_desc'),
      category: t('category.transversal'),
      icon: Calculator,
      gradient: 'from-blue-600 to-blue-700',
      difficulty: t('common.easy'),
      accessibility: 'good'
    },
    {
      id: 'family-budget-assistant',
      title: t('tool.family_budget_assistant'),
      description: t('tool.family_budget_assistant_desc'),
      category: t('category.transversal'),
      icon: Calculator,
      gradient: 'from-green-600 to-green-700',
      difficulty: t('common.medium'),
      accessibility: 'excellent'
    },
    {
      id: 'rights-guide',
      title: t('tool.rights_guide'),
      description: t('tool.rights_guide_desc'),
      category: t('category.transversal'),
      icon: FileText,
      gradient: 'from-purple-600 to-purple-700',
      difficulty: t('common.advanced'),
      accessibility: 'good'
    }
  ];
}
