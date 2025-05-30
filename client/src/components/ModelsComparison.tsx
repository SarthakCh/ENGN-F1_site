import { motion } from "framer-motion";
import { User, Users, Bot, Route, Clock, Gem, Brain, Atom, Handshake, UserX, Infinity, Cog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const models = [
  {
    name: "Base Model",
    description: "Single delivery partner assignment",
    badge: "Base Model",
    gradient: "from-slate-800/50 to-slate-700/50",
    borderColor: "border-slate-600",
    buttonClass: "bg-slate-600 hover:bg-slate-500",
    features: [
      { icon: User, text: "Single delivery partner" },
      { icon: Route, text: "Package routing optimization" },
      { icon: Clock, text: "10 minutes delivery" },
      { icon: Gem, text: "Best for high value products" }
    ],
    metrics: {
      averageOrder: "₹100",
      driverCost: "₹50",
      profit: "₹50",
      margin: "50%"
    }
  },
  {
    name: "Smart Model",
    description: "Multiple partners with AI clustering",
    badge: "Most Popular",
    gradient: "from-secondary/10 to-secondary/5",
    borderColor: "border-secondary",
    buttonClass: "bg-secondary hover:bg-secondary/80",
    features: [
      { icon: Users, text: "Multiple delivery partners" },
      { icon: Brain, text: "AI enabled clustering module" },
      { icon: Atom, text: "Quantum computers solving" },
      { icon: Handshake, text: "Part-time gig partners" }
    ],
    metrics: {
      averageOrder: "₹60",
      driverCost: "₹57",
      profit: "₹3",
      margin: "5%"
    }
  },
  {
    name: "Ultra Model",
    description: "Fully automated system",
    badge: "Ultra Model",
    gradient: "from-accent/10 to-accent/5",
    borderColor: "border-accent",
    buttonClass: "bg-accent hover:bg-accent/80",
    features: [
      { icon: Bot, text: "System chooses complete flow" },
      { icon: Cog, text: "Paying system to decide & optimize" },
      { icon: UserX, text: "No person involved" },
      { icon: Infinity, text: "Quantum-AI with AI agents" }
    ],
    metrics: {
      averageOrder: "₹20",
      driverCost: "₹0",
      profit: "₹20",
      margin: "100%"
    }
  }
];

export default function ModelsComparison() {
  return (
    <section id="models" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Three Levels of Optimization</h2>
          <p className="text-xl text-slate-300">Choose the perfect model for your business needs</p>
        </motion.div>
        
        {/* Logistics optimization visual */}
        <motion.div 
          className="mb-16 relative rounded-xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=600" 
            alt="Logistics optimization network" 
            className="w-full h-96 object-cover opacity-20" 
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4">End-to-End Optimization Workflow</h3>
              <p className="text-lg text-slate-300">Last Mile Logistics Framework with Time and Cost Optimization</p>
            </div>
          </div>
        </motion.div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {models.map((model, index) => (
            <motion.div
              key={index}
              className={`card-hover bg-gradient-to-br ${model.gradient} rounded-xl p-8 border ${model.borderColor} relative ${index === 1 ? 'transform scale-105' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <div className="absolute top-4 right-4">
                <Badge className={index === 1 ? "bg-secondary text-white" : index === 2 ? "bg-accent text-white" : "bg-slate-600 text-white"}>
                  {model.badge}
                </Badge>
              </div>
              
              <div className="mb-6">
                <h3 className={`text-2xl font-bold mb-2 ${index === 1 ? 'text-secondary' : index === 2 ? 'text-accent' : ''}`}>
                  {model.name}
                </h3>
                <p className="text-slate-300">{model.description}</p>
              </div>
              
              <div className="space-y-4 mb-8">
                {model.features.map((feature, featureIndex) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={featureIndex} className="flex items-center text-sm">
                      <IconComponent className={`w-5 h-5 mr-3 ${index === 1 ? 'text-secondary' : index === 2 ? 'text-accent' : 'text-slate-400'}`} />
                      <span>{feature.text}</span>
                    </div>
                  );
                })}
              </div>
              
              <div className={`rounded-lg p-4 mb-6 ${index === 1 ? 'bg-secondary/10 border border-secondary/20' : index === 2 ? 'bg-accent/10 border border-accent/20' : 'bg-slate-700/50'}`}>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-slate-400">Average Order</div>
                    <div className="font-semibold text-lg">{model.metrics.averageOrder}</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Driver Cost</div>
                    <div className="font-semibold text-lg">{model.metrics.driverCost}</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Profit</div>
                    <div className="font-semibold text-lg text-success">{model.metrics.profit}</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Margin</div>
                    <div className="font-semibold text-lg text-success">{model.metrics.margin}</div>
                  </div>
                </div>
              </div>
              
              <Button className={`w-full py-3 text-white ${model.buttonClass}`}>
                Select {model.name}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
