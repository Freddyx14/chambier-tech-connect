
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Upload, X, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface FormData {
  first_name: string;
  last_name: string;
  dni: string;
  age: string;
  phone_number: string;
  services: string[];
  other_service: string;
  description: string;
  profile_photo?: string;
  portfolio_images: PortfolioImage[];
}

interface PortfolioImage {
  id?: string;
  file?: File;
  preview: string;
  url?: string;
  description: string;
}

const serviceOptions = [
  { id: 'plomero', label: 'Plomero' },
  { id: 'jardinero', label: 'Jardinero' },
  { id: 'electricista', label: 'Electricista' },
  { id: 'limpieza', label: 'Limpieza' },
  { id: 'pintura', label: 'Pintura' },
  { id: 'cerrajero', label: 'Cerrajero' },
  { id: 'ensamblador', label: 'Ensamblador' },
  { id: 'soldador', label: 'Soldador' },
  { id: 'otro', label: 'Otro' }
];

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
    services: [],
    other_service: "",
    description: "",
    portfolio_images: []
  });
  
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [chamberProfileId, setChamberProfileId] = useState<string | null>(null);

  // Verificar si el usuario está autenticado
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login-required');
    } else if (user && isEditMode) {
      fetchChamberProfile();
    }
  }, [user, loading, isEditMode]);

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
        services: chamberData.services || [],
        other_service: chamberData.other_service || "",
        description: chamberData.description || "",
        profile_photo: chamberData.profile_photo || "",
        portfolio_images: []
      });

      if (chamberData.profile_photo) {
        setProfilePhotoPreview(chamberData.profile_photo);
      }

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
  const handleServiceChange = (serviceId: string, checked: boolean) => {
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
  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
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

    const { error: uploadError } = await supabase.storage
      .from('chamber_images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    // Obtener URL pública
    const { data: urlData } = supabase.storage
      .from('chamber_images')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
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
      let profilePhotoUrl = formData.profile_photo || "";
      
      // Subir foto de perfil si se seleccionó una nueva
      if (profilePhotoFile) {
        profilePhotoUrl = await uploadFile(profilePhotoFile, 'profiles');
      }
      
      // Datos del chamber para la base de datos
      const chamberData = {
        user_id: user.id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        dni: formData.dni,
        age: parseInt(formData.age),
        phone_number: formData.phone_number,
        services: formData.services,
        other_service: formData.services.includes('otro') ? formData.other_service : null,
        description: formData.description,
        profile_photo: profilePhotoUrl
      };

      let chamberId = chamberProfileId;
      
      // Crear o actualizar perfil de chamber
      if (isEditMode && chamberProfileId) {
        // Actualizar perfil existente
        const { error: updateError } = await supabase
          .from('chamber_profiles')
          .update(chamberData)
          .eq('id', chamberProfileId);

        if (updateError) throw updateError;
      } else {
        // Crear nuevo perfil
        const { data: insertData, error: insertError } = await supabase
          .from('chamber_profiles')
          .insert(chamberData)
          .select('id')
          .single();

        if (insertError) throw insertError;
        chamberId = insertData.id;
      }

      // Procesar imágenes del portafolio
      if (chamberId) {
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div className="space-y-2">
                <Label htmlFor="first_name">Primer Nombre *</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Apellido */}
              <div className="space-y-2">
                <Label htmlFor="last_name">Primer Apellido *</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* DNI */}
              <div className="space-y-2">
                <Label htmlFor="dni">Número de DNI *</Label>
                <Input
                  id="dni"
                  name="dni"
                  value={formData.dni}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Edad */}
              <div className="space-y-2">
                <Label htmlFor="age">Edad *</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  min="18"
                  max="100"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Teléfono */}
              <div className="space-y-2">
                <Label htmlFor="phone_number">Número de celular *</Label>
                <Input
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Foto de perfil */}
              <div className="space-y-2">
                <Label>Foto del trabajador</Label>
                <div className="flex items-center space-x-4">
                  {profilePhotoPreview && (
                    <div className="relative">
                      <img 
                        src={profilePhotoPreview} 
                        alt="Preview" 
                        className="w-16 h-16 rounded-full object-cover border"
                      />
                      <button 
                        type="button"
                        className="absolute -top-2 -right-2 bg-red-600 rounded-full p-0.5 text-white"
                        onClick={() => {
                          setProfilePhotoPreview(null);
                          setProfilePhotoFile(null);
                          setFormData(prev => ({ ...prev, profile_photo: "" }));
                        }}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  <div className="flex-1">
                    <Label 
                      htmlFor="photo-upload" 
                      className="flex items-center justify-center border border-dashed border-gray-300 rounded-md p-2 cursor-pointer hover:bg-gray-50"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      <span className="text-sm">Subir foto</span>
                    </Label>
                    <Input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePhotoChange}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Servicios */}
            <div className="space-y-4">
              <Label>Servicios que desea ofrecer *</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {serviceOptions.map((service) => (
                  <div key={service.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`service-${service.id}`}
                      checked={formData.services.includes(service.id)}
                      onCheckedChange={(checked) => 
                        handleServiceChange(service.id, checked as boolean)
                      }
                    />
                    <Label htmlFor={`service-${service.id}`} className="cursor-pointer">
                      {service.label}
                    </Label>
                  </div>
                ))}
              </div>

              {/* Campo para "Otro" servicio */}
              {formData.services.includes('otro') && (
                <div className="mt-3">
                  <Label htmlFor="other_service">Especificar otro servicio *</Label>
                  <Input
                    id="other_service"
                    name="other_service"
                    value={formData.other_service}
                    onChange={handleChange}
                    placeholder="Especifica qué otro servicio ofreces"
                    required
                  />
                </div>
              )}
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <Label htmlFor="description">Descripción profesional o experiencia</Label>
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
            <div className="space-y-4">
              <Label>Imágenes o ejemplos de trabajos anteriores (opcional)</Label>
              
              {/* Lista de imágenes seleccionadas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {formData.portfolio_images.map((image, index) => (
                  <Card key={index} className="overflow-hidden">
                    <img 
                      src={image.preview} 
                      alt={`Portfolio ${index}`} 
                      className="w-full h-40 object-cover"
                    />
                    <CardContent className="p-3">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium">Descripción</p>
                        <button 
                          type="button"
                          onClick={() => removePortfolioImage(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <Input
                        value={image.description}
                        onChange={(e) => updatePortfolioImageDescription(index, e.target.value)}
                        placeholder="Describe esta imagen"
                        className="text-sm"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Botón para agregar más imágenes */}
              <div className="mt-4">
                <Label 
                  htmlFor="portfolio-upload" 
                  className="flex items-center justify-center border border-dashed border-gray-300 rounded-md p-4 cursor-pointer hover:bg-gray-50"
                >
                  <Plus className="mr-2 h-5 w-5 text-gray-500" />
                  <span>Agregar imágenes de trabajos</span>
                </Label>
                <Input
                  id="portfolio-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePortfolioImageChange}
                  className="hidden"
                />
              </div>
            </div>

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
