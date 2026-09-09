import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BuildUpProvider } from './context/BuildUpContext';
import { HealthCheckModal } from './components/HealthCheckModal';
import { AuthModal } from './components/AuthModal';
import { ProtectedRoute } from './components/ProtectedRoute';

// Public Institutional Pages
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import { PricingPage } from './pages/PricingPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

// Enterprise Business Suite (Protected)
import { DashboardLayout } from './layouts/DashboardLayout';
import { CommandCenter } from './pages/CommandCenter';
import { Intelligence } from './pages/Intelligence';
import { Diagnostics } from './pages/Diagnostics';
import { AIWorkforce } from './pages/AIWorkforce';
import { BusinessOS } from './pages/BusinessOS';
import { StrategicPlanner } from './pages/StrategicPlanner';
import { ControlEngine } from './pages/ControlEngine';
import { MonetizationHub } from './pages/MonetizationHub';

export default function App() {
  return (
    <BuildUpProvider>
      <BrowserRouter>
        {/* Global Modals */}
        <HealthCheckModal />
        <AuthModal />

        <Routes>
          {/* Public Enterprise Transformation Portal */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Enterprise Business Intelligence Suite */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/app" element={<CommandCenter />} />
            <Route path="/dashboard" element={<CommandCenter />} />
            <Route path="/intelligence" element={<Intelligence />} />
            <Route path="/diagnostics" element={<Diagnostics />} />
            <Route path="/workforce" element={<AIWorkforce />} />
            <Route path="/business-os" element={<BusinessOS />} />
            <Route path="/planner" element={<StrategicPlanner />} />
            <Route path="/control" element={<ControlEngine />} />
            <Route path="/monetization" element={<MonetizationHub />} />
          </Route>

          {/* Catch-all fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </BuildUpProvider>
  );
}
