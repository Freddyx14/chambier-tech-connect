
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PersonalInfoFieldsProps {
  firstName: string;
  lastName: string;
  dni: string;
  age: string;
  phoneNumber: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalInfoFields: React.FC<PersonalInfoFieldsProps> = ({
  firstName,
  lastName,
  dni,
  age,
  phoneNumber,
  onInputChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Nombre */}
      <div className="space-y-2">
        <Label htmlFor="first_name">Primer Nombre *</Label>
        <Input
          id="first_name"
          name="first_name"
          value={firstName}
          onChange={onInputChange}
          required
        />
      </div>

      {/* Apellido */}
      <div className="space-y-2">
        <Label htmlFor="last_name">Primer Apellido *</Label>
        <Input
          id="last_name"
          name="last_name"
          value={lastName}
          onChange={onInputChange}
          required
        />
      </div>

      {/* DNI */}
      <div className="space-y-2">
        <Label htmlFor="dni">Número de DNI *</Label>
        <Input
          id="dni"
          name="dni"
          value={dni}
          onChange={onInputChange}
          required
        />
      </div>

      {/* Edad */}
      <div className="space-y-2">
        <Label htmlFor="age">Edad *</Label>
        <Input
          id="age"
          name="age"
          type="number"
          min="18"
          max="100"
          value={age}
          onChange={onInputChange}
          required
        />
      </div>

      {/* Teléfono */}
      <div className="space-y-2">
        <Label htmlFor="phone_number">Número de celular *</Label>
        <Input
          id="phone_number"
          name="phone_number"
          value={phoneNumber}
          onChange={onInputChange}
          required
        />
      </div>
    </div>
  );
};

export default PersonalInfoFields;
