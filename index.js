// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  leads;
  currentUserId;
  currentLeadId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.leads = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentLeadId = 1;
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async createLead(insertLead) {
    const id = this.currentLeadId++;
    const lead = {
      ...insertLead,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.leads.set(id, lead);
    return lead;
  }
  async getLeads() {
    return Array.from(this.leads.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  modelInterest: text("model_interest").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertLeadSchema = createInsertSchema(leads).pick({
  fullName: true,
  email: true,
  company: true,
  modelInterest: true,
  message: true
}).extend({
  email: z.string().email("Please enter a valid email address"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  modelInterest: z.string().min(1, "Please select a model")
});

// server/routes.ts
import { z as z2 } from "zod";
async function registerRoutes(app2) {
  app2.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      res.json({ success: true, leadId: lead.id });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({
          error: "Validation failed",
          details: error.errors
        });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });
  app2.get("/api/leads", async (req, res) => {
    try {
      const leads2 = await storage.getLeads();
      res.json(leads2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });
  app2.get("/api/metrics", async (req, res) => {
    try {
      const metrics = {
        deliveryTime: Math.floor(Math.random() * 5) + 5,
        optimization: Math.floor(Math.random() * 20) + 80,
        efficiency: Math.floor(Math.random() * 100),
        revenue: "\u20B91.5Cr",
        team: "40%",
        infrastructure: "45%",
        office: "9%",
        orders: 400,
        growth: "250%",
        quantumProcessing: Math.floor(Math.random() * 100),
        neuralNetworks: Math.floor(Math.random() * 100) + 1,
        dataPoints: Math.floor(Math.random() * 1e3) + 5e3
      };
      res.set(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate"
      );
      res.set("Pragma", "no-cache");
      res.set("Expires", "0");
      res.set("Surrogate-Control", "no-store");
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch metrics" });
    }
  });
  app2.get("/api/use-cases", async (req, res) => {
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
          capabilities: [
            "Real-time inventory management",
            "Predictive demand forecasting",
            "Dynamic pricing optimization"
          ]
        },
        {
          id: 2,
          name: "Life Sciences",
          description: "Drug discovery and molecular simulation acceleration",
          icon: "Microscope",
          category: "Healthcare",
          impact: "70% faster drug discovery",
          quantumAdvantage: "Molecular interaction modeling at quantum scale",
          capabilities: [
            "Protein folding prediction",
            "Drug-target interaction",
            "Clinical trial optimization"
          ]
        },
        {
          id: 3,
          name: "Drone Systems",
          description: "Autonomous fleet coordination and airspace optimization",
          icon: "Drone",
          category: "Aviation",
          impact: "90% efficiency increase",
          quantumAdvantage: "Real-time multi-drone path planning in complex environments",
          capabilities: [
            "Swarm intelligence",
            "Weather pattern analysis",
            "Collision avoidance algorithms"
          ]
        },
        {
          id: 4,
          name: "Simulation",
          description: "High-fidelity quantum simulations for complex systems",
          icon: "Cpu",
          category: "Computing",
          impact: "1000x computation speed",
          quantumAdvantage: "Quantum superposition for parallel scenario modeling",
          capabilities: [
            "Climate modeling",
            "Material science simulation",
            "Financial risk modeling"
          ]
        },
        {
          id: 5,
          name: "Financial Sector",
          description: "Risk assessment and algorithmic trading optimization",
          icon: "TrendingUp",
          category: "Finance",
          impact: "95% risk reduction",
          quantumAdvantage: "Quantum machine learning for market prediction",
          capabilities: [
            "Portfolio optimization",
            "Fraud detection",
            "Credit risk analysis"
          ]
        },
        {
          id: 6,
          name: "Automotive Sector",
          description: "Autonomous vehicle decision-making and traffic optimization",
          icon: "Car",
          category: "Transportation",
          impact: "80% accident reduction",
          quantumAdvantage: "Real-time traffic flow optimization across smart cities",
          capabilities: [
            "Autonomous navigation",
            "Predictive maintenance",
            "Energy efficiency optimization"
          ]
        },
        {
          id: 7,
          name: "Electronics Sector",
          description: "Semiconductor design and manufacturing optimization",
          icon: "Chip",
          category: "Technology",
          impact: "60% design efficiency",
          quantumAdvantage: "Quantum circuit design and optimization",
          capabilities: [
            "Circuit layout optimization",
            "Manufacturing process control",
            "Quality assurance automation"
          ]
        },
        {
          id: 8,
          name: "Trade & Commodity",
          description: "Global trade route and commodity price optimization",
          icon: "Globe",
          category: "Commerce",
          impact: "75% profit increase",
          quantumAdvantage: "Multi-dimensional market analysis with quantum algorithms",
          capabilities: [
            "Price prediction",
            "Trade route optimization",
            "Risk hedging strategies"
          ]
        },
        {
          id: 9,
          name: "Military & Intelligence",
          description: "Strategic intelligence and tactical optimization",
          icon: "Shield",
          category: "Defense",
          impact: "Classified advantages",
          quantumAdvantage: "Quantum cryptography and secure communications",
          capabilities: [
            "Threat assessment",
            "Resource allocation",
            "Mission planning optimization"
          ]
        },
        {
          id: 10,
          name: "Judiciary",
          description: "Legal case management and justice system optimization",
          icon: "Scale",
          category: "Legal",
          impact: "50% case resolution speed",
          quantumAdvantage: "Complex legal precedent analysis and pattern recognition",
          capabilities: [
            "Case priority optimization",
            "Resource allocation",
            "Outcome prediction modeling"
          ]
        },
        {
          id: 11,
          name: "Revenue Optimization",
          description: "Business revenue leakage detection and optimization",
          icon: "DollarSign",
          category: "Business",
          impact: "40% revenue recovery",
          quantumAdvantage: "Multi-dimensional revenue stream analysis",
          capabilities: [
            "Leak detection algorithms",
            "Pricing optimization",
            "Customer lifetime value prediction"
          ]
        }
      ];
      res.json(useCases);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch use cases" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    // manual chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          charts: ["recharts"],
          ui: [
            "@radix-ui/react-dialog",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-toast"
          ],
          icons: ["lucide-react"]
        }
      }
    },
    // Raise size warning threshold
    chunkSizeWarningLimit: 1e3
  },
  base: "/ENGN-F1_site/"
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "dist");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 3e3;
  server.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true
    },
    () => {
      log(`serving on port ${port}`);
    }
  );
})();
