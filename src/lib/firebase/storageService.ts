import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, isFirebaseConfigured } from './config';

/**
 * Sube un documento (PDF, CV, Cédula) a Firebase Cloud Storage
 * En el plan Spark de Firebase se tienen 5 GB de almacenamiento gratuito.
 */
export async function uploadDocumentToFirebase(
  teacherId: string, 
  file: File, 
  category: string
): Promise<{ id: string; name: string; category: string; uploadDate: string; url: string }> {
  const fileId = `doc-${Date.now()}`;
  const filename = `${fileId}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
  const uploadDate = new Date().toISOString().split('T')[0];

  if (!isFirebaseConfigured || !storage) {
    // Local mock fallback URL
    return {
      id: fileId,
      name: file.name,
      category,
      uploadDate,
      url: `/mock-storage/teachers/${teacherId}/${filename}`
    };
  }

  try {
    const storageRef = ref(storage, `teachers/${teacherId}/documents/${filename}`);
    const snapshot = await uploadBytes(storageRef, file, {
      contentType: file.type || 'application/pdf',
      customMetadata: {
        category,
        teacherId,
        uploadedAt: uploadDate
      }
    });

    const downloadUrl = await getDownloadURL(snapshot.ref);

    return {
      id: fileId,
      name: file.name,
      category,
      uploadDate,
      url: downloadUrl
    };
  } catch (error) {
    console.error('Error uploading file to Firebase Storage:', error);
    throw error;
  }
}
