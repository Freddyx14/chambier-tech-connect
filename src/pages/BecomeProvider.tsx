import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Check, Award, HandHelping, Star, UserCheck, Rocket } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
const BecomeProvider = () => {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const handleContactClick = () => {
    window.open("https://wa.link/y5v8or", "_blank");
  };
  const handleCompanyContactClick = () => {
    window.open("https://wa.link/9pkrr2", "_blank");
  };
  return <Layout>
      {/* Hero Section */}
      <section className="py-8 md:py-12 chambier-gradient relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Más clientes, menos vueltas
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto">
            Hazte visible con Chambier
          </p>
          <div className="mt-8">
            <img src="https://img.freepik.com/foto-gratis/concepto-entrega-guapo-hombre-africano-entrega-america-cruzo-brazos-sobre-aislado-fondo-estudio-gris-espacio-copia_1258-1277.jpg?semt=ais_hybrid&w=740" alt="Profesional feliz" className="rounded-xl shadow-2xl max-w-md mx-auto h-48 object-cover border-4 border-white/20" />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-chambier-background via-white to-chambier-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-chambier-text font-heading">Beneficios de ser chamber</h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-chambier-primary to-chambier-accent mx-auto mt-6 mb-8 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre todas las ventajas de formar parte de nuestra comunidad profesional
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Benefit 1 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-chambier-primary/10 hover:border-chambier-primary/30 hover:-translate-y-2">
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-chambier-primary to-chambier-primary-dark rounded-2xl p-3 mr-6 shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <UserCheck className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-chambier-text mb-4 font-heading">Mayor visibilidad profesional</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <Check className="text-chambier-accent h-6 w-6 mr-3 mt-1 shrink-0" />
                      <span className="leading-relaxed">Tu perfil estará disponible para cientos (o miles) de personas que necesitan tus servicios.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-chambier-accent h-6 w-6 mr-3 mt-1 shrink-0" />
                      <span className="leading-relaxed">Ya no dependes solo del boca a boca o redes personales para conseguir clientes.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-chambier-accent/10 hover:border-chambier-accent/30 hover:-translate-y-2">
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-chambier-accent to-chambier-accent-dark rounded-2xl p-3 mr-6 shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Rocket className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-chambier-text mb-4 font-heading">Crece tu negocio</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <Check className="text-chambier-primary h-6 w-6 mr-3 mt-1 shrink-0" />
                      <span className="leading-relaxed">Te ayudamos a encontrar clientes, mientras tú te enfocas en lo que mejor sabes hacer.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-chambier-primary h-6 w-6 mr-3 mt-1 shrink-0" />
                      <span className="leading-relaxed">Genera ingresos más constantes sin pagar por anuncios.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-chambier-secondary/10 hover:border-chambier-secondary/30 hover:-translate-y-2">
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-chambier-secondary to-chambier-secondary-dark rounded-2xl p-3 mr-6 shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-8 w-8 text-chambier-text" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-chambier-text mb-4 font-heading">Pon tus propios precios</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <Check className="text-chambier-accent h-6 w-6 mr-3 mt-1 shrink-0" />
                      <span className="leading-relaxed">Tú decides cuánto cobrar y de qué manera, si por hora, por trabajo realizado, etc.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-chambier-primary/10 hover:border-chambier-primary/30 hover:-translate-y-2">
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-chambier-primary-light to-chambier-primary rounded-2xl p-3 mr-6 shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-chambier-text mb-4 font-heading">Presenta tu experiencia con ejemplos</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <Check className="text-chambier-secondary h-6 w-6 mr-3 mt-1 shrink-0" />
                      <span className="leading-relaxed">Muestra fotos de trabajos anteriores y demuestra tu calidad antes de ser contratado.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-chambier-secondary h-6 w-6 mr-3 mt-1 shrink-0" />
                      <span className="leading-relaxed">Aumenta la confianza del cliente desde el primer contacto.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Benefit 5 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-chambier-accent/10 hover:border-chambier-accent/30 hover:-translate-y-2">
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-chambier-accent-light to-chambier-accent rounded-2xl p-3 mr-6 shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-chambier-text mb-4 font-heading">Perfil con reputación digital</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <Check className="text-chambier-primary h-6 w-6 mr-3 mt-1 shrink-0" />
                      <span className="leading-relaxed">Crea tu historial con reseñas verificadas de clientes satisfechos.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-chambier-primary h-6 w-6 mr-3 mt-1 shrink-0" />
                      <span className="leading-relaxed">Mejora tu reputación y posiciónate como un profesional confiable y de calidad.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Benefit 6 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-chambier-secondary/10 hover:border-chambier-secondary/30 hover:-translate-y-2">
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-chambier-secondary-light to-chambier-secondary rounded-2xl p-3 mr-6 shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <HandHelping className="h-8 w-8 text-chambier-text" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-chambier-text mb-4 font-heading">Sé tu propio jefe</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <Check className="text-chambier-accent h-6 w-6 mr-3 mt-1 shrink-0" />
                      <span className="leading-relaxed">Trabaja cuando quieras, como quieras, sobre lo que quieras.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-chambier-accent h-6 w-6 mr-3 mt-1 shrink-0" />
                      <span className="leading-relaxed">Ofrece todos los servicios en los que seas especialista con horarios de acuerdo a tu disponibilidad.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-chambier-primary/5 via-chambier-accent/5 to-chambier-secondary/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-chambier-text font-heading">Pasos para empezar</h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-chambier-secondary to-chambier-primary mx-auto mt-6 mb-8 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comenzar es más fácil de lo que piensas, solo sigue estos simples pasos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center hover:-translate-y-2 border border-chambier-primary/10 hover:border-chambier-primary/30">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 bg-gradient-to-br from-chambier-primary to-chambier-primary-dark rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">1</div>
              </div>
              <div className="pt-6">
                <h3 className="text-2xl font-semibold text-chambier-text mb-4 font-heading">Regístrate</h3>
                <p className="text-gray-700 leading-relaxed">Crea una cuenta en nuestra plataforma de forma rápida y sencilla.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center hover:-translate-y-2 border border-chambier-accent/10 hover:border-chambier-accent/30">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 bg-gradient-to-br from-chambier-accent to-chambier-accent-dark rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">2</div>
              </div>
              <div className="pt-6">
                <h3 className="text-2xl font-semibold text-chambier-text mb-4 font-heading">Crea tu perfil</h3>
                <p className="text-gray-700 leading-relaxed">Completa tus datos, qué servicios quieres ofrecer y ejemplos si tienes.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center hover:-translate-y-2 border border-chambier-secondary/10 hover:border-chambier-secondary/30">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 bg-gradient-to-br from-chambier-secondary to-chambier-secondary-dark rounded-full flex items-center justify-center text-chambier-text text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">3</div>
              </div>
              <div className="pt-6">
                <h3 className="text-2xl font-semibold text-chambier-text mb-4 font-heading">Empieza a recibir trabajos</h3>
                <p className="text-gray-700 leading-relaxed">Crece tu negocio atrayendo nuevos clientes a través de nuestra plataforma.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-chambier-primary via-chambier-primary-dark to-chambier-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6 font-heading">¿Estás listo para crecer como profesional?</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto opacity-90">
            Únete a nuestra comunidad de profesionales y expande tu negocio.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Button onClick={handleContactClick} size="lg" className="bg-white text-chambier-primary hover:bg-gray-100 text-lg px-12 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold">
              Contactar para ser chamber
            </Button>
            <Button onClick={handleCompanyContactClick} size="lg" variant="outline" className="border-2 border-white hover:bg-white text-lg px-12 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold text-teal-500">
              Soy empresa, quiero contactarme
            </Button>
          </div>
        </div>
      </section>
    </Layout>;
};
export default BecomeProvider;