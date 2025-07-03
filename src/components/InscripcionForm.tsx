// src/components/InscripcionForm.tsx
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/context/AuthContext'; // Para obtener el usuario autenticado
import { addDocument, updateDocument, getDocument } from '@/lib/firestore'; // Importar getDocument
import { UserDocumentData, ContactoEmergencia } from '@/types/user'; // Importar las interfaces de usuario
import { LoaderCircle } from 'lucide-react';

const InscripcionForm: React.FC = () => {
  const { user } = useAuth(); // Obtener el usuario autenticado
  const { toast } = useToast();

  // Estados para los campos del formulario
  const [contactoEmergenciaNombre, setContactoEmergenciaNombre] = useState('');
  const [contactoEmergenciaDireccion, setContactoEmergenciaDireccion] = useState('');
  const [contactoEmergenciaTelefono, setContactoEmergenciaTelefono] = useState('');
  const [contactoEmergenciaParentezco, setContactoEmergenciaParentezco] = useState('');
  const [estadoSalud, setEstadoSalud] = useState('');
  const [patologiasPrevias, setPatologiasPrevias] = useState('');
  const [factorTipoSangre, setFactorTipoSangre] = useState('');
  const [medicaciones, setMedicaciones] = useState('');
  const [operacionesIntervenciones, setOperacionesIntervenciones] = useState('');
  const [isFetchingUser, setIsFetchingUser] = useState(true); // Estado para la carga inicial del usuario
  const [error, setError] = useState<string | null>(null);

  // Asegúrate de que también tienes estados para nombre, teléfono y edad
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [edad, setEdad] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para la carga del envío del formulario

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Limpiar errores
    setIsLoading(true); // Iniciar carga

    if (!user) {
      setError("Debes estar autenticado para completar la inscripción.");
      setIsLoading(false);
      return;
    }

    // Validaciones básicas (puedes añadir más)
    if (!nombre || !telefono || !edad || !contactoEmergenciaNombre || !contactoEmergenciaTelefono || !estadoSalud) {
        setError("Por favor, completa al menos los campos obligatorios (Contacto de Emergencia Nombre y Teléfono, y Estado de Salud).");
        setIsLoading(false);
        return;
      }


    try {
      // Aquí guardaremos los datos adicionales del perfil.
      // Usaremos el UID del usuario como identificador.
      // Podemos usar addDocument si es la primera vez que se completa el formulario,
      // o updateDocument si ya existe un perfil parcial creado durante el registro.
      // Para simplificar ahora, asumiremos que siempre creamos o actualizamos
      // el documento de usuario con el UID.

      // Incluir los datos básicos que pueden haber sido registrados con el AuthModal
      // o modificados en este formulario.
      
      await updateDocument('usuarios', user.uid, {
        // Datos del contacto de emergencia
        contactoEmergencia: {
          nombre: contactoEmergenciaNombre,
          direccion: contactoEmergenciaDireccion,
          telefono: contactoEmergenciaTelefono,
          parentezco: contactoEmergenciaParentezco,
        },
        // Datos de salud
        estadoSalud: estadoSalud,
        patologiasPrevias: patologiasPrevias,
        factorTipoSangre: factorTipoSangre,
        medicaciones: medicaciones,
        operacionesIntervenciones: operacionesIntervenciones,
        // Nota sobre apto físico
        notaAptoFisico: "Debe subir un apto físico a su perfil.",
        // Puedes añadir un flag para saber si la inscripción detallada está completa
        inscripcionCompleta: true,
      });


      toast({
        title: "¡Éxito!",
        description: "Tu información de inscripción ha sido guardada.",
        variant: "default",
      });

      // Limpiar campos después del envío exitoso (opcional)
      setContactoEmergenciaNombre('');
      setContactoEmergenciaDireccion('');
      setContactoEmergenciaTelefono('');
      setContactoEmergenciaParentezco('');
      setEstadoSalud('');
      setPatologiasPrevias('');
      setFactorTipoSangre('');
      setMedicaciones('');
      setOperacionesIntervenciones('');


      // Redirigir al usuario (ej. a la página de perfil o inicio)
      // Nota: La redirección debe hacerse con `react-router-dom` hooks (useNavigate)
      // que no están disponibles en este componente funcional simple.
      // Tendrás que añadirlo al integrar.

    } catch (error: any) {
      setError('Ocurrió un error al guardar la información: ' + error.message);
      toast({
        title: "Error",
        description: 'Ocurrió un error al guardar la información.',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false); // Finalizar carga
    }
  };

  // Effect hook para cargar los datos del usuario al montar el componente
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        setIsFetchingUser(true); // Iniciar carga de datos del usuario
        try {
          // Asumiendo que tienes una función getDocument en lib/firestore
          const userData = await getDocument<UserDocumentData>('usuarios', user.uid); // Tipar la respuesta

          if (userData) {
            // Check if data property exists and is not null/undefined
            if (userData.data) {
              // Establecer los estados del formulario con los datos existentes desde userData.data
              setNombre(userData.data.nombre || '');
              setTelefono(userData.data.telefono || '');
              setEdad(userData.data.edad ? String(userData.data.edad) : ''); // Convertir a string si es un número
              setContactoEmergenciaNombre(userData.data.contactoEmergencia?.nombre || '');
              setContactoEmergenciaDireccion(userData.data.contactoEmergencia?.direccion || '');
              setContactoEmergenciaTelefono(userData.data.contactoEmergencia?.telefono || '');
              setContactoEmergenciaParentezco(userData.data.contactoEmergencia?.parentezco || '');
              setEstadoSalud(userData.data.estadoSalud || '');
              setPatologiasPrevias(userData.data.patologiasPrevias || '');
              setFactorTipoSangre(userData.data.factorTipoSangre || '');
              setMedicaciones(userData.data.medicaciones || '');
              setOperacionesIntervenciones(userData.data.operacionesIntervenciones || '');
            } else {
              // Handle the case where the document doesn't exist (e.g., a brand new user)
              console.log("User document not found in Firestore, likely a new user.");
            }
          }
        } catch (err: any) {
          console.error("Error fetching user data:", err);
          // Puedes añadir manejo de errores para la carga inicial si es necesario
        } finally {
          setIsFetchingUser(false); // Finalizar carga de datos del usuario
        }
      }
    };
    fetchUserData();
  }, [user]); // Ejecutar este efecto solo cuando el usuario cambie (o al montar si user ya está ahí)

  return (
    <div className="container mx-auto p-4">
 {isFetchingUser ? (
        <div className="text-center">Cargando datos del usuario...</div>
      ) : (
      <> {/* Usamos un Fragment para envolver el contenido cuando la carga inicial termina */}
      <h2 className="text-2xl font-bold text-center mb-6">Formulario de Inscripción Detallada</h2>
      {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sección Contacto de Emergencia */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Contacto de Emergencia</h3>
          {/* Campos básicos que pueden venir del registro inicial */}
         <div>
            <Label htmlFor="nombre">Nombre Completo</Label>
            <Input id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} disabled={isFetchingUser} />
         </div>
         <div>
            <Label htmlFor="telefono">Teléfono</Label>
            <Input id="telefono" type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} disabled={isFetchingUser} />
         </div>
         <div>
            <Label htmlFor="edad">Edad</Label>
            <Input id="edad" type="number" value={edad} onChange={(e) => setEdad(e.target.value)} disabled={isFetchingUser} />
         </div>

          {/* Lógica para Menores (pendiente de implementar la condicional) */}
          {/* Si la edad (ahora disponible en el estado `edad`) es < 18,
              mostrar campos adicionales para autorización de padres/tutores.
              Necesitarás añadir esos campos aquí dentro de una condición. */}
          {/* Campos de contacto de emergencia */}
          <div className="pt-4 border-t mt-4"> {/* Separador visual */}
            <div>
            <Label htmlFor="emergencia-nombre">Nombre Completo</Label>
            <Input id="emergencia-nombre" value={contactoEmergenciaNombre} onChange={(e) => setContactoEmergenciaNombre(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="emergencia-direccion">Dirección</Label>
            <Input id="emergencia-direccion" value={contactoEmergenciaDireccion} onChange={(e) => setContactoEmergenciaDireccion(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="emergencia-telefono">Teléfono</Label>
            <Input id="emergencia-telefono" type="tel" value={contactoEmergenciaTelefono} onChange={(e) => setContactoEmergenciaTelefono(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="emergencia-parentezco">Parentezco</Label>
            <Input id="emergencia-parentezco" value={contactoEmergenciaParentezco} onChange={(e) => setContactoEmergenciaParentezco(e.target.value)} />
          </div>
         </div> {/* Cierre del div separador */}
        </div> {/* Cierre de Sección Contacto de Emergencia */}

        {/* Sección Información de Salud */}
        <div className="space-y-2">
           <h3 className="text-lg font-semibold">Información de Salud</h3>
           <div>
            <Label htmlFor="estado-salud">Estado General de Salud</Label>
            <Textarea id="estado-salud" value={estadoSalud} onChange={(e) => setEstadoSalud(e.target.value)} placeholder="Describe tu estado de salud actual" />
          </div>
          <div>
            <Label htmlFor="patologias">Patologías Previas</Label>
            <Textarea id="patologias" value={patologiasPrevias} onChange={(e) => setPatologiasPrevias(e.target.value)} placeholder="Enfermedades o condiciones médicas pasadas" />
          </div>
          <div>
            <Label htmlFor="sangre">Factor y Tipo de Sangre</Label>
            <Input id="sangre" value={factorTipoSangre} onChange={(e) => setFactorTipoSangre(e.target.value)} placeholder="Ej: A+, O-" />
          </div>
          <div>
            <Label htmlFor="medicaciones">Medicaciones Actuales</Label>
            <Textarea id="medicaciones" value={medicaciones} onChange={(e) => setMedicaciones(e.target.value)} placeholder="Lista de medicamentos que tomas actualmente" />
          </div>
           <div>
            <Label htmlFor="operaciones">Operaciones o Intervenciones Previas</Label>
            <Textarea id="operaciones" value={operacionesIntervenciones} onChange={(e) => setOperacionesIntervenciones(e.target.value)} placeholder="Cirugías o procedimientos médicos pasados" />
          </div>
           <p className="text-sm text-gray-600 dark:text-gray-400">
             Importante: Deberás subir un certificado de apto físico a tu perfil una vez completado este formulario.
           </p>
        </div> {/* Cierre de Sección Información de Salud */}

        {/* Botón de envío. Deshabilitado si está guardando O si está cargando los datos iniciales */}

<Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
             <LoaderCircle className="mr-2 h-4 w-4 animate-spin text-virtud-orange-500 dark:text-virtud-orange-400" />
          ) : (
            'Guardar Información de Inscripción'
          )}
        </Button> {/* Cierre del botón */}
      </form>
      </>
      )} {/* Cierre de la condición ternaria de isFetchingUser */}
    </div>
  );
};

export default InscripcionForm;
