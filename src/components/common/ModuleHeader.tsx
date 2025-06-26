
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface ModuleHeaderProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  toolsCount: number;
  onBack: () => void;
  userProfile?: any;
  diagnostic?: any;
  recommendations?: string;
}

const ModuleHeader: React.FC<ModuleHeaderProps> = ({
  title,
  description,
  icon: Icon,
  toolsCount,
  onBack,
  userProfile,
  diagnostic,
  recommendations
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-purple-600 hover:bg-purple-50"
        >
          ← Retour
        </Button>
        <Icon className="h-8 w-8 text-purple-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600">{toolsCount} outils IA pour votre intégration</p>
        </div>
      </div>

      {diagnostic && recommendations && (
        <Card className="bg-purple-50 border-purple-200 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5 text-purple-600" />
              <span className="font-medium text-purple-900">Recommandations personnalisées</span>
            </div>
            <p className="text-purple-800 text-sm">
              {recommendations}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ModuleHeader;
