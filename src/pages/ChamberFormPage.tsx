
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

// Importación de componentes refactorizados
import PersonalInfoFields from "@/components/chamber/PersonalInfoFields";
import ProfilePhotoUpload from "@/components/chamber/ProfilePhotoUpload";
import ServiceSelector, { ServiceType, serviceOptions } from "@/components/chamber/ServiceSelector";
import PortfolioUploader, { PortfolioImage } from "@/components/chamber/PortfolioUploader";

// Define los tipos para la base de datos
import { Database } from "@/integrations/supabase/types";
type ChamberServiceType = Database["public"]["Enums"]["service_type"];

interface FormData {
  first_name: string;
  last_name: string;
  dni: string;
  age: string;
  phone_number: string;
  services: ServiceType[];
  other_service: string;
  description: string;
  profile_photo?: string;
  portfolio_images: PortfolioImage[];
}

const ChamberFormPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const isEditMode = new URLSearchParams(location.search).get('edit') === 'true';

  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    dni: "",
    age: "",
    phone_number: "",
    services: [] as ServiceType[],
    other_service: "",
    description: "",
    portfolio_images: []
  });
  
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [chamberProfileId, setChamberProfileId] = useState<string | null>(null);

  // Verificar si el usuario está autenticado
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login-required');
    } else if (user && isEditMode) {
      fetchChamberProfile();
    }
  }, [user, loading, isEditMode, navigate]);

  // Cargar el perfil del chamber para edición
  const fetchChamberProfile = async () => {
    try {
      // Obtener perfil de chamber
      const { data: chamberData, error: chamberError } = await supabase
        .from('chamber_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (chamberError) {
        throw chamberError;
      }

      setChamberProfileId(chamberData.id);
      
      // Asignar datos al formulario
      setFormData({
        first_name: chamberData.first_name || "",
        last_name: chamberData.last_name || "",
        dni: chamberData.dni || "",
        age: chamberData.age?.toString() || "",
        phone_number: chamberData.phone_number || "",
        services: chamberData.services as ServiceType[] || [],
        other_service: chamberData.other_service || "",
        description: chamberData.description || "",
        profile_photo: chamberData.profile_photo || "",
        portfolio_images: []
      });

      // Obtener imágenes del portafolio
      const { data: portfolioData, error: portfolioError } = await supabase
        .from('chamber_portfolio')
        .select('*')
        .eq('chamber_id', chamberData.id);

      if (!portfolioError && portfolioData) {
        setFormData(prev => ({
          ...prev,
          portfolio_images: portfolioData.map((item: any) => ({
            id: item.id,
            preview: item.image_url,
            url: item.image_url,
            description: item.description || ""
          }))
        }));
      }
    } catch (error) {
      console.error("Error fetching chamber profile:", error);
      toast({
        title: "Error",
        description: "No se pudo cargar la información del perfil",
        variant: "destructive",
      });
    }
  };

  // Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Manejar cambios en los servicios (checkboxes)
  const handleServiceChange = (serviceId: ServiceType, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, serviceId]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        services: prev.services.filter(id => id !== serviceId)
      }));
    }
  };

  // Manejar cambio de foto de perfil
  const handleProfilePhotoChange = (file: File | null, preview: string | null) => {
    setProfilePhotoFile(file);
    if (preview) {
      setFormData(prev => ({ ...prev, profile_photo: preview }));
    } else {
      setFormData(prev => {
        const { profile_photo, ...rest } = prev;
        return rest;
      });
    }
  };

  // Manejar cambio en las imágenes de portafolio
  const handlePortfolioImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages: PortfolioImage[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        reader.onloadend = () => {
          newImages.push({
            file,
            preview: reader.result as string,
            description: ""
          });
          
          if (newImages.length === files.length) {
            setFormData(prev => ({
              ...prev,
              portfolio_images: [...prev.portfolio_images, ...newImages]
            }));
          }
        };
        
        reader.readAsDataURL(file);
      }
    }
  };

  // Actualizar descripción de imagen de portafolio
  const updatePortfolioImageDescription = (index: number, description: string) => {
    const updatedImages = [...formData.portfolio_images];
    updatedImages[index].description = description;
    setFormData(prev => ({ ...prev, portfolio_images: updatedImages }));
  };

  // Eliminar imagen de portafolio
  const removePortfolioImage = (index: number) => {
    const updatedImages = [...formData.portfolio_images];
    updatedImages.splice(index, 1);
    setFormData(prev => ({ ...prev, portfolio_images: updatedImages }));
  };

  // Subir archivo a Supabase Storage
  const uploadFile = async (file: File, path: string): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('chamber_images')
        .upload(filePath, file);

      if (uploadError) {
        console.error("Error uploading file:", uploadError);
        throw uploadError;
      }

      // Obtener URL pública
      const { data: urlData } = supabase.storage
        .from('chamber_images')
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      console.error("Upload file error:", error);
      throw new Error("Error al subir archivo");
    }
  };

  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para continuar",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    // Validaciones básicas
    if (!formData.first_name || !formData.last_name || !formData.dni || !formData.age || !formData.phone_number) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Iniciando envío del formulario...");
      let profilePhotoUrl = formData.profile_photo || "";
      
      // Subir foto de perfil si se seleccionó una nueva
      if (profilePhotoFile) {
        profilePhotoUrl = await uploadFile(profilePhotoFile, 'profiles');
      }
      
      // Convertir servicios al tipo esperado por Supabase
      const dbServices: ChamberServiceType[] = formData.services.map(service => 
        service as unknown as ChamberServiceType
      );
      
      // Datos del chamber para la base de datos
      const chamberData = {
        user_id: user.id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        dni: formData.dni,
        age: parseInt(formData.age),
        phone_number: formData.phone_number,
        services: dbServices,
        other_service: formData.services.includes('otro' as ServiceType) ? formData.other_service : null,
        description: formData.description,
        profile_photo: profilePhotoUrl
      };

      console.log("Datos a guardar:", chamberData);
      let chamberId = chamberProfileId;
      
      // Crear o actualizar perfil de chamber
      if (isEditMode && chamberProfileId) {
        // Actualizar perfil existente
        console.log("Actualizando perfil existente...");
        const { error: updateError } = await supabase
          .from('chamber_profiles')
          .update(chamberData)
          .eq('id', chamberProfileId);

        if (updateError) {
          console.error("Error al actualizar:", updateError);
          throw updateError;
        }
      } else {
        // Crear nuevo perfil
        console.log("Creando nuevo perfil...");
        const { data: insertData, error: insertError } = await supabase
          .from('chamber_profiles')
          .insert(chamberData)
          .select('id')
          .single();

        if (insertError) {
          console.error("Error al insertar:", insertError);
          throw insertError;
        }
        chamberId = insertData.id;
        console.log("Perfil creado con ID:", chamberId);
      }

      // Procesar imágenes del portafolio
      if (chamberId) {
        console.log("Procesando imágenes del portfolio...");
        // Para cada imagen en el portafolio
        for (const image of formData.portfolio_images) {
          // Si es una imagen existente con ID
          if (image.id && !image.file) {
            // Actualizar solo la descripción si cambió
            await supabase
              .from('chamber_portfolio')
              .update({ description: image.description })
              .eq('id', image.id);
          } 
          // Si es una imagen nueva, subir y crear registro
          else if (image.file) {
            const imageUrl = await uploadFile(image.file, 'portfolio');
            
            await supabase
              .from('chamber_portfolio')
              .insert({
                chamber_id: chamberId,
                image_url: imageUrl,
                description: image.description
              });
          }
        }
      }

      toast({
        title: isEditMode ? "Perfil actualizado" : "Perfil creado",
        description: isEditMode 
          ? "Tu perfil profesional ha sido actualizado correctamente" 
          : "Tu perfil profesional ha sido creado y será revisado para su aprobación",
      });

      // Redirigir a la página de perfil
      navigate('/perfil');
      
    } catch (error) {
      console.error("Error saving chamber profile:", error);
      toast({
        title: "Error",
        description: "Ocurrió un error al guardar tu perfil profesional",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4 text-center">
          <Loader2 className="animate-spin h-12 w-12 mx-auto text-chambier-bright" />
          <p className="mt-4 text-lg">Cargando...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-3xl mx-auto py-12 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-8">
            {isEditMode ? "Editar mi perfil profesional" : "Crear mi primer trabajo"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información Personal */}
            <PersonalInfoFields
              firstName={formData.first_name}
              lastName={formData.last_name}
              dni={formData.dni}
              age={formData.age}
              phoneNumber={formData.phone_number}
              onInputChange={handleChange}
            />

            {/* Foto de perfil */}
            <ProfilePhotoUpload
              initialPhoto={formData.profile_photo}
              onPhotoChange={handleProfilePhotoChange}
            />

            {/* Servicios */}
            <ServiceSelector
              selectedServices={formData.services}
              otherService={formData.other_service}
              onServiceChange={handleServiceChange}
              onOtherServiceChange={(value) => setFormData(prev => ({ ...prev, other_service: value }))}
            />

            {/* Descripción */}
            <div className="space-y-2">
              <label htmlFor="description">Descripción profesional o experiencia</label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe tu experiencia, habilidades y lo que te distingue como profesional"
                rows={4}
              />
            </div>

            {/* Imágenes de portafolio */}
            <PortfolioUploader
              images={formData.portfolio_images}
              onAddImages={handlePortfolioImageChange}
              onUpdateDescription={updatePortfolioImageDescription}
              onRemoveImage={removePortfolioImage}
            />

            {/* Botón de envío */}
            <Button 
              type="submit" 
              className="w-full mt-8" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                "Subir mi perfil a Chambier"
              )}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ChamberFormPage;
