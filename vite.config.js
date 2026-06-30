import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Travel.x/', // 👈 Yeh exact line check karo correct hai ya nahi
})