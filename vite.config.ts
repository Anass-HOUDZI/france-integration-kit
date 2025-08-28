
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'robots.txt'],
      workbox: {
        maximumFileSizeToCacheInBytes: 5000000, // 5MB limit instead of 2MB
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              }
            }
          }
        ]
      },
      manifest: {
        name: "Plateforme d'Intégration en France",
        short_name: 'IntégrationFR',
        description: "Suite complète de 50 outils gratuits pour l'intégration des étrangers en France : démarches administratives, logement, emploi, santé, éducation.",
        theme_color: '#1e40af',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'favicon.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'favicon.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'favicon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          }
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('@radix-ui')) {
              return 'vendor-ui';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('jspdf')) {
              return 'vendor-pdf';
            }
            if (id.includes('@tanstack/react-query')) {
              return 'vendor-query';
            }
            if (id.includes('react-router')) {
              return 'vendor-router';
            }
            return 'vendor-other';
          }
          
          // Group tools by category
          if (id.includes('/tools/')) {
            if (id.includes('Admin') || id.includes('Letter') || id.includes('Fee') || id.includes('Receipt') || id.includes('Delay') || id.includes('Form') || id.includes('Document')) {
              return 'tools-admin';
            }
            if (id.includes('Budget') || id.includes('Rent') || id.includes('Moving') || id.includes('Insurance') || id.includes('StateOfPlay')) {
              return 'tools-logement';
            }
            if (id.includes('CV') || id.includes('Salary') || id.includes('Interview') || id.includes('Diploma') || id.includes('Training') || id.includes('Portfolio') || id.includes('Motivation') || id.includes('Unemployment')) {
              return 'tools-emploi';
            }
            if (id.includes('Social') || id.includes('Medical') || id.includes('Health') || id.includes('Mutual')) {
              return 'tools-sante';
            }
            if (id.includes('Family') || id.includes('Education') || id.includes('School') || id.includes('Childcare')) {
              return 'tools-education';
            }
            if (id.includes('Culture') || id.includes('French') || id.includes('Naturalization') || id.includes('Expression') || id.includes('Tradition')) {
              return 'tools-culture';
            }
            if (id.includes('Emergency') || id.includes('Planning') || id.includes('Rights') || id.includes('Universal')) {
              return 'tools-transversal';
            }
            return 'tools-other';
          }
          
          // Group modules
          if (id.includes('/modules/')) {
            return 'modules';
          }
          
          // Group mobile components
          if (id.includes('/mobile/')) {
            return 'mobile';
          }
          
          // Group UI components
          if (id.includes('/ui/')) {
            return 'ui-components';
          }
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    },
    cssMinify: true,
    chunkSizeWarningLimit: 1000,
  },
}));
