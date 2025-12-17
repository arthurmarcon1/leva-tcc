import { motion } from "framer-motion";
import { Package, Truck, Users, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { TripCard } from "@/components/TripCard";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";

const mockTrips = [
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
];

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

export default function Index() {
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
          
          <SearchBar />
        </motion.section>

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

        {/* Available Trips */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">
              Viagens disponíveis
            </h2>
            <Button variant="ghost" size="sm" className="text-primary">
              Ver todas
              <ArrowRight size={16} />
            </Button>
          </div>

          <div className="space-y-3">
            {mockTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <TripCard {...trip} />
              </motion.div>
            ))}
          </div>
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
          <Button variant="hero" className="w-full">
            Publicar viagem
          </Button>
        </motion.section>
      </main>

      <BottomNav />
    </div>
  );
}
