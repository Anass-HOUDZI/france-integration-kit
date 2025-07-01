
import React, { useRef } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';

interface HomePageProps {
  onSelectTool: (toolId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSelectTool }) => {
  const categoriesSectionRef = useRef<HTMLDivElement>(null);

  const scrollToCategories = () => {
    categoriesSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleCategorySelect = (categoryId: string) => {
    onSelectTool(categoryId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header onSelectTool={onSelectTool} />
      <HeroSection onScrollToTools={scrollToCategories} />
      <div ref={categoriesSectionRef}>
        <CategoriesSection onSelectCategory={handleCategorySelect} />
      </div>
    </div>
  );
};

export default HomePage;
