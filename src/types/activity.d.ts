

interface Activity {
  id: string; // Firestore Document ID
  title: string; // Nombre de la actividad
  description: string; // Descripción detallada
  imageUrl?: string; // URL de la imagen (opcional)
  schedule?: string; // Horario general o texto libre (opcional)
  tipoActividad: 'recurrente' | 'musculacion'; // Added
  ubicacion?: string; // Added
  cupo: number; // Added
  duracionMinutos?: number; // Added - Requerido para recurrente but optional in interface definition
  edadMinima?: number; // Added
  edadMaxima?: number; // Added
  horariosDisponibles?: Array<{ diaSemana: string; horaInicio: string; horaFin: string; cupoEspecifico?: number }>; // Added
  horarioMusculacion?: { lunesViernes: { apertura: string; cierre: string }; sabado: { apertura: string; cierre: string } }; // Added
}

interface Suspension {
  id: string;
  afectaReservasExistentes: boolean;
  creadoPor: string;
  fechaCreacion: Date;
  fechaFin: Date;
  fechaInicio: Date;
  motivo: string;
}
interface Suspension {
  id: string;
  afectaReservasExistentes: boolean;
  creadoPor: string;
  fechaCreacion: Date;
  fechaFin: Date;
  fechaInicio: Date;
  motivo: string;
}

interface Reserva {
  id: string;
  usuarioId: string;
  actividadId: string;
  fechaActividad: Date; // Use Date type
  fechaFinActividad?: Date; // Use Date type
  fechaReserva: Date; // Use Date type
  estado?: string;
  cupoTomado: number;
}
export { Activity, Suspension, Reserva };