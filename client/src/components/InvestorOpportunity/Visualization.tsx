import React from "react";
import { motion } from "framer-motion";
import { PieChart, LineChart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

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

const Visualization = ({ marketData }: { marketData: MarketData }) => {
  const { data: metrics } = useQuery({
    queryKey: ["/api/metrics"],
    refetchInterval: 2000,
  });

  return (
    <section id="applications">
      {/* Market Penetration Visualization */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Revenue Projection Chart */}
        <motion.div
          className="bg-card/60 rounded-xl p-8 border border-border"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <LineChart className="w-6 h-6 text-success" />
            Revenue Trajectory
          </h3>

          <div className="relative h-96 mb-6">
            <svg
              viewBox="0 0 400 250"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              {(() => {
                const data = marketData.revenueProjection;
                const width = 400;
                const height = 200;
                const marginX = 60;
                const marginY = 40;

                // dynamic X spacing
                const spacing = (width - 2 * marginX) / (data.length - 1);

                // scale Y using log10 mapping
                const maxValue = Math.max(...data);
                const minValue = Math.min(...data);
                const scaleY = (val: number) => {
                  const logVal = Math.log10(val);
                  const logMin = Math.log10(minValue);
                  const logMax = Math.log10(maxValue);
                  return (
                    height -
                    ((logVal - logMin) / (logMax - logMin)) * (height - marginY)
                  );
                };

                // build path string
                const pathD = data
                  .map((val, i) => {
                    const x = marginX + i * spacing;
                    const y = scaleY(val);
                    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
                  })
                  .join(" ");

                return (
                  <>
                    {/* Grid lines */}
                    {data.map((_, i) => (
                      <line
                        key={`grid-${i}`}
                        x1={marginX + i * spacing}
                        y1="20"
                        x2={marginX + i * spacing}
                        y2={height}
                        stroke="hsl(var(--border))"
                        strokeWidth="1"
                        opacity="0.3"
                      />
                    ))}

                    {/* Revenue curve */}
                    <motion.path
                      d={pathD}
                      fill="none"
                      stroke="hsl(var(--success))"
                      strokeWidth="3"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 0.5 }}
                      viewport={{ once: true }}
                      style={{
                        filter: "drop-shadow(0 0 8px hsl(var(--success)))",
                      }}
                    />

                    {/* Data points */}
                    {data.map((val, i) => (
                      <motion.circle
                        key={`point-${i}`}
                        cx={marginX + i * spacing}
                        cy={scaleY(val)}
                        r="6"
                        fill="hsl(var(--success))"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 + i * 0.2 }}
                        viewport={{ once: true }}
                      />
                    ))}

                    {/* Labels */}
                    {["Y1", "Y2", "Y3"].map((label, i) => (
                      <text
                        key={`label-${i}`}
                        x={marginX + i * spacing}
                        y="240"
                        textAnchor="middle"
                        className="text-sm md:text-base fill-current text-muted-foreground font-semibold"
                      >
                        {label}
                      </text>
                    ))}
                  </>
                );
              })()}
            </svg>
          </div>

          <div className="grid grid-cols-3 gap-6 text-center pt-8">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-success">
                $0.5M
              </div>
              <div className="text-sm md:text-base text-muted-foreground">
                Year 1 ARR
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-success">
                $20M
              </div>
              <div className="text-sm md:text-base text-muted-foreground">
                Year 2 ARR
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-success">
                $300M
              </div>
              <div className="text-sm md:text-base text-muted-foreground">
                Year 3 ARR
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sector Opportunities */}
        <motion.div
          className="bg-card/60 rounded-xl p-8 border border-border"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <PieChart className="w-6 h-6 text-quantum" />
            Sector Opportunities
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {marketData.sectors.map((sector, index) => {
              // const maxOpportunity = Math.max(
              //   ...marketData.sectors.map((s) => s.opportunity)
              // );

              return (
                <motion.div
                  key={sector.name}
                  className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-1 space-y-6 mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{sector.name}</span>
                      <span className="text-sm text-success font-bold">
                        ${sector.market}B
                      </span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <motion.div
                        className="bg-quantum rounded-full h-2"
                        initial={{ width: 0 }}
                        whileInView={{
                          // width: `${
                          //   (sector.opportunity / maxOpportunity) * 100
                          // }%`,
                          width: `${sector.opportunity}%`,
                        }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-quantum">
                  8+
                </div>
                <div className="text-sm md:text-base text-muted-foreground">
                  Active Sectors
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-quantum">
                  $202B
                </div>
                <div className="text-sm md:text-base text-muted-foreground">
                  Combined TAM
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Visualization;
