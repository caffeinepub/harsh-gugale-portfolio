import { fileURLToPath, URL } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import environment from "vite-plugin-environment";

const ii_url =
  process.env.DFX_NETWORK === "local"
    ? `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:8081/`
    : `https://identity.internetcomputer.org/`;

process.env.II_URL = process.env.II_URL || ii_url;
process.env.STORAGE_GATEWAY_URL =
  process.env.STORAGE_GATEWAY_URL || "https://blob.caffeine.ai";

export default defineConfig({
  logLevel: "error",
  build: {
    emptyOutDir: true,
    sourcemap: false,
    // Enable terser minification for smaller JS bundles
    minify: "esbuild",
    // Raise chunk warning threshold slightly to avoid noise on large ICP deps
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // Split vendor code into stable, long-cacheable chunks
        manualChunks(id) {
          // ICP / DFinity SDK — large & rarely changes
          if (id.includes("@dfinity") || id.includes("@icp-sdk")) {
            return "vendor-icp";
          }
          // React core
          if (id.includes("react-dom") || id.includes("react/")) {
            return "vendor-react";
          }
          // Router + query
          if (
            id.includes("@tanstack/react-router") ||
            id.includes("@tanstack/react-query")
          ) {
            return "vendor-tanstack";
          }
          // Icon libraries
          if (id.includes("lucide-react") || id.includes("react-icons")) {
            return "vendor-icons";
          }
        },
        // Content-hash filenames for aggressive long-term caching
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
    environment(["II_URL"]),
    environment(["STORAGE_GATEWAY_URL"]),
    react(),
  ],
  resolve: {
    alias: [
      {
        find: "declarations",
        replacement: fileURLToPath(new URL("../declarations", import.meta.url)),
      },
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
    dedupe: ["@dfinity/agent"],
  },
});
