
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, ArrowRight } from 'lucide-react';

interface ToolCardProps {
  tool: {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    color: string;
    category: string;
    status: 'active' | 'coming_soon';
  };
  onToolClick: (toolId: string) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onToolClick }) => {
  const IconComponent = tool.icon;

  return (
    <Card 
      className={`transition-all duration-300 ${
        tool.status === 'active' 
          ? 'hover:shadow-lg cursor-pointer hover:scale-105' 
          : 'opacity-75'
      }`}
      onClick={() => tool.status === 'active' && onToolClick(tool.id)}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className={`w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center shadow-lg`}>
            <IconComponent className="h-6 w-6 text-white" />
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-xs">
              {tool.category}
            </Badge>
            {tool.status === 'coming_soon' && (
              <Badge variant="secondary" className="text-xs">
                Bientôt
              </Badge>
            )}
          </div>
        </div>
        <CardTitle className="text-lg leading-tight">{tool.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4 leading-relaxed">
          {tool.description}
        </CardDescription>
        
        {tool.status === 'active' ? (
          <Button className="w-full bg-purple-600 hover:bg-purple-700 transition-all duration-200">
            Utiliser cet outil
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button variant="outline" className="w-full" disabled>
            <Clock className="mr-2 h-4 w-4" />
            Bientôt disponible
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ToolCard;
