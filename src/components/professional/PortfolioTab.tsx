
import { PortfolioItem } from "@/types/professional";

interface PortfolioTabProps {
  portfolioItems: PortfolioItem[];
}

const PortfolioTab = ({ portfolioItems }: PortfolioTabProps) => {
  if (portfolioItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-700">No hay elementos en el portafolio</h3>
        <p className="text-gray-600">Este profesional aún no ha añadido trabajos a su portafolio</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {portfolioItems.map((item) => (
        <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
          <img
            src={item.image_url}
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
  );
};

export default PortfolioTab;
