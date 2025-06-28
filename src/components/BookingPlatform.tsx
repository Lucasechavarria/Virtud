import React, { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '@/firebaseConfig'; // Assuming firebaseConfig exports `app`

interface Activity {
  id: string;
  nombre: string;
  descripcion?: string;
  tipoActividad: string;
  cupo?: number;
  horariosDisponibles?: Array<{ diaSemana: string, horaInicio: string, horaFin: string, cupoEspecifico?: number }>;
  horarioMusculacion?: { lunesViernes: { apertura: string, cierre: string }, sabado: { apertura: string, cierre: string } };
}

const BookingPlatform = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (loading) {
    return <div>Cargando actividades...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Actividades Disponibles</h2>
      {activities.length === 0 ? (
        <p>No hay actividades disponibles en este momento.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map(activity => (
            <div key={activity.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{activity.nombre}</h3>
                {activity.descripcion && <p className="text-gray-600 dark:text-gray-400 mb-4">{activity.descripcion}</p>}
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  <p><span className="font-medium">Tipo:</span> {activity.tipoActividad}</p>
                  {activity.cupo !== undefined && <p><span className="font-medium">Cupo:</span> {activity.cupo}</p>}
                  {activity.tipoActividad === 'recurrente' && activity.horariosDisponibles && (
                    <div className="mt-4">
                      <p className="font-medium mb-2">Horarios:</p>
                      <ul className="list-disc list-inside">
                        {activity.horariosDisponibles.map((horario, index) => (
                          <li key={index}>{horario.diaSemana}: {horario.horaInicio} - {horario.horaFin} {horario.cupoEspecifico !== undefined && `(Cupo: ${horario.cupoEspecifico})`}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {activity.tipoActividad === 'musculacion' && activity.horarioMusculacion && (
                    <div className="mt-4">
                      <p className="font-medium mb-2">Horario de Musculación:</p>
                      <p>Lunes a Viernes: {activity.horarioMusculacion.lunesViernes.apertura} - {activity.horarioMusculacion.lunesViernes.cierre}</p>
                      <p>Sábado: {activity.horarioMusculacion.sabado.apertura} - {activity.horarioMusculacion.sabado.cierre}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingPlatform;