import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import QuantumCanvas from "./QuantumCanvas";
import LeftVisualization from "./LeftVisualization";
import RightVisualization from "./RightVisualization";
import NeuralNetworkBackground from "../CustomUI/NeuralNetworkBackground.tsx";
import { AlgorithmState, Metrics } from "./types.ts";

export default function QuantumAlgorithmVisualization() {
  const [algorithmState, setAlgorithmState] = useState<AlgorithmState>({
    qubits: [],
    optimizationProgress: 0,
    convergenceRate: 0,
    quantumAdvantage: 1,
    problemComplexity: 0,
    neuralNetworks: 0,
    quantumProcessing: 0,
  });

  const { data: metrics } = useQuery<Metrics>({
    queryKey: ["/api/metrics"],
    queryFn: () => fetch("/api/metrics").then((res) => res.json()),
    refetchInterval: 1500,
    refetchIntervalInBackground: true,
    staleTime: 0, // no caching
    gcTime: 0, // throw away old cache
  });

  useEffect(() => {
    // Initialize quantum algorithm visualization
    const initializeQubits = () => {
      const qubits = Array.from({ length: 16 }, (_, i) => ({
        id: i,
        state:
          Math.random() > 0.6
            ? "superposition"
            : Math.random() > 0.3
            ? "entangled"
            : "measured",
        probability: Math.random(),
        x: 50 + Math.cos(i * 0.4) * 30,
        y: 50 + Math.sin(i * 0.4) * 30,
      })) as AlgorithmState["qubits"];

      setAlgorithmState((prev) => ({
        ...prev,
        qubits,
        optimizationProgress: Math.random() * 100,
        convergenceRate: 95 + Math.random() * 5,
        quantumAdvantage: 1000 + Math.random() * 500,
        problemComplexity: Math.floor(Math.random() * 199) + 2,
        neuralNetworks: Math.floor(Math.random() * 100) + 1,
        quantumProcessing: Math.floor(Math.random() * 1000),
      }));
    };

    initializeQubits();

    const interval = setInterval(() => {
      setAlgorithmState((prev) => ({
        ...prev,
        qubits: prev.qubits.map((qubit) => ({
          ...qubit,
          state:
            Math.random() > 0.7
              ? "superposition"
              : Math.random() > 0.4
              ? "entangled"
              : "measured",
          probability: Math.random(),
          x: qubit.x + (Math.random() - 0.5) * 2,
          y: qubit.y + (Math.random() - 0.5) * 2,
        })),
        optimizationProgress: Math.min(
          prev.optimizationProgress + Math.random() * 5,
          100
        ),
        convergenceRate: 95 + Math.random() * 5,
        quantumAdvantage: 1000 + Math.random() * 500,
        problemComplexity: Math.floor(Math.random() * 199) + 2,
        neuralNetworks: Math.floor(Math.random() * 100) + 1,
        quantumProcessing: Math.floor(Math.random() * 1000),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20" id="algorithm">
      {/* Background layers */}
      <div className="absolute inset-0 quantum-grid z-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background opacity-70 z-10" />
      <NeuralNetworkBackground />

      {/* Foreground content */}
      <div className="container mx-auto px-6 relative z-40">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 accent-gradient-text">
            Core Algorithm Demonstration
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground pb-6">
            Watch Quantum Algorithm, Artificial Intelligence and Optimization
            convergence
          </p>
        </div>

        {/* Quantum algorithm visualization box */}
        <div className="relative w-full bg-card/40 rounded-xl border border-border overflow-hidden">
          {/* Background quantum field canvas */}
          <QuantumCanvas qubits={algorithmState.qubits} />

          <div className="relative p-8">
            <div className="grid lg:grid-cols-2 gap-8 h-full">
              <LeftVisualization algorithmState={algorithmState} />
              <RightVisualization
                algorithmState={algorithmState}
                metrics={metrics}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
