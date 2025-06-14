
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",       // Enables IPv6 and localhost access
    port: 8080,       // Dev server port
  },

  plugins: [
    react(),
    // Only include componentTagger during development mode
    ...(mode === "development" ? [componentTagger()] : []),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),  // Simplify imports like @/components/Button
    },
  },
}));
