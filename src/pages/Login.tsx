
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInWithEmail, signInWithPhone, linkPhoneToProfile } from "@/integrations/supabase/auth";
import PhoneVerification from "@/components/PhoneVerification";
import { Mail, Phone, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [phonePassword, setPhonePassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationStep, setVerificationStep] = useState<"email" | "phone" | "linking">("email");
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showPhonePassword, setShowPhonePassword] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await signInWithEmail(email, password);
    
    if (error) {
      setIsLoading(false);
      toast({
        title: "Error de inicio de sesión",
        description: error.message,
        variant: "destructive"
      });
      return;
    }
    
    // Si el inicio de sesión fue exitoso, guardamos el ID del usuario
    if (data && data.user) {
      setUserId(data.user.id);
      toast({
        title: "Inicio de sesión exitoso",
        description: "Ahora verifica tu número telefónico"
      });
      setVerificationStep("phone");
    }
    
    setIsLoading(false);
  };
  
  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await signInWithPhone(phone, phonePassword);
    
    if (error) {
      setIsLoading(false);
      toast({
        title: "Error de inicio de sesión",
        description: error.message,
        variant: "destructive"
      });
      return;
    }
    
    // Si el inicio de sesión fue exitoso
    if (data && data.user) {
      toast({
        title: "¡Bienvenido!",
        description: "Has iniciado sesión correctamente"
      });
      navigate("/");
    }
    
    setIsLoading(false);
  };
  
  const handlePhoneVerified = async (phoneUserId: string | null) => {
    // Si ya existe un usuario con este teléfono
    if (phoneUserId) {
      // Verificar si es el mismo usuario que se acaba de autenticar con correo
      if (userId && phoneUserId === userId) {
        // Es el mismo usuario - inicio de sesión completo
        completeLogin();
      } else {
        // Es otro usuario - error de verificación
        toast({
          title: "Error de verificación",
          description: "Este número de teléfono ya está asociado con otra cuenta",
          variant: "destructive"
        });
        setVerificationStep("phone");
      }
    } else {
      // No existe un usuario con este teléfono, procedemos a vincular
      setVerificationStep("linking");
    }
  };
  
  const handlePhoneVerification = async (phone: string) => {
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
      completeLogin();
    } else {
      toast({
        title: "Error",
        description: "Este número de teléfono ya está asociado con otra cuenta",
        variant: "destructive"
      });
    }
  };
  
  const completeLogin = () => {
    toast({
      title: "¡Bienvenido!",
      description: "Has iniciado sesión correctamente"
    });
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePhonePasswordVisibility = () => {
    setShowPhonePassword(!showPhonePassword);
  };

  return (
    <Layout>
      <div className="container max-w-md mx-auto py-12 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
            <p className="text-gray-600 mt-2">Bienvenido de vuelta a Chambier</p>
          </div>

          {verificationStep === "email" && (
            <Tabs defaultValue="email" className="w-full">
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
                <form onSubmit={handleEmailLogin} className="space-y-6">
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
                    <div className="flex justify-between">
                      <Label htmlFor="password">Contraseña</Label>
                      <Link to="/recuperar-password" className="text-sm text-chambier-bright hover:underline">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="btn-primary w-full" disabled={isLoading}>
                    {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="phone">
                <form onSubmit={handlePhoneLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Número de teléfono</Label>
                    <Input
                      id="phone"
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
                    <div className="flex justify-between">
                      <Label htmlFor="phonePassword">Contraseña</Label>
                      <Link to="/recuperar-password" className="text-sm text-chambier-bright hover:underline">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="phonePassword"
                        type={showPhonePassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={phonePassword}
                        onChange={(e) => setPhonePassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        onClick={togglePhonePasswordVisibility}
                      >
                        {showPhonePassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          )}
          
          {verificationStep === "phone" && (
            <div className="space-y-6">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-center">
                  <strong>Paso 2 de 2:</strong> Verificación por teléfono
                </p>
              </div>
              
              <PhoneVerification onVerified={handlePhoneVerified} />
            </div>
          )}

          <div className="mt-6 text-center text-sm">
            <p>
              ¿No tienes una cuenta?{" "}
              <Link to="/register" className="text-chambier-bright hover:underline font-medium">
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
