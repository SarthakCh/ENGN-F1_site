import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Package, Microscope, Plane, Cpu, TrendingUp, Car, 
  CircuitBoard, Globe, Shield, Scale, DollarSign, 
  ChevronRight, Zap, Brain, Network
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const iconMap = {
  Package, Microscope, Plane, Cpu, TrendingUp, Car,
  Chip, Globe, Shield, Scale, DollarSign
};

export default function UseCasesShowcase() {
  const [selectedUseCase, setSelectedUseCase] = useState<number | null>(null);
  
  const { data: useCases = [] } = useQuery({
    queryKey: ["/api/use-cases"],
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      'Operations': 'bg-secondary/20 text-secondary border-secondary/30',
      'Healthcare': 'bg-neural/20 text-neural border-neural/30',
      'Aviation': 'bg-accent/20 text-accent border-accent/30',
      'Computing': 'bg-quantum/20 text-quantum border-quantum/30',
      'Finance': 'bg-success/20 text-success border-success/30',
      'Transportation': 'bg-secondary/20 text-secondary border-secondary/30',
      'Technology': 'bg-accent/20 text-accent border-accent/30',
      'Commerce': 'bg-neural/20 text-neural border-neural/30',
      'Defense': 'bg-destructive/20 text-destructive border-destructive/30',
      'Legal': 'bg-quantum/20 text-quantum border-quantum/30',
      'Business': 'bg-success/20 text-success border-success/30',
    };
    return colors[category as keyof typeof colors] || 'bg-muted/20 text-muted-foreground border-muted/30';
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background quantum field */}
      <div className="absolute inset-0 quantum-grid opacity-30" />
      <div className="absolute inset-0 neural-network" />
      
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
            <span className="text-quantum text-sm font-semibold tracking-wider uppercase">
              Foundational Model Applications
            </span>
            <div className="w-3 h-3 bg-neural rounded-full animate-neural-pulse" />
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="quantum-gradient-text">World's First</span><br />
            Quantum Optimization Engine
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Leveraging quantum computing and foundational AI models to solve complex optimization 
            problems across critical sectors with unprecedented efficiency and accuracy.
          </p>
        </motion.div>

        {/* Use cases grid */}
        <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {useCases.map((useCase: any, index: number) => {
            const IconComponent = iconMap[useCase.icon as keyof typeof iconMap] || Package;
            const isSelected = selectedUseCase === useCase.id;
            
            return (
              <motion.div
                key={useCase.id}
                className={`card-hover bg-card/80 rounded-xl p-6 border cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? 'border-secondary palantir-glow scale-105' 
                    : 'border-border hover:border-secondary/50'
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedUseCase(isSelected ? null : useCase.id)}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-secondary text-primary' : 'bg-secondary/20 text-secondary'
                  } transition-colors`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <Badge className={getCategoryColor(useCase.category)}>
                    {useCase.category}
                  </Badge>
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{useCase.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {useCase.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-success">
                    {useCase.impact}
                  </span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${
                    isSelected ? 'rotate-90 text-secondary' : 'text-muted-foreground'
                  }`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed view */}
        {selectedUseCase && (
          <motion.div
            className="bg-card/90 rounded-xl p-8 border border-secondary/30 palantir-glow"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            {(() => {
              const useCase = useCases.find((uc: any) => uc.id === selectedUseCase);
              if (!useCase) return null;
              
              const IconComponent = iconMap[useCase.icon as keyof typeof iconMap] || Package;
              
              return (
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-secondary/20 rounded-xl flex items-center justify-center">
                        <IconComponent className="w-8 h-8 text-secondary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{useCase.name}</h3>
                        <Badge className={getCategoryColor(useCase.category)}>
                          {useCase.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6">{useCase.description}</p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-quantum" />
                          Quantum Advantage
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {useCase.quantumAdvantage}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-success" />
                          Impact Metrics
                        </h4>
                        <p className="text-sm font-medium text-success">
                          {useCase.impact}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Brain className="w-4 h-4 text-neural" />
                      Core Capabilities
                    </h4>
                    <div className="space-y-3">
                      {useCase.capabilities.map((capability: string, index: number) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-2 h-2 bg-secondary rounded-full" />
                          <span className="text-sm">{capability}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-border">
                      <Button 
                        className="w-full bg-secondary hover:bg-secondary/80"
                        onClick={() => {
                          const element = document.getElementById('contact');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      >
                        <Network className="w-4 h-4 mr-2" />
                        Explore Implementation
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </div>
    </section>
  );
}