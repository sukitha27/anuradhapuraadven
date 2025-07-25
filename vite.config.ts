import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import crypto from "crypto";

// Generate nonce for production
const nonce = crypto.randomBytes(16).toString('base64');

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    historyApiFallback: true,
    host: "::",
    port: 8080,
    headers: {
      "Content-Security-Policy": mode === 'development'
        ? `
          default-src 'self';
          script-src 'self' 'unsafe-inline' 'unsafe-eval';
          style-src 'self' 'unsafe-inline';
          img-src 'self' data: blob:;
          connect-src 'self';
        `.replace(/\s+/g, ' ').trim()
        : `
          default-src 'self' *.vercel.com;
          script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https: 'unsafe-inline';
          style-src 'self' 'unsafe-inline';
          img-src 'self' data: blob: *.vercel.com;
          font-src 'self';
          connect-src 'self' *.vercel.com;
          frame-src 'none';
          object-src 'none';
          base-uri 'self';
          form-action 'self';
          upgrade-insecure-requests;
        `.replace(/\s+/g, ' ').trim()
    }
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    {
      name: 'csp-nonce',
      transformIndexHtml(html: string) {
        return html
          .replace(/<script/g, `<script nonce="${nonce}"`)
          .replace(/<style/g, `<style nonce="${nonce}"`)
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));