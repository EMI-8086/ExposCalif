import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div className="p-4 text-center">Cargando...</div>;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};