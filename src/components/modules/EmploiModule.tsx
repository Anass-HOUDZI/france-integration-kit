
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Briefcase } from 'lucide-react';
import ToolCard from '@/components/common/ToolCard';
import ModuleHeader from '@/components/common/ModuleHeader';
import { useEmploymentTools } from '@/hooks/useToolsData';

interface EmploiModuleProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}

const EmploiModule: React.FC<EmploiModuleProps> = ({ userProfile, diagnostic, onBack }) => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const tools = useEmploymentTools();

  // Trouver l'outil sélectionné
  const activeTool = selectedTool ? tools.find(t => t.id === selectedTool) : null;

  // Si un outil est sélectionné et actif, l'afficher
  if (activeTool && activeTool.component && activeTool.status === 'active') {
    const ToolComponent = activeTool.component;
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedTool(null)}
            className="text-purple-600 hover:bg-purple-50"
          >
            ← Retour aux outils
          </Button>
          <div className="flex items-center gap-2">
            <activeTool.icon className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">{activeTool.title}</h2>
          </div>
        </div>
        <ToolComponent userProfile={userProfile} diagnostic={diagnostic} />
      </div>
    );
  }

  // Afficher la vue d'ensemble
  const recommendations = userProfile?.title 
    ? `En tant que ${userProfile.title}, nous recommandons de commencer par l'adaptation de votre CV puis la simulation de votre salaire net et vos droits Pôle Emploi.`
    : 'Commencez par l\'adaptation de votre CV puis explorez les outils de simulation salariale et de droits Pôle Emploi.';

  return (
    <div className="max-w-7xl mx-auto p-6">
      <ModuleHeader
        title="Emploi & Formation"
        description={`${tools.length} outils IA pour votre carrière en France`}
        icon={Briefcase}
        toolsCount={tools.length}
        onBack={onBack}
        userProfile={userProfile}
        diagnostic={diagnostic}
        recommendations={recommendations}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <ToolCard 
            key={tool.id}
            tool={tool}
            onToolClick={setSelectedTool}
          />
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Pourquoi ces outils ?</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <h4 className="font-medium mb-2">🎯 Recherche d'emploi optimisée</h4>
            <p>CV adapté aux standards français, lettres de motivation personnalisées et préparation d'entretiens.</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">💰 Transparence salariale</h4>
            <p>Comprenez votre fiche de paie, négociez en connaissance de cause et simulez vos droits.</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">🎓 Reconnaissance de compétences</h4>
            <p>Faites reconnaître vos diplômes étrangers et accédez aux formations professionnelles.</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">🤖 Intelligence artificielle</h4>
            <p>Tous nos outils utilisent l'IA pour des résultats personnalisés et actualisés.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmploiModule;
