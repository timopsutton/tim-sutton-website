import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  root: mode === "production" ? "." : "client",
  publicDir: mode === "production" ? "client/public" : "public",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./client/src", import.meta.url)),
      "@assets": fileURLToPath(new URL("./attached_assets", import.meta.url)),
    },
  },
  build: {
    outDir: mode === "production" ? "dist" : "../dist/public",
    emptyOutDir: true,
    rollupOptions: mode === "production" ? {
      input: "client/index.html"
    } : undefined,
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
}));
