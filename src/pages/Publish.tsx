import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Package, DollarSign, ArrowRight, Check } from "lucide-react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const packageSizes = [
  { id: "envelope", label: "Envelope", description: "Documentos, cartas" },
  { id: "small", label: "Pequeno", description: "Até 30x20x10cm" },
  { id: "medium", label: "Médio", description: "Até 50x40x30cm" },
  { id: "large", label: "Grande", description: "Mala, caixa grande" },
];

export default function Publish() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    date: "",
    time: "",
    packageSize: "",
    suggestedPrice: "",
    notes: "",
  });

  const handleSubmit = () => {
    toast({
      title: "Viagem publicada!",
      description: "Sua viagem está disponível para envios.",
    });
    setStep(1);
    setFormData({
      origin: "",
      destination: "",
      date: "",
      time: "",
      packageSize: "",
      suggestedPrice: "",
      notes: "",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Publicar viagem" showLocation={false} />

      <main className="px-4">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  step >= s
                    ? "gradient-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {step > s ? <Check size={16} /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`flex-1 h-1 rounded-full transition-colors ${
                    step > s ? "bg-primary" : "bg-secondary"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Route */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-bold text-foreground mb-4">
              Qual é sua rota?
            </h2>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-card shadow-card border border-border">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <input
                  type="text"
                  placeholder="Cidade de origem"
                  value={formData.origin}
                  onChange={(e) =>
                    setFormData({ ...formData, origin: e.target.value })
                  }
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-card shadow-card border border-border">
                <div className="w-3 h-3 rounded-full border-2 border-primary bg-card" />
                <input
                  type="text"
                  placeholder="Cidade de destino"
                  value={formData.destination}
                  onChange={(e) =>
                    setFormData({ ...formData, destination: e.target.value })
                  }
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-card shadow-card border border-border">
                <label className="text-xs text-muted-foreground mb-1 block">
                  Data
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full bg-transparent outline-none text-foreground"
                />
              </div>
              <div className="p-4 rounded-xl bg-card shadow-card border border-border">
                <label className="text-xs text-muted-foreground mb-1 block">
                  Horário
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  className="w-full bg-transparent outline-none text-foreground"
                />
              </div>
            </div>

            <Button
              onClick={() => setStep(2)}
              disabled={!formData.origin || !formData.destination || !formData.date}
              className="w-full mt-4"
              size="lg"
            >
              Continuar
              <ArrowRight size={18} />
            </Button>
          </motion.div>
        )}

        {/* Step 2: Package */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-bold text-foreground mb-4">
              Qual espaço disponível?
            </h2>

            <div className="space-y-2">
              {packageSizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() =>
                    setFormData({ ...formData, packageSize: size.id })
                  }
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    formData.packageSize === size.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">
                        {size.label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {size.description}
                      </p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        formData.packageSize === size.id
                          ? "border-primary bg-primary"
                          : "border-muted-foreground"
                      }`}
                    >
                      {formData.packageSize === size.id && (
                        <Check size={14} className="text-primary-foreground" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3 mt-4">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Voltar
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!formData.packageSize}
                className="flex-1"
              >
                Continuar
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Price */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-bold text-foreground mb-4">
              Contribuição sugerida
            </h2>

            <p className="text-sm text-muted-foreground">
              Defina um valor para ajudar nos custos da viagem. Lembre-se: somos
              uma comunidade colaborativa!
            </p>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-card shadow-card border border-border">
              <DollarSign size={20} className="text-primary" />
              <span className="text-lg font-semibold text-foreground">R$</span>
              <input
                type="number"
                placeholder="0"
                value={formData.suggestedPrice}
                onChange={(e) =>
                  setFormData({ ...formData, suggestedPrice: e.target.value })
                }
                className="flex-1 bg-transparent outline-none text-2xl font-bold text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="p-4 rounded-xl bg-card shadow-card border border-border">
              <label className="text-sm text-muted-foreground mb-2 block">
                Observações (opcional)
              </label>
              <textarea
                placeholder="Ex: Aceito apenas objetos leves, disponibilidade flexível..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                rows={3}
                className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground resize-none"
              />
            </div>

            {/* Summary */}
            <div className="p-4 rounded-xl bg-secondary/50 space-y-2">
              <h3 className="font-semibold text-foreground">Resumo</h3>
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={16} className="text-primary" />
                <span className="text-foreground">
                  {formData.origin} → {formData.destination}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar size={16} className="text-primary" />
                <span className="text-foreground">
                  {formData.date} às {formData.time}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Package size={16} className="text-primary" />
                <span className="text-foreground">
                  {packageSizes.find((s) => s.id === formData.packageSize)?.label}
                </span>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Voltar
              </Button>
              <Button onClick={handleSubmit} variant="hero" className="flex-1">
                Publicar
              </Button>
            </div>
          </motion.div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
