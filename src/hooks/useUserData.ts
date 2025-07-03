import { useEffect, useState } from 'react';
import { getDocument } from '@/lib/firestore'; // Assuming getDocument is in src/lib/firestore.ts

interface UserData {
  nombre: string;
  telefono: string;
  edad: number;
  correoElectronico: string;
  uid: string;
  // Add other user fields as per your Firestore structure
}

const useUserData = (uid: string | null | undefined) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!uid) {
        setUserData(null);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const data = await getDocument('usuarios', uid);
        if (data) {
          setUserData(data as UserData);
        } else {
          setUserData(null); // User document not found
        }
      } catch (err: any) {
        setError(err);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [uid]); // Re-run effect when uid changes

  return { userData, loading, error };
};

export default useUserData;