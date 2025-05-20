
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, X } from "lucide-react";

export interface PortfolioImage {
  id?: string;
  file?: File;
  preview: string;
  url?: string;
  description: string;
}

interface PortfolioUploaderProps {
  images: PortfolioImage[];
  onAddImages: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdateDescription: (index: number, description: string) => void;
  onRemoveImage: (index: number) => void;
}

const PortfolioUploader: React.FC<PortfolioUploaderProps> = ({
  images,
  onAddImages,
  onUpdateDescription,
  onRemoveImage
}) => {
  return (
    <div className="space-y-4">
      <Label>Imágenes o ejemplos de trabajos anteriores (opcional)</Label>
      
      {/* Lista de imágenes seleccionadas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {images.map((image, index) => (
          <Card key={index} className="overflow-hidden">
            <img 
              src={image.preview} 
              alt={`Portfolio ${index}`} 
              className="w-full h-40 object-cover"
            />
            <CardContent className="p-3">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium">Descripción</p>
                <button 
                  type="button"
                  onClick={() => onRemoveImage(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <Input
                value={image.description}
                onChange={(e) => onUpdateDescription(index, e.target.value)}
                placeholder="Describe esta imagen"
                className="text-sm"
              />
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Botón para agregar más imágenes */}
      <div className="mt-4">
        <Label 
          htmlFor="portfolio-upload" 
          className="flex items-center justify-center border border-dashed border-gray-300 rounded-md p-4 cursor-pointer hover:bg-gray-50"
        >
          <Plus className="mr-2 h-5 w-5 text-gray-500" />
          <span>Agregar imágenes de trabajos</span>
        </Label>
        <Input
          id="portfolio-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={onAddImages}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default PortfolioUploader;
