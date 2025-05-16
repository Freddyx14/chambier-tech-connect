
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageCircle } from "lucide-react";
import StarRating from "./StarRating";
import { Professional } from "@/types/professional";

interface ProfessionalHeaderProps {
  professional: Professional;
  isLoggedIn: boolean;
}

const ProfessionalHeader = ({ professional, isLoggedIn }: ProfessionalHeaderProps) => {
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

  return (
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
            <StarRating rating={professional.rating} />
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
  );
};

export default ProfessionalHeader;
