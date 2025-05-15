import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// Custom configuration

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/", // Ensures assets are loaded from correct path on Netlify
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Additional plugins can be added here
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Improved build settings for production
    sourcemap: false,
    outDir: "dist",
    emptyOutDir: true,
    // Help diagnose build issues
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: false, // Keep console logs for debugging
      },
    },
  },
}));
