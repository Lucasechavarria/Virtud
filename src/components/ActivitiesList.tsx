import React from 'react';
import { ActivityCarousel } from '@/components/ui/activity-carousel';
import { useGymActivities } from '@/hooks/useGymActivities'; // Import the useGymActivities hook

const ActivitiesList: React.FC = () => {
  const { processedActivities, loading, error } = useGymActivities(); // Use the hook

  if (loading) {
    return <div>Cargando actividades...</div>;
  }


  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (processedActivities.length === 0) {
    return <div className="text-center text-gray-600 dark:text-gray-300">No hay actividades disponibles.</div>;
  }

  return (
    <div>
      <ActivityCarousel
        title="Actividades Disponibles"
        subtitle="Explora nuestras opciones de entrenamiento y bienestar"
        activities={processedActivities} // Use processedActivities from the hook
 buttonText="Reservar"
 onBookActivity={() => {}} />
    </div>
  );
};

export default ActivitiesList;
