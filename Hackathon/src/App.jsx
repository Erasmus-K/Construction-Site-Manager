import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import { NotificationProvider } from './hooks/useNotifications'
import Layout from './components/Layout'

import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Works from './pages/Works'
import SiteVisits from './pages/SiteVisits'
import Equipment from './pages/Equipment'
import Labour from './pages/Labour'
import Finances from './pages/Finances'
import AIAgents from './pages/AIAgents'
import AdminPanel from './pages/AdminPanel'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/app" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route index element={<Navigate to="/app/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="works" element={<Works />} />
                <Route path="site-visits" element={<SiteVisits />} />
                <Route path="equipment" element={<Equipment />} />
                <Route path="labour" element={<Labour />} />
                <Route path="finances" element={<Finances />} />
                <Route path="ai-agents" element={<AIAgents />} />
                <Route path="admin" element={<AdminPanel />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App