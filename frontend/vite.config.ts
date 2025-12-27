import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 8080,
    watch: {
      usePolling: true
    },
    proxy: {
      '/cards': {
        target: 'http://leitner-backend:3000',
        changeOrigin: true,
        secure: false
      },
      '/api': {
        target: 'http://leitner-backend:3000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
