import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Target, Rocket } from "lucide-react";

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

const investmentMetrics = [
  {
    icon: TrendingUp,
    title: "Market Opportunity",
    value: "$1T+",
    subtitle: "Total Addressable Market",
    description:
      "with a Serviceable Addressable Market (SAM) of $80-100 Billion",
    color: "text-success",
  },
  {
    icon: Rocket,
    title: "Growth Potential",
    value: "2,500%",
    subtitle: "Over the next 3 years",
    description: "With a highly scalablebusiness model",
    color: "text-secondary",
  },
  {
    icon: Target,
    title: "Competitive Moat",
    value: "1000x",
    subtitle: "Quantum Advantage",
    description: "Performance multiplier vs classical algorithms",
    color: "text-quantum",
  },
  {
    icon: DollarSign,
    title: "Revenue Projection",
    value: "$300 M",
    subtitle: "In 3 years",
    description: "with $50 Million forecasted within the next 12 months",
    color: "text-accent",
  },
];

const MetricsCarousel = ({ marketData }: { marketData: MarketData }) => {
  const [currentMetric, setCurrentMetric] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % investmentMetrics.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      {/* Key Investment Metrics Carousel */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="grid lg:grid-cols-4 gap-6">
          {investmentMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            const isActive = currentMetric === index;

            return (
              <motion.div
                key={index}
                className={`card-hover bg-card/80 rounded-xl p-8 border transition-all duration-500 ${
                  isActive
                    ? "border-success palantir-glow scale-105 bg-success/5"
                    : "border-border hover:border-success/50"
                }`}
                animate={{
                  scale: isActive ? 1.05 : 1,
                  borderColor: isActive
                    ? "hsl(var(--success))"
                    : "hsl(var(--border))",
                }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${
                    isActive ? "bg-success/20" : "bg-muted/20"
                  } transition-colors`}
                >
                  <IconComponent
                    className={`w-8 h-8 ${
                      isActive ? "text-success" : metric.color
                    }`}
                  />
                </div>

                <motion.div
                  className="text-3xl font-bold mb-2 sm:pl-4"
                  animate={{
                    color: isActive
                      ? "hsl(var(--success))"
                      : "hsl(var(--foreground))",
                    scale: isActive ? 1.1 : 1,
                  }}
                >
                  {metric.value}
                </motion.div>

                <h4 className="font-semibold mb-2">{metric.title}</h4>
                <p
                  className={`text-sm font-medium mb-2 ${
                    isActive ? "text-success" : "text-muted-foreground"
                  }`}
                >
                  {metric.subtitle}
                </p>
                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default MetricsCarousel;
