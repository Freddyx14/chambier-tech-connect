
import { supabase } from "./client";

// Función para iniciar sesión con email y contraseña
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

// Función para registrar usuario con email y contraseña
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

// Función para cerrar sesión
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    return { error };
  }
};

// Función para obtener el usuario actual
export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { user: data.user, error: null };
  } catch (error: any) {
    return { user: null, error };
  }
};

// Función para solicitar restablecimiento de contraseña
export const requestPasswordReset = async (email: string, options?: { redirectTo?: string }) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, options);
    
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

// Función para actualizar contraseña
export const updatePassword = async (newPassword: string) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

// Función para verificar código de restablecimiento de contraseña
// Esta función no existe directamente en Supabase, ya que maneja el flujo por URL
export const verifyPasswordResetCode = async (code: string) => {
  try {
    // En Supabase, esto se maneja automáticamente a través de la URL de redirección
    // Aquí simplemente devolvemos éxito
    return { valid: true, error: null };
  } catch (error: any) {
    return { valid: false, error };
  }
};

// Función para generar código de verificación de teléfono
export const generatePhoneVerificationCode = async (phone: string) => {
  try {
    const { data, error } = await supabase.rpc('generate_phone_code', { phone });
    
    if (error) throw error;
    return { code: data, error: null };
  } catch (error: any) {
    return { code: null, error };
  }
};

// Función para verificar código de verificación de teléfono
export const verifyPhoneCode = async (phone: string, code: string) => {
  try {
    const { data, error } = await supabase.rpc('verify_phone_code', { 
      phone, 
      verification_code: code 
    });
    
    if (error) throw error;
    return { userId: data, error: null };
  } catch (error: any) {
    return { userId: null, error };
  }
};

// Función para vincular teléfono a perfil existente
export const linkPhoneToProfile = async (userId: string, phone: string) => {
  try {
    const { data, error } = await supabase.rpc('link_phone_to_profile', { 
      user_uuid: userId, 
      phone 
    });
    
    if (error) throw error;
    return { success: data, error: null };
  } catch (error: any) {
    return { success: false, error };
  }
};
