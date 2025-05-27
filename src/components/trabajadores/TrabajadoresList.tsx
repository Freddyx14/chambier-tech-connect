
import { useTrabajadores } from "@/hooks/useTrabajadores";
import TrabajadorCard from "./TrabajadorCard";
import { Skeleton } from "@/components/ui/skeleton";

interface TrabajadoresListProps {
  filtro?: string;
  limite?: number;
}

const TrabajadoresList = ({ filtro, limite }: TrabajadoresListProps) => {
  const { trabajadores, loading } = useTrabajadores();

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

  if (trabajadores.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-700 mb-2">
          No hay trabajadores disponibles
        </h3>
        <p className="text-gray-600">
          Los trabajadores aparecerán aquí automáticamente cuando se agreguen a la base de datos
        </p>
      </div>
    );
  }

  let trabajadoresFiltrados = trabajadores;

  // Aplicar filtro si se proporciona
  if (filtro) {
    const filtroLower = filtro.toLowerCase();
    trabajadoresFiltrados = trabajadores.filter(trabajador =>
      trabajador.nombre.toLowerCase().includes(filtroLower) ||
      trabajador.apellido.toLowerCase().includes(filtroLower) ||
      trabajador.profesiones.some(profesion => 
        profesion.toLowerCase().includes(filtroLower)
      ) ||
      (trabajador.descripcion && trabajador.descripcion.toLowerCase().includes(filtroLower))
    );
  }

  // Aplicar límite si se proporciona
  if (limite) {
    trabajadoresFiltrados = trabajadoresFiltrados.slice(0, limite);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trabajadoresFiltrados.map((trabajador) => (
        <TrabajadorCard key={trabajador.id} trabajador={trabajador} />
      ))}
    </div>
  );
};

export default TrabajadoresList;
