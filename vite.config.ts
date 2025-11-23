import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Build for GitHub Pages: output to `docs/` so the entire repo can be pushed to GitHub
  // and Pages can be configured to serve from the `main` branch / `docs` folder.
  base: './',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
  plugins: [react()],
})
