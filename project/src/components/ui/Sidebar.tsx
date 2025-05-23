import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, Shield, AlertTriangle, Users, Settings, LogOut, Menu, X, 
  PieChart, User, FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavItems = () => {
    if (!user) return [];

    const commonItems = [
      {
        name: 'Dashboard',
        path: '/',
        icon: <Home size={20} />,
      }
    ];

    if (user.role === 'admin') {
      return [
        ...commonItems,
        {
          name: 'Incidents',
          path: '/incidents',
          icon: <AlertTriangle size={20} />,
        },
        {
          name: 'Analysts',
          path: '/analysts',
          icon: <Users size={20} />,
        },
        {
          name: 'Settings',
          path: '/settings',
          icon: <Settings size={20} />,
        }
      ];
    } else if (user.role === 'analyst') {
      return [
        ...commonItems,
        {
          name: 'Assigned Incidents',
          path: '/assigned-incidents',
          icon: <AlertTriangle size={20} />,
        },
        {
          name: 'All Incidents',
          path: '/incidents',
          icon: <FileText size={20} />,
        },
        {
          name: 'Analytics',
          path: '/analytics',
          icon: <PieChart size={20} />,
        },
        {
          name: 'Profile',
          path: '/profile',
          icon: <User size={20} />,
        }
      ];
    } else {
      return [
        ...commonItems,
        {
          name: 'Report Incident',
          path: '/report-incident',
          icon: <AlertTriangle size={20} />,
        },
        {
          name: 'My Incidents',
          path: '/my-incidents',
          icon: <FileText size={20} />,
        },
        {
          name: 'Profile',
          path: '/profile',
          icon: <User size={20} />,
        }
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggle}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out z-30 
          ${isOpen ? 'w-64' : 'w-0 md:w-64'} shadow-lg overflow-hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold text-gray-800 dark:text-white">CIRMS</span>
            </div>
            <button 
              onClick={toggle}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 md:hidden"
            >
              <X size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          
          {/* Nav items */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-1 px-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <button
                    onClick={() => {
                      navigate(item.path);
                      if (window.innerWidth < 768) {
                        toggle();
                      }
                    }}
                    className={`flex items-center w-full px-4 py-2.5 text-left rounded-lg transition-colors
                      ${location.pathname === item.path 
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2.5 text-left rounded-lg text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut size={20} className="mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile toggle button */}
      <button
        onClick={toggle}
        className="fixed bottom-4 right-4 p-3 rounded-full bg-blue-600 text-white shadow-lg md:hidden z-10"
      >
        <Menu size={24} />
      </button>
    </>
  );
};

export default Sidebar;