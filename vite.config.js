import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // (or vue / svelte depending on your framework)

export default defineConfig({
  plugins: [react()],
  base: '/Travel.x/', // 👈 Add this line right here
})