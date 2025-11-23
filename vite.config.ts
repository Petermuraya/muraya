
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import compression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    middlewareMode: false,
  },

  plugins: [
    react(),
    ...(mode === "development" ? [componentTagger()] : []),
    // Gzip compression for production
    compression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 1024,
      deleteOriginFile: false,
    }),
    // Brotli compression for better compression ratio
    compression({
      algorithm: "brotliCompress" as any,
      ext: ".br",
      threshold: 1024,
      deleteOriginFile: false,
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    // Aggressive optimization settings
    target: "esnext",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: mode === "production",
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },
    
    // Code splitting strategy
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor libraries
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-ui": ["@radix-ui/react-accordion", "@radix-ui/react-alert-dialog", "@radix-ui/react-avatar", "@radix-ui/react-checkbox", "@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-label", "@radix-ui/react-popover", "@radix-ui/react-select", "@radix-ui/react-tabs", "@radix-ui/react-tooltip"],
          "vendor-data": ["@tanstack/react-query", "@supabase/supabase-js"],
          "vendor-forms": ["react-hook-form", "@hookform/resolvers", "zod"],
          "vendor-utils": ["date-fns", "clsx", "class-variance-authority", "tailwind-merge"],
          "vendor-animation": ["recharts", "embla-carousel-react", "lucide-react"],
        },
        chunkFileNames: "chunks/[name]-[hash].js",
        entryFileNames: "[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },

    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    
    // Enable source maps for production debugging
    sourcemap: mode === "development",
    
    // Report compressed size
    reportCompressedSize: true,
  },

  // CSS optimization
  css: {
    devSourcemap: mode === "development",
    postcss: {
      plugins: [
        {
          postcssPlugin: "internal:charset-removal",
          Once(root: any) {
            root.walkAtRules("charset", (rule: any) => {
              if (rule.parent.type === "root") {
                rule.remove();
              }
            });
          },
        },
      ],
    },
  },

  // PreLoad and Prefetch hints
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@tanstack/react-query",
      "react-helmet-async",
    ],
    esbuildOptions: {
      target: "esnext",
    },
  },
}));
