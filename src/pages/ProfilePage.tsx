
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const ProfilePage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loadingProfile, setLoadingProfile] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
      return;
    }
  }, [user, loading]);

  if (loading || loadingProfile) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4 text-center">
          <Loader2 className="animate-spin h-12 w-12 mx-auto text-chambier-bright" />
          <p className="mt-4 text-lg">Cargando información...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>

          <Card>
            <CardHeader>
              <CardTitle>Datos Personales</CardTitle>
              <CardDescription>Información de tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-base">{user?.email || "No disponible"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Cuenta creada</p>
                <p className="text-base">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "No disponible"}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-500">
                Para cambiar tu contraseña o datos personales, usa la opción en la configuración de tu cuenta.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
