import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import AnalystDashboard from './pages/dashboard/AnalystDashboard';
import UserDashboard from './pages/dashboard/UserDashboard';

const DashboardRouter: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'analyst':
      return <AnalystDashboard />;
    case 'user':
      return <UserDashboard />;
    default:
      return <Navigate to="/login" replace />;
  }
};

export default DashboardRouter;