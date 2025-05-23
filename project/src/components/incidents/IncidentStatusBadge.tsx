import React from 'react';
import { IncidentStatus } from '../../types';

interface IncidentStatusBadgeProps {
  status: IncidentStatus;
  size?: 'small' | 'medium' | 'large';
}

const IncidentStatusBadge: React.FC<IncidentStatusBadgeProps> = ({ status, size = 'medium' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'open':
        return { 
          bg: 'bg-yellow-100 dark:bg-yellow-900/30', 
          text: 'text-yellow-800 dark:text-yellow-300', 
          label: 'Open' 
        };
      case 'assigned':
        return { 
          bg: 'bg-blue-100 dark:bg-blue-900/30', 
          text: 'text-blue-800 dark:text-blue-300', 
          label: 'Assigned' 
        };
      case 'in_progress':
        return { 
          bg: 'bg-purple-100 dark:bg-purple-900/30', 
          text: 'text-purple-800 dark:text-purple-300', 
          label: 'In Progress' 
        };
      case 'resolved':
        return { 
          bg: 'bg-green-100 dark:bg-green-900/30', 
          text: 'text-green-800 dark:text-green-300', 
          label: 'Resolved' 
        };
      case 'closed':
        return { 
          bg: 'bg-gray-100 dark:bg-gray-800', 
          text: 'text-gray-800 dark:text-gray-300', 
          label: 'Closed' 
        };
      case 'rejected':
        return { 
          bg: 'bg-red-100 dark:bg-red-900/30', 
          text: 'text-red-800 dark:text-red-300', 
          label: 'Rejected' 
        };
      default:
        return { 
          bg: 'bg-gray-100 dark:bg-gray-800', 
          text: 'text-gray-800 dark:text-gray-300', 
          label: status 
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

  const { bg, text, label } = getStatusConfig();
  const sizeClasses = getSizeClasses();

  return (
    <span 
      className={`inline-flex items-center font-medium rounded-full ${bg} ${text} ${sizeClasses}`}
    >
      {label}
    </span>
  );
};

export default IncidentStatusBadge;