import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import copy from 'rollup-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    copy({
      targets: [
        {
          src: 'node_modules/@novorender/webgl-api/render.js',
          dest: 'public/novorender/webgl-api',
        },
        {
          src: 'node_modules/@novorender/webgl-api/geometry.js',
          dest: 'public/novorender/webgl-api',
        },
      ],
      verbose: true,
    }),
  ],

  appType: 'mpa',
})
