
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star } from "lucide-react";
import Layout from "@/components/Layout";

// Mock data - would be fetched from an API in a real app
const mockProfessional = {
  id: "1",
  name: "Carlos Rodríguez",
  profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
  profession: "Plomero",
  description: "Más de 10 años de experiencia en todo tipo de servicios de plomería. Experto en reparaciones e instalaciones de sistemas hidráulicos residenciales y comerciales.",
  skills: ["Reparaciones", "Instalaciones", "Fugas", "Desagües", "Calentadores"],
  rating: 4.8,
  reviewCount: 56,
  contactInfo: {
    phone: "+52 123 456 7890",
    email: "carlos.rodriguez@email.com",
    whatsapp: "+52 123 456 7890"
  },
  reviews: [
    {
      id: "r1",
      user: "Ana M.",
      date: "15 de abril, 2023",
      rating: 5,
      comment: "Excelente trabajo arreglando una fuga complicada. Muy profesional y puntual."
    },
    {
      id: "r2",
      user: "Ricardo L.",
      date: "2 de marzo, 2023",
      rating: 4,
      comment: "Buen trabajo instalando un nuevo lavabo. Precio justo y trabajo limpio."
    },
    {
      id: "r3",
      user: "María P.",
      date: "18 de febrero, 2023",
      rating: 5,
      comment: "Muy recomendable. Solucionó un problema que otros plomeros no pudieron resolver."
    }
  ],
  portfolio: [
    {
      id: "p1",
      title: "Instalación de Calentador",
      image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGx1bWJpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      description: "Instalación completa de sistema de calentador de agua."
    },
    {
      id: "p2",
      title: "Reparación de Tubería",
      image: "https://images.unsplash.com/photo-1615266508770-52a0d7225d35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGx1bWJpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      description: "Reparación de fugas en tuberías del baño principal."
    },
    {
      id: "p3",
      title: "Instalación de Lavabo",
      image: "https://images.unsplash.com/photo-1593424718424-cf4d83f3def1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGx1bWJpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      description: "Instalación completa de lavabo moderno en baño de visitas."
    }
  ]
};

const ProfessionalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoggedIn] = useState(false); // This would be determined by your authentication system
  
  // In a real app, you would fetch the professional data based on the ID
  const professional = mockProfessional;

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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Professional Header */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:flex-shrink-0">
              <img
                src={professional.profileImage}
                alt={professional.name}
                className="w-36 h-36 rounded-full object-cover border-4 border-chambier-lightest mx-auto md:mx-0"
              />
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800">{professional.name}</h1>
              <p className="text-xl text-chambier-bright font-medium">{professional.profession}</p>
              
              <div className="flex items-center mt-2 justify-center md:justify-start">
                <div className="flex">{renderStars(professional.rating)}</div>
                <span className="ml-2 text-gray-600">({professional.reviewCount} reseñas)</span>
              </div>
              
              <p className="mt-4 text-gray-700 max-w-2xl">{professional.description}</p>
              
              <div className="mt-6">
                {isLoggedIn ? (
                  <div className="space-x-4">
                    <Button className="btn-primary">
                      <span className="mr-2">📱</span> Llamar
                    </Button>
                    <Button variant="outline" className="border-chambier-bright text-chambier-bright hover:bg-chambier-lightest">
                      <span className="mr-2">📧</span> Enviar Email
                    </Button>
                    <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-50">
                      <span className="mr-2">📱</span> WhatsApp
                    </Button>
                  </div>
                ) : (
                  <Link to="/login">
                    <Button className="btn-primary">
                      Inicia sesión para contactar
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs for Portfolio and Reviews */}
        <div className="mt-8">
          <Tabs defaultValue="portfolio" className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
              <TabsTrigger value="portfolio">Portafolio</TabsTrigger>
              <TabsTrigger value="reviews">Reseñas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="portfolio" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {professional.portfolio.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800">{item.title}</h3>
                      <p className="text-gray-600 mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {professional.reviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-lg p-4 shadow-md">
                    <div className="flex justify-between">
                      <span className="font-medium">{review.user}</span>
                      <span className="text-gray-500 text-sm">{review.date}</span>
                    </div>
                    <div className="flex mt-1">
                      {renderStars(review.rating)}
                    </div>
                    <p className="mt-2 text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ProfessionalDetail;
