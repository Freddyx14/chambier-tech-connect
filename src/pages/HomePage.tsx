
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Explora por Categorías</h2>
            <p className="mt-2 text-gray-600">Encuentra el servicio perfecto para tus necesidades</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {serviceCategories.map((category) => (
              <Link to={`/search?category=${category.id}`} key={category.id}>
                <div className="bg-chambier-lightest hover:bg-chambier-lighter transition-colors rounded-lg p-6 text-center card-shadow">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-medium text-gray-800">{category.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{category.count} profesionales</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-chambier-lightest">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">¿Cómo Funciona?</h2>
            <p className="mt-2 text-gray-600">Tres simples pasos para encontrar al profesional perfecto</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-chambier-bright rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto">1</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">Busca un Servicio</h3>
              <p className="mt-2 text-gray-600">Explora categorías o busca servicios específicos según tus necesidades.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-chambier-bright rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto">2</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">Compara Profesionales</h3>
              <p className="mt-2 text-gray-600">Revisa perfiles, calificaciones y trabajos anteriores para tomar la mejor decisión.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-chambier-bright rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto">3</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">Contacta y Contrata</h3>
              <p className="mt-2 text-gray-600">Comunícate directamente con el profesional para acordar detalles y precios.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Professionals */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Profesionales Destacados</h2>
            <p className="mt-2 text-gray-600">Conoce a algunos de nuestros mejores profesionales</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProfessionals.map((pro) => (
              <Link to={`/profesional/${pro.id}`} key={pro.id}>
                <div className="bg-white rounded-lg overflow-hidden text-center card-shadow">
                  <div className="p-4">
                    <img
                      src={pro.profileImage}
                      alt={pro.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-chambier-lightest"
                    />
                    <h3 className="mt-3 font-semibold text-gray-800">{pro.name}</h3>
                    <p className="text-chambier-bright">{pro.profession}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/search">
              <Button className="btn-primary">Ver Todos los Profesionales</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Join As Professional */}
      <section className="py-16 chambier-gradient">
        <div className="container mx-auto px-4">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800">¿Eres un profesional?</h2>
              <p className="mt-4 text-lg text-gray-700">
                Únete a Chambier y empieza a conseguir nuevos clientes. Crea tu perfil, muestra tu trabajo y construye tu reputación en línea.
              </p>
              <div className="mt-6">
                <Link to="/profesionales">
                  <Button className="btn-primary">Únete como Profesional</Button>
                </Link>
              </div>
            </div>
            <div className="mt-10 md:mt-0 md:w-1/2 md:text-right">
              <img
                src="https://images.unsplash.com/photo-1529316711860-4d65b9b7cf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYWRlc21hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt="Profesional"
                className="rounded-lg mx-auto md:ml-auto md:mr-0 shadow-lg"
                style={{ maxWidth: "400px" }}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
