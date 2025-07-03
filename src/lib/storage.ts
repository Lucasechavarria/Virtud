import { storage } from '@/firebaseConfig';
import { ref, uploadBytes, getDownloadURL, StorageReference } from 'firebase/storage';

/**
 * Sube un archivo a Firebase Storage.
 * @param file El archivo a subir.
 * @param path La ruta de destino en Storage (incluyendo el nombre del archivo).
 * @returns Una promesa que se resuelve cuando la subida se completa.
 */
export const uploadFile = async (file: File, path: string): Promise<void> => {
  try {
    const storageRef: StorageReference = ref(storage, path);
    await uploadBytes(storageRef, file);
    console.log('Archivo subido con éxito:', path);
  } catch (error: any) {
    console.error('Error al subir el archivo:', error.message);
    throw error; // Re-lanza el error para que pueda ser manejado por quien llama la función
  }
};

/**
 * Descarga la URL de un archivo desde Firebase Storage.
 * @param path La ruta del archivo en Storage.
 * @returns Una promesa que se resuelve con la URL de descarga del archivo.
 */
export const downloadFile = async (path: string): Promise<string> => {
  try {
    const storageRef: StorageReference = ref(storage, path);
    const url = await getDownloadURL(storageRef);
    console.log('URL de descarga obtenida:', url);
    return url;
  } catch (error: any) {
    console.error('Error al obtener la URL de descarga:', error.message);
    throw error; // Re-lanza el error para que pueda ser manejado por quien llama la función
  }
};