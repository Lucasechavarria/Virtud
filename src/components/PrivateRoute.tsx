import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // Opcional: puedes renderizar un spinner o indicador de carga aquí
    return <div>Cargando...</div>;
  }

  if (!user) {
    // Si no hay usuario y no está cargando, redirigir a la página de inicio
    return <Navigate to="/" replace />;
  }

  // Si el usuario está autenticado, renderizar los children
  return <>{children}</>;
};

export default PrivateRoute;