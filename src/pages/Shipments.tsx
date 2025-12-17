import { motion } from "framer-motion";
import { Package, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";

const shipments = [
  {
    id: "1",
    origin: "São Paulo, SP",
    destination: "Rio de Janeiro, RJ",
    status: "em_transito",
    date: "15 Dez",
    driver: "Carlos M.",
    description: "Caixa de documentos",
  },
  {
    id: "2",
    origin: "São Paulo, SP",
    destination: "Campinas, SP",
    status: "entregue",
    date: "10 Dez",
    driver: "Ana Paula",
    description: "Presente de aniversário",
  },
  {
    id: "3",
    origin: "Belo Horizonte, MG",
    destination: "São Paulo, SP",
    status: "pendente",
    date: "18 Dez",
    driver: "Aguardando...",
    description: "Livros",
  },
];

const statusConfig = {
  pendente: {
    label: "Pendente",
    color: "bg-accent/10 text-accent",
    icon: Clock,
  },
  em_transito: {
    label: "Em trânsito",
    color: "bg-primary/10 text-primary",
    icon: Package,
  },
  entregue: {
    label: "Entregue",
    color: "bg-green-500/10 text-green-600",
    icon: CheckCircle2,
  },
  cancelado: {
    label: "Cancelado",
    color: "bg-destructive/10 text-destructive",
    icon: XCircle,
  },
};

export default function Shipments() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Meus Envios" showLocation={false} />

      <main className="px-4">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          <div className="bg-card rounded-xl p-4 text-center shadow-card border border-border">
            <p className="text-2xl font-bold text-primary">3</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
          <div className="bg-card rounded-xl p-4 text-center shadow-card border border-border">
            <p className="text-2xl font-bold text-accent">1</p>
            <p className="text-xs text-muted-foreground">Em trânsito</p>
          </div>
          <div className="bg-card rounded-xl p-4 text-center shadow-card border border-border">
            <p className="text-2xl font-bold text-green-600">1</p>
            <p className="text-xs text-muted-foreground">Entregues</p>
          </div>
        </motion.div>

        {/* Shipment List */}
        <div className="space-y-3">
          {shipments.map((shipment, index) => {
            const status = statusConfig[shipment.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;

            return (
              <motion.div
                key={shipment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-card rounded-xl p-4 shadow-card border border-border"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <Package size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {shipment.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {shipment.date}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.color}`}
                  >
                    <StatusIcon size={12} />
                    {status.label}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{shipment.origin}</span>
                  </div>
                  <span className="text-muted-foreground">→</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full border border-primary" />
                    <span className="text-muted-foreground">{shipment.destination}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Motorista: <span className="text-foreground">{shipment.driver}</span>
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {shipments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <Package size={24} className="text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">
              Nenhum envio ainda
            </h3>
            <p className="text-sm text-muted-foreground">
              Encontre uma viagem e envie sua primeira encomenda
            </p>
          </motion.div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
