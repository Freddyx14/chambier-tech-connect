
import { useState } from "react";

export type Category = {
  id: string;
  name: string;
  icon: string;
};

interface CategoryFilterProps {
  categories: Category[];
  onSelect: (categoryId: string) => void;
  className?: string;
}

const CategoryFilter = ({ categories, onSelect, className = "" }: CategoryFilterProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSelect = (categoryId: string) => {
    const newSelected = selectedCategory === categoryId ? null : categoryId;
    setSelectedCategory(newSelected);
    onSelect(newSelected || '');
  };

  return (
    <div className={`${className}`}>
      <h3 className="text-lg font-medium text-gray-700 mb-4">Categorías</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleSelect(category.id)}
            className={`flex flex-col items-center justify-center p-4 rounded-md transition-all ${
              selectedCategory === category.id
                ? "bg-chambier-bright text-white"
                : "bg-white hover:bg-chambier-lightest text-gray-700"
            } card-shadow`}
          >
            <div className="text-2xl mb-2">{category.icon}</div>
            <span className="text-sm font-medium">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
