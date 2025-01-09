import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: '/jatek_szimulacio/',
  build: {
    outDir: 'docs',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '$app/paths': '/src/paths.js'
    }
  }
})
