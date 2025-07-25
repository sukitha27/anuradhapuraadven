import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import crypto from "crypto";

// Generate nonce for production
const nonce = crypto.randomBytes(16).toString('base64');

// Common CSP directives
const commonCspDirectives = {
  defaultSrc: ["'self'"],
  frameSrc: ["'none'"],
  objectSrc: ["'none'"],
  baseUri: ["'self'"],
  formAction: ["'self'"],
  upgradeInsecureRequests: []
};

// Development CSP (more permissive)
const devCsp = {
  ...commonCspDirectives,
  scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
  styleSrc: ["'self'", "'unsafe-inline'"],
  imgSrc: ["'self'", "data:", "blob:"],
  connectSrc: ["'self'"],
  fontSrc: ["'self'"]
};

// Production CSP (strict)
const prodCsp = {
  ...commonCspDirectives,
  scriptSrc: [
    "'self'",
    `'nonce-${nonce}'`,
    "'strict-dynamic'",
    "*.vercel.com",
    "*.cloudflare.com",
    "cdn.jsdelivr.net"
  ],
  styleSrc: ["'self'", "'unsafe-inline'", "*.vercel.com", "*.cloudflare.com"],
  imgSrc: [
    "'self'",
    "data:",
    "blob:",
    "*.vercel.com",
    "*.cloudflare.com",
    "cdn.jsdelivr.net"
  ],
  fontSrc: ["'self'", "*.vercel.com", "*.cloudflare.com"],
  connectSrc: ["'self'", "*.vercel.com", "*.cloudflare.com"],
  mediaSrc: ["'self'", "*.vercel.com"],
  upgradeInsecureRequests: []
};

// Convert CSP object to header string
function generateCspHeader(csp: Record<string, string[]>) {
  return Object.entries(csp)
    .map(([directive, sources]) => {
      if (sources.length === 0) return `${directive};`;
      return `${directive} ${sources.join(' ')};`;
    })
    .join(' ')
    .trim();
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    historyApiFallback: true,
    host: "::",
    port: 8080,
    headers: {
      "Content-Security-Policy": generateCspHeader(
        mode === 'development' ? devCsp : prodCsp
      ),
      "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy": "geolocation=(), microphone=(), camera=(), payment=(), fullscreen=()",
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp"
    }
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    {
      name: 'csp-nonce',
      transformIndexHtml(html: string) {
        if (mode === 'production') {
          return html
            .replace(/<script(?![^>]*nonce)/g, `<script nonce="${nonce}"`)
            .replace(/<style(?![^>]*nonce)/g, `<style nonce="${nonce}"`)
            .replace(
              '</head>',
              `<meta http-equiv="Content-Security-Policy" content="${generateCspHeader(prodCsp)}" /></head>`
            );
        }
        return html;
      }
    },
    {
      name: 'html-security-headers',
      transformIndexHtml(html: string) {
        return html.replace(
          '</head>',
          `
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          `
        );
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },
  preview: {
    headers: {
      "Content-Security-Policy": generateCspHeader(prodCsp),
      ...(mode === 'production' ? {
        "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload"
      } : {})
    }
  }
}));