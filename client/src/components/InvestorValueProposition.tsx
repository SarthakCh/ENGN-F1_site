import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, DollarSign, Target, Zap, Brain, Atom, 
  BarChart3, PieChart, LineChart, Activity, Rocket,
  Shield, Globe, Clock, Users, Building
} from "lucide-react";
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

export default function InvestorValueProposition() {
  const [marketData, setMarketData] = useState<MarketData>({
    totalAddressableMarket: 847,
    currentMarketPenetration: 0.001,
    projectedGrowth: 1250,
    competitiveAdvantage: 1000,
    revenueProjection: [0.5, 2.1, 8.7, 34.2, 127.5],
    costReduction: [15, 35, 65, 85, 95],
    sectors: [
      { name: "Supply Chain", market: 156, penetration: 0.01, opportunity: 45 },
      { name: "Financial Services", market: 127, penetration: 0.005, opportunity: 38 },
      { name: "Healthcare", market: 89, penetration: 0.002, opportunity: 32 },
      { name: "Defense", market: 67, penetration: 0.001, opportunity: 28 },
      { name: "Automotive", market: 78, penetration: 0.003, opportunity: 25 },
      { name: "Electronics", market: 93, penetration: 0.002, opportunity: 31 },
      { name: "Energy", market: 112, penetration: 0.001, opportunity: 41 },
      { name: "Logistics", market: 125, penetration: 0.004, opportunity: 43 }
    ]
  });

  const { data: metrics } = useQuery({
    queryKey: ["/api/metrics"],
    refetchInterval: 2000,
  });

  const [currentMetric, setCurrentMetric] = useState(0);
  const investmentMetrics = [
    {
      icon: TrendingUp,
      title: "Market Opportunity",
      value: "$847B",
      subtitle: "Total Addressable Market",
      description: "Global optimization & AI market size by 2030",
      color: "text-success"
    },
    {
      icon: Rocket,
      title: "Growth Potential",
      value: "1,250%",
      subtitle: "5-Year Revenue CAGR",
      description: "Conservative projection based on quantum advantage",
      color: "text-secondary"
    },
    {
      icon: Target,
      title: "Competitive Moat",
      value: "1000x",
      subtitle: "Quantum Advantage",
      description: "Performance multiplier vs classical algorithms",
      color: "text-quantum"
    },
    {
      icon: DollarSign,
      title: "Revenue Model",
      value: "$127M",
      subtitle: "Year 5 Projection",
      description: "SaaS + licensing + enterprise partnerships",
      color: "text-accent"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % investmentMetrics.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Advanced background effects */}
      <div className="absolute inset-0 quantum-grid opacity-20" />
      <div className="absolute inset-0 neural-network" />
      <div className="absolute inset-0 data-visualization opacity-10" />

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
            <div className="w-3 h-3 bg-success rounded-full animate-neural-pulse" />
            <span className="text-success text-sm font-semibold tracking-wider uppercase">
              Investor Opportunity
            </span>
            <div className="w-3 h-3 bg-success rounded-full animate-neural-pulse" />
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-success">$847B Market</span><br />
            <span className="quantum-gradient-text">Revolutionary Technology</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            First-mover advantage in quantum optimization with proven foundational model 
            demonstrating 1000x performance gains across critical sectors.
          </p>
        </motion.div>

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
                      ? 'border-success palantir-glow scale-105 bg-success/5' 
                      : 'border-border hover:border-success/50'
                  }`}
                  animate={{
                    scale: isActive ? 1.05 : 1,
                    borderColor: isActive ? 'hsl(var(--success))' : 'hsl(var(--border))'
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${
                    isActive ? 'bg-success/20' : 'bg-muted/20'
                  } transition-colors`}>
                    <IconComponent className={`w-8 h-8 ${isActive ? 'text-success' : metric.color}`} />
                  </div>
                  
                  <motion.div
                    className="text-3xl font-bold mb-2"
                    animate={{ 
                      color: isActive ? 'hsl(var(--success))' : 'hsl(var(--foreground))',
                      scale: isActive ? 1.1 : 1
                    }}
                  >
                    {metric.value}
                  </motion.div>
                  
                  <h4 className="font-semibold mb-2">{metric.title}</h4>
                  <p className={`text-sm font-medium mb-2 ${isActive ? 'text-success' : 'text-muted-foreground'}`}>
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
            
            <div className="relative h-64 mb-6">
              <svg viewBox="0 0 400 200" className="w-full h-full">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map(i => (
                  <line
                    key={i}
                    x1={80 + i * 60}
                    y1="20"
                    x2={80 + i * 60}
                    y2="180"
                    stroke="hsl(var(--border))"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                ))}
                
                {/* Revenue curve */}
                <motion.path
                  d="M 80 180 Q 140 160 200 120 Q 260 70 320 30"
                  fill="none"
                  stroke="hsl(var(--success))"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.5 }}
                  viewport={{ once: true }}
                  style={{ filter: 'drop-shadow(0 0 8px hsl(var(--success)))' }}
                />
                
                {/* Data points */}
                {marketData.revenueProjection.map((value, index) => (
                  <motion.circle
                    key={index}
                    cx={80 + index * 60}
                    cy={180 - (value / 127.5) * 160}
                    r="6"
                    fill="hsl(var(--success))"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                    viewport={{ once: true }}
                  />
                ))}
                
                {/* Labels */}
                {['Y1', 'Y2', 'Y3', 'Y4', 'Y5'].map((label, index) => (
                  <text
                    key={index}
                    x={80 + index * 60}
                    y="195"
                    textAnchor="middle"
                    className="text-xs fill-current text-muted-foreground"
                  >
                    {label}
                  </text>
                ))}
              </svg>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-success">$0.5M</div>
                <div className="text-xs text-muted-foreground">Year 1 ARR</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">$34M</div>
                <div className="text-xs text-muted-foreground">Year 4 ARR</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">$127M</div>
                <div className="text-xs text-muted-foreground">Year 5 ARR</div>
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
            
            <div className="space-y-4">
              {marketData.sectors.slice(0, 6).map((sector, index) => (
                <motion.div
                  key={sector.name}
                  className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{sector.name}</span>
                      <span className="text-sm text-success font-bold">
                        ${sector.opportunity}B
                      </span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <motion.div
                        className="bg-quantum rounded-full h-2"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(sector.opportunity / 45) * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-border">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-quantum">8+</div>
                  <div className="text-xs text-muted-foreground">Active Sectors</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-quantum">$283B</div>
                  <div className="text-xs text-muted-foreground">Combined TAM</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Investment Highlights */}
        <motion.div 
          className="bg-gradient-to-r from-success/10 to-quantum/10 rounded-xl p-8 border border-success/30"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6 text-center">
            Why Invest in ENGN-F1 Now?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-success" />
              </div>
              <h4 className="font-semibold mb-2">First-Mover Advantage</h4>
              <p className="text-sm text-muted-foreground">
                World's first quantum optimization engine with proven foundational model
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-quantum/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-quantum" />
              </div>
              <h4 className="font-semibold mb-2">Proven Technology</h4>
              <p className="text-sm text-muted-foreground">
                1000x performance gains demonstrated across multiple use cases
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-accent" />
              </div>
              <h4 className="font-semibold mb-2">Market Validation</h4>
              <p className="text-sm text-muted-foreground">
                Strong interest from enterprise clients across critical sectors
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}