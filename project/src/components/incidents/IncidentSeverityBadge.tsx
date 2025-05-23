import React from 'react';
import { IncidentSeverity } from '../../types';
import { AlertTriangle, AlertCircle } from 'lucide-react';

interface IncidentSeverityBadgeProps {
  severity: IncidentSeverity;
  showIcon?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const IncidentSeverityBadge: React.FC<IncidentSeverityBadgeProps> = ({ 
  severity, 
  showIcon = true,
  size = 'medium' 
}) => {
  const getSeverityConfig = () => {
    switch (severity) {
      case 'low':
        return { 
          bg: 'bg-green-100 dark:bg-green-900/30', 
          text: 'text-green-800 dark:text-green-300', 
          iconColor: 'text-green-500 dark:text-green-400',
          label: 'Low' 
        };
      case 'medium':
        return { 
          bg: 'bg-yellow-100 dark:bg-yellow-900/30', 
          text: 'text-yellow-800 dark:text-yellow-300', 
          iconColor: 'text-yellow-500 dark:text-yellow-400',
          label: 'Medium' 
        };
      case 'high':
        return { 
          bg: 'bg-orange-100 dark:bg-orange-900/30', 
          text: 'text-orange-800 dark:text-orange-300', 
          iconColor: 'text-orange-500 dark:text-orange-400',
          label: 'High' 
        };
      case 'critical':
        return { 
          bg: 'bg-red-100 dark:bg-red-900/30', 
          text: 'text-red-800 dark:text-red-300', 
          iconColor: 'text-red-500 dark:text-red-400',
          label: 'Critical' 
        };
      default:
        return { 
          bg: 'bg-gray-100 dark:bg-gray-800', 
          text: 'text-gray-800 dark:text-gray-300', 
          iconColor: 'text-gray-500 dark:text-gray-400',
          label: severity 
        };
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'text-xs px-2 py-0.5';
      case 'large':
        return 'text-sm px-3 py-1.5';
      case 'medium':
      default:
        return 'text-xs px-2.5 py-1';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 12;
      case 'large':
        return 18;
      case 'medium':
      default:
        return 14;
    }
  };

  const { bg, text, iconColor, label } = getSeverityConfig();
  const sizeClasses = getSizeClasses();
  const iconSize = getIconSize();

  return (
    <span 
      className={`inline-flex items-center font-medium rounded-full ${bg} ${text} ${sizeClasses}`}
    >
      {showIcon && (severity === 'critical' ? 
        <AlertCircle size={iconSize} className={`${iconColor} mr-1`} /> : 
        <AlertTriangle size={iconSize} className={`${iconColor} mr-1`} />
      )}
      {label}
    </span>
  );
};

export default IncidentSeverityBadge;