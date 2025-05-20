
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

const LoginRequiredPage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-16 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">Autenticación requerida</h1>
          
          <p className="mb-8 text-gray-600">
            Para acceder a esta sección necesitas iniciar sesión o crear una cuenta si aún no la tienes.
          </p>
          
          <div className="space-y-4">
            <Link to="/login" className="w-full block">
              <Button className="w-full">Iniciar sesión</Button>
            </Link>
            
            <p className="text-sm text-gray-500">¿No tienes una cuenta?</p>
            
            <Link to="/register" className="w-full block">
              <Button variant="outline" className="w-full">Crear cuenta</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginRequiredPage;
