import { motion } from "framer-motion";
import { Atom, Brain, Orbit } from "lucide-react";

interface HeroRightProps {
  animatedMetrics: {
    processing: number;
    graphSpeed: number;
    accuracy: number;
  };
}

export default function HeroRight({ animatedMetrics }: HeroRightProps) {
  return (
    <motion.div
      className="relative space-y-6"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      {/* Atomic Grid Container */}
      <div
        id="quantum-viz"
        className="relative w-full sm:w-[400px] md:w-[500px] lg:w-[600px] mx-auto"
      >
        <div className="aspect-square sm:aspect-video quantum-grid neural-network overflow-hidden rounded-xl border border-border">
          {/* Animated quantum nodes */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="grid grid-cols-4 gap-6 sm:gap-8"
              style={{ width: "70%", height: "70%" }}
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
                      "hsl(var(--quantum))",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Atom className="w-3 sm:w-4 h-3 sm:h-4 text-quantum" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Top-right floating indicator */}
        <motion.div
          className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 w-12 h-12 bg-quantum/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-quantum/30"
          animate={{
            rotate: [0, 360],
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.3, 1],
          }}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity },
          }}
        >
          <Orbit className="w-6 h-6 text-quantum" />
        </motion.div>

        {/* Bottom-left floating indicator */}
        <motion.div
          className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 w-10 h-10 bg-neural/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-neural/30"
          animate={{
            rotate: [0, 360],
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Orbit className="w-5 h-5 text-neural" />
        </motion.div>
      </div>

      {/* Real-time metrics overlay */}
      <div className="pt-12 px-2">
        {/* 👆 moved down with -bottom-6 to create breathing space */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
          <div className="metric-card px-3 py-2 rounded-lg text-center">
            <span className="text-quantum">1000+ Algorithms</span>
          </div>
          <div className="metric-card px-3 py-2 rounded-lg text-center">
            <span className="text-neural">500M+ Neural Layers</span>
          </div>
          <div className="metric-card px-3 py-2 rounded-lg text-center">
            <span className="text-secondary">99.8% Optimization</span>
          </div>
        </div>
      </div>

      {/* Revolutionary metrics */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="metric-card p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-quantum">
            {animatedMetrics.processing}
            <span className="text-lg"> %</span>
          </div>
          <div className="text-xs text-muted-foreground">Processing</div>
        </div>
        <div className="metric-card p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-neural">
            {animatedMetrics.graphSpeed}
            <span className="text-lg"> ms</span>
          </div>
          <div className="text-xs text-muted-foreground">Graph Speed</div>
        </div>
        <div className="metric-card p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-secondary">
            {animatedMetrics.accuracy}
            <span className="text-lg"> %</span>
          </div>
          <div className="text-xs text-muted-foreground">Accuracy</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
