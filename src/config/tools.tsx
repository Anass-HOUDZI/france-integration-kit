
/**
 * Configuration centralisée des outils et catégories
 */
import React from 'react';
import { 
  FileText, 
  Calculator, 
  Receipt, 
  Clock, 
  Home, 
  Briefcase, 
  Heart, 
  GraduationCap, 
  Globe, 
  Settings,
  Mail,
  Phone,
  Calendar,
  CheckSquare,
  Languages,
  FileCheck,
  Shield,
  CreditCard,
  Building,
  MapPin,
  ClipboardList,
  Truck,
  Handshake,
  PlaneTakeoff,
  Users,
  BarChart3,
  BookOpen,
  Baby,
  School,
  Award,
  Star,
  Map,
  Stethoscope,
  Pill,
  Ambulance,
  HelpCircle,
  Search,
  Zap,
  DollarSign,
  Wrench
} from 'lucide-react';
import { ToolCategory } from '@/types/tools';

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: 'admin',
    name: 'category.admin',
    description: 'category.admin_desc',
    icon: <FileText className="h-6 w-6" />,
    color: 'bg-blue-500',
    tools: [
      {
        id: 'letter-generator',
        name: 'tool.letter-generator',
        description: 'tool.letter-generator_desc',
        icon: <Mail className="h-5 w-5" />,
        categoryId: 'admin',
        difficulty: 'easy',
        popular: true
      },
      {
        id: 'fee-calculator',
        name: 'tool.fee-calculator',
        description: 'tool.fee-calculator_desc',
        icon: <Calculator className="h-5 w-5" />,
        categoryId: 'admin',
        difficulty: 'easy',
        popular: true
      },
      {
        id: 'receipt-generator',
        name: 'tool.receipt-generator',
        description: 'tool.receipt-generator_desc',
        icon: <Receipt className="h-5 w-5" />,
        categoryId: 'admin',
        difficulty: 'easy'
      },
      {
        id: 'delay-simulator',
        name: 'tool.delay-simulator',
        description: 'tool.delay-simulator_desc',
        icon: <Clock className="h-5 w-5" />,
        categoryId: 'admin',
        difficulty: 'medium'
      },
      {
        id: 'form-assistant',
        name: 'tool.form-assistant',
        description: 'tool.form-assistant_desc',
        icon: <FileCheck className="h-5 w-5" />,
        categoryId: 'admin',
        difficulty: 'medium'
      },
      {
        id: 'appointment-planner',
        name: 'tool.appointment-planner',
        description: 'tool.appointment-planner_desc',
        icon: <Calendar className="h-5 w-5" />,
        categoryId: 'admin',
        difficulty: 'easy'
      },
      {
        id: 'document-checker',
        name: 'tool.document-checker',
        description: 'tool.document-checker_desc',
        icon: <CheckSquare className="h-5 w-5" />,
        categoryId: 'admin',
        difficulty: 'easy'
      },
      {
        id: 'admin-terms-translator',
        name: 'tool.admin-terms-translator',
        description: 'tool.admin-terms-translator_desc',
        icon: <Languages className="h-5 w-5" />,
        categoryId: 'admin',
        difficulty: 'easy'
      },
      {
        id: 'attestation-generator',
        name: 'tool.attestation-generator',
        description: 'tool.attestation-generator_desc',
        icon: <Shield className="h-5 w-5" />,
        categoryId: 'admin',
        difficulty: 'easy'
      },
      {
        id: 'caf-apl-calculator',
        name: 'tool.caf-apl-calculator',
        description: 'tool.caf-apl-calculator_desc',
        icon: <CreditCard className="h-5 w-5" />,
        categoryId: 'admin',
        difficulty: 'medium'
      },
      {
        id: 'tax-declaration-assistant',
        name: 'tool.tax-declaration-assistant',
        description: 'tool.tax-declaration-assistant_desc',
        icon: <DollarSign className="h-5 w-5" />,
        categoryId: 'admin',
        difficulty: 'advanced'
      },
      {
        id: 'procedure-guide-by-profile',
        name: 'tool.procedure-guide-by-profile',
        description: 'tool.procedure-guide-by-profile_desc',
        icon: <MapPin className="h-5 w-5" />,
        categoryId: 'admin',
        difficulty: 'medium'
      }
    ]
  },
  {
    id: 'logement',
    name: 'category.logement',
    description: 'category.logement_desc',
    icon: <Home className="h-6 w-6" />,
    color: 'bg-green-500',
    tools: [
      {
        id: 'budget-calculator',
        name: 'tool.budget-calculator',
        description: 'tool.budget-calculator_desc',
        icon: <Calculator className="h-5 w-5" />,
        categoryId: 'logement',
        difficulty: 'easy',
        popular: true
      },
      {
        id: 'rental-file-generator',
        name: 'tool.rental-file-generator',
        description: 'tool.rental-file-generator_desc',
        icon: <FileText className="h-5 w-5" />,
        categoryId: 'logement',
        difficulty: 'medium'
      },
      {
        id: 'neighborhood-comparator',
        name: 'tool.neighborhood-comparator',
        description: 'tool.neighborhood-comparator_desc',
        icon: <Map className="h-5 w-5" />,
        categoryId: 'logement',
        difficulty: 'medium',
        popular: true
      },
      {
        id: 'inventory-assistant',
        name: 'tool.inventory-assistant',
        description: 'tool.inventory-assistant_desc',
        icon: <ClipboardList className="h-5 w-5" />,
        categoryId: 'logement',
        difficulty: 'easy'
      },
      {
        id: 'moving-cost-calculator',
        name: 'tool.moving-cost-calculator',
        description: 'tool.moving-cost-calculator_desc',
        icon: <Truck className="h-5 w-5" />,
        categoryId: 'logement',
        difficulty: 'easy'
      },
      {
        id: 'rent-negotiator',
        name: 'tool.rent-negotiator',
        description: 'tool.rent-negotiator_desc',
        icon: <Handshake className="h-5 w-5" />,
        categoryId: 'logement',
        difficulty: 'advanced'
      },
      {
        id: 'moving-planner',
        name: 'tool.moving-planner',
        description: 'tool.moving-planner_desc',
        icon: <PlaneTakeoff className="h-5 w-5" />,
        categoryId: 'logement',
        difficulty: 'medium'
      },
      {
        id: 'home-insurance-assistant',
        name: 'tool.home-insurance-assistant',
        description: 'tool.home-insurance-assistant_desc',
        icon: <Shield className="h-5 w-5" />,
        categoryId: 'logement',
        difficulty: 'medium'
      }
    ]
  },
  {
    id: 'emploi',
    name: 'category.emploi',
    description: 'category.emploi_desc',
    icon: <Briefcase className="h-6 w-6" />,
    color: 'bg-purple-500',
    tools: [
      {
        id: 'cv-translator',
        name: 'tool.cv-translator',
        description: 'tool.cv-translator_desc',
        icon: <FileText className="h-5 w-5" />,
        categoryId: 'emploi',
        difficulty: 'medium',
        popular: true
      },
      {
        id: 'motivation-letter',
        name: 'tool.motivation-letter',
        description: 'tool.motivation-letter_desc',
        icon: <Mail className="h-5 w-5" />,
        categoryId: 'emploi',
        difficulty: 'medium',
        popular: true
      },
      {
        id: 'salary-calculator',
        name: 'tool.salary-calculator',
        description: 'tool.salary-calculator_desc',
        icon: <Calculator className="h-5 w-5" />,
        categoryId: 'emploi',
        difficulty: 'easy',
        popular: true
      },
      {
        id: 'interview-assistant',
        name: 'tool.interview-assistant',
        description: 'tool.interview-assistant_desc',
        icon: <Users className="h-5 w-5" />,
        categoryId: 'emploi',
        difficulty: 'medium'
      },
      {
        id: 'diploma-equivalence',
        name: 'tool.diploma-equivalence',
        description: 'tool.diploma-equivalence_desc',
        icon: <Award className="h-5 w-5" />,
        categoryId: 'emploi',
        difficulty: 'medium'
      },
      {
        id: 'job-rights-simulator',
        name: 'tool.job-rights-simulator',
        description: 'tool.job-rights-simulator_desc',
        icon: <Calculator className="h-5 w-5" />,
        categoryId: 'emploi',
        difficulty: 'medium'
      },
      {
        id: 'professional-training-guide',
        name: 'tool.professional-training-guide',
        description: 'tool.professional-training-guide_desc',
        icon: <BookOpen className="h-5 w-5" />,
        categoryId: 'emploi',
        difficulty: 'advanced'
      },
      {
        id: 'professional-portfolio',
        name: 'tool.professional-portfolio',
        description: 'tool.professional-portfolio_desc',
        icon: <BarChart3 className="h-5 w-5" />,
        categoryId: 'emploi',
        difficulty: 'advanced'
      }
    ]
  },
  {
    id: 'sante',
    name: 'category.sante',
    description: 'category.sante_desc',
    icon: <Heart className="h-6 w-6" />,
    color: 'bg-red-500',
    tools: [
      {
        id: 'social-security-guide',
        name: 'tool.social-security-guide',
        description: 'tool.social-security-guide_desc',
        icon: <Shield className="h-5 w-5" />,
        categoryId: 'sante',
        difficulty: 'medium',
        popular: true
      },
      {
        id: 'social-services-locator',
        name: 'tool.social-services-locator',
        description: 'tool.social-services-locator_desc',
        icon: <MapPin className="h-5 w-5" />,
        categoryId: 'sante',
        difficulty: 'easy'
      },
      {
        id: 'medical-translator',
        name: 'tool.medical-translator',
        description: 'tool.medical-translator_desc',
        icon: <Languages className="h-5 w-5" />,
        categoryId: 'sante',
        difficulty: 'easy',
        popular: true
      },
      {
        id: 'health-reimbursement-calculator',
        name: 'tool.health-reimbursement-calculator',
        description: 'tool.health-reimbursement-calculator_desc',
        icon: <Calculator className="h-5 w-5" />,
        categoryId: 'sante',
        difficulty: 'medium'
      },
      {
        id: 'mutual-insurance-assistant',
        name: 'tool.mutual-insurance-assistant',
        description: 'tool.mutual-insurance-assistant_desc',
        icon: <Shield className="h-5 w-5" />,
        categoryId: 'sante',
        difficulty: 'medium'
      },
      {
        id: 'medical-emergency-guide',
        name: 'tool.medical-emergency-guide',
        description: 'tool.medical-emergency-guide_desc',
        icon: <Ambulance className="h-5 w-5" />,
        categoryId: 'sante',
        difficulty: 'easy'
      }
    ]
  },
  {
    id: 'education',
    name: 'category.education',
    description: 'category.education_desc',
    icon: <GraduationCap className="h-6 w-6" />,
    color: 'bg-orange-500',
    tools: [
      {
        id: 'family-allowances-calculator',
        name: 'tool.family-allowances-calculator',
        description: 'tool.family-allowances-calculator_desc',
        icon: <CreditCard className="h-5 w-5" />,
        categoryId: 'education',
        difficulty: 'easy',
        popular: true
      },
      {
        id: 'education-costs-calculator',
        name: 'tool.education-costs-calculator',
        description: 'tool.education-costs-calculator_desc',
        icon: <Calculator className="h-5 w-5" />,
        categoryId: 'education',
        difficulty: 'medium'
      },
      {
        id: 'school-enrollment-guide',
        name: 'tool.school-enrollment-guide',
        description: 'tool.school-enrollment-guide_desc',
        icon: <School className="h-5 w-5" />,
        categoryId: 'education',
        difficulty: 'medium'
      },
      {
        id: 'childcare-assistant',
        name: 'tool.childcare-assistant',
        description: 'tool.childcare-assistant_desc',
        icon: <Baby className="h-5 w-5" />,
        categoryId: 'education',
        difficulty: 'medium'
      },
      {
        id: 'higher-education-guide',
        name: 'tool.higher-education-guide',
        description: 'tool.higher-education-guide_desc',
        icon: <GraduationCap className="h-5 w-5" />,
        categoryId: 'education',
        difficulty: 'advanced'
      },
      {
        id: 'school-report-translator',
        name: 'tool.school-report-translator',
        description: 'tool.school-report-translator_desc',
        icon: <Languages className="h-5 w-5" />,
        categoryId: 'education',
        difficulty: 'medium'
      }
    ]
  },
  {
    id: 'culture',
    name: 'category.culture',
    description: 'category.culture_desc',
    icon: <Globe className="h-6 w-6" />,
    color: 'bg-indigo-500',
    tools: [
      {
        id: 'culture-quiz',
        name: 'tool.culture-quiz',
        description: 'tool.culture-quiz_desc',
        icon: <HelpCircle className="h-5 w-5" />,
        categoryId: 'culture',
        difficulty: 'easy',
        popular: true
      },
      {
        id: 'traditions-guide',
        name: 'tool.traditions-guide',
        description: 'tool.traditions-guide_desc',
        icon: <Star className="h-5 w-5" />,
        categoryId: 'culture',
        difficulty: 'easy'
      },
      {
        id: 'french-learning-assistant',
        name: 'tool.french-learning-assistant',
        description: 'tool.french-learning-assistant_desc',
        icon: <BookOpen className="h-5 w-5" />,
        categoryId: 'culture',
        difficulty: 'medium',
        popular: true
      },
      {
        id: 'naturalization-simulator',
        name: 'tool.naturalization-simulator',
        description: 'tool.naturalization-simulator_desc',
        icon: <Award className="h-5 w-5" />,
        categoryId: 'culture',
        difficulty: 'advanced',
        popular: true
      },
      {
        id: 'french-expressions-translator',
        name: 'tool.french-expressions-translator',
        description: 'tool.french-expressions-translator_desc',
        icon: <Languages className="h-5 w-5" />,
        categoryId: 'culture',
        difficulty: 'medium'
      }
    ]
  },
  {
    id: 'transversal',
    name: 'category.transversal',
    description: 'category.transversal_desc',
    icon: <Settings className="h-6 w-6" />,
    color: 'bg-gray-500',
    tools: [
      {
        id: 'emergency-assistant',
        name: 'tool.emergency-assistant',
        description: 'tool.emergency-assistant_desc',
        icon: <Phone className="h-5 w-5" />,
        categoryId: 'transversal',
        difficulty: 'easy',
        popular: true
      },
      {
        id: 'planning-generator',
        name: 'tool.planning-generator',
        description: 'tool.planning-generator_desc',
        icon: <Calendar className="h-5 w-5" />,
        categoryId: 'transversal',
        difficulty: 'easy',
        popular: true
      },
      {
        id: 'family-budget-assistant',
        name: 'tool.family-budget-assistant',
        description: 'tool.family-budget-assistant_desc',
        icon: <DollarSign className="h-5 w-5" />,
        categoryId: 'transversal',
        difficulty: 'medium'
      },
      {
        id: 'rights-guide',
        name: 'tool.rights-guide',
        description: 'tool.rights-guide_desc',
        icon: <Shield className="h-5 w-5" />,
        categoryId: 'transversal',
        difficulty: 'advanced'
      },
      {
        id: 'universal-converter',
        name: 'tool.universal-converter',
        description: 'tool.universal-converter_desc',
        icon: <Wrench className="h-5 w-5" />,
        categoryId: 'transversal',
        difficulty: 'easy'
      }
    ]
  }
];

export const getAllTools = () => {
  return TOOL_CATEGORIES.flatMap(category => category.tools);
};

export const getToolById = (id: string) => {
  return getAllTools().find(tool => tool.id === id);
};

export const getToolsByCategory = (categoryId: string) => {
  const category = TOOL_CATEGORIES.find(cat => cat.id === categoryId);
  return category?.tools || [];
};

export const getCategoryById = (id: string) => {
  return TOOL_CATEGORIES.find(category => category.id === id);
};

export const getPopularTools = () => {
  return getAllTools().filter(tool => tool.popular);
};
