
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Briefcase, ArrowLeft, Sparkles } from 'lucide-react';
import ToolCard from '@/components/common/ToolCard';
import ModuleHeader from '@/components/common/ModuleHeader';
import { useEmploymentTools, ToolData } from '@/hooks/useToolsData';

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
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux outils
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

  // Afficher la vue d'ensemble avec tous les outils
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

      {/* Statistiques du module */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">{tools.filter(t => t.status === 'active').length}</div>
          <div className="text-sm text-blue-700">Outils Actifs</div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">{tools.filter(t => t.category === 'CV & Candidature').length}</div>
          <div className="text-sm text-green-700">CV & Candidature</div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">{tools.filter(t => t.category === 'Salaire & Finances').length}</div>
          <div className="text-sm text-purple-700">Salaire & Finances</div>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600">{tools.filter(t => t.category === 'Droits & Allocations').length}</div>
          <div className="text-sm text-orange-700">Droits & Allocations</div>
        </div>
      </div>

      {/* Grille des outils */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tools.map((tool) => (
          <ToolCard 
            key={tool.id}
            tool={tool}
            onToolClick={setSelectedTool}
          />
        ))}
      </div>

      {/* Section informative */}
      <div className="mt-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-purple-600" />
          Pourquoi ces outils ?
        </h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 text-purple-700">🎯 Recherche d'emploi optimisée</h4>
              <p>CV adapté aux standards français, lettres de motivation personnalisées et préparation d'entretiens avec IA.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-purple-700">💰 Transparence salariale</h4>
              <p>Comprenez votre fiche de paie, négociez en connaissance de cause et simulez vos droits sociaux.</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 text-purple-700">🎓 Reconnaissance de compétences</h4>
              <p>Faites reconnaître vos diplômes étrangers et accédez aux formations professionnelles disponibles.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-purple-700">🤖 Intelligence artificielle</h4>
              <p>Tous nos outils utilisent l'IA pour des résultats personnalisés, actualisés et conformes aux standards français.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmploiModule;
