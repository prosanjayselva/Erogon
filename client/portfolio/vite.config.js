import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Erogon/',
  server: {
    port: 5174,
    proxy: {
      '/api': 'http://localhost:3000',
      '/admin-panel': {
        target: 'http://localhost:5173',
        changeOrigin: true,
      },
    },
  },
})
