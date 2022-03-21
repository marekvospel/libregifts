import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    pages(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001/',
      },
    },
  },
})
