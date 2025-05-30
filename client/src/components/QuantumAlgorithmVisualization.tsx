import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Atom, Zap, Brain, Network, TrendingUp, Target, Gauge } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface AlgorithmState {
  qubits: Array<{ id: number; state: 'superposition' | 'entangled' | 'measured'; probability: number; x: number; y: number }>;
  optimizationProgress: number;
  convergenceRate: number;
  quantumAdvantage: number;
  problemComplexity: number;
}

export default function QuantumAlgorithmVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [algorithmState, setAlgorithmState] = useState<AlgorithmState>({
    qubits: [],
    optimizationProgress: 0,
    convergenceRate: 0,
    quantumAdvantage: 1,
    problemComplexity: 100
  });

  const { data: metrics } = useQuery({
    queryKey: ["/api/metrics"],
    refetchInterval: 1500,
  });

  useEffect(() => {
    // Initialize quantum algorithm visualization
    const initializeQubits = () => {
      const qubits = Array.from({ length: 16 }, (_, i) => ({
        id: i,
        state: Math.random() > 0.6 ? 'superposition' : Math.random() > 0.3 ? 'entangled' : 'measured',
        probability: Math.random(),
        x: 50 + (Math.cos(i * 0.4) * 30),
        y: 50 + (Math.sin(i * 0.4) * 30)
      })) as AlgorithmState['qubits'];
      
      setAlgorithmState(prev => ({
        ...prev,
        qubits,
        optimizationProgress: Math.random() * 100,
        convergenceRate: 95 + Math.random() * 5,
        quantumAdvantage: 1000 + Math.random() * 500,
        problemComplexity: 500 + Math.random() * 300
      }));
    };

    initializeQubits();
    
    const interval = setInterval(() => {
      setAlgorithmState(prev => ({
        ...prev,
        qubits: prev.qubits.map(qubit => ({
          ...qubit,
          state: Math.random() > 0.7 ? 'superposition' : Math.random() > 0.4 ? 'entangled' : 'measured',
          probability: Math.random(),
          x: qubit.x + (Math.random() - 0.5) * 2,
          y: qubit.y + (Math.random() - 0.5) * 2
        })),
        optimizationProgress: Math.min(prev.optimizationProgress + Math.random() * 5, 100),
        convergenceRate: 95 + Math.random() * 5,
        quantumAdvantage: 1000 + Math.random() * 500
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Canvas drawing for quantum field visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawQuantumField = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw quantum field lines
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
          const x = (i / 20) * canvas.width;
          const y = (j / 20) * canvas.height;
          const intensity = Math.sin(Date.now() * 0.002 + i * 0.5 + j * 0.5) * 0.5 + 0.5;
          
          ctx.globalAlpha = intensity * 0.3;
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      
      // Draw quantum entanglement lines
      algorithmState.qubits.forEach((qubit, i) => {
        if (qubit.state === 'entangled') {
          const nextQubit = algorithmState.qubits[(i + 1) % algorithmState.qubits.length];
          const x1 = (qubit.x / 100) * canvas.width;
          const y1 = (qubit.y / 100) * canvas.height;
          const x2 = (nextQubit.x / 100) * canvas.width;
          const y2 = (nextQubit.y / 100) * canvas.height;
          
          ctx.globalAlpha = 0.6;
          ctx.strokeStyle = 'rgba(153, 51, 255, 0.8)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      });
      
      ctx.globalAlpha = 1;
    };

    const animationFrame = requestAnimationFrame(function animate() {
      drawQuantumField();
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [algorithmState.qubits]);

  const getStateColor = (state: string) => {
    switch (state) {
      case 'superposition': return 'text-quantum';
      case 'entangled': return 'text-accent';
      case 'measured': return 'text-neural';
      default: return 'text-muted-foreground';
    }
  };

  const getStateGlow = (state: string) => {
    switch (state) {
      case 'superposition': return 'shadow-quantum';
      case 'entangled': return 'shadow-accent';
      case 'measured': return 'shadow-neural';
      default: return '';
    }
  };

  return (
    <div className="relative w-full bg-card/40 rounded-xl border border-border overflow-hidden">
      {/* Background quantum field canvas */}
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="absolute inset-0 w-full h-full opacity-30"
      />
      
      {/* Quantum algorithm overlay */}
      <div className="relative z-10 p-8">
        <div className="grid lg:grid-cols-2 gap-8 h-full">
          {/* Left side - Quantum state visualization */}
          <div className="space-y-6">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-2xl font-bold quantum-gradient-text mb-2">
                Quantum Algorithm Engine
              </h3>
              <p className="text-sm text-muted-foreground">
                Real-time quantum superposition and entanglement states
              </p>
            </motion.div>

            {/* Qubit states grid */}
            <div className="grid grid-cols-4 gap-3">
              {algorithmState.qubits.map((qubit, index) => (
                <motion.div
                  key={qubit.id}
                  className={`relative w-12 h-12 rounded-full border-2 flex items-center justify-center backdrop-blur-sm ${
                    qubit.state === 'superposition' ? 'border-quantum bg-quantum/20' :
                    qubit.state === 'entangled' ? 'border-accent bg-accent/20' :
                    'border-neural bg-neural/20'
                  } ${getStateGlow(qubit.state)}`}
                  animate={{
                    scale: qubit.state === 'superposition' ? [1, 1.3, 1] : [1, 1.1, 1],
                    rotate: qubit.state === 'entangled' ? [0, 360] : 0,
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    scale: { duration: 2, repeat: Infinity },
                    rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 1.5, repeat: Infinity }
                  }}
                >
                  <Atom className={`w-6 h-6 ${getStateColor(qubit.state)}`} />
                  <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
                    qubit.state === 'superposition' ? 'bg-quantum' :
                    qubit.state === 'entangled' ? 'bg-accent' : 'bg-neural'
                  } animate-ping`} />
                </motion.div>
              ))}
            </div>

            {/* Quantum metrics */}
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

          {/* Right side - Optimization progress */}
          <div className="space-y-6">
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-2">Optimization Progress</h4>
              <p className="text-sm text-muted-foreground">
                Multi-dimensional problem space exploration
              </p>
            </div>

            {/* Progress visualization */}
            <div className="relative">
              <svg viewBox="0 0 200 200" className="w-full h-48">
                {/* Background circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="8"
                />
                
                {/* Progress circle */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="hsl(var(--secondary))"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 80}`}
                  strokeDashoffset={`${2 * Math.PI * 80 * (1 - algorithmState.optimizationProgress / 100)}`}
                  style={{ filter: 'drop-shadow(0 0 10px hsl(var(--secondary)))' }}
                  initial={{ strokeDashoffset: 2 * Math.PI * 80 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 80 * (1 - algorithmState.optimizationProgress / 100) }}
                  transition={{ duration: 2 }}
                />
                
                {/* Center value */}
                <text
                  x="100"
                  y="105"
                  textAnchor="middle"
                  className="text-2xl font-bold fill-current text-secondary"
                >
                  {algorithmState.optimizationProgress.toFixed(0)}%
                </text>
              </svg>
            </div>

            {/* Real-time metrics */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-card/60 rounded-lg border border-border">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-neural" />
                  <span className="text-sm">Neural Processing</span>
                </div>
                <span className="text-sm font-medium text-neural">
                  {metrics?.neuralNetworks || 150}+ layers
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-card/60 rounded-lg border border-border">
                <div className="flex items-center gap-2">
                  <Network className="w-4 h-4 text-secondary" />
                  <span className="text-sm">Quantum Qubits</span>
                </div>
                <span className="text-sm font-medium text-secondary">
                  {metrics?.quantumProcessing || 1000}+ active
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-card/60 rounded-lg border border-border">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-sm">Problem Complexity</span>
                </div>
                <span className="text-sm font-medium text-success">
                  {algorithmState.problemComplexity.toFixed(0)} dimensions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}