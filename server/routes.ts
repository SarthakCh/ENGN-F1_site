import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Lead generation endpoint
  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      res.json({ success: true, leadId: lead.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          error: "Validation failed", 
          details: error.errors 
        });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  // Get all leads (for admin purposes)
  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      res.json(leads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  // Demo metrics endpoint
  app.get("/api/metrics", async (req, res) => {
    try {
      const metrics = {
        deliveryTime: Math.floor(Math.random() * 5) + 5,
        optimization: Math.floor(Math.random() * 20) + 80,
        efficiency: Math.floor(Math.random() * 100) + 200,
        revenue: "₹1.5Cr",
        team: "40%",
        infrastructure: "45%",
        office: "9%",
        orders: 400,
        growth: "250%",
        quantumProcessing: Math.floor(Math.random() * 500) + 1000,
        neuralNetworks: Math.floor(Math.random() * 50) + 150,
        dataPoints: Math.floor(Math.random() * 1000) + 5000
      };
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch metrics" });
    }
  });

  // Use cases endpoint
  app.get("/api/use-cases", async (req, res) => {
    try {
      const useCases = [
        {
          id: 1,
          name: "Supply Chain",
          description: "End-to-end supply chain optimization with quantum-powered logistics",
          icon: "Package",
          category: "Operations",
          impact: "85% cost reduction",
          quantumAdvantage: "Multi-parameter route optimization across global networks",
          capabilities: ["Real-time inventory management", "Predictive demand forecasting", "Dynamic pricing optimization"]
        },
        {
          id: 2,
          name: "Life Sciences",
          description: "Drug discovery and molecular simulation acceleration",
          icon: "Microscope",
          category: "Healthcare",
          impact: "70% faster drug discovery",
          quantumAdvantage: "Molecular interaction modeling at quantum scale",
          capabilities: ["Protein folding prediction", "Drug-target interaction", "Clinical trial optimization"]
        },
        {
          id: 3,
          name: "Drone Systems",
          description: "Autonomous fleet coordination and airspace optimization",
          icon: "Drone",
          category: "Aviation",
          impact: "90% efficiency increase",
          quantumAdvantage: "Real-time multi-drone path planning in complex environments",
          capabilities: ["Swarm intelligence", "Weather pattern analysis", "Collision avoidance algorithms"]
        },
        {
          id: 4,
          name: "Simulation",
          description: "High-fidelity quantum simulations for complex systems",
          icon: "Cpu",
          category: "Computing",
          impact: "1000x computation speed",
          quantumAdvantage: "Quantum superposition for parallel scenario modeling",
          capabilities: ["Climate modeling", "Material science simulation", "Financial risk modeling"]
        },
        {
          id: 5,
          name: "Financial Sector",
          description: "Risk assessment and algorithmic trading optimization",
          icon: "TrendingUp",
          category: "Finance",
          impact: "95% risk reduction",
          quantumAdvantage: "Quantum machine learning for market prediction",
          capabilities: ["Portfolio optimization", "Fraud detection", "Credit risk analysis"]
        },
        {
          id: 6,
          name: "Automotive Sector",
          description: "Autonomous vehicle decision-making and traffic optimization",
          icon: "Car",
          category: "Transportation",
          impact: "80% accident reduction",
          quantumAdvantage: "Real-time traffic flow optimization across smart cities",
          capabilities: ["Autonomous navigation", "Predictive maintenance", "Energy efficiency optimization"]
        },
        {
          id: 7,
          name: "Electronics Sector",
          description: "Semiconductor design and manufacturing optimization",
          icon: "Chip",
          category: "Technology",
          impact: "60% design efficiency",
          quantumAdvantage: "Quantum circuit design and optimization",
          capabilities: ["Circuit layout optimization", "Manufacturing process control", "Quality assurance automation"]
        },
        {
          id: 8,
          name: "Trade & Commodity",
          description: "Global trade route and commodity price optimization",
          icon: "Globe",
          category: "Commerce",
          impact: "75% profit increase",
          quantumAdvantage: "Multi-dimensional market analysis with quantum algorithms",
          capabilities: ["Price prediction", "Trade route optimization", "Risk hedging strategies"]
        },
        {
          id: 9,
          name: "Military & Intelligence",
          description: "Strategic intelligence and tactical optimization",
          icon: "Shield",
          category: "Defense",
          impact: "Classified advantages",
          quantumAdvantage: "Quantum cryptography and secure communications",
          capabilities: ["Threat assessment", "Resource allocation", "Mission planning optimization"]
        },
        {
          id: 10,
          name: "Judiciary",
          description: "Legal case management and justice system optimization",
          icon: "Scale",
          category: "Legal",
          impact: "50% case resolution speed",
          quantumAdvantage: "Complex legal precedent analysis and pattern recognition",
          capabilities: ["Case priority optimization", "Resource allocation", "Outcome prediction modeling"]
        },
        {
          id: 11,
          name: "Revenue Optimization",
          description: "Business revenue leakage detection and optimization",
          icon: "DollarSign",
          category: "Business",
          impact: "40% revenue recovery",
          quantumAdvantage: "Multi-dimensional revenue stream analysis",
          capabilities: ["Leak detection algorithms", "Pricing optimization", "Customer lifetime value prediction"]
        }
      ];
      res.json(useCases);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch use cases" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
