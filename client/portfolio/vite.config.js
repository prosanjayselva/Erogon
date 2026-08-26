import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.PORTFOLIO_BASE || '/',
  server: {
    port: 5174,
    proxy: {
      '/api': 'http://localhost:3000',
      '/uploads': 'http://localhost:3000',
      '/admin-panel': {
        target: 'http://localhost:5173',
        changeOrigin: true,
      },
    },
  },
})
