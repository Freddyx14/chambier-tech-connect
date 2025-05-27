
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import CategoryFilter, { Category } from "@/components/CategoryFilter";
import TrabajadoresList from "@/components/trabajadores/TrabajadoresList";

const categories: Category[] = [
  { id: "plomero", name: "Plomería", icon: "🔧" },
  { id: "electricista", name: "Electricidad", icon: "⚡" },
  { id: "jardinero", name: "Jardinería", icon: "🌱" },
  { id: "pintor", name: "Pintura", icon: "🎨" },
  { id: "ensamblador", name: "Ensamblaje", icon: "🔨" },
  { id: "limpieza", name: "Limpieza", icon: "🧹" },
];

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentFilter, setCurrentFilter] = useState("");

  useEffect(() => {
    // Construir filtro basado en búsqueda y categoría
    let filtro = searchQuery;
    
    if (selectedCategory) {
      // Si hay categoría seleccionada, agregar al filtro
      filtro = filtro ? `${filtro} ${selectedCategory}` : selectedCategory;
    }
    
    setCurrentFilter(filtro);
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

          <TrabajadoresList filtro={currentFilter} />
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
