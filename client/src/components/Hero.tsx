import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Atom, Zap, Brain, Network } from "lucide-react";


export default function Hero() {
  const [animatedMetrics, setAnimatedMetrics] = useState({
    quantumProcessing: "1000+",
    neuralNetworks: "150+",
    optimization: "99%"
  });

  const { data: metrics } = useQuery({
    queryKey: ["/api/metrics"],
    refetchInterval: 3000,
  });

  useEffect(() => {
    if (metrics) {
      setAnimatedMetrics({
        quantumProcessing: `${metrics.quantumProcessing || 1000}+`,
        neuralNetworks: `${metrics.neuralNetworks || 150}+`,
        optimization: `${metrics.optimization || 95}%`
      });
    }
  }, [metrics]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden pt-20">
      {/* Advanced quantum background */}
      <div className="absolute inset-0 bg-background"></div>
      <div className="absolute inset-0 quantum-grid opacity-40"></div>
      <div className="absolute inset-0 neural-network"></div>
      
      {/* Quantum interference patterns */}
      <div className="absolute inset-0 data-visualization opacity-20"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-card/50 border border-secondary/30 rounded-full backdrop-blur-sm"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-2 h-2 bg-quantum rounded-full animate-neural-pulse" />
              <span className="text-quantum text-sm font-semibold tracking-wider">
                QUANTUM-POWERED INTELLIGENCE
              </span>
              <div className="w-2 h-2 bg-neural rounded-full animate-neural-pulse" />
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="quantum-gradient-text">ENGN-F1</span><br />
              <span className="text-foreground">Optimization</span><br />
              <span className="gradient-text">Engine</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              World's first foundational model leveraging quantum computing and AI to solve 
              complex optimization problems across critical sectors with unprecedented efficiency.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button 
                onClick={() => scrollToSection("use-cases")}
                className="bg-secondary hover:bg-secondary/80 px-8 py-4 text-lg font-semibold palantir-glow group"
              >
                <Brain className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Explore Applications
              </Button>
              <Button 
                variant="outline"
                onClick={() => scrollToSection("quantum-viz")}
                className="border-quantum text-quantum hover:bg-quantum hover:text-primary px-8 py-4 text-lg font-semibold group"
              >
                <Atom className="w-5 h-5 mr-2 group-hover:animate-quantum-spin" />
                Quantum Demo
              </Button>
            </motion.div>

            {/* Real-time capability metrics */}
            <motion.div 
              className="grid grid-cols-3 gap-4 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="metric-card p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="w-5 h-5 text-quantum mr-2" />
                  <span className="text-2xl font-bold text-quantum">{animatedMetrics.quantumProcessing}</span>
                </div>
                <div className="text-xs text-muted-foreground">Qubits Processing</div>
              </div>
              <div className="metric-card p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Brain className="w-5 h-5 text-neural mr-2" />
                  <span className="text-2xl font-bold text-neural">{animatedMetrics.neuralNetworks}</span>
                </div>
                <div className="text-xs text-muted-foreground">Neural Layers</div>
              </div>
              <div className="metric-card p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Network className="w-5 h-5 text-secondary mr-2" />
                  <span className="text-2xl font-bold text-secondary">{animatedMetrics.optimization}</span>
                </div>
                <div className="text-xs text-muted-foreground">Optimization Rate</div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right side - Quantum Algorithm Visualization */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div id="quantum-viz" className="relative w-full h-96 quantum-grid neural-network overflow-hidden rounded-xl border border-border">
              {/* Quantum field visualization */}
              <div className="absolute inset-0 data-visualization opacity-30" />
              
              {/* Animated quantum nodes */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="grid grid-cols-4 gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2 }}
                >
                  {Array.from({ length: 16 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-quantum bg-quantum/20 flex items-center justify-center"
                      animate={{
                        scale: [1, 1.5, 1],
                        rotate: [0, 360],
                        borderColor: [
                          "hsl(var(--quantum))",
                          "hsl(var(--accent))",
                          "hsl(var(--neural))",
                          "hsl(var(--quantum))"
                        ]
                      }}
                      transition={{
                        duration: 4,
                        delay: i * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Atom className="w-4 h-4 text-quantum" />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              
              {/* Real-time metrics overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex justify-between items-center text-sm">
                  <div className="metric-card px-3 py-2 rounded-lg">
                    <span className="text-quantum">
                      {animatedMetrics.quantumProcessing} Qubits
                    </span>
                  </div>
                  <div className="metric-card px-3 py-2 rounded-lg">
                    <span className="text-neural">
                      {animatedMetrics.neuralNetworks} Neural Layers
                    </span>
                  </div>
                  <div className="metric-card px-3 py-2 rounded-lg">
                    <span className="text-secondary">
                      {animatedMetrics.optimization} Optimization
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating quantum indicators */}
            <motion.div 
              className="absolute -top-4 -right-4 w-12 h-12 bg-quantum/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-quantum/30"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity }
              }}
            >
              <Atom className="w-6 h-6 text-quantum" />
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-4 -left-4 w-10 h-10 bg-neural/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-neural/30"
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Brain className="w-5 h-5 text-neural" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
