import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerender from "@prerenderer/rollup-plugin";

export default defineConfig(({ mode }) => ({
  server: {
    historyApiFallback: true,
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" &&
      prerender({
        routes: [
          "/",
          "/about",
          "/tours",
          "/reviews",
          "/contact",
          "/videos",
          "/gallery",
          "/book-now",
          "/privacy-policy",
          "/terms-of-service",
          "/sitemap",
        ],
        renderer: "@prerenderer/renderer-puppeteer",
        rendererOptions: {
          renderAfterTime: 2000,
          headless: true,
          maxConcurrentRoutes: 1,
          timeout: 120000,
          skipThirdPartyRequests: true,
          waitUntil: "domcontentloaded",
          args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
        },
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
