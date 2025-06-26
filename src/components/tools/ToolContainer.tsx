
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

interface ToolContainerProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  onBack?: () => void;
  children: React.ReactNode;
  className?: string;
}

const ToolContainer: React.FC<ToolContainerProps> = ({
  title,
  description,
  icon,
  onBack,
  children,
  className = ""
}) => {
  const { t } = useI18n();

  return (
    <div className={`max-w-4xl mx-auto p-6 space-y-6 ${className}`}>
      {onBack && (
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('common.back')}
        </Button>
      )}
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
          {icon}
          {title}
        </h1>
        {description && (
          <p className="text-lg text-gray-600">{description}</p>
        )}
      </div>

      {children}
    </div>
  );
};

export default ToolContainer;
