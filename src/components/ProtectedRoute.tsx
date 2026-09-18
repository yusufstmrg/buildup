import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useBuildUp } from '../context/BuildUpContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useBuildUp();
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect to login while preserving the intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
