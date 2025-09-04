import React from "react";
import { motion } from "framer-motion";
import { Activity, SquaresExclude, Building } from "lucide-react";

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

const InvestmentHighlights = ({ marketData }: { marketData: MarketData }) => {
  return (
    <section>
      {/* Investment Highlights */}
      <motion.div
        className="bg-gradient-to-r from-success/10 to-quantum/10 rounded-2xl p-10 border border-success/30"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Why Invest in ENGN-F1 Now?
        </h3>

        <div className="grid md:grid-cols-3 gap-10 m-6 pt-8">
          <div className="text-center p-6 rounded-2xl shadow-[0_5px_20px_hsl(var(--success))] hover:shadow-[0_10px_35px_hsl(var(--success))] hover:scale-105 transition-transform duration-300">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <SquaresExclude className="w-10 h-10 text-success" />
            </div>
            <h4 className="text-lg md:text-xl font-semibold mb-3">
              Massive Cross-Industry Opportunity
            </h4>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Positioned as the first real-time cross-sector optimization
              engine, not a dashboard tool.
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl shadow-[0_5px_20px_hsl(var(--quantum))] hover:shadow-[0_10px_35px_hsl(var(--quantum))] hover:scale-105 transition-transform duration-300">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Activity className="w-10 h-10 text-quantum" />
            </div>
            <h4 className="text-lg md:text-xl font-semibold mb-3">
              Proven Cost Reduction & Scalability
            </h4>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Clients pay via one-time service + perpetual revenue/cost share
              (20-30%). SaaS + Plug-in architecture ensures high customer
              returns and high LTV.
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl shadow-[0_5px_20px_hsl(var(--accent))] hover:shadow-[0_10px_35px_hsl(var(--accent))] hover:scale-105 transition-transform duration-300">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building className="w-10 h-10 text-accent" />
            </div>
            <h4 className="text-lg md:text-xl font-semibold mb-3">
              Intelligent System Advantage
            </h4>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Unlike generic LLMs, Engn-F1 creates SPOMs (Specific Problem
              Optimization Models) - tailored to client data, 0 hallucination,
              100% prediction accuracy.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default InvestmentHighlights;
