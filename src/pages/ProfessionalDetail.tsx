
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Phone, Mail, MessageCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser } from "@/integrations/supabase/auth";

// Type definitions for our data
interface Professional {
  id: string;
  name: string;
  profession: string;
  description: string;
  profile_image: string;
  skills: string[];
  rating: number;
  review_count: number;
  contact_phone: string;
  contact_email: string;
  contact_whatsapp: string;
}

interface Review {
  id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
}

const ProfessionalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const { toast } = useToast();
  
  // Verificar si el usuario ha iniciado sesión
  useEffect(() => {
    const checkAuth = async () => {
      const { user } = await getCurrentUser();
      setIsLoggedIn(!!user);
    };
    
    checkAuth();
  }, []);
  
  useEffect(() => {
    const fetchProfessionalData = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        // Fetch professional details
        const { data: professionalData, error: professionalError } = await supabase
          .from("professionals")
          .select("*")
          .eq("id", id)
          .single();
          
        if (professionalError) {
          throw professionalError;
        }
        
        setProfessional(professionalData);
        
        // Fetch reviews
        const { data: reviewsData, error: reviewsError } = await supabase
          .from("reviews")
          .select("*")
          .eq("professional_id", id)
          .order("created_at", { ascending: false });
          
        if (reviewsError) {
          throw reviewsError;
        }
        
        setReviews(reviewsData);
        
        // Fetch portfolio items
        const { data: portfolioData, error: portfolioError } = await supabase
          .from("portfolio_items")
          .select("*")
          .eq("professional_id", id);
          
        if (portfolioError) {
          throw portfolioError;
        }
        
        setPortfolio(portfolioData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "No se pudo cargar la información del profesional. Intente nuevamente.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfessionalData();
  }, [id, toast]);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };
  
  // Format date to a more readable format (DD/MM/YYYY)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Renderizar el botón de WhatsApp según el estado de inicio de sesión
  const renderWhatsAppButton = () => {
    if (!professional) return null;
    
    if (isLoggedIn) {
      // Si el usuario ha iniciado sesión, mostrar el botón normal con el número
      return (
        <a href={`https://wa.me/${professional.contact_whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
            <MessageCircle className="mr-2 h-5 w-5" />
            WhatsApp: {professional.contact_whatsapp}
          </Button>
        </a>
      );
    } else {
      // Si el usuario no ha iniciado sesión, mostrar el botón difuminado
      return (
        <Link to="/register" className="w-full">
          <div className="relative">
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white filter blur-[4px] pointer-events-none">
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp: +51 XXX XXX XXX
            </Button>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white/90 text-gray-800 px-3 py-1 rounded text-sm font-medium">
                Regístrate/Inicia sesión para obtener el número
              </span>
            </div>
          </div>
        </Link>
      );
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chambier-bright"></div>
        </div>
      </Layout>
    );
  }

  if (!professional) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Profesional no encontrado</h1>
          <p className="text-gray-600 mb-6">No pudimos encontrar el profesional que estás buscando.</p>
          <Link to="/servicios">
            <Button className="btn-primary">Ver todos los profesionales</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Professional Header */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:flex-shrink-0">
              <img
                src={professional.profile_image}
                alt={professional.name}
                className="w-36 h-36 rounded-full object-cover border-4 border-chambier-lightest mx-auto md:mx-0"
              />
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800">{professional.name}</h1>
              <p className="text-xl text-chambier-bright font-medium">{professional.profession}</p>
              
              <div className="flex items-center mt-2 justify-center md:justify-start">
                <div className="flex">{renderStars(professional.rating)}</div>
                <span className="ml-2 text-gray-600">({professional.review_count} reseñas)</span>
              </div>
              
              <p className="mt-4 text-gray-700 max-w-2xl">{professional.description}</p>
              
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Especialidades:</h3>
                <div className="flex flex-wrap gap-2">
                  {professional.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="bg-chambier-lightest text-chambier-bright text-sm px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a href={`tel:${professional.contact_phone}`}>
                  <Button variant="outline" className="w-full border-chambier-bright text-chambier-bright hover:bg-chambier-lightest">
                    <Phone className="mr-2 h-5 w-5" />
                    Llamar
                  </Button>
                </a>
                <a href={`mailto:${professional.contact_email}`}>
                  <Button variant="outline" className="w-full border-chambier-bright text-chambier-bright hover:bg-chambier-lightest">
                    <Mail className="mr-2 h-5 w-5" />
                    Email
                  </Button>
                </a>
                {renderWhatsAppButton()}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs for Portfolio and Reviews */}
        <div className="mt-8">
          <Tabs defaultValue="portfolio" className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
              <TabsTrigger value="portfolio">Portafolio</TabsTrigger>
              <TabsTrigger value="reviews">Reseñas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="portfolio" className="mt-6">
              {portfolio.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolio.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-bold text-gray-800">{item.title}</h3>
                        <p className="text-gray-600 mt-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-gray-700">No hay elementos en el portafolio</h3>
                  <p className="text-gray-600">Este profesional aún no ha añadido trabajos a su portafolio</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-lg p-4 shadow-md">
                      <div className="flex justify-between">
                        <span className="font-medium">{review.user_name}</span>
                        <span className="text-gray-500 text-sm">{formatDate(review.created_at)}</span>
                      </div>
                      <div className="flex mt-1">
                        {renderStars(review.rating)}
                      </div>
                      <p className="mt-2 text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-gray-700">No hay reseñas</h3>
                  <p className="text-gray-600">Este profesional aún no tiene reseñas</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ProfessionalDetail;
