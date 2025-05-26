
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className="relative chambier-gradient overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-chambier-primary/10 to-chambier-accent/10"></div>
      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 text-balance leading-tight">
            Servicios de calidad a un clic de distancia
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
            Conectamos a profesionales confiables con quienes necesitan sus servicios. Rápido, seguro y transparente.
          </p>
          
          <div className="max-w-2xl mx-auto mb-12">
            <SearchBar />
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/search">
              <Button className="bg-white text-chambier-primary hover:bg-gray-100 font-semibold text-lg px-10 py-6 shadow-lg">
                Buscar Profesionales
              </Button>
            </Link>
            <Link to="/ser-chamber">
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-chambier-primary font-semibold text-lg px-10 py-6 bg-transparent">
                Conviértete en un chamber
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-chambier-secondary/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
    </div>
  );
};

export default Hero;
