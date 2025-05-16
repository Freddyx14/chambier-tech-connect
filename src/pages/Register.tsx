
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone } from "lucide-react";

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
  const [registrationType, setRegistrationType] = useState<"email" | "phone">("email");
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
    
    if (registrationType === "email") {
      // Si el registro es por email, procedemos a la siguiente etapa
      setStep(RegistrationStep.COMPLETE);
    } else {
      // Si el registro es por teléfono, completamos el registro
      completePhoneRegistration();
    }
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

  const completePhoneRegistration = () => {
    toast({
      title: "¡Registro completado!",
      description: "Tu cuenta ha sido creada exitosamente"
    });
    navigate("/");
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
                <div className="text-sm font-medium">
                  {registrationType === "email" 
                    ? "Ingresa tus datos personales" 
                    : "Verifica tu número de teléfono"}
                </div>
              </div>

              <Tabs 
                defaultValue={registrationType} 
                className="w-full"
                onValueChange={(value) => setRegistrationType(value as "email" | "phone")}
              >
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="email" className="flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="phone" className="flex items-center">
                    <Phone className="mr-2 h-4 w-4" />
                    Teléfono
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="email">
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
                </TabsContent>
                
                <TabsContent value="phone">
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 mb-2">
                      Ingresa y verifica tu número de celular peruano para crear tu cuenta
                    </p>
                    <PhoneVerification onVerified={handlePhoneVerified} />
                  </div>
                </TabsContent>
              </Tabs>
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
