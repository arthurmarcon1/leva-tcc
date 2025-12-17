import { motion } from "framer-motion";
import {
  User,
  Settings,
  Star,
  Package,
  Car,
  ChevronRight,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Package, label: "Envios", value: "12" },
  { icon: Car, label: "Viagens", value: "5" },
  { icon: Star, label: "Avaliação", value: "4.8" },
];

const menuItems = [
  { icon: Bell, label: "Notificações", badge: "3" },
  { icon: Shield, label: "Verificação de perfil" },
  { icon: Settings, label: "Configurações" },
  { icon: HelpCircle, label: "Ajuda e suporte" },
];

export default function Profile() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Perfil" showLocation={false} />

      <main className="px-4 space-y-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-6 shadow-card border border-border text-center"
        >
          <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 relative">
            <User size={40} className="text-muted-foreground" />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full gradient-primary flex items-center justify-center shadow-soft">
              <Star size={14} className="text-primary-foreground fill-primary-foreground" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-foreground">João Silva</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Membro desde Dez 2024
          </p>
          <Button variant="outline" size="sm">
            Editar perfil
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-xl p-4 text-center shadow-card border border-border"
            >
              <stat.icon size={20} className="text-primary mx-auto mb-2" />
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Verification Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="gradient-primary rounded-xl p-4 flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <Shield size={24} className="text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-primary-foreground">
              Verifique seu perfil
            </h3>
            <p className="text-xs text-primary-foreground/80">
              Aumente a confiança da comunidade
            </p>
          </div>
          <ChevronRight className="text-primary-foreground" />
        </motion.div>

        {/* Menu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-xl shadow-card border border-border overflow-hidden"
        >
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors ${
                index !== menuItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <item.icon size={18} className="text-foreground" />
              </div>
              <span className="flex-1 text-left font-medium text-foreground">
                {item.label}
              </span>
              {item.badge && (
                <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs font-semibold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
              <ChevronRight size={18} className="text-muted-foreground" />
            </button>
          ))}
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            variant="ghost"
            className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut size={18} />
            Sair da conta
          </Button>
        </motion.div>

        {/* About */}
        <p className="text-center text-xs text-muted-foreground pb-4">
          LevaMeu v1.0.0 • Feito com 💚 pela comunidade
        </p>
      </main>

      <BottomNav />
    </div>
  );
}
