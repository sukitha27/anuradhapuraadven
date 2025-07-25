import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import crypto from "crypto";

// Generate nonce for production
const nonce = crypto.randomBytes(16).toString('base64');

// CSP directives with all required domains
const commonCspDirectives = {
  'default-src': ["'self'"],
  'frame-src': ["'self'", "*.firebaseapp.com", "*.google.com"],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'upgrade-insecure-requests': []
};

const devCsp = {
  ...commonCspDirectives,
  'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", "data:", "blob:", "*"],
  'connect-src': ["'self'", "*"],
  'font-src': ["'self'", "*"],
  'media-src': ["'self'", "*"]
};

const prodCsp = {
  ...commonCspDirectives,
  'script-src': [
    "'self'",
    `'nonce-${nonce}'`,
    "'strict-dynamic'",
    "*.vercel.app",
    "*.vercel.com",
    "*.cloudflare.com",
    "*.firebaseapp.com",
    "*.firebaseio.com",
    "*.googleapis.com",
    "*.gstatic.com",
    "cdn.jsdelivr.net"
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'",
    "*.vercel.app",
    "*.vercel.com",
    "fonts.googleapis.com"
  ],
  'img-src': [
    "'self'",
    "data:",
    "blob:",
    "*.vercel.app",
    "*.vercel.com",
    "*.cloudflare.com",
    "*.firebaseapp.com",
    "*.firebasestorage.googleapis.com",
    "*.googleapis.com",
    "*.gstatic.com"
  ],
  'font-src': [
    "'self'",
    "*.vercel.app",
    "*.vercel.com",
    "fonts.googleapis.com",
    "fonts.gstatic.com"
  ],
  'connect-src': [
    "'self'",
    "*.vercel.app",
    "*.vercel.com",
    "*.cloudflare.com",
    "*.firebaseapp.com",
    "*.firebaseio.com",
    "*.firebasestorage.googleapis.com",
    "*.googleapis.com",
    "*.gstatic.com",
    "api.openweathermap.org"
    
  ],
  'media-src': [
    "'self'",
    "*.vercel.app",
    "*.vercel.com",
    "*.firebasestorage.googleapis.com"
  ]
};

function generateCspHeader(csp: Record<string, string[]>) {
  return Object.entries(csp)
    .map(([directive, sources]) => {
      if (sources.length === 0) return `${directive};`;
      return `${directive} ${sources.join(' ')};`;
    })
    .join(' ')
    .trim();
}

export default defineConfig(({ mode }) => ({
  server: {
    historyApiFallback: true,
    host: "::",
    port: 8080,
    headers: {
      "Content-Security-Policy": generateCspHeader(
        mode === 'development' ? devCsp : prodCsp
      ),
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin"
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
            .replace(/<script/g, `<script nonce="${nonce}"`)
            .replace(/<style/g, `<style nonce="${nonce}"`);
        }
        return html;
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
}));