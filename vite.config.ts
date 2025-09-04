import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "client/src"),
      "@shared": resolve(__dirname, "shared"),
      "@assets": resolve(__dirname, "assets"),
    },
  },
  root: resolve(__dirname, "client"),
  build: {
    outDir: resolve(__dirname, "server/dist"),
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
            "@radix-ui/react-toast",
          ],
          icons: ["lucide-react"],
        },
      },
    },

    // Raise size warning threshold
    chunkSizeWarningLimit: 1000,
  },
  base:
    process.env.NODE_ENV === "production" && process.env.VITE_GHPAGES === "true"
      ? "/ENGN-F1_site/"
      : "/",
});
