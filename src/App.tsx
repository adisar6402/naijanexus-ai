import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import SimulationPanel from './components/SimulationPanel';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'agency' | 'citizen' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Simulate app initialization
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleLogin = (role: 'admin' | 'agency' | 'citizen') => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Routes>
          <Route 
            path="/login" 
            element={
              !isAuthenticated ? 
              <LoginPage onLogin={handleLogin} language={language} setLanguage={setLanguage} /> : 
              <Navigate to="/dashboard" />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? 
              <Dashboard 
                userRole={userRole} 
                onLogout={handleLogout} 
                language={language} 
                setLanguage={setLanguage}
              /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/admin" 
            element={
              isAuthenticated && userRole === 'admin' ? 
              <AdminDashboard 
                onLogout={handleLogout} 
                language={language} 
                setLanguage={setLanguage}
              /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/simulation" 
            element={
              isAuthenticated ? 
              <SimulationPanel 
                userRole={userRole} 
                language={language} 
                setLanguage={setLanguage}
              /> : 
              <Navigate to="/login" />
            } 
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;