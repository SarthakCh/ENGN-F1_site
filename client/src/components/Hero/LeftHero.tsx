import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Atom, Zap, Network } from "lucide-react";

export default function HeroLeft() {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="space-y-6">
        <motion.div
          className="inline-flex items-center gap-2 rounded-full bg-quantum/10 border border-quantum/20 text-quantum text-sm font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* <Atom className="w-4 h-4" /> */}
          <div className="w-2 h-2 rounded-full bg-quantum" />
          World's First Next-Gen Intelligence Engine
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight break-words"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="quantum-gradient-text">ENGN-F1</span>
          <br />
          <span className="text-foreground/90">Revolutionary</span>
          <br />
          <span className="accent-gradient-text tracking-wide">AQO Engine</span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          India's breakthrough engine convergence Operating System delivering
          <span className="text-quantum font-semibold">
            {" "}
            1000x performance gains
          </span>{" "}
          across enterprise operational challenges.
        </motion.p>
      </div>

      {/* CTA */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 pt-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          size="lg"
          className="neural-button text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-xl"
          onClick={() =>
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <Zap className="w-5 h-5 mr-2" />
          Experience Demo
        </Button>
        <Button
          size="lg"
          className="quantum-button text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-xl"
          onClick={() =>
            document
              .getElementById("use-cases")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <Network className="w-5 h-5 mr-2" />
          Explore Use Cases
        </Button>
      </motion.div>

      {/* Market Opportunity */}
      <motion.div
        className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-quantum/5 to-neural/5 border border-quantum/20"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
      >
        <div className="w-3 h-3 rounded-full bg-quantum animate-pulse" />
        <span className="text-sm">
          <span className="text-quantum font-medium mr-2">
            More than $1 Trillion
          </span>{" "}
          Market Opportunity
        </span>
      </motion.div>
    </motion.div>
  );
}
