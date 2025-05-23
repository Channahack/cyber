import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, PieChart, UserCheck, AlertTriangle, Clock, CheckCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockDashboardStats, mockIncidents } from '../../data/mockData';
import IncidentStatusBadge from '../../components/incidents/IncidentStatusBadge';
import IncidentSeverityBadge from '../../components/incidents/IncidentSeverityBadge';

const AnalystDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Get incidents assigned to this analyst
  const assignedIncidents = mockIncidents.filter(
    incident => incident.assignedTo === user?.id
  );

  const pendingIncidents = assignedIncidents.filter(
    incident => ['assigned', 'in_progress'].includes(incident.status)
  );

  const resolvedIncidents = assignedIncidents.filter(
    incident => ['resolved', 'closed'].includes(incident.status)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Analyst Dashboard</h1>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Assigned to You" 
          value={assignedIncidents.length} 
          icon={<UserCheck size={20} className="text-blue-500" />}
          colorClass="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50"
        />
        <StatCard 
          title="Pending" 
          value={pendingIncidents.length} 
          icon={<Clock size={20} className="text-amber-500" />}
          colorClass="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/50"
        />
        <StatCard 
          title="Resolved" 
          value={resolvedIncidents.length} 
          icon={<CheckCircle size={20} className="text-green-500" />}
          colorClass="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/50"
        />
        <StatCard 
          title="Response Rate" 
          value="92%" 
          icon={<PieChart size={20} className="text-purple-500" />}
          colorClass="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/50"
        />
      </div>
      
      {/* Active Incidents */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Active Incidents</h2>
          <Link 
            to="/assigned-incidents" 
            className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center"
          >
            View All <ChevronRight size={16} />
          </Link>
        </div>
        
        {pendingIncidents.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {pendingIncidents.slice(0, 3).map((incident) => (
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
              <CheckCircle size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-1">No Active Incidents</h3>
            <p className="text-gray-600 dark:text-gray-300">You don't have any active incidents assigned to you.</p>
          </div>
        )}
      </div>
      
      {/* Performance Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Response Performance</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PerformanceMetric
              title="Average Response Time"
              value="1.8 hours"
              trend="down"
              trendValue="12%"
              description="You're responding faster than last month"
            />
            <PerformanceMetric
              title="Resolution Time"
              value="4.2 days"
              trend="up"
              trendValue="5%"
              description="Taking slightly longer to resolve issues"
            />
            <PerformanceMetric
              title="Customer Satisfaction"
              value="4.8/5"
              trend="up"
              trendValue="8%"
              description="Your solutions are well-received"
            />
          </div>
          
          {/* Simple bar chart */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Incident Types Handled</h3>
            <div className="space-y-3">
              <PerformanceBar label="Phishing" value={40} color="bg-amber-500" />
              <PerformanceBar label="Malware" value={25} color="bg-rose-500" />
              <PerformanceBar label="Data Breach" value={15} color="bg-indigo-500" />
              <PerformanceBar label="Unauthorized Access" value={10} color="bg-purple-500" />
              <PerformanceBar label="Other" value={10} color="bg-gray-500" />
            </div>
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

interface PerformanceMetricProps {
  title: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  description: string;
}

const PerformanceMetric: React.FC<PerformanceMetricProps> = ({ 
  title, value, trend, trendValue, description 
}) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</h3>
      <div className="flex items-end space-x-2 mb-1">
        <span className="text-2xl font-bold text-gray-800 dark:text-white">{value}</span>
        <div className={`flex items-center text-sm ${
          trend === 'up' 
            ? 'text-green-600 dark:text-green-400' 
            : trend === 'down' 
              ? 'text-blue-600 dark:text-blue-400' 
              : 'text-gray-500 dark:text-gray-400'
        }`}>
          {trend === 'up' && <span className="mr-1">↑</span>}
          {trend === 'down' && <span className="mr-1">↓</span>}
          {trendValue}
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
};

interface PerformanceBarProps {
  label: string;
  value: number;
  color: string;
}

const PerformanceBar: React.FC<PerformanceBarProps> = ({ label, value, color }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${color}`} 
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

export default AnalystDashboard;