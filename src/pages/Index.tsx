
import React, { useState } from 'react';
import HomePage from '@/components/HomePage';
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
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OnlineStatusIndicator from '@/components/OnlineStatusIndicator';

type View = 
  | 'home'
  | 'admin'
  | 'logement'
  | 'emploi'
  | 'sante'
  | 'education'
  | 'culture'
  | 'transversal'
  | 'letter-generator'
  | 'fee-calculator'
  | 'receipt-generator'
  | 'delay-simulator'
  | 'budget-calculator'
  | 'cv-translator'
  | 'social-security-guide'
  | 'social-services-locator'
  | 'family-allowances-calculator'
  | 'education-costs-calculator'
  | 'culture-quiz'
  | 'traditions-guide'
  | 'french-learning-assistant'
  | 'naturalization-simulator'
  | 'french-expressions-translator'
  | 'emergency-assistant'
  | 'planning-generator'
  | 'family-budget-assistant'
  | 'rights-guide';

const Index = () => {
  const [currentView, setCurrentView] = useState<View>('home');

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <HomePage onSelectTool={(toolId) => setCurrentView(toolId as View)} />;
      
      // Module views
      case 'admin':
        return (
          <AdminModule 
            userProfile={null}
            diagnostic={null}
            onBack={() => setCurrentView('home')}
          />
        );
      
      case 'logement':
        return (
          <LogementModule 
            userProfile={null}
            diagnostic={null}
            onBack={() => setCurrentView('home')}
          />
        );
      
      case 'emploi':
        return (
          <EmploiModule 
            userProfile={null}
            diagnostic={null}
            onBack={() => setCurrentView('home')}
          />
        );
      
      case 'sante':
        return (
          <SanteModule 
            userProfile={null}
            diagnostic={null}
            onBack={() => setCurrentView('home')}
          />
        );
      
      case 'education':
        return (
          <EducationModule 
            userProfile={null}
            diagnostic={null}
            onBack={() => setCurrentView('home')}
          />
        );
      
      case 'culture':
        return (
          <CultureModule 
            userProfile={null}
            diagnostic={null}
            onBack={() => setCurrentView('home')}
          />
        );
      
      case 'transversal':
        return (
          <TransversalModule 
            userProfile={null}
            diagnostic={null}
            onBack={() => setCurrentView('home')}
          />
        );

      // Individual tool views
      case 'letter-generator':
        return <LetterGenerator userProfile={null} diagnostic={null} />;
      
      case 'fee-calculator':
        return <FeeCalculator userProfile={null} diagnostic={null} />;
      
      case 'receipt-generator':
        return <ReceiptGeneratorTool userProfile={null} diagnostic={null} onBack={() => setCurrentView('home')} />;
      
      case 'budget-calculator':
        return <BudgetCalculator userProfile={null} diagnostic={null} />;
      
      case 'cv-translator':
        return <CVTranslator userProfile={null} diagnostic={null} />;
      
      case 'social-security-guide':
        return <SocialSecurityGuideTool userProfile={null} diagnostic={null} onBack={() => setCurrentView('home')} />;
      
      case 'social-services-locator':
        return <SocialServicesLocatorTool userProfile={null} diagnostic={null} onBack={() => setCurrentView('home')} />;
      
      case 'family-allowances-calculator':
        return <FamilyAllowancesTool userProfile={null} diagnostic={null} onBack={() => setCurrentView('home')} />;
      
      case 'education-costs-calculator':
        return <EducationCostsTool userProfile={null} diagnostic={null} onBack={() => setCurrentView('home')} />;
      
      case 'culture-quiz':
        return <CultureQuizTool userProfile={null} diagnostic={null} onBack={() => setCurrentView('home')} />;
      
      case 'traditions-guide':
        return <TraditionsGuideTool userProfile={null} diagnostic={null} onBack={() => setCurrentView('home')} />;
      
      case 'french-learning-assistant':
        return <FrenchLearningAssistantTool userProfile={null} diagnostic={null} onBack={() => setCurrentView('home')} />;
      
      case 'naturalization-simulator':
        return <NaturalizationTestSimulatorTool userProfile={null} diagnostic={null} onBack={() => setCurrentView('home')} />;
      
      case 'french-expressions-translator':
        return <ExpressionsTranslatorTool userProfile={null} diagnostic={null} onBack={() => setCurrentView('home')} />;
      
      case 'emergency-assistant':
        return <EmergencyAssistantTool userProfile={null} diagnostic={null} onBack={() => setCurrentView('home')} />;
      
      case 'planning-generator':
        return <PlanningGeneratorTool userProfile={null} diagnostic={null} onBack={() => setCurrentView('home')} />;
      
      case 'family-budget-assistant':
        return <BudgetAssistantTool userProfile={null} diagnostic={null} onBack={() => setCurrentView('home')} />;
      
      case 'rights-guide':
        return <RightsGuideTool userProfile={null} diagnostic={null} onBack={() => setCurrentView('home')} />;
      
      default:
        return <HomePage onSelectTool={(toolId) => setCurrentView(toolId as View)} />;
    }
  };

  const getToolTitle = () => {
    switch (currentView) {
      case 'receipt-generator':
        return 'Générateur de Récépissés';
      // Add other tool titles as needed
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
      {currentView !== 'home' && (
        <Header 
          onSelectTool={(toolId) => setCurrentView(toolId as View)}
          showHomeButton={true}
          currentTool={currentView}
          toolTitle={getToolTitle()}
        />
      )}
      
      <main className="flex-1 relative">
        {renderContent()}
      </main>
      
      <div id="notifications" className="fixed top-4 right-4 z-50" />
      <OnlineStatusIndicator />
      <Footer />
    </div>
  );
};

export default Index;
