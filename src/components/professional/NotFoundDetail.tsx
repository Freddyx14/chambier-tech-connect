
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFoundDetail = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Profesional no encontrado</h1>
      <p className="text-gray-600 mb-6">No pudimos encontrar el profesional que estás buscando.</p>
      <Link to="/servicios">
        <Button className="btn-primary">Ver todos los profesionales</Button>
      </Link>
    </div>
  );
};

export default NotFoundDetail;
