import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useBuildUp } from '../context/BuildUpContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isAuthLoading } = useBuildUp();

  if (isAuthLoading) {
    return <div className="min-h-screen bg-brand-navy flex items-center justify-center"><div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin"></div></div>;
  }
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect to login while preserving the intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
