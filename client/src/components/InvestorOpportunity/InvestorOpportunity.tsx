import { useState } from "react";
import { motion } from "framer-motion";

import Visualization from "./Visualization";
import MetricsCarousel from "./MetricsCarousel";
import InvestmentHighlights from "./InvestmentHighlights";
import NeuralNetworkBackground from "../CustomUI/NeuralNetworkBackground";

interface MarketData {
  totalAddressableMarket: number;
  currentMarketPenetration: number;
  projectedGrowth: number;
  competitiveAdvantage: number;
  revenueProjection: number[];
  costReduction: number[];
  sectors: Array<{
    name: string;
    market: number;
    penetration: number;
    opportunity: number;
  }>;
}

export default function InvestorOpportunity() {
  const [marketData, setMarketData] = useState<MarketData>({
    totalAddressableMarket: 847,
    currentMarketPenetration: 0.001,
    projectedGrowth: 1250,
    competitiveAdvantage: 1000,
    revenueProjection: [0.5, 20, 300],
    costReduction: [15, 35, 65, 85, 95],
    sectors: [
      {
        name: "Logistics & Supply Chain",
        market: 25,
        penetration: 0.004, // penetration = (1 / market) * factor...factor lies within 0.001 - 0.01
        opportunity: 65, // opportunity = Math.min(100, Math.round((1 - penetration) * (50 + market)))
      },
      {
        name: "Financial Services",
        market: 60,
        penetration: 0.002,
        opportunity: 70,
      },
      {
        name: "Manufacturing",
        market: 80,
        penetration: 0.0018,
        opportunity: 72,
      },
      {
        name: "Pharmaceuticals & Healthcare",
        market: 8,
        penetration: 0.007,
        opportunity: 55,
      },
      {
        name: "E-commerce & Retail",
        market: 10,
        penetration: 0.006,
        opportunity: 58,
      },
      {
        name: "IT & SaaS Operations",
        market: 15,
        penetration: 0.005,
        opportunity: 60,
      },
      {
        name: "Defense/ Drone/ Digital Twin",
        market: 3,
        penetration: 0.01,
        opportunity: 40,
      },
      {
        name: "Data Centers & Infra",
        market: 1,
        penetration: 0.015,
        opportunity: 35,
      },
    ],
  });

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background quantum grid + overlay */}
      <div className="absolute inset-0 quantum-grid z-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background opacity-70 z-10" />

      {/* Node network canvas */}
      <NeuralNetworkBackground />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="w-3 h-3 bg-quantum rounded-full animate-neural-pulse" />
            <span className="text-success text-sm font-semibold tracking-wider uppercase">
              Investor Opportunity
            </span>
            <div className="w-3 h-3 bg-quantum rounded-full animate-neural-pulse" />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-success">A $1T+ Market</span>
            <br />
            <span className="quantum-gradient-text">
              Opportunity with Revolutionary Technology
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Unlocking exponential growth through a highly scalable model,
            targeting massive global demand with clear execution milestones.
          </p>
        </motion.div>

        <MetricsCarousel marketData={marketData} />
        <Visualization marketData={marketData} />
        <InvestmentHighlights marketData={marketData} />
      </div>
    </section>
  );
}
