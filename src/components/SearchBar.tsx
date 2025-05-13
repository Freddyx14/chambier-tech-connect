
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className = "" }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSearch} className="flex w-full">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="¿Qué servicio necesitas?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 h-12 rounded-l-md border-r-0 focus:ring-chambier-bright focus:border-chambier-bright"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search className="h-5 w-5" />
          </div>
        </div>
        <Button 
          type="submit" 
          className="btn-primary h-12 rounded-l-none text-base px-6"
        >
          Buscar
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
