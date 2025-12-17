import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, SlidersHorizontal, Calendar, X } from "lucide-react";
import { Header } from "@/components/Header";
import { TripCard } from "@/components/TripCard";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";

const allTrips = [
  {
    id: "1",
    origin: "São Paulo, SP",
    destination: "Rio de Janeiro, RJ",
    date: "Hoje, 14h",
    driverName: "Carlos M.",
    availableSpace: "Mala média",
    suggestedPrice: "R$ 30",
  },
  {
    id: "2",
    origin: "São Paulo, SP",
    destination: "Campinas, SP",
    date: "Amanhã, 9h",
    driverName: "Ana Paula",
    availableSpace: "Caixa pequena",
    suggestedPrice: "R$ 15",
  },
  {
    id: "3",
    origin: "São Paulo, SP",
    destination: "Curitiba, PR",
    date: "Sex, 16h",
    driverName: "Roberto S.",
    availableSpace: "Bagagem grande",
    suggestedPrice: "R$ 50",
  },
  {
    id: "4",
    origin: "Belo Horizonte, MG",
    destination: "São Paulo, SP",
    date: "Sáb, 8h",
    driverName: "Fernanda L.",
    availableSpace: "Envelope",
    suggestedPrice: "R$ 20",
  },
  {
    id: "5",
    origin: "Porto Alegre, RS",
    destination: "Florianópolis, SC",
    date: "Dom, 10h",
    driverName: "Lucas T.",
    availableSpace: "Caixa média",
    suggestedPrice: "R$ 25",
  },
];

const filters = ["Hoje", "Esta semana", "Perto de mim", "Menor preço"];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredTrips = allTrips.filter(
    (trip) =>
      trip.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Buscar" showLocation={false} />

      <main className="px-4 space-y-4">
        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="flex items-center gap-3 p-4 rounded-xl bg-card shadow-card border border-border">
            <SearchIcon size={20} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar cidade ou rota..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")}>
                <X size={18} className="text-muted-foreground" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide"
        >
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 gap-2"
          >
            <SlidersHorizontal size={16} />
            Filtros
          </Button>
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "secondary"}
              size="sm"
              onClick={() =>
                setActiveFilter(activeFilter === filter ? null : filter)
              }
              className="shrink-0"
            >
              {filter}
            </Button>
          ))}
        </motion.div>

        {/* Results */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            {filteredTrips.length} viagens encontradas
          </p>

          <AnimatePresence mode="popLayout">
            {filteredTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.05 * index }}
              >
                <TripCard {...trip} />
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredTrips.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                <SearchIcon size={24} className="text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">
                Nenhuma viagem encontrada
              </h3>
              <p className="text-sm text-muted-foreground">
                Tente buscar por outra cidade
              </p>
            </motion.div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
