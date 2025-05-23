import React from 'react';
import { IncidentType } from '../../types';
import { 
  Bug, Link, Shield, Database, UserX, FileKey, Users, HelpCircle
} from 'lucide-react';

interface IncidentTypeBadgeProps {
  type: IncidentType;
  showIcon?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const IncidentTypeBadge: React.FC<IncidentTypeBadgeProps> = ({ 
  type, 
  showIcon = true,
  size = 'medium' 
}) => {
  const getTypeConfig = () => {
    switch (type) {
      case 'malware':
        return { 
          bg: 'bg-rose-100 dark:bg-rose-900/30', 
          text: 'text-rose-800 dark:text-rose-300', 
          icon: <Bug size={getIconSize()} />,
          label: 'Malware' 
        };
      case 'phishing':
        return { 
          bg: 'bg-amber-100 dark:bg-amber-900/30', 
          text: 'text-amber-800 dark:text-amber-300', 
          icon: <Link size={getIconSize()} />,
          label: 'Phishing' 
        };
      case 'data_breach':
        return { 
          bg: 'bg-indigo-100 dark:bg-indigo-900/30', 
          text: 'text-indigo-800 dark:text-indigo-300', 
          icon: <Database size={getIconSize()} />,
          label: 'Data Breach' 
        };
      case 'ddos':
        return { 
          bg: 'bg-blue-100 dark:bg-blue-900/30', 
          text: 'text-blue-800 dark:text-blue-300', 
          icon: <Shield size={getIconSize()} />,
          label: 'DDoS' 
        };
      case 'unauthorized_access':
        return { 
          bg: 'bg-purple-100 dark:bg-purple-900/30', 
          text: 'text-purple-800 dark:text-purple-300', 
          icon: <UserX size={getIconSize()} />,
          label: 'Unauthorized Access' 
        };
      case 'ransomware':
        return { 
          bg: 'bg-red-100 dark:bg-red-900/30', 
          text: 'text-red-800 dark:text-red-300', 
          icon: <FileKey size={getIconSize()} />,
          label: 'Ransomware' 
        };
      case 'social_engineering':
        return { 
          bg: 'bg-orange-100 dark:bg-orange-900/30', 
          text: 'text-orange-800 dark:text-orange-300', 
          icon: <Users size={getIconSize()} />,
          label: 'Social Engineering' 
        };
      case 'other':
      default:
        return { 
          bg: 'bg-gray-100 dark:bg-gray-800', 
          text: 'text-gray-800 dark:text-gray-300', 
          icon: <HelpCircle size={getIconSize()} />,
          label: type === 'other' ? 'Other' : type 
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

  const { bg, text, icon, label } = getTypeConfig();
  const sizeClasses = getSizeClasses();

  return (
    <span 
      className={`inline-flex items-center font-medium rounded-full ${bg} ${text} ${sizeClasses}`}
    >
      {showIcon && <span className="mr-1">{icon}</span>}
      {label}
    </span>
  );
};

export default IncidentTypeBadge;