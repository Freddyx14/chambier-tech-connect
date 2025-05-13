
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Category } from "@/components/CategoryFilter";
import ServiceCard, { ServiceProvider } from "@/components/ServiceCard";

// Define the categories
const categories: Category[] = [
  { id: "plomeria", name: "Plomería", icon: "🔧", profession: "Plomero" },
  { id: "electricidad", name: "Electricidad", icon: "⚡", profession: "Electricista" },
  { id: "jardineria", name: "Jardinería", icon: "🌱", profession: "Jardinero" },
  { id: "carpinteria", name: "Carpintería", icon: "🪚", profession: "Carpintero" },
  { id: "pintura", name: "Pintura", icon: "🎨", profession: "Pintor" },
  { id: "albanileria", name: "Albañilería", icon: "🧱", profession: "Albañil" },
  { id: "cerrajeria", name: "Cerrajería", icon: "🔑", profession: "Cerrajero" },
  { id: "limpieza", name: "Limpieza", icon: "🧹", profession: "Limpiador" },
  { id: "informatica", name: "Informática", icon: "💻", profession: "Técnico informático" },
  { id: "aire", name: "Aire Acondicionado", icon: "❄️", profession: "Técnico de aire acondicionado" },
];

// Map category IDs to profession types
const categoryToProfessionMap: Record<string, string> = {
  plomeria: "Plomero",
  electricidad: "Electricista",
  jardineria: "Jardinero", 
  carpinteria: "Carpintero",
  pintura: "Pintor",
  albanileria: "Albañil",
  cerrajeria: "Cerrajero",
  limpieza: "Limpiador",
  informatica: "Técnico informático",
  aire: "Técnico de aire acondicionado"
};

const ServicesPage = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const [activeTab, setActiveTab] = useState(categoryParam || "all");
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn] = useState(false); // This would be determined by your authentication system
  const navigate = useNavigate();

  // Fetch service providers from Supabase
  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true);
      try {
        let query = supabase.from("professionals").select("*");

        // Filter by profession if a specific category is selected
        if (activeTab !== "all" && activeTab in categoryToProfessionMap) {
          query = query.eq("profession", categoryToProfessionMap[activeTab]);
        }

        // Order by rating (highest first)
        query = query.order("rating", { ascending: false });

        const { data, error } = await query;

        if (error) {
          console.error("Error fetching providers:", error);
          toast({
            title: "Error",
            description: "No se pudieron cargar los profesionales. Intente nuevamente.",
            variant: "destructive",
          });
          setProviders([]);
        } else {
          // Transform the data to match our ServiceProvider type
          const transformedData: ServiceProvider[] = data.map(provider => ({
            id: provider.id,
            name: provider.name,
            profileImage: provider.profile_image,
            profession: provider.profession,
            skills: provider.skills || [],
            rating: provider.rating,
            reviewCount: provider.review_count,
            featured: provider.featured,
          }));
          
          setProviders(transformedData);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        toast({
          title: "Error",
          description: "Ocurrió un error inesperado. Intente nuevamente.",
          variant: "destructive",
        });
        setProviders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [activeTab]);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Update the URL to reflect the current category
    if (value === "all") {
      navigate("/servicios");
    } else {
      navigate(`/servicios?category=${value}`);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Servicios</h1>
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="mb-6 overflow-x-auto pb-3">
            <TabsList className="inline-flex w-auto min-w-full whitespace-nowrap">
              <TabsTrigger value="all" className="px-4">
                Todos
              </TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="px-4">
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chambier-bright"></div>
                </div>
              ) : providers.length > 0 ? (
                providers.map((provider) => (
                  <ServiceCard key={provider.id} provider={provider} isLoggedIn={isLoggedIn} />
                ))
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No se encontraron profesionales</h3>
                  <p className="text-gray-600">Intenta con otra categoría</p>
                </div>
              )}
            </div>
          </TabsContent>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              <div className="grid grid-cols-1 gap-6">
                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chambier-bright"></div>
                  </div>
                ) : providers.length > 0 ? (
                  providers.map((provider) => (
                    <ServiceCard key={provider.id} provider={provider} isLoggedIn={isLoggedIn} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium text-gray-700 mb-2">No se encontraron {category.name.toLowerCase()}</h3>
                    <p className="text-gray-600">Intenta con otra categoría</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default ServicesPage;
