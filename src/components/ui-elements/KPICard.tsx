
import React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight,
  HelpCircle,
  Loader2
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface KPICardProps {
  title: string;
  value: string | number;
  trend?: number;
  isLoading?: boolean;
  icon?: React.ReactNode;
  tooltipText?: string;
  className?: string;
}

const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  trend,
  isLoading = false,
  icon,
  tooltipText,
  className = ""
}) => {
  const isTrendPositive = trend && trend > 0;
  const isTrendNegative = trend && trend < 0;

  return (
    <div className={`card-glass hover:shadow-elevated transition-all-medium ${className}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            {tooltipText && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="text-muted-foreground/70 hover:text-muted-foreground cursor-help transition-colors" size={14} />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-xs">{tooltipText}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="animate-spin" size={16} />
              <span className="text-muted-foreground">Loading...</span>
            </div>
          ) : (
            <div className="flex items-end space-x-2">
              <h2 className="text-2xl font-semibold">{value}</h2>
              {trend !== undefined && (
                <div className={`flex items-center text-xs font-medium
                  ${isTrendPositive ? 'text-green-500' : ''}
                  ${isTrendNegative ? 'text-red-500' : ''}
                  ${!isTrendPositive && !isTrendNegative ? 'text-muted-foreground' : ''}
                `}>
                  {isTrendPositive && <ArrowUpRight size={14} className="mr-1" />}
                  {isTrendNegative && <ArrowDownRight size={14} className="mr-1" />}
                  {trend > 0 ? '+' : ''}{trend}%
                </div>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div className="rounded-full bg-primary/10 p-3 text-primary">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default KPICard;
