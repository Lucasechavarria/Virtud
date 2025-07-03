import { useState, useEffect } from 'react';
import { getCollection } from '@/lib/firestore';
import { addDays, startOfWeek, format, parse, isAfter, isBefore, isWithinInterval } from 'date-fns';
import { es } from 'date-fns/locale';
import { Activity,Suspension, Reserva } from '@/types/activity'; // Import Activity, DiaFestivo, and Reserva interfaces
// Define the UseGymActivitiesResult interface
// Define the UseGymActivitiesResult interface
interface UseGymActivitiesResult {
  actividades: Activity[];
  suspensiones: Suspension[]; // Corrected from diasFestivos to suspensiones
  reservas: Reserva[];
  loading: boolean;
  error: string | null;
  processedActivities: Activity[];
}

export const useGymActivities = (): UseGymActivitiesResult => {
  const [actividades, setActividades] = useState<Activity[]>([]);

    const [suspensiones, setSuspensiones] = useState<Suspension[]>([]); // Renamed and corrected state for suspension
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [processedActivities, setProcessedActivities] = useState<Activity[]>([]);
  
  useEffect(() => {
    const fetchData = async () => { // Define fetchData as an async function
      try {
          // Fetch suspensiones and convert date fields
          const { data: firestoreSuspensiones, error: suspensionesError } = await getCollection<any>('suspensiones'); // Fetch as 'any' initially
          const suspensionesData: Suspension[] = firestoreSuspensiones?.map((item: any) => ({
              id: item.id,
              ...item, // Include other fields
              fechaCreacion: item.fechaCreacion?.toDate ? item.fechaCreacion.toDate() : item.fechaCreacion, // Convert Timestamp to Date
              fechaFin: item.fechaFin?.toDate ? item.fechaFin.toDate() : item.fechaFin, // Convert Timestamp to Date
              fechaInicio: item.fechaInicio?.toDate ? item.fechaInicio.toDate() : item.fechaInicio, // Convert Timestamp to Date
          })) || [];
          if (suspensionesError) throw new Error(suspensionesError);
          setSuspensiones(suspensionesData); // Use setSuspensiones
          setLoading(true);
          // Fetch activities
          // Use getCollection and map Firestore data to the Activity interface
          const { data: firestoreActivities, error: actividadesError } = await getCollection<any>('actividades'); // Fetch as 'any' initially

          const actividadesData: Activity[] = firestoreActivities?.map((item: any) => ({
              id: item.id,
              title: item.nombre, // Map 'nombre' to 'title'
              description: item.descripcion || '', // Map 'descripcion'
              imageUrl: item.imageUrl || '', // Map 'imageUrl'
              ...item // Include other fields
          })) || [];
          if (actividadesError) throw new Error(actividadesError);
          setActividades(actividadesData || []);


          // Fetch reservas and convert date fields
          const { data: firestoreReservas, error: reservasError } = await getCollection<any>('reservas'); // Fetch as 'any' initially
          const reservasData: Reserva[] = firestoreReservas?.map((item: any) => ({
              id: item.id,
              ...item,
              fechaActividad: item.fechaActividad?.toDate ? item.fechaActividad.toDate() : item.fechaActividad, // Convert Timestamp to Date
              fechaFinActividad: item.fechaFinActividad?.toDate ? item.fechaFinActividad.toDate() : item.fechaFinActividad, // Convert Timestamp to Date (optional)
              fechaReserva: item.fechaReserva?.toDate ? item.fechaReserva.toDate() : item.fechaReserva, // Convert Timestamp to Date
          })) || [];
          if (reservasError) throw new Error(reservasError);
          setReservas(reservasData); // Use setReservas

          const today = new Date();
          const upcomingWeeks = 2; // Number of weeks to calculate upcoming sessions

          const processed: Activity[] = actividadesData.map(act => {
              if (act.tipoActividad === 'recurrente' && act.horariosDisponibles) {
                  const upcomingSessions = [];
                  const totalCapacity = act.cupo; // Use general cupo as base

                  for (let i = 0; i < upcomingWeeks * 7; i++) { // Check days in the next two weeks
                      const currentDate = addDays(today, i);
                      const currentDayName = format(currentDate, 'eeee', { locale: es }).toLowerCase(); // Get day name in Spanish

                      // Helper function to check if a date is within any suspension period
                      const isSuspended = (date: Date) => {
                          return suspensionesData.some(suspension =>
                              isWithinInterval(date, { start: suspension.fechaInicio, end: suspension.fechaFin })
                          );
                      };
                      // Check if current date is suspended
                      const isHoliday = isSuspended(currentDate); // Using isSuspended instead of holidaysDates


                      if (!isHoliday) {
                          act.horariosDisponibles.forEach(schedule => {
                              // Find sessions matching the day of the week
                              if (schedule.diaSemana.toLowerCase() === currentDayName) {
                                  // Combine date and time
                                  const sessionStartTime = parse(`${format(currentDate, 'yyyy-MM-dd')} ${schedule.horaInicio}`, 'yyyy-MM-dd HH:mm', new Date());
                                  const sessionEndTime = parse(`${format(currentDate, 'yyyy-MM-dd')} ${schedule.horaFin}`, 'yyyy-MM-dd HH:mm', new Date());

                                  // Only include sessions in the future
                                  if (isAfter(sessionStartTime, today)) {
                                      // Logic to calculate cupos will go here in the next step
                                      const sessionReservas = reservasData?.filter(res =>
                                          res.actividadId === act.id && // Check activity ID
                                          res.fechaActividad.getTime() === sessionStartTime.getTime() // Compare timestamps
                                      ) || [];

                                      const reservedCupos = sessionReservas.reduce((sum, res) => sum + res.cupoTomado, 0);
                                      const sessionCapacity = schedule.cupoEspecifico !== undefined ? schedule.cupoEspecifico : totalCapacity;
                                      const calculatedCupoDisponible = sessionCapacity - reservedCupos;


                                      upcomingSessions.push({
                                          date: currentDate,
                                          startTime: sessionStartTime,
                                          endTime: sessionEndTime,
                                          originalSchedule: schedule, // Keep original schedule info
                                          calculatedCupoDisponible: calculatedCupoDisponible,
                                          totalCapacity: sessionCapacity
                                      });
                                  }
                              }
                          });
                      }
                  }

                  return { ...act, upcomingSessions }; // Add calculated sessions to activity
              } else if (act.tipoActividad === 'musculacion') {
              // For musculacion, maybe just add general info or process horariosMusculacion if needed later
              // For now, return the activity as is
              return act;
          }
           return act; // Return other activity types as is
        }) || [];

          setProcessedActivities(processed); // Set the processed data


      } catch (err: any) {
          setError(err.message);
          console.error("Error fetching gym data:", err);
      } finally {
          setLoading(false);
      }
    };
    fetchData(); // Call the async function

  }, []); // Empty dependency array means this effect runs once on mount

 return { actividades, suspensiones, reservas, loading, error, processedActivities }; // Return suspensiones
};
