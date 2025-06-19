
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface MobileCardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  gradient?: string;
}

export function MobileCard({
  title,
  description,
  children,
  onClick,
  loading = false,
  disabled = false,
  className,
  icon,
  gradient
}: MobileCardProps) {
  const [isPressed, setIsPressed] = useState(false);

  if (loading) {
    return (
      <Card className={cn("mobile-card-skeleton", className)}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-xl" />
            <div className="flex-1">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "mobile-card",
        "transform transition-all duration-200 ease-out",
        "active:scale-95 hover:scale-105",
        "shadow-lg hover:shadow-xl",
        "border-0 bg-white/90 backdrop-blur-sm",
        onClick && !disabled && "cursor-pointer",
        disabled && "opacity-50 cursor-not-allowed",
        isPressed && "scale-95 shadow-md",
        className
      )}
      onClick={!disabled ? onClick : undefined}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onTouchCancel={() => setIsPressed(false)}
      style={{
        minHeight: '44px', // iOS/Android minimum touch target
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)', // Hardware acceleration
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          {icon && (
            <div className={cn(
              "p-3 rounded-xl shadow-md transition-all duration-300",
              gradient ? `bg-gradient-to-br ${gradient}` : "bg-blue-500",
              "text-white"
            )}>
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg leading-tight truncate">
              {title}
            </CardTitle>
            {description && (
              <CardDescription className="text-sm mt-1 line-clamp-2">
                {description}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      {children && (
        <CardContent className="pt-0">
          {children}
        </CardContent>
      )}
    </Card>
  );
}
