import { FileText, Calculator, Home, Heart, GraduationCap, Briefcase, Globe, Users, TrendingUp, Mail, Baby, Shield, CheckSquare, Truck, TrendingDown } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

export interface HomePageTool {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ComponentType<any>;
  gradient: string;
  difficulty: string;
  accessibility: string;
}

export function useHomePageData(): HomePageTool[] {
  const { t } = useI18n();

  return [
    // DÉMARCHES ADMINISTRATIVES
    {
      id: 'letter-generator',
      title: 'Générateur de Lettres Administratives',
      description: 'Créez des lettres officielles conformes aux standards français',
      category: 'Démarches Administratives',
      icon: FileText,
      gradient: 'from-blue-500 to-blue-600',
      difficulty: 'Facile',
      accessibility: 'excellent'
    },
    {
      id: 'fee-calculator',
      title: 'Calculateur de Frais de Dossier',
      description: 'Estimez les coûts de vos démarches administratives',
      category: 'Démarches Administratives',
      icon: Calculator,
      gradient: 'from-green-500 to-green-600',
      difficulty: 'Facile',
      accessibility: 'good'
    },
    {
      id: 'receipt-generator',
      title: 'Générateur de Récépissés',
      description: 'Suivez vos dépôts de dossiers et démarches',
      category: 'Démarches Administratives',
      icon: FileText,
      gradient: 'from-purple-500 to-purple-600',
      difficulty: 'Facile',
      accessibility: 'good'
    },
    {
      id: 'delay-simulator',
      title: 'Simulateur de Délais',
      description: 'Estimez les temps de traitement des dossiers',
      category: 'Démarches Administratives',
      icon: Calculator,
      gradient: 'from-orange-500 to-orange-600',
      difficulty: 'Facile',
      accessibility: 'excellent'
    },

    // LOGEMENT & VIE QUOTIDIENNE - Tous les outils intégrés
    {
      id: 'budget-calculator',
      title: 'Calculateur Budget Logement',
      description: 'Estimez le coût total de votre logement',
      category: 'Logement & Vie Quotidienne',
      icon: Home,
      gradient: 'from-teal-500 to-teal-600',
      difficulty: 'Facile',
      accessibility: 'excellent'
    },
    {
      id: 'childcare_assistant',
      title: 'Assistant Garde d\'Enfants',
      description: 'Trouvez le mode de garde optimal selon votre budget et besoins',
      category: 'Logement & Vie Quotidienne',
      icon: Baby,
      gradient: 'from-pink-500 to-pink-600',
      difficulty: 'Moyen',
      accessibility: 'excellent'
    },
    {
      id: 'state-of-play',
      title: 'Assistant État des Lieux',
      description: 'Réalisez un état des lieux précis avec photos géolocalisées',
      category: 'Logement & Vie Quotidienne',
      icon: CheckSquare,
      gradient: 'from-purple-500 to-purple-600',
      difficulty: 'Moyen',
      accessibility: 'good'
    },
    {
      id: 'rent-negotiator',
      title: 'Guide Négociation Loyer',
      description: 'Arguments juridiques et outils pour négocier votre loyer',
      category: 'Logement & Vie Quotidienne',
      icon: TrendingDown,
      gradient: 'from-orange-500 to-orange-600',
      difficulty: 'Moyen',
      accessibility: 'good'
    },
    {
      id: 'insurance-assistant',
      title: 'Assistant Assurance Habitation',
      description: 'Comparaison complète, gestion sinistres et résiliation simplifiée',
      category: 'Logement & Vie Quotidienne',
      icon: Shield,
      gradient: 'from-teal-500 to-teal-600',
      difficulty: 'Moyen',
      accessibility: 'excellent'
    },
    {
      id: 'moving-planner',
      title: 'Planificateur Emménagement',
      description: 'Organisez votre emménagement étape par étape sans stress',
      category: 'Logement & Vie Quotidienne',
      icon: Truck,
      gradient: 'from-yellow-500 to-yellow-600',
      difficulty: 'Facile',
      accessibility: 'good'
    },

    // EMPLOI & FORMATION - Tous les 8 outils
    {
      id: 'cv_translator',
      title: 'Traducteur de CV Français',
      description: 'Adaptez votre CV aux standards français avec IA',
      category: 'Emploi & Formation',
      icon: Briefcase,
      gradient: 'from-indigo-500 to-indigo-600',
      difficulty: 'Moyen',
      accessibility: 'good'
    },
    {
      id: 'salaryCalculator',
      title: 'Calculateur Salaire Net',
      description: 'Convertissez brut en net, charges sociales et prélèvements',
      category: 'Emploi & Formation',
      icon: Calculator,
      gradient: 'from-teal-500 to-teal-600',
      difficulty: 'Facile',
      accessibility: 'excellent'
    },
    {
      id: 'unemploymentSimulator',
      title: 'Simulateur Droits Pôle Emploi',
      description: 'Calculez vos droits aux allocations chômage',
      category: 'Emploi & Formation',
      icon: TrendingUp,
      gradient: 'from-orange-500 to-orange-600',
      difficulty: 'Moyen',
      accessibility: 'good'
    },
    {
      id: 'motivation_letter',
      title: 'Générateur Lettres de Motivation',
      description: 'Créez des lettres de motivation percutantes',
      category: 'Emploi & Formation',
      icon: Mail,
      gradient: 'from-green-500 to-green-600',
      difficulty: 'Moyen',
      accessibility: 'good'
    },
    {
      id: 'interview_assistant',
      title: 'Assistant Entretien d\'Embauche',
      description: 'Préparez vos entretiens avec simulation et conseils',
      category: 'Emploi & Formation',
      icon: Users,
      gradient: 'from-indigo-500 to-indigo-600',
      difficulty: 'Moyen',
      accessibility: 'good'
    },
    {
      id: 'diploma_equivalence',
      title: 'Équivalence Diplômes Étrangers',
      description: 'Trouvez les équivalences officielles de vos diplômes',
      category: 'Emploi & Formation',
      icon: GraduationCap,
      gradient: 'from-purple-500 to-purple-600',
      difficulty: 'Moyen',
      accessibility: 'good'
    },

    // SANTÉ & SOCIAL
    {
      id: 'social-security-guide',
      title: 'Guide Sécurité Sociale',
      description: 'Comprenez le système de santé français',
      category: 'Santé & Social',
      icon: Heart,
      gradient: 'from-red-500 to-red-600',
      difficulty: 'Moyen',
      accessibility: 'excellent'
    },
    {
      id: 'social-services-locator',
      title: 'Localisateur Services Sociaux',
      description: 'Trouvez l\'aide sociale près de chez vous',
      category: 'Santé & Social',
      icon: Users,
      gradient: 'from-pink-500 to-pink-600',
      difficulty: 'Facile',
      accessibility: 'good'
    },
    {
      id: 'medical-translator',
      title: 'Traducteur Médical',
      description: 'Facilitez la communication avec les professionnels de santé',
      category: 'Santé & Social',
      icon: Globe,
      gradient: 'from-blue-500 to-green-500',
      difficulty: 'Moyen',
      accessibility: 'excellent'
    },

    // ÉDUCATION & FAMILLE
    {
      id: 'family-allowances-calculator',
      title: 'Calculateur Allocations Familiales',
      description: 'Estimez vos aides familiales',
      category: 'Éducation & Famille',
      icon: GraduationCap,
      gradient: 'from-yellow-500 to-yellow-600',
      difficulty: 'Facile',
      accessibility: 'excellent'
    },
    {
      id: 'education-costs-calculator',
      title: 'Calculateur Frais Scolarité',
      description: 'Budgétez les coûts de scolarité',
      category: 'Éducation & Famille',
      icon: Calculator,
      gradient: 'from-cyan-500 to-cyan-600',
      difficulty: 'Facile',
      accessibility: 'good'
    },

    // INTÉGRATION CULTURELLE
    {
      id: 'culture-quiz',
      title: 'Quiz Culture Française',
      description: 'Apprenez la culture française de manière ludique',
      category: 'Intégration Culturelle',
      icon: Globe,
      gradient: 'from-violet-500 to-violet-600',
      difficulty: 'Moyen',
      accessibility: 'excellent'
    },
    {
      id: 'traditions-guide',
      title: 'Guide Fêtes et Traditions',
      description: 'Comprenez le calendrier culturel français',
      category: 'Intégration Culturelle',
      icon: Heart,
      gradient: 'from-rose-500 to-rose-600',
      difficulty: 'Facile',
      accessibility: 'good'
    },
    {
      id: 'french-learning-assistant',
      title: 'Assistant Apprentissage Français',
      description: 'Améliorez votre français au quotidien',
      category: 'Intégration Culturelle',
      icon: GraduationCap,
      gradient: 'from-emerald-500 to-emerald-600',
      difficulty: 'Moyen',
      accessibility: 'excellent'
    },
    {
      id: 'naturalization-simulator',
      title: 'Simulateur Test Naturalisation',
      description: 'Préparez l\'entretien de naturalisation',
      category: 'Intégration Culturelle',
      icon: FileText,
      gradient: 'from-amber-500 to-amber-600',
      difficulty: 'Avancé',
      accessibility: 'good'
    },
    {
      id: 'french-expressions-translator',
      title: 'Traducteur Expressions Françaises',
      description: 'Maîtrisez les expressions idiomatiques',
      category: 'Intégration Culturelle',
      icon: Globe,
      gradient: 'from-lime-500 to-lime-600',
      difficulty: 'Moyen',
      accessibility: 'excellent'
    },

    // OUTILS TRANSVERSAUX
    {
      id: 'emergency-assistant',
      title: 'Assistant Urgences',
      description: 'Réagissez efficacement en cas d\'urgence',
      category: 'Outils Transversaux',
      icon: Heart,
      gradient: 'from-red-600 to-red-700',
      difficulty: 'Facile',
      accessibility: 'excellent'
    },
    {
      id: 'planning-generator',
      title: 'Générateur Planning',
      description: 'Organisez toutes vos démarches',
      category: 'Outils Transversaux',
      icon: Calculator,
      gradient: 'from-blue-600 to-blue-700',
      difficulty: 'Facile',
      accessibility: 'good'
    },
    {
      id: 'family-budget-assistant',
      title: 'Assistant Budget Familial',
      description: 'Gérez vos finances en France',
      category: 'Outils Transversaux',
      icon: Calculator,
      gradient: 'from-green-600 to-green-700',
      difficulty: 'Moyen',
      accessibility: 'excellent'
    },
    {
      id: 'rights-guide',
      title: 'Guide Droits et Recours',
      description: 'Connaissez vos droits et recours',
      category: 'Outils Transversaux',
      icon: FileText,
      gradient: 'from-purple-600 to-purple-700',
      difficulty: 'Avancé',
      accessibility: 'good'
    }
  ];
}
