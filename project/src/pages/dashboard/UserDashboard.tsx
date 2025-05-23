import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, CheckCircle, Clock, Search, 
  Plus, ChevronRight, FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getIncidentsForUser } from '../../data/mockData';
import IncidentStatusBadge from '../../components/incidents/IncidentStatusBadge';
import IncidentSeverityBadge from '../../components/incidents/IncidentSeverityBadge';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Get incidents reported by this user
  const userIncidents = getIncidentsForUser(user?.id || '');
  
  // Count incidents by status
  const openIncidents = userIncidents.filter(
    incident => ['open', 'assigned', 'in_progress'].includes(incident.status)
  ).length;
  
  const resolvedIncidents = userIncidents.filter(
    incident => ['resolved', 'closed'].includes(incident.status)
  ).length;
  
  // Get recent incidents
  const recentIncidents = [...userIncidents]
    .sort((a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Dashboard</h1>
      </div>
      
      {/* Quick Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link 
          to="/report-incident"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-5 transition-colors shadow-sm flex items-center"
        >
          <div className="p-3 bg-blue-700/50 rounded-full mr-4">
            <Plus size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg">Report New Incident</h3>
            <p className="text-blue-100 text-sm">Submit details about a new cyber security incident</p>
          </div>
        </Link>
        
        <Link 
          to="/my-incidents"
          className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white rounded-lg p-5 transition-colors shadow-sm flex items-center"
        >
          <div className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full mr-4">
            <FileText size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg">View My Incidents</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Track all your reported incidents and their status</p>
          </div>
        </Link>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          title="Total Incidents" 
          value={userIncidents.length} 
          icon={<AlertTriangle size={20} className="text-amber-500" />}
          colorClass="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/50"
        />
        <StatCard 
          title="Open Incidents" 
          value={openIncidents} 
          icon={<Clock size={20} className="text-blue-500" />}
          colorClass="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50"
        />
        <StatCard 
          title="Resolved Incidents" 
          value={resolvedIncidents} 
          icon={<CheckCircle size={20} className="text-green-500" />}
          colorClass="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/50"
        />
      </div>
      
      {/* Recent Incidents */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Incidents</h2>
          <Link 
            to="/my-incidents" 
            className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center"
          >
            View All <ChevronRight size={16} />
          </Link>
        </div>
        
        {recentIncidents.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentIncidents.map((incident) => (
              <div key={incident.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <Link to={`/incidents/${incident.id}`} className="text-base font-medium text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                      {incident.title}
                    </Link>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <IncidentStatusBadge status={incident.status} />
                    <IncidentSeverityBadge severity={incident.severity} />
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
                  {incident.description}
                </p>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>Reported: {new Date(incident.reportedAt).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>Affected: {incident.affectedSystems.join(', ')}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 mb-3">
              <FileText size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-1">No Incidents Yet</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">You haven't reported any incidents yet.</p>
            <Link 
              to="/report-incident"
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus size={16} className="mr-2" />
              Report New Incident
            </Link>
          </div>
        )}
      </div>
      
      {/* Status Tracker */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Incident Status Lookup</h2>
        </div>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Enter incident ID or keyword"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="ml-3 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Search
            </button>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Enter an incident ID or keyword to quickly find and check the status of a specific incident.
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  colorClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, colorClass }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex items-center">
          <div className={`rounded-full p-2 mr-3 ${colorClass}`}>
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;