import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BuildUpProvider } from './context/BuildUpContext';
import { ThemeProvider } from './context/ThemeContext';
import { HealthCheckModal } from './components/HealthCheckModal';
import { AuthModal } from './components/AuthModal';
import { ProtectedRoute } from './components/ProtectedRoute';
import { CmsProvider } from './context/CmsContext';
import { AdminBar } from './components/admin/AdminBar';
import { ThemePanel } from './components/admin/ThemePanel';
import { SectionManager } from './components/admin/SectionManager';
import { PricingManager } from './components/admin/PricingManager';

// Public Institutional Pages
import { LandingPage } from './pages/LandingPage';
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
import { AdminDashboard } from './pages/AdminDashboard';

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: any}> {
  constructor(props: any) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error: any) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return <div style={{padding: 20, color: 'red'}}><h1>Something went wrong.</h1><pre>{String(this.state.error)}</pre></div>;
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
    <ThemeProvider defaultTheme="light">
      <BuildUpProvider>
        <CmsProvider><BrowserRouter>
        {/* Global Modals */}
        <HealthCheckModal />
        <AuthModal />
        <AdminBar />
        <ThemePanel />
        <SectionManager />
        <PricingManager />

        <Routes>
          {/* Public Enterprise Transformation Portal */}
          <Route path="/" element={<LandingPage />} />
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
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* Catch-all fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
              </BrowserRouter>
        </CmsProvider>
      </BuildUpProvider>
    </ThemeProvider>
    </ErrorBoundary>
  );
}

