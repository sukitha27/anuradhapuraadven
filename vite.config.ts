import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Add this to handle client-side routing
    historyApiFallback: true,
    // Enable these for better development experience
    strictPort: true,
    open: true,
  },
  preview: {
    port: 8080,
    // Also enable for preview mode
    historyApiFallback: true,
    strictPort: true,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Optional: Base path if deploying to subdirectory
  base: '/',
}));