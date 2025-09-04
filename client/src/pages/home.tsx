import { useEffect, lazy, Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero/Hero";
import UseCasesShowcase from "@/components/UseCasesShowcase";
import Team from "@/components/Team";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer";
import FloatingBrain from "@/components/CustomUI/FloatingBrain";

const QuantumAlgorithmVisualization = lazy(
  () =>
    import("@/components/AlgorithmVisualization/QuantumAlgorithmVisualization")
);
const InvestorValueProposition = lazy(
  () => import("@/components/InvestorOpportunity/InvestorOpportunity")
);

// import ModelsComparison from "@/components/ModelsComparison";
// import RevenueGrowth from "@/components/RevenueGrowth";

export default function Home() {
  useEffect(() => {
    document.title =
      "ENGN-F1 - World's First Quantum Optimization Engine | $847B Market Opportunity";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content =
      "Revolutionary quantum optimization engine with 1000x performance advantage. $847B market opportunity across 11 sectors. First-mover advantage in quantum-AI convergence technology.";
    document.head.appendChild(metaDescription);

    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-inter overflow-x-hidden">
      <FloatingBrain />
      <Header />
      <Hero />

      <Suspense fallback={<div>Loading visualisation...</div>}>
        <QuantumAlgorithmVisualization />
      </Suspense>

      <Suspense fallback={<div>Loading visualisation...</div>}>
        <InvestorValueProposition />
      </Suspense>

      <div id="use-cases">
        <UseCasesShowcase />
      </div>

      {/* <ModelsComparison /> */}
      {/* <RevenueGrowth /> */}

      <Team />
      <Contact />
      <Footer />
    </div>
  );
}
