
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { ServiceProvider } from "@/components/ServiceCard";

// Mock data for featured professionals
const featuredProfessionals: Partial<ServiceProvider>[] = [
  {
    id: "1",
    name: "Carlos Rodríguez",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    profession: "Plomero"
  },
  {
    id: "2",
    name: "María Gómez",
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    profession: "Electricista"
  },
  {
    id: "3",
    name: "Juan Pérez",
    profileImage: "https://randomuser.me/api/portraits/men/67.jpg",
    profession: "Jardinero"
  },
  {
    id: "4",
    name: "Ana Martínez",
    profileImage: "https://randomuser.me/api/portraits/women/26.jpg",
    profession: "Pintora"
  }
];

// Mock data for service categories
const serviceCategories = [
  { id: "plumbing", name: "Plomería", icon: "🔧", count: 24 },
  { id: "electrical", name: "Electricidad", icon: "⚡", count: 18 },
  { id: "gardening", name: "Jardinería", icon: "🌱", count: 15 },
  { id: "painting", name: "Pintura", icon: "🎨", count: 22 },
  { id: "assembly", name: "Ensamblaje", icon: "🔨", count: 10 },
  { id: "cleaning", name: "Limpieza", icon: "🧹", count: 16 }
];

const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <Hero />

      {/* Popular Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-chambier-text mb-4">Explora por Categorías</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Encuentra el servicio perfecto para tus necesidades con profesionales verificados</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {serviceCategories.map((category) => (
              <Link to={`/search?category=${category.id}`} key={category.id}>
                <div className="bg-white hover:bg-gray-50 transition-all duration-300 rounded-xl p-6 text-center card-shadow hover:scale-105">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="font-semibold text-chambier-text text-sm">{category.name}</h3>
                  <p className="text-xs text-gray-500 mt-2">{category.count} profesionales</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-chambier-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-chambier-text mb-4">¿Cómo Funciona?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Tres simples pasos para encontrar al profesional perfecto</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-chambier-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg">1</div>
              <h3 className="text-2xl font-semibold text-chambier-text mb-4">Busca un Servicio</h3>
              <p className="text-gray-600 leading-relaxed">Explora categorías o busca servicios específicos según tus necesidades. Filtra por ubicación y especialidad.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-chambier-accent rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg">2</div>
              <h3 className="text-2xl font-semibold text-chambier-text mb-4">Compara Profesionales</h3>
              <p className="text-gray-600 leading-relaxed">Revisa perfiles, calificaciones y trabajos anteriores para tomar la mejor decisión. Lee reseñas reales.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-chambier-secondary rounded-full flex items-center justify-center text-chambier-text text-2xl font-bold mx-auto mb-6 shadow-lg">3</div>
              <h3 className="text-2xl font-semibold text-chambier-text mb-4">Contacta y Contrata</h3>
              <p className="text-gray-600 leading-relaxed">Comunícate directamente con el profesional para acordar detalles, horarios y precios de forma segura.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Professionals */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-chambier-text mb-4">Profesionales Destacados</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Conoce a algunos de nuestros mejores profesionales verificados</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {featuredProfessionals.map((pro) => (
              <Link to={`/profesional/${pro.id}`} key={pro.id}>
                <div className="bg-white rounded-xl overflow-hidden text-center card-shadow hover:scale-105 transition-all duration-300">
                  <div className="p-6">
                    <img
                      src={pro.profileImage}
                      alt={pro.name}
                      className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-chambier-background shadow-sm"
                    />
                    <h3 className="mt-4 font-semibold text-chambier-text text-lg">{pro.name}</h3>
                    <p className="text-chambier-primary font-medium">{pro.profession}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/search">
              <Button className="btn-primary text-lg px-8 py-4">Ver Todos los Profesionales</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Join As Professional */}
      <section className="py-20 chambier-gradient">
        <div className="container mx-auto px-4">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold text-white mb-6">¿Eres un profesional?</h2>
              <p className="text-xl text-white/90 leading-relaxed mb-8">
                Únete a Chambier y empieza a conseguir nuevos clientes. Crea tu perfil, muestra tu trabajo y construye tu reputación en línea.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-white/90">
                  <div className="w-2 h-2 bg-chambier-secondary rounded-full mr-3"></div>
                  <span>Acceso a miles de clientes potenciales</span>
                </div>
                <div className="flex items-center text-white/90">
                  <div className="w-2 h-2 bg-chambier-secondary rounded-full mr-3"></div>
                  <span>Gestiona tu agenda y servicios fácilmente</span>
                </div>
                <div className="flex items-center text-white/90">
                  <div className="w-2 h-2 bg-chambier-secondary rounded-full mr-3"></div>
                  <span>Recibe pagos de forma segura</span>
                </div>
              </div>
              <Link to="/ser-chamber">
                <Button className="bg-white text-chambier-primary hover:bg-gray-100 font-semibold text-lg px-8 py-4 shadow-lg">
                  Conviértete en un chamber
                </Button>
              </Link>
            </div>
            <div className="mt-12 md:mt-0 md:w-1/2 md:text-right">
              <img
                src="https://images.unsplash.com/photo-1580893246395-52aead8960dc?q=80&w=2874&auto=format&fit=crop"
                alt="Profesional trabajando"
                className="rounded-2xl mx-auto md:ml-auto md:mr-0 shadow-2xl"
                style={{ maxWidth: "450px" }}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
