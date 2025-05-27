
import { Link } from "react-router-dom";
import { Star, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Trabajador } from "@/types/trabajador";

interface TrabajadorCardProps {
  trabajador: Trabajador;
}

const TrabajadorCard = ({ trabajador }: TrabajadorCardProps) => {
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

  const whatsappUrl = trabajador.numero_celular 
    ? `https://wa.me/${trabajador.numero_celular.replace(/[^0-9]/g, '')}`
    : null;

  return (
    <div className="bg-white rounded-lg overflow-hidden card-shadow hover:shadow-lg transition-shadow">
      <div className="p-5">
        <div className="flex items-start">
          <img
            src={trabajador.foto_perfil || '/placeholder.svg'}
            alt={`${trabajador.nombre} ${trabajador.apellido}`}
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
          />
          <div className="ml-4 flex-1">
            <h3 className="font-bold text-lg text-gray-800">
              {trabajador.nombre} {trabajador.apellido}
            </h3>
            <p className="text-chambier-bright font-medium">
              {trabajador.profesiones.join(', ')}
            </p>
            <div className="flex items-center mt-1">
              <div className="flex">{renderStars(trabajador.promedio_estrellas)}</div>
              <span className="ml-2 text-sm text-gray-600">
                ({trabajador.promedio_estrellas.toFixed(1)})
              </span>
            </div>
          </div>
        </div>

        {trabajador.descripcion && (
          <p className="mt-3 text-gray-600 text-sm line-clamp-2">
            {trabajador.descripcion}
          </p>
        )}

        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <Link to={`/trabajador/${trabajador.id}`} className="flex-1">
            <Button variant="outline" className="w-full border-chambier-bright text-chambier-bright hover:bg-chambier-lightest">
              Ver Perfil
            </Button>
          </Link>
          
          {whatsappUrl && (
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                <Phone className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrabajadorCard;
