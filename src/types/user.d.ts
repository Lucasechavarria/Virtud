export interface ContactoEmergencia {
  nombre: string;
  direccion?: string;
  telefono: string;
  parentezco?: string;
}

export interface UserDocumentData {
  nombre: string;
  telefono: string;
  edad: number;
  correoElectronico: string;
  uid: string;
  contactoEmergencia?: ContactoEmergencia;
  estadoSalud?: string;
  patologiasPrevias?: string;
  factorTipoSangre?: string;
  medicaciones?: string;
  operacionesIntervenciones?: string;
  notaAptoFisico?: string;
  inscripcionCompleta?: boolean;
}