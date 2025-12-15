import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true, 
    port: 5173,
    strictPort: false,
    allowedHosts: [
      '.trycloudflare.com', 
      'localhost',
      '.ngrok.io', 
      'tm-engineering.online',
    ],
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL || "http://127.0.0.1:8000", 
        changeOrigin: true,
      },
      "/media": {
        target: process.env.VITE_API_URL || "http://127.0.0.1:8000",
        changeOrigin: true,
      },
    },
  },
});