
import React from 'react';
import HomePage from '@/components/HomePage';
import CategoryPage from '@/components/pages/CategoryPage';
import AdminModule from '@/components/modules/AdminModule';
import LogementModule from '@/components/modules/LogementModule';
import EmploiModule from '@/components/modules/EmploiModule';
import SanteModule from '@/components/modules/SanteModule';
import EducationModule from '@/components/modules/EducationModule';
import CultureModule from '@/components/modules/CultureModule';
import TransversalModule from '@/components/modules/TransversalModule';
import LetterGenerator from '@/components/tools/LetterGenerator';
import FeeCalculator from '@/components/tools/FeeCalculator';
import BudgetCalculator from '@/components/tools/BudgetCalculator';
import CVTranslator from '@/components/tools/CVTranslator';
import ChildcareAssistantTool from '@/components/tools/ChildcareAssistantTool';
import StateOfPlayTool from '@/components/tools/StateOfPlayTool';
import RentNegotiator from '@/components/tools/RentNegotiator';
import InsuranceAssistantComplete from '@/components/tools/InsuranceAssistantComplete';
import MovingPlannerTool from '@/components/tools/MovingPlannerTool';
import SocialSecurityGuideTool from '@/components/tools/SocialSecurityGuideTool';
import SocialServicesLocatorTool from '@/components/tools/SocialServicesLocatorTool';
import FamilyAllowancesTool from '@/components/tools/FamilyAllowancesTool';
import EducationCostsTool from '@/components/tools/EducationCostsTool';
import CultureQuizTool from '@/components/tools/CultureQuizTool';
import TraditionsGuideTool from '@/components/tools/TraditionsGuideTool';
import FrenchLearningAssistantTool from '@/components/tools/FrenchLearningAssistantTool';
import NaturalizationTestSimulatorTool from '@/components/tools/NaturalizationTestSimulatorTool';
import ExpressionsTranslatorTool from '@/components/tools/ExpressionsTranslatorTool';
import EmergencyAssistantTool from '@/components/tools/EmergencyAssistantTool';
import PlanningGeneratorTool from '@/components/tools/PlanningGeneratorTool';
import BudgetAssistantTool from '@/components/tools/BudgetAssistantTool';
import RightsGuideTool from '@/components/tools/RightsGuideTool';
import ReceiptGeneratorTool from '@/components/tools/ReceiptGeneratorTool';
import DelaySimulatorTool from '@/components/tools/DelaySimulatorTool';
import MedicalTranslatorTool from '@/components/tools/MedicalTranslatorTool';
import TrainingGuideTool from '@/components/tools/TrainingGuideTool';
import PortfolioCreatorTool from '@/components/tools/PortfolioCreatorTool';
import AppLayout from '@/components/layout/AppLayout';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { useToolNavigation } from '@/hooks/useToolNavigation';

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
        return <LetterGenerator userProfile={null} diagnostic={null} onBack={navigateHome} />;
      
      case 'fee-calculator':
        return <FeeCalculator userProfile={null} diagnostic={null} />;
      
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
