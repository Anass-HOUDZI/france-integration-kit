
/**
 * Layout unifié pour toute l'application
 */
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OnlineStatusIndicator from '@/components/OnlineStatusIndicator';
import { useI18n } from '@/hooks/useI18n';

interface UnifiedLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  containerClass?: string;
}

const UnifiedLayout: React.FC<UnifiedLayoutProps> = ({ 
  children, 
  showHeader = true,
  showFooter = true,
  containerClass = ""
}) => {
  const { isRTL } = useI18n();

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col ${isRTL() ? 'rtl' : 'ltr'}`}>
      {showHeader && (
        <Header 
          onSelectTool={() => {}}
          showHomeButton={true}
          currentTool="home"
        />
      )}
      
      <main className={`flex-1 relative ${containerClass}`}>
        {children}
      </main>
      
      <div id="notifications" className="fixed top-4 right-4 z-50" />
      <OnlineStatusIndicator />
      
      {showFooter && <Footer />}
    </div>
  );
};

export default UnifiedLayout;
