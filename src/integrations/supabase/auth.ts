
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

// Función para iniciar sesión con teléfono y contraseña
export const signInWithPhone = async (phone: string, password: string) => {
  try {
    // Para simplificar, vamos a requerir que el usuario use email por ahora
    throw new Error("El inicio de sesión con teléfono no está disponible actualmente. Por favor use su email.");
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

// Función para registrar usuario con teléfono y contraseña
export const signUpWithPhone = async (phone: string, password: string, fullName: string, email?: string) => {
  try {
    // Generar un email temporal si no se proporcionó uno
    const userEmail = email || `${phone.replace(/[^0-9]/g, '')}@temp.chambier.com`;
    
    // Registramos el usuario en Supabase Auth con el email
    const { data, error } = await supabase.auth.signUp({
      email: userEmail,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone
        }
      }
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
export const verifyPasswordResetCode = async (code: string) => {
  try {
    // En Supabase, esto se maneja automáticamente a través de la URL de redirección
    return { valid: true, error: null };
  } catch (error: any) {
    return { valid: false, error };
  }
};

// Funciones simplificadas para códigos de verificación
export const generatePhoneVerificationCode = async (phone: string) => {
  try {
    // Por ahora retornamos un código mock para desarrollo
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`Código de verificación para ${phone}: ${code}`);
    return { code, error: null };
  } catch (error: any) {
    return { code: null, error };
  }
};

export const verifyPhoneCode = async (phone: string, code: string) => {
  try {
    // Verificación mock para desarrollo
    if (code === "123456") {
      return { userId: "mock-user-id", error: null };
    }
    throw new Error("Código inválido");
  } catch (error: any) {
    return { userId: null, error };
  }
};
