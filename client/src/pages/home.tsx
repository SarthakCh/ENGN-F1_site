import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ModelsComparison from "@/components/ModelsComparison";
import RevenueGrowth from "@/components/RevenueGrowth";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    document.title = "ENGN-F1 - India's First Optimization Engine | AI + Quantum Powered";
    
    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "ENGN-F1 is India's first optimization engine powered by AI + Quantum algorithms. Revolutionizing last-mile logistics with up to 100% profit margins and real-time optimization.";
    document.head.appendChild(metaDescription);

    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  return (
    <div className="min-h-screen bg-primary text-white font-inter overflow-x-hidden">
      <Header />
      <Hero />
      <Features />
      <ModelsComparison />
      <RevenueGrowth />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
}
