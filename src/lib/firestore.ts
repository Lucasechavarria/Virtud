import { db } from '@/firebaseConfig'; // Assuming you exported db from firebaseConfig.ts
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, CollectionReference, DocumentData, Firestore } from 'firebase/firestore';
import { Activity } from '@/types/activity'; // Import Activity interface from shared types

interface FirestoreResponse<T = any> {
  data?: T;
  error?: string;
}

// Helper to get a collection reference
const getCollectionRef = (collectionName: string): CollectionReference<DocumentData> => {
  return collection(db as Firestore, collectionName);
};

// Get all documents from a collection
export const getCollection = async <T>(collectionName: string): Promise<FirestoreResponse<T[]>> => {
  try {
    const querySnapshot = await getDocs(getCollectionRef(collectionName));
    let data: T[] = [];

    // Use a more flexible mapping depending on the expected type T
    data = querySnapshot.docs.map(doc => {
      if (collectionName === 'actividades') {
        // Explicitly map to Activity structure when getting activities
        return {
          id: doc.id,
          title: doc.data().nombre as string,
          description: doc.data().descripcion as string,
          imageUrl: doc.data().imageUrl || '/images/placeholder.svg',
          schedule: doc.data().schedule as string | undefined,
        } as T; // Cast to T (which should be Activity in this case)

      }
      return { id: doc.id, ...doc.data() } as T;
    }); // <-- Paréntesis de cierre agregado aquí
    return { data };
  } catch (error: any) {
    console.error("Error getting collection:", error);
    return { error: error.message };
  }
};

// Get a specific document by ID from a collection
export const getDocument = async <T>(collectionName: string, documentId: string): Promise<FirestoreResponse<T>> => {
  try {
    const docRef = doc(getCollectionRef(collectionName), documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { data: { id: docSnap.id, ...docSnap.data() } as T };
    } else {
      return { error: "Document not found" };
    }
  } catch (error: any) {
    console.error("Error getting document:", error);
    return { error: error.message };
  }
};

// Add a new document to a collection
export const addDocument = async <T>(collectionName: string, data: Omit<T, 'id'>): Promise<FirestoreResponse<{ id: string }>> => {
  try {
    const docRef = await addDoc(getCollectionRef(collectionName), data);
    return { data: { id: docRef.id } };
  } catch (error: any) {
    console.error("Error adding document:", error);
    return { error: error.message };
  }
};

// Update an existing document in a collection
export const updateDocument = async <T>(collectionName: string, documentId: string, data: Partial<Omit<T, 'id'>>): Promise<FirestoreResponse<void>> => {
  try {
    const docRef = doc(getCollectionRef(collectionName), documentId);
    await updateDoc(docRef, data);
    return { data: undefined }; // Indicate success
  } catch (error: any) {
    console.error("Error updating document:", error);
    return { error: error.message };
  }
};

// Delete a document from a collection
export const deleteDocument = async (collectionName: string, documentId: string): Promise<FirestoreResponse<void>> => {
  try {
    const docRef = doc(getCollectionRef(collectionName), documentId);
    await deleteDoc(docRef);
    return { data: undefined }; // Indicate success
  } catch (error: any) {
    console.error("Error deleting document:", error);
    return { error: error.message };
  }
};