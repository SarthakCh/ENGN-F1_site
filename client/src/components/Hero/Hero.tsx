import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import NeuralNetworkBackground from "@/components/CustomUI/NeuralNetworkBackground";
import LeftHero from "./LeftHero";
import RightHero from "./RightHero";

export default function Hero() {
  const [animatedMetrics, setAnimatedMetrics] = useState({
    processing: 0,
    graphSpeed: 0,
    accuracy: 0,
  });

  type MetricsResponse = {
    efficiency: number;
    deliveryTime: number;
    optimization: number;
  };

  const { data: metrics } = useQuery<MetricsResponse>({
    queryKey: ["/api/metrics"],
    queryFn: () => fetch("/api/metrics").then((res) => res.json()),
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
    staleTime: 0, // no caching
    gcTime: 0, // throw away old cache
  });

  useEffect(() => {
    setAnimatedMetrics((prev) => ({
      ...prev,
      processing: Math.floor(Math.random() * 101),
      graphSpeed: Math.floor(Math.random() * 21) + 60,
      accuracy: Math.floor(Math.random() * 16) + 85,
    }));

    const interval = setInterval(() => {
      setAnimatedMetrics((prev) => ({
        ...prev,
        processing: Math.floor(Math.random() * 101),
        graphSpeed: Math.floor(Math.random() * 21) + 60,
        accuracy: Math.floor(Math.random() * 16) + 85,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 lg:pt-12">
      <div className="absolute inset-0 quantum-grid z-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background opacity-70 z-10" />
      <div className="absolute inset-0 neural-network z-20" />

      <NeuralNetworkBackground />

      <div className="container relative z-40 mx-auto px-6 pt-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <LeftHero />
          <RightHero animatedMetrics={animatedMetrics} />
        </div>
      </div>
    </section>
  );
}
