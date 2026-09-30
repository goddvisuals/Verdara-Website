import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Keep browser dependencies separate from the server-rendered check cache.
  cacheDir: '.npm-cache/vite-dev',
  server: {
    host: '127.0.0.1',
    port: 5174,
    strictPort: true,
    allowedHosts: ['.trycloudflare.com'],
  },
})
