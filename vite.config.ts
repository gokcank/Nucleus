import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Served as a GitHub Pages project site (gokcank.github.io/Nucleus),
  // so production assets/routes need the repo name as a base path. Kept at
  // '/' for `vite dev` so local development still runs at the site root.
  base: command === 'build' ? '/Nucleus/' : '/',
  plugins: [react(), tailwindcss()],
}))
