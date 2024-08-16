import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows the server to be accessed externally
    port: 5173, // Default port for Vite
    strictPort: true, // Ensures the server fails if the port is already in use
    watch: {
      usePolling: true, // Useful for Docker containers
    },
  },
})