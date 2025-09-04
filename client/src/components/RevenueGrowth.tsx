import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Server, Building } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import NeuralNetworkBackground from "./CustomUI/NeuralNetworkBackground";

export default function RevenueGrowth() {
  const [animatedAnalytics, setAnimatedAnalytics] = useState({
    orders: 400,
    efficiency: "₹50",
    growth: "250",
  });

  type MetricsResponse = {
    deliveryTime: number;
    optimization: number;
    efficiency: number;
    revenue: string;
    team: string;
    infrastructure: string;
    office: string;
    orders: number;
    growth: string;
    quantumProcessing: number;
    neuralNetworks: number;
    dataPoints: number;
  };

  const { data: metrics } = useQuery<MetricsResponse>({
    queryKey: ["/api/metrics"],
    refetchInterval: 5000,
  });

  const metricCards = [
    {
      icon: TrendingUp,
      value: metrics?.revenue || "₹1.5Cr",
      label: "Fund Requirement",
      sublabel: "Target Achievement",
      color: "secondary",
    },
    {
      icon: Users,
      value: metrics?.team || "40%",
      label: "Team Salary",
      sublabel: "Fund Allocation",
      color: "accent",
    },
    {
      icon: Server,
      value: metrics?.infrastructure || "45%",
      label: "Infrastructure",
      sublabel: "& Maintenance",
      color: "success",
    },
    {
      icon: Building,
      value: metrics?.office || "9%",
      label: "Office & Misc",
      sublabel: "Operational Costs",
      color: "purple",
    },
  ];

  useEffect(() => {
    if (metrics) {
      setAnimatedAnalytics({
        orders: metrics.orders,
        efficiency: `₹${Math.floor(Math.random() * 30) + 40}`,
        growth: metrics.growth.toString().replace("%", ""),
      });
    }
  }, [metrics]);

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-6 z-40">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Revenue Growth & Healthy Margins
          </h2>
          <p className="text-xl text-slate-300">
            How last mile optimization drives business success
          </p>
        </motion.div>

        {/* Quantum computing visualization */}
        <motion.div
          className="mb-16 relative rounded-xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=600"
            alt="Quantum computing visualization"
            className="w-full h-96 object-cover"
          />

          {/* Dark overlay (instead of making the image transparent) */}
          <div className="absolute inset-0 bg-black/70" />

          {/* Content on top */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-4xl font-bold mb-4 pb-4">
                  Quantum-Powered Analytics
                </h3>
                <p className="text-xl text-slate-300 mb-6 pb-4">
                  Enhanced order volume and frequency driving growth in the
                  market segment with average order value ranging from ₹5 to
                  ₹1000.
                </p>
              </div>
              <div className="max-w-5xl mx-auto pt-6 text-center">
                <div className="grid grid-cols-3 gap-12">
                  <motion.div
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-5xl font-extrabold text-success">
                      {animatedAnalytics.orders}
                    </div>
                    <div className="text-lg text-slate-400">Orders/Month</div>
                  </motion.div>
                  <motion.div
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-5xl font-bold text-accent">
                      {animatedAnalytics.efficiency}
                      <span className="text-2xl font-bold text-accent">
                        {" "}
                        /Order
                      </span>
                    </div>
                    <div className="text-lg text-slate-400">
                      Cost Efficiency
                    </div>
                  </motion.div>
                  <motion.div
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-5xl font-bold text-secondary">
                      {animatedAnalytics.growth}
                      <span className="text-2xl font-bold text-secondary">
                        {" "}
                        %
                      </span>
                    </div>
                    <div className="text-lg text-slate-400">Growth Rate</div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Performance Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricCards.map((metric, index) => {
            const IconComponent = metric.icon;
            const colorClass =
              metric.color === "secondary"
                ? "text-secondary bg-secondary/20"
                : metric.color === "accent"
                ? "text-accent bg-accent/20"
                : metric.color === "success"
                ? "text-success bg-success/20"
                : "text-purple-500 bg-purple-500/20";

            return (
              <motion.div
                key={index}
                className="metric-card rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.02,
                  y: -2,
                  transition: { duration: 0.2 },
                }}
              >
                <div
                  className={`w-12 h-12 ${colorClass} rounded-lg flex items-center justify-center mx-auto mb-4`}
                >
                  <IconComponent className="text-xl" />
                </div>
                <div className="text-2xl font-bold mb-2">{metric.value}</div>
                <div className="text-sm text-slate-400">{metric.label}</div>
                <div className={`text-xs mt-1 ${colorClass.split(" ")[0]}`}>
                  {metric.sublabel}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
