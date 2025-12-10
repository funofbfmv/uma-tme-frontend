import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true, // Доступ из сети (0.0.0.0)
    port: 5173,
    strictPort: false,
    allowedHosts: [
      '.trycloudflare.com', // Все поддомены Cloudflare
      'localhost',
      '.ngrok.io', // На случай если используешь ngrok
    ],
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8001", 
        changeOrigin: true,
      },
      "/media": {
        target: "http://127.0.0.1:8001",
        changeOrigin: true,
      },
    },
  },
});