import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages doesn't serve from `/` reliably for all setups.
  // This ensures asset URLs resolve correctly.
  // If you publish to a sub-path later, set it accordingly.
  base: '/',
})

