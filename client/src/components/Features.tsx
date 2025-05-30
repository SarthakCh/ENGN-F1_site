import { motion } from "framer-motion";
import { Brain, Route, Clock, Users, TrendingUp, Atom } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Intelligence",
    description: "Advanced AI clustering modules with quantum computing solving complex clustering parameters and formats."
  },
  {
    icon: Route,
    title: "Last Mile Optimization",
    description: "Package routing optimization methodology over circumference, instead of shortest path format for maximum efficiency."
  },
  {
    icon: Clock,
    title: "Real-Time Processing",
    description: "Parallel computing leads to higher processing points with aggregation for instant decision making."
  },
  {
    icon: Users,
    title: "Workforce Management",
    description: "Optimization of workforce management and routes with multiple partner assignment capabilities."
  },
  {
    icon: TrendingUp,
    title: "Scalable Results",
    description: "Robust and scalable algorithm that leads to granular level result validation across all sectors."
  },
  {
    icon: Atom,
    title: "Quantum-AI Integration",
    description: "Quantum-AI with AI agents supporting from decision making to on-ground execution with no human intervention."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-slate-750/50">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Revolutionary Features</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Sectors where the optimization engine delivers dynamic and enhanced results across any business kind or issue.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                className="card-hover bg-slate-800/50 rounded-xl p-8 border border-slate-700"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-lg flex items-center justify-center mb-6">
                  <IconComponent className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
