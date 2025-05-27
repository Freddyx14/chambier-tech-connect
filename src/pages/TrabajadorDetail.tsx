
import { useParams } from "react-router-dom";
import { Star, Phone, MessageCircle, Calendar } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTrabajador } from "@/hooks/useTrabajadores";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const TrabajadorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { trabajador, loading } = useTrabajador(id || "");

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-col md:flex-row">
              <Skeleton className="w-36 h-36 rounded-full mx-auto md:mx-0" />
              <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-6 w-32 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <div className="flex gap-2 mb-4">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Skeleton className="h-10" />
                  <Skeleton className="h-10" />
                  <Skeleton className="h-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!trabajador) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700 mb-2">Trabajador no encontrado</h3>
            <p className="text-gray-600">El trabajador que buscas no existe o ha sido eliminado</p>
          </div>
        </div>
      </Layout>
    );
  }

  const whatsappUrl = trabajador.numero_celular 
    ? `https://wa.me/${trabajador.numero_celular.replace(/[^0-9]/g, '')}`
    : null;

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header del trabajador */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:flex-shrink-0">
              <img
                src={trabajador.foto_perfil || '/placeholder.svg'}
                alt={`${trabajador.nombre} ${trabajador.apellido}`}
                className="w-36 h-36 rounded-full object-cover border-4 border-chambier-lightest mx-auto md:mx-0"
              />
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800">
                {trabajador.nombre} {trabajador.apellido}
              </h1>
              <p className="text-xl text-chambier-bright font-medium">
                {trabajador.profesiones.join(' • ')}
              </p>
              
              <div className="flex items-center mt-2 justify-center md:justify-start">
                <div className="flex">{renderStars(trabajador.promedio_estrellas)}</div>
                <span className="ml-2 text-gray-600">
                  {trabajador.promedio_estrellas.toFixed(1)} ({trabajador.resenas.length} reseñas)
                </span>
              </div>
              
              {trabajador.descripcion && (
                <p className="mt-4 text-gray-700 max-w-2xl">{trabajador.descripcion}</p>
              )}
              
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {trabajador.numero_celular && (
                  <a href={`tel:${trabajador.numero_celular}`}>
                    <Button variant="outline" className="w-full border-chambier-bright text-chambier-bright hover:bg-chambier-lightest">
                      <Phone className="mr-2 h-5 w-5" />
                      Llamar
                    </Button>
                  </a>
                )}
                
                {whatsappUrl && (
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      WhatsApp
                    </Button>
                  </a>
                )}
                
                <Button variant="outline" className="w-full border-chambier-bright text-chambier-bright hover:bg-chambier-lightest">
                  <Calendar className="mr-2 h-5 w-5" />
                  Agendar
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Galería de trabajos */}
        {trabajador.imagenes_trabajos && trabajador.imagenes_trabajos.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Galería de Trabajos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trabajador.imagenes_trabajos.map((imagen, index) => (
                <img
                  key={index}
                  src={imagen}
                  alt={`Trabajo ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow"
                />
              ))}
            </div>
          </div>
        )}

        {/* Reseñas */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Reseñas ({trabajador.resenas.length})
          </h2>
          
          {trabajador.resenas.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Este trabajador aún no tiene reseñas</p>
            </div>
          ) : (
            <div className="space-y-6">
              {trabajador.resenas.map((resena) => (
                <div key={resena.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-gray-800">{resena.nombre_cliente}</span>
                    <span className="text-gray-500 text-sm">
                      {format(new Date(resena.fecha), "d 'de' MMMM, yyyy", { locale: es })}
                    </span>
                  </div>
                  <div className="flex mb-2">
                    {renderStars(resena.estrellas)}
                  </div>
                  <p className="text-gray-700">{resena.comentario}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TrabajadorDetail;
