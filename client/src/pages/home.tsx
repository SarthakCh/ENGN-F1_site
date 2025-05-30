import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import UseCasesShowcase from "@/components/UseCasesShowcase";
import ModelsComparison from "@/components/ModelsComparison";
import RevenueGrowth from "@/components/RevenueGrowth";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    document.title = "ENGN-F1 - World's First Quantum Optimization Engine | Foundational AI Model";
    
    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "ENGN-F1 is the world's first optimization engine leveraging quantum computing and foundational AI models. Revolutionary applications across supply chain, life sciences, defense, finance, and more.";
    document.head.appendChild(metaDescription);

    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-inter overflow-x-hidden">
      <Header />
      <Hero />
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
