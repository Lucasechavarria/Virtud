import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '@/firebaseConfig'; // Import auth directly from firebaseConfig.ts
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from 'react-icons/fc'; // Import Google icon

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleEmailPasswordSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in successfully!");
      onClose(); // Close modal on success
    } catch (error: any) {
      console.error("Error signing in with email and password:", error.message);
      // TODO: Display user-friendly error message
    }
  };

  const handleEmailPasswordSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden."); // Simple alert for now
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up successfully!");
      onClose(); // Close modal on success
    } catch (error: any) {
      console.error("Error signing up with email and password:", error.message);
      // TODO: Display user-friendly error message
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log("User signed in with Google successfully!");
      onClose(); // Close modal on success
    } catch (error: any) {
      console.error("Error signing in with Google:", error.message);
      // TODO: Display user-friendly error message
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
            />
          </div>
          {isRegistering && (
            <div>
              <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>)}
          <Button type="submit" className="w-full">
            {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
          </Button>
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
          <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700" onClick={handleGoogleSignIn}>
            <FcGoogle className="h-5 w-5" /> {/* Google Icon */}
            Iniciar Sesión con Google

          </Button>
        </form>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          {isRegistering ? '¿Ya tienes una cuenta? ' : '¿No tienes una cuenta? '}
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-virtud-orange-500 hover:underline"
          >
            {isRegistering ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </p>
        <Button variant="ghost" className="mt-4 w-full text-gray-600 dark:text-gray-400" onClick={onClose}>
          Cerrar
        </Button>
      </div>
    </div>
  );
};

export default AuthModal;