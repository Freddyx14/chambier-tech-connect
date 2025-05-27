
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Check, Award, HandHelping, Star, UserCheck, Rocket } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const BecomeProvider = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const handleContactClick = () => {
    window.open("https://wa.link/y5v8or", "_blank");
  };
  
  const handleCompanyContactClick = () => {
    window.open("https://wa.link/kajg2u", "_blank");
  };
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-8 md:py-12 chambier-gradient relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
            Más clientes, menos vueltas
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-3xl mx-auto">
            Hazte visible con Chambier
          </p>
          <div className="mt-4">
            <img 
              src="https://img.freepik.com/foto-gratis/concepto-entrega-guapo-hombre-africano-entrega-america-cruzo-brazos-sobre-aislado-fondo-estudio-gris-espacio-copia_1258-1277.jpg?semt=ais_hybrid&w=740" 
              alt="Profesional feliz" 
              className="rounded-lg shadow-xl max-w-md mx-auto h-48 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Beneficios de ser chamber</h2>
            <div className="w-24 h-1 bg-chambier-bright mx-auto mt-4 mb-8 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Benefit 1 */}
            <div className="bg-chambier-lightest p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start">
                <div className="bg-chambier-bright rounded-full p-2 mr-4 shrink-0">
                  <UserCheck className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Mayor visibilidad profesional</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <Check className="text-chambier-bright h-5 w-5 mr-2 mt-1 shrink-0" />
                      <span>Tu perfil estará disponible para cientos (o miles) de personas que necesitan tus servicios.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-chambier-bright h-5 w-5 mr-2 mt-1 shrink-0" />
                      <span>Ya no dependes solo del boca a boca o redes personales para conseguir clientes.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="bg-chambier-lightest p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start">
                <div className="bg-chambier-bright rounded-full p-2 mr-4 shrink-0">
                  <Rocket className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Crece tu negocio</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <Check className="text-chambier-bright h-5 w-5 mr-2 mt-1 shrink-0" />
                      <span>Te ayudamos a encontrar clientes, mientras tú te enfocas en lo que mejor sabes hacer.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-chambier-bright h-5 w-5 mr-2 mt-1 shrink-0" />
                      <span>Genera ingresos más constantes sin pagar por anuncios.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="bg-chambier-lightest p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start">
                <div className="bg-chambier-bright rounded-full p-2 mr-4 shrink-0">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Pon tus propios precios</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <Check className="text-chambier-bright h-5 w-5 mr-2 mt-1 shrink-0" />
                      <span>Tú decides cuánto cobrar y de qué manera, si por hora, por trabajo realizado, etc.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="bg-chambier-lightest p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start">
                <div className="bg-chambier-bright rounded-full p-2 mr-4 shrink-0">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Presenta tu experiencia con ejemplos</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <Check className="text-chambier-bright h-5 w-5 mr-2 mt-1 shrink-0" />
                      <span>Muestra fotos de trabajos anteriores y demuestra tu calidad antes de ser contratado.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-chambier-bright h-5 w-5 mr-2 mt-1 shrink-0" />
                      <span>Aumenta la confianza del cliente desde el primer contacto.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Benefit 5 */}
            <div className="bg-chambier-lightest p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start">
                <div className="bg-chambier-bright rounded-full p-2 mr-4 shrink-0">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Perfil con reputación digital</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <Check className="text-chambier-bright h-5 w-5 mr-2 mt-1 shrink-0" />
                      <span>Crea tu historial con reseñas verificadas de clientes satisfechos.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-chambier-bright h-5 w-5 mr-2 mt-1 shrink-0" />
                      <span>Mejora tu reputación y posiciónate como un profesional confiable y de calidad.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Benefit 6 */}
            <div className="bg-chambier-lightest p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start">
                <div className="bg-chambier-bright rounded-full p-2 mr-4 shrink-0">
                  <HandHelping className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Sé tu propio jefe</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <Check className="text-chambier-bright h-5 w-5 mr-2 mt-1 shrink-0" />
                      <span>Trabaja cuando quieras, como quieras, sobre lo que quieras.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-chambier-bright h-5 w-5 mr-2 mt-1 shrink-0" />
                      <span>Ofrece todos los servicios en los que seas especialista con horarios de acuerdo a tu disponibilidad.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-chambier-lightest">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Pasos para empezar</h2>
            <div className="w-24 h-1 bg-chambier-bright mx-auto mt-4 mb-8 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="w-16 h-16 bg-chambier-bright rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Regístrate</h3>
              <p className="text-gray-700">Crea una cuenta en nuestra plataforma de forma rápida y sencilla.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="w-16 h-16 bg-chambier-bright rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Crea tu perfil</h3>
              <p className="text-gray-700">Completa tus datos, qué servicios quieres ofrecer y ejemplos si tienes.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="w-16 h-16 bg-chambier-bright rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Empieza a recibir trabajos</h3>
              <p className="text-gray-700">Crece tu negocio atrayendo nuevos clientes a través de nuestra plataforma.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">¿Estás listo para crecer como profesional?</h2>
          <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Únete a nuestra comunidad de profesionales y expande tu negocio.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button onClick={handleContactClick} size="lg" className="btn-primary text-lg px-10 py-6 shadow-lg hover:shadow-xl">
              Contactar para ser chamber
            </Button>
            <Button onClick={handleCompanyContactClick} size="lg" variant="outline" className="text-lg px-10 py-6 shadow-lg hover:shadow-xl">
              Soy empresa, quiero contactarme
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BecomeProvider;
