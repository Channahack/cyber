import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { formatDistanceToNow } from '../../utils/dateUtils';
import { Incident } from '../../types';
import IncidentStatusBadge from './IncidentStatusBadge';
import IncidentSeverityBadge from './IncidentSeverityBadge';
import IncidentTypeBadge from './IncidentTypeBadge';

interface IncidentCardProps {
  incident: Incident;
  showActions?: boolean;
}

const IncidentCard: React.FC<IncidentCardProps> = ({ incident, showActions = true }) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/incidents/${incident.id}`);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Card header with severity indicator */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center">
          <IncidentSeverityBadge severity={incident.severity} />
          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 flex items-center">
            <Calendar size={14} className="mr-1" />
            {formatDistanceToNow(new Date(incident.reportedAt))}
          </span>
        </div>
        <IncidentStatusBadge status={incident.status} />
      </div>
      
      {/* Card content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-1">
          {incident.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
          {incident.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <IncidentTypeBadge type={incident.type} />
          
          {incident.affectedSystems.map((system, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            >
              {system}
            </span>
          ))}
        </div>
        
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <User size={14} className="mr-1" />
          Reported by: {incident.reportedBy}
          {incident.assignedTo && (
            <span className="ml-3 flex items-center">
              <User size={14} className="mr-1" />
              Assigned to: {incident.assignedTo}
            </span>
          )}
        </div>
      </div>
      
      {/* Card actions */}
      {showActions && (
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-850 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleViewDetails}
            className="w-full py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            View Details
          </button>
        </div>
      )}
    </div>
  );
};

export default IncidentCard;