import { defineConfig } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

export default defineConfig({
  base: './',
  plugins: [
    {
      name: 'file-local-html',
      apply: 'build',
      writeBundle(options) {
        const html = path.join(options.dir, 'index.html')
        if (!fs.existsSync(html)) return
        const out = fs
          .readFileSync(html, 'utf8')
          .replace(/type="module"\s*crossorigin\s*/g, '')
          .replace(/<script src="([^"]*)"([^>]*)>/g, '<script defer src="$1"$2>')
          .replace(/<link rel="stylesheet" crossorigin/g, '<link rel="stylesheet"')
        if (out !== fs.readFileSync(html, 'utf8')) {
          fs.writeFileSync(html, out, 'utf8')
          console.error('patched dist/index.html for file:// usage')
        }
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
