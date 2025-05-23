import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AppLayout from './components/layout/AppLayout';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import DashboardRouter from './DashboardRouter';
import ReportIncidentPage from './pages/incidents/ReportIncidentPage';
import IncidentsPage from './pages/incidents/IncidentsPage';
import AnalystsPage from './pages/analysts/AnalystsPage';
import SettingsPage from './pages/settings/SettingsPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            
            {/* Protected Routes */}
            <Route element={<AppLayout />}>
              <Route path="/" element={<DashboardRouter />} />
              <Route path="/incidents" element={<IncidentsPage />} />
              <Route path="/analysts" element={<AnalystsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/report-incident" element={<ReportIncidentPage />} />
            </Route>
            
            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;