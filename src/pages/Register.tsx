
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { signUpWithEmail, linkPhoneToProfile } from "@/integrations/supabase/auth";
import PhoneVerification from "@/components/PhoneVerification";
import { Check } from "lucide-react";

enum RegistrationStep {
  EMAIL,
  PHONE,
  COMPLETE
}

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<RegistrationStep>(RegistrationStep.EMAIL);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Las contraseñas no coinciden",
        description: "Por favor verifica que ambas contraseñas sean iguales.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Registrar usuario con correo y contraseña
    const { data, error } = await signUpWithEmail(email, password);
    
    setIsLoading(false);
    
    if (error) {
      toast({
        title: "Error de registro",
        description: error.message,
        variant: "destructive"
      });
      return;
    }
    
    // Si el registro fue exitoso, guardamos el ID del usuario
    if (data && data.user) {
      setUserId(data.user.id);
      toast({
        title: "Registro exitoso",
        description: "Ahora verifica tu número telefónico para completar el registro"
      });
      setStep(RegistrationStep.PHONE);
    }
  };
  
  const handlePhoneVerified = async (phoneUserId: string | null) => {
    // Si ya existe un usuario con este teléfono
    if (phoneUserId) {
      toast({
        title: "Error de verificación",
        description: "Este número de teléfono ya está asociado con otra cuenta",
        variant: "destructive"
      });
      return;
    }
    
    // Proceder a la siguiente etapa
    setStep(RegistrationStep.COMPLETE);
  };
  
  const handlePhoneRegistration = async (phone: string) => {
    if (!userId) return;
    
    setIsLoading(true);
    
    const { success, error } = await linkPhoneToProfile(userId, phone);
    
    setIsLoading(false);
    
    if (error) {
      toast({
        title: "Error",
        description: "No se pudo vincular el teléfono: " + error.message,
        variant: "destructive"
      });
      return;
    }
    
    if (success) {
      toast({
        title: "¡Registro completado!",
        description: "Tu cuenta ha sido creada exitosamente"
      });
      navigate("/");
    } else {
      toast({
        title: "Error",
        description: "Este número de teléfono ya está asociado con otra cuenta",
        variant: "destructive"
      });
    }
  };

  return (
    <Layout>
      <div className="container max-w-md mx-auto py-12 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Crear Cuenta</h1>
            <p className="text-gray-600 mt-2">Únete a la comunidad de Chambier</p>
          </div>

          {step === RegistrationStep.EMAIL && (
            <>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold">
                  1
                </div>
                <div className="text-sm font-medium">Ingresa tus datos personales</div>
              </div>
            
              <form onSubmit={handleEmailSignup} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    placeholder="Nombre y apellido"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="btn-primary w-full" disabled={isLoading}>
                  {isLoading ? "Registrando..." : "Continuar"}
                </Button>
              </form>
            </>
          )}
          
          {step === RegistrationStep.PHONE && (
            <>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold">
                  2
                </div>
                <div className="text-sm font-medium">Verifica tu número de teléfono</div>
              </div>
              
              <PhoneVerification onVerified={handlePhoneVerified} />
            </>
          )}
          
          {step === RegistrationStep.COMPLETE && (
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-bold mb-2">¡Registro Exitoso!</h2>
              <p className="text-gray-600 mb-6">Tu cuenta ha sido creada correctamente.</p>
              <Button onClick={() => navigate("/")} className="w-full">
                Ir al Inicio
              </Button>
            </div>
          )}

          <div className="mt-6 text-center text-sm">
            <p>
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="text-chambier-bright hover:underline font-medium">
                Inicia Sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
