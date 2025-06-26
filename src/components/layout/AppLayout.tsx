
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OnlineStatusIndicator from '@/components/OnlineStatusIndicator';
import { View } from '@/hooks/useToolNavigation';

interface AppLayoutProps {
  children: React.ReactNode;
  currentView: View;
  onSelectTool: (toolId: string) => void;
  showHeader?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  currentView, 
  onSelectTool, 
  showHeader = true 
}) => {
  const getToolTitle = () => {
    switch (currentView) {
      case 'receipt-generator':
        return 'Générateur de Récépissés';
      case 'delay-simulator':
        return 'Simulateur de Délais';
      case 'letter-generator':
        return 'Générateur de Lettres Administratives';
      case 'fee-calculator':
        return 'Calculateur de Frais';
      case 'budget-calculator':
        return 'Calculateur de Budget Logement';
      case 'cv-translator':
        return 'Traducteur de CV';
      case 'social-security-guide':
        return 'Guide Sécurité Sociale';
      case 'social-services-locator':
        return 'Localisateur de Services Sociaux';
      case 'family-allowances-calculator':
        return 'Calculateur d\'Allocations Familiales';
      case 'education-costs-calculator':
        return 'Calculateur de Frais de Scolarité';
      case 'culture-quiz':
        return 'Quiz Culture Française';
      case 'traditions-guide':
        return 'Guide des Traditions';
      case 'french-learning-assistant':
        return 'Assistant d\'Apprentissage du Français';
      case 'naturalization-simulator':
        return 'Simulateur de Naturalisation';
      case 'french-expressions-translator':
        return 'Traducteur d\'Expressions Françaises';
      case 'emergency-assistant':
        return 'Assistant d\'Urgence';
      case 'planning-generator':
        return 'Générateur de Planning';
      case 'family-budget-assistant':
        return 'Assistant Budget Familial';
      case 'rights-guide':
        return 'Guide des Droits et Recours';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
      {showHeader && currentView !== 'home' && (
        <Header 
          onSelectTool={onSelectTool}
          showHomeButton={true}
          currentTool={currentView}
          toolTitle={getToolTitle()}
        />
      )}
      
      <main className="flex-1 relative">
        {children}
      </main>
      
      <div id="notifications" className="fixed top-4 right-4 z-50" />
      <OnlineStatusIndicator />
      <Footer />
    </div>
  );
};

export default AppLayout;
