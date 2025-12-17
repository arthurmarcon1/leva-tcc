import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Search, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface SearchBarProps {
  onSearch?: (origin: string, destination: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(origin, destination);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-4 shadow-elevated border border-border"
    >
      <div className="space-y-3">
        {/* Origin */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <input
            type="text"
            placeholder="De onde sai?"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Divider with Arrow */}
        <div className="flex items-center justify-center">
          <div className="flex-1 h-px bg-border" />
          <div className="mx-3 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <ArrowRight size={16} className="text-muted-foreground rotate-90" />
          </div>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Destination */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
          <div className="w-3 h-3 rounded-full border-2 border-primary bg-card" />
          <input
            type="text"
            placeholder="Para onde vai?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <Button onClick={handleSearch} className="w-full mt-4" size="lg">
        <Search size={18} />
        Buscar viagens
      </Button>
    </motion.div>
  );
}
