import React, { useEffect, useState } from 'react';
import { getCollection, addDocument } from '@/lib/firestore'; // Import addDocument
import { useAuth } from '@/context/AuthContext'; // Import useAuth
export interface Activity {
  id: string;
  nombre: string;
  descripcion?: string;
  tipoActividad: string;
  cupo?: number;
  horariosDisponibles?: Array<{ diaSemana: string, horaInicio: string, horaFin: string, cupoEspecifico?: number }>;
  horarioMusculacion?: { lunesViernes: { apertura: string, cierre: string }, sabado: { apertura: string, cierre: string } };
}

const BookingPlatform = () => {
  console.log("BookingPlatform component mounted."); // Log at component mount
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>(''); // Initialize with empty string
  const [isBookingLoading, setIsBookingLoading] = useState(false); // State for booking loading
  const [bookingError, setBookingError] = useState<string | null>(null); // State for booking errors

  const { user, loading: loadingAuth } = useAuth(); // Use useAuth hook

  useEffect(() => {
    // Fetch activities only when auth state is resolved and user is logged in
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await getCollection<Activity>('actividades'); // Use getCollection
        if (response.data) {
          setActivities(response.data);
        } else if (response.error) {
          setError(response.error);
        }
      } catch (err: any) {
        console.error("Error fetching activities:", err);
        setError('Error al cargar las actividades.');
      } finally {
        setLoading(false);
      }
    };
    fetchActivities(); // Llama a la función para cargar las actividades
  }, [user, loadingAuth]); // Effect depends on user and loadingAuth

  // Function to generate time options based on opening and closing time
  const generateTimeOptions = (apertura: string, cierre: string): string[] => {
    const options: string[] = [];
    const [aperturaHour, aperturaMinute] = apertura.split(':').map(Number);
    const [cierreHour, cierreMinute] = cierre.split(':').map(Number);

    let currentHour = aperturaHour;
    let currentMinute = aperturaMinute;

    // Generate options in 30-minute intervals
    while (
      currentHour < cierreHour ||
      (currentHour === cierreHour && currentMinute < cierreMinute)
    ) {
      const formattedHour = currentHour < 10 ? `0${currentHour}` : `${currentHour}`;
      const formattedMinute = currentMinute < 10 ? `0${currentMinute}` : `${currentMinute}`;
      options.push(`${formattedHour}:${formattedMinute}`);

      // Increment time by 30 minutes
      currentMinute += 30;
      if (currentMinute >= 60) {
        currentHour += 1;
        currentMinute -= 60; // Corrected increment logic
      }
    }

    return options;
  };

  const daysOfWeek = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];

  const selectedActivity = activities.find(activity => activity.id === selectedActivityId);

  const availableTimes = selectedActivityId && selectedDate
    ? selectedActivity?.tipoActividad === 'recurrente'
      ? selectedActivity.horariosDisponibles?.filter(horario => horario.diaSemana === daysOfWeek[selectedDate.getDay()]) || []
      : selectedActivity?.tipoActividad === 'musculacion'
        ? generateTimeOptions(selectedDate.getDay() >= 1 && selectedDate.getDay() <= 5 ? selectedActivity.horarioMusculacion?.lunesViernes.apertura || '' : selectedActivity.horarioMusculacion?.sabado.apertura || '', selectedDate.getDay() >= 1 && selectedDate.getDay() <= 5 ? selectedActivity.horarioMusculacion?.lunesViernes.cierre || '' : selectedActivity.horarioMusculacion?.sabado.cierre || '')
        : []
    : [];

  const handleCreateBooking = async () => {
    if (!user || !selectedActivityId || !selectedDate || !selectedTime) {
      setBookingError("Por favor, selecciona una actividad, fecha y hora.");
      return;
    }

    setIsBookingLoading(true);
    setBookingError(null);

    try {
      // Combine date and time
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const bookingDateTime = new Date(selectedDate);
      bookingDateTime.setHours(hours, minutes, 0, 0);

      const bookingData = {
        usuarioId: user.uid,
        actividadId: selectedActivityId,
        fechaActividad: bookingDateTime, // This will be converted to Firestore Timestamp
        fechaReserva: new Date(), // Current timestamp
        estado: 'confirmada', // Or 'pendiente'
        cupoTomado: 1, // Assuming 1 spot per booking
      };

      const response = await addDocument('reservas', bookingData);

      if (response.data) {
        alert('Reserva creada con éxito!'); // Simple success message
        // Reset selected states
        setSelectedActivityId(null);
        setSelectedDate(null); // Reset to null
        setSelectedTime('');
      } else if (response.error) {
        setBookingError(response.error);
      }
    } catch (error: any) {
      setBookingError("Error al crear la reserva: " + error.message);
    } finally {
      setIsBookingLoading(false);
    }
  };

  if (loading || loadingAuth) {
    return <div>Cargando actividades...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Actividades Disponibles</h2>

      {!loading && !error && activities.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-center">Seleccionar Actividad y Fecha</h3>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {/* Activity Selector */}
            <select
              value={selectedActivityId || ''}
              onChange={(e) => setSelectedActivityId(e.target.value)}
              className="p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 w-full md:w-auto"
            >
              <option value="">-- Selecciona una actividad --</option>
              {activities.map(activity => (
                <option key={activity.id} value={activity.id}>{activity.nombre}</option>
              ))}
            </select>
            {/* Date Selector */}
            <input type="date" onChange={(e) => setSelectedDate(e.target.valueAsDate || null)} className="p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 w-full md:w-auto" />

            {/* Time Selector (Conditional) */}
            {selectedActivityId && (
              <div className="w-full md:w-auto">
                <label htmlFor="time-select" className="sr-only">Seleccionar Hora</label>
                <select
                  id="time-select" // Add id for label association
                  value={selectedTime || ''}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                >
                  <option value="">-- Selecciona una hora --</option>
                  {availableTimes.map((timeOption, index) => (
                    <option key={index} value={typeof timeOption === 'string' ? timeOption : timeOption.horaInicio}>
                      {typeof timeOption === 'string' ? timeOption : `${timeOption.diaSemana}: ${timeOption.horaInicio}`}
                    </option> // Corregido: cerrar la etiqueta option correctamente
                  ))}
                </select>

                {selectedDate && availableTimes.length === 0 && selectedActivity?.tipoActividad === 'recurrente' && (
                  <p className="text-red-500 text-sm mt-2">No hay horarios disponibles para esta actividad en la fecha seleccionada.</p>
                )} {/* Corregido: cerrar el paréntesis y la llave */}
              </div>
            )} {/* Corregido: cerrar el paréntesis y la llave de la expresión condicional */}
          </div> {/* Correct closing of flex container div */}
        </div>
      )}

      {/* Booking Button */}
      {!loading && !error && activities.length > 0 && (
        <div className="text-center mt-8">
          <button
            onClick={handleCreateBooking}
            disabled={!selectedActivityId || !selectedDate || !selectedTime || isBookingLoading}
            className={`px-6 py-3 rounded-md text-white font-semibold transition-colors duration-300 ${(!selectedActivityId || !selectedDate || !selectedTime || isBookingLoading) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isBookingLoading ? 'Reservando...' : 'Reservar Ahora'}
          </button>
        </div>
      )}

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
  ); // Correct closing of main container div
};

export default BookingPlatform;
