import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  // base: '/jatek_szimulacio/', // Replace <REPO_NAME> with your GitHub repository name
  build: {
    outDir: 'docs'
  }
})
