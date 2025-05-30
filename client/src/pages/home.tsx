import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QuantumAlgorithmVisualization from "@/components/QuantumAlgorithmVisualization";
import InvestorValueProposition from "@/components/InvestorValueProposition";
import UseCasesShowcase from "@/components/UseCasesShowcase";
import ModelsComparison from "@/components/ModelsComparison";
import RevenueGrowth from "@/components/RevenueGrowth";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    document.title = "ENGN-F1 - World's First Quantum Optimization Engine | $847B Market Opportunity";
    
    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Revolutionary quantum optimization engine with 1000x performance advantage. $847B market opportunity across 11 sectors. First-mover advantage in quantum-AI convergence technology.";
    document.head.appendChild(metaDescription);

    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-inter overflow-x-hidden">
      <Header />
      <Hero />
      <div id="quantum-algorithm-demo" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 quantum-gradient-text">
              Live Quantum Algorithm Demonstration
            </h2>
            <p className="text-xl text-muted-foreground">
              Watch real-time quantum superposition and optimization convergence
            </p>
          </div>
          <QuantumAlgorithmVisualization />
        </div>
      </div>
      <InvestorValueProposition />
      <div id="use-cases">
        <UseCasesShowcase />
      </div>
      <ModelsComparison />
      <RevenueGrowth />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
}
