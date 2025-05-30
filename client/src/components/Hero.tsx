import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

export default function Hero() {
  const [animatedMetrics, setAnimatedMetrics] = useState({
    deliveryTime: "< 10 min",
    optimization: "100%",
    efficiency: "₹1.5Cr"
  });

  const { data: metrics } = useQuery({
    queryKey: ["/api/metrics"],
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (metrics) {
      setAnimatedMetrics({
        deliveryTime: `< ${metrics.deliveryTime} min`,
        optimization: `${metrics.optimization}%`,
        efficiency: metrics.revenue
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
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-slate-750 to-primary"></div>
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080" 
          alt="Modern technology dashboard" 
          className="w-full h-full object-cover" 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="gradient-text">ENGN-F1</span>
          </motion.h1>
          
          <motion.p 
            className="text-2xl md:text-3xl mb-4 text-slate-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            India's First Optimization Engine
          </motion.p>
          
          <motion.p 
            className="text-lg md:text-xl mb-8 text-slate-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            AI + Quantum Algorithm powered engine delivering multiparametric basis results with robust and scalable algorithms for granular level result validation.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button 
              onClick={() => scrollToSection("contact")}
              className="bg-secondary hover:bg-secondary/80 px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all"
            >
              Request Demo
            </Button>
            <Button 
              variant="outline"
              onClick={() => scrollToSection("features")}
              className="border-accent text-accent hover:bg-accent hover:text-white px-8 py-4 text-lg font-semibold transition-all"
            >
              View Documentation
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Floating metrics cards */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden lg:block"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <div className="flex space-x-6">
          <motion.div 
            className="metric-card rounded-xl p-4 text-center"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="text-2xl font-bold text-success">{animatedMetrics.deliveryTime}</div>
            <div className="text-sm text-slate-400">Delivery Time</div>
          </motion.div>
          <motion.div 
            className="metric-card rounded-xl p-4 text-center"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="text-2xl font-bold text-accent">{animatedMetrics.optimization}</div>
            <div className="text-sm text-slate-400">Optimization Rate</div>
          </motion.div>
          <motion.div 
            className="metric-card rounded-xl p-4 text-center"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="text-2xl font-bold text-secondary">{animatedMetrics.efficiency}</div>
            <div className="text-sm text-slate-400">Funding Goal</div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
