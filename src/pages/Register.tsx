
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
  INITIAL,
  VERIFICATION,
  COMPLETE
}

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<RegistrationStep>(RegistrationStep.INITIAL);
  const [userId, setUserId] = useState<string | null>(null);
  const [registrationType, setRegistrationType] = useState<"email" | "phone">("email");
  const { toast } = useToast();

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      toast({
        title: "Las contraseñas no coinciden",
        description: "Por favor verifica que ambas contraseñas sean iguales.",
        variant: "destructive"
      });
      return false;
    }
    if (password.length < 6) {
      toast({
        title: "Contraseña muy corta",
        description: "La contraseña debe tener al menos 6 caracteres.",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePasswords()) return;

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
    
    // Si el registro fue exitoso, completamos el proceso
    if (data && data.user) {
      toast({
        title: "Registro exitoso",
        description: "Se ha enviado un correo de verificación a tu dirección de email"
      });
      // Ya no necesitamos verificación de teléfono, vamos directamente a complete
      setStep(RegistrationStep.COMPLETE);
    }
  };

  const handlePhoneSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Nombre requerido",
        description: "Por favor ingresa tu nombre completo.",
        variant: "destructive"
      });
      return;
    }
    
    if (!validatePasswords()) return;
    
    // Continuar con la verificación del teléfono
    setStep(RegistrationStep.VERIFICATION);
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
    
    // Completamos el registro basado en verificación de teléfono
    setStep(RegistrationStep.COMPLETE);
    toast({
      title: "¡Registro completado!",
      description: "Tu cuenta ha sido creada exitosamente"
    });
    
    // Aquí se podría implementar la lógica adicional para crear una cuenta basada en teléfono
    // con el nombre, teléfono y contraseña ingresados
    
    // Redirigir al usuario a la página principal después de un breve retraso
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const renderPhoneVerification = () => (
    <div className="space-y-4">
      <PhoneVerification 
        onVerified={handlePhoneVerified} 
        initialPhone={phone}
        onPhoneChange={(newPhone) => setPhone(newPhone)}
      />
      
      <Button 
        variant="outline" 
        className="w-full mt-4"
        onClick={() => setStep(RegistrationStep.INITIAL)}
      >
        Volver
      </Button>
    </div>
  );

  return (
    <Layout>
      <div className="container max-w-md mx-auto py-12 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Crear Cuenta</h1>
            <p className="text-gray-600 mt-2">Únete a la comunidad de Chambier</p>
          </div>

          {step === RegistrationStep.INITIAL && (
            <>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold">
                  1
                </div>
                <div className="text-sm font-medium">
                  Ingresa tus datos personales
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
                      {isLoading ? "Registrando..." : "Crear cuenta"}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="phone">
                  <form onSubmit={handlePhoneSignup} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone-name">Nombre Completo</Label>
                      <Input
                        id="phone-name"
                        placeholder="Nombre y apellido"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone-number">Número de Celular</Label>
                      <Input
                        id="phone-number"
                        type="tel"
                        placeholder="+51 999 999 999"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Ingresa tu número con código de país (ej: +51 para Perú)
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone-password">Contraseña</Label>
                      <Input
                        id="phone-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone-confirmPassword">Confirmar Contraseña</Label>
                      <Input
                        id="phone-confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Continuar
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </>
          )}
          
          {step === RegistrationStep.VERIFICATION && (
            <>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold">
                  2
                </div>
                <div className="text-sm font-medium">Verifica tu número de teléfono</div>
              </div>
              
              {renderPhoneVerification()}
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
