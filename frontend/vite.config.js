import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import sitemap from "vite-plugin-sitemap";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    sitemap({
      hostname: "https://fardocosmetics.com",
    }),
  ],

  server: {
    port: 5173,
  },
});
