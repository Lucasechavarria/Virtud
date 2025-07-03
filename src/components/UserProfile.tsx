import React from 'react';
import { useAuth } from '@/context/AuthContext';
import useUserData from '@/hooks/useUserData';

const UserProfile: React.FC = () => {
  const { user, loading: loadingAuth } = useAuth();
  const { userData, loading: loadingData, error } = useUserData(user?.uid);

  if (loadingAuth || loadingData) {
    return <div>Cargando perfil...</div>;
  }

  if (error) {
    return <div>Error al cargar el perfil: {error.message}</div>;
  }

  if (!user) {
    return <div>Usuario no autenticado.</div>;
  }

  return (
    <div className="user-profile-container">
      <h2>Información del Perfil</h2>
      {userData ? (
        <>
          <p><strong>Nombre:</strong> {userData.nombre}</p>
          <p><strong>Correo Electrónico:</strong> {user.email}</p> {/* Email from Auth */}
          <p><strong>Teléfono:</strong> {userData.telefono}</p>
          <p><strong>Edad:</strong> {userData.edad}</p>
          {/* Puedes agregar más campos del perfil aquí */}
        </>
      ) : (
        <p>No se encontraron datos de perfil adicionales.</p>
      )}
    </div>
  );
};

export default UserProfile;