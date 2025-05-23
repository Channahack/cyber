import React from 'react';
import { 
  AlertTriangle, Clock, CheckCircle, XCircle, UserCheck, RefreshCw
} from 'lucide-react';
import { mockDashboardStats, mockIncidents } from '../../data/mockData';

const AdminDashboard: React.FC = () => {
  // Get most recent incidents (last 5)
  const recentIncidents = [...mockIncidents]
    .sort((a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
        <button className="flex items-center px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
          <RefreshCw size={16} className="mr-2" />
          Refresh
        </button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard 
          title="Total Incidents" 
          value={mockDashboardStats.total} 
          icon={<AlertTriangle size={20} className="text-amber-500" />}
          colorClass="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/50"
        />
        <StatCard 
          title="Open Incidents" 
          value={mockDashboardStats.open} 
          icon={<Clock size={20} className="text-blue-500" />}
          colorClass="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50"
        />
        <StatCard 
          title="In Progress" 
          value={mockDashboardStats.inProgress} 
          icon={<RefreshCw size={20} className="text-purple-500" />}
          colorClass="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/50"
        />
        <StatCard 
          title="Resolved" 
          value={mockDashboardStats.resolved} 
          icon={<CheckCircle size={20} className="text-green-500" />}
          colorClass="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/50"
        />
        <StatCard 
          title="Closed" 
          value={mockDashboardStats.closed} 
          icon={<CheckCircle size={20} className="text-gray-500" />}
          colorClass="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700"
        />
        <StatCard 
          title="Rejected" 
          value={mockDashboardStats.rejected} 
          icon={<XCircle size={20} className="text-red-500" />}
          colorClass="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800/50"
        />
      </div>
      
      {/* Recent Incidents */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Incidents</h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentIncidents.map((incident) => (
            <div key={incident.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-800 dark:text-white">
                    {incident.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Reported {new Date(incident.reportedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(incident.status)}`}>
                    {formatStatus(incident.status)}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getSeverityColor(incident.severity)}`}>
                    {formatSeverity(incident.severity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-3 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
          <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            View All Incidents
          </button>
        </div>
      </div>
      
      {/* Analyst Assignments */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Analyst Workload</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <AnalystWorkload 
              name="Sophia Chen" 
              email="analyst@cirms.com"
              assigned={2} 
              completed={3} 
              avatar="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100" 
            />
            <AnalystWorkload 
              name="Michael Johnson" 
              email="michael@cirms.com"
              assigned={1} 
              completed={2} 
              avatar="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100" 
            />
            <AnalystWorkload 
              name="Emma Wilson" 
              email="emma@cirms.com"
              assigned={1} 
              completed={0} 
              avatar="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100" 
            />
          </div>
        </div>
        <div className="px-6 py-3 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            Manage Analysts
          </button>
          <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center">
            <UserCheck size={16} className="mr-1" />
            Add Analyst
          </button>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
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

interface AnalystWorkloadProps {
  name: string;
  email: string;
  assigned: number;
  completed: number;
  avatar: string;
}

const AnalystWorkload: React.FC<AnalystWorkloadProps> = ({ 
  name, email, assigned, completed, avatar
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
          <img src={avatar} alt={name} className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800 dark:text-white">{name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{email}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">Assigned</p>
          <p className="text-sm font-medium text-gray-800 dark:text-white">{assigned}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">Completed</p>
          <p className="text-sm font-medium text-gray-800 dark:text-white">{completed}</p>
        </div>
        <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
          <AlertTriangle size={16} />
        </button>
      </div>
    </div>
  );
};

// Helper functions
const getStatusColor = (status: string) => {
  switch (status) {
    case 'open':
      return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
    case 'assigned':
      return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
    case 'in_progress':
      return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300';
    case 'resolved':
      return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
    case 'closed':
      return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300';
    case 'rejected':
      return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
    default:
      return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300';
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'low':
      return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
    case 'medium':
      return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
    case 'high':
      return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300';
    case 'critical':
      return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
    default:
      return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300';
  }
};

const formatStatus = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ');
};

const formatSeverity = (severity: string) => {
  return severity.charAt(0).toUpperCase() + severity.slice(1);
};

export default AdminDashboard;