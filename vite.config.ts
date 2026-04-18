import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerender from "@prerenderer/rollup-plugin";

// Detect serverless/CI environment (Vercel sets VERCEL=1)
const isServerless = !!process.env.VERCEL;

async function getExecutablePath(): Promise<string | undefined> {
  if (isServerless) {
    const chromium = (await import("@sparticuz/chromium")).default;
    return await chromium.executablePath();
  }
  // Local: let Puppeteer use its downloaded Chrome
  return undefined;
}

async function getChromiumArgs(): Promise<string[]> {
  if (isServerless) {
    const chromium = (await import("@sparticuz/chromium")).default;
    return chromium.args;
  }
  return ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"];
}

export default defineConfig(async ({ mode }) => {
  const executablePath = mode === "production" ? await getExecutablePath() : undefined;
  const chromiumArgs = mode === "production" ? await getChromiumArgs() : [];

  return {
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
            args: chromiumArgs,
            executablePath,
          },
        }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
