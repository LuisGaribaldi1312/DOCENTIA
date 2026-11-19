import { supabase, isSupabaseConfigured } from './client';

export const DOCUMENTS_BUCKET = 'docentia-documents';

export interface UploadedDocResult {
  id: string;
  name: string;
  category: string;
  uploadDate: string;
  url: string;
}

/**
 * Sube un documento (Título, Cédula Profesional, CV, Antecedentes) a Supabase Storage.
 */
export async function uploadDocumentToSupabase(
  teacherId: string,
  file: File,
  category: string
): Promise<UploadedDocResult> {
  const fileId = `doc-${Date.now()}`;
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const filePath = `teachers/${teacherId}/${fileId}_${sanitizedName}`;
  const uploadDate = new Date().toISOString().split('T')[0];

  if (!isSupabaseConfigured) {
    return {
      id: fileId,
      name: file.name,
      category,
      uploadDate,
      url: `/mock-storage/${filePath}`
    };
  }

  try {
    const { data, error } = await supabase.storage
      .from(DOCUMENTS_BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
        contentType: file.type || 'application/pdf'
      });

    if (error) {
      console.warn('Supabase storage upload error, returning local fallback preview:', error.message);
      return {
        id: fileId,
        name: file.name,
        category,
        uploadDate,
        url: URL.createObjectURL(file)
      };
    }

    const { data: publicUrlData } = supabase.storage
      .from(DOCUMENTS_BUCKET)
      .getPublicUrl(data.path);

    return {
      id: fileId,
      name: file.name,
      category,
      uploadDate,
      url: publicUrlData.publicUrl
    };
  } catch (err) {
    console.warn('Error connecting to Supabase Storage, using fallback:', err);
    return {
      id: fileId,
      name: file.name,
      category,
      uploadDate,
      url: URL.createObjectURL(file)
    };
  }
}
