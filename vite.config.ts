
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['ark-icon-192.png', 'ark-icon-512.png', 'zlp-1779461952269.jpg'],
      devOptions: {
        enabled: true
      },
      manifestFilename: 'manifest.json',
      manifest: {
        name: 'ARK V5 SillyTavern',
        short_name: 'ARK V5',
        description: 'Chơi game nhập vai với AI',
        theme_color: '#0f172a',
        background_color: '#020617',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/ark-icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/ark-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 8000000
      }
    })
  ],
});
