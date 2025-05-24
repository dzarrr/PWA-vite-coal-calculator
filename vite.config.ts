import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["apple-icon-180x180.png", "vite.svg"],
      manifest: false,
    }),
  ],
  base: "/PWA-vite-coal-calculator/",
});
