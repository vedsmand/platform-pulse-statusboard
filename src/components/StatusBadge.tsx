
import React from 'react';
import { StatusType, getStatusText, getStatusColor } from '../data/mockData';

interface StatusBadgeProps {
  status: StatusType;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  showText = false, 
  size = 'md',
  className = ''
}) => {
  const baseClasses = `rounded-full ${getStatusColor(status)}`;
  
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${baseClasses} ${sizeClasses[size]}`}>
        {status === 'degraded' && (
          <span className="relative flex h-full w-full">
            <span className={`animate-pulse-slow absolute inline-flex h-full w-full rounded-full ${getStatusColor(status)} opacity-75`}></span>
          </span>
        )}
      </div>
      
      {showText && (
        <span className="text-sm font-medium">
          {getStatusText(status)}
        </span>
      )}
    </div>
  );
};

export default StatusBadge;
