
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export type ServiceType = 
  | "plomero" 
  | "jardinero" 
  | "electricista" 
  | "limpieza" 
  | "pintura"
  | "cerrajero"
  | "ensamblador"
  | "soldador"
  | "otro";

export const serviceOptions = [
  { id: 'plomero' as ServiceType, label: 'Plomero' },
  { id: 'jardinero' as ServiceType, label: 'Jardinero' },
  { id: 'electricista' as ServiceType, label: 'Electricista' },
  { id: 'limpieza' as ServiceType, label: 'Limpieza' },
  { id: 'pintura' as ServiceType, label: 'Pintura' },
  { id: 'cerrajero' as ServiceType, label: 'Cerrajero' },
  { id: 'ensamblador' as ServiceType, label: 'Ensamblador' },
  { id: 'soldador' as ServiceType, label: 'Soldador' },
  { id: 'otro' as ServiceType, label: 'Otro' }
];

interface ServiceSelectorProps {
  selectedServices: ServiceType[];
  otherService: string;
  onServiceChange: (serviceId: ServiceType, checked: boolean) => void;
  onOtherServiceChange: (value: string) => void;
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  selectedServices,
  otherService,
  onServiceChange,
  onOtherServiceChange
}) => {
  return (
    <div className="space-y-4">
      <Label>Servicios que desea ofrecer *</Label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {serviceOptions.map((service) => (
          <div key={service.id} className="flex items-center space-x-2">
            <Checkbox 
              id={`service-${service.id}`}
              checked={selectedServices.includes(service.id)}
              onCheckedChange={(checked) => 
                onServiceChange(service.id, checked as boolean)
              }
            />
            <Label htmlFor={`service-${service.id}`} className="cursor-pointer">
              {service.label}
            </Label>
          </div>
        ))}
      </div>

      {selectedServices.includes('otro') && (
        <div className="mt-3">
          <Label htmlFor="other_service">Especificar otro servicio *</Label>
          <Input
            id="other_service"
            value={otherService}
            onChange={(e) => onOtherServiceChange(e.target.value)}
            placeholder="Especifica qué otro servicio ofreces"
            required
          />
        </div>
      )}
    </div>
  );
};

export default ServiceSelector;
