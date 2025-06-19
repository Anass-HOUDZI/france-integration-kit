
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ChevronDown, FileText, Home, Briefcase, Heart, GraduationCap, Globe, Settings } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { useResponsive } from '@/hooks/useResponsive';

interface CategoriesDropdownProps {
  onSelectCategory?: (categoryId: string) => void;
}

const CategoriesDropdown: React.FC<CategoriesDropdownProps> = ({ onSelectCategory }) => {
  const { t } = useI18n();
  const { isMobile } = useResponsive();
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    {
      id: 'admin',
      title: t('category.admin'),
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100'
    },
    {
      id: 'logement',
      title: t('category.logement'),
      icon: Home,
      color: 'text-green-600',
      bgColor: 'bg-green-50 hover:bg-green-100'
    },
    {
      id: 'emploi',
      title: t('category.emploi'),
      icon: Briefcase,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 hover:bg-purple-100'
    },
    {
      id: 'sante',
      title: t('category.sante'),
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50 hover:bg-red-100'
    },
    {
      id: 'education',
      title: t('category.education'),
      icon: GraduationCap,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 hover:bg-yellow-100'
    },
    {
      id: 'culture',
      title: t('category.culture'),
      icon: Globe,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 hover:bg-indigo-100'
    },
    {
      id: 'transversal',
      title: t('category.transversal'),
      icon: Settings,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50 hover:bg-gray-100'
    }
  ];

  const handleCategorySelect = (categoryId: string) => {
    setIsOpen(false);
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    }
  };

  const CategoryItem = ({ category }: { category: typeof categories[0] }) => {
    const IconComponent = category.icon;
    return (
      <div
        onClick={() => handleCategorySelect(category.id)}
        className={`rounded-xl px-4 py-3 cursor-pointer transition-all duration-200 ${category.bgColor} border-none min-h-[44px] flex items-center`}
      >
        <div className="flex items-center gap-3 w-full">
          <div className="flex-shrink-0">
            <IconComponent className={`h-5 w-5 ${category.color}`} />
          </div>
          <div className="flex-1">
            <div className={`font-medium ${category.color}`}>
              {category.title}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="text-sm font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-2 min-h-[44px]"
          >
            Catégories
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
        </SheetTrigger>
        
        <SheetContent 
          side="bottom" 
          className="h-[70vh] bg-white/95 backdrop-blur-sm rounded-t-3xl border-t border-gray-200/50"
        >
          <SheetHeader className="pb-4">
            <SheetTitle className="text-lg font-semibold text-center">
              Catégories
            </SheetTitle>
          </SheetHeader>
          
          <div className="grid grid-cols-1 gap-3 px-2 overflow-y-auto max-h-[calc(70vh-100px)]">
            {categories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-sm font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-2"
        >
          {t('home.all_categories')}
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="start" 
        className="w-80 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 mt-2 p-3"
      >
        <div className="grid grid-cols-1 gap-2">
          {categories.map((category) => (
            <DropdownMenuItem
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`rounded-xl px-4 py-3 cursor-pointer transition-all duration-200 ${category.bgColor} border-none`}
            >
              <div className="flex items-center gap-3 w-full">
                <div className="flex-shrink-0">
                  <category.icon className={`h-5 w-5 ${category.color}`} />
                </div>
                <div className="flex-1">
                  <div className={`font-medium ${category.color}`}>
                    {category.title}
                  </div>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoriesDropdown;
