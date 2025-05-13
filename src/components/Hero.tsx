
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className="relative chambier-gradient">
      <div className="absolute inset-0 bg-gradient-to-r from-chambier-lightest/50 to-chambier-medium/30"></div>
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Servicios de calidad a un clic de distancia
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Conectamos a profesionales confiables con quienes necesitan sus servicios. Rápido, seguro y transparente.
          </p>
          
          <div className="max-w-xl mx-auto mb-10">
            <SearchBar />
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/servicios">
              <Button className="btn-primary text-base px-8 py-6">
                Buscar Profesionales
              </Button>
            </Link>
            <Link to="/profesionales">
              <Button variant="outline" className="border-chambier-bright text-chambier-bright hover:bg-chambier-lightest text-base px-8 py-6">
                Soy Profesional
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
