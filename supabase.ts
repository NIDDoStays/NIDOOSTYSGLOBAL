
import { createClient } from 'https://esm.sh/@supabase/supabase-js@^2.48.1';

// Estas variables se deben configurar en el panel de control del hosting (Vercel/Netlify)
// o en un archivo .env local para que la conexión sea exitosa.
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Función para subir documentos KYC (DNI/Selfies) al bucket de Supabase
 */
export const uploadKYCDocument = async (userId: string, file: File, folder: 'dni' | 'selfie') => {
  const fileName = `${userId}/${folder}/${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from('niddosty-docs')
    .upload(fileName, file);

  if (error) throw error;
  
  const { data: { publicUrl } } = supabase.storage
    .from('niddosty-docs')
    .getPublicUrl(fileName);
    
  return publicUrl;
};
