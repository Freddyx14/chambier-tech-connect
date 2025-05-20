
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Worker Icon */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-chambier-bright">Chambier</span>
              <img 
                src="https://i.imgur.com/3Xoa4pn.png" 
                alt="Trabajador Chambier" 
                className="h-7 ml-1" 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            <Link to="/" className="font-medium text-gray-700 hover:text-chambier-bright">Inicio</Link>
            <Link to="/ser-chamber" className="font-medium text-gray-700 hover:text-chambier-bright">Conviértete en un chamber</Link>
          </nav>

          {/* Desktop Login/Register */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/search" className="text-gray-700 hover:text-chambier-bright">
              <Search className="h-5 w-5" />
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative rounded-full h-10 w-10 flex items-center justify-center bg-chambier-bright text-white">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-4 py-2 text-sm font-medium border-b">
                    {user.email || "Mi perfil"}
                  </div>
                  <DropdownMenuItem asChild>
                    <Link to="/perfil" className="cursor-pointer">Mi perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/crear-chamber" className="cursor-pointer">Crear perfil profesional</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer text-destructive focus:text-destructive">
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login" className="font-medium text-gray-700 hover:text-chambier-bright">Iniciar Sesión</Link>
                <Link to="/register">
                  <Button className="btn-primary">Registrarse</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-gray-700 hover:text-chambier-bright"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 font-medium text-gray-700 hover:text-chambier-bright">Inicio</Link>
            <Link to="/ser-chamber" className="block px-3 py-2 font-medium text-gray-700 hover:text-chambier-bright">Conviértete en un chamber</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-5 space-y-2">
              <Link to="/search" className="block font-medium text-gray-700 hover:text-chambier-bright">
                <div className="flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  <span>Buscar</span>
                </div>
              </Link>
              
              {user ? (
                <>
                  <Link to="/perfil" className="block font-medium text-gray-700 hover:text-chambier-bright">Mi perfil</Link>
                  <Link to="/crear-chamber" className="block font-medium text-gray-700 hover:text-chambier-bright">Crear perfil profesional</Link>
                  <Button onClick={signOut} variant="destructive" className="w-full mt-2">
                    Cerrar sesión
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block font-medium text-gray-700 hover:text-chambier-bright">Iniciar Sesión</Link>
                  <Link to="/register" className="block w-full">
                    <Button className="btn-primary w-full">Registrarse</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
