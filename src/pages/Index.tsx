
import React, { lazy, Suspense } from 'react';
import HomePage from '@/components/HomePage';
import CategoryPage from '@/components/pages/CategoryPage';
import AppLayout from '@/components/layout/AppLayout';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useToolNavigation } from '@/hooks/useToolNavigation';

// Lazy load tool components for better performance
const LetterGenerator = lazy(() => import('@/components/tools/LetterGenerator'));
const FeeCalculator = lazy(() => import('@/components/tools/FeeCalculator'));
const BudgetCalculator = lazy(() => import('@/components/tools/BudgetCalculator'));
const CVTranslator = lazy(() => import('@/components/tools/CVTranslator'));
const ChildcareAssistantTool = lazy(() => import('@/components/tools/ChildcareAssistantTool'));
const StateOfPlayTool = lazy(() => import('@/components/tools/StateOfPlayTool'));
const RentNegotiator = lazy(() => import('@/components/tools/RentNegotiator'));
const InsuranceAssistantComplete = lazy(() => import('@/components/tools/InsuranceAssistantComplete'));
const MovingPlannerTool = lazy(() => import('@/components/tools/MovingPlannerTool'));
const SocialSecurityGuideTool = lazy(() => import('@/components/tools/SocialSecurityGuideTool'));
const SocialServicesLocatorTool = lazy(() => import('@/components/tools/SocialServicesLocatorTool'));
const FamilyAllowancesTool = lazy(() => import('@/components/tools/FamilyAllowancesTool'));
const EducationCostsTool = lazy(() => import('@/components/tools/EducationCostsTool'));
const CultureQuizTool = lazy(() => import('@/components/tools/CultureQuizTool'));
const TraditionsGuideTool = lazy(() => import('@/components/tools/TraditionsGuideTool'));
const FrenchLearningAssistantTool = lazy(() => import('@/components/tools/FrenchLearningAssistantTool'));
const NaturalizationTestSimulatorTool = lazy(() => import('@/components/tools/NaturalizationTestSimulatorTool'));
const ExpressionsTranslatorTool = lazy(() => import('@/components/tools/ExpressionsTranslatorTool'));
const EmergencyAssistantTool = lazy(() => import('@/components/tools/EmergencyAssistantTool'));
const PlanningGeneratorTool = lazy(() => import('@/components/tools/PlanningGeneratorTool'));
const BudgetAssistantTool = lazy(() => import('@/components/tools/BudgetAssistantTool'));
const RightsGuideTool = lazy(() => import('@/components/tools/RightsGuideTool'));
const ReceiptGeneratorTool = lazy(() => import('@/components/tools/ReceiptGeneratorTool'));
const DelaySimulatorTool = lazy(() => import('@/components/tools/DelaySimulatorTool'));
const MedicalTranslatorTool = lazy(() => import('@/components/tools/MedicalTranslatorTool'));
const TrainingGuideTool = lazy(() => import('@/components/tools/TrainingGuideTool'));
const PortfolioCreatorTool = lazy(() => import('@/components/tools/PortfolioCreatorTool'));
const CVTranslatorTool = lazy(() => import('@/components/tools/CVTranslatorTool'));
const SalaryCalculatorTool = lazy(() => import('@/components/tools/SalaryCalculatorTool'));
const MotivationLetterTool = lazy(() => import('@/components/tools/MotivationLetterTool'));
const InterviewAssistantTool = lazy(() => import('@/components/tools/InterviewAssistantTool'));
const DiplomaEquivalenceTool = lazy(() => import('@/components/tools/DiplomaEquivalenceTool'));
const UnemploymentSimulatorTool = lazy(() => import('@/components/tools/UnemploymentSimulatorTool'));
const FormAssistantTool = lazy(() => import('@/components/tools/FormAssistantTool'));
const DocumentCheckerTool = lazy(() => import('@/components/tools/DocumentCheckerTool'));

const Index = () => {
  const { currentView, navigateToTool, navigateHome } = useToolNavigation();

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <HomePage onSelectTool={navigateToTool} />;
      
      // Category pages - nouvelles pages pour chaque catégorie
      case 'admin':
        return <CategoryPage categoryId="admin" onSelectTool={navigateToTool} onBack={navigateHome} />;
      
      case 'logement':
        return <CategoryPage categoryId="logement" onSelectTool={navigateToTool} onBack={navigateHome} />;
      
      case 'emploi':
        return <CategoryPage categoryId="emploi" onSelectTool={navigateToTool} onBack={navigateHome} />;
      
      case 'sante':
        return <CategoryPage categoryId="sante" onSelectTool={navigateToTool} onBack={navigateHome} />;
      
      case 'education':
        return <CategoryPage categoryId="education" onSelectTool={navigateToTool} onBack={navigateHome} />;
      
      case 'culture':
        return <CategoryPage categoryId="culture" onSelectTool={navigateToTool} onBack={navigateHome} />;
      
      case 'transversal':
        return <CategoryPage categoryId="transversal" onSelectTool={navigateToTool} onBack={navigateHome} />;

      // Individual tool views
      case 'letter-generator':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <LetterGenerator userProfile={null} diagnostic={null} onBack={navigateHome} />
          </Suspense>
        );
      
      case 'fee-calculator':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <FeeCalculator userProfile={null} diagnostic={null} />
          </Suspense>
        );
      
      case 'receipt-generator':
        return <ReceiptGeneratorTool userProfile={null} diagnostic={null} onBack={navigateHome} />;
      
      case 'delay-simulator':
        return <DelaySimulatorTool userProfile={null} diagnostic={null} onBack={navigateHome} />;
      
      case 'budget-calculator':
        return <BudgetCalculator userProfile={null} diagnostic={null} />;
      
      case 'childcare_assistant':
        return <ChildcareAssistantTool userProfile={null} diagnostic={null} onBack={navigateHome} />;
      
      case 'state-of-play':
        return <StateOfPlayTool userProfile={null} diagnostic={null} onBack={navigateHome} />;
      
      case 'rent-negotiator':
        return <RentNegotiator userProfile={null} diagnostic={null} />;
      
      case 'insurance-assistant':
        return <InsuranceAssistantComplete userProfile={null} diagnostic={null} />;
      
      case 'moving-planner':
        return <MovingPlannerTool userProfile={null} diagnostic={null} />;
      
      case 'cv-translator':
        return <CVTranslator userProfile={null} diagnostic={null} />;
      
      case 'social-security-guide':
        return <SocialSecurityGuideTool userProfile={null} diagnostic={null} onBack={navigateHome} />;
      
      case 'social-services-locator':
        return <SocialServicesLocatorTool userProfile={null} diagnostic={null} onBack={navigateHome} />;
      
      case 'family-allowances-calculator':
        return <FamilyAllowancesTool userProfile={null} diagnostic={null} onBack={navigateHome} />;
      
      case 'education-costs-calculator':
        return <EducationCostsTool userProfile={null} diagnostic={null} onBack={navigateHome} />;
      
      case 'culture-quiz':
        return <CultureQuizTool userProfile={null} diagnostic={null} onBack={navigateHome} />;
      
      case 'traditions-guide':
        return <TraditionsGuideTool userProfile={null} diagnostic={null} onBack={navigateHome} />;
      
      case 'french-learning-assistant':
        return <FrenchLearningAssistantTool userProfile={null} diagnostic={null} onBack={navigateHome} />;
      
      case 'naturalization-simulator':
        return <NaturalizationTestSimulatorTool userProfile={null} diagnostic={null} onBack={navigateHome} />;
      
      case 'french-expressions-translator':
        return <ExpressionsTranslatorTool userProfile={null} diagnostic={null} onBack={navigateHome} />;
      
      case 'emergency-assistant':
        return <EmergencyAssistantTool userProfile={null} diagnostic={null} onBack={navigateHome} />;
      
      case 'planning-generator':
        return <PlanningGeneratorTool userProfile={null} diagnostic={null} onBack={navigateHome} />;
      
      case 'family-budget-assistant':
        return <BudgetAssistantTool userProfile={null} diagnostic={null} onBack={navigateHome} />;
      
      case 'rights-guide':
        return <RightsGuideTool userProfile={null} diagnostic={null} onBack={navigateHome} />;
      
      case 'medical-translator':
        return <MedicalTranslatorTool userProfile={null} diagnostic={null} onBack={navigateHome} />;
      
      case 'training_guide':
        return <TrainingGuideTool userProfile={null} diagnostic={null} onBack={navigateHome} />;
      
      case 'portfolio_creator':
        return <PortfolioCreatorTool userProfile={null} diagnostic={null} onBack={navigateHome} />;
      
      // Nouveaux outils d'emploi de useToolsData
      case 'cv_translator':
        return <CVTranslatorTool userProfile={null} diagnostic={null} />;
      
      case 'salaryCalculator':
        return <SalaryCalculatorTool userProfile={null} diagnostic={null} />;
      
      case 'unemploymentSimulator':
        return <UnemploymentSimulatorTool userProfile={null} diagnostic={null} />;
      
      case 'motivation_letter':
        return <MotivationLetterTool userProfile={null} diagnostic={null} />;
      
      case 'interview_assistant':
        return <InterviewAssistantTool userProfile={null} diagnostic={null} />;
      
      case 'diploma_equivalence':
        return <DiplomaEquivalenceTool userProfile={null} diagnostic={null} />;
      
      // Nouveaux outils admin
      case 'form-assistant':
        return <FormAssistantTool userProfile={null} diagnostic={null} onBack={navigateHome} />;
      
      case 'document-checker':
        return <DocumentCheckerTool userProfile={null} diagnostic={null} onBack={navigateHome} />;
      
      default:
        console.warn(`Vue non trouvée: ${currentView}, redirection vers l'accueil`);
        return <HomePage onSelectTool={navigateToTool} />;
    }
  };

  return (
    <ErrorBoundary>
      <AppLayout 
        currentView={currentView}
        onSelectTool={navigateToTool}
        showHeader={currentView !== 'home'}
      >
        {renderContent()}
      </AppLayout>
    </ErrorBoundary>
  );
};

export default Index;
