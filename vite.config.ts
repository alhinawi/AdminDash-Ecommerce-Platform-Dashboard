import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { aiServerPlugin } from "./src/server/aiServerPlugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), aiServerPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
