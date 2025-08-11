
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OnlineStatusIndicator from '@/components/OnlineStatusIndicator';
import { View } from '@/hooks/useToolNavigation';
import { useI18n } from '@/hooks/useI18n';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();

  // Scroll-to-top global à chaque changement de vue ou de route
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [currentView, location.pathname]);

  // Ne jamais montrer le header sur les pages d'outils - ToolContainer gère sa propre navigation
  const shouldShowHeader = showHeader && currentView === 'home';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
      {shouldShowHeader && (
        <Header 
          onSelectTool={onSelectTool}
          showHomeButton={false}
          currentTool={currentView}
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
