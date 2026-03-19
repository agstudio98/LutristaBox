import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/LutristaBox/',
  plugins: [react()],
  preview: {
    port: 4173,
    open: true,
    host: true
  }
})

