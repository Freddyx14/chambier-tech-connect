
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTrabajadores } from "@/hooks/useTrabajadores";
import TrabajadorCard from "@/components/trabajadores/TrabajadorCard";
import { Skeleton } from "@/components/ui/skeleton";

// Define the categories
const categories = [
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

const ServicesPage = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const [activeTab, setActiveTab] = useState(categoryParam || "all");
  const { trabajadores, loading } = useTrabajadores();
  const navigate = useNavigate();

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

  // Filter workers based on selected category
  const filteredTrabajadores = trabajadores.filter(trabajador => {
    if (activeTab === "all") return true;
    
    const category = categories.find(cat => cat.id === activeTab);
    if (!category) return true;
    
    return trabajador.profesiones.some(profesion => 
      profesion.toLowerCase().includes(category.profession.toLowerCase())
    );
  });

  const renderTrabajadores = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg p-5 card-shadow">
              <div className="flex items-start">
                <Skeleton className="w-20 h-20 rounded-full" />
                <div className="ml-4 flex-1">
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
              <Skeleton className="h-4 w-full mt-3 mb-2" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <div className="flex gap-2">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 flex-1" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (filteredTrabajadores.length === 0) {
      return (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            No se encontraron trabajadores
          </h3>
          <p className="text-gray-600">
            Intenta con otra categoría o vuelve más tarde
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrabajadores.map((trabajador) => (
          <TrabajadorCard key={trabajador.id} trabajador={trabajador} />
        ))}
      </div>
    );
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
            {renderTrabajadores()}
          </TabsContent>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              {renderTrabajadores()}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default ServicesPage;
