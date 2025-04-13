import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { JSX } from 'react';

const ProtectedRoute = ({ children, requiredRole, }: { children: JSX.Element; requiredRole?: string; }) => {
  const { isAuthenticated, loading } = useAuth();
  const userRole = localStorage.getItem('userRole');

  if (loading) return null;

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/dashboard" />;
  }

  return children;

  };

export default ProtectedRoute;
