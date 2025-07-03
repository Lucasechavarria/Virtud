import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '@/firebaseConfig'; // Import auth directly from firebaseConfig.ts
import { Button } from "@/components/ui/button";
import { FirebaseError } from 'firebase/app'; // Import FirebaseError
import { addDocument } from '@/lib/firestore'; // Import addDocument
import { useToast } from "@/components/ui/use-toast"; // Import useToast
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from 'react-icons/fc'; // Import Google icon
import { LoaderCircle } from 'lucide-react'; // Import LoaderCircle icon

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nombre, setNombre] = useState(''); // Estado para nombre
  const [telefono, setTelefono] = useState(''); // Estado para telefono
  const [edad, setEdad] = useState(''); // Estado para edad
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null); // Estado para el manejo de errores
  const [isLoading, setIsLoading] = useState(false); // Estado para el indicador de carga

  const { toast } = useToast(); // Use useToast hook

  if (!isOpen) {
    return null;
  }

  const handleEmailPasswordSignIn = async () => {
    setError(null); // Limpiar errores previos

    // Validaciones básicas
    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    setIsLoading(true); // Iniciar carga
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "¡Éxito!",
        description: "Has iniciado sesión correctamente.",
        variant: "default"
      });
      onClose(); // Close modal on success
    } catch (error) {
      const errorMessage = error instanceof FirebaseError ? error.message : 'Ocurrió un error desconocido durante el inicio de sesión.';
      setError(errorMessage);
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoading(false); // Finalizar carga
    }
  };

  const handleEmailPasswordSignUp = async () => {
    setError(null); // Limpiar errores previos

    // Validaciones básicas
    if (!email || !password || !confirmPassword || (isRegistering && (!nombre || !telefono || !edad))) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setIsLoading(true); // Iniciar carga
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar información adicional del usuario en Firestore
      await addDocument('usuarios', {
        nombre: nombre,
        telefono: telefono,
        edad: parseInt(edad, 10), // Convertir edad a número
        correoElectronico: email,
        uid: user.uid,
      });

      toast({
        title: "¡Éxito!",
        description: "Tu cuenta ha sido creada exitosamente.",
        variant: "default"
      });

      // Limpiar campos después del registro exitoso
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setNombre('');
      setTelefono('');
      setEdad('');
      onClose(); // Close modal on success
    } catch (error: any) {
      const errorMessage = error instanceof FirebaseError ? error.message : 'Ocurrió un error desconocido durante el registro.';
      setError(errorMessage);
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoading(false); // Finalizar carga
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null); // Limpiar errores previos
    setIsLoading(true); // Iniciar carga
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log("User signed in with Google successfully!");
      toast({ title: "¡Éxito!", description: "Has iniciado sesión con Google.", variant: "default" });
      onClose(); // Close modal on success
    } catch (error) {
      const errorMessage = error instanceof FirebaseError ? error.message : 'Ocurrió un error desconocido durante el inicio de sesión con Google.';
      setError(errorMessage);
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
      console.error("Google Sign-In Error:", error); // Log the actual error for debugging
    } finally {
      setIsLoading(false); // Finalizar carga
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-sm mx-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isRegistering) {
              handleEmailPasswordSignUp();
            } else {
              handleEmailPasswordSignIn();
            }
          }}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading} // Deshabilitar input mientras carga
            />
          </div>
          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading} // Deshabilitar input mientras carga
            />
          </div>
          {isRegistering && ( // Campos adicionales para el registro
            <>
              <div>
                <Label htmlFor="nombre">Nombre Completo</Label>
                <Input
                  id="nombre"
                  type="text"
                  placeholder="Tu Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  disabled={isLoading} // Deshabilitar input mientras carga
                />
              </div>
              <div>
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  type="tel" // Usar tipo tel para teléfonos
                  placeholder="+YYXZZZZZZZZ"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  disabled={isLoading} // Deshabilitar input mientras carga
                />
              </div>
              <div>
                <Label htmlFor="edad">Edad</Label>
                <Input
                  id="edad"
                  type="number"
                  placeholder="Edad"
                  value={edad}
                  onChange={(e) => setEdad(e.target.value)}
                  disabled={isLoading} // Deshabilitar input mientras carga
                />
              </div>
            </>
          )}
          {isRegistering && (
            <div>
              <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading} // Deshabilitar input mientras carga
              />
            </div>)}

          <Button type="submit" className="w-full mt-4" disabled={isLoading}> {/* Deshabilitar botón mientras carga */}
            {isLoading ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin text-virtud-orange-500 dark:text-virtud-orange-400" />
            ) : (
              isRegistering ? 'Registrarse' : 'Iniciar Sesión'
            )}
          </Button>
          {error && ( // Mostrar el mensaje de error si existe
            <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
          )}
          <div className="relative pt-4"> {/* Added padding-top for spacing */}
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300 dark:border-gray-600"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                O continuar con
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
            onClick={handleGoogleSignIn}
            disabled={isLoading} // Deshabilitar botón mientras carga
          >
             {isLoading && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin text-virtud-orange-500 dark:text-virtud-orange-400" />
            )}
            <FcGoogle className="h-5 w-5" /> {/* Google Icon */}
            Iniciar Sesión con Google
          </Button>
        </form>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          {isRegistering ? '¿Ya tienes una cuenta? ' : '¿No tienes una cuenta? '}
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-virtud-orange-500 hover:underline"
            disabled={isLoading} // Deshabilitar botón mientras carga
          >
            {isRegistering ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </p>
        <Button variant="ghost" className="mt-4 w-full text-gray-600 dark:text-gray-400" onClick={onClose} disabled={isLoading}>
          Cerrar
        </Button>
      </div>
    </div>
  );
};

export default AuthModal;
