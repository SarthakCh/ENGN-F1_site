import { motion } from "framer-motion";
import { Brain, Network, TrendingUp } from "lucide-react";
import { AlgorithmState, Metrics } from "./types";

interface Props {
  algorithmState: AlgorithmState;
  metrics?: Metrics;
}

export default function RightVisualization({ algorithmState, metrics }: Props) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h4 className="text-2xl font-bold mb-2 accent-gradient-text">
          Optimization Progress
        </h4>
        <p className="text-sm text-muted-foreground">
          Multi-dimensional parametric problem space exploration
        </p>
      </div>

      {/* Progress circle */}
      <div className="relative pb-6">
        <svg viewBox="0 0 200 200" className="w-full h-48">
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="8"
          />
          <motion.circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="hsl(var(--secondary))"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 80}`}
            strokeDashoffset={`${
              2 * Math.PI * 80 * (1 - algorithmState.optimizationProgress / 100)
            }`}
            style={{
              filter: "drop-shadow(0 0 10px hsl(var(--secondary)))",
            }}
            initial={{ strokeDashoffset: 2 * Math.PI * 80 }}
            animate={{
              strokeDashoffset:
                2 *
                Math.PI *
                80 *
                (1 - algorithmState.optimizationProgress / 100),
            }}
            transition={{ duration: 2 }}
          />
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
      <div className="space-y-3 pt-6 flex flex-col items-center">
        {/* Metric Cards */}
        <div className="flex items-center justify-between p-3 bg-card/60 rounded-lg border border-border w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-neural" />
            <span className="text-sm">Neural Layers</span>
          </div>
          <span className="text-sm font-medium text-neural">
            {/* X + {metrics?.neuralNetworks} */}x +{" "}
            {algorithmState.neuralNetworks}
            <sup className="text-xs">*</sup>
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-card/60 rounded-lg border border-border w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-secondary" />
            <span className="text-sm">Active Algorithms</span>
          </div>
          <span className="text-sm font-medium text-secondary">
            {/* {metrics?.quantumProcessing}+ */}
            {algorithmState.quantumProcessing}+
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-card/60 rounded-lg border border-border w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-success" />
            <span className="text-sm">Dimensions</span>
          </div>
          <span className="text-sm font-medium text-success">
            y + {algorithmState.problemComplexity}
            <sup className="text-xs">**</sup>
          </span>
        </div>

        {/* Footnotes */}
        <div className="mt-2 flex justify-end gap-4 text-xs text-muted-foreground max-w-xl w-full">
          <p>
            <i>
              <sup className="text-xs">*</sup> x = industry-specific problems
            </i>
          </p>
          <p
            className="cursor-pointer hover:text-secondary transition-colors"
            onClick={() =>
              document
                .getElementById("use-cases")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <i>
              <sup className="text-xs">**</sup> y = SPOMs
            </i>
          </p>
        </div>
      </div>
    </div>
  );
}
