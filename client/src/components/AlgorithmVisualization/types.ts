// A single qubit representation
export interface Qubit {
  id: number;
  state: "superposition" | "entangled" | "measured";
  probability: number;
  x: number; // 0–100 relative positioning
  y: number; // 0–100 relative positioning
}

// State of the algorithm visualization
export interface AlgorithmState {
  qubits: Qubit[];
  optimizationProgress: number; // %
  convergenceRate: number; // %
  quantumAdvantage: number; // arbitrary units
  problemComplexity: number; // integer 2–200
  neuralNetworks: number; // number of neural networks involved
  quantumProcessing: number; // number of quantum operations processed
}

// API response from /api/metrics
export interface Metrics {
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
}
