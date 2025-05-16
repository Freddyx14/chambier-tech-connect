
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { generatePhoneVerificationCode, verifyPhoneCode } from "@/integrations/supabase/auth";
import { Loader } from "lucide-react";

interface PhoneVerificationProps {
  onVerified: (userId: string | null) => void;
  initialPhone?: string;
  onPhoneChange?: (phone: string) => void;
}

const PhoneVerification = ({ onVerified, initialPhone = "", onPhoneChange }: PhoneVerificationProps) => {
  const [phone, setPhone] = useState(initialPhone);
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"enterPhone" | "enterCode">(initialPhone ? "enterCode" : "enterPhone");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (initialPhone) {
      setPhone(initialPhone);
    }
  }, [initialPhone]);

  const updatePhone = (newPhone: string) => {
    setPhone(newPhone);
    if (onPhoneChange) {
      onPhoneChange(newPhone);
    }
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!phone || phone.length < 10) {
      toast({
        title: "Error",
        description: "Por favor, introduce un número de teléfono válido",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    const { code, error } = await generatePhoneVerificationCode(phone);
    
    setIsLoading(false);
    
    if (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar el código: " + error.message,
        variant: "destructive"
      });
      return;
    }
    
    // En producción, este código sería enviado por SMS
    // Para depuración, mostramos el código generado
    console.log("Código generado:", code);
    
    toast({
      title: "Código enviado",
      description: "Se ha enviado un código de verificación a tu teléfono"
    });
    
    setStep("enterCode");
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code || code.length !== 6) {
      toast({
        title: "Error",
        description: "Por favor, introduce un código válido de 6 dígitos",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    const { userId, error } = await verifyPhoneCode(phone, code);
    
    setIsLoading(false);
    
    if (error) {
      toast({
        title: "Error",
        description: "Código inválido o expirado",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Verificación exitosa",
      description: "Tu número de teléfono ha sido verificado"
    });
    
    onVerified(userId);
  };

  return (
    <div className="space-y-6">
      {step === "enterPhone" ? (
        <form onSubmit={handleSendCode} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Número de teléfono</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+51 999 999 999"
              value={phone}
              onChange={(e) => updatePhone(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              Ingresa tu número con código de país (ej: +51 para Perú)
            </p>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar código"
            )}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="verification-code">Código de verificación</Label>
            <div className="flex justify-center py-2">
              <InputOTP
                maxLength={6}
                value={code}
                onChange={setCode}
                render={({ slots }) => (
                  <InputOTPGroup>
                    {slots.map((slot, index) => (
                      <InputOTPSlot key={index} {...slot} index={index} />
                    ))}
                  </InputOTPGroup>
                )}
              />
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Ingresa el código de 6 dígitos enviado a {phone}
            </p>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Verificando...
              </>
            ) : (
              "Verificar código"
            )}
          </Button>
          
          <Button 
            type="button" 
            variant="outline" 
            className="w-full"
            onClick={() => setStep("enterPhone")}
          >
            Cambiar número de teléfono
          </Button>
        </form>
      )}
    </div>
  );
};

export default PhoneVerification;
