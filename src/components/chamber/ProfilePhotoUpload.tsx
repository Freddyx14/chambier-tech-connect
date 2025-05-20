
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";

interface ProfilePhotoUploadProps {
  initialPhoto?: string | null;
  onPhotoChange: (file: File | null, preview: string | null) => void;
}

const ProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({
  initialPhoto,
  onPhotoChange
}) => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(initialPhoto || null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const preview = reader.result as string;
        setPhotoPreview(preview);
        onPhotoChange(file, preview);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    onPhotoChange(null, null);
  };

  return (
    <div className="space-y-2">
      <Label>Foto del trabajador</Label>
      <div className="flex items-center space-x-4">
        {photoPreview && (
          <div className="relative">
            <img 
              src={photoPreview} 
              alt="Preview" 
              className="w-16 h-16 rounded-full object-cover border"
            />
            <button 
              type="button"
              className="absolute -top-2 -right-2 bg-red-600 rounded-full p-0.5 text-white"
              onClick={removePhoto}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
        <div className="flex-1">
          <Label 
            htmlFor="photo-upload" 
            className="flex items-center justify-center border border-dashed border-gray-300 rounded-md p-2 cursor-pointer hover:bg-gray-50"
          >
            <Upload className="mr-2 h-4 w-4" />
            <span className="text-sm">Subir foto</span>
          </Label>
          <Input
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePhotoUpload;
