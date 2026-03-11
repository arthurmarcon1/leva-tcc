import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Package, Truck, Users, MapPin, Calendar, ChevronRight } from "lucide-react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const features = [
  {
    icon: Package,
    title: "Envie qualquer coisa",
    description: "Encomendas, presentes, documentos",
  },
  {
    icon: Truck,
    title: "Viajantes reais",
    description: "Conecte com quem já vai viajar",
  },
  {
    icon: Users,
    title: "Sem fins lucrativos",
    description: "Apenas custos compartilhados",
  },
];

interface Trip {
  id: string;
  origin: string;
  destination: string;
  trip_date: string;
  status: string;
  suggested_price: number;
}

export default function Index() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [myTrips, setMyTrips] = useState<Trip[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("trips")
      .select("id, origin, destination, trip_date, status, suggested_price")
      .eq("user_id", user.id)
      .eq("status", "active")
      .order("trip_date", { ascending: true })
      .limit(5)
      .then(({ data }) => setMyTrips(data || []));
  }, [user]);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />
      
      <main className="px-4 space-y-6">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="gradient-hero rounded-2xl p-6 -mx-4"
        >
          <h2 className="text-xl font-bold text-foreground mb-2">
            Envie suas encomendas{"\n"}com quem já vai viajar
          </h2>
          <p className="text-muted-foreground text-sm mb-4">
            Economia colaborativa e sustentável
          </p>
          
          <SearchBar onSearch={(origin, destination) => {
            navigate("/search", { state: { origin, destination } });
          }} />
        </motion.section>

        {/* Suas Viagens */}
        {myTrips.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-card rounded-xl p-4 shadow-card border border-border"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Truck size={16} className="text-primary" />
                Suas Viagens
              </h3>
              <button
                onClick={() => navigate("/profile")}
                className="text-xs text-primary font-medium flex items-center gap-0.5"
              >
                Ver todas <ChevronRight size={12} />
              </button>
            </div>
            <div className="space-y-2">
              {myTrips.map((trip) => (
                <div key={trip.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 text-sm font-medium text-foreground">
                      <MapPin size={12} className="text-primary shrink-0" />
                      <span className="truncate">{trip.origin}</span>
                      <span className="text-muted-foreground mx-1">→</span>
                      <span className="truncate">{trip.destination}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar size={10} />
                        {new Date(trip.trip_date).toLocaleDateString("pt-BR")}
                      </span>
                      <span className="text-xs font-medium text-primary">
                        R$ {trip.suggested_price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Features */}
        <section className="grid grid-cols-3 gap-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-card rounded-xl p-3 text-center shadow-card border border-border"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <feature.icon size={18} className="text-primary" />
              </div>
              <h3 className="text-xs font-semibold text-foreground mb-0.5">
                {feature.title}
              </h3>
              <p className="text-[10px] text-muted-foreground leading-tight">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl p-6 shadow-card border border-border text-center"
        >
          <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
            <Truck size={28} className="text-primary-foreground" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">
            Vai viajar?
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Publique sua viagem e ajude alguém a enviar uma encomenda
          </p>
          <Button variant="hero" className="w-full" onClick={() => navigate("/publish")}>
            Publicar viagem
          </Button>
        </motion.section>
      </main>

      <BottomNav />
    </div>
  );
}
