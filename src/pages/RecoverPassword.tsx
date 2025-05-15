
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { check } from "lucide-react";

const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/cambiar-password`,
      });
      
      if (error) throw error;
      
      setIsSubmitted(true);
      toast({
        title: "Correo enviado",
        description: "Hemos enviado instrucciones para recuperar tu contraseña",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No fue posible enviar el correo de recuperación",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container max-w-md mx-auto py-12 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Recuperar Contraseña</h1>
            <p className="text-gray-600 mt-2">
              Te enviaremos un correo con instrucciones para recuperar tu acceso
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
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

              <Button type="submit" className="btn-primary w-full" disabled={isLoading}>
                {isLoading ? "Enviando..." : "Enviar Instrucciones"}
              </Button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <check className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-bold mb-2">¡Correo Enviado!</h2>
              <p className="text-gray-600 mb-6">
                Si existe una cuenta asociada a {email}, recibirás un correo con instrucciones para recuperar tu contraseña.
              </p>
            </div>
          )}

          <div className="mt-6 text-center text-sm">
            <p>
              <Link to="/login" className="text-chambier-bright hover:underline font-medium">
                Volver a Inicio de Sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RecoverPassword;
