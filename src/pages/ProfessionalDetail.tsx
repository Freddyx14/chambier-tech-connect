
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser } from "@/integrations/supabase/auth";
import { Professional, Review, PortfolioItem } from "@/types/professional";

// Import refactored components
import ProfessionalHeader from "@/components/professional/ProfessionalHeader";
import PortfolioTab from "@/components/professional/PortfolioTab";
import ReviewsTab from "@/components/professional/ReviewsTab";
import LoadingDetail from "@/components/professional/LoadingDetail";
import NotFoundDetail from "@/components/professional/NotFoundDetail";

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
        // Fetch professional details by ID
        // This will work with either numeric IDs or UUIDs by using a simpler equality check
        const { data: professionalData, error: professionalError } = await supabase
          .from("professionals")
          .select("*")
          .eq("id", id);
          
        if (professionalError) {
          throw professionalError;
        }
        
        if (!professionalData || professionalData.length === 0) {
          setProfessional(null);
          return;
        }
        
        setProfessional(professionalData[0]);
        
        // Fetch reviews for this professional
        const { data: reviewsData, error: reviewsError } = await supabase
          .from("reviews")
          .select("*")
          .eq("professional_id", id)
          .order("created_at", { ascending: false });
          
        if (reviewsError) {
          throw reviewsError;
        }
        
        setReviews(reviewsData);
        
        // Fetch portfolio items for this professional
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

  if (loading) {
    return (
      <Layout>
        <LoadingDetail />
      </Layout>
    );
  }

  if (!professional) {
    return (
      <Layout>
        <NotFoundDetail />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Professional Header */}
        <ProfessionalHeader professional={professional} isLoggedIn={isLoggedIn} />

        {/* Tabs for Portfolio and Reviews */}
        <div className="mt-8">
          <Tabs defaultValue="portfolio" className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
              <TabsTrigger value="portfolio">Portafolio</TabsTrigger>
              <TabsTrigger value="reviews">Reseñas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="portfolio" className="mt-6">
              <PortfolioTab portfolioItems={portfolio} />
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <ReviewsTab reviews={reviews} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ProfessionalDetail;
