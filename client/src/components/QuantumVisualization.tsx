import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Atom, Cpu, Zap, Brain, Network } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface QuantumNode {
  id: number;
  x: number;
  y: number;
  type: "quantum" | "neural" | "processing";
  active: boolean;
}

export default function QuantumVisualization() {
  const [nodes, setNodes] = useState<QuantumNode[]>([]);
  const [connections, setConnections] = useState<Array<[number, number]>>([]);

  const { data: metrics } = useQuery({
    queryKey: ["/api/metrics"],
    refetchInterval: 2000,
  });

  useEffect(() => {
    // Initialize quantum network nodes
    const initialNodes: QuantumNode[] = [
      { id: 1, x: 20, y: 30, type: "quantum", active: true },
      { id: 2, x: 50, y: 20, type: "neural", active: false },
      { id: 3, x: 80, y: 40, type: "processing", active: false },
      { id: 4, x: 30, y: 70, type: "neural", active: true },
      { id: 5, x: 70, y: 80, type: "quantum", active: false },
      { id: 6, x: 60, y: 50, type: "processing", active: true },
    ];

    const initialConnections: Array<[number, number]> = [
      [1, 2],
      [2, 3],
      [1, 4],
      [4, 6],
      [6, 5],
      [3, 5],
      [2, 6],
    ];

    setNodes(initialNodes);
    setConnections(initialConnections);

    // Animate node activation
    const interval = setInterval(() => {
      setNodes((prev) =>
        prev.map((node) => ({
          ...node,
          active: Math.random() > 0.6,
        }))
      );
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case "quantum":
        return Atom;
      case "neural":
        return Brain;
      case "processing":
        return Cpu;
      default:
        return Zap;
    }
  };

  const getNodeColor = (type: string, active: boolean) => {
    if (!active) return "text-muted-foreground";
    switch (type) {
      case "quantum":
        return "text-quantum";
      case "neural":
        return "text-neural";
      case "processing":
        return "text-secondary";
      default:
        return "text-foreground";
    }
  };

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-xl border border-border">
      {/* Background data streams */}
      {/* Background quantum field */}
      <div className="absolute inset-0 quantum-grid z-0" />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background opacity-70 z-10" />
      {/* <div className="absolute inset-0 data-visualization opacity-30" /> */}

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full">
        {connections.map(([from, to], index) => {
          const fromNode = nodes.find((n) => n.id === from);
          const toNode = nodes.find((n) => n.id === to);
          if (!fromNode || !toNode) return null;

          const isActive = fromNode.active && toNode.active;

          return (
            <motion.line
              key={index}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y}%`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y}%`}
              stroke={isActive ? "hsl(var(--secondary))" : "hsl(var(--border))"}
              strokeWidth={isActive ? "2" : "1"}
              strokeOpacity={isActive ? "0.8" : "0.3"}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: index * 0.2 }}
            />
          );
        })}
      </svg>

      {/* Quantum nodes */}
      {nodes.map((node) => {
        const IconComponent = getNodeIcon(node.type);
        return (
          <motion.div
            key={node.id}
            className={`absolute w-12 h-12 rounded-full border-2 flex items-center justify-center backdrop-blur-sm ${
              node.active
                ? "border-secondary bg-secondary/20 palantir-glow"
                : "border-border bg-card/40"
            }`}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              scale: node.active ? [1, 1.2, 1] : 1,
              rotate: node.type === "quantum" ? [0, 360] : 0,
            }}
            transition={{
              scale: { duration: 2, repeat: Infinity },
              rotate: { duration: 6, repeat: Infinity, ease: "linear" },
            }}
          >
            <IconComponent
              className={`w-6 h-6 ${getNodeColor(node.type, node.active)}`}
            />
          </motion.div>
        );
      })}

      {/* Real-time metrics overlay */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex justify-between items-center text-sm">
          <div className="metric-card px-3 py-2 rounded-lg">
            <span className="text-quantum">
              {metrics?.quantumProcessing || 1000}+ Qubits
            </span>
          </div>
          <div className="metric-card px-3 py-2 rounded-lg">
            <span className="text-neural">
              {metrics?.neuralNetworks || 150}+ Neural Layers
            </span>
          </div>
          <div className="metric-card px-3 py-2 rounded-lg">
            <span className="text-secondary">
              {metrics?.dataPoints || 5000}+ Data Points/sec
            </span>
          </div>
        </div>
      </div>

      {/* Quantum interference pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="w-full h-full"
          style={{
            background: `radial-gradient(circle at 30% 40%, hsla(var(--quantum), 0.3) 0%, transparent 50%),
                         radial-gradient(circle at 70% 60%, hsla(var(--neural), 0.3) 0%, transparent 50%)`,
          }}
          animate={{
            background: [
              `radial-gradient(circle at 30% 40%, hsla(var(--quantum), 0.3) 0%, transparent 50%),
               radial-gradient(circle at 70% 60%, hsla(var(--neural), 0.3) 0%, transparent 50%)`,
              `radial-gradient(circle at 70% 30%, hsla(var(--quantum), 0.3) 0%, transparent 50%),
               radial-gradient(circle at 30% 70%, hsla(var(--neural), 0.3) 0%, transparent 50%)`,
              `radial-gradient(circle at 30% 40%, hsla(var(--quantum), 0.3) 0%, transparent 50%),
               radial-gradient(circle at 70% 60%, hsla(var(--neural), 0.3) 0%, transparent 50%)`,
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
