
import React, { useRef } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/home/HeroSection';
import ToolsSection from '@/components/home/ToolsSection';
import { useHomePageData } from '@/hooks/useHomePageData';

interface HomePageProps {
  onSelectTool: (toolId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSelectTool }) => {
  const toolsSectionRef = useRef<HTMLDivElement>(null);
  const tools = useHomePageData();

  const scrollToTools = () => {
    toolsSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Vérifier que les outils sont correctement chargés
  console.log('HomePage tools loaded:', tools.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header onSelectTool={onSelectTool} />
      <HeroSection onScrollToTools={scrollToTools} />
      <div ref={toolsSectionRef}>
        <ToolsSection tools={tools} onSelectTool={onSelectTool} />
      </div>
    </div>
  );
};

export default HomePage;
