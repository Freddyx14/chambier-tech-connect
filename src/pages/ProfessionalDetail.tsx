
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

const ProfessionalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirigir a la nueva página de detalle de trabajadores
    if (id) {
      navigate(`/trabajador/${id}`, { replace: true });
    }
  }, [id, navigate]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-700 mb-2">Redirigiendo...</h3>
          <p className="text-gray-600">Te estamos llevando al perfil del trabajador</p>
        </div>
      </div>
    </Layout>
  );
};

export default ProfessionalDetail;
