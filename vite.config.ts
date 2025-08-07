import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'favicon-16x16.png',
        'favicon-32x32.png',
        'android-chrome-192x192.png',
        'android-chrome-512x512.png',
        'site.webmanifest',
        'robots.txt',
      ],
      manifest: {
        name: 'NaijaNexus AI – A Futuristic, AI-Powered Governance Intelligence Platform for Nigeria',
        short_name: 'NaijaNexus AI',
        description:
          'NaijaNexus AI is a cutting-edge digital governance platform designed to revolutionize how data-driven decisions are made across Nigeria’s public sector. Built to align with the strategic goals of the Federal Ministry of Communications, Innovation, and Digital Economy, the platform presents a first-of-its-kind, immersive, and futuristic interface that leverages Artificial Intelligence, real-time data visualization, and intelligent simulation systems to empower government agencies, policymakers, and civic tech stakeholders.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});