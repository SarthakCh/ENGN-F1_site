import { motion } from "framer-motion";
import { Atom, Target, Zap } from "lucide-react";
import { AlgorithmState } from "./types";

interface Props {
  algorithmState: AlgorithmState;
}

export default function LeftVisualization({ algorithmState }: Props) {
  const getStateColor = (state: string) => {
    switch (state) {
      case "superposition":
        return "text-quantum";
      case "entangled":
        return "text-accent";
      case "measured":
        return "text-neural";
      default:
        return "text-muted-foreground";
    }
  };

  const getStateGlow = (state: string) => {
    switch (state) {
      case "superposition":
        return "shadow-quantum";
      case "entangled":
        return "shadow-accent";
      case "measured":
        return "shadow-neural";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        className="text-center pb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-2xl font-bold quantum-gradient-text mb-2">
          Intelligence Eco-system
        </h3>
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground/90 font-semibold">
            Enforced Neural Generative Network + Formula 1 Speed
          </span>{" "}
          - Powered by in-house AI processing & quantum algorithms (also known
          as{" "}
          <span className="text-foreground/90 font-semibold">
            Centralized Brain
          </span>
          )
        </p>
      </motion.div>

      {/* Qubit states grid */}
      <div className="grid grid-cols-4 gap-3 pb-6">
        {algorithmState.qubits.map((qubit) => (
          <div key={qubit.id} className="flex justify-center items-center">
            <motion.div
              key={qubit.id}
              className={`relative w-14 h-14 rounded-full border-2 flex items-center justify-center backdrop-blur-sm ${
                qubit.state === "superposition"
                  ? "border-quantum bg-quantum/20"
                  : qubit.state === "entangled"
                  ? "border-accent bg-accent/20"
                  : "border-neural bg-neural/20"
              } ${getStateGlow(qubit.state)}`}
              animate={{
                scale:
                  qubit.state === "superposition" ? [1, 1.3, 1] : [1, 1.1, 1],
                rotate: qubit.state === "entangled" ? [0, 360] : 0,
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                scale: { duration: 2, repeat: Infinity },
                rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                opacity: { duration: 1.5, repeat: Infinity },
              }}
            >
              <Atom className={`w-6 h-6 ${getStateColor(qubit.state)}`} />
              <div
                className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
                  qubit.state === "superposition"
                    ? "bg-quantum"
                    : qubit.state === "entangled"
                    ? "bg-accent"
                    : "bg-neural"
                } animate-ping`}
              />
            </motion.div>
          </div>
        ))}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="metric-card p-4">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-4 h-4 text-quantum" />
            <span className="text-xs text-muted-foreground">Convergence</span>
          </div>
          <div className="text-lg font-bold text-quantum">
            {algorithmState.convergenceRate.toFixed(1)}%
          </div>
        </div>
        <div className="metric-card p-4">
          <div className="flex items-center justify-between mb-2">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-xs text-muted-foreground">Advantage</span>
          </div>
          <div className="text-lg font-bold text-accent">
            {algorithmState.quantumAdvantage.toFixed(0)}x
          </div>
        </div>
      </div>
    </div>
  );
}
