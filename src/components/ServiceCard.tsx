
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export interface ServiceProvider {
  id: string;
  name: string;
  profileImage: string;
  profession: string;
  skills: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
}

interface ServiceCardProps {
  provider: ServiceProvider;
  isLoggedIn: boolean;
}

const ServiceCard = ({ provider, isLoggedIn }: ServiceCardProps) => {
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

  return (
    <div className={`bg-white rounded-lg overflow-hidden card-shadow ${
      provider.featured ? "border-2 border-chambier-bright" : ""
    }`}>
      {provider.featured && (
        <div className="bg-chambier-bright text-white text-xs font-bold px-3 py-1 text-center">
          Profesional Destacado
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start">
          <img
            src={provider.profileImage}
            alt={provider.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
          />
          <div className="ml-4">
            <h3 className="font-bold text-lg">{provider.name}</h3>
            <p className="text-chambier-bright font-medium">{provider.profession}</p>
            <div className="flex items-center mt-1">
              <div className="flex">{renderStars(provider.rating)}</div>
              <span className="ml-2 text-sm text-gray-600">({provider.reviewCount} reseñas)</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="font-medium text-sm text-gray-700 mb-2">Habilidades:</h4>
          <div className="flex flex-wrap gap-1">
            {provider.skills.map((skill) => (
              <span
                key={skill}
                className="bg-chambier-lightest text-gray-700 text-xs px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
          <Link to={`/profesional/${provider.id}`}>
            <Button variant="outline" className="text-chambier-bright border-chambier-bright hover:bg-chambier-lightest mb-2 sm:mb-0 w-full sm:w-auto">
              Ver Perfil
            </Button>
          </Link>
          
          {isLoggedIn ? (
            <Link to={`/contacto/${provider.id}`}>
              <Button className="btn-primary w-full sm:w-auto">
                Contactar
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button className="btn-primary w-full sm:w-auto">
                Inicia sesión para contactar
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
