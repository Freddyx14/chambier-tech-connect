
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import CategoryFilter, { Category } from "@/components/CategoryFilter";
import ServiceCard, { ServiceProvider } from "@/components/ServiceCard";

const categories: Category[] = [
  { id: "plumbing", name: "Plomería", icon: "🔧" },
  { id: "electrical", name: "Electricidad", icon: "⚡" },
  { id: "gardening", name: "Jardinería", icon: "🌱" },
  { id: "painting", name: "Pintura", icon: "🎨" },
  { id: "assembly", name: "Ensamblaje", icon: "🔨" },
  { id: "cleaning", name: "Limpieza", icon: "🧹" },
];

// Mock data for service providers
const mockProviders: ServiceProvider[] = [
  {
    id: "1",
    name: "Carlos Rodríguez",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    profession: "Plomero",
    skills: ["Reparaciones", "Instalaciones", "Fugas"],
    rating: 4.8,
    reviewCount: 56,
    featured: true
  },
  {
    id: "2",
    name: "María Gómez",
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    profession: "Electricista",
    skills: ["Cableado", "Iluminación", "Reparaciones"],
    rating: 4.6,
    reviewCount: 38,
    featured: false
  },
  {
    id: "3",
    name: "Juan Pérez",
    profileImage: "https://randomuser.me/api/portraits/men/67.jpg",
    profession: "Jardinero",
    skills: ["Diseño", "Mantenimiento", "Podas"],
    rating: 4.5,
    reviewCount: 42,
    featured: false
  },
  {
    id: "4",
    name: "Ana Martínez",
    profileImage: "https://randomuser.me/api/portraits/women/26.jpg",
    profession: "Pintora",
    skills: ["Interior", "Exterior", "Decorativa"],
    rating: 4.9,
    reviewCount: 29,
    featured: true
  },
  {
    id: "5",
    name: "Roberto Díaz",
    profileImage: "https://randomuser.me/api/portraits/men/81.jpg",
    profession: "Ensamblador",
    skills: ["Muebles", "Electrodomésticos", "Electrónicos"],
    rating: 4.2,
    reviewCount: 18,
    featured: false
  }
];

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>(mockProviders);
  const [isLoggedIn] = useState(false); // This would be determined by your authentication system

  useEffect(() => {
    // Filter based on query and category
    let results = mockProviders;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        provider => 
          provider.name.toLowerCase().includes(query) ||
          provider.profession.toLowerCase().includes(query) ||
          provider.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }
    
    if (selectedCategory) {
      // Map category IDs to professions for this example
      const categoryMap: Record<string, string> = {
        plumbing: "Plomero",
        electrical: "Electricista",
        gardening: "Jardinero",
        painting: "Pintora",
        assembly: "Ensamblador",
        cleaning: "Limpiador"
      };
      
      results = results.filter(
        provider => provider.profession === categoryMap[selectedCategory]
      );
    }
    
    setFilteredProviders(results);
  }, [searchQuery, selectedCategory]);

  return (
    <Layout>
      <div className="bg-chambier-lightest py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {searchQuery ? `Resultados para "${searchQuery}"` : "Buscar Profesionales"}
          </h1>

          <div className="mb-8">
            <SearchBar className="max-w-2xl" />
          </div>

          <CategoryFilter 
            categories={categories}
            onSelect={setSelectedCategory}
            className="mb-10"
          />

          {filteredProviders.length > 0 ? (
            <div className="space-y-6">
              {filteredProviders.map(provider => (
                <ServiceCard 
                  key={provider.id} 
                  provider={provider} 
                  isLoggedIn={isLoggedIn} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No encontramos resultados</h3>
              <p className="text-gray-600">Intenta con otra búsqueda o categoría</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
