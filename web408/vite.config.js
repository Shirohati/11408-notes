import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  plugins: [
    {
      name: 'remove-module-attr',
      apply: 'build',
      transformIndexHtml(html) {
        return html.replace(/type="module"\s*crossorigin\s*/g, '')
      },
    },
  ],
  build: {
    rolldownOptions: {
      output: {
        format: 'iife',
        name: 'App',
      },
    },
  },
})