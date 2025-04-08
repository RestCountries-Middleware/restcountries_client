import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { JSX } from 'react';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated, loading } = useAuth();
  
    if (loading) return null;
  
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

export default ProtectedRoute;
