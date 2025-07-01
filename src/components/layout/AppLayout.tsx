
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OnlineStatusIndicator from '@/components/OnlineStatusIndicator';
import { View } from '@/hooks/useToolNavigation';
import { useI18n } from '@/hooks/useI18n';

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
  const { t } = useI18n();

  const getToolInfo = () => {
    switch (currentView) {
      case 'receipt-generator':
        return { title: t('tool.receipt-generator'), category: 'admin' };
      case 'delay-simulator':
        return { title: t('tool.delay-simulator'), category: 'admin' };
      case 'letter-generator':
        return { title: t('tool.letter-generator'), category: 'admin' };
      case 'fee-calculator':
        return { title: t('tool.fee-calculator'), category: 'admin' };
      case 'budget-calculator':
        return { title: t('tool.budget-calculator'), category: 'logement' };
      case 'cv-translator':
        return { title: t('tool.cv-translator'), category: 'emploi' };
      case 'social-security-guide':
        return { title: t('tool.social-security-guide'), category: 'sante' };
      case 'social-services-locator':
        return { title: t('tool.social-services-locator'), category: 'sante' };
      case 'medical-translator':
        return { title: t('tool.medical-translator'), category: 'sante' };
      case 'family-allowances-calculator':
        return { title: t('tool.family-allowances-calculator'), category: 'education' };
      case 'education-costs-calculator':
        return { title: t('tool.education-costs-calculator'), category: 'education' };
      case 'culture-quiz':
        return { title: t('tool.culture-quiz'), category: 'culture' };
      case 'traditions-guide':
        return { title: t('tool.traditions-guide'), category: 'culture' };
      case 'french-learning-assistant':
        return { title: t('tool.french-learning-assistant'), category: 'culture' };
      case 'naturalization-simulator':
        return { title: t('tool.naturalization-simulator'), category: 'culture' };
      case 'french-expressions-translator':
        return { title: t('tool.french-expressions-translator'), category: 'culture' };
      case 'emergency-assistant':
        return { title: t('tool.emergency-assistant'), category: 'transversal' };
      case 'planning-generator':
        return { title: t('tool.planning-generator'), category: 'transversal' };
      case 'family-budget-assistant':
        return { title: t('tool.family-budget-assistant'), category: 'transversal' };
      case 'rights-guide':
        return { title: t('tool.rights-guide'), category: 'transversal' };
      default:
        return { title: '', category: '' };
    }
  };

  const toolInfo = getToolInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
      {showHeader && currentView !== 'home' && (
        <Header 
          onSelectTool={onSelectTool}
          showHomeButton={true}
          currentTool={currentView}
          toolTitle={toolInfo.title}
          toolCategory={toolInfo.category}
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
