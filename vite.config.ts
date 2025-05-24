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
      manifest: {
        name: "CalculateCoal",
        short_name: "CalcCoal",
        description: "Calculate Coal Price",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-icon_192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-icon_512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  base: "/PWA-vite-coal-calculator/",
});
