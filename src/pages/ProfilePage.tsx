
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const ProfilePage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [chamberProfile, setChamberProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
      return;
    }

    if (user) {
      fetchUserData();
    }
  }, [user, loading]);

  const fetchUserData = async () => {
    try {
      // Obtener perfil de usuario
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      setUserProfile(profileData);

      // Obtener perfil de chamber si existe
      const { data: chamberData, error: chamberError } = await supabase
        .from('chamber_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (!chamberError) {
        setChamberProfile(chamberData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast({
        title: "Error",
        description: "No se pudo cargar la información del perfil",
        variant: "destructive",
      });
    } finally {
      setLoadingProfile(false);
    }
  };

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

          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="personal">Información Personal</TabsTrigger>
              <TabsTrigger value="chamber">Perfil Profesional</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
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
                    <p className="text-sm font-medium text-gray-500">Teléfono</p>
                    <p className="text-base">{userProfile?.phone_number || "No disponible"}</p>
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
            </TabsContent>

            <TabsContent value="chamber">
              {chamberProfile ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Mi perfil profesional</CardTitle>
                    <CardDescription>
                      Información de tu perfil como Chamber
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      {chamberProfile.profile_photo && (
                        <img 
                          src={chamberProfile.profile_photo} 
                          alt={`${chamberProfile.first_name} ${chamberProfile.last_name}`} 
                          className="h-20 w-20 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <h3 className="font-medium text-lg">
                          {chamberProfile.first_name} {chamberProfile.last_name}
                        </h3>
                        <p className="text-gray-500">DNI: {chamberProfile.dni}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-500">Servicios</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {chamberProfile.services?.map((service: string, index: number) => (
                          <span 
                            key={index} 
                            className="bg-chambier-lightest text-chambier-bright px-2 py-1 rounded-full text-sm"
                          >
                            {service}
                          </span>
                        ))}
                        {chamberProfile.other_service && (
                          <span className="bg-chambier-lightest text-chambier-bright px-2 py-1 rounded-full text-sm">
                            {chamberProfile.other_service}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-500">Descripción</p>
                      <p className="text-base mt-1">{chamberProfile.description || "No disponible"}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-500">Estado de aprobación</p>
                      <div className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm ${
                        chamberProfile.approved 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {chamberProfile.approved ? "Aprobado" : "Pendiente de revisión"}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => navigate(`/crear-chamber?edit=true`)} className="mr-2">
                      Editar perfil
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <h3 className="text-xl font-medium mb-4">Aún no tienes un perfil profesional</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Crea tu perfil profesional como Chamber para ofrecer tus servicios en nuestra plataforma
                  </p>
                  <Button onClick={() => navigate('/crear-chamber')}>
                    Crear mi perfil profesional
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
