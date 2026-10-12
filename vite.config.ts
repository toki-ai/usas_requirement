import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const pagesBase = '/usas_requirement/'

// Pages is served from /usas_requirement/. Local dev and a plain build stay at /.
export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? pagesBase : '/',
  plugins: [react()],
})
